# CLAUDE.md — 2026/7 首爾 DAY6 演唱會美食之旅

Trip folder under a multi-trip travel repo. See repo-level `CLAUDE.md` for overall structure.

## 語言

與 Lane 溝通用**繁體中文**；`data.js` 的敘述也用繁體中文，但**保留韓文原文**（店名、地名、菜名）方便現場對照。詳見 repo-level `CLAUDE.md` 的「語言慣例」。

## SSOT

**`src/data.js` is the single source of truth for this trip.** All edits to itinerary / restaurants / sights / shopping / transport go here.

**Frozen**: `docs/references/*.md` — raw research snapshots。Don't edit them; they'd drift from `data.js`.

## 這趟的重點

- **核心目的**：2026/7/4（六）18:00 在 **KSPO DOME（올림픽체조경기장，松坡區奧林匹克公園內）** 看 **DAY6 10th Anniversary Tour〈The DECADE〉FINALE in SEOUL**。Day 4 整天圍著演唱會安排（白天蠶室/奧林匹克公園輕鬆走，傍晚進場）。
- **據點**：Uljiro Co-op Residence（을지로 코업 레지던스），中區乙支路 246，緊鄰동대문역사문화공원站（2／4／5 號線、約 320m）。步行可達廣藏市場、DDP、東大門商圈。公寓式住宿、房內附小廚房。入住 7/1（三）14:00 後、退房 7/5（日）12:00 前。
- **班機**：去程 7/1 T'way TW668 松山 TSA 14:00 → 金浦 GMP 17:25；回程 7/5 T'way TW667 金浦 GMP 11:20 → 松山 TSA 13:00。**回程班機早（11:20），Day 5 基本上只剩早餐＋趕機場。**
- **主軸**：演唱會＋美食為主，景點輕鬆走。

## `data.js` 資料結構（SSOT 速查）

`data.js` 結尾 `window.TRIP_DATA = { TRIP, DAYS, CATEGORIES, RESTAURANTS, TRANSPORT, TIPS, SIGHTS, SIGHTS_META, SHOPPING, PLACES }`。各區塊：

- **`TRIP`** — 標題、日期、飯店、航班、預算、`extraCards`（總覽卡片）。`country: "KR"`。
- **`DAYS[]`** — 每天 `{ day, route?, date, dow, city, theme, summary, level, timeline[], meals[], categories[], tips }`。
  `timeline[].refs` 與 `meals[].refs` 放**字串**：餐廳用 `id`、景點／購物點用**名稱**、固定點用 `PLACES` 的 key 或「飯店」，由 `app.js` 的 `resolveRef()` 解析成地圖／YouTube 連結。
  `route` 選填 `{ start, end }`，把每日地圖路線的固定起訖點釘在頭尾。
- **`PLACES`** — 固定錨點註冊表（key → `{ name, address }`）：機場、車站、演唱會場館等。「飯店」關鍵字另由 `app.js` 自動對應 `TRIP.hotel`，不必列在這裡。
- **`CATEGORIES`** — 美食分類（key → `{label, icon}`）；`RESTAURANTS[].category` 與 `DAYS[].categories[]` 必須對得上。
- **`RESTAURANTS[]`** — `{ id, name, category, city, area, days[], address, price, note, hours, links?[], youtube?[] }`。`id` 要 url-safe 且唯一。**韓國餐廳沒有 Tabelog，不用 `tabelog` 欄位。**
- **`SIGHTS[]`** — `{ name, city, area, region, day?, time?, whyGo, highlight, note, address, youtube?[] }`，自己一個「景點」分頁，以 `region` 分組（見 `SIGHTS_META.regionOrder`）。
- **`SHOPPING`** — `{ intro, spots[] }`，自己一個「購物」分頁。

## 新增景點／餐廳／購物點，並排進行程

1. 先做功課（web search / `youtube-survey` skill 找影片）。
2. 加資料：景點 → `SIGHTS[]`（`region` 要在 `SIGHTS_META.regionOrder`）；餐廳 → `RESTAURANTS[]`（`category` 要在 `CATEGORIES`、`days` 要在 1..5）；購物 → `SHOPPING.spots[]`。
3. 排進行程：在對應 `DAYS[].timeline[]` 加 `{ time, event, refs:["<id 或名稱>"] }`。
4. 從 repo root 跑 `npm run test:data && npm run test:render`。
5. Google Maps 連結一律用 search URL 形式（勿用 API key / Place ID）。

## Google Maps links

```js
`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} ${address}`.trim())}`
```

## Don't

- Don't add CDN links or build tools（zero-build、offline-friendly 是重點）。
- Don't edit `docs/references/` — 已凍結。
- Don't hand-copy this folder to make a new trip — 用 `/travel`（保持 `trips.json` 同步）。
