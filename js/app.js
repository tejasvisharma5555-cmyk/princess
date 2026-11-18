/* =====================================================================
   THE ROYAL MUSEUM OF HER KINGDOM — ENGINE
   (Content lives in js/content.js — edit that file, not this one.)
   ===================================================================== */
(() => {
  "use strict";

  const K = window.KINGDOM;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wait = ms => new Promise(r => setTimeout(r, reduceMotion ? Math.min(ms, 60) : ms));

  /* ------------------------------------------------------------------
     STATE (saved per browser so progress survives a refresh)
     ------------------------------------------------------------------ */
  const STORE_KEY = "royal-museum-muskan-v1";
  const state = { visited: [], secrets: [], hasKey: false, doorOpen: false, starsSeen: [], wishes: 0, sound: true, signed: false };
  try { Object.assign(state, JSON.parse(localStorage.getItem(STORE_KEY) || "{}")); } catch (e) { /* storage unavailable */ }
  const save = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ } };

  const GALLERIES = [
    { id: "portraits",  name: "Hall of Portraits" },
    { id: "moments",    name: "Gallery of Little Moments" },
    { id: "chronicles", name: "The Royal Chronicles" },
    { id: "times",      name: "The Muskan Times" },
    { id: "stars",      name: "Hall of a Thousand Stars" },
    { id: "records",    name: "Royal Records Office" },
    { id: "library",    name: "The Royal Library" },
    { id: "garden",     name: "The Enchanted Garden" }
  ];
  const SECRETS = [
    { id: "mapheart",  name: "The Cartographer's Note", hint: "Even mapmakers leave love notes in the margins." },
    { id: "key",       name: "The Golden Key",          hint: "Some portraits hide more than faces." },
    { id: "letter",    name: "The Locked Love Letter",  hint: "A golden door waits for a golden key." },
    { id: "crownstar", name: "The Crown Star",          hint: "Read the classifieds in The Muskan Times." },
    { id: "wish",      name: "A Wish in the Well",      hint: "A coin glints in the garden beyond the walls." }
  ];
  const LABELS = { entrance: "The Grand Entrance", map: "The Royal Map", letter: "The Locked Room", throne: "The Throne Room" };
  GALLERIES.forEach(g => LABELS[g.id] = g.name);

  const has = (arr, v) => state[arr].includes(v);
  const allSecrets = () => SECRETS.every(s => has("secrets", s.id));

  /* ------------------------------------------------------------------
     SOUND — tiny synthesized chimes, no files needed
     ------------------------------------------------------------------ */
  let actx = null, music = null;
  function tone(freq, start, dur, vol = 0.08, type = "sine") {
    if (!state.sound) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const t = actx.currentTime + start;
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vol, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(actx.destination);
      o.start(t); o.stop(t + dur + 0.05);
    } catch (e) { /* audio unavailable */ }
  }
  const sfx = {
    click: () => tone(880, 0, 0.18, 0.03, "triangle"),
    chime: () => [784, 988, 1175, 1568].forEach((f, i) => tone(f, i * 0.09, 1.2, 0.06)),
    sparkle: () => [1319, 1760, 2093].forEach((f, i) => tone(f, i * 0.06, 0.5, 0.035)),
    lock: () => { tone(220, 0, 0.12, 0.08, "square"); tone(180, 0.08, 0.15, 0.06, "square"); },
    unlock: () => { tone(330, 0, 0.1, 0.07, "triangle"); tone(660, 0.12, 0.2, 0.06, "triangle"); [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.4 + i * 0.12, 1.4, 0.05)); },
    splash: () => [600, 450, 900].forEach((f, i) => tone(f, i * 0.05, 0.3, 0.03, "sine")),
    crack: () => { tone(140, 0, 0.08, 0.1, "square"); tone(90, 0.05, 0.12, 0.08, "sawtooth"); },
    page: () => tone(300, 0, 0.12, 0.02, "triangle"),
    fanfare: () => [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.16, 0.9, 0.05, "triangle"))
  };

  /* ------------------------------------------------------------------
     SHARED HELPERS
     ------------------------------------------------------------------ */
  function photo(src, alt, cls = "") {
    if (!src) return `<div class="photo ph ${cls}" role="img" aria-label="${esc(alt)}"></div>`;
    return `<div class="photo ${cls}"><img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async"></div>`;
  }
  // Missing photos gracefully become elegant placeholders
  document.addEventListener("error", e => {
    const img = e.target;
    if (img.tagName === "IMG" && img.parentElement && img.parentElement.classList.contains("photo")) {
      const p = img.parentElement; p.classList.add("ph"); p.setAttribute("role", "img"); p.setAttribute("aria-label", img.alt); img.remove();
    }
  }, true);

  let toastTimer;
  function toast(title, body, kind = "secret") {
    const t = $("#toast");
    t.className = "toast show " + kind;
    t.innerHTML = `<span class="toast-icon">${kind === "secret" ? "✦" : "♛"}</span><div><b>${esc(title)}</b><small>${esc(body)}</small></div>`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 4200);
  }

  function discover(id) {
    if (has("secrets", id)) return;
    state.secrets.push(id); save();
    const s = SECRETS.find(x => x.id === id);
    sfx.chime();
    toast("Secret Discovered", s.name + " · " + state.secrets.length + " of " + SECRETS.length);
    updateProgress();
    if (allSecrets()) setTimeout(() => {
      toast("The Throne Room Awakens", "Every secret found. A royal message awaits on the map.", "royal");
      sfx.fanfare();
    }, 4500);
  }

  function burst(x, y, n = 18, colors = ["#f6dc8a", "#d4af37", "#fff3c4", "#e8a0b4"]) {
    if (reduceMotion) return;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < n; i++) {
      const p = document.createElement("i");
      p.className = "spark";
      const a = (Math.PI * 2 * i) / n + Math.random() * 0.4, d = 40 + Math.random() * 70;
      p.style.cssText = `left:${x}px;top:${y}px;background:${colors[i % colors.length]};--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px`;
      frag.appendChild(p);
      setTimeout(() => p.remove(), 1000);
    }
    document.body.appendChild(frag);
  }

  /* ------------------------------------------------------------------
     LINE-ART ILLUSTRATIONS (engraving style, inherit currentColor)
     ------------------------------------------------------------------ */
  const ICON = {
    frame: '<rect x="8" y="6" width="32" height="36" rx="2"/><rect x="13" y="11" width="22" height="26"/><circle cx="24" cy="21" r="5"/><path d="M16 35c2-6 14-6 16 0"/>',
    polaroid: '<rect x="10" y="8" width="24" height="28" rx="1" transform="rotate(-8 22 22)"/><rect x="16" y="12" width="24" height="28" rx="1" transform="rotate(6 28 26)"/><path d="M18 16h20v16H18z" transform="rotate(6 28 26)"/>',
    scroll: '<path d="M12 10h22a4 4 0 014 4v24a4 4 0 01-4 4H14"/><path d="M12 10a4 4 0 00-4 4v2h8v-2a4 4 0 00-4-4zM14 42a4 4 0 01-4-4v-2h8v2"/><path d="M20 18h12M20 24h12M20 30h8"/>',
    paper: '<path d="M8 10h28v28a4 4 0 01-4 4H12a4 4 0 01-4-4z"/><path d="M36 16h4v22a4 4 0 01-4 4"/><path d="M13 16h18M13 21h8M13 26h8M13 31h18M13 36h18"/><rect x="24" y="21" width="7" height="6"/>',
    telescope: '<path d="M10 22l24-10 3 7-24 10z"/><path d="M34 12l4-2 3 7-4 2"/><path d="M20 26l-6 16M22 26l6 16"/><path d="M8 8l1 2 2 1-2 1-1 2-1-2-2-1 2-1z"/><path d="M40 30l.8 1.6 1.6.8-1.6.8-.8 1.6-.8-1.6-1.6-.8 1.6-.8z"/>',
    seal: '<rect x="6" y="12" width="36" height="24" rx="3"/><circle cx="16" cy="24" r="5"/><path d="M25 19h12M25 24h12M25 29h8"/><path d="M10 33c2-4 10-4 12 0"/>',
    book: '<path d="M24 12c-5-3-11-3-16-1v26c5-2 11-2 16 1 5-3 11-3 16-1V11c-5-2-11-2-16 1z"/><path d="M24 12v26"/><path d="M12 17h7M12 22h7M29 17h7M29 22h7"/>',
    fountain: '<path d="M8 32h32l-3 8H11z"/><path d="M20 32v-8h8v8"/><path d="M16 24h16"/><path d="M24 24c0-6-6-8-8-4M24 24c0-6 6-8 8-4"/><path d="M24 18v-6"/><circle cx="24" cy="9" r="2"/>',
    door: '<path d="M12 42V18a12 12 0 0124 0v24z"/><path d="M24 6v36"/><circle cx="24" cy="26" r="2.5"/><path d="M24 28.5v4"/>',
    throne: '<path d="M14 42V14l4-6 6 4 6-4 4 6v28"/><path d="M10 28h28v6H10z"/><path d="M14 42h4M30 42h4"/><path d="M20 20h8"/>',
    heart: '<path d="M24 38C12 30 8 23 10 17c2-6 10-7 14 0 4-7 12-6 14 0 2 6-2 13-14 21z"/>',
    crown: '<path d="M8 36l3-20 8 9 5-12 5 12 8-9 3 20z"/><path d="M8 40h32"/>',
    hoodie: '<path d="M16 10c2 4 14 4 16 0l8 6-4 6-4-2v20H16V20l-4 2-4-6z"/><path d="M20 10c0 6 8 6 8 0"/><path d="M22 16v6M26 16v6"/><path d="M19 32h10v6H19z"/>',
    bell: '<path d="M14 34c2-4 2-8 2-12a8 8 0 0116 0c0 4 0 8 2 12z"/><path d="M10 34h28"/><path d="M21 38a3 3 0 006 0"/><path d="M24 10V7"/><path d="M38 14l3-2M10 14l-3-2"/>',
    sparkle: '<path d="M24 6l3 12 12 3-12 3-3 12-3-12-12-3 12-3z"/><path d="M38 32l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z"/><path d="M10 34l1 3 3 1-3 1-1 3-1-3-3-1 3-1z"/>',
    cake: '<path d="M10 26h28v14H10z"/><path d="M10 31c4 3 6 0 9 0s5 3 10 0 7 0 9 0"/><path d="M14 26v-4h20v4"/><path d="M24 22v-6"/><path d="M24 16c-2-2 0-5 0-6 0 1 2 4 0 6z"/>',
    smile: '<circle cx="24" cy="24" r="16"/><circle cx="18" cy="20" r="1.6"/><circle cx="30" cy="20" r="1.6"/><path d="M16 27c3 6 13 6 16 0"/>',
    glass: '<circle cx="20" cy="20" r="10"/><path d="M27 27l12 12"/><path d="M15 17a6 6 0 016-4"/>',
    trophy: '<path d="M16 8h16v10a8 8 0 01-16 0z"/><path d="M16 11h-5c0 6 3 8 6 8M32 11h5c0 6-3 8-6 8"/><path d="M24 26v6"/><path d="M17 40h14l-2-8H19z"/>',
    hand: '<path d="M16 40c-4-4-6-10-6-14l2-2 4 4V12a2 2 0 014 0v10V8a2 2 0 014 0v14V10a2 2 0 014 0v12-6a2 2 0 014 0v12c0 6-2 10-6 12z"/>'
  };
  const icon = (name, cls = "") => `<svg class="illo ${cls}" viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${ICON[name] || ICON.crown}</svg>`;

  /* ------------------------------------------------------------------
     NAVIGATION — cinematic veil between rooms
     ------------------------------------------------------------------ */
  const rendered = {};
  const leaveHooks = {};
  let current = null, navigating = false;

  async function go(id, { instant = false } = {}) {
    if (!LABELS[id] || id === current || navigating) return;
    navigating = true;
    const veil = $("#veil");
    if (!instant) {
      $("#veilLabel").textContent = LABELS[id];
      veil.classList.add("show");
      await wait(520);
    }
    if (current && leaveHooks[current]) leaveHooks[current]();
    $$(".room").forEach(r => r.classList.remove("active"));
    const room = $(`.room[data-room="${id}"]`);
    if (!rendered[id]) { RENDER[id](room); rendered[id] = true; }
    room.classList.add("active");
    room.scrollTop = 0;
    current = id;
    document.body.dataset.room = id;
    if (ENTER[id]) ENTER[id](room);
    if (GALLERIES.some(g => g.id === id) && !has("visited", id)) { state.visited.push(id); save(); }
    if (id === "throne" && allSecrets() && !has("visited", "throne")) { state.visited.push("throne"); save(); }
    updateProgress();
    if (location.hash.slice(2) !== id) history.replaceState(null, "", "#/" + id);
    if (!instant) { await wait(80); veil.classList.remove("show"); }
    navigating = false;
  }
  document.addEventListener("click", e => {
    const link = e.target.closest("[data-go]");
    if (link) { e.preventDefault(); sfx.click(); go(link.dataset.go); }
  });
  window.addEventListener("hashchange", () => { const id = location.hash.slice(2); if (LABELS[id]) go(id); });

  const backBar = (title, sub) => `
    <div class="room-head">
      <p class="eyebrow">${esc(sub)}</p>
      <h1 class="room-title">${esc(title)}</h1>
      <div class="flourish" aria-hidden="true"><span></span>${icon("crown", "fl-crown")}<span></span></div>
    </div>`;

  const nextRoomLink = (id, text) => `<div class="room-foot"><button class="btn-ghost" data-go="${id}">${esc(text)} →</button><button class="btn-ghost" data-go="map">Back to the Royal Map</button></div>`;

  /* ------------------------------------------------------------------
     PROGRESS — the Royal Ledger
     ------------------------------------------------------------------ */
  function updateProgress() {
    const total = GALLERIES.length + SECRETS.length + 1;
    const done = GALLERIES.filter(g => has("visited", g.id)).length + state.secrets.length + (has("visited", "throne") ? 1 : 0);
    const pct = Math.round((done / total) * 100);
    $("#progressPct").textContent = pct + "%";
    const C = 2 * Math.PI * 19;
    $("#ringFg").style.strokeDasharray = C;
    $("#ringFg").style.strokeDashoffset = C * (1 - pct / 100);
    $("#ppBar").style.width = pct + "%";
    $("#ppRooms").innerHTML = GALLERIES.map(g => `<li class="${has("visited", g.id) ? "done" : ""}"><button data-go="${g.id}">${has("visited", g.id) ? "✓" : "○"} ${esc(g.name)}</button></li>`).join("")
      + `<li class="${has("visited", "throne") ? "done" : ""} ${allSecrets() ? "" : "locked"}">${allSecrets() ? `<button data-go="throne">${has("visited", "throne") ? "✓" : "♛"} The Throne Room</button>` : `<span>🔒 The Throne Room <em>— find every secret</em></span>`}</li>`;
    $("#ppSecrets").innerHTML = SECRETS.map(s => has("secrets", s.id)
      ? `<li class="done"><span>✦ ${esc(s.name)}</span></li>`
      : `<li class="hint"><span>? ? ?</span><em>${esc(s.hint)}</em></li>`).join("");
    $("#hudKey").hidden = !state.hasKey;
    if (rendered.map) refreshMap();
  }
  $("#hudProgress").addEventListener("click", e => {
    e.stopPropagation();
    const p = $("#progressPanel"), open = p.hidden;
    p.hidden = !open; $("#hudProgress").setAttribute("aria-expanded", String(open));
    sfx.click();
  });
  document.addEventListener("click", e => {
    const p = $("#progressPanel");
    if (!p.hidden && (!p.contains(e.target) || e.target.closest("[data-go]"))) { p.hidden = true; $("#hudProgress").setAttribute("aria-expanded", "false"); }
  });
  $("#hudMap").addEventListener("click", () => { sfx.click(); go("map"); });

  const soundBtn = $("#hudSound");
  const syncSound = () => { soundBtn.setAttribute("aria-pressed", String(state.sound)); soundBtn.classList.toggle("off", !state.sound); if (music) state.sound ? music.play().catch(() => {}) : music.pause(); };
  soundBtn.addEventListener("click", () => { state.sound = !state.sound; save(); syncSound(); sfx.click(); });
  if (K.music) { music = new Audio(K.music); music.loop = true; music.volume = 0.35; }
  syncSound();

  /* ==================================================================
     ROOM RENDERERS
     ================================================================== */
  const RENDER = {}, ENTER = {};

  /* ---------------- GRAND ENTRANCE ---------------- */
  RENDER.entrance = room => {
    const E = K.entrance;
    room.innerHTML = `
      <div class="ent-dust" aria-hidden="true">${Array.from({ length: 26 }, (_, i) => `<i style="--x:${(i * 37) % 100}%;--d:${6 + (i % 7)}s;--delay:${-(i * 0.7)}s;--s:${1 + (i % 3)}px"></i>`).join("")}</div>
      <div class="ent-arch">
        <div class="ent-text">
          <svg class="ent-crown" viewBox="0 0 64 64" aria-hidden="true"><use href="#crown"/></svg>
          <p class="eyebrow">${esc(E.eyebrow)}</p>
          <h1>${esc(E.title)}</h1>
          <p class="ent-ded">${esc(E.dedication)}</p>
          <p class="ent-name">${esc(E.name)}</p>
        </div>
        <div class="gates" aria-hidden="true">
          <div class="gate gate-l"><div class="gate-bars"></div><div class="gate-crest">${icon("heart")}</div></div>
          <div class="gate gate-r"><div class="gate-bars"></div><div class="gate-crest">${icon("crown")}</div></div>
          <div class="gate-glow"></div>
        </div>
        <button class="btn-royal ent-btn" id="openGates">${esc(E.button)}</button>
        <p class="ent-tip">Wander freely, Your Highness. Some rooms keep secrets — finding them is optional, but rewarded.</p>
      </div>`;
    $("#openGates", room).addEventListener("click", async () => {
      sfx.unlock();
      room.classList.add("opening");
      if (music && state.sound) music.play().catch(() => {});
      await wait(1700);
      go("map");
      setTimeout(() => room.classList.remove("opening"), 900);
    });
  };

  /* ---------------- THE ROYAL MAP ---------------- */
  const MAP_SPOTS = [
    { id: "portraits",  icon: "frame",     x: 17, y: 27, note: "Some portraits hide more than faces…" },
    { id: "moments",    icon: "polaroid",  x: 38, y: 15, note: "Small moments, big feelings" },
    { id: "chronicles", icon: "scroll",    x: 62, y: 16, note: "Where our story is kept" },
    { id: "times",      icon: "paper",     x: 84, y: 26, note: "Read the news before you count the stars" },
    { id: "stars",      icon: "telescope", x: 84, y: 60, note: "One star wears a crown" },
    { id: "records",    icon: "seal",      x: 62, y: 66, note: "Official business only" },
    { id: "library",    icon: "book",      x: 37, y: 62, note: "Laws of the realm" },
    { id: "garden",     icon: "fountain",  x: 14, y: 72, note: "Beyond the walls, a coin glints" },
    { id: "letter",     icon: "door",      x: 50, y: 86, note: "A door that wants a golden key" },
    { id: "throne",     icon: "throne",    x: 50, y: 41, note: "Sealed until every secret is found" }
  ];
  RENDER.map = room => {
    room.innerHTML = `
      ${backBar("The Royal Map", "Her kingdom, charted with love")}
      <p class="map-intro">Choose any hall to visit, Your Highness. Every gallery is open to you — the secrets are just for fun.</p>
      <div class="map-wrap">
        <div class="parchment">
          <svg class="map-roads" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            ${MAP_SPOTS.filter(s => s.id !== "throne").map(s => `<path d="M50 41 Q ${(50 + s.x) / 2 + (s.y > 41 ? 6 : -6)} ${(41 + s.y) / 2} ${s.x} ${s.y}"/>`).join("")}
          </svg>
          <div class="map-compass" aria-hidden="true">
            <svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="22"/><circle cx="30" cy="30" r="16"/><path d="M30 4 L34 30 L30 56 L26 30 Z M4 30 L30 26 L56 30 L30 34 Z" /><text x="30" y="3" text-anchor="middle">N</text></svg>
          </div>
          <div class="map-cartouche" aria-hidden="true"><span>Regnum Amoris</span><small>The Kingdom of Love · Drawn by a Very Smitten Cartographer</small></div>
          <div class="map-spots">
            ${MAP_SPOTS.map(s => `
              <button class="spot spot-${s.id}" data-spot="${s.id}" style="--x:${s.x}%;--y:${s.y}%">
                <span class="spot-icon">${icon(s.icon)}<i class="spot-lock" aria-hidden="true">🔒</i><i class="spot-check" aria-hidden="true">✓</i></span>
                <span class="spot-name">${esc(LABELS[s.id])}</span>
                <span class="spot-note">${esc(s.note)}</span>
              </button>`).join("")}
          </div>
          <button class="map-heart" id="mapHeart" aria-label="A tiny heart drawn in the margin">
            <svg viewBox="0 0 32 32"><use href="#heart"/></svg>
            <span>here be Muskan</span>
          </button>
          <div class="map-sea" aria-hidden="true">~ The Sea of Missing You ~</div>
          <div class="map-mount" aria-hidden="true">▲▲ Mount Cuddle ▲</div>
        </div>
      </div>
      <div class="map-note" id="mapNote" hidden>
        <p>“Every road on this map, no matter which way you turn, leads back to the same place: you.”</p>
        <small>— a note scribbled in the margin by the cartographer</small>
        <button class="btn-ghost" id="mapNoteClose">Fold the note</button>
      </div>`;
    $$(".spot", room).forEach(b => b.addEventListener("click", () => {
      const id = b.dataset.spot;
      sfx.click();
      if (id === "throne" && !allSecrets()) { b.classList.remove("shake"); void b.offsetWidth; b.classList.add("shake"); go("throne"); return; }
      go(id);
    }));
    $("#mapHeart", room).addEventListener("click", e => {
      const r = e.currentTarget.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height / 2, 14, ["#e8a0b4", "#c2185b", "#f6dc8a"]);
      $("#mapNote", room).hidden = false;
      discover("mapheart");
    });
    $("#mapNoteClose", room).addEventListener("click", () => $("#mapNote", room).hidden = true);
  };
  function refreshMap() {
    const room = $(".room-map");
    MAP_SPOTS.forEach(s => {
      const b = $(`.spot-${s.id}`, room); if (!b) return;
      b.classList.toggle("visited", has("visited", s.id) || (s.id === "letter" && has("secrets", "letter")));
      b.classList.toggle("locked", (s.id === "throne" && !allSecrets()) || (s.id === "letter" && !state.doorOpen));
      b.classList.toggle("glow", s.id === "throne" && allSecrets());
    });
    const h = $("#mapHeart", room); if (h) h.classList.toggle("found", has("secrets", "mapheart"));
  }

  /* ---------------- HALL OF PORTRAITS ---------------- */
  RENDER.portraits = room => {
    const shapes = ["", "oval", "", "tall", "", "oval"];
    room.innerHTML = `
      ${backBar("The Hall of Portraits", "East Wing · Permanent Collection")}
      <p class="room-lede">Hung in gold, lit by candlelight. Each portrait is a study of the same masterpiece.</p>
      <div class="portrait-wall">
        ${K.portraits.map((p, i) => `
          <figure class="pframe ${shapes[i % shapes.length]} ${p.hidesKey ? "askew" : ""}" style="--i:${i}">
            <div class="pframe-light" aria-hidden="true"></div>
            <button class="pframe-gilt" data-portrait="${i}" aria-label="View ${esc(p.title)}">
              ${photo(p.src, p.title)}
            </button>
            ${p.hidesKey ? `<button class="hidden-key ${state.hasKey ? "taken" : ""}" id="hiddenKey" aria-label="Something golden glints behind the frame"><svg viewBox="0 0 48 24"><use href="#key-shape"/></svg></button>` : ""}
            <figcaption class="plaque"><b>${esc(p.title)}</b><span>${esc(p.caption)}</span></figcaption>
          </figure>`).join("")}
      </div>
      <p class="museum-note">❦ The curator requests that visitors look closely. Not every frame hangs straight for no reason. ❦</p>
      ${nextRoomLink("moments", "Continue to the Gallery of Little Moments")}`;
    $$("[data-portrait]", room).forEach(b => b.addEventListener("click", () => {
      const p = K.portraits[+b.dataset.portrait];
      openLightbox(p.src, p.title, p.caption);
    }));
    const key = $("#hiddenKey", room);
    if (key) key.addEventListener("click", e => {
      if (state.hasKey) return;
      e.stopPropagation();
      const r = key.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height / 2, 24);
      sfx.sparkle();
      // fly the key up to the HUD
      const fly = key.cloneNode(true);
      fly.className = "key-fly"; fly.removeAttribute("id");
      fly.style.cssText = `left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px`;
      document.body.appendChild(fly);
      key.classList.add("taken");
      state.hasKey = true; save();
      const target = $("#hudProgress").getBoundingClientRect();
      requestAnimationFrame(() => { fly.style.transform = `translate(${target.left - r.left - 30}px, ${target.top - r.top}px) rotate(720deg) scale(.7)`; fly.style.opacity = ".2"; });
      setTimeout(() => fly.remove(), 1300);
      discover("key");
      setTimeout(() => toast("The Golden Key", "Somewhere in the kingdom, a golden door is waiting…", "royal"), 4400);
    });
  };

  function openLightbox(src, title, caption) {
    const lb = $("#lightbox");
    $("#lbMedia").innerHTML = photo(src, title);
    $("#lbTitle").textContent = title;
    $("#lbCaption").textContent = caption;
    lb.hidden = false;
    requestAnimationFrame(() => lb.classList.add("show"));
    sfx.click();
  }
  function closeLightbox() { const lb = $("#lightbox"); lb.classList.remove("show"); setTimeout(() => lb.hidden = true, 350); }
  $("#lightbox").addEventListener("click", e => { if (e.target.closest(".lb-close") || e.target.id === "lightbox") closeLightbox(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") { closeLightbox(); $$(".star-card.show").forEach(c => c.classList.remove("show")); } });

  /* ---------------- GALLERY OF LITTLE MOMENTS ---------------- */
  RENDER.moments = room => {
    const rows = [K.moments.slice(0, Math.ceil(K.moments.length / 2)), K.moments.slice(Math.ceil(K.moments.length / 2))];
    let n = 0;
    room.innerHTML = `
      ${backBar("The Gallery of Little Moments", "Sunlit Wing · Candid Collection")}
      <p class="room-lede">Not every treasure needs a gilded frame. Some just need a clothespin and a little string. <em>Tap a photo to read the back.</em></p>
      ${rows.map(row => `
        <div class="string-row">
          <svg class="string" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><path d="M0 1 Q50 10 100 1"/></svg>
          <div class="polaroids">
            ${row.map(m => { const i = n++; return `
              <button class="polaroid" style="--r:${[-5, 3, -2, 6, -4, 2][i % 6]}deg;--d:${(i % 4) * 0.4}s" aria-label="Flip photo: ${esc(m.front)}">
                <span class="pin" aria-hidden="true"></span>
                <span class="pol-inner">
                  <span class="pol-front">${photo(m.src, m.front)}<span class="pol-cap">${esc(m.front)}</span></span>
                  <span class="pol-back"><span>${esc(m.back)}</span><small>♡</small></span>
                </span>
              </button>`; }).join("")}
          </div>
        </div>`).join("")}
      ${nextRoomLink("chronicles", "Continue to the Royal Chronicles")}`;
    $$(".polaroid", room).forEach(p => p.addEventListener("click", () => { p.classList.toggle("flipped"); sfx.page(); }));
  };

  /* ---------------- THE ROYAL CHRONICLES ---------------- */
  RENDER.chronicles = room => {
    room.innerHTML = `
      ${backBar("The Royal Chronicles", "The Manuscript Room · Our Story")}
      <p class="room-lede">An illuminated history of the kingdom — written by hand, read by candlelight. Scroll slowly.</p>
      <ol class="chron">
        ${K.chronicles.map((c, i) => `
          <li class="chron-item ${i % 2 ? "right" : "left"}">
            <div class="chron-node" aria-hidden="true">${icon(i === K.chronicles.length - 1 ? "heart" : "crown")}</div>
            <article class="chron-card">
              ${photo(c.src, c.title, "chron-photo")}
              <div class="chron-body">
                <p class="chron-meta">${esc(c.chapter)} · <em>${esc(c.date)}</em></p>
                <h2>${esc(c.title)}</h2>
                <p class="illuminated">${esc(c.text)}</p>
              </div>
            </article>
          </li>`).join("")}
      </ol>
      <p class="chron-end">…and the story continues.</p>
      ${nextRoomLink("times", "Read today's Muskan Times")}`;
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { root: room, threshold: 0.18 });
      $$(".chron-item", room).forEach(el => io.observe(el));
    } else $$(".chron-item", room).forEach(el => el.classList.add("in"));
  };

  /* ---------------- THE MUSKAN TIMES ---------------- */
  RENDER.times = room => {
    const N = K.newspaper;
    const date = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).toUpperCase();
    const seal = `
      <svg class="np-seal" viewBox="0 0 120 120" aria-hidden="true">
        <defs><path id="sealCircle" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0"/></defs>
        <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" stroke-width="2"/>
        <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" stroke-width="1"/>
        <text font-size="10" letter-spacing="2.4" fill="currentColor"><textPath href="#sealCircle">✦ ROYAL SEAL ✦ KINGDOM OF LOVE ✦ EST. FOREVER</textPath></text>
        <path d="M40 72 L43 50 L52 60 L60 44 L68 60 L77 50 L80 72 Z" fill="currentColor"/>
      </svg>`;
    room.innerHTML = `
      <div class="np-desk">
        <article class="newspaper">
          <div class="np-top"><span>${esc(N.volume)}</span><span>${esc(date)}</span><span>${esc(N.price)}</span></div>
          <header class="np-mast">
            ${seal}
            <div><h1>${esc(N.name)}</h1><p class="np-motto">“${esc(N.motto)}”</p></div>
            <button class="np-seal-btn" id="npStamp" aria-label="Press the royal seal">${seal}</button>
          </header>
          <div class="np-rule"></div>
          <h2 class="np-headline">${esc(N.headline)}</h2>
          <p class="np-subhead">${esc(N.subhead)}</p>
          <div class="np-rule thin"></div>
          <div class="np-grid">
            <section class="np-lead">
              ${photo(K.portraits[0] && K.portraits[0].src, "Princess Muskan", "np-photo")}
              <p class="np-photo-cap">ABOVE: Her Royal Highness, moments before rendering the kingdom speechless. (Royal Photographer, who has since retired, satisfied.)</p>
              <h3>${esc(N.lead.title)}</h3>
              <div class="np-cols">${N.lead.body.map((p, i) => `<p class="${i === 0 ? "dropcap" : ""}">${esc(p)}</p>`).join("")}</div>
            </section>
            <aside class="np-side">
              ${N.briefs.map(b => `<div class="np-brief"><h4>${esc(b.title)}</h4><p>${esc(b.body)}</p></div>`).join("")}
              <div class="np-classifieds">
                <h4>Royal Classifieds</h4>
                ${N.classifieds.map(c => `<p class="${c.includes("STARS") ? "np-clue" : ""}">${esc(c)}</p>`).join("")}
              </div>
            </aside>
          </div>
          <div class="np-rule"></div>
          <div class="np-articles">
            ${N.articles.map(a => `
              <article class="np-article">
                <p class="np-kicker">${esc(a.kicker)}</p>
                <h3>${esc(a.title)}</h3>
                ${icon(a.illo, "np-illo")}
                <p class="np-body">${esc(a.body)}</p>
                <button class="np-more">Continued ▸</button>
              </article>`).join("")}
          </div>
          <div class="np-rule"></div>
          <div class="np-presses">
            <button class="btn-ink" id="stopPresses">⚑ Stop the Presses!</button>
            <p id="extraHeadline" class="np-extra" aria-live="polite">Click for a late-breaking royal bulletin.</p>
          </div>
          <footer class="np-foot">Printed in the Royal Capital by The Muskan Times Press · No princesses were inconvenienced in the making of this newspaper.</footer>
        </article>
      </div>
      ${nextRoomLink("stars", "Visit the Hall of a Thousand Stars")}`;
    $$(".np-more", room).forEach(b => b.addEventListener("click", () => {
      const art = b.closest(".np-article"); art.classList.toggle("open");
      b.textContent = art.classList.contains("open") ? "◂ Fold paper" : "Continued ▸"; sfx.page();
    }));
    let hi = 0;
    $("#stopPresses", room).addEventListener("click", () => {
      const el = $("#extraHeadline", room);
      el.classList.remove("stamp"); void el.offsetWidth;
      el.textContent = "LATE EDITION: " + N.extraHeadlines[hi++ % N.extraHeadlines.length];
      el.classList.add("stamp"); sfx.lock();
    });
    $("#npStamp", room).addEventListener("click", e => {
      const paper = $(".newspaper", room), r = paper.getBoundingClientRect();
      const s = document.createElement("div");
      s.className = "np-approved"; s.textContent = "Royally Approved";
      s.style.left = (e.clientX - r.left) + "px"; s.style.top = (e.clientY - r.top + 40) + "px";
      s.style.setProperty("--rot", (Math.random() * 24 - 12) + "deg");
      paper.appendChild(s); sfx.crack();
      if ($$(".np-approved", paper).length > 5) $$(".np-approved", paper)[0].remove();
    });
  };

  /* ---------------- HALL OF A THOUSAND STARS ---------------- */
  let starAnim = null;
  RENDER.stars = room => {
    const S = K.stars;
    // seeded pseudo-random so the sky is the same every visit
    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const pts = [];
    const crownPos = { x: 71, y: 33 };
    while (pts.length < S.reasons.length) {
      const p = { x: 6 + rnd() * 88, y: 26 + rnd() * 64 };
      const near = pts.concat([crownPos]).some(q => Math.hypot((q.x - p.x) * 1.6, q.y - p.y) < 9);
      if (!near || rnd() < 0.02) pts.push(p);
    }
    room.innerHTML = `
      <canvas class="sky" aria-hidden="true"></canvas>
      <div class="nebula" aria-hidden="true"></div>
      <div class="stars-head">
        <p class="eyebrow">The Celestial Observatory</p>
        <h1 class="room-title">${esc(S.title)}</h1>
        <p class="stars-sub">${esc(S.subtitle)}</p>
        <p class="stars-count"><span id="starCount">0</span> of ${S.reasons.length} reasons discovered <span class="small">(a thousand more are still uncounted)</span></p>
      </div>
      <svg class="constellation" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline id="constLine" points=""/></svg>
      <div class="star-field">
        ${pts.map((p, i) => `<button class="rstar ${has("starsSeen", i) ? "seen" : ""}" data-star="${i}" style="left:${p.x}%;top:${p.y}%;--tw:${2 + (i % 5) * 0.6}s;--dl:${-(i % 7) * 0.5}s" aria-label="Reason ${i + 1}"><i></i></button>`).join("")}
        <button class="crown-star ${has("secrets", "crownstar") ? "seen" : ""}" style="left:${crownPos.x}%;top:${crownPos.y}%" aria-label="A small star shaped like a crown"><svg viewBox="0 0 64 64"><path d="M10 46 L13 22 L24 33 L32 16 L40 33 L51 22 L54 46 Z"/></svg></button>
      </div>
      <div class="star-card" id="starCard" role="dialog" aria-live="polite">
        <button class="sc-close" aria-label="Close">×</button>
        <p class="sc-num" id="scNum"></p>
        <p class="sc-text" id="scText"></p>
      </div>
      <div class="stars-foot">${nextRoomLink("records", "Visit the Royal Records Office")}</div>`;

    const card = $("#starCard", room), field = $(".star-field", room);
    const showCard = (el, num, text, special) => {
      $("#scNum", room).textContent = num; $("#scText", room).textContent = text;
      card.classList.toggle("special", !!special);
      const fr = room.getBoundingClientRect(), er = el.getBoundingClientRect();
      const wide = window.innerWidth > 700;
      if (wide) {
        let left = er.left - fr.left + 24, top = er.top - fr.top + room.scrollTop - 20;
        if (left > fr.width - 360) left = er.left - fr.left - 340;
        card.style.left = left + "px"; card.style.top = top + "px";
      } else { card.style.left = ""; card.style.top = ""; }
      card.classList.remove("show"); void card.offsetWidth; card.classList.add("show");
    };
    const drawLine = () => {
      $("#constLine", room).setAttribute("points", state.starsSeen.map(i => `${pts[i].x},${pts[i].y}`).join(" "));
      $("#starCount", room).textContent = state.starsSeen.length;
    };
    $$(".rstar", room).forEach(b => b.addEventListener("click", e => {
      e.stopPropagation();
      const i = +b.dataset.star;
      if (!has("starsSeen", i)) { state.starsSeen.push(i); save(); }
      b.classList.add("seen");
      tone(880 + (i % 8) * 110, 0, 0.9, 0.04);
      showCard(b, `Reason No. ${i + 1}`, S.reasons[i]);
      drawLine();
      if (state.starsSeen.length === S.reasons.length) setTimeout(() => toast("Every star counted", "…and still a thousand more reasons left unsaid.", "royal"), 1200);
    }));
    $(".crown-star", room).addEventListener("click", e => {
      e.stopPropagation();
      const b = e.currentTarget, r = b.getBoundingClientRect();
      b.classList.add("seen");
      burst(r.left + r.width / 2, r.top + r.height / 2, 22, ["#f7c6d0", "#f6dc8a", "#ffffff"]);
      showCard(b, "The Crown Star ✦", S.secret, true);
      discover("crownstar");
    });
    $(".sc-close", room).addEventListener("click", () => card.classList.remove("show"));
    field.addEventListener("click", () => card.classList.remove("show"));
    drawLine();
  };
  ENTER.stars = room => {
    const cv = $("canvas.sky", room), ctx = cv.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W, H, stars = [], shoot = null, last = 0;
    const resize = () => {
      W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(1600, Math.round(W * H / 700));
      stars = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.1 + 0.15, p: Math.random() * 6.28, s: 0.5 + Math.random() * 1.8, w: Math.random() < 0.08 }));
    };
    resize();
    const frame = t => {
      starAnim = requestAnimationFrame(frame);
      if (t - last < 33) return; // ~30fps is plenty for twinkles
      last = t;
      ctx.clearRect(0, 0, W, H);
      for (const s of stars) {
        const a = reduceMotion ? 0.7 : 0.35 + 0.65 * Math.abs(Math.sin(s.p + t * 0.001 * s.s));
        ctx.globalAlpha = a;
        ctx.fillStyle = s.w ? "#ffe9b0" : "#ffffff";
        ctx.fillRect(s.x, s.y, s.r * 1.6, s.r * 1.6);
      }
      if (!reduceMotion) {
        if (!shoot && Math.random() < 0.004) shoot = { x: Math.random() * W * 0.7, y: Math.random() * H * 0.35, l: 0 };
        if (shoot) {
          shoot.l += 0.03;
          const x = shoot.x + shoot.l * 320, y = shoot.y + shoot.l * 130;
          const g = ctx.createLinearGradient(x - 90, y - 36, x, y);
          g.addColorStop(0, "rgba(255,255,255,0)"); g.addColorStop(1, "rgba(255,240,200,.9)");
          ctx.globalAlpha = 1 - shoot.l; ctx.strokeStyle = g; ctx.lineWidth = 1.4;
          ctx.beginPath(); ctx.moveTo(x - 90, y - 36); ctx.lineTo(x, y); ctx.stroke();
          if (shoot.l >= 1) shoot = null;
        }
      }
      ctx.globalAlpha = 1;
    };
    starAnim = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);
    leaveHooks.stars = () => { cancelAnimationFrame(starAnim); window.removeEventListener("resize", resize); $("#starCard", room).classList.remove("show"); };
  };

  /* ---------------- ROYAL RECORDS OFFICE (ID CARD) ---------------- */
  RENDER.records = room => {
    const C = K.idCard;
    room.innerHTML = `
      ${backBar("The Royal Records Office", "Department of Very Important Documents")}
      <p class="room-lede">One citizen in this kingdom holds an identity card like no other. <em>Tap the card to turn it over.</em></p>
      <div class="id-stage">
        <button class="idcard" id="idCard" aria-label="Royal identity card. Tap to flip.">
          <span class="id-inner">
            <span class="id-face id-front">
              <span class="id-guilloche" aria-hidden="true"></span>
              <span class="id-header"><svg viewBox="0 0 64 64" aria-hidden="true"><use href="#crown"/></svg><span><b>Royal Identification</b><small>${esc(C.kingdom)}</small></span><span class="id-no">${esc(C.number)}</span></span>
              <span class="id-body">
                <span class="id-photo">${photo(C.photo, C.name)}<span class="id-photo-stamp" aria-hidden="true">VERIFIED<br>ADORABLE</span></span>
                <span class="id-fields">
                  <span class="id-name">${esc(C.name)}</span>
                  <span class="id-f"><small>Royal Title</small>${esc(C.title)}</span>
                  <span class="id-f"><small>Kingdom</small>${esc(C.kingdom)}</span>
                  <span class="id-f"><small>Royal Status</small><span class="id-status">${esc(C.status)}</span></span>
                  <span class="id-f"><small>Special Powers</small>${esc(C.powers)}</span>
                  <span class="id-f"><small>Royal Privileges</small>${esc(C.privileges)}</span>
                </span>
              </span>
              <span class="id-footer">
                <span><small>Issued</small>${esc(C.issued)}</span>
                <span><small>Expires</small>${esc(C.expires)}</span>
                <span><small>Issued by</small>${esc(C.issuedBy)}</span>
                <span class="id-emboss" aria-hidden="true"><svg viewBox="0 0 64 64"><use href="#crown"/></svg></span>
              </span>
            </span>
            <span class="id-face id-back">
              <span class="id-stripe" aria-hidden="true"></span>
              <span class="id-back-body">
                <b class="id-back-h">${esc(C.back.heading)}</b>
                <span class="id-terms">${C.back.terms.map((t, i) => `<span>${i + 1}. ${esc(t)}</span>`).join("")}</span>
                <span class="id-warning">${esc(C.back.warning)}</span>
                <span class="id-found">${esc(C.back.found)}</span>
                <span class="id-sigrow">
                  <span class="id-sig"><span>${esc(K.kingName)}</span><small>Authorised Signature of the King</small></span>
                  <span class="id-barcode" aria-hidden="true">${Array.from({ length: 34 }, (_, i) => `<i style="width:${[1, 2, 1, 3, 1, 2][i % 6]}px"></i>`).join("")}<small>MUSKAN-FOREVER</small></span>
                </span>
              </span>
            </span>
          </span>
        </button>
        <p class="id-hint">✦ Official document · Tamper-proof · Cuteness-certified ✦</p>
      </div>
      ${nextRoomLink("library", "Continue to the Royal Library")}`;
    const card = $("#idCard", room), inner = $(".id-inner", room);
    let flipped = false;
    card.addEventListener("click", () => { flipped = !flipped; card.classList.toggle("flipped", flipped); inner.style.transform = ""; sfx.page(); });
    if (!reduceMotion && window.matchMedia("(hover:hover)").matches) {
      card.addEventListener("pointermove", e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        inner.style.transform = `rotateY(${(flipped ? 180 : 0) + x * 14}deg) rotateX(${-y * 10}deg)`;
        card.style.setProperty("--gx", (x + 0.5) * 100 + "%"); card.style.setProperty("--gy", (y + 0.5) * 100 + "%");
      });
      card.addEventListener("pointerleave", () => inner.style.transform = "");
    }
  };

  /* ---------------- THE ROYAL LIBRARY (PRIVILEGE BOOK) ---------------- */
  RENDER.library = room => {
    const P = K.privileges;
    const roman = n => ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"][n - 1] || n;
    const pages = [
      `<div class="pg pg-title"><svg viewBox="0 0 64 64" class="pg-crown" aria-hidden="true"><use href="#crown"/></svg><h2>${esc(P.title)}</h2><p>${esc(P.subtitle)}</p><div class="pg-orn">❦</div><small>Kept under lock, key, and a very protective cat.</small></div>`,
      ...P.rules.map((r, i) => `<div class="pg pg-rule"><p class="pg-art">Article ${roman(i + 1)}</p>${icon(r.illo, "pg-illo")}<p class="pg-text"><span class="pg-drop">${esc(r.rule.charAt(0))}</span>${esc(r.rule.slice(1))}</p><p class="pg-note">${esc(r.note)}</p><span class="pg-num">${i + 2}</span></div>`),
      () => `<div class="pg pg-close"><p class="pg-art">In Witness Whereof</p><p class="pg-text">${esc(P.closing)}</p><div class="pg-sign"><span class="pg-sig-k">${esc(K.kingName)}</span><span class="pg-line"></span><small>The King</small><span class="pg-sig-p ${state.signed ? "done" : ""}">Princess ${esc(K.princessName)}</span><span class="pg-line"></span><small>Her Royal Highness</small></div><button class="btn-royal small" id="signBook">${state.signed ? "Signed &amp; Sealed ✓" : "Sign the Book, Your Highness"}</button><div class="pg-wax ${state.signed ? "done" : ""}" aria-hidden="true">M</div></div>`
    ];
    if (pages.length % 2) pages.push(`<div class="pg pg-blank"><div class="pg-orn">❦</div><p class="pg-note">This page intentionally left blank, for future privileges the princess will inevitably invent.</p></div>`);

    room.innerHTML = `
      ${backBar("The Royal Library", "Rare Books & Binding Laws")}
      <p class="room-lede">Upon a velvet lectern rests the most important law book in the realm.</p>
      <div class="book-stage">
        <div class="book" id="book">
          <div class="page page-l" id="pageL"></div>
          <div class="page page-r" id="pageR"></div>
          <div class="spine" aria-hidden="true"></div>
        </div>
        <div class="book-nav">
          <button class="btn-ghost" id="bookPrev" aria-label="Previous page">← Turn back</button>
          <span id="bookPos"></span>
          <button class="btn-ghost" id="bookNext" aria-label="Next page">Turn page →</button>
        </div>
      </div>
      ${nextRoomLink("garden", "Step outside to the Enchanted Garden")}`;

    const pg = i => (typeof pages[i] === "function" ? pages[i]() : pages[i]) || "";
    const book = $("#book", room), L = $("#pageL", room), R = $("#pageR", room);
    let idx = 0, busy = false;
    const single = () => window.innerWidth < 760;
    const step = () => single() ? 1 : 2;
    const paint = () => {
      if (single()) { L.innerHTML = pg(idx); R.innerHTML = ""; book.classList.add("single"); }
      else { idx -= idx % 2; L.innerHTML = pg(idx); R.innerHTML = pg(idx + 1); book.classList.remove("single"); }
      $("#bookPrev", room).disabled = idx === 0;
      $("#bookNext", room).disabled = idx + step() >= pages.length;
      $("#bookPos", room).textContent = single() ? `Page ${idx + 1} of ${pages.length}` : `Pages ${idx + 1}–${idx + 2} of ${pages.length}`;
      bindSign();
    };
    const turn = async dir => {
      if (busy) return;
      const ni = idx + dir * step();
      if (ni < 0 || ni >= pages.length) return;
      busy = true; sfx.page();
      if (reduceMotion) { idx = ni; paint(); busy = false; return; }
      const leaf = document.createElement("div");
      leaf.className = "leaf " + (single() ? "leaf-single" : dir > 0 ? "leaf-next" : "leaf-prev");
      if (single()) {
        leaf.innerHTML = `<div class="leaf-face leaf-front">${pg(idx)}</div><div class="leaf-face leaf-back"></div>`;
        idx = ni; L.innerHTML = pg(idx);
      } else if (dir > 0) {
        leaf.innerHTML = `<div class="leaf-face leaf-front">${pg(idx + 1)}</div><div class="leaf-face leaf-back">${pg(ni)}</div>`;
        R.innerHTML = pg(ni + 1);
      } else {
        leaf.innerHTML = `<div class="leaf-face leaf-front">${pg(idx)}</div><div class="leaf-face leaf-back">${pg(ni + 1)}</div>`;
        L.innerHTML = pg(ni);
      }
      book.appendChild(leaf);
      requestAnimationFrame(() => requestAnimationFrame(() => leaf.classList.add("turn")));
      await wait(780);
      idx = ni; leaf.remove(); paint(); busy = false;
    };
    function bindSign() {
      const btn = $("#signBook", room); if (!btn || btn.dataset.bound) return;
      btn.dataset.bound = 1;
      btn.addEventListener("click", () => {
        if (state.signed) return;
        state.signed = true; save();
        $(".pg-sig-p", room).classList.add("done");
        setTimeout(() => { $(".pg-wax", room).classList.add("done"); sfx.crack(); const r = btn.getBoundingClientRect(); burst(r.left + r.width / 2, r.top, 16); }, 1300);
        btn.textContent = "Signed & Sealed ✓";
      });
    }
    $("#bookNext", room).addEventListener("click", () => turn(1));
    $("#bookPrev", room).addEventListener("click", () => turn(-1));
    let sx = null;
    book.addEventListener("touchstart", e => sx = e.touches[0].clientX, { passive: true });
    book.addEventListener("touchend", e => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) turn(dx < 0 ? 1 : -1); sx = null; });
    let lastSingle = single();
    window.addEventListener("resize", () => { if (single() !== lastSingle) { lastSingle = single(); paint(); } });
    paint();
  };

  /* ---------------- THE ENCHANTED GARDEN (WISHING WELL) ---------------- */
  RENDER.garden = room => {
    const W = K.wishes;
    room.innerHTML = `
      <div class="garden-sky" aria-hidden="true"><div class="moon"></div></div>
      <div class="garden-museum" aria-hidden="true"></div>
      <div class="fireflies" aria-hidden="true">${Array.from({ length: 16 }, (_, i) => `<i style="--x:${(i * 61) % 96 + 2}%;--y:${40 + (i * 23) % 50}%;--d:${5 + (i % 5)}s;--dl:${-i * 0.8}s"></i>`).join("")}</div>
      <div class="garden-head">
        <p class="eyebrow">Beyond the Museum Walls</p>
        <h1 class="room-title">The Enchanted Garden</h1>
        <p class="room-lede light">Hidden among the roses is an old fountain that only grants wishes made <em>for</em> someone. <span class="nowrap">Tap the golden coin.</span></p>
      </div>
      <div class="well-stage">
        <button class="coin" id="coin" aria-label="Toss the golden coin into the fountain"><span>M</span></button>
        <svg class="fountain" viewBox="0 0 400 300" aria-hidden="true">
          <defs>
            <linearGradient id="stone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfc6b8"/><stop offset="1" stop-color="#6f6658"/></linearGradient>
            <linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd8ff" stop-opacity=".9"/><stop offset="1" stop-color="#2b5f8f" stop-opacity=".8"/></linearGradient>
            <radialGradient id="wglow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff2b0" stop-opacity=".8"/><stop offset="1" stop-color="#fff2b0" stop-opacity="0"/></radialGradient>
          </defs>
          <ellipse cx="200" cy="232" rx="170" ry="34" fill="url(#stone)"/>
          <path d="M30 232 Q30 280 200 284 Q370 280 370 232" fill="#5c5448"/>
          <ellipse cx="200" cy="230" rx="150" ry="26" fill="url(#water)"/>
          <ellipse class="wglow" cx="200" cy="230" rx="120" ry="20" fill="url(#wglow)"/>
          <g class="ripples"><ellipse cx="200" cy="230" rx="10" ry="3"/><ellipse cx="200" cy="230" rx="10" ry="3"/><ellipse cx="200" cy="230" rx="10" ry="3"/></g>
          <rect x="186" y="120" width="28" height="108" fill="url(#stone)"/>
          <ellipse cx="200" cy="122" rx="62" ry="14" fill="url(#stone)"/>
          <ellipse cx="200" cy="120" rx="52" ry="9" fill="url(#water)"/>
          <path d="M193 90 Q200 60 207 90 L210 118 L190 118 Z" fill="url(#stone)"/>
          <g class="jets" fill="none" stroke="#bfe6ff" stroke-width="2" stroke-linecap="round">
            <path d="M200 66 Q200 40 170 60 Q150 80 146 118"/><path d="M200 66 Q200 40 230 60 Q250 80 254 118"/>
            <path d="M146 124 Q120 160 92 222"/><path d="M254 124 Q280 160 308 222"/>
          </g>
          <g class="drops" fill="#dff4ff"><circle cx="150" cy="200" r="1.6"/><circle cx="252" cy="190" r="1.6"/><circle cx="110" cy="214" r="1.4"/><circle cx="290" cy="212" r="1.4"/></g>
        </svg>
        <div class="splash" id="splash" aria-hidden="true"></div>
      </div>
      <div class="wish-card" id="wishCard" aria-live="polite">
        <p class="wish-intro">${esc(W.intro)}</p>
        <p class="wish-text" id="wishText"></p>
        <p class="wish-count" id="wishCount"></p>
        <button class="btn-royal small" id="wishAgain">Toss another coin</button>
      </div>
      <div class="garden-foot">${nextRoomLink(state.doorOpen ? "letter" : "map", state.doorOpen ? "Return to the Locked Room" : "Return inside the museum")}</div>`;

    const coin = $("#coin", room), card = $("#wishCard", room);
    let tossing = false;
    coin.addEventListener("click", async () => {
      if (tossing) return; tossing = true;
      card.classList.remove("show");
      coin.classList.add("toss"); sfx.sparkle();
      await wait(1050);
      sfx.splash();
      room.classList.remove("rippling"); void room.offsetWidth; room.classList.add("rippling");
      const sp = $("#splash", room); sp.classList.remove("go"); void sp.offsetWidth; sp.classList.add("go");
      await wait(700);
      const i = state.wishes % W.list.length;
      state.wishes++; save();
      $("#wishText", room).textContent = W.list[i];
      $("#wishCount", room).textContent = `Wish ${i + 1} of ${W.list.length}`;
      card.classList.add("show");
      discover("wish");
      coin.classList.remove("toss"); coin.classList.add("respawn");
      setTimeout(() => { coin.classList.remove("respawn"); tossing = false; }, 900);
    });
    $("#wishAgain", room).addEventListener("click", () => coin.click());
  };

  /* ---------------- THE LOCKED LOVE LETTER ---------------- */
  RENDER.letter = room => {
    const L = K.letter;
    const paras = arr => arr.map(p => `<p>${esc(p)}</p>`).join("");
    room.innerHTML = `
      <div class="door-scene ${state.doorOpen ? "gone" : ""}" id="doorScene">
        <div class="door-torch l" aria-hidden="true"><i></i></div><div class="door-torch r" aria-hidden="true"><i></i></div>
        <p class="door-text">${esc(L.doorText)}</p>
        <div class="door-frame">
          <div class="door-light" aria-hidden="true"></div>
          <div class="door-panel dl"><span class="door-orn">${icon("heart")}</span></div>
          <div class="door-panel dr"><span class="door-orn">${icon("crown")}</span></div>
          <button class="keyhole" id="keyhole" aria-label="The keyhole"><span></span></button>
          <svg class="door-key" viewBox="0 0 48 24" aria-hidden="true"><use href="#key-shape"/></svg>
        </div>
        <p class="door-hint" id="doorHint" aria-live="polite">${state.hasKey ? "The golden key in your pocket feels warm. Try the keyhole." : "A golden door. A small keyhole. Locked tight."}</p>
        <button class="btn-ghost" data-go="map">Back to the Royal Map</button>
      </div>

      <div class="letter-scene" id="letterScene">
        <div class="candles" aria-hidden="true">${[0, 1, 2].map(i => `<span class="candle c${i}"><i></i></span>`).join("")}</div>
        <p class="eyebrow ls-eyebrow">The Locked Room</p>
        <div class="envelope" id="envelope">
          <div class="env-back"></div>
          <div class="env-letter-peek"></div>
          <div class="env-front"></div>
          <div class="env-flap"></div>
          <button class="wax" id="wax" aria-label="Break the wax seal">
            <span class="wax-half l"><b>M</b></span><span class="wax-half r"><b>M</b></span>
          </button>
          <p class="env-to">For Muskan · <em>to be opened with care</em></p>
        </div>
        <p class="env-hint" id="envHint">Touch the wax seal.</p>

        <article class="love-letter" id="loveLetter" aria-live="polite">
          <div class="ll-fold f1"></div><div class="ll-fold f2"></div>
          <div class="ll-paper">
            <p class="ll-date">${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
            <p class="ll-salute">${esc(L.salutation)}</p>
            <div class="ll-body">
              <section class="ll-sec">${paras(L.opening)}</section>
              <div class="ll-orn">❦</div>
              <section class="ll-sec" data-sec="memories">${paras(L.memories)}</section>
              <section class="ll-sec" data-sec="apologies">${paras(L.apologies)}</section>
              <div class="ll-orn">❦</div>
              <section class="ll-sec" data-sec="gratitude">${paras(L.gratitude)}</section>
              <section class="ll-sec" data-sec="feelings">${paras(L.feelings)}</section>
            </div>
            <p class="ll-closing">${esc(L.closing)}</p>
            <p class="ll-sign">${esc(L.signature)}</p>
            <div class="ll-actions">
              <button class="btn-ghost" id="refold">Fold the letter away</button>
              <button class="btn-ghost" data-go="map">Back to the Royal Map</button>
            </div>
          </div>
        </article>
      </div>`;

    const scene = $("#doorScene", room);
    $("#keyhole", room).addEventListener("click", async () => {
      const hint = $("#doorHint", room);
      if (!state.hasKey) {
        sfx.lock();
        scene.classList.remove("rattle"); void scene.offsetWidth; scene.classList.add("rattle");
        hint.innerHTML = "The door rattles but won't budge. <em>Perhaps one of the portraits in the Hall of Portraits is hiding something golden…</em>";
        return;
      }
      if (scene.classList.contains("unlocking")) return;
      scene.classList.add("unlocking");
      hint.textContent = "The key turns with a soft click…";
      await wait(1300); sfx.unlock();
      scene.classList.add("open");
      await wait(1600);
      state.doorOpen = true; save(); updateProgress();
      scene.classList.add("gone");
      room.classList.add("inside");
    });
    if (state.doorOpen) room.classList.add("inside");

    const env = $("#envelope", room), letter = $("#loveLetter", room);
    $("#wax", room).addEventListener("click", async e => {
      if (env.classList.contains("broken")) return;
      const r = e.currentTarget.getBoundingClientRect();
      sfx.crack();
      burst(r.left + r.width / 2, r.top + r.height / 2, 12, ["#8e0e1c", "#b3192b", "#5a0610"]);
      env.classList.add("broken"); $("#envHint", room).textContent = "";
      await wait(700); env.classList.add("flap-open");
      await wait(800); env.classList.add("rise");
      await wait(1000);
      room.classList.add("reading");
      letter.classList.add("unfold");
      $$(".ll-body p, .ll-salute, .ll-closing, .ll-sign, .ll-orn", room).forEach((p, i) => p.style.setProperty("--d", (1.4 + i * 0.35) + "s"));
      discover("letter");
    });
    $("#refold", room).addEventListener("click", () => {
      room.classList.remove("reading"); letter.classList.remove("unfold");
      env.classList.remove("broken", "flap-open", "rise");
      $("#envHint", room).textContent = "Resealed — open it again whenever you need it.";
      room.scrollTop = 0;
    });
  };
  ENTER.letter = room => {
    const hint = $("#doorHint", room);
    if (hint && !state.doorOpen && state.hasKey) hint.textContent = "The golden key in your pocket feels warm. Try the keyhole.";
  };

  /* ---------------- THE THRONE ROOM (FINAL MESSAGE) ---------------- */
  RENDER.throne = room => { room.innerHTML = ""; };
  ENTER.throne = room => {
    const F = K.finale;
    if (!allSecrets()) {
      room.classList.remove("unlocked");
      room.innerHTML = `
        ${backBar("The Throne Room", "Sealed by Royal Order")}
        <div class="sealed-door">
          <svg viewBox="0 0 64 64" class="sealed-crown" aria-hidden="true"><use href="#crown"/></svg>
          <p>These great doors open only for the one who has uncovered every secret of her kingdom.</p>
          <ul class="sealed-list">${SECRETS.map(s => `<li class="${has("secrets", s.id) ? "done" : ""}">${has("secrets", s.id) ? "✦ " + esc(s.name) : "? ? ? — <em>" + esc(s.hint) + "</em>"}</li>`).join("")}</ul>
          <p class="sealed-count">${state.secrets.length} of ${SECRETS.length} secrets found</p>
          <button class="btn-ghost" data-go="map">Back to the Royal Map</button>
        </div>`;
      return;
    }
    room.classList.add("unlocked");
    room.innerHTML = `
      <div class="throne-hall" aria-hidden="true">
        <div class="pillar l"></div><div class="pillar r"></div>
        <div class="banner l">${icon("heart")}</div><div class="banner r">${icon("crown")}</div>
        <div class="carpet"></div>
        <div class="throne-seat"></div>
      </div>
      <div class="petals" aria-hidden="true">${Array.from({ length: 28 }, (_, i) => `<i style="--x:${(i * 37) % 100}%;--d:${7 + (i % 6)}s;--dl:${-(i * 0.9)}s;--r:${(i * 47) % 360}deg"></i>`).join("")}</div>
      <div class="throne-content">
        <svg viewBox="0 0 64 64" class="throne-crown" aria-hidden="true"><use href="#crown"/></svg>
        <p class="eyebrow">Every secret found · The kingdom fully explored</p>
        <div class="decree">
          <div class="decree-rod top"></div>
          <div class="decree-paper">
            <h1>${esc(F.title)}</h1>
            ${F.lines.map((l, i) => `<p style="--d:${1.6 + i * 0.9}s">${esc(l)}</p>`).join("")}
            <p class="decree-sign" style="--d:${1.6 + F.lines.length * 0.9}s">${esc(F.signature)}<br><span>${esc(K.kingName)}</span></p>
            <div class="decree-seal" style="--d:${2.2 + F.lines.length * 0.9}s">♛</div>
          </div>
          <div class="decree-rod bottom"></div>
        </div>
        <div class="room-foot"><button class="btn-ghost" data-go="letter">Read the letter again</button><button class="btn-ghost" data-go="map">Back to the Royal Map</button></div>
      </div>`;
    sfx.fanfare();
  };

  /* ------------------------------------------------------------------
     BOOT
     ------------------------------------------------------------------ */
  updateProgress();
  const start = location.hash.slice(2);
  go(LABELS[start] ? start : "entrance", { instant: true });
})();
