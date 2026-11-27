import {continueRender, delayRender, staticFile} from 'remotion';
const files = ['cyrillic', 'cyrillic-ext', 'latin'].flatMap((s) => [800, 900].map((w) => ({s, w})));
let loaded = false;
export const loadFonts = () => {
  if (loaded || typeof document === 'undefined') return; loaded = true;
  const h = delayRender('fonts');
  Promise.all(files.map(({s, w}) => { const ff = new FontFace('Rubik', `url(${staticFile(`fonts/rubik-${s}-${w}-normal.woff2`)}) format('woff2')`, {weight: String(w)}); document.fonts.add(ff); return ff.load(); }))
    .then(() => continueRender(h)).catch((e) => { console.error(e); continueRender(h); });
};
