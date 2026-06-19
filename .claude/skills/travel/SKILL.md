---
name: travel
description: Scaffold an interactive travel-planning static site (vanilla JS, zero-build, GitHub Pages ready) from the user's origin, destinations, and date range. Produces a multi-trip repo where each trip is a folder under `trips/<slug>/`, sharing one landing page, one deploy workflow, and one test runner. Collects food/sights/transport research via web search, writes it to each trip's own `data.js` SSOT, and sets up the three-layer test stack (data + render + e2e) used by the OsakaTravel2026 reference project. Use this skill WHENEVER the user invokes /travel, asks to "plan a trip", "build a travel website", "add a trip", "幫我規劃旅行", "做一個旅遊網站", "加一個行程", "整合美食景點行程", or provides a trip spec like "我要去大阪/京都 6/23-28 幫我做網站". Also trigger on loose phrasing — anything about producing a deployable itinerary site, or adding a new trip to an existing travel repo.
---

# Travel Itinerary Site Generator

Produces self-contained static sites from trip specs. **One repo, many trips.** Each trip is `trips/<slug>/src/` and gets deployed to `https://<user>.github.io/<repo>/<slug>/`; a landing page at `/` lists them all.

This skill exists because the *interesting* work in a travel site is curating restaurants and sights for the specific trip, not rewriting scaffolding every time. The skill handles plumbing so focus stays on content — and the multi-trip layout means next time the user plans a trip, they don't start a fresh repo; they add to the same one.

## Workflow

Four phases. Don't try to do them all in one shot — each phase builds on the previous, and users often want to iterate.

### Phase 1 — Interview

If the user hasn't supplied enough, ask for the missing pieces. Minimum to scaffold:

- **Trip title** (used in header, page title, landing card)
- **Trip slug** (kebab-case folder name under `trips/`, e.g., `osaka-2026`, `202604kaohsiung`)
- **Origin** (departure city)
- **Destinations** (ordered list — 1 to many)
- **Dates** — start and end (ISO `YYYY-MM-DD`)
- **People count**

Repo-level (only needed the first time):
- **Repo path** — where to put the multi-trip folder (default: `<cwd>/MyTravels/` or let user pick)
- **Repo title** — landing page headline (default "我的旅行")

Nice-to-have, can be filled later by editing `trips/<slug>/src/data.js`:
- Hotel, flights, budget
- Travel style, must-eat/must-see list

**Auto mode / minimize interruption:** If the user gave specifics (hotel name, departure time, etc.), use them. If they didn't mention people count, assume 2 and flag the assumption in one line. Ask only for what's truly blocking (e.g., ambiguous repo location).

### Phase 2 — Scaffold

Run `scripts/scaffold.py`. It auto-detects whether `--repo` is a fresh directory (creates repo-level files too) or an existing travel repo (just appends the new trip).

```bash
python3 <SKILL_DIR>/scripts/scaffold.py \
  --repo /absolute/path/to/MyTravels \
  --slug 202604kaohsiung \
  --title "2026/4 高雄小旅行" \
  --start 2026-04-24 \
  --end 2026-04-25 \
  --people 2 \
  --origin "台北" \
  --destinations "高雄" \
  --emoji 🌴 \
  --country TW
```

For a brand-new repo also pass `--repo-title` and `--repo-description` (controls the landing page). Run the script with `--help` for the full flag list.

After scaffolding first time:
```bash
cd <repo> && npm install && npm test
```

(Subsequent trips: just `npm test` — deps already installed.)

Both suites must pass on the empty-but-valid scaffold. If they don't, it's a bug in the skill template; don't weaken the tests.

### Phase 3 — Research

Gather real content. Use `WebSearch` and `WebFetch` to find:

- **Restaurants**: ~8–15 per destination, balanced across meal types / price. Prefer Tabelog / Michelin / Bib Gourmand / Eater guides for the local market.
- **Sights**: ~3–6 per destination, tied to specific days.
- **YouTube vlogs (中文創作者)**: a dedicated pass over the curated restaurants **and** headline sights — find real walk-through videos from the Chinese/TW/HK creators travellers watch (痛風老饕、Kiki、滔滔、肥波、食尚玩家… or the region's own channels). Capture `{ id, time?, creator }`; **never invent an id**, and verify each one resolves (oEmbed → 200) before committing. Restaurants also take a `website` (🌐 官網), shopping spots take `links[]` (🔗). See `references/research-plan.md` → "YouTube vlogs".
- **Transport**: origin→first city, inter-city, intra-city, airport transit, relevant passes. For IC cards, don't just name the default — briefly say *why* it beats the alternatives (single-journey, tourist passes, contactless credit, stored-value cards) for this trip.
- **Tips**: weather for the specific month, packing, rainy-day fallbacks.

**Verify every restaurant/sight is still operating — this is mandatory, not optional.** A curated list is worthless if a chunk of it has shut down; planning a trip around a closed restaurant is a real failure. Once names are settled, run a dedicated "anti-stale" pass over **every** food/sight entry: search the original-language name + address and confirm it resolves to a live listing with current hours (Google Maps「営業時間／定休日」, or a Tabelog page **not** flagged「閉店」「掲載保留」). The heuristic: **if you cannot find current opening hours anywhere, it has very likely closed — drop it or comment it out** (don't silently keep it). When a place exists but the address is wrong (relocated / mislabelled branch / typo), fix the address rather than delete. Flag anything ambiguous (a different same-name branch, conflicting addresses) for the user instead of guessing. See `references/research-plan.md` → "Verify each place is still operating".

A multi-agent `Workflow` is a good fit for Phase 3 when the trip is large: fan out one agent per research domain (food / sights / YouTube / transport / shopping / tips), each returning structured JSON, then assemble `data.js` yourself. Fan the oEmbed/URL validation **and the still-operating verification** out the same way — one agent per batch of ~10 places, each returning `{id, status: ✅open|⚠️doubt|❌closed, hours, evidence}`.

**Save raw findings to `trips/<slug>/docs/references/*.md` BEFORE shaping `data.js`.** Once written, treat them as frozen historical record — the `CLAUDE.md` rule in every trip folder tells any future editor the same. Raw research lets you audit sources later without re-searching.

For detailed search strategy and what to extract per result, read `references/research-plan.md`.

### Phase 4 — Populate data.js + test + commit

Fill `trips/<slug>/src/data.js` from the research. Schema in `references/data-schema.md`. Key invariants (enforced by tests):

- `DAYS.length` equals the date range (one entry per calendar day).
- `RESTAURANTS[].id` unique and URL-safe.
- Every `r.category` exists as a key in `CATEGORIES`.
- Every `day.categories[c]` has at least one restaurant matching that day+category.
- Google Maps URLs built from `name + address` (no Place IDs, no API keys).
- YouTube references live in a structured field — `r.youtube = [{ id, time?, creator? }]` — **not inline in `note`**. `app.js` renders each ref as a `📺 <creator> <time>` button in `.resto-actions` that links to `https://youtu.be/<id>?t=<seconds>`. Notes should describe the restaurant, not act as citations; the YouTube button is the citation. Use this pattern whenever research comes from the `youtube-survey` skill — one array entry per (video, timestamp) pair. Include `creator` (the channel name in Chinese) so the button reads "📺 厭世甜點店 01:20" etc. rather than a generic label. Multiple creators can cover the same restaurant — keep all refs in the array.
- `DAYS[].meals[]` and `DAYS[].timeline[]` items can carry a `refs: ["restaurant-id", "景點名稱", ...]` array that links each card/line to its Google Maps button + inherited `📺 <creator>` YouTube pills (auto-resolved from `RESTAURANTS` or `SIGHTS`). Prefer `refs` over embedding store names in prose — keeps the itinerary clickable. Also prefix timeline events with a leading emoji that matches the category (🍜 lunch · 🍲 dinner · 🥐 breakfast · 🧋 snack · ☕ cafe · 🛣️ roadside · 🎤 event · 🌉 bridge · 🦒 zoo · 🎨 art · ⚓ harbor · 🐉 temple / pagoda · ⚡ charging).
- **SSOT from data.js → index.html must flow one-way.** The page's `<title>`, `<meta name=description>`, `.brand-title`, `.brand-sub`, `.brand-emoji`, and footer year/title are populated by `renderBrand()` in `app.js` from `TRIP.title` / `TRIP.emoji` / `TRIP.dates` / `TRIP.people` / `TRIP.heroDesc`. Keep the hardcoded HTML text as a pre-JS fallback only — never edit it as the live copy. When dates / people / title change in `data.js`, the header and tab title update automatically.

Then from the **repo root**:

```bash
npm run test:data && npm run test:render
```

Both must pass. The glob `trips/*/tests/*.test.mjs` picks up every trip automatically — so when you add a new trip, running tests from root checks all trips at once.

Once green:
```bash
npm run preview       # builds dist/ and serves at localhost:8000 for a visual check
```

Finally, `git init && git add -A && git commit -m "add trip: <title>"` (or just `git add trips/<slug>` if it's a second+ trip in an existing repo).

### Phase 5 — Publish to GitHub Pages (one shot)

If the user asks to push/deploy, do it end-to-end without making them click through Settings. **Before creating a remote, scan for privacy leaks** (credit-card / phone / passport / ID numbers, booking confirmation codes, `.env` contents, API keys, personal emails); only push if clean. Then:

```bash
# 1. Create public repo and push (gh auth must already be set up)
gh repo create <user>/<repo> --public --source=. --remote=origin --push \
  --description "<short description>"

# 2. Enable Pages with GitHub Actions as source — this replaces the Settings → Pages click
gh api -X POST repos/<user>/<repo>/pages -f build_type=workflow

# 3. The push in step 1 already triggered deploy.yml, but it failed because Pages
#    wasn't enabled yet. Re-trigger now that Pages is configured:
gh workflow run deploy.yml --repo <user>/<repo>

# 4. Watch the run so you can report success/failure with the live URL
gh run list --repo <user>/<repo> --limit 1    # grab the new run id
gh run watch <run-id> --repo <user>/<repo> --exit-status
```

Site lands at `https://<user>.github.io/<repo>/`, each trip at `/<slug>/`. If `gh api .../pages` returns 409 the repo already has Pages configured — skip step 2.

Destructive-action guardrails still apply: never force-push, never create the repo under an org the user didn't name, confirm the visibility (`--public` vs `--private`) if the user didn't specify.

## Iterating later

Two scenarios:

**Editing an existing trip's content** — edit `trips/<slug>/src/data.js` directly. That's the SSOT. Don't touch `docs/references/` — frozen. Re-run tests from repo root.

**Adding another trip to the same repo** — invoke `/travel` again. The skill detects existing `trips.json` and appends. Landing page auto-updates next `npm run build`.

## Output folder structure

First-time scaffold produces:

```
<repo>/
├── index.html              ← landing page listing all trips (uses <!-- TRIPS --> placeholder)
├── styles.css              ← landing styles
├── build.js                ← assembles dist/ by copying each trip's src/ + rendering landing
├── trips.json              ← [{slug, title, dates, emoji, destinations, description}]
├── package.json            ← ONE jsdom dep, test script globs all trips
├── CLAUDE.md               ← repo-level rules
├── README.md
├── .gitignore, .nvmrc
├── .github/workflows/deploy.yml  ← runs build.js, deploys dist/
└── trips/
    └── <slug>/             ← ONE per trip
        ├── src/
        │   ├── index.html
        │   ├── styles.css
        │   ├── app.js
        │   ├── data.js     ← SSOT for this trip
        │   └── .nojekyll
        ├── tests/
        │   ├── data.test.mjs
        │   └── render.test.mjs
        ├── docs/
        │   ├── README.md
        │   └── references/ ← frozen research notes
        └── CLAUDE.md       ← per-trip SSOT rule
```

## Design constraints (intentional)

- **Zero build at site runtime**: no React/Vue/Tailwind/CDN. Plain `<script src="data.js">` + `<script src="app.js">`. The only Node work is `build.js` at deploy time, which just concatenates static files.
- **Offline-capable**: works over `file://` and flaky hotel wifi. No external font/CSS/JS fetches.
- **Google Maps via search URL only**: `https://www.google.com/maps/search/?api=1&query=<encoded name + address>`. Always works, no API key.
- **Mobile-first**: max-width 720px per-trip, 960px landing. Breakpoint 640px.
- **Three-layer test stack**: data tests catch schema drift; render tests (jsdom) catch `Object.entries(null)`-class runtime bugs; e2e (optional, Playwright) catches UI regressions. For vanilla-JS sites, the render layer has caught bugs e2e tests missed for this user — always include it.

## Edge cases

- **Single-destination trip**: works — just pass one city. `TRANSPORT.sections` can be `[]`.
- **No flights (train-only)**: `TRIP.flights = []`. The overview section gracefully hides.
- **Trip already in the past**: countdown shows "旅程結束". Still deployable as a memento.
- **User wants a trip-only folder (no repo)**: create the repo structure with just that one trip. Landing page shows a single card. Renaming the repo later is fine.
- **User has an existing OsakaTravel2026-style single-trip repo** and wants to migrate: not automated — tell them to create the multi-trip repo and copy their `src/`, `tests/`, `docs/` into `trips/<slug>/`. Rename `src/` if it was at root.

## Reference files

- `references/data-schema.md` — every field in `data.js`, with types and constraints
- `references/research-plan.md` — search query templates, what to extract per result
- `references/docs-layout.md` — what each `docs/references/*.md` file should contain
- `assets/template/repo/` — files created once per repo
- `assets/template/trip/` — files created per trip
- `scripts/scaffold.py` — the scaffolder (`--help` for flags)
