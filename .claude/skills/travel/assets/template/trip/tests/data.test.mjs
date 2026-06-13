// Data integrity tests — validates src/data.js schema and invariants.
// Run with: npm run test:data

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script, createContext } from 'node:vm';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataJsPath = resolve(__dirname, '../src/data.js');

function loadData() {
  const code = readFileSync(dataJsPath, 'utf8');
  const sandbox = { window: {} };
  const ctx = createContext(sandbox);
  new Script(code, { filename: dataJsPath }).runInContext(ctx);
  if (!sandbox.window.TRIP_DATA) throw new Error('data.js did not set window.TRIP_DATA');
  return sandbox.window.TRIP_DATA;
}

const { TRIP, DAYS, CATEGORIES, RESTAURANTS, TRANSPORT, TIPS, SIGHTS } = loadData();

describe('TRIP', () => {
  test('dates valid and end >= start', () => {
    assert.match(TRIP.dates.start, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(TRIP.dates.end, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(new Date(TRIP.dates.end) >= new Date(TRIP.dates.start));
  });
  test('people is positive integer', () => {
    assert.ok(Number.isInteger(TRIP.people) && TRIP.people > 0);
  });
  test('title present', () => {
    assert.ok(TRIP.title && TRIP.title.length > 0);
  });
});

describe('DAYS', () => {
  test('day count matches date range', () => {
    const start = new Date(TRIP.dates.start);
    const end = new Date(TRIP.dates.end);
    const nDays = Math.round((end - start) / 86_400_000) + 1;
    assert.equal(DAYS.length, nDays, `expected ${nDays} days, got ${DAYS.length}`);
  });

  test('every day has required fields', () => {
    for (const d of DAYS) {
      assert.ok(d.day, 'day number missing');
      assert.match(d.date, /^\d{4}-\d{2}-\d{2}$/, `Day ${d.day} bad date`);
      assert.ok(d.theme, `Day ${d.day} missing theme`);
    }
  });

  test('dates sequential by 1 day', () => {
    for (let i = 1; i < DAYS.length; i++) {
      const diff = (new Date(DAYS[i].date) - new Date(DAYS[i - 1].date)) / 86_400_000;
      assert.equal(diff, 1, `Day ${DAYS[i].day} not consecutive`);
    }
  });

  test('day.categories all exist in CATEGORIES', () => {
    for (const d of DAYS) {
      for (const cat of (d.categories || [])) {
        assert.ok(CATEGORIES[cat], `Day ${d.day} uses unknown category "${cat}"`);
      }
    }
  });

  test('every meal has type and title', () => {
    for (const d of DAYS) {
      for (const m of (d.meals || [])) {
        assert.ok(m.type, `Day ${d.day} meal missing type`);
        assert.ok(m.title, `Day ${d.day} meal missing title`);
      }
    }
  });
});

describe('RESTAURANTS', () => {
  test('every restaurant has required fields', () => {
    for (const r of RESTAURANTS) {
      assert.ok(r.id, `restaurant missing id: ${r.name || JSON.stringify(r)}`);
      assert.ok(r.name, `${r.id} missing name`);
      assert.ok(r.category, `${r.id} missing category`);
      assert.ok(r.city, `${r.id} missing city`);
      assert.ok(Array.isArray(r.days) && r.days.length > 0, `${r.id} missing days`);
    }
  });

  test('ids unique and url-safe', () => {
    const ids = RESTAURANTS.map((r) => r.id);
    const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
    assert.equal(dup.length, 0, `duplicate ids: ${[...new Set(dup)].join(', ')}`);
    for (const id of ids) {
      assert.match(id, /^[a-z0-9][a-z0-9_-]*$/i, `id "${id}" not url-safe`);
    }
  });

  test('all categories exist in CATEGORIES', () => {
    for (const r of RESTAURANTS) {
      assert.ok(CATEGORIES[r.category], `${r.id} unknown category "${r.category}"`);
    }
  });

  test('all day numbers in 1..DAYS.length', () => {
    const maxDay = DAYS.length;
    for (const r of RESTAURANTS) {
      for (const d of r.days) {
        assert.ok(Number.isInteger(d) && d >= 1 && d <= maxDay, `${r.id} invalid day ${d}`);
      }
    }
  });

  test('each day.category has at least one matching restaurant', () => {
    const missing = [];
    for (const day of DAYS) {
      for (const cat of (day.categories || [])) {
        const hit = RESTAURANTS.some((r) => r.category === cat && r.days.includes(day.day));
        if (!hit) missing.push(`Day ${day.day} / ${cat}`);
      }
    }
    assert.equal(missing.length, 0, `no matching restaurant: ${missing.join('; ')}`);
  });

  test('tabelog ratings in 3.0..5.0 when present', () => {
    for (const r of RESTAURANTS) {
      if (r.tabelog != null) {
        assert.ok(typeof r.tabelog === 'number' && r.tabelog >= 3.0 && r.tabelog <= 5.0,
          `${r.id} tabelog=${r.tabelog} out of range`);
      }
    }
  });
});

describe('Google Maps URLs', () => {
  const mapsUrl = (name, addr) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} ${addr || ''}`.trim())}`;

  test('every restaurant produces valid URL containing its name', () => {
    for (const r of RESTAURANTS) {
      const url = mapsUrl(r.name, r.address);
      assert.match(url, /^https:\/\/www\.google\.com\/maps\/search\/\?api=1&query=/);
      const decoded = decodeURIComponent(url.split('query=')[1]);
      assert.ok(decoded.includes(r.name), `${r.id}: URL missing name`);
    }
  });

  test('every sight produces valid URL', () => {
    for (const s of SIGHTS) {
      const url = mapsUrl(s.name, s.address || s.city);
      assert.match(url, /^https:\/\/www\.google\.com\/maps\/search\/\?api=1&query=/);
    }
  });
});

describe('TRANSPORT', () => {
  test('sections array exists', () => {
    assert.ok(Array.isArray((TRANSPORT || {}).sections || []));
  });
  test('every section has title and valid type', () => {
    const validTypes = new Set(['options', 'table', 'info-rows', 'text']);
    for (const s of (TRANSPORT.sections || [])) {
      assert.ok(s.title, `transport section missing title`);
      assert.ok(validTypes.has(s.type), `transport section "${s.title}" unknown type "${s.type}"`);
      assert.ok(Array.isArray(s.items), `transport section "${s.title}" items not array`);
    }
  });
});

describe('TIPS', () => {
  test('sections array exists', () => {
    assert.ok(Array.isArray((TIPS || {}).sections || []));
  });
  test('every section has title and valid type', () => {
    const validTypes = new Set(['info-rows', 'checklist', 'reminders', 'sights', 'breakfast', 'text']);
    for (const s of (TIPS.sections || [])) {
      assert.ok(s.title, `tips section missing title`);
      assert.ok(validTypes.has(s.type), `tips section "${s.title}" unknown type "${s.type}"`);
      assert.ok(Array.isArray(s.items), `tips section "${s.title}" items not array`);
    }
  });
});

describe('SIGHTS', () => {
  test('every sight has name, city, day, note', () => {
    const maxDay = DAYS.length;
    for (const s of SIGHTS) {
      assert.ok(s.name, 'sight missing name');
      assert.ok(s.city, `sight "${s.name}" missing city`);
      assert.ok(Number.isInteger(s.day) && s.day >= 1 && s.day <= maxDay,
        `sight "${s.name}" invalid day ${s.day}`);
    }
  });
});
