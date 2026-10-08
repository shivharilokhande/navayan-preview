// Unit sketch for the contents page: a sunrise over a field, a tree, a cow, and a stone — the morning the lesson begins.
'use strict';
(() => {
  let k = 0;
  const P = (d, cls = '', extra = '') => `<path class="d ${cls}" pathLength="1" style="--k:${k++}" d="${d}" ${extra}/>`;
  const Tx = (x, y, s, size = 24, cls = '', anchor = 'start') => `<text class="t ${cls}" style="--k:${k++}" x="${x}" y="${y}" font-size="${size}" text-anchor="${anchor}">${s}</text>`;
  const C = (cx, cy, r, cls = '') => `<circle class="d ${cls}" pathLength="1" style="--k:${k++}" cx="${cx}" cy="${cy}" r="${r}"/>`;
  const reset = s => { k = 0; return s; };
  window.UNIT_ART = [
    reset(
      // horizon and rising sun (the sun breathes)
      P('M230 130H580') +
      `<circle class="t breathe" cx="470" cy="128" r="26" fill="currentColor" stroke="none" opacity=".35" style="--k:${k++}"/>` +
      P('M444 128a26 26 0 0 1 52 0') + P('M430 100l-10-10M470 86V72M510 100l10-10', 'a') +
      // tree
      P('M300 130V92') + P('M300 92q-30-8-26-36q12-26 40-16q26-16 36 12q6 26-22 38', '') +
      // cow (very simple)
      P('M360 130v-16h40v16M400 114l10-4v14M370 114l-6-8') + C(412, 108, 4, 'a') +
      // stone
      P('M536 130q-6-14 10-16q14-2 14 16z', 'a') +
      Tx(236, 60, 'यातलं जिवंत काय?', 26)
    ),
  ];
})();
