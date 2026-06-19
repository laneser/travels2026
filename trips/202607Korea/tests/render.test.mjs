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
});

describe('Day map', () => {
  // A day has a route if any timeline entry resolves at least one ref.
  const resolvable = (refs) => {
    const { RESTAURANTS, SIGHTS, SHOPPING } = dom.window.TRIP_DATA;
    const spots = (SHOPPING && SHOPPING.spots) || [];
    return (refs || []).some((ref) =>
      RESTAURANTS.some((r) => r.id === ref) ||
      SIGHTS.some((s) => s.name === ref) ||
      spots.some((s) => s.name === ref));
  };
  const daysWithRoute = () =>
    dom.window.TRIP_DATA.DAYS.filter((d) => (d.timeline || []).some((t) => resolvable(t.refs)));

  test('every day with resolvable timeline refs renders a map iframe', () => {
    for (const d of daysWithRoute()) {
      const card = dom.window.document.getElementById(`day-${d.day}`);
      assert.ok(card.querySelector('iframe.day-map[src*="output=embed"]'),
        `Day ${d.day} missing map iframe`);
    }
  });
  test('map iframes use google maps with no API key', () => {
    for (const f of dom.window.document.querySelectorAll('iframe.day-map')) {
      const src = f.getAttribute('src') || '';
      assert.ok(/maps\.google\.com/.test(src), `unexpected map src: ${src}`);
      assert.ok(!/[?&]key=/.test(src), `map src must not embed an API key: ${src}`);
    }
  });
  test('every day map has a full-route Google Maps link', () => {
    for (const d of daysWithRoute()) {
      const card = dom.window.document.getElementById(`day-${d.day}`);
      assert.ok(card.querySelector('.day-map-link[href*="google.com/maps"]'),
        `Day ${d.day} missing full-route link`);
    }
  });

  // Each day pins fixed anchors (origin city / hotel / airports) on its route via
  // d.route.start / d.route.end. The rendered ".day-map-trail" text is the ordered
  // "A → B → C" list, so we assert the trail starts/ends at the expected anchor.
  const trail = (day) => {
    const card = dom.window.document.getElementById(`day-${day}`);
    assert.ok(card, `Day ${day} card missing`);
    const el = card.querySelector('.day-map-trail');
    assert.ok(el, `Day ${day} missing .day-map-trail`);
    return el.textContent;
  };
  const { PLACES, TRIP } = dom.window.TRIP_DATA;
  const HOTEL = TRIP.hotel.name;

  test('every day route pins its start and end anchors', () => {
    for (const d of dom.window.TRIP_DATA.DAYS) {
      assert.ok(d.route && d.route.start && d.route.end,
        `Day ${d.day} missing route.start/route.end`);
      const resolve = (k) => (k === '飯店' ? HOTEL : (PLACES[k] ? PLACES[k].name : k));
      const t = trail(d.day);
      const stops = t.split('→').map((s) => s.trim());
      assert.equal(stops[0], resolve(d.route.start),
        `Day ${d.day} trail should start at ${d.route.start}: ${t}`);
      assert.equal(stops[stops.length - 1], resolve(d.route.end),
        `Day ${d.day} trail should end at ${d.route.end}: ${t}`);
    }
  });

  test('Day 1 route passes through 金浦機場 and 乙支路4街站 to the hotel', () => {
    const t = trail(1);
    for (const k of ['松山機場', '金浦機場', '乙支路4街站']) {
      assert.ok(t.includes(PLACES[k].name), `Day 1 trail missing ${k}: ${t}`);
    }
  });

  test('Day 4 route passes through KSPO DOME (concert venue)', () => {
    const t = trail(4);
    assert.ok(t.includes(PLACES['KSPO DOME'].name), `Day 4 trail missing KSPO DOME: ${t}`);
  });

  test('Day 5 route passes through 乙支路4街站 and 金浦機場 on the way to 松山機場', () => {
    const t = trail(5);
    for (const k of ['乙支路4街站', '金浦機場', '松山機場']) {
      assert.ok(t.includes(PLACES[k].name), `Day 5 trail missing ${k}: ${t}`);
    }
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
  test('sights are no longer rendered in the 實用 tab', () => {
    const sightsInTips = dom.window.document.querySelectorAll('#tips-sections .sight');
    assert.equal(sightsInTips.length, 0, 'sights should now live in their own 景點 tab');
  });
});

describe('Sights', () => {
  const SIGHTS = () => dom.window.TRIP_DATA.SIGHTS || [];
  test('sight cards match SIGHTS.length', () => {
    const cards = dom.window.document.querySelectorAll('#sights-sections .sight');
    assert.equal(cards.length, SIGHTS().length);
  });
  test('every sight has a Google Maps button', () => {
    for (const s of dom.window.document.querySelectorAll('#sights-sections .sight')) {
      assert.ok(s.querySelector('.btn-map[href*="google.com/maps"]'),
        `sight "${s.querySelector('.sight-name')?.textContent}" missing Maps button`);
    }
  });
  test('sights with youtube refs render 📺 pills linking to youtu.be', () => {
    const expected = SIGHTS().reduce((n, s) => n + (s.youtube?.length || 0), 0);
    const pills = dom.window.document.querySelectorAll('#sights-sections .sight .btn-yt[href*="youtu.be"]');
    assert.equal(pills.length, expected,
      `expected ${expected} sight YouTube pills, got ${pills.length}`);
  });
  test('every sight renders 為什麼去 + 重點 intro labels', () => {
    const labels = dom.window.document.querySelectorAll('#sights-sections .sight .sight-why-label');
    assert.equal(labels.length, SIGHTS().length * 2,
      `expected ${SIGHTS().length * 2} intro labels (2 per sight), got ${labels.length}`);
  });
  test('sights are grouped under region cards', () => {
    const cards = dom.window.document.querySelectorAll('#sights-sections > .card');
    // intro card + one card per region present
    assert.ok(cards.length >= 2, `expected region group cards, got ${cards.length}`);
  });
});

describe('Shopping', () => {
  const spots = () => (dom.window.TRIP_DATA.SHOPPING || {}).spots || [];
  test('shopping spot cards match SHOPPING.spots.length', () => {
    const cards = dom.window.document.querySelectorAll('#shopping-sections .sight');
    assert.equal(cards.length, spots().length);
  });
  test('every shopping spot has a Google Maps button', () => {
    for (const s of dom.window.document.querySelectorAll('#shopping-sections .sight')) {
      assert.ok(s.querySelector('.btn-map[href*="google.com/maps"]'),
        `shopping "${s.querySelector('.sight-name')?.textContent}" missing Maps button`);
    }
  });
  test('shopping youtube refs render 📺 pills linking to youtu.be', () => {
    const expected = spots().reduce((n, s) => n + (s.youtube?.length || 0), 0);
    const pills = dom.window.document.querySelectorAll('#shopping-sections .sight .btn-yt[href*="youtu.be"]');
    assert.equal(pills.length, expected, `expected ${expected} shopping YouTube pills, got ${pills.length}`);
  });
  test('shopping links render as 🔗 buttons', () => {
    const expected = spots().reduce((n, s) => n + (s.links?.length || 0), 0);
    const links = dom.window.document.querySelectorAll('#shopping-sections .sight .btn-web[href^="http"]');
    assert.equal(links.length, expected, `expected ${expected} shopping link buttons, got ${links.length}`);
  });
});
