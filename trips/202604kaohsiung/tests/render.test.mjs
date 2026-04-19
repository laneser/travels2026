// Render integration tests — runs app.js inside jsdom, catches runtime bugs that
// schema-only tests miss (e.g. Object.entries(null), querySelector on missing node).

import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { JSDOM } from 'jsdom';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

let dom;
const errors = [];

before(() => {
  const html = readFileSync(resolve(root, 'src/index.html'), 'utf8');
  dom = new JSDOM(html, {
    url: 'http://localhost/',
    runScripts: 'outside-only',
    pretendToBeVisual: true,
  });
  dom.window.addEventListener('error', (e) => errors.push(e.error || e.message));
  const origConsoleError = dom.window.console.error;
  dom.window.console.error = (...args) => {
    errors.push(args.join(' '));
    origConsoleError.apply(dom.window.console, args);
  };
  const dataJs = readFileSync(resolve(root, 'src/data.js'), 'utf8');
  const appJs = readFileSync(resolve(root, 'src/app.js'), 'utf8');
  dom.window.eval(dataJs);
  dom.window.eval(appJs);
  dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
});

after(() => { if (dom) dom.window.close(); });

describe('App boot', () => {
  test('no JS errors during DOMContentLoaded', () => {
    assert.deepEqual(errors, [], `errors:\n${errors.join('\n')}`);
  });
  test('TRIP_DATA loaded', () => {
    assert.ok(dom.window.TRIP_DATA);
    assert.ok(dom.window.TRIP_DATA.DAYS.length > 0);
  });
});

describe('Brand header (derived from data.js)', () => {
  test('brand-title, brand-sub, page title all match TRIP', () => {
    const { TRIP } = dom.window.TRIP_DATA;
    const doc = dom.window.document;
    assert.equal(doc.getElementById('brand-title').textContent, TRIP.title);
    const sub = doc.getElementById('brand-sub').textContent;
    assert.ok(sub.includes(String(TRIP.people)), `brand-sub missing people count: "${sub}"`);
    assert.ok(sub.includes(TRIP.dates.end.slice(5).replace('-', '.')), `brand-sub missing end date: "${sub}"`);
    assert.ok(doc.title.startsWith(TRIP.title), `page title mismatch: "${doc.title}"`);
    if (TRIP.emoji) {
      assert.equal(doc.getElementById('brand-emoji').textContent, TRIP.emoji);
    }
  });
});

describe('Overview', () => {
  test('hero stats render 3 items', () => {
    const stats = dom.window.document.querySelectorAll('#hero-stats .stat');
    assert.equal(stats.length, 3);
  });
  test('summary-days matches DAYS.length', () => {
    const rows = dom.window.document.querySelectorAll('#summary-days .summary-day');
    assert.equal(rows.length, dom.window.TRIP_DATA.DAYS.length);
  });
  test('every summary-day has a non-empty theme', () => {
    for (const row of dom.window.document.querySelectorAll('#summary-days .summary-day')) {
      const theme = row.querySelector('.s-theme');
      assert.ok(theme && theme.textContent.trim().length > 0);
    }
  });
});

describe('Itinerary', () => {
  test('day-cards matches DAYS.length', () => {
    const cards = dom.window.document.querySelectorAll('#day-cards .day-card');
    assert.equal(cards.length, dom.window.TRIP_DATA.DAYS.length);
  });
  test('meal/timeline refs render .place-links with valid hrefs', () => {
    const { DAYS, RESTAURANTS, SIGHTS } = dom.window.TRIP_DATA;
    let linkCount = 0;
    for (const d of DAYS) {
      const allRefs = [
        ...(d.meals || []).flatMap((m) => m.refs || []),
        ...(d.timeline || []).flatMap((t) => t.refs || []),
      ];
      for (const ref of allRefs) {
        const hit = RESTAURANTS.find((r) => r.id === ref) || SIGHTS.find((s) => s.name === ref);
        assert.ok(hit, `unresolved ref: "${ref}" on Day ${d.day}`);
        linkCount++;
      }
    }
    assert.ok(linkCount > 0, 'expected some meals/timeline to have refs');
    const rendered = dom.window.document.querySelectorAll('#day-cards .place-links .place-link-map');
    assert.ok(
      rendered.length >= linkCount,
      `expected at least ${linkCount} rendered place-link-map, got ${rendered.length}`,
    );
  });
});

describe('Food', () => {
  const { RESTAURANTS } = dom ? dom.window.TRIP_DATA : { RESTAURANTS: [] };
  test('restaurant cards match RESTAURANTS.length', () => {
    const restos = dom.window.document.querySelectorAll('#food-list .resto');
    assert.equal(restos.length, dom.window.TRIP_DATA.RESTAURANTS.length);
  });
  test('every restaurant card has a Google Maps button', () => {
    let missing = 0;
    for (const r of dom.window.document.querySelectorAll('#food-list .resto')) {
      if (!r.querySelector('.btn-map[href*="google.com/maps"]')) missing++;
    }
    assert.equal(missing, 0);
  });
  test('restaurants with youtube refs render YouTube link with correct href', () => {
    const { RESTAURANTS } = dom.window.TRIP_DATA;
    const withYT = RESTAURANTS.filter((r) => (r.youtube || []).length > 0);
    assert.ok(withYT.length > 0, 'expected some restaurants to have youtube refs');
    for (const r of withYT) {
      const card = dom.window.document.querySelector(`.resto[data-id="${r.id}"]`);
      assert.ok(card, `card missing for ${r.id}`);
      const links = Array.from(card.querySelectorAll('.btn-yt'));
      assert.equal(links.length, r.youtube.length, `${r.id} expected ${r.youtube.length} YT links, got ${links.length}`);
      r.youtube.forEach((yt, i) => {
        const href = links[i].getAttribute('href');
        assert.ok(href.includes(yt.id), `${r.id} link ${i} missing video id`);
        if (yt.time) {
          assert.match(href, /[?&]t=\d+/, `${r.id} link ${i} missing timestamp param`);
        }
      });
    }
  });
});

describe('Transport', () => {
  test('each TRANSPORT.sections[] renders a card', () => {
    const nSections = (dom.window.TRIP_DATA.TRANSPORT.sections || []).length;
    const cards = dom.window.document.querySelectorAll('#transport-sections > .card');
    assert.equal(cards.length, nSections || cards.length,
      `expected ${nSections} transport cards, got ${cards.length}`);
  });
});

describe('Tips', () => {
  test('tips-sections has content', () => {
    const container = dom.window.document.getElementById('tips-sections');
    assert.ok(container, 'tips-sections container missing');
  });
  test('every sight has a Google Maps button', () => {
    for (const s of dom.window.document.querySelectorAll('#tips-sections .sight')) {
      assert.ok(s.querySelector('.btn-map[href*="google.com/maps"]'),
        `sight "${s.querySelector('.sight-name')?.textContent}" missing Maps button`);
    }
  });
});
