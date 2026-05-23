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

## Adding a trip

Invoke `/travel` again. The skill detects this repo (sees `trips.json`) and adds a new trip folder + appends to the registry.

## Deploy

Push to `main` → GitHub Actions runs `npm run build` and publishes `dist/` to Pages. First time: Settings → Pages → Source: **GitHub Actions**.

Landing at `https://<user>.github.io/<repo>/`, each trip at `https://<user>.github.io/<repo>/<slug>/`.
