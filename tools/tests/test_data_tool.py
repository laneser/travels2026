"""data_tool.py 的單元測試（pytest）。

跑法（在 repo 根目錄）：

    uv run --with pytest pytest tools/tests/

重點放在 Copilot 在 PR #2 抓到的兩個 bug：
  1. 餐廳定位不能誤中巢狀 YouTube ref 的 `id:`（否則會默默改壞資料）
  2. `list` 在景點沒有 day 時不該印出 `DayNone`
以及底層的字串感知括號掃描、寫入後的語法／語意驗證與自動回滾。
"""

import importlib.util
import shutil
from pathlib import Path

import pytest

# ---- 以檔案路徑載入受測模組（它有 PEP723 標頭與 shebang，但都是合法註解）----
_TOOL = Path(__file__).resolve().parent.parent / "data_tool.py"
_spec = importlib.util.spec_from_file_location("data_tool", _TOOL)
dt = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(dt)

needs_node = pytest.mark.skipif(
    shutil.which("node") is None, reason="這些測試需要系統有 node")

# ---- 一份最小但結構與真檔一致的 data.js（餐廳含巢狀 youtube ref、note 內含假括號）----
SAMPLE = '''// fixture
const TRIP = {};
const DAYS = [];
const CATEGORIES = { takoyaki: { label: "章魚燒", icon: "🐙" } };
const RESTAURANTS = [
  {
    id: "wanaka", name: "わなか", category: "takoyaki", city: "大阪", area: "道頓堀", days: [1],
    address: "道頓堀 1-6-7", tabelog: 3.49, price: "¥650",
    note: "招牌四味拼盤，敘述裡故意放假括號 { 與 } 測試掃描器。",
    youtube: [
      { id: "VID_EXISTING", time: "08:31", creator: "痛風老饕" },
    ],
  },
  {
    id: "kukuru", name: "くくる", category: "takoyaki", city: "大阪", area: "道頓堀", days: [1],
    address: "道頓堀 1-10-5", note: "這家沒有 youtube 欄位。",
  },
];
const TRANSPORT = {};
const TIPS = {};
const SIGHTS = [
  {
    name: "奈良公園",
    city: "奈良",
    day: 5,
    note: "餵鹿。",
    address: "奈良市雑司町",
    youtube: [
      { id: "SIGHTVID1", time: "5:33", creator: "小黑的旅行誌" },
    ],
  },
];
window.TRIP_DATA = { TRIP, DAYS, CATEGORIES, RESTAURANTS, TRANSPORT, TIPS, SIGHTS };
'''


@pytest.fixture
def data_file(tmp_path):
    p = tmp_path / "data.js"
    p.write_text(SAMPLE, encoding="utf-8")
    return p


# ======================== 純 Python：不需要 node ========================

class TestBraceScanner:
    def test_skips_braces_inside_strings(self):
        # 從 wanaka 物件的 '{' 掃到 '}'，note 字串內的假括號不能干擾
        open_idx = SAMPLE.index("{", SAMPLE.index('id: "wanaka"') - 40)
        close_idx = dt._match_bracket(SAMPLE, open_idx)
        obj = SAMPLE[open_idx:close_idx + 1]
        assert 'id: "wanaka"' in obj
        assert "VID_EXISTING" in obj          # 含自己的 youtube ref
        assert 'id: "kukuru"' not in obj      # 但不會吃到下一個物件

    def test_unbalanced_raises(self):
        with pytest.raises(ValueError):
            dt._match_bracket("{ no close here", 0)


class TestLocateObject:
    """Copilot bug #1 的核心迴歸測試。"""

    def test_restaurant_locates_real_object(self):
        o, c = dt._locate_object(SAMPLE, restaurant_id="wanaka")
        obj = SAMPLE[o:c + 1]
        assert 'name: "わなか"' in obj
        assert "category:" in obj

    def test_videoid_passed_as_restaurant_does_not_mislocate(self):
        # 把影片 id 當餐廳 → 必須報錯，而不是定位到 youtube ref 物件
        with pytest.raises(ValueError, match="找不到 id"):
            dt._locate_object(SAMPLE, restaurant_id="VID_EXISTING")

    def test_unknown_restaurant_raises(self):
        with pytest.raises(ValueError, match="找不到 id"):
            dt._locate_object(SAMPLE, restaurant_id="does_not_exist")

    def test_sight_locates_within_sights_array(self):
        o, c = dt._locate_object(SAMPLE, sight_name="奈良公園")
        obj = SAMPLE[o:c + 1]
        assert 'name: "奈良公園"' in obj
        assert "SIGHTVID1" in obj


class TestLiterals:
    def test_js_str_escapes_quotes_and_keeps_chinese(self):
        assert dt.js_str('引號"與\\反斜線') == '"引號\\"與\\\\反斜線"'
        assert dt.js_str("奈良公園") == '"奈良公園"'

    def test_yt_literal_optional_fields(self):
        assert dt.yt_literal("ABC", None, None) == '{ id: "ABC" }'
        assert dt.yt_literal("ABC", "5:33", "小黑") == \
            '{ id: "ABC", time: "5:33", creator: "小黑" }'


class TestListFormatting:
    """Copilot bug #2 的迴歸測試：day 缺省時不可印出 DayNone。"""

    def test_sight_without_day_no_daynone(self, capsys):
        data = {"SIGHTS": [{"name": "美國村", "city": "大阪"}], "RESTAURANTS": []}
        dt.cmd_list(data, "sights")
        out = capsys.readouterr().out
        assert "DayNone" not in out
        assert "Day" not in out          # 完全沒 day 就別出現 Day 字樣
        assert "美國村" in out and "大阪" in out

    def test_sight_with_day_shows_day(self, capsys):
        data = {"SIGHTS": [{"name": "奈良公園", "city": "奈良", "day": 5}], "RESTAURANTS": []}
        dt.cmd_list(data, "sights")
        out = capsys.readouterr().out
        assert "Day5" in out


# ======================== round-trip：需要 node ========================

@needs_node
class TestAddYoutube:
    def test_merges_into_existing_array(self, data_file):
        msg = dt.add_youtube(data_file, restaurant_id="wanaka", sight_name=None,
                             vid="NEWVID", time="1:23", creator="新頻道")
        assert msg.startswith("✓")
        wanaka = next(r for r in dt.load_data(data_file)["RESTAURANTS"]
                      if r["id"] == "wanaka")
        ids = [y["id"] for y in wanaka["youtube"]]
        assert ids == ["NEWVID", "VID_EXISTING"]   # 新的插在最前面

    def test_creates_new_array(self, data_file):
        dt.add_youtube(data_file, restaurant_id="kukuru", sight_name=None,
                       vid="KVID", time=None, creator="頻道")
        kukuru = next(r for r in dt.load_data(data_file)["RESTAURANTS"]
                      if r["id"] == "kukuru")
        assert [y["id"] for y in kukuru["youtube"]] == ["KVID"]

    def test_blocks_duplicate(self, data_file):
        before = data_file.read_text(encoding="utf-8")
        msg = dt.add_youtube(data_file, restaurant_id="wanaka", sight_name=None,
                             vid="VID_EXISTING", time=None, creator=None)
        assert msg.startswith("⚠")
        assert data_file.read_text(encoding="utf-8") == before   # 未動檔案

    def test_refuses_videoid_as_restaurant_and_leaves_file_intact(self, data_file):
        before = data_file.read_text(encoding="utf-8")
        with pytest.raises(ValueError, match="找不到 id"):
            dt.add_youtube(data_file, restaurant_id="VID_EXISTING", sight_name=None,
                           vid="X", time=None, creator=None)
        assert data_file.read_text(encoding="utf-8") == before   # 沒被改壞

    def test_rollback_when_semantic_verify_fails(self, data_file, monkeypatch):
        # 故意讓定位指到「另一個合法餐廳（kukuru）」：插入語法合法，但目標 wanaka
        # 的 youtube 拿不到該 vid → 語意驗證發現不對 → 自動回滾。
        text = data_file.read_text(encoding="utf-8")
        bad_open = dt._find_brace_left(text, text.index('id: "kukuru"'))
        bad_close = dt._match_bracket(text, bad_open)
        monkeypatch.setattr(dt, "_locate_object", lambda *a, **k: (bad_open, bad_close))
        with pytest.raises(ValueError, match="語意驗證失敗"):
            dt.add_youtube(data_file, restaurant_id="wanaka", sight_name=None,
                           vid="GHOST", time=None, creator=None)
        assert data_file.read_text(encoding="utf-8") == text   # 已回滾


@needs_node
class TestAddSight:
    def test_add_sight_without_day(self, data_file):
        msg = dt.add_sight(data_file, name="美國村", city="大阪", day=None,
                           time=None, note="逛街。", address="西心斎橋",
                           vid=None, yt_time=None, creator=None)
        assert msg.startswith("✓")
        sights = dt.load_data(data_file)["SIGHTS"]
        new = next(s for s in sights if s["name"] == "美國村")
        assert "day" not in new                      # 沒傳就不該有 day 欄位
        assert len(sights) == 2

    def test_add_sight_with_youtube(self, data_file):
        dt.add_sight(data_file, name="大阪城", city="大阪", day=3, time=None,
                     note=None, address=None, vid="CASTLE", yt_time="2:00",
                     creator="城景")
        new = next(s for s in dt.load_data(data_file)["SIGHTS"]
                   if s["name"] == "大阪城")
        assert new["youtube"][0]["id"] == "CASTLE"
        assert new["day"] == 3
