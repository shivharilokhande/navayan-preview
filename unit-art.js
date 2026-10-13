// Unit sketches for the contents page. UNIT_ART(day, hues) composes one strip per day from small motifs,
// one per lesson subject, drawn in the subject colour; the first motif carries the gentle loop.
// Day 1 keeps its hand-drawn sunrise.
'use strict';
(() => {
  let k = 0;
  const P = (d, cls = '', extra = '') => `<path class="d ${cls}" pathLength="1" style="--k:${k++}" d="${d}" ${extra}/>`;
  const Tx = (x, y, s, size = 24, cls = '', anchor = 'start', extra = '') => `<text class="t ${cls}" style="--k:${k++}" x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}" ${extra}>${s}</text>`;
  const C = (cx, cy, r, cls = '') => `<circle class="d ${cls}" pathLength="1" style="--k:${k++}" cx="${cx}" cy="${cy}" r="${r}"/>`;
  const col = c => `style="color:${c}"`;

  // Each motif is drawn around (0,0) inside a 110×110 box, baseline at y=50 (the ground line).
  const MOTIF = {
    sci: (loop) => // a leaf cell with a nucleus (the nucleus breathes)
      P('M-40 50q0-62 52-74q6 60-52 74z') + P('M-40 50q20-40 52-74', 'a') +
      `<circle class="t ${loop ? 'root' : ''}" cx="-8" cy="12" r="7" fill="currentColor" stroke="none" opacity=".5" style="--k:${k++}"/>`,
    math: (loop) => // number tiles 1 2 3 and a hopping dot
      P('M-50 50H50') + P('M-46 50V22h24v28M-14 50V22h24v28M18 50V22h24v28') +
      Tx(-34, 42, '१', 18, '', 'middle') + Tx(-2, 42, '२', 18, '', 'middle') + Tx(30, 42, '३', 18, '', 'middle') +
      (loop ? `<circle class="hop" r="5" fill="currentColor" stroke="none" style="offset-path:path('M-34 14q16-26 32 0q16-26 32 0');--k:${k++}"/>` : ''),
    eng: (loop) => // a speech bubble saying Hello
      P('M-48 44q-6-50 40-50h16q44 0 40 42q-4 36-44 36h-20l-24 18 4-22q-10-8-12-24z') +
      Tx(0, 18, 'Hello!', 22, loop ? 'tilt' : '', 'middle', 'font-style="normal" font-weight="700"'),
    soc: (loop) => // three people holding hands (the middle one sways)
      [-32, 0, 32].map((x, i) => C(x, -10 + (i === 1 ? -6 : 0), 10, i === 1 && loop ? 'tilt' : '') +
        P(`M${x} 0v30M${x - 12} 50l12-20 12 20`)).join('') + P('M-22 12h12M10 12h12', 'a'),
    life: (loop) => // a phone/screen with a heart (the heart pulses)
      P('M-30 -32h60a8 8 0 0 1 8 8v66a8 8 0 0 1-8 8h-60a8 8 0 0 1-8-8v-66a8 8 0 0 1 8-8z') + P('M-10 42h20', 'a') +
      `<path class="t ${loop ? 'root' : ''}" d="M0 20l-16-15a9 9 0 0 1 16-11a9 9 0 0 1 16 11z" fill="currentColor" stroke="none" opacity=".5" style="--k:${k++}"/>`,
  };

  const DAY1 = () =>
    P('M230 130H580') +
    `<circle class="t breathe" cx="470" cy="128" r="26" fill="currentColor" stroke="none" opacity=".35" style="--k:${k++}"/>` +
    P('M444 128a26 26 0 0 1 52 0') + P('M430 100l-10-10M470 86V72M510 100l10-10', 'a') +
    P('M300 130V92') + P('M300 92q-30-8-26-36q12-26 40-16q26-16 36 12q6 26-22 38') +
    P('M360 130v-16h40v16M400 114l10-4v14M370 114l-6-8') + C(412, 108, 4, 'a') +
    P('M536 130q-6-14 10-16q14-2 14 16z', 'a') +
    Tx(236, 60, 'यातलं जिवंत काय?', 26);

  window.UNIT_ART = (day, hues) => {
    k = 0;
    if (day.day === 1) return DAY1();
    const subs = day.chapters.map(c => c.subject);
    const n = subs.length, gap = 150, x0 = 590 - 55 - (n - 1) * gap;   // right-aligned row, keeps the left third clear
    return P('M240 132H580', 'a') + subs.map((s, i) =>
      `<g transform="translate(${x0 + i * gap} 82)" ${col(hues[s])}>${MOTIF[s](i === 0)}</g>`).join('') +
      Tx(236, 48, `दिवस ${String(day.day).replace(/\d/g, d => '०१२३४५६७८९'[d])}`, 22, 'a');
  };
})();
