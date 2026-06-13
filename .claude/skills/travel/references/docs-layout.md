# `docs/references/` file layout

The `docs/` folder holds **frozen** research. Once the site is up, treat these files as read-only historical records — all further data edits go to `src/data.js` only. (See `assets/template/CLAUDE.md`.)

## Recommended files

### `<city>-restaurants.md` (one per major destination)

Group restaurants by category. Use the header format `## <Name> (<id>)` so the id is visible at a glance.

```md
# 大阪 — 餐廳研究

## 章魚燒

### たこ焼き道楽 わなか 道頓堀店 (wanaka)
- Category: takoyaki
- Location: 大阪府大阪市中央区道頓堀 1-6-7
- Rating: Tabelog 3.49 | 米其林必比登
- ...

### たこ家道頓堀くくる 本店 (kukuru)
- ...

## 壽司

### ...
```

### `<city>-sights.md` — or a combined `sights.md` if few

```md
# 大阪 — 景點研究

## 道頓堀
- City: 大阪
- Day fit: Day 1 (arrival stroll)
- Access: 地下鐵心齋橋站 6 號出口步行 5 分
- Why go: 招牌林立的夜景，固力果看板經典
- ...
```

### `transport.md`

Structured by section — mirrors `TRANSPORT.sections[]` in data.js.

```md
# 交通研究

## 關西機場 → 難波
| 選項 | 時間 | 票價 | 備註 |
|------|------|------|------|
| 南海特急ラピート | 38 分 | ¥1,490 | 需指定席券 |
| ... |

## 大阪市內地鐵

### 御堂筋線
- 梅田 ↔ 心齋橋 ↔ 難波
- ...
```

### `weather-packing.md`

```md
# 六月下旬 關西 天氣

- 平均氣溫: 21–29°C
- 濕度: 70–80%（梅雨末期）
- 降雨: 前一週機率 40%，後一週 20%
- UV 指數: 8–9（強）

# 打包建議

- 雨傘（輕便折傘）
- 排汗衣物
- ...
```

### `sources.md`

Flat list of every URL you fetched, with access date.

```md
# Sources

## Restaurants
- https://tabelog.com/osaka/A2701/A270101/27000001/ — わなか (accessed 2026-04-19)
- https://guide.michelin.com/jp/ja/kinki/osaka/bib-gourmand — Michelin Bib Gourmand 2024

## Sights
- ...

## Transport
- https://www.howto-osaka.com/en/ — Osaka Amazing Pass
- ...
```

## Why this matters

A later `/travel` session (or the user, months later) needs to reconstruct *why* a decision was made. The frozen research is the trail of breadcrumbs. Once you delete or edit it, that context is gone.

It's OK for `data.js` and `docs/references/` to diverge — that divergence IS the story of curation. Just don't try to sync them after the fact.
