# CLAUDE.md — 2026/6 關西優雅美食之旅

Trip folder under a multi-trip travel repo. See repo-level `CLAUDE.md` for overall structure.

## 語言

與 Lane 溝通用**繁體中文**；`data.js` 的敘述也用繁體中文，但**保留日文原文**（店名、地名、菜名）方便現場對照。詳見 repo-level `CLAUDE.md` 的「語言慣例」。

## SSOT

**`src/data.js` is the single source of truth for this trip.** All edits to itinerary / restaurants / sights / transport go here.

**Frozen**: `docs/references/*.md` — raw research from the original OsakaTravel2026 project. Don't edit them; they'd drift from `data.js`.

## Editing rules

1. Change data → edit `src/data.js`
2. Change styling/layout → edit `src/styles.css` / `src/index.html` / `src/app.js`
3. Re-run tests: from **repo root**, `npm run test:data && npm run test:render` (runs across all trips; this trip's tests are discovered via glob)
4. Preview: `npm run preview` from repo root — builds `dist/` and serves it

## `data.js` 資料結構（SSOT 速查）

`data.js` 結尾 `window.TRIP_DATA = { TRIP, DAYS, CATEGORIES, RESTAURANTS, TRANSPORT, TIPS, SIGHTS, SHOPPING, PLACES }`。各區塊：

- **`TRIP`** — 標題、日期、飯店、航班、預算、`extraCards`（總覽卡片）。
- **`DAYS[]`** — 每天 `{ day, route?, date, dow, city, theme, summary, level, timeline[], meals[], categories[], tips }`。
  `timeline[].refs` 與 `meals[].refs` 放**字串**：餐廳用 `id`、景點／購物點用**名稱**、固定點用 `PLACES` 的 key 或「飯店」，由 `app.js` 的 `resolveRef()` 解析成地圖／YouTube 連結。
  `route` 選填 `{ start, end }`，把每日地圖路線的固定起訖點釘在頭尾（值同樣是 `PLACES` key 或「飯店」），中途點仍由 `timeline[].refs` 自動串。
- **`PLACES`** — 固定錨點註冊表（key → `{ name, address }`）：機場、車站、起訖城市等**非餐廳／景點／購物點**。供 `route` 與 transit timeline refs 使用；「飯店」關鍵字另由 `app.js` 自動對應 `TRIP.hotel`，不必列在這裡。
- **`CATEGORIES`** — 美食分類（key → `{label, icon}`）；`RESTAURANTS[].category` 與 `DAYS[].categories[]` 必須對得上。
- **`RESTAURANTS[]`** — `{ id, name, category, city, area, days[], address, price, note, hours, tabelog?, youtube?[] }`。`id` 要 url-safe 且唯一。
- **`SIGHTS[]`** — `{ name, city, day, time, note, address, youtube?[] }`，自動掛到「實用」分頁的「景點資訊」。
- **`SHOPPING`** — `{ intro, spots[] }`，自己一個「購物」分頁。每個 spot：
  `{ name, city, area, address, hours, price?, day?, note, youtube?[{id,time?,creator}], links?[{label,url}] }`。

## 新增景點／餐廳／購物點，並排進行程

1. 先做功課（web search / `youtube-survey` skill 找影片）。
2. 加資料：景點 → `SIGHTS[]`；餐廳 → `RESTAURANTS[]`（記得 `category` 要在 `CATEGORIES`、`days` 要在範圍內）；購物 → `SHOPPING.spots[]`。
   小型加掛可用 CLI（不必開 Claude）：`uv run tools/data_tool.py add-sight ...` / `add-yt ...`（用法見 `tools/data_tool.py` 檔頭；目前 CLI 支援 sight／youtube，購物點先手動編 `data.js`）。
3. 排進行程：在對應 `DAYS[].timeline[]` 加一筆 `{ time, event, refs:["<id 或名稱>"] }`；`refs` 對到餐廳 `id`、景點／購物點名稱即可自動連結。
4. `npm run test:data && npm run test:render`（會驗 schema、地圖 URL、YouTube pill、連結按鈕）。
5. Google Maps 連結一律用下方 search URL 形式（勿用 API key / Place ID）。

> 為什麼放這裡而不是寫成 skill：「加一趟旅行」已有 `/travel` skill；「往既有 trip 加地點」是穩定的小規則，寫在 CLAUDE.md 每次 session 自動載入、不必處理 skill 觸發判斷，較不易和 `/travel` 撞車。

## Structure

```
src/            ← the site (Pages deploys this to /202606Osaka/)
  index.html
  app.js
  styles.css
  data.js       ← SSOT
  .nojekyll
tests/          ← discovered by root npm test
  data.test.mjs
  render.test.mjs
docs/
  README.md     ← explains the research-vs-SSOT split
  references/   ← frozen raw research (from original OsakaTravel2026 repo)
CLAUDE.md       ← this file
```

## Google Maps links

Always use search URL — no API key, no Place ID scraping:

```js
`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} ${address}`.trim())}`
```

## Don't

- Don't add CDN links or build tools (zero-build, offline-friendly is the whole point)
- Don't edit `docs/references/` — it's frozen
- Don't hand-copy this folder to make a new trip — use `/travel` instead (keeps `trips.json` in sync)
