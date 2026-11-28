import React from 'react';
import {Audio, Sequence, staticFile, interpolate} from 'remotion';
import {sentences, FPS, TOTAL_FRAMES} from './sentences';
import env from './env.json';
// музыка общая с 1-й серией (public/ep01/music)
const S = Object.fromEntries(sentences.map((x) => [x.id, x]));
const at = (id: string, t = 0) => Math.max(0, Math.round((S[id].start + t) * FPS));
const endOf = (id: string, t = 0) => Math.round((S[id].end + t) * FPS);
// сглаженная «есть речь» 0..1 для приглушения музыки (окно ±8 кадров)
const E = env as number[];
const speech = (() => { const out = new Float32Array(E.length); for (let i = 0; i < E.length; i++) { let m = 0; for (let k = -8; k <= 8; k++) m = Math.max(m, E[i + k] ?? 0); out[i] = Math.min(1, m * 3); } let s = 0; for (let i = 0; i < out.length; i++) { const k = out[i] > s ? 0.35 : 0.03; s = s + (out[i] - s) * k; out[i] = s; } return out; })();
type Seg = {track: string; from: number; to: number; vol?: number};
// Музыка по главам
const MUSIC: Seg[] = [
  {track: 'tension', from: 0, to: at('007', -1.2), vol: 0.9},
  {track: 'kazakhstan', from: at('007', -1.2), to: at('028', -0.8)},
  {track: 'desert', from: at('028', -0.8), to: at('046', -0.8)},
  {track: 'kazakhstan', from: at('046', -0.8), to: at('063', -0.8)},
  {track: 'tension', from: at('063', -0.8), to: at('096', -0.8), vol: 0.9},
  {track: 'emotional', from: at('096', -0.8), to: at('115', -0.8)},
  {track: 'kazakhstan', from: at('115', -0.8), to: at('139', -0.8)},
  {track: 'desert', from: at('139', -0.8), to: at('163', -0.3)},
  {track: 'tension', from: at('163', -0.3), to: at('182', -0.5), vol: 1},
  {track: 'emotional', from: at('182', -0.5), to: TOTAL_FRAMES},
];
const BED = 0.20, DUCK = 0.06, FADE = 24;
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
  {src: 'neigh', from: at('121', -0.1), dur: 45, start: 0.1, vol: 0.7},
  {src: 'neigh', from: at('172', 0.2), dur: 45, start: 0.1, vol: 0.6},
  {src: 'wind', from: at('063', -0.5), dur: endOf('075', 0.3) - at('063', -0.5), vol: 0.5, fadeOut: 30},
  {src: 'wind', from: at('171', -0.2), dur: endOf('176', 0.5) - at('171', -0.2), start: 8, vol: 0.9, fadeOut: 20},
];
export const Soundtrack2: React.FC = () => (
  <>
    {MUSIC.map((m, i) => <MusicSeg key={i} seg={m} />)}
    {SFX.map((x, i) => <Sequence key={'fx' + i} from={x.from} durationInFrames={Math.max(1, x.dur)} name={'fx ' + x.src}>
      <Audio src={staticFile(`ep01/sfx/${x.src}.mp3`)} startFrom={Math.round((x.start ?? 0) * FPS)} loop={x.src === 'wind' || x.src === 'crowd'}
        volume={(f) => (x.vol ?? 1) * interpolate(f, [0, 4, Math.max(5, x.dur - (x.fadeOut ?? 6)), Math.max(6, x.dur)], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} />
    </Sequence>)}
  </>
);
