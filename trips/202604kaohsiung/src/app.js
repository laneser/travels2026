// Travel site app.js — data-driven renderer.
// All destination-specific content lives in data.js. This file is generic.

(function () {
  const { TRIP, DAYS, CATEGORIES, RESTAURANTS, TRANSPORT, TIPS, SIGHTS } = window.TRIP_DATA;

  // ============== Google Maps URL ==============
  function mapsUrl(name, address) {
    const query = encodeURIComponent(`${name} ${address || ""}`.trim());
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
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

  function renderDayCard(d) {
    const meals = el("div", { class: "meals" },
      ...(d.meals || []).map((m) =>
        el("div", { class: "meal" },
          el("div", { class: "meal-head" },
            el("span", { class: "meal-type" }, m.type),
            el("span", { class: "meal-name" }, m.title),
            m.star ? el("span", { class: "meal-stars" }, stars(m.star)) : null),
          m.note ? el("p", { class: "meal-note" }, m.note) : null)));

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
              el("span", { class: "tl-event" }, t.event)))) : null,
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
    // Append sights as a special section if SIGHTS exists and user didn't already put one in.
    const combined = [...sections];
    if (SIGHTS && SIGHTS.length && !sections.some((s) => s.type === "sights")) {
      combined.push({ icon: "🏛️", title: "景點資訊", type: "sights", items: SIGHTS });
    }
    if (!combined.length) {
      container.replaceChildren(el("p", { class: "muted small" }, "尚未填入實用資訊。"));
      return;
    }
    container.replaceChildren(...combined.map(renderTipsSection));
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
        ...(s.items || []).map((x) =>
          el("div", { class: "sight" },
            el("div", { class: "sight-head" },
              el("span", { class: "sight-name" }, x.name),
              x.city ? el("span", { class: "sight-badge" }, x.city) : null,
              (x.day || x.time) ? el("span", { class: "sight-day" },
                [x.day ? `Day ${x.day}` : null, x.time].filter(Boolean).join("・")) : null),
            x.note ? el("p", { class: "sight-note" }, x.note) : null,
            el("a", {
              class: "btn btn-map",
              href: mapsUrl(x.name, x.address || x.city || ""),
              target: "_blank",
              rel: "noopener",
            }, "📍 Google Maps"))));
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

  // ============== init ==============
  document.addEventListener("DOMContentLoaded", () => {
    renderCountdown();
    setupTabs();
    renderOverview();
    renderItinerary();
    renderFoodFilters();
    setupSearch();
    renderFoodList();
    renderTransport();
    renderTips();
    setInterval(renderCountdown, 60_000);
  });
})();
