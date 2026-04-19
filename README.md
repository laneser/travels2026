# Lane 的旅行

個人旅行規劃集 · 互動式網站 · GitHub Pages 自動部署

Multi-trip repo — each trip lives in `trips/<slug>/`. One GitHub Pages deploy covers all of them.

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

## Adding a trip

Invoke `/travel` again. The skill detects this repo (sees `trips.json`) and adds a new trip folder + appends to the registry.

## Deploy

Push to `main` → GitHub Actions runs `npm run build` and publishes `dist/` to Pages. First time: Settings → Pages → Source: **GitHub Actions**.

Landing at `https://<user>.github.io/<repo>/`, each trip at `https://<user>.github.io/<repo>/<slug>/`.
