import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, OUT} from './theme';
import {rnd} from './util';
export const Snow: React.FC<{n?: number; wind?: number; heavy?: boolean}> = ({n = 120, wind = 3, heavy}) => {
  const f = useCurrentFrame();
  return <g>{Array.from({length: heavy ? n * 2 : n}).map((_, i) => { const sp = 2 + rnd(i) * 4; const x = ((rnd(i + 5) * 2600 + f * wind * sp) % 2600) - 340; const y = ((rnd(i + 9) * 1500 + f * sp * 2) % 1500) - 300;
    return <circle key={i} cx={x} cy={y} r={2 + rnd(i + 3) * 5} fill="#FFFFFF" opacity={0.9} />; })}</g>;
};
export const SpeedLines: React.FC<{dir?: 1 | -1; y?: number; h?: number}> = ({dir = 1, y = 540, h = 500}) => {
  const f = useCurrentFrame();
  return <g opacity={0.8}>{Array.from({length: 22}).map((_, i) => { const yy = y - h / 2 + rnd(i) * h; const x = (((rnd(i + 2) * 2400) - f * 60 * dir) % 2400 + 2400) % 2400 - 240;
    return <line key={i} x1={x} y1={yy} x2={x + 220 * dir} y2={yy} stroke={C.white} strokeWidth={6} strokeLinecap="round" />; })}</g>;
};
export const DizzyStars: React.FC<{x: number; y: number}> = ({x, y}) => {
  const f = useCurrentFrame();
  return <g transform={`translate(${x},${y})`}>{[0, 1, 2].map((i) => { const a = f * 0.15 + (i * Math.PI * 2) / 3; return <path key={i} transform={`translate(${Math.cos(a) * 60},${Math.sin(a) * 18})`} d="M 0 -16 L 5 -5 L 16 -4 L 7 4 L 10 16 L 0 9 L -10 16 L -7 4 L -16 -4 L -5 -5 Z" fill={C.gold} stroke={OUT} strokeWidth={3} />; })}</g>;
};
export const Sparkle: React.FC<{x: number; y: number; s?: number; at?: number}> = ({x, y, s = 1, at = 0}) => {
  const f = useCurrentFrame() - at; if (f < 0) return null; const k = Math.max(0, 1 - f / 25);
  return <g transform={`translate(${x},${y}) scale(${s * (0.5 + (1 - k))}) rotate(${f * 4})`} opacity={k}>{[0, 1, 2, 3].map((i) => <path key={i} d="M 0 -60 L 10 -10 L 0 0 L -10 -10 Z" fill={C.gold} stroke={OUT} strokeWidth={3} transform={`rotate(${i * 90})`} />)}</g>;
};
export const Burst: React.FC<{x: number; y: number; at?: number; color?: string}> = ({x, y, at = 0, color = C.gold}) => {
  const f = useCurrentFrame() - at; if (f < 0 || f > 18) return null; const k = f / 18;
  return <g transform={`translate(${x},${y})`} opacity={1 - k}>{Array.from({length: 10}).map((_, i) => <line key={i} x1={0} y1={0} x2={0} y2={-40 - k * 120} stroke={color} strokeWidth={10} strokeLinecap="round" transform={`rotate(${i * 36}) translate(0,${-30 - k * 40})`} />)}</g>;
};
export const Dust: React.FC<{x: number; y: number; w?: number; n?: number}> = ({x, y, w = 600, n = 10}) => {
  const f = useCurrentFrame();
  return <g>{Array.from({length: n}).map((_, i) => { const t = ((f + i * 9) % 50) / 50; return <circle key={i} cx={x + (rnd(i) - 0.5) * w - t * 80} cy={y - t * 60} r={20 + t * 50} fill="#E3CF9E" opacity={0.6 * (1 - t)} />; })}</g>;
};
export const Hearts: React.FC<{x: number; y: number}> = ({x, y}) => {
  const f = useCurrentFrame();
  return <g>{[0, 1, 2].map((i) => { const t = ((f + i * 20) % 60) / 60; return <path key={i} d="M 0 10 C -30 -15 -15 -35 0 -18 C 15 -35 30 -15 0 10 Z" fill="#E0457B" stroke={OUT} strokeWidth={3} transform={`translate(${x + (i - 1) * 40 + Math.sin(t * 6) * 10},${y - t * 120}) scale(${0.8 + t * 0.6})`} opacity={1 - t} />; })}</g>;
};
export const Vignette: React.FC<{k?: number; color?: string}> = ({k = 0.5, color = '#000'}) => (
  <g><defs><radialGradient id="vig"><stop offset="0.55" stopColor={color} stopOpacity={0} /><stop offset="1" stopColor={color} stopOpacity={k} /></radialGradient></defs><rect x={-300} y={-300} width={2520} height={1700} fill="url(#vig)" /></g>
);
export const Rays: React.FC<{x: number; y: number; color?: string; o?: number}> = ({x, y, color = '#FFE8A3', o = 0.45}) => {
  const f = useCurrentFrame();
  return <g transform={`translate(${x},${y}) rotate(${f * 0.3})`} opacity={o}>{Array.from({length: 12}).map((_, i) => <path key={i} d="M 0 0 L -60 -900 L 60 -900 Z" fill={color} transform={`rotate(${i * 30})`} />)}</g>;
};
