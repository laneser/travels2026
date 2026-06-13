// {{TITLE}} — data.js (SSOT)
// Edit this file to update the site. Re-run `npm test` after changes.

const TRIP = {
  title: "{{TITLE}}",
  subtitle: "{{SUBTITLE}}",
  heroTitle: "{{HERO_TITLE}}",
  heroDesc: "{{HERO_DESC}}",
  dates: { start: "{{START}}", end: "{{END}}" },
  people: {{PEOPLE}},
  country: "{{COUNTRY}}",     // ISO code; "JP" unlocks Tabelog buttons on food cards.
  origin: "{{ORIGIN}}",
  destinations: {{DESTINATIONS_JSON}},
  // Optional — fill in as you collect info:
  hotel: null,                 // { name, area, address, note, walking: [{to, minutes}] }
  flights: [],                 // [{ label, code, from, to, departure, arrival, date }]
  budget: null,                // { perPerson: {min,max,currency}, fixed, local, fx, note }
  extraCards: [],              // [{ icon, title, rows: [{key,val,wrap?}], body? }]
};

// One entry per calendar day between TRIP.dates.start and TRIP.dates.end (inclusive).
const DAYS = {{DAYS_JSON}};

// Food category dictionary. Keys are referenced by RESTAURANTS[].category and DAYS[].categories[].
const CATEGORIES = {
  local: { label: "在地美食", icon: "🍽️" },
};

// Restaurants / food spots. Aim for several per destination across price points.
// Required: id (unique, url-safe), name, category, city, days (array of day numbers).
// Optional: area, address, tabelog, price, highlight, note, hours, reservation, website.
const RESTAURANTS = [];

// Transport sections are fully data-driven. See app.js renderTransport for type definitions.
// Each section: { icon, title, type: "options" | "table" | "info-rows" | "text", items, note? }
const TRANSPORT = {
  sections: [],
};

// Tips sections are also data-driven.
// type: "info-rows" | "checklist" | "reminders" | "sights" | "breakfast" | "text"
const TIPS = {
  sections: [],
};

// Sights auto-append to the Tips tab if TIPS.sections doesn't already include a "sights" section.
// Each: { name, city, day, time, note, address? }
const SIGHTS = [];

window.TRIP_DATA = { TRIP, DAYS, CATEGORIES, RESTAURANTS, TRANSPORT, TIPS, SIGHTS };
