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
