# Lane 的旅行

個人旅行規劃集 · 互動式網站 · GitHub Pages 自動部署

Multi-trip repo — each trip lives in `trips/<slug>/`. One GitHub Pages deploy covers all of them.

## Trips

| 旅行 | 日期 | 主題 | 資料夾 |
|------|------|------|--------|
| 🏙️ **2026/4 高雄小旅行** | 2026.04.24 – 04.26 | 三天兩夜・四人自駕・高雄萬豪 × 巨蛋演唱會夜 | [`trips/202604kaohsiung/`](trips/202604kaohsiung/) |
| 🎂 **2026/5 宜蘭慶生之旅** | 2026.05.16 – 05.17 | 慶祝媽媽生日 × 母親節・12 人家族・Tesla×2＋宜蘭本地親人・蘭城晶英母親節晚宴＋Gather 水果千層生日蛋糕 | [`trips/202605yilang/`](trips/202605yilang/) |
| 🍣 **2026/6 關西優雅美食之旅** | 2026.06.23 – 06.28 | 六天五夜・四人・大阪 × 神戶・神戶牛鐵板燒 × 割烹／河豚 × 壽司／鰻魚 × 大阪燒老舖巡禮 | [`trips/202606Osaka/`](trips/202606Osaka/) |

部署後線上瀏覽：
- 🗺️ 入口：`https://<user>.github.io/<repo>/`
- 🏙️ 高雄：`https://<user>.github.io/<repo>/202604kaohsiung/`
- 🎂 宜蘭：`https://<user>.github.io/<repo>/202605yilang/`
- 🍣 大阪：`https://<user>.github.io/<repo>/202606Osaka/`

## Structure

```
travels2026/
├── index.html          ← landing page (links to every trip)
├── styles.css
├── build.js            ← assembles dist/ from trips.json
├── trips.json          ← registry of all trips (slug, title, dates, emoji)
├── package.json        ← one jsdom dep, runs every trip's tests
├── .github/workflows/deploy.yml
└── trips/
    ├── <slug-1>/
    │   ├── src/        ← deployed to /<slug-1>/ on Pages
    │   ├── tests/
    │   ├── docs/
    │   └── CLAUDE.md
    └── <slug-2>/
        └── ...
```

## Commands

```bash
npm install            # once
npm test               # run every trip's data+render tests
npm run build          # build dist/ for deploy
npm run preview        # build then serve dist/ at localhost:8000
```

## 編輯資料的小工具：`tools/data_tool.py`

不想透過 Claude、想自己快速改某趟旅行的 `src/data.js`（SSOT）時用這支。
用 [`uv`](https://docs.astral.sh/uv/) 執行，**免裝任何套件**（純標準庫；只需要系統有 `node`，這個 repo 本來就用它跑測試）。
讀取靠 `node` 把 `data.js` eval 成 JSON（精確），寫入後一定重新用 `node` 載入驗證語法，**失敗會自動回滾**，不會留下壞檔。

```bash
# 列出某趟旅行的餐廳 / 景點，及各自掛了幾支 YouTube（📺×N）
uv run tools/data_tool.py list --trip 202606Osaka
uv run tools/data_tool.py list --trip 202606Osaka --sights        # 只列景點
uv run tools/data_tool.py list --trip 202606Osaka --restaurants   # 只列餐廳

# 看單一筆細節（餐廳給 id、景點給名稱）
uv run tools/data_tool.py show --trip 202606Osaka --sight "奈良公園"
uv run tools/data_tool.py show --trip 202606Osaka --restaurant wanaka

# 幫景點 / 餐廳加一支 YouTube（--time、--creator 可省略；重複的 vid 會被擋下）
uv run tools/data_tool.py add-yt --trip 202606Osaka --sight "奈良公園" \
    --vid _ltmYqArdC0 --time 5:33 --creator "小黑的旅行誌"
uv run tools/data_tool.py add-yt --trip 202606Osaka --restaurant wanaka \
    --vid hPXEoK2C68E --time 8:31 --creator "痛風老饕"

# 新增一個景點（--day/--time/--note/--address 與 --vid 都可省略）
uv run tools/data_tool.py add-sight --trip 202606Osaka \
    --name "大阪城公園" --city 大阪 --day 3 --time "上午（1–2 小時）" \
    --note "天守閣成人 ¥600；西之丸庭園賞景。" --address "大阪市中央区大阪城"
```

- `--trip <slug>` 會對應到 `trips/<slug>/src/data.js`；也可改用 `--data <path>` 直接指路徑。
- 改完跑 `npm test` 確認資料層與 render 測試仍通過。
- `data.js` 裡 `youtube: [{ id, time?, creator? }]` 會被該 trip 的 `app.js` 渲染成可點的 `📺 <creator> <time>` 按鈕（餐廳與景點皆然）。

## Adding a trip

Invoke `/travel` again. The skill detects this repo (sees `trips.json`) and adds a new trip folder + appends to the registry.

## Deploy

Push to `main` → GitHub Actions runs `npm run build` and publishes `dist/` to Pages. First time: Settings → Pages → Source: **GitHub Actions**.

Landing at `https://<user>.github.io/<repo>/`, each trip at `https://<user>.github.io/<repo>/<slug>/`.
