# CLAUDE.md — Lane 的旅行

Multi-trip travel repo. Each trip is a self-contained folder under `trips/`.

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
