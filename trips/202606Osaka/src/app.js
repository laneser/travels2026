// Travel site app.js — data-driven renderer.
// All destination-specific content lives in data.js. This file is generic.

(function () {
  const { TRIP, DAYS, CATEGORIES, RESTAURANTS, TRANSPORT, TIPS, SIGHTS, SIGHTS_META, SHOPPING, PLACES } = window.TRIP_DATA;
  const HOTEL = TRIP.hotel || null;

  // ============== Google Maps URL ==============
  function mapsUrl(name, address) {
    const query = encodeURIComponent(`${name} ${address || ""}`.trim());
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  }
  function placeQuery(p) {
    return `${p.name} ${p.address || ""}`.trim();
  }
  // No-API-key Google Maps embed (classic saddr/daddr+to: syntax → renders a route
  // line through the day's stops). Single stop falls back to a `q=` pin.
  function mapEmbedUrl(stops) {
    if (!stops || !stops.length) return "";
    if (stops.length === 1) {
      return `https://maps.google.com/maps?q=${encodeURIComponent(placeQuery(stops[0]))}&z=15&output=embed`;
    }
    const saddr = encodeURIComponent(placeQuery(stops[0]));
    const daddr = stops.slice(1).map((p) => encodeURIComponent(placeQuery(p))).join("+to:");
    return `https://maps.google.com/maps?saddr=${saddr}&daddr=${daddr}&output=embed`;
  }
  // Full-route link: opens Google Maps directions (walking) with waypoints.
  function mapDirUrl(stops) {
    if (!stops || !stops.length) return "";
    if (stops.length === 1) return mapsUrl(stops[0].name, stops[0].address);
    const enc = (p) => encodeURIComponent(placeQuery(p));
    const origin = enc(stops[0]);
    const destination = enc(stops[stops.length - 1]);
    const waypoints = stops.slice(1, -1).map(enc).join("%7C");
    let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`;
    if (waypoints) url += `&waypoints=${waypoints}`;
    return url;
  }
  function tabelogSearch(name) {
    return `https://tabelog.com/rstLst/?sw=${encodeURIComponent(name)}`;
  }
  function tsToSeconds(ts) {
    if (!ts) return 0;
    const parts = String(ts).split(":").map(Number);
    if (parts.some(isNaN)) return 0;
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return parts[0] || 0;
  }
  function youtubeUrl(ref) {
    if (!ref || !ref.id) return "";
    const s = tsToSeconds(ref.time);
    return s ? `https://youtu.be/${ref.id}?t=${s}` : `https://youtu.be/${ref.id}`;
  }

  // ============== DOM helpers ==============
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const el = (tag, attrs, ...children) => {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
      else if (v !== undefined && v !== null && v !== false) node.setAttribute(k, v);
    });
    children.flat().forEach((c) => {
      if (c == null || c === false) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  };

  function fmtDate(iso) {
    const d = new Date(iso + "T00:00:00");
    const m = d.getMonth() + 1, day = d.getDate();
    return `${m}/${day}`;
  }
  function stars(n) { return n ? "⭐".repeat(n) : ""; }

  // ============== Countdown ==============
  // Populate <title>, meta description, header brand and footer from TRIP.
  // Everything that was hardcoded in index.html and duplicated in data.js now
  // flows from data.js only.
  function fmtDates() {
    const s = (TRIP.dates.start || "").replace(/-/g, ".");
    const e = (TRIP.dates.end || "").replace(/-/g, ".");
    const eShort = e.slice(5); // "04.26" from "2026.04.26"
    return `${s} – ${eShort}`;
  }
  function renderBrand() {
    const datesLabel = fmtDates();
    const subLabel = `${datesLabel} ｜ ${TRIP.people} 位大人`;
    const setText = (id, text) => { const n = document.getElementById(id); if (n) n.textContent = text; };
    setText("brand-title", TRIP.title);
    setText("brand-sub", subLabel);
    setText("foot-title", TRIP.title);
    setText("foot-year", String(new Date().getFullYear()));
    const titleEl = document.getElementById("page-title");
    if (titleEl) titleEl.textContent = `${TRIP.title} ｜ ${datesLabel}`;
    const metaEl = document.getElementById("meta-desc");
    if (metaEl) metaEl.setAttribute("content", TRIP.heroDesc || TRIP.subtitle || TRIP.title);
    if (TRIP.emoji) {
      setText("brand-emoji", TRIP.emoji);
      // Also update favicon SVG to match.
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) {
        const svg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E${encodeURIComponent(TRIP.emoji)}%3C/text%3E%3C/svg%3E`;
        favicon.setAttribute("href", svg);
      }
    }
  }

  function renderCountdown() {
    const node = $("#countdown");
    if (!node) return;
    const now = new Date();
    const start = new Date(TRIP.dates.start + "T00:00:00");
    const end = new Date(TRIP.dates.end + "T23:59:59");
    const MS_DAY = 86_400_000;
    const diff = Math.ceil((start - now) / MS_DAY);
    if (now > end) {
      node.textContent = "旅程結束・下次再來 ✨";
      node.classList.add("past");
    } else if (now >= start) {
      const dayIdx = Math.floor((now - start) / MS_DAY) + 1;
      node.textContent = `旅行中 · Day ${dayIdx}`;
      node.classList.add("during");
    } else {
      node.textContent = `倒數 ${diff} 天`;
    }
  }

  // ============== Tabs ==============
  function setupTabs() {
    const tabs = $$(".tab");
    tabs.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabs.forEach((b) => b.classList.remove("active"));
        $$(".view").forEach((v) => v.classList.remove("active"));
        btn.classList.add("active");
        const target = btn.dataset.tab;
        $(`#view-${target}`).classList.add("active");
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (location.hash.slice(1) !== target) history.replaceState(null, "", `#${target}`);
      });
    });
    const hash = location.hash.slice(1);
    if (hash && $(`#view-${hash}`)) {
      const target = $(`.tab[data-tab="${hash}"]`);
      if (target) target.click();
    }
  }

  // ============== Overview ==============
  function renderOverview() {
    const start = new Date(TRIP.dates.start);
    const end = new Date(TRIP.dates.end);
    const nDays = Math.round((end - start) / 86_400_000) + 1;
    const nNights = Math.max(0, nDays - 1);

    $("#hero-eyebrow").textContent = `${nDays} 天 ${nNights} 夜`;
    $("#hero-title").textContent = TRIP.heroTitle || TRIP.title;
    $("#hero-desc").textContent = TRIP.heroDesc || TRIP.subtitle || "";

    $("#hero-stats").replaceChildren(
      ...(TRIP.stats || [
        { num: String(nDays), label: "天" },
        { num: String(nNights), label: "夜" },
        { num: String(TRIP.people || 1), label: "人" },
      ]).map((s) =>
        el("div", { class: "stat" },
          el("div", { class: "stat-num" }, s.num),
          el("div", { class: "stat-label" }, s.label))
      )
    );

    // Overview cards: hotel, flights, plus any user-defined.
    const cards = [];
    if (TRIP.hotel) cards.push(renderHotelCard(TRIP.hotel));
    if (TRIP.flights && TRIP.flights.length) cards.push(renderFlightCard(TRIP.flights));
    (TRIP.extraCards || []).forEach((c) => cards.push(renderGenericCard(c)));
    $("#overview-cards").replaceChildren(...cards);

    // Summary days
    $("#summary-days").replaceChildren(
      ...DAYS.map((d) =>
        el("div", { class: "summary-day", onclick: () => jumpToDay(d.day) },
          el("div", { class: "s-date" }, `${fmtDate(d.date)}${d.dow ? `（${d.dow}）` : ""}`),
          el("div", null,
            el("div", { class: "s-theme" }, `Day ${d.day}・${d.theme}`),
            el("div", { class: "muted small" }, d.city || "")
          ),
          el("div", { class: "s-level" }, d.level || "")
        )
      )
    );

    // Budget (optional)
    if (TRIP.budget) {
      $("#budget-card").hidden = false;
      $("#budget-info").replaceChildren(...renderBudgetRows(TRIP.budget));
    }
  }

  function renderHotelCard(h) {
    const rows = [
      infoRow("飯店", h.name),
      infoRow("位置", h.area, true),
    ];
    if (h.address) {
      rows.push(el("div", { class: "info-row" },
        el("div", { class: "info-key" }, "地址"),
        el("a", { class: "info-val wrap", href: mapsUrl(h.name, h.address), target: "_blank", rel: "noopener" },
          h.address + " 📍")));
    }
    (h.walking || []).forEach((w) => rows.push(infoRow(`步行至 ${w.to}`, `${w.minutes} 分`)));
    if (h.note) rows.push(el("p", { class: "tip-box" }, h.note));
    return el("div", { class: "card" },
      el("div", { class: "card-head" },
        el("span", { class: "card-icon" }, "🏨"),
        el("h2", { class: "card-title" }, "住宿")),
      ...rows);
  }

  function renderFlightCard(flights) {
    return el("div", { class: "card" },
      el("div", { class: "card-head" },
        el("span", { class: "card-icon" }, "✈️"),
        el("h2", { class: "card-title" }, "航班")),
      ...flights.map((f) =>
        el("div", { class: "info-row" },
          el("div", { class: "info-key" }, `${f.label}・${fmtDate(f.date)}`),
          el("div", { class: "info-val wrap" },
            `${f.code || ""}　${f.from} ${f.departure} → ${f.to} ${f.arrival}`))));
  }

  function renderGenericCard(c) {
    const children = [
      el("div", { class: "card-head" },
        el("span", { class: "card-icon" }, c.icon || "📌"),
        el("h2", { class: "card-title" }, c.title)),
    ];
    (c.rows || []).forEach((r) => children.push(infoRow(r.key, r.val, r.wrap)));
    if (c.body) children.push(el("p", { class: "tip-box" }, c.body));
    return el("div", { class: "card" }, ...children);
  }

  function infoRow(key, val, wrap) {
    return el("div", { class: "info-row" },
      el("div", { class: "info-key" }, key),
      el("div", { class: `info-val${wrap ? " wrap" : ""}` }, val));
  }

  function renderBudgetRows(b) {
    const out = [];
    if (b.fx) out.push(infoRow("匯率參考", b.fx));
    if (b.fixed) out.push(infoRow("機票＋住宿（已付）",
      `${b.fixed.currency || ""}${(b.fixed.total || 0).toLocaleString()}`));
    if (b.local) out.push(infoRow("在地花費",
      `${b.local.currency || ""}${(b.local.min || 0).toLocaleString()}–${(b.local.max || 0).toLocaleString()}`));
    if (b.perPerson) out.push(infoRow("每人總預算",
      `${b.perPerson.currency || ""}${(b.perPerson.min || 0).toLocaleString()}–${(b.perPerson.max || 0).toLocaleString()}`));
    if (b.note) out.push(el("p", { class: "tip-box" }, b.note));
    return out;
  }

  // ============== Itinerary ==============
  function renderItinerary() {
    const nav = $("#day-nav");
    nav.replaceChildren(
      el("button", { class: "day-btn active", "data-day": "all", onclick: (e) => filterDay(e, "all") }, "全部"),
      ...DAYS.map((d) =>
        el("button", { class: "day-btn", "data-day": d.day, onclick: (e) => filterDay(e, d.day) }, `Day ${d.day}`))
    );
    $("#day-cards").replaceChildren(...DAYS.map(renderDayCard));
  }

  function filterDay(e, day) {
    $$(".day-btn").forEach((b) => b.classList.remove("active"));
    e.currentTarget.classList.add("active");
    $$(".day-card").forEach((card) => {
      const d = card.dataset.day;
      card.style.display = day === "all" || d === String(day) ? "" : "none";
    });
  }

  // Resolve a ref (string) to a place with name/address/youtube.
  // Looks up RESTAURANTS by id first, then SIGHTS, then SHOPPING by name,
  // then the keyword "飯店" (or the hotel's own name) → TRIP.hotel, and
  // finally the fixed PLACES anchors (airports/stations/origin city).
  function resolveRef(ref) {
    if (!ref || typeof ref !== "string") return null;
    const r = RESTAURANTS.find((x) => x.id === ref);
    if (r) return { name: r.name, address: r.address, youtube: r.youtube, kind: "restaurant" };
    const s = SIGHTS.find((x) => x.name === ref);
    if (s) return { name: s.name, address: s.address || s.city, kind: "sight" };
    const sh = ((SHOPPING && SHOPPING.spots) || []).find((x) => x.name === ref);
    if (sh) return { name: sh.name, address: sh.address || sh.city, youtube: sh.youtube, kind: "shop" };
    if (HOTEL && (ref === "飯店" || ref === HOTEL.name)) {
      return { name: HOTEL.name, address: HOTEL.address, kind: "hotel" };
    }
    const p = PLACES && PLACES[ref];
    if (p) return { name: p.name, address: p.address, kind: "transit" };
    return null;
  }

  // The day's primary trajectory: first resolvable ref per timeline entry, in order.
  // Skips transit/no-ref entries; dedupes consecutive repeats of the same place.
  // `d.route.start` / `d.route.end` pin fixed anchors (origin city, hotel, …)
  // at the head/tail so the map always opens at the day's real start and end.
  function dayRouteStops(d) {
    const stops = [];
    const pushStop = (place) => {
      if (!place) return;
      const last = stops[stops.length - 1];
      if (last && last.name === place.name) return;
      stops.push(place);
    };
    if (d.route && d.route.start) pushStop(resolveRef(d.route.start));
    for (const t of (d.timeline || [])) {
      if (!t.refs || !t.refs.length) continue;
      let place = null;
      for (const ref of t.refs) {
        place = resolveRef(ref);
        if (place) break;
      }
      pushStop(place);
    }
    if (d.route && d.route.end) pushStop(resolveRef(d.route.end));
    return stops;
  }

  // Per-day Google Map: a route line through the day's stops + a full-route link.
  // The iframe is native-lazy so off-screen day cards don't fetch maps eagerly.
  function renderDayMap(d) {
    const stops = dayRouteStops(d);
    if (!stops.length) return null;
    const trail = stops.map((s) => s.name).join(" → ");
    return el("div", { class: "day-map-wrap" },
      el("div", { class: "sec-title" }, "🗺️ 當日地圖路線"),
      el("p", { class: "day-map-trail muted small" }, trail),
      el("div", { class: "day-map-frame" },
        el("iframe", {
          class: "day-map",
          src: mapEmbedUrl(stops),
          loading: "lazy",
          title: `Day ${d.day} 地圖路線`,
          referrerpolicy: "no-referrer-when-downgrade",
          allowfullscreen: "",
        })),
      el("a", {
        class: "btn btn-map day-map-link",
        href: mapDirUrl(stops),
        target: "_blank",
        rel: "noopener",
      }, "🗺️ 在 Google Maps 開啟完整路線"));
  }

  // Render a compact row of `📍 Google Maps` + `📺 <creator>` pill links for a list of refs.
  function renderPlaceLinks(refs) {
    if (!refs || !refs.length) return null;
    const children = [];
    for (const ref of refs) {
      const place = resolveRef(ref);
      if (!place) continue;
      children.push(el("a", {
        class: `place-link place-link-map place-link-${place.kind}`,
        href: mapsUrl(place.name, place.address),
        target: "_blank",
        rel: "noopener",
        title: `Google Maps：${place.name}`,
      }, `📍 ${place.name}`));
      (place.youtube || []).forEach((yt) => {
        if (!yt || !yt.id) return;
        const creator = yt.creator || "YouTube";
        children.push(el("a", {
          class: "place-link place-link-yt",
          href: youtubeUrl(yt),
          target: "_blank",
          rel: "noopener",
          title: `${creator}・${yt.id}${yt.time ? ` 跳到 ${yt.time}` : ""}`,
        }, yt.time ? `📺 ${creator} ${yt.time}` : `📺 ${creator}`));
      });
    }
    if (!children.length) return null;
    return el("div", { class: "place-links" }, ...children);
  }

  function renderDayCard(d) {
    const meals = el("div", { class: "meals" },
      ...(d.meals || []).map((m) =>
        el("div", { class: "meal" },
          el("div", { class: "meal-head" },
            el("span", { class: "meal-type" }, m.type),
            el("span", { class: "meal-name" }, m.title),
            m.star ? el("span", { class: "meal-stars" }, stars(m.star)) : null),
          m.note ? el("p", { class: "meal-note" }, m.note) : null,
          renderPlaceLinks(m.refs))));

    const catChips = el("div", { class: "cat-chips" },
      ...(d.categories || []).map((cat) => {
        const c = CATEGORIES[cat] || { label: cat, icon: "🍽️" };
        return el("a", {
          class: "cat-chip",
          href: "#food",
          onclick: () => jumpToCategory(cat),
        }, `${c.icon} ${c.label}`);
      }));

    return el("div", { class: "day-card", "data-day": d.day, id: `day-${d.day}` },
      el("div", { class: "day-head" },
        el("div", { class: "day-ribbon" },
          el("span", { class: "day-no" }, `DAY ${d.day}`),
          el("span", { class: "day-date" }, `${fmtDate(d.date)}${d.dow ? `（${d.dow}）` : ""}`),
          d.city ? el("span", { class: "day-city" }, d.city) : null,
          d.level ? el("span", { class: "day-level" }, d.level) : null),
        el("div", { class: "day-theme" }, d.theme),
        d.summary ? el("p", { class: "day-summary" }, d.summary) : null),
      el("div", { class: "day-body" },
        (d.timeline && d.timeline.length) ? el("div", { class: "sec-title" }, "🕐 時間軸") : null,
        (d.timeline && d.timeline.length) ? el("ul", { class: "timeline" },
          ...d.timeline.map((t) =>
            el("li", null,
              el("span", { class: "tl-time" }, t.time),
              el("span", { class: "tl-event" }, t.event),
              renderPlaceLinks(t.refs)))) : null,
        renderDayMap(d),
        (d.meals && d.meals.length) ? el("div", { class: "sec-title" }, "🍽️ 美食推薦") : null,
        (d.meals && d.meals.length) ? meals : null,
        d.tips ? el("div", { class: "tip-box" }, d.tips) : null,
        (d.categories && d.categories.length) ? el("div", { class: "sec-title" }, "🔎 相關類別（點擊跳到美食頁）") : null,
        (d.categories && d.categories.length) ? catChips : null));
  }

  function jumpToDay(day) {
    $(`.tab[data-tab="itinerary"]`).click();
    setTimeout(() => {
      const btn = $(`.day-btn[data-day="${day}"]`);
      if (btn) btn.click();
      const node = $(`#day-${day}`);
      if (node) node.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  // ============== Food ==============
  let foodFilter = { day: "all", cat: "all", query: "" };

  function renderFoodFilters() {
    const dayGroup = $("#filter-day");
    dayGroup.replaceChildren(
      el("span", { class: "filter-label" }, "日期"),
      el("button", { class: "chip active", "data-filter-day": "all", onclick: (e) => setDayFilter(e, "all") }, "全部"),
      ...DAYS.map((d) =>
        el("button", {
          class: "chip", "data-filter-day": d.day,
          onclick: (e) => setDayFilter(e, d.day),
        }, `D${d.day}`))
    );
    const catGroup = $("#filter-cat");
    const usedCats = new Set(RESTAURANTS.map((r) => r.category));
    catGroup.replaceChildren(
      el("span", { class: "filter-label" }, "類別"),
      el("button", { class: "chip active", "data-filter-cat": "all", onclick: (e) => setCatFilter(e, "all") }, "全部"),
      ...Object.entries(CATEGORIES).filter(([k]) => usedCats.has(k)).map(([key, c]) =>
        el("button", {
          class: "chip", "data-filter-cat": key,
          onclick: (e) => setCatFilter(e, key),
        }, `${c.icon} ${c.label}`))
    );
  }

  function setDayFilter(e, day) {
    $$("#filter-day .chip").forEach((c) => c.classList.remove("active"));
    e.currentTarget.classList.add("active");
    foodFilter.day = day;
    renderFoodList();
  }
  function setCatFilter(e, cat) {
    $$("#filter-cat .chip").forEach((c) => c.classList.remove("active"));
    e.currentTarget.classList.add("active");
    foodFilter.cat = cat;
    renderFoodList();
  }
  function setupSearch() {
    const input = $("#food-search");
    const clear = $("#search-clear");
    input.addEventListener("input", (e) => {
      foodFilter.query = e.target.value.trim().toLowerCase();
      clear.classList.toggle("show", !!foodFilter.query);
      renderFoodList();
    });
    clear.addEventListener("click", () => {
      input.value = "";
      foodFilter.query = "";
      clear.classList.remove("show");
      renderFoodList();
      input.focus();
    });
  }

  function renderFoodList() {
    const list = $("#food-list");
    const filtered = RESTAURANTS.filter((r) => {
      if (foodFilter.day !== "all" && !r.days.includes(Number(foodFilter.day))) return false;
      if (foodFilter.cat !== "all" && r.category !== foodFilter.cat) return false;
      if (foodFilter.query) {
        const q = foodFilter.query;
        const hay = [r.name, r.area, r.city, r.address || "", r.note || "", r.highlight || "",
                     (CATEGORIES[r.category] && CATEGORIES[r.category].label) || ""]
                     .join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    $("#food-count").textContent = `${filtered.length} 間餐廳`;

    if (!filtered.length) {
      list.replaceChildren(
        el("div", { class: "empty-state" },
          el("div", { class: "emo" }, "🔍"),
          el("p", null, "找不到符合條件的餐廳，試試換個關鍵字？")));
      return;
    }
    list.replaceChildren(...filtered.map(renderResto));
  }

  function renderResto(r) {
    const cat = CATEGORIES[r.category] || { label: r.category, icon: "🍽️" };
    const metas = [];
    if (r.price) metas.push(el("span", { class: "meta-price" }, r.price));
    if (r.tabelog) metas.push(el("span", null, `Tabelog ${r.tabelog}`));
    if (r.hours) metas.push(el("span", null, `🕒 ${r.hours}`));
    if (r.city || r.area) metas.push(el("span", null, `📍 ${[r.city, r.area].filter(Boolean).join("・")}`));

    const actions = [
      el("a", { class: "btn btn-map", href: mapsUrl(r.name, r.address), target: "_blank", rel: "noopener" },
        "📍 Google Maps"),
    ];
    if (r.tabelog || (TRIP.country === "JP")) {
      actions.push(el("a", { class: "btn btn-tabelog", href: tabelogSearch(r.name), target: "_blank", rel: "noopener" },
        "🔗 Tabelog"));
    }
    if (r.website) {
      actions.push(el("a", { class: "btn btn-web", href: r.website, target: "_blank", rel: "noopener" }, "🌐 官網"));
    }
    const phoneMatch = (r.reservation || "").match(/[\d][\d\-\s]{6,}/);
    if (phoneMatch) {
      actions.push(el("a", { class: "btn btn-phone", href: `tel:${phoneMatch[0].replace(/[^\d+]/g, "")}` },
        `📞 ${phoneMatch[0].trim()}`));
    }
    (r.youtube || []).forEach((yt) => {
      if (!yt || !yt.id) return;
      const creator = yt.creator || "YouTube";
      const label = yt.time ? `📺 ${creator} ${yt.time}` : `📺 ${creator}`;
      actions.push(el("a", {
        class: "btn btn-yt",
        href: youtubeUrl(yt),
        target: "_blank",
        rel: "noopener",
        title: `${creator}・${yt.id}${yt.time ? ` 跳到 ${yt.time}` : ""}`,
      }, label));
    });

    return el("div", { class: "resto", "data-id": r.id },
      el("div", { class: "resto-days" },
        ...(r.days || []).map((d) => el("span", { class: "day-dot", title: `Day ${d}` }, `${d}`))),
      el("div", { class: "resto-top" },
        el("div", { class: "resto-icon" }, cat.icon),
        el("div", { class: "resto-titles" },
          el("h3", { class: "resto-name" }, r.name),
          el("div", { class: "resto-sub" },
            el("span", null, cat.label),
            r.tabelog ? [el("span", { class: "dot" }, "·"), el("span", { class: "resto-rating" }, `★ ${r.tabelog}`)] : null))),
      r.highlight ? el("div", { class: "resto-highlight" }, r.highlight) : null,
      r.note ? el("p", { class: "resto-note" }, r.note) : null,
      metas.length ? el("div", { class: "resto-meta" }, ...metas) : null,
      r.reservation ? el("p", { class: "muted small" }, `預約：${r.reservation}`) : null,
      el("div", { class: "resto-actions" }, ...actions));
  }

  function jumpToCategory(cat) {
    $(`.tab[data-tab="food"]`).click();
    setTimeout(() => {
      const chip = $(`.chip[data-filter-cat="${cat}"]`);
      if (chip) chip.click();
    }, 60);
  }

  // ============== Transport (fully data-driven) ==============
  // TRANSPORT.sections = [{ icon, title, type, items, note? }]
  //   type: "options"      — items: [{name, time, fare, note}]
  //   type: "table"        — items: [{route, path, time, fare, note}]
  //   type: "info-rows"    — items: [{key, val, wrap?}]
  //   type: "text"         — items: [string, ...]  (rendered as paragraphs)
  function renderTransport() {
    const container = $("#transport-sections");
    const sections = (TRANSPORT && TRANSPORT.sections) || [];
    if (!sections.length) {
      container.replaceChildren(el("p", { class: "muted small" }, "尚未填入交通資訊。"));
      return;
    }
    container.replaceChildren(...sections.map(renderTransportSection));
  }

  function renderTransportSection(s) {
    const head = el("div", { class: "card-head" },
      el("span", { class: "card-icon" }, s.icon || "🚆"),
      el("h2", { class: "card-title" }, s.title));

    let body;
    if (s.type === "options") {
      body = el("div", { class: "option-list" },
        ...(s.items || []).map((o) =>
          el("div", { class: "option" },
            el("div", { class: "option-head" },
              el("span", { class: "option-name" }, o.name),
              el("span", { class: "option-meta" },
                o.time ? el("span", { class: "time-val" }, o.time) : null,
                o.fare ? el("span", { class: "fare" }, o.fare) : null)),
            o.note ? el("p", { class: "option-note" }, o.note) : null)));
    } else if (s.type === "table") {
      body = el("table", { class: "table" },
        el("thead", null,
          el("tr", null,
            el("th", null, "路線"),
            el("th", null, "時間"),
            el("th", null, "票價"),
            el("th", null, "備註"))),
        el("tbody", null,
          ...(s.items || []).map((r) =>
            el("tr", null,
              el("td", null, el("strong", null, r.route || ""), r.path ? el("div", { class: "muted small" }, r.path) : null),
              el("td", { class: "time-val" }, r.time || ""),
              el("td", { class: "fare" }, r.fare || ""),
              el("td", { class: "muted small" }, r.note || "")))));
    } else if (s.type === "info-rows") {
      body = el("div", null, ...(s.items || []).map((r) => infoRow(r.key, r.val, r.wrap)));
    } else {
      body = el("div", null, ...(s.items || []).map((t) => el("p", { class: "muted" }, String(t))));
    }

    const children = [head, body];
    if (s.note) children.push(el("p", { class: "muted small", style: "margin-top:8px;line-height:1.6" }, s.note));
    return el("div", { class: "card" }, ...children);
  }

  // ============== Tips (fully data-driven) ==============
  // TIPS.sections = [{ icon, title, type, items, note? }]
  //   type: "info-rows"  — items: [{key, val, wrap?}]
  //   type: "checklist"  — items: [string, ...]
  //   type: "reminders"  — items: [{title, body}]
  //   type: "sights"     — items: [{name, city, day, time, note}]
  //   type: "breakfast"  — items: [{type, price, place, note}]
  //   type: "text"       — items: [string, ...]
  function renderTips() {
    const container = $("#tips-sections");
    const sections = (TIPS && TIPS.sections) || [];
    // Sights now live in their own 景點 tab (renderSights); not appended here.
    if (!sections.length) {
      container.replaceChildren(el("p", { class: "muted small" }, "尚未填入實用資訊。"));
      return;
    }
    container.replaceChildren(...sections.map(renderTipsSection));
  }

  function renderTipsSection(s) {
    const head = el("div", { class: "card-head" },
      el("span", { class: "card-icon" }, s.icon || "ℹ️"),
      el("h2", { class: "card-title" }, s.title));

    let body;
    if (s.type === "checklist") {
      body = el("ul", { class: "checklist" }, ...(s.items || []).map((x) => el("li", null, String(x))));
    } else if (s.type === "info-rows") {
      body = el("div", null, ...(s.items || []).map((r) => infoRow(r.key, r.val, r.wrap)));
    } else if (s.type === "reminders") {
      body = el("div", null,
        ...(s.items || []).map((r) =>
          el("div", { class: "reminder" },
            el("h4", null, r.title),
            el("p", null, r.body))));
    } else if (s.type === "sights") {
      body = el("div", null,
        ...(s.items || []).map((x) => {
          const acts = [
            el("a", {
              class: "btn btn-map",
              href: mapsUrl(x.name, x.address || x.city || ""),
              target: "_blank",
              rel: "noopener",
            }, "📍 Google Maps"),
          ];
          (x.youtube || []).forEach((yt) => {
            if (!yt || !yt.id) return;
            const creator = yt.creator || "YouTube";
            acts.push(el("a", {
              class: "btn btn-yt",
              href: youtubeUrl(yt),
              target: "_blank",
              rel: "noopener",
              title: `${creator}・${yt.id}${yt.time ? ` 跳到 ${yt.time}` : ""}`,
            }, yt.time ? `📺 ${creator} ${yt.time}` : `📺 ${creator}`));
          });
          return el("div", { class: "sight" },
            el("div", { class: "sight-head" },
              el("span", { class: "sight-name" }, x.name),
              x.city ? el("span", { class: "sight-badge" }, x.city) : null,
              (x.day || x.time) ? el("span", { class: "sight-day" },
                [x.day ? `Day ${x.day}` : null, x.time].filter(Boolean).join("・")) : null),
            x.note ? el("p", { class: "sight-note" }, x.note) : null,
            el("div", { class: "sight-actions" }, ...acts));
        }));
    } else if (s.type === "breakfast") {
      body = el("div", null,
        ...(s.items || []).map((b) =>
          el("div", { class: "bk-item" },
            el("div", { class: "bk-head" },
              el("span", { class: "bk-type" }, b.type),
              b.price ? el("span", { class: "bk-price" }, b.price) : null),
            b.place ? el("div", { class: "bk-place" }, b.place) : null,
            b.note ? el("div", { class: "bk-note" }, b.note) : null)));
    } else {
      body = el("div", null, ...(s.items || []).map((t) => el("p", { class: "muted" }, String(t))));
    }

    const children = [head, body];
    if (s.note) children.push(el("p", { class: "tip-box" }, s.note));
    return el("div", { class: "card" }, ...children);
  }

  // ============== Shopping ==============
  // SHOPPING = { intro?, spots: [{ name, city, area, address, hours, price?, day?, note, youtube?, links? }] }
  function renderShopping() {
    const container = $("#shopping-sections");
    if (!container) return;
    const data = SHOPPING || {};
    const spots = data.spots || [];
    const cards = [];
    if (data.intro) {
      cards.push(el("div", { class: "card" },
        el("div", { class: "card-head" },
          el("span", { class: "card-icon" }, "🛍️"),
          el("h2", { class: "card-title" }, "購物攻略")),
        el("p", { class: "tip-box" }, data.intro)));
    }
    if (spots.length) {
      cards.push(el("div", { class: "card" },
        el("div", { class: "card-head" },
          el("span", { class: "card-icon" }, "👟"),
          el("h2", { class: "card-title" }, "購物地點")),
        el("div", null, ...spots.map(renderShopSpot))));
    }
    if (!cards.length) {
      container.replaceChildren(el("p", { class: "muted small" }, "尚未填入購物資訊。"));
      return;
    }
    container.replaceChildren(...cards);
  }

  function renderShopSpot(x) {
    const acts = [
      el("a", {
        class: "btn btn-map",
        href: mapsUrl(x.name, x.address || x.city || ""),
        target: "_blank",
        rel: "noopener",
      }, "📍 Google Maps"),
    ];
    (x.youtube || []).forEach((yt) => {
      if (!yt || !yt.id) return;
      const creator = yt.creator || "YouTube";
      acts.push(el("a", {
        class: "btn btn-yt",
        href: youtubeUrl(yt),
        target: "_blank",
        rel: "noopener",
        title: `${creator}・${yt.id}${yt.time ? ` 跳到 ${yt.time}` : ""}`,
      }, yt.time ? `📺 ${creator} ${yt.time}` : `📺 ${creator}`));
    });
    (x.links || []).forEach((lk) => {
      if (!lk || !lk.url) return;
      acts.push(el("a", {
        class: "btn btn-web",
        href: lk.url,
        target: "_blank",
        rel: "noopener",
      }, `🔗 ${lk.label || "連結"}`));
    });
    const meta = [x.day ? `Day ${x.day}` : null, x.hours].filter(Boolean).join("・");
    return el("div", { class: "sight" },
      el("div", { class: "sight-head" },
        el("span", { class: "sight-name" }, x.name),
        (x.area || x.city) ? el("span", { class: "sight-badge" }, x.area || x.city) : null,
        meta ? el("span", { class: "sight-day" }, meta) : null),
      x.price ? el("p", { class: "sight-note" }, `💴 ${x.price}`) : null,
      x.note ? el("p", { class: "sight-note" }, x.note) : null,
      el("div", { class: "sight-actions" }, ...acts));
  }

  // ============== Sights (景點) ==============
  // SIGHTS = [{ name, city, area?, region, day?, time?, whyGo, highlight, note, address, youtube? }]
  // SIGHTS_META = { intro?, regionOrder:[...], regionMeta:{ <region>: {icon,label,intro} } }
  // Grouped by region into its own 景點 tab; each sight shows 為什麼去 / 重點 intros.
  function renderSights() {
    const container = $("#sights-sections");
    if (!container) return;
    const sights = SIGHTS || [];
    const meta = SIGHTS_META || {};
    if (!sights.length) {
      container.replaceChildren(el("p", { class: "muted small" }, "尚未填入景點資訊。"));
      return;
    }
    const cards = [];
    if (meta.intro) {
      cards.push(el("div", { class: "card" },
        el("div", { class: "card-head" },
          el("span", { class: "card-icon" }, "🗺️"),
          el("h2", { class: "card-title" }, "景點功課")),
        el("p", { class: "tip-box" }, meta.intro)));
    }
    // Region order: declared order first, then any leftover regions in data order.
    const order = [];
    for (const r of (meta.regionOrder || [])) if (sights.some((s) => s.region === r)) order.push(r);
    for (const s of sights) if (s.region && !order.includes(s.region)) order.push(s.region);
    for (const region of order) {
      const items = sights.filter((s) => s.region === region);
      if (!items.length) continue;
      const rm = (meta.regionMeta && meta.regionMeta[region]) || {};
      const children = [
        el("div", { class: "card-head" },
          el("span", { class: "card-icon" }, rm.icon || "📍"),
          el("h2", { class: "card-title" }, rm.label || region)),
      ];
      if (rm.intro) children.push(el("p", { class: "tip-box" }, rm.intro));
      children.push(el("div", null, ...items.map(renderSightCard)));
      cards.push(el("div", { class: "card" }, ...children));
    }
    // Any sight without a region falls into a trailing "其他" card.
    const noRegion = sights.filter((s) => !s.region);
    if (noRegion.length) {
      cards.push(el("div", { class: "card" },
        el("div", { class: "card-head" },
          el("span", { class: "card-icon" }, "📍"),
          el("h2", { class: "card-title" }, "其他")),
        el("div", null, ...noRegion.map(renderSightCard))));
    }
    container.replaceChildren(...cards);
  }

  function renderSightCard(x) {
    const acts = [
      el("a", {
        class: "btn btn-map",
        href: mapsUrl(x.name, x.address || x.city || ""),
        target: "_blank",
        rel: "noopener",
      }, "📍 Google Maps"),
    ];
    (x.youtube || []).forEach((yt) => {
      if (!yt || !yt.id) return;
      const creator = yt.creator || "YouTube";
      acts.push(el("a", {
        class: "btn btn-yt",
        href: youtubeUrl(yt),
        target: "_blank",
        rel: "noopener",
        title: `${creator}・${yt.id}${yt.time ? ` 跳到 ${yt.time}` : ""}`,
      }, yt.time ? `📺 ${creator} ${yt.time}` : `📺 ${creator}`));
    });
    const tag = [x.day ? `Day ${x.day}` : "自選", x.time].filter(Boolean).join("・");
    return el("div", { class: "sight" },
      el("div", { class: "sight-head" },
        el("span", { class: "sight-name" }, x.name),
        (x.area || x.city) ? el("span", { class: "sight-badge" }, x.area || x.city) : null,
        tag ? el("span", { class: "sight-day" }, tag) : null),
      x.whyGo ? el("p", { class: "sight-why" },
        el("span", { class: "sight-why-label" }, "為什麼去"), x.whyGo) : null,
      x.highlight ? el("p", { class: "sight-why" },
        el("span", { class: "sight-why-label sight-why-hl" }, "重點"), x.highlight) : null,
      x.note ? el("p", { class: "sight-note" }, x.note) : null,
      el("div", { class: "sight-actions" }, ...acts));
  }

  // ============== init ==============
  document.addEventListener("DOMContentLoaded", () => {
    renderBrand();
    renderCountdown();
    setupTabs();
    renderOverview();
    renderItinerary();
    renderFoodFilters();
    setupSearch();
    renderFoodList();
    renderTransport();
    renderTips();
    renderSights();
    renderShopping();
    setInterval(renderCountdown, 60_000);
  });
})();
