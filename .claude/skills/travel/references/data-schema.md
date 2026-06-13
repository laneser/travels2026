# `src/data.js` Schema

All sections exported as `window.TRIP_DATA = { TRIP, DAYS, CATEGORIES, RESTAURANTS, TRANSPORT, TIPS, SIGHTS }`.

Tests in `tests/data.test.mjs` enforce these constraints. If you add a new field, keep the tests in sync.

---

## TRIP

Single object with trip-level metadata.

```js
const TRIP = {
  title: string,              // required, shown in header + page title
  subtitle: string,           // optional, shown under title in header
  heroTitle: string,          // optional, large hero headline (defaults to title)
  heroDesc: string,           // optional, one-sentence hero description
  dates: {
    start: "YYYY-MM-DD",      // required
    end:   "YYYY-MM-DD",      // required, must be >= start
  },
  people: number,             // required, positive integer
  country: "JP" | "TW" | ...  // ISO code; "JP" shows Tabelog links on food cards
  origin: string,             // e.g., "台北 TPE"
  destinations: string[],     // e.g., ["大阪", "神戶"]
  stats: [{num, label}],      // optional, overrides default [days, nights, people]
  hotel: null | {
    name: string,
    area: string,             // neighborhood (e.g., "西心齋橋")
    address: string,
    note: string,             // free-form tip, shown in .tip-box
    walking: [{ to: string, minutes: number }, ...],
  },
  flights: [                  // optional, empty array hides the card
    { label: "去程" | "回程", code: string, from: string, to: string,
      departure: "HH:MM", arrival: "HH:MM", date: "YYYY-MM-DD" },
  ],
  budget: null | {
    perPerson: { min: number, max: number, currency: "TWD" | "USD" | ... },
    fixed:     { total: number, perPerson: number, currency: string },
    local:     { min: number, max: number, currency: string },
    fx: string,               // "¥1 ≈ NT$0.22"
    note: string,
  },
  extraCards: [               // optional, additional overview cards
    { icon: "📌", title: string, rows: [{key, val, wrap?}], body?: string },
  ],
};
```

---

## DAYS

Array of per-day objects. `DAYS.length` must equal the number of calendar days between `TRIP.dates.start` and `TRIP.dates.end` (inclusive) — test enforces this.

```js
const DAYS = [
  {
    day: 1,                           // required, 1-indexed, consecutive
    date: "YYYY-MM-DD",               // required, must be sequential
    dow: "一"..."日" | string,        // optional, day-of-week label
    city: string,                     // optional, shown as pill
    theme: string,                    // required, short headline
    summary: string,                  // optional, one-sentence intro
    level: "💰" | "💰💰" | ...,        // optional, price-tier marker
    timeline: [                       // optional
      { time: "10:00" | "上午" | ..., event: string },
    ],
    meals: [                          // optional
      { type: "早餐" | "午餐" | "晚餐", title: string, note?: string, star?: 1|2|3 },
    ],
    categories: string[],             // optional; each must be a key in CATEGORIES,
                                      // and at least one RESTAURANT must match (day+cat)
    tips: string,                     // optional, shown in .tip-box
  },
];
```

---

## CATEGORIES

Dictionary mapping category key → `{ label, icon }`. Referenced by `RESTAURANTS[].category` and `DAYS[].categories[]`.

```js
const CATEGORIES = {
  sushi:   { label: "壽司", icon: "🍣" },
  ramen:   { label: "拉麵", icon: "🍜" },
  // ...
};
```

Keys should be lowercase ASCII (url-safe). Labels can be any language.

---

## RESTAURANTS

```js
const RESTAURANTS = [
  {
    // Required:
    id: "wanaka",                   // unique, url-safe [a-z0-9_-]+
    name: "たこ焼き道楽 わなか 道頓堀店",
    category: "takoyaki",           // must be a key in CATEGORIES
    city: "大阪",
    days: [1, 3],                   // which days this is relevant to (1..DAYS.length)

    // Optional:
    area: "道頓堀",                  // neighborhood
    address: "大阪市中央区道頓堀 1-6-7",
    tabelog: 3.49,                  // number 3.0–5.0; shows ★ badge
    price: "¥650–700",
    highlight: "米其林必比登推薦",   // red pill on the card
    note: "招牌「おいり」四味拼盤⋯",
    hours: "約 23:00 止",
    reservation: "06-1234-5678" | "需提前 2 週",  // phone regex extracts tel: link
    website: "https://...",
  },
];
```

**Invariant**: for every `day.categories[cat]`, there must be at least one `r` in RESTAURANTS with `r.category === cat && r.days.includes(day.day)`. Tests enforce.

---

## TRANSPORT

`TRANSPORT.sections[]` is fully data-driven. Each section becomes one card on the Transport tab.

```js
const TRANSPORT = {
  sections: [
    {
      icon: "🛫",                       // emoji in card-head
      title: "關西機場 ↔ 難波",         // h2 title
      type: "options",                  // "options" | "table" | "info-rows" | "text"
      items: [...],                     // shape depends on type, below
      note: string,                     // optional, shown as small muted footnote
    },
  ],
};
```

### `type: "options"` — vertical list (best for airport-to-city options, bus routes)
```js
items: [
  { name: "南海特急ラピート", time: "38 分", fare: "¥1,490", note: "需指定席券" },
]
```

### `type: "table"` — 4-column table (best for inter-city routes)
```js
items: [
  { route: "JR 神戶線 新快速", path: "大阪 → 三宮", time: "21 分", fare: "¥420",
    note: "班次最多" },
]
```

### `type: "info-rows"` — key/value rows (best for IC card info, pass summary)
```js
items: [
  { key: "購買", val: "¥2,000（含 ¥500 押金）" },
  { key: "最高儲值", val: "¥20,000", wrap: true },
]
```

### `type: "text"` — plain paragraphs
```js
items: ["...", "..."]
```

---

## TIPS

Same shape as TRANSPORT. Each section becomes a card on the Tips tab.

```js
const TIPS = {
  sections: [
    {
      icon: "☔",
      title: "六月下旬天氣",
      type: "info-rows",                // "info-rows" | "checklist" | "reminders" | "sights" | "breakfast" | "text"
      items: [...],
      note: string,
    },
  ],
};
```

### `type: "info-rows"` — same as Transport's info-rows

### `type: "checklist"` — bulleted list with ✓ marks (packing, rainy-day plans)
```js
items: ["雨傘", "抗水鞋", "防曬乳", ...]
```

### `type: "reminders"` — highlighted reminder blocks
```js
items: [
  { title: "護照影本", body: "建議放在兩個不同的包包裡..." },
]
```

### `type: "sights"` — same shape as SIGHTS array below (see below). If you
don't create a `sights` section manually, app.js will auto-append one using the
top-level `SIGHTS` array.

### `type: "breakfast"` — per-day breakfast cards
```js
items: [
  { type: "Day 2 早餐", place: "飯店早餐", price: "¥2,000", note: "西式 buffet，推薦..." },
]
```

### `type: "text"` — plain paragraphs

---

## SIGHTS

```js
const SIGHTS = [
  {
    name: "黑門市場",          // required
    city: "大阪",              // required
    day: 2,                   // required, 1..DAYS.length
    time: "上午",             // optional
    note: "大阪的廚房...",      // optional
    address: "...",           // optional, used in Maps URL
  },
];
```

If `TIPS.sections` doesn't contain a `sights`-type section, app.js auto-appends one showing all entries.

---

## Adding a new field

1. Update the schema doc above.
2. Update `data.test.mjs` to validate the new field's presence/shape.
3. Update the relevant `render*()` function in `app.js` to consume it.
4. Run `npm test` — both `test:data` and `test:render` must stay green.
