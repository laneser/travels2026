# Research Plan — how to fill `docs/references/` and `src/data.js`

This doc tells you *what* to search for and *how* to shape the results. Read before you start spawning WebSearch calls.

## Principle: research once, write twice

You'll be tempted to dive straight into `data.js`. Don't. Write raw findings to `docs/references/*.md` first, then curate into `data.js`.

Why:
- Saves you from redoing searches when the user asks "wait, are there any Michelin-star options we missed?"
- Lets the user audit your sources.
- `docs/references/` is intentionally frozen (see `assets/template/CLAUDE.md`) — a historical record of *what was available when we planned*, even if we later narrow down.

## The search budget

Realistic budget for a 5-day trip to one region: **15–25 web searches + 5–10 WebFetches**. Going over that is a sign you're second-guessing rather than curating. Stop, write down what you have, and only search more if the user flags a gap.

Prefer fewer, better-targeted queries over many vague ones.

## Restaurants — search templates

For a Japan trip, use these query patterns (substitute city / cuisine):

```
<city> <cuisine> tabelog おすすめ
<city> <cuisine> ミシュラン 2024
<city> <neighborhood> lunch menu 予約
"<restaurant name>" 食べログ 評価
```

For non-Japan trips, adapt to the local equivalent (e.g., Bib Gourmand lists for Europe, Eater guides for US cities, 大眾點評 for China).

### What to capture per restaurant

Everything you'd need to write a `data.js` entry:
- Name (original script + romanization if non-Latin)
- Category — map to your CATEGORIES dictionary
- City + neighborhood + street address
- Tabelog / Google rating (number), price band (¥, $, etc.)
- One standout fact (Michelin? Bib Gourmand? 100-year-old? Signature dish?)
- Hours, reservation policy (walk-in? LINE? TableCheck?)
- A sentence on *why a traveler should go* — not a generic description

Skip: marketing copy, long histories, menu translations for every dish. Save those for `data.js`'s `note` only if genuinely useful.

### How much is enough

Aim for **8–15 restaurants per major destination**, balanced:
- 2–3 cheap eats (street food, noodles)
- 3–5 mid-range
- 2–3 splurge / special-occasion
- 1–2 breakfast/cafe spots

Too few = site feels thin. Too many = the filter UI becomes noise.

## Sights

Search pattern:
```
<city> 必訪景點 2024
<city> <day> trip itinerary
<neighborhood> 散步 ルート
```

Capture per sight: name, nearest station / access, what makes it worth an hour, which day it fits on. Aim for **3–6 per destination** tied to actual days in the itinerary — not a generic Top-20 list.

## YouTube vlogs (中文創作者) — do this for food AND sights

A travel site feels alive when each restaurant/sight card carries a `📺 <creator>` button to a real walk-through video. **Treat this as a first-class research pass, not an afterthought.** Run it for the curated restaurants and the headline sights once their names are settled.

Use the `youtube-survey` skill (it calls YouTube's InnerTube API — works when WebFetch returns near-empty for a watch page) or plain WebSearch:

```
"<店名/景點 中文或當地原文>" youtube 痛風老饕 | Kiki | 食尚玩家
<city> <cuisine> vlog 中文 心得
<景點> 一日遊 youtube
```

Lean on the Chinese/Taiwanese/HK creators travellers actually watch — e.g. **痛風老饕、Kiki、滔滔、肥波、食尚玩家**, plus whatever region-specific channel you find (Korea, Thailand, Europe… capture the *real* channel name you saw). Prefer creators the user already trusts if they named any.

**Hard rules (or the buttons become lies):**
- The `id` MUST be the 11-char id from a real `youtube.com/watch?v=…` / `youtu.be/…` URL you actually saw in results. **Never invent or guess an id.** No match → skip that entry. 寧缺勿假。
- **Verify every id resolves before committing it.** Cheapest check — the oEmbed endpoint returns 200 + JSON for a live video, 404/401 for a dead one:
  ```bash
  curl -s -o /dev/null -w "%{http_code}" \
    "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<ID>&format=json"
  ```
  Drop any id that isn't `200`. (A workflow can fan this out across all ids at once.)
- `time` (e.g. `08:31`) only when the clip clearly points at that spot in the video; otherwise omit.
- `creator` = the channel's Chinese name, so the button reads `📺 痛風老饕 08:31`.

**Gotcha — per-store search misses aggregated vlogs (search creator-first too):**
Searching `"<店名>" youtube <creator>` one store at a time only finds videos whose *title* names that store. But the creators users care about (痛風老饕, 肥波, Kiki…) mostly publish **one video covering many shops** ("首爾 foodlog 18 餐", "最想二刷的 10 家店") — the title names none of them, so per-store search silently returns nothing and you wrongly conclude "this creator has no content for this city." Always **also search creator-first**: `<creator> <city>` / `<creator> <country> 美食`, confirm the channel via oEmbed `author_name`, then `youtube-survey` the video to pull its **chapters + description** (creators list `MM:SS 店名 地址` per stop) and map each stop back to a restaurant — adding the shop to your list if it's not there yet. A single aggregated vlog can enrich 5–10 cards with exact timestamps. (Real miss: a first pass searched per-store for a Seoul trip and found zero 痛風老饕 hits; a creator-first pass found two 首爾 vlogs covering ~20 shops, several right on the itinerary.)

Shape (same for `RESTAURANTS[].youtube` and `SIGHTS[].youtube`):
```js
youtube: [
  { id: "hPXEoK2C68E", time: "08:31", creator: "痛風老饕" },
  { id: "WGEUyFK68cM", creator: "Kiki" },
]
```
Multiple creators per place is good — keep them all. Card support differs by type: **restaurants** also render `website` (🌐 官網) and **shopping** spots render `links: [{label,url}]` (🔗); **sights** support `youtube` only. Validate those URLs too (an HTTP HEAD that isn't 4xx/5xx).

## Transport

This is the section most likely to be stale. Double-check:
- Airport → first city: options, time, fare, whether reserved seats needed
- Between destinations: train/bus options, pass availability
- Intra-city: metro / tram / bus basics, IC card info
- Day-trip routes (if relevant)

Search pattern:
```
<airport code> to <city> <year>
<city A> to <city B> <train type> timetable fare
<country/region> IC card 2024 tourist
```

For Japan specifically: check if the JR Pass / regional passes are still worth it (rules changed in 2023). Users often care about this.

## Tips — seasonal + practical

Weather: look up historical averages for the specific month (not just "summer in Japan"). Humidity matters.

Packing: lean on the weather data + any activity-specific needs (e.g., "walk a lot" → comfortable shoes).

Reminders: visa, currency, plug type, tipping etiquette, language apps. Be specific — a generic "bring a phrasebook" is useless.

Rainy-day alternatives: indoor museums, arcades, department-store food halls. The reference project has a good list for Osaka; adapt to your cities.

## Saving research to `docs/references/`

Suggested file breakdown:

```
docs/references/
├── <city1>-restaurants.md
├── <city2>-restaurants.md
├── <city>-sights.md          # or combine into one "sights.md"
├── transport.md
├── weather-packing.md
└── sources.md
```

Each restaurant/sight file entry should look like:

```md
## たこ焼き道楽 わなか 道頓堀店 (wanaka)

- **Category**: takoyaki (章魚燒)
- **Location**: 大阪府大阪市中央区道頓堀 1-6-7
- **Rating**: Tabelog 3.49 | 米其林必比登
- **Price**: ¥650–700 / 8 顆
- **Hours**: ~23:00 close
- **Why go**: 銅板高溫燒烤，外酥內軟。招牌「おいり」四味拼盤。
- **Source**: https://tabelog.com/osaka/A2701/...
- **Day fit**: Day 1 (arrival day stroll)
```

The `(wanaka)` in the header is the `id` you'll use in `data.js`.

## `sources.md`

One-line-per-URL log of everything you fetched. Lets the user spot-check and lets future-you avoid refetching.

```md
# Sources

- https://tabelog.com/osaka/A2701/... (accessed 2026-04-19)
- https://michelin.com/jp/ja/kansai/... (accessed 2026-04-19)
...
```

## Handoff: raw research → `data.js`

Once `docs/references/` is in decent shape:

1. Start with `CATEGORIES` — survey all the cuisines you captured and create keys.
2. Fill `RESTAURANTS` — each entry with an id matching your research headers.
3. Fill `DAYS[].categories` — pick 2–4 categories per day that match the theme.
4. **Run `npm run test:data` early and often**. The "every day.category has a matching restaurant" check catches drift instantly.
5. Fill `TRANSPORT.sections` and `TIPS.sections`.
6. Fill `SIGHTS` last — sight curation benefits from already knowing each day's rhythm.
7. Run `npm run test:render` to catch any runtime bugs in `app.js` exposed by your data shape.

When tests pass, do `cd src && python3 -m http.server 8000` and eyeball it in a browser. Things to check visually that tests miss:
- Does the hero look right on mobile width (375px)?
- Do long restaurant notes wrap cleanly?
- Are there any ugly `undefined` text nodes anywhere?
