/* =====================================================================
   ANIMATED CHARACTERS — Pingu & Motu
   Hand-drawn SVG chibis. Animated entirely with CSS classes:
     .walking  .cheer  .sitting  .reach  .hold  .dribble  .with-rose  .flip
   ===================================================================== */
(() => {
  "use strict";

  const roseProp = `
    <g class="prop-rose">
      <path d="M0 0 L0 22" stroke="#4f8a3c" stroke-width="2"/>
      <path d="M0 12 q6 -5 9 1 q-6 3 -9 -1" fill="#5fa04a"/>
      <circle cx="0" cy="-3" r="7" fill="#fffaf2" stroke="#e8dccb" stroke-width="1"/>
      <path d="M-4 -4 q4 -5 8 0 q-4 4 -8 0 M-2 -1 q2 -3 5 0" fill="none" stroke="#e2d4c0" stroke-width="1"/>
    </g>`;

  const ballProp = `
    <g class="prop-ball">
      <circle r="8" fill="#e87a2e" stroke="#7a3410" stroke-width="1"/>
      <path d="M-8 0 H8 M0 -8 V8 M-5.5 -5.5 Q0 0 -5.5 5.5 M5.5 -5.5 Q0 0 5.5 5.5" fill="none" stroke="#7a3410" stroke-width="1"/>
    </g>`;

  function pingu() {
    const skin = "#d9a07a", shirt = "#1d1d2a", jeans = "#34507e", hair = "#1a110c";
    return `
<svg viewBox="0 0 100 170" class="char-svg" aria-hidden="true">
  <ellipse class="shadow" cx="50" cy="166" rx="26" ry="4" fill="rgba(0,0,0,.25)"/>
  <g class="figure">
    <g class="leg leg-l"><rect x="38" y="108" width="11" height="50" rx="5" fill="${jeans}"/><ellipse cx="42" cy="160" rx="10" ry="5.5" fill="#f4f4f4"/><path d="M33 161 h18" stroke="#ccc" stroke-width="1"/></g>
    <g class="leg leg-r"><rect x="51" y="108" width="11" height="50" rx="5" fill="${jeans}"/><ellipse cx="58" cy="160" rx="10" ry="5.5" fill="#f4f4f4"/><path d="M49 161 h18" stroke="#ccc" stroke-width="1"/></g>
    <g class="arm arm-l"><rect x="24" y="74" width="10" height="38" rx="5" fill="${shirt}"/><circle cx="29" cy="114" r="5.5" fill="${skin}"/></g>
    <rect x="29" y="68" width="42" height="48" rx="13" fill="${shirt}"/>
    <path d="M44 70 L50 80 L56 70" fill="none" stroke="#3a3a4e" stroke-width="1.5"/>
    <circle cx="50" cy="88" r="1.2" fill="#55557a"/><circle cx="50" cy="96" r="1.2" fill="#55557a"/><circle cx="50" cy="104" r="1.2" fill="#55557a"/>
    <g class="arm arm-r"><rect x="66" y="74" width="10" height="38" rx="5" fill="${shirt}"/><circle cx="71" cy="114" r="5.5" fill="${skin}"/>
      <g transform="translate(73 110)">${roseProp}</g>
      <g transform="translate(71 124)">${ballProp}</g>
    </g>
    <rect x="45" y="60" width="10" height="10" fill="${skin}"/>
    <g class="head">
      <ellipse cx="27.5" cy="48" rx="4" ry="5.5" fill="${skin}"/><ellipse cx="72.5" cy="48" rx="4" ry="5.5" fill="${skin}"/>
      <ellipse cx="50" cy="45" rx="22" ry="24" fill="${skin}"/>
      <g class="eyes">
        <ellipse cx="41.5" cy="48" rx="2.8" ry="3.6" fill="#24150e"/><circle cx="42.4" cy="46.8" r=".9" fill="#fff"/>
        <ellipse cx="58.5" cy="48" rx="2.8" ry="3.6" fill="#24150e"/><circle cx="59.4" cy="46.8" r=".9" fill="#fff"/>
      </g>
      <path d="M37 41.5 q4.5 -2 9 0 M54 41.5 q4.5 -2 9 0" stroke="#2a1a10" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="M50 51 q-1.5 4 1 5" stroke="#b67d58" stroke-width="1.2" fill="none" stroke-linecap="round"/>
      <path d="M44.5 59.5 q5.5 -2 11 0" stroke="#3a2418" stroke-width="1.2" fill="none" opacity=".55"/>
      <path class="mouth" d="M45.5 62 q4.5 3.2 9 0" stroke="#8a4a3a" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <ellipse cx="36" cy="56" rx="3.4" ry="2" fill="#e88a7a" opacity=".3"/><ellipse cx="64" cy="56" rx="3.4" ry="2" fill="#e88a7a" opacity=".3"/>
      <g class="hair" fill="${hair}">
        <circle cx="34" cy="30" r="9"/><circle cx="45" cy="23" r="10"/><circle cx="57" cy="23" r="10"/><circle cx="67" cy="31" r="9"/>
        <circle cx="28" cy="40" r="7"/><circle cx="72" cy="40" r="7"/><circle cx="40" cy="33" r="7"/><circle cx="51" cy="31" r="8"/><circle cx="61" cy="33" r="7"/>
        <path d="M33 36 q4 8 9 4 q2 6 8 2 q3 6 9 1 q4 5 8 -2 q2 -6 -4 -9 L37 30 z"/>
        <circle cx="26" cy="49" r="4.5"/><circle cx="74" cy="49" r="4.5"/>
        <circle cx="38" cy="17" r="4"/><circle cx="62" cy="16" r="4.5"/><circle cx="51" cy="13" r="4"/>
      </g>
    </g>
  </g>
</svg>`;
  }

  function motu() {
    const skin = "#f1c3a0", top = "#f2a2bf", jeans = "#7b9ccb", hair = "#1b1310";
    return `
<svg viewBox="0 0 100 170" class="char-svg" aria-hidden="true">
  <ellipse class="shadow" cx="50" cy="166" rx="25" ry="4" fill="rgba(0,0,0,.25)"/>
  <g class="figure">
    <path class="hair-back" d="M27 42 Q24 92 30 122 L70 122 Q76 92 73 42 Z" fill="${hair}"/>
    <g class="leg leg-l"><path d="M39 108 h11 l1 46 h-14 z" fill="${jeans}"/><ellipse cx="43" cy="159" rx="9.5" ry="5.5" fill="#fafafa"/></g>
    <g class="leg leg-r"><path d="M50 108 h11 l2 46 h-14 z" fill="${jeans}"/><ellipse cx="57" cy="159" rx="9.5" ry="5.5" fill="#fafafa"/></g>
    <g class="arm arm-l"><rect x="25" y="74" width="10" height="16" rx="5" fill="${top}"/><rect x="26.5" y="86" width="7.5" height="25" rx="3.7" fill="${skin}"/><circle cx="30" cy="112" r="5" fill="${skin}"/>
      <g transform="translate(27 108)">${roseProp}</g>
    </g>
    <path d="M32 72 q18 -6 36 0 l2 40 q-20 6 -40 0 z" fill="${top}"/>
    <path d="M43 71 q7 7 14 0" fill="none" stroke="#e488a8" stroke-width="1.5"/>
    <g class="arm arm-r"><rect x="65" y="74" width="10" height="16" rx="5" fill="${top}"/><rect x="66" y="86" width="7.5" height="25" rx="3.7" fill="${skin}"/><circle cx="70" cy="112" r="5" fill="${skin}"/>
      <g transform="translate(70 122)">${ballProp}</g>
    </g>
    <rect x="45.5" y="60" width="9" height="11" fill="${skin}"/>
    <g class="head">
      <ellipse cx="50" cy="45" rx="21" ry="23" fill="${skin}"/>
      <circle cx="29.5" cy="55" r="1.8" fill="#e8c34a"/><path d="M29.5 56.5 v4" stroke="#e8c34a" stroke-width="1.2"/><circle cx="29.5" cy="61.5" r="1.6" fill="#e8c34a"/>
      <circle cx="70.5" cy="55" r="1.8" fill="#e8c34a"/><path d="M70.5 56.5 v4" stroke="#e8c34a" stroke-width="1.2"/><circle cx="70.5" cy="61.5" r="1.6" fill="#e8c34a"/>
      <g class="eyes">
        <ellipse cx="41.5" cy="48" rx="3" ry="3.8" fill="#24150e"/><circle cx="42.5" cy="46.6" r="1" fill="#fff"/>
        <ellipse cx="58.5" cy="48" rx="3" ry="3.8" fill="#24150e"/><circle cx="59.5" cy="46.6" r="1" fill="#fff"/>
        <path d="M37.5 45.5 l-2 -1.5 M38.5 44.5 l-1.5 -2 M62.5 45.5 l2 -1.5 M61.5 44.5 l1.5 -2" stroke="#24150e" stroke-width="1"/>
      </g>
      <path d="M37 41 q4.5 -2.4 9 -.6 M54 40.4 q4.5 -1.8 9 .6" stroke="#2a1a10" stroke-width="1.7" fill="none" stroke-linecap="round"/>
      <path d="M50 51 q-1.2 3.6 .8 4.4" stroke="#c8906a" stroke-width="1.1" fill="none" stroke-linecap="round"/>
      <path class="mouth" d="M45 59.5 q5 3.6 10 0 q-5 1.4 -10 0" fill="#c8323e" stroke="#b02a36" stroke-width=".8"/>
      <circle cx="56.5" cy="62.5" r=".8" fill="#5a3a2a"/>
      <ellipse cx="35.5" cy="54.5" rx="4" ry="2.4" fill="#ff8aa0" opacity=".45"/><ellipse cx="64.5" cy="54.5" rx="4" ry="2.4" fill="#ff8aa0" opacity=".45"/>
      <path class="hair-front" d="M50 21 Q27 20 27 46 Q27 58 29 66 Q31 50 34 40 Q41 30 50 27 Q59 30 66 40 Q69 50 71 66 Q73 58 73 46 Q73 20 50 21 Z" fill="${hair}"/>
      <path d="M50 21 Q49 25 50 27" stroke="#3a2a22" stroke-width="1"/>
    </g>
  </g>
</svg>`;
  }

  /** Create a character element. who: "pingu" | "motu" */
  function make(who, extraClass = "") {
    const el = document.createElement("div");
    el.className = `char char-${who} ${extraClass}`;
    el.innerHTML = (who === "pingu" ? pingu() : motu()) + `<div class="bubble" aria-live="polite"></div>`;
    return el;
  }

  const ballSVG = `<svg viewBox="-10 -10 20 20" aria-hidden="true">${ballProp}</svg>`;

  window.Chars = { make, ballSVG, html: who => (who === "pingu" ? pingu() : motu()) };
})();
