// Assemble dist/ for GitHub Pages.
//
//   dist/index.html           — landing (this script fills in <!-- TRIPS -->)
//   dist/styles.css           — landing styles
//   dist/<slug>/              — copy of trips/<slug>/src/
//
// Reads the trip registry from trips.json.

import { readFileSync, writeFileSync, cpSync, rmSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = __dirname;
const dist = resolve(root, 'dist');

const trips = JSON.parse(readFileSync(resolve(root, 'trips.json'), 'utf8'));

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

// Copy every trip's src/ to dist/<slug>/
for (const t of trips) {
  const srcDir = resolve(root, 'trips', t.slug, 'src');
  if (!existsSync(srcDir)) {
    console.warn(`! trips.json references ${t.slug} but ${srcDir} is missing — skipping`);
    continue;
  }
  cpSync(srcDir, resolve(dist, t.slug), { recursive: true });
}

// Render landing page
const escape = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

let cards;
if (!trips.length) {
  cards = `<div class="empty">尚無旅行。跑 <code>/travel</code> 新增一趟。</div>`;
} else {
  cards = trips.map((t) => {
    const badges = (t.destinations || [])
      .map((d) => `<span class="trip-badge">${escape(d)}</span>`).join('');
    const desc = t.description ? `<div class="trip-desc">${escape(t.description)}</div>` : '';
    const badgesBlock = badges ? `<div class="trip-badges">${badges}</div>` : '';
    return `<a class="trip-card" href="./${escape(t.slug)}/">
  <div class="trip-emoji">${escape(t.emoji || '✈️')}</div>
  <div class="trip-title">${escape(t.title)}</div>
  <div class="trip-dates">${escape(t.dates)}</div>
  ${badgesBlock}
  ${desc}
</a>`;
  }).join('\n');
}

const landing = readFileSync(resolve(root, 'index.html'), 'utf8');
writeFileSync(resolve(dist, 'index.html'), landing.replace('<!-- TRIPS -->', cards));
cpSync(resolve(root, 'styles.css'), resolve(dist, 'styles.css'));
writeFileSync(resolve(dist, '.nojekyll'), '');

console.log(`✓ Built dist/ with ${trips.length} trip(s): ${trips.map((t) => t.slug).join(', ') || '(empty)'}`);
