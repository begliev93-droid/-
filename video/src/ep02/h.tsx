import {useCurrentFrame} from 'remotion';
import {useShot} from '../lib/ctx';
import {sentences, FPS} from './sentences';
export const F = () => useCurrentFrame();
export const D = () => useShot().dur;
const S = Object.fromEntries(sentences.map((x) => [x.id, x]));
// кадр (от начала реплики), на котором звучит слово — для ударов «*слово*»
export const wf = (id: string, word: string) => { const se = S[id]; const k = se.text.toLowerCase().indexOf(word.toLowerCase()); if (k < 0) throw new Error(`нет слова ${word} в ${id}`); return Math.round((k / se.text.length) * (se.end - se.start) * FPS); };
export const AFTER = (id: string, pad = 0.15) => { const x = S[id]; return x.end - x.start + pad; };
export const durS = (id: string) => Math.round((S[id].end - S[id].start) * FPS);
