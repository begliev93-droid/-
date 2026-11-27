import React from 'react';
import {Audio, Sequence, staticFile, interpolate} from 'remotion';
import {sentences, FPS, TOTAL_FRAMES} from './sentences';
import env from './env.json';
const S = Object.fromEntries(sentences.map((x) => [x.id, x]));
const at = (id: string, t = 0) => Math.max(0, Math.round((S[id].start + t) * FPS));
const endOf = (id: string, t = 0) => Math.round((S[id].end + t) * FPS);
// сглаженная «есть речь» 0..1 для приглушения музыки (окно ±8 кадров)
const E = env as number[];
const speech = (() => { const out = new Float32Array(E.length); for (let i = 0; i < E.length; i++) { let m = 0; for (let k = -8; k <= 8; k++) m = Math.max(m, E[i + k] ?? 0); out[i] = Math.min(1, m * 3); } let s = 0; for (let i = 0; i < out.length; i++) { s = s + (out[i] - s) * 0.15; out[i] = s; } return out; })();
type Seg = {track: string; from: number; to: number; vol?: number};
// Музыка по главам
const MUSIC: Seg[] = [
  {track: 'kazakhstan', from: 0, to: at('013', -0.8)},
  {track: 'mysterious', from: at('013', -0.8), to: at('024', -0.2), vol: 0.9},
  {track: 'desert', from: at('024', -0.2), to: at('059', -0.6)},
  {track: 'mysterious', from: at('059', -0.6), to: at('075', -0.8), vol: 0.9},
  {track: 'kazakhstan', from: at('075', -0.8), to: at('088', -0.8)},
  {track: 'desert', from: at('088', -0.8), to: at('109', -0.3)},
  {track: 'emotional', from: at('109', -0.3), to: at('110', -0.8)},
  {track: 'kazakhstan', from: at('110', -0.8), to: at('126', -0.8)},
  {track: 'emotional', from: at('126', -0.8), to: at('139', -0.8)},
  {track: 'desert', from: at('139', -0.8), to: at('154', -0.5)},
  {track: 'mysterious', from: at('154', -0.5), to: at('157', -0.5)},
  {track: 'kazakhstan', from: at('157', -0.5), to: TOTAL_FRAMES},
];
const BED = 0.30, DUCK = 0.09, FADE = 24;
const MusicSeg: React.FC<{seg: Seg}> = ({seg}) => {
  const dur = seg.to - seg.from;
  return <Sequence from={seg.from} durationInFrames={dur} name={'♪ ' + seg.track}>
    <Audio src={staticFile(`ep01/music/${seg.track}.mp3`)} loop volume={(f) => {
      const fade = interpolate(f, [0, FADE, Math.max(FADE + 1, dur - FADE), Math.max(FADE + 2, dur)], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      const sp = speech[seg.from + f] ?? 0; return (seg.vol ?? 1) * fade * (BED - (BED - DUCK) * sp);
    }} />
  </Sequence>;
};
type Fx = {src: string; from: number; dur: number; start?: number; vol?: number; fadeOut?: number};
const SFX: Fx[] = [
  // стрелы (свист в файле начинается с 1.3 с)
  {src: 'arrow', from: at('002', -0.15), dur: 30, start: 1.3, vol: 0.55},
  {src: 'arrow', from: at('038', -0.15), dur: 30, start: 1.3, vol: 0.55},
  {src: 'arrow', from: at('043', -0.15), dur: 26, start: 1.3, vol: 0.55},
  // ржание кобылы на холме
  {src: 'neigh', from: at('119', -0.1), dur: 45, start: 0.1, vol: 0.8},
  {src: 'neigh', from: at('120', 0.3), dur: 100, start: 2.0, vol: 0.45},
  // ветер жұта
  {src: 'wind', from: at('013', -0.8), dur: endOf('016', 0.5) - at('013', -0.8), vol: 0.9, fadeOut: 30},
  {src: 'wind', from: at('081', -0.2), dur: 75, start: 5, vol: 0.7, fadeOut: 20},
  {src: 'wind', from: at('161', -0.2), dur: endOf('161', 0.3) - at('161', -0.2), start: 12, vol: 0.8, fadeOut: 15},
  // гул толпы на асе и тое
  {src: 'crowd', from: at('092', -0.5), dur: endOf('095', 0.3) - at('092', -0.5), vol: 0.12, fadeOut: 20},
  {src: 'crowd', from: at('133', -0.5), dur: endOf('135', 0.3) - at('133', -0.5), start: 8, vol: 0.12, fadeOut: 20},
];
export const Soundtrack: React.FC = () => (
  <>
    {MUSIC.map((m, i) => <MusicSeg key={i} seg={m} />)}
    {SFX.map((x, i) => <Sequence key={'fx' + i} from={x.from} durationInFrames={Math.max(1, x.dur)} name={'fx ' + x.src}>
      <Audio src={staticFile(`ep01/sfx/${x.src}.mp3`)} startFrom={Math.round((x.start ?? 0) * FPS)} loop={x.src === 'wind' || x.src === 'crowd'}
        volume={(f) => (x.vol ?? 1) * interpolate(f, [0, 4, Math.max(5, x.dur - (x.fadeOut ?? 6)), Math.max(6, x.dur)], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} />
    </Sequence>)}
  </>
);
