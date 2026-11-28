import React from 'react';
import {Audio, Sequence, staticFile, interpolate} from 'remotion';
// Общая звуковая дорожка: музыка по сегментам + SFX, приглушение под речью.
// Атака быстрая (музыка уходит до начала фразы), возврат медленный (без «качания» в коротких паузах).
export type Seg = {track: string; from: number; to: number; vol?: number; start?: number};
export type Fx = {src: string; from: number; dur: number; start?: number; vol?: number; fadeOut?: number};
// выравнивание громкости треков (по среднему RMS, цель ≈ −17 дБ)
export const TRACK_GAIN: Record<string, number> = {kazakhstan: 0.8, desert: 0.9, tajikistan: 0.85, strings: 1.1, fairy: 1.1, enchanted: 1.25, tension: 1.1};
export const BED = 0.24;   // громкость музыки, когда никто не говорит
export const DUCK = 0.06;  // под речью
const FADE = 30;           // кроссфейд между треками, кадров
export const makeSpeech = (E: number[]) => {
  const out = new Float32Array(E.length);
  // предвидение: смотрим на 10 кадров вперёд, чтобы музыка ушла ДО слова
  for (let i = 0; i < E.length; i++) { let m = 0; for (let k = -6; k <= 10; k++) m = Math.max(m, E[i + k] ?? 0); out[i] = Math.min(1, m * 3); }
  let s = 0; for (let i = 0; i < out.length; i++) { const k = out[i] > s ? 0.35 : 0.03; s = s + (out[i] - s) * k; out[i] = s; }
  return out;
};
const MusicSeg: React.FC<{seg: Seg; speech: Float32Array; fps: number}> = ({seg, speech, fps}) => {
  const dur = seg.to - seg.from; const g = (TRACK_GAIN[seg.track] ?? 1) * (seg.vol ?? 1);
  return <Sequence from={Math.max(0, seg.from - FADE / 2)} durationInFrames={dur + FADE} name={'♪ ' + seg.track}>
    <Audio src={staticFile(`ep01/music/${seg.track}.mp3`)} loop startFrom={Math.round((seg.start ?? 0) * fps)} volume={(f) => {
      const D = dur + FADE;
      const fade = interpolate(f, [0, FADE, Math.max(FADE + 1, D - FADE), Math.max(FADE + 2, D)], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
      const sp = speech[Math.max(0, seg.from - FADE / 2) + f] ?? 0; return g * fade * (BED - (BED - DUCK) * sp);
    }} />
  </Sequence>;
};
export const Soundtrack: React.FC<{music: Seg[]; sfx: Fx[]; env: number[]; fps: number}> = ({music, sfx, env, fps}) => {
  const speech = React.useMemo(() => makeSpeech(env), [env]);
  return <>
    {music.map((m, i) => <MusicSeg key={i} seg={m} speech={speech} fps={fps} />)}
    {sfx.map((x, i) => <Sequence key={'fx' + i} from={x.from} durationInFrames={Math.max(1, x.dur)} name={'fx ' + x.src}>
      <Audio src={staticFile(`ep01/sfx/${x.src}.mp3`)} startFrom={Math.round((x.start ?? 0) * fps)} loop={x.src === 'wind'}
        volume={(f) => (x.vol ?? 1) * interpolate(f, [0, 4, Math.max(5, x.dur - (x.fadeOut ?? 6)), Math.max(6, x.dur)], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} />
    </Sequence>)}
  </>;
};
