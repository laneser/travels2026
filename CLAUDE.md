# CLAUDE.md — Lane 的旅行

Multi-trip travel repo. Each trip is a self-contained folder under `trips/`.

## 語言慣例（重要）

- **與使用者（Lane）溝通一律用繁體中文。** Lane 不熟悉日文，所有說明、結論、提問都用繁體中文書寫，不要用日文敘述。
- **旅遊資料（`data.js` 的 note / highlight 等）也以繁體中文撰寫**，但**保留當地原文**（日文店名、地名、菜名等）放在後面或括號內，方便 Lane 到當地時對照確認。例如：「割烹『日本料理 弁慶』（御堂筋銀杏景）」。
- 不要把整段敘述改成純日文；原文是給現場核對用的輔助，不是主要語言。

## Structure

```
trips/<slug>/
├── src/        ← the actual site; deployed to /<slug>/ on Pages
├── tests/
├── docs/       ← frozen research (see trips/<slug>/CLAUDE.md)
└── CLAUDE.md   ← per-trip SSOT rule
```

Repo root:
```
index.html       ← landing page listing trips (uses trips.json)
styles.css       ← landing-page styles only
build.js         ← assembles dist/ from trips.json
trips.json       ← registry: [{slug, title, dates, emoji, destinations, description}]
package.json     ← one jsdom dep; runs every trip's tests
```

## Key rules

1. **Each trip's `src/data.js` is the SSOT for that trip.** Don't edit its `docs/references/` after scaffolding — those are frozen research snapshots.
2. **To add a new trip**: invoke `/travel` again. The skill detects this repo and appends; don't hand-copy a trip folder.
3. **To remove a trip**: delete `trips/<slug>/` AND remove the entry from `trips.json`. The landing page will regenerate on next build.
4. **Shared UI (index.html / app.js / styles.css per trip)**: each trip gets its own copy. If you customize one trip's look, it doesn't affect the others. If you want a palette change across all trips, edit each `trips/*/src/styles.css`.

## Commands

```bash
npm test               # every trip's data + render tests
npm run build          # generate dist/
npm run preview        # build + serve at localhost:8000
```

Tests run via `node --test trips/*/tests/*.test.mjs` — a shell glob, so new trips are picked up automatically.

## Deploy

GitHub Actions runs `node build.js` on every push to main and uploads `dist/`. Landing at `https://<user>.github.io/<repo>/`, trips at `/<slug>/`.
