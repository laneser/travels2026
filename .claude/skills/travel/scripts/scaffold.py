#!/usr/bin/env python3
"""
Scaffold a multi-trip travel repo, or add a new trip to an existing one.

Two modes (auto-detected from --repo):

1. **Init + first trip** — `--repo <path>` doesn't exist or has no `trips.json`.
   Creates the repo-level files (index.html, styles.css, build.js, deploy.yml,
   package.json, CLAUDE.md, .gitignore, .nvmrc, trips.json) AND the first trip
   folder under `trips/<slug>/`.

2. **Append trip** — `--repo <path>/trips.json` already exists.
   Creates `trips/<slug>/`, appends to `trips.json`. Repo-level files are untouched.

After scaffolding (first time):
    cd <repo>
    npm install
    npm test          # verify scaffolded trip(s) pass
    npm run preview   # build + serve on localhost:8000
"""

from __future__ import annotations

import argparse
import json
import shutil
import sys
from datetime import date, timedelta
from pathlib import Path

SKILL_DIR = Path(__file__).resolve().parent.parent
TEMPLATE_DIR = SKILL_DIR / "assets" / "template"
REPO_TEMPLATE = TEMPLATE_DIR / "repo"
TRIP_TEMPLATE = TEMPLATE_DIR / "trip"

# Files in the trip template that get placeholder substitution.
TRIP_SUBSTITUTE_FILES = [
    "src/index.html",
    "src/data.js",
    "CLAUDE.md",
]

# Files in the repo template that get placeholder substitution.
REPO_SUBSTITUTE_FILES = [
    "index.html",
    "package.json",
    "README.md",
    "CLAUDE.md",
]


def parse_date(s: str) -> date:
    try:
        return date.fromisoformat(s)
    except ValueError:
        raise argparse.ArgumentTypeError(f"invalid date {s!r}, expected YYYY-MM-DD")


def slugify(s: str) -> str:
    out = []
    for ch in s.lower():
        if ch.isalnum():
            out.append(ch)
        elif ch in " -_":
            out.append("-")
    slug = "".join(out).strip("-")
    while "--" in slug:
        slug = slug.replace("--", "-")
    return slug or "trip"


def build_days_stubs(start: date, end: date, destinations: list[str]) -> list[dict]:
    dow_zh = ["一", "二", "三", "四", "五", "六", "日"]
    days = []
    n = (end - start).days + 1
    for i in range(n):
        d = start + timedelta(days=i)
        city = destinations[min(i, len(destinations) - 1)] if destinations else ""
        is_first = i == 0
        is_last = i == n - 1
        if is_first:
            theme = f"抵達・{city}"
        elif is_last:
            theme = "回程"
        else:
            theme = f"Day {i + 1}・{city}"
        days.append({
            "day": i + 1,
            "date": d.isoformat(),
            "dow": dow_zh[d.weekday()],
            "city": city,
            "theme": theme,
            "summary": "",
            "level": "💰",
            "timeline": [],
            "meals": [],
            "categories": [],
        })
    return days


def substitute(content: str, vars: dict[str, str]) -> str:
    for key, value in vars.items():
        content = content.replace("{{" + key + "}}", value)
    return content


def copy_tree(src: Path, dst: Path) -> None:
    dst.mkdir(parents=True, exist_ok=True)
    for item in src.rglob("*"):
        rel = item.relative_to(src)
        target = dst / rel
        if item.is_dir():
            target.mkdir(parents=True, exist_ok=True)
        else:
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(item, target)


def apply_substitutions(root: Path, files: list[str], vars: dict[str, str]) -> None:
    for rel in files:
        path = root / rel
        if not path.exists():
            continue
        text = path.read_text(encoding="utf-8")
        path.write_text(substitute(text, vars), encoding="utf-8")


def scaffold_repo(repo: Path, repo_title: str, repo_slug: str, repo_desc: str, repo_lang: str) -> None:
    """Create repo-level files. Idempotent: skips if trips.json already exists."""
    trips_json = repo / "trips.json"
    if trips_json.exists():
        return
    if repo.exists() and any(repo.iterdir()):
        raise SystemExit(f"error: {repo} exists and is non-empty but has no trips.json (refusing to overwrite). Choose an empty --repo or an existing travel repo.")
    copy_tree(REPO_TEMPLATE, repo)
    vars = {
        "REPO_TITLE": repo_title,
        "REPO_SLUG": repo_slug,
        "REPO_DESCRIPTION": repo_desc,
        "REPO_LANG": repo_lang,
    }
    apply_substitutions(repo, REPO_SUBSTITUTE_FILES, vars)


def scaffold_trip(repo: Path, slug: str, trip_vars: dict[str, str]) -> None:
    trip_dir = repo / "trips" / slug
    if trip_dir.exists() and any(trip_dir.iterdir()):
        raise SystemExit(f"error: {trip_dir} already exists and is non-empty. Pick a different --slug.")
    copy_tree(TRIP_TEMPLATE, trip_dir)
    apply_substitutions(trip_dir, TRIP_SUBSTITUTE_FILES, trip_vars)


def append_to_registry(repo: Path, entry: dict) -> None:
    trips_json = repo / "trips.json"
    current = json.loads(trips_json.read_text(encoding="utf-8"))
    # Dedupe by slug — if already present, replace.
    current = [t for t in current if t.get("slug") != entry["slug"]]
    current.append(entry)
    trips_json.write_text(json.dumps(current, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def format_days_js(days: list[dict]) -> str:
    return json.dumps(days, ensure_ascii=False, indent=2)


def format_list_js(items: list[str]) -> str:
    return json.dumps(items, ensure_ascii=False)


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)

    # Repo
    parser.add_argument("--repo", required=True, type=Path,
                        help="Absolute path to the multi-trip repo (created if missing).")
    parser.add_argument("--repo-title", default="我的旅行",
                        help='Landing-page title (default: "我的旅行"). Used only on first init.')
    parser.add_argument("--repo-slug", default=None,
                        help="Repo folder name for package.json. Default: derived from --repo name.")
    parser.add_argument("--repo-description", default="旅行規劃集錦 · vanilla JS · GitHub Pages",
                        help="Repo-level description. Used only on first init.")
    parser.add_argument("--repo-lang", default="zh-Hant",
                        help="HTML lang for the landing page (default zh-Hant). Used only on first init.")

    # Trip
    parser.add_argument("--slug", required=True, help="kebab-case folder name for this trip (e.g., osaka-2026)")
    parser.add_argument("--title", required=True, help='Trip title, e.g., "關西優雅美食之旅"')
    parser.add_argument("--start", required=True, type=parse_date, help="YYYY-MM-DD")
    parser.add_argument("--end", required=True, type=parse_date, help="YYYY-MM-DD (inclusive)")
    parser.add_argument("--people", required=True, type=int)
    parser.add_argument("--origin", required=True, help='e.g., "台北 TPE"')
    parser.add_argument("--destinations", required=True,
                        help='comma-separated, e.g., "大阪,神戶,奈良"')
    parser.add_argument("--emoji", default="✈️", help="emoji for trip header + landing card")
    parser.add_argument("--lang", default="zh-Hant", help="HTML lang attribute for this trip (default zh-Hant)")
    parser.add_argument("--country", default="", help='ISO code, e.g., "JP" (enables Tabelog buttons)')
    parser.add_argument("--subtitle", default="", help="optional header subtitle for this trip")
    parser.add_argument("--hero-title", default="", help="optional hero headline (default = --title)")
    parser.add_argument("--hero-desc", default="", help="optional hero description")
    parser.add_argument("--description", default="", help="one-sentence summary; shown on landing-page card")

    args = parser.parse_args(argv)

    if args.end < args.start:
        raise SystemExit("error: --end must be >= --start")

    destinations = [d.strip() for d in args.destinations.split(",") if d.strip()]
    if not destinations:
        raise SystemExit("error: --destinations cannot be empty")

    repo = args.repo.expanduser().resolve()
    repo_slug = args.repo_slug or slugify(repo.name) or "travels"
    is_new_repo = not (repo / "trips.json").exists()

    # Step 1: scaffold repo-level files if needed.
    scaffold_repo(repo, args.repo_title, repo_slug, args.repo_description, args.repo_lang)

    # Step 2: build per-trip variables.
    people_label = f"{args.people} 位大人" if args.lang.startswith("zh") else f"{args.people} people"
    start_fmt = f"{args.start.month}/{args.start.day}"
    end_fmt = f"{args.end.month}/{args.end.day}"
    dates_label = f"{args.start.year}.{args.start.month:02d}.{args.start.day:02d} – {args.end.month:02d}.{args.end.day:02d}"
    description = args.description or f"{args.title} 互動式旅行規劃"
    hero_title = args.hero_title or args.title
    hero_desc = args.hero_desc or args.subtitle or f"{start_fmt}–{end_fmt}・{' × '.join(destinations)}"

    days_stubs = build_days_stubs(args.start, args.end, destinations)

    trip_vars = {
        "TITLE": args.title,
        "SUBTITLE": args.subtitle,
        "HERO_TITLE": hero_title,
        "HERO_DESC": hero_desc,
        "DATES": dates_label,
        "START": args.start.isoformat(),
        "END": args.end.isoformat(),
        "PEOPLE": str(args.people),
        "PEOPLE_LABEL": people_label,
        "ORIGIN": args.origin,
        "DESTINATIONS_LABEL": " × ".join(destinations),
        "DESTINATIONS_JSON": format_list_js(destinations),
        "EMOJI": args.emoji,
        "EMOJI_URL": args.emoji,
        "LANG": args.lang,
        "COUNTRY": args.country,
        "SLUG": args.slug,
        "DESCRIPTION": description,
        "YEAR": str(args.start.year),
        "DAYS_JSON": format_days_js(days_stubs),
    }

    # Step 3: create trip folder.
    scaffold_trip(repo, args.slug, trip_vars)

    # Step 4: append to trips.json registry.
    registry_entry = {
        "slug": args.slug,
        "title": args.title,
        "dates": dates_label,
        "start": args.start.isoformat(),
        "end": args.end.isoformat(),
        "emoji": args.emoji,
        "destinations": destinations,
        "description": args.description,
    }
    append_to_registry(repo, registry_entry)

    # Step 5: report.
    print(f"✓ {'Created repo and added' if is_new_repo else 'Added'} trip: {args.title}")
    print(f"  repo:   {repo}")
    print(f"  trip:   trips/{args.slug}/")
    print(f"  dates:  {dates_label}")
    print()
    print("Next steps:")
    print(f"  cd {repo}")
    if is_new_repo:
        print("  npm install")
    print("  npm test                     # verify the scaffolded trip(s) pass")
    print("  npm run preview              # build + serve on localhost:8000")
    print()
    print(f"Then fill trips/{args.slug}/src/data.js with real content.")
    print("Save raw research to docs/references/ first — see SKILL.md Phase 3.")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
