#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""
data_tool.py — 不用透過 Claude 也能編輯每個 trip 的 src/data.js（SSOT）。

設計：
  * 讀取用 node 把 data.js eval 成 JSON（精確，不靠 regex 猜結構）。
  * 寫入用「會跳過字串的括號掃描」定位物件，再做文字插入；
    寫完一定用 node 重新載入驗證語法，失敗就自動回滾，不會留下壞檔。

需求：系統要有 node（這個 repo 本來就用 node 跑測試）與 uv。

用法（在 repo 根目錄）：

  # 列出某趟旅行的餐廳 / 景點，及各自掛了幾支 YouTube
  uv run tools/data_tool.py list --trip 202606Osaka
  uv run tools/data_tool.py list --trip 202606Osaka --sights

  # 看單一筆細節（餐廳給 id、景點給名稱）
  uv run tools/data_tool.py show --trip 202606Osaka --sight "奈良公園"
  uv run tools/data_tool.py show --trip 202606Osaka --restaurant wanaka

  # 幫景點 / 餐廳加一支 YouTube（time、creator 可省略）
  uv run tools/data_tool.py add-yt --trip 202606Osaka --sight "奈良公園" \
      --vid _ltmYqArdC0 --time 5:33 --creator "小黑的旅行誌"
  uv run tools/data_tool.py add-yt --trip 202606Osaka --restaurant wanaka \
      --vid hPXEoK2C68E --time 8:31 --creator "痛風老饕"

  # 新增一個景點
  uv run tools/data_tool.py add-sight --trip 202606Osaka \
      --name "大阪城公園" --city 大阪 --day 3 --time "上午（1–2 小時）" \
      --note "天守閣成人 ¥600；西之丸庭園賞景。" --address "大阪市中央区大阪城"

也可用 --data <path> 直接指向某個 data.js，取代 --trip。
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent


# ---------- node bridge ----------

def _node(script: str, *args: str) -> str:
    """跑一段 node 程式，回傳 stdout。"""
    try:
        out = subprocess.run(
            ["node", "-e", script, "--", *args],
            capture_output=True, text=True, check=True,
        )
    except FileNotFoundError:
        sys.exit("錯誤：找不到 node，請先安裝 Node.js（這個 repo 用它跑測試）。")
    except subprocess.CalledProcessError as e:
        sys.exit(f"node 執行失敗：\n{e.stderr.strip()}")
    return out.stdout


def load_data(data_path: Path) -> dict:
    """把 data.js eval 成 dict（透過 node，最精確）。"""
    script = (
        "const p=process.argv[1];"
        "global.window={};require(p);"
        "process.stdout.write(JSON.stringify(global.window.TRIP_DATA||{}));"
    )
    raw = _node(script, str(data_path))
    return json.loads(raw)


def validate(data_path: Path) -> None:
    """確認改寫後的 data.js 仍能載入、且 RESTAURANTS/SIGHTS 還是陣列。"""
    script = (
        "const p=process.argv[1];"
        "global.window={};require(p);"
        "const d=global.window.TRIP_DATA||{};"
        "if(!Array.isArray(d.RESTAURANTS))throw new Error('RESTAURANTS 不是陣列');"
        "if(!Array.isArray(d.SIGHTS))throw new Error('SIGHTS 不是陣列');"
        "process.stdout.write('ok');"
    )
    _node(script, str(data_path))


# ---------- string-aware brace/bracket scanning ----------

def _match_bracket(text: str, open_idx: int) -> int:
    """從 text[open_idx]（'{' 或 '['）掃到對應的閉合括號，會跳過字串字面值。回傳閉合括號索引。"""
    opener = text[open_idx]
    closer = {"{": "}", "[": "]"}[opener]
    depth = 0
    i = open_idx
    quote = None      # 目前所在字串的引號字元，None 表示不在字串內
    escaped = False
    while i < len(text):
        c = text[i]
        if quote:
            if escaped:
                escaped = False
            elif c == "\\":
                escaped = True
            elif c == quote:
                quote = None
        else:
            if c in "\"'`":
                quote = c
            elif c == opener:
                depth += 1
            elif c == closer:
                depth -= 1
                if depth == 0:
                    return i
        i += 1
    raise ValueError("括號沒有正確閉合，data.js 結構可能異常。")


def _find_brace_left(text: str, idx: int) -> int:
    """從 idx 往左找最近的 '{'（用在 anchor 欄位通常是物件第一個欄位的情況）。"""
    j = text.rfind("{", 0, idx)
    if j == -1:
        raise ValueError("找不到物件開頭的 '{'。")
    return j


def _array_span(text: str, const_name: str) -> tuple[int, int]:
    """回傳 `const <NAME> = [ ... ]` 中 '[' 與對應 ']' 的索引。"""
    marker = f"const {const_name} = ["
    start = text.find(marker)
    if start == -1:
        raise ValueError(f"data.js 找不到 `{marker}`。")
    open_idx = start + len(marker) - 1  # 指向 '['
    close_idx = _match_bracket(text, open_idx)
    return open_idx, close_idx


def _locate_object(text: str, *, restaurant_id: str | None = None,
                   sight_name: str | None = None) -> tuple[int, int]:
    """找到目標物件的 '{' 與 '}' 索引。

    餐廳用 id 定位：但巢狀的 YouTube ref 物件也有 `id:` 欄位，所以
    (1) 只在 RESTAURANTS 陣列範圍內搜尋，(2) 找到後要求該物件含 `category:`
    （餐廳一定有、youtube ref 一定沒有），避免誤把影片 id 當餐廳而插錯地方。
    景點用 name 定位，限定在 SIGHTS 陣列內。
    """
    if restaurant_id is not None:
        arr_open, arr_close = _array_span(text, "RESTAURANTS")
        needle = f'id: "{restaurant_id}"'
        cursor = arr_open
        while True:
            at = text.find(needle, cursor, arr_close)
            if at == -1:
                raise ValueError(f"找不到 id 為 {restaurant_id!r} 的餐廳。")
            open_idx = _find_brace_left(text, at)
            close_idx = _match_bracket(text, open_idx)
            if "category:" in text[open_idx:close_idx + 1]:
                return open_idx, close_idx
            cursor = at + len(needle)   # 命中的是 youtube ref，繼續往後找
    else:
        arr_open, arr_close = _array_span(text, "SIGHTS")
        needle = f'name: "{sight_name}"'
        at = text.find(needle, arr_open, arr_close)
        if at == -1:
            raise ValueError(f"在 SIGHTS 裡找不到名稱為 {sight_name!r} 的景點。")
        open_idx = _find_brace_left(text, at)
        close_idx = _match_bracket(text, open_idx)
        return open_idx, close_idx


# ---------- JS literal helpers ----------

def js_str(s: str) -> str:
    """把 Python 字串轉成合法的 JS 雙引號字串（保留中文，正確跳脫）。"""
    return json.dumps(s, ensure_ascii=False)


def yt_literal(vid: str, time: str | None, creator: str | None) -> str:
    parts = [f'id: {js_str(vid)}']
    if time:
        parts.append(f'time: {js_str(time)}')
    if creator:
        parts.append(f'creator: {js_str(creator)}')
    return "{ " + ", ".join(parts) + " }"


# ---------- write ops (with validate + rollback) ----------

def _write_with_rollback(data_path: Path, new_text: str, verify=None) -> None:
    """寫入後做語法驗證；若給了 verify 再做語意驗證。任一失敗都還原原檔。

    verify(data) 收到重新載入後的 TRIP_DATA dict，語意不符就 raise。
    這能抓到「語法合法但插到錯物件」這種 validate() 看不出來的破壞。
    """
    original = data_path.read_text(encoding="utf-8")
    data_path.write_text(new_text, encoding="utf-8")
    try:
        validate(data_path)
        if verify is not None:
            verify(load_data(data_path))
    except BaseException:
        data_path.write_text(original, encoding="utf-8")
        raise


def add_youtube(data_path: Path, *, restaurant_id: str | None, sight_name: str | None,
                vid: str, time: str | None, creator: str | None) -> str:
    text = data_path.read_text(encoding="utf-8")
    open_idx, close_idx = _locate_object(
        text, restaurant_id=restaurant_id, sight_name=sight_name)
    obj = text[open_idx:close_idx + 1]

    if f'"{vid}"' in obj and "youtube" in obj:
        return f"⚠ 影片 {vid} 已存在於該筆，未重複加入。"

    ref = yt_literal(vid, time, creator)
    yt_key = "youtube:"
    yt_at = obj.find(yt_key)
    if yt_at != -1:
        # 已有 youtube 陣列 → 在 '[' 後插入新元素
        bracket_at = open_idx + obj.index("[", yt_at)
        insertion = f"\n      {ref},"
        new_text = text[:bracket_at + 1] + insertion + text[bracket_at + 1:]
    else:
        # 沒有 youtube 陣列 → 在物件結尾 '}' 那行之前插入整個欄位
        line_start = text.rfind("\n", 0, close_idx) + 1
        brace_indent = text[line_start:close_idx]              # '}' 前的縮排
        field_indent = brace_indent + "  "
        elem_indent = field_indent + "  "
        block = (f"{field_indent}youtube: [\n"
                 f"{elem_indent}{ref},\n"
                 f"{field_indent}],\n")
        new_text = text[:line_start] + block + text[line_start:]

    def verify(data: dict) -> None:
        coll = data["RESTAURANTS"] if restaurant_id else data["SIGHTS"]
        key, want = ("id", restaurant_id) if restaurant_id else ("name", sight_name)
        item = next((x for x in coll if x.get(key) == want), None)
        ids = [y.get("id") for y in (item or {}).get("youtube") or []]
        if vid not in ids:
            raise ValueError("寫入後語意驗證失敗：目標的 youtube 沒有出現新影片 id，已回滾。")

    _write_with_rollback(data_path, new_text, verify)
    target = restaurant_id or sight_name
    return f"✓ 已為「{target}」加入 YouTube：{ref}"


def add_sight(data_path: Path, *, name: str, city: str, day: int | None,
              time: str | None, note: str | None, address: str | None,
              vid: str | None, yt_time: str | None, creator: str | None) -> str:
    text = data_path.read_text(encoding="utf-8")
    arr_open, arr_close = _array_span(text, "SIGHTS")

    lines = [f"    name: {js_str(name)},", f"    city: {js_str(city)},"]
    if day is not None:
        lines.append(f"    day: {day},")
    if time:
        lines.append(f"    time: {js_str(time)},")
    if note:
        lines.append(f"    note: {js_str(note)},")
    if address:
        lines.append(f"    address: {js_str(address)},")
    if vid:
        lines.append("    youtube: [")
        lines.append(f"      {yt_literal(vid, yt_time, creator)},")
        lines.append("    ],")
    block = "  {\n" + "\n".join(lines) + "\n  },\n"

    # 在 SIGHTS 的 ']' 那行之前插入
    line_start = text.rfind("\n", 0, arr_close) + 1
    new_text = text[:line_start] + block + text[line_start:]

    def verify(data: dict) -> None:
        if not any(s.get("name") == name for s in data["SIGHTS"]):
            raise ValueError(f"寫入後語意驗證失敗：SIGHTS 找不到新景點「{name}」，已回滾。")

    _write_with_rollback(data_path, new_text, verify)
    return f"✓ 已新增景點「{name}」（{city}）。"


# ---------- read ops ----------

def cmd_list(data: dict, which: str) -> None:
    if which in ("all", "restaurants"):
        cats = data.get("CATEGORIES", {})
        print(f"=== 餐廳（{len(data.get('RESTAURANTS', []))}）===")
        for r in data.get("RESTAURANTS", []):
            cat = cats.get(r.get("category"), {}).get("label", r.get("category", ""))
            yt = len(r.get("youtube") or [])
            tag = f"  📺×{yt}" if yt else ""
            print(f"  [{r.get('id')}] {r.get('name')}  · {cat}{tag}")
    if which in ("all", "sights"):
        print(f"=== 景點（{len(data.get('SIGHTS', []))}）===")
        for s in data.get("SIGHTS", []):
            yt = len(s.get("youtube") or [])
            tag = f"  📺×{yt}" if yt else ""
            loc = s.get("city", "")
            if s.get("day") is not None:
                loc = f"{loc} Day{s.get('day')}".strip()
            print(f"  {s.get('name')}  · {loc}{tag}")


def cmd_show(data: dict, restaurant_id: str | None, sight_name: str | None) -> None:
    if restaurant_id:
        item = next((r for r in data.get("RESTAURANTS", [])
                     if r.get("id") == restaurant_id), None)
        if not item:
            sys.exit(f"找不到 id 為 {restaurant_id!r} 的餐廳。")
    else:
        item = next((s for s in data.get("SIGHTS", [])
                     if s.get("name") == sight_name), None)
        if not item:
            sys.exit(f"找不到名稱為 {sight_name!r} 的景點。")
    print(json.dumps(item, ensure_ascii=False, indent=2))


# ---------- CLI ----------

def resolve_data_path(args) -> Path:
    if getattr(args, "data", None):
        p = Path(args.data)
    elif getattr(args, "trip", None):
        p = REPO_ROOT / "trips" / args.trip / "src" / "data.js"
    else:
        trips = sorted(d.name for d in (REPO_ROOT / "trips").iterdir() if d.is_dir())
        sys.exit("請用 --trip <slug> 或 --data <path> 指定。可用 trips："
                 + ", ".join(trips))
    if not p.exists():
        sys.exit(f"找不到 data.js：{p}")
    return p.resolve()


def main() -> None:
    ap = argparse.ArgumentParser(
        description="編輯 trip 的 src/data.js（SSOT）。",
        formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)

    def add_target(p, required=False):
        p.add_argument("--trip", help="trip slug，例如 202606Osaka")
        p.add_argument("--data", help="直接指定 data.js 路徑（取代 --trip）")

    p_list = sub.add_parser("list", help="列出餐廳與景點")
    add_target(p_list)
    g = p_list.add_mutually_exclusive_group()
    g.add_argument("--restaurants", action="store_true", help="只列餐廳")
    g.add_argument("--sights", action="store_true", help="只列景點")

    p_show = sub.add_parser("show", help="顯示單筆細節")
    add_target(p_show)
    gs = p_show.add_mutually_exclusive_group(required=True)
    gs.add_argument("--restaurant", metavar="ID")
    gs.add_argument("--sight", metavar="NAME")

    p_yt = sub.add_parser("add-yt", help="為餐廳或景點加一支 YouTube")
    add_target(p_yt)
    gy = p_yt.add_mutually_exclusive_group(required=True)
    gy.add_argument("--restaurant", metavar="ID")
    gy.add_argument("--sight", metavar="NAME")
    p_yt.add_argument("--vid", required=True, help="YouTube 影片 id")
    p_yt.add_argument("--time", help="跳轉時間，如 5:33")
    p_yt.add_argument("--creator", help="創作者名稱，如 小黑的旅行誌")

    p_as = sub.add_parser("add-sight", help="新增一個景點")
    add_target(p_as)
    p_as.add_argument("--name", required=True)
    p_as.add_argument("--city", required=True)
    p_as.add_argument("--day", type=int)
    p_as.add_argument("--time")
    p_as.add_argument("--note")
    p_as.add_argument("--address")
    p_as.add_argument("--vid", help="順便掛一支 YouTube 影片 id")
    p_as.add_argument("--yt-time")
    p_as.add_argument("--creator")

    args = ap.parse_args()
    data_path = resolve_data_path(args)

    try:
        if args.cmd == "list":
            which = "restaurants" if args.restaurants else "sights" if args.sights else "all"
            cmd_list(load_data(data_path), which)
        elif args.cmd == "show":
            cmd_show(load_data(data_path), args.restaurant, args.sight)
        elif args.cmd == "add-yt":
            print(add_youtube(data_path, restaurant_id=args.restaurant,
                              sight_name=args.sight, vid=args.vid,
                              time=args.time, creator=args.creator))
        elif args.cmd == "add-sight":
            print(add_sight(data_path, name=args.name, city=args.city, day=args.day,
                            time=args.time, note=args.note, address=args.address,
                            vid=args.vid, yt_time=args.yt_time, creator=args.creator))
    except ValueError as e:
        sys.exit(f"✗ {e}")


if __name__ == "__main__":
    main()
