import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, OUT, SW} from '../lib/theme';
import {Person} from '../lib/Puppet';
import {brotherLook} from '../lib/cast';
export const Sack: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => s <= 0.02 ? null : (
  <g transform={`translate(${x},${y}) scale(${s})`}><path d="M -50 0 Q -60 -80 -20 -100 L -30 -120 L 30 -120 L 20 -100 Q 60 -80 50 0 Z" fill="#CDB38A" stroke={OUT} strokeWidth={SW} strokeLinejoin="round" /><line x1={-26} y1={-104} x2={26} y2={-104} stroke={C.woodDark} strokeWidth={6} /></g>
);
export const Besik: React.FC<{x: number; y: number; s?: number; rock?: boolean; children?: React.ReactNode}> = ({x, y, s = 1, rock = true, children}) => {
  const f = useCurrentFrame();
  return <g transform={`translate(${x},${y}) scale(${s}) rotate(${rock ? Math.sin(f * 0.1) * 5 : 0})`}>
    {children}
    <path d="M -150 -60 Q 0 40 150 -60 L 150 -20 Q 0 70 -150 -20 Z" fill={C.wood} stroke={OUT} strokeWidth={SW} />
    <path d="M -150 -60 Q -150 -170 0 -170 Q 150 -170 150 -60" fill="none" stroke={C.woodDark} strokeWidth={14} />
    <rect x={-120} y={-75} width={240} height={30} rx={10} fill={C.red} stroke={OUT} strokeWidth={4} />
    <path d="M -160 30 Q 0 90 160 30" fill="none" stroke={C.woodDark} strokeWidth={12} />
  </g>;
};
// сушилка с полосками мяса
export const Rack: React.FC<{x: number; y: number; n?: number}> = ({x, y, n = 8}) => (
  <g transform={`translate(${x},${y})`}><line x1={-260} y1={0} x2={-240} y2={-280} stroke={C.woodDark} strokeWidth={14} /><line x1={260} y1={0} x2={240} y2={-280} stroke={C.woodDark} strokeWidth={14} />
    <line x1={-260} y1={-270} x2={260} y2={-270} stroke={C.wood} strokeWidth={12} />
    {Array.from({length: n}).map((_, i) => <path key={i} d={`M ${-220 + i * (440 / Math.max(1, n - 1))} -268 q 14 60 -4 120 q -10 6 -14 -4 q 10 -60 -2 -116 z`} fill="#8E3B2A" stroke={OUT} strokeWidth={4} />)}</g>
);
export const Silhouettes: React.FC<{x: number; y: number; o?: number; s?: number; walk?: boolean}> = ({x, y, o = 0.35, s = 0.8, walk}) => (
  <g opacity={o}>{Array.from({length: 8}).map((_, i) => <g key={i} style={{filter: 'grayscale(1)'}}><Person name={'sil' + i} look={{...brotherLook(i), coat: '#55607A', coat2: '#55607A', belt: '#444C60', pants: '#3A4152', hatColor: '#7A8399', hatColor2: '#55607A', skin: '#8A93A8'}} age="adult" x={x + (i - 3.5) * 120 * s} y={y - (i % 2) * 20} scale={s} pose={walk ? 'walk' : 'stand'} facing={walk ? 1 : (i < 4 ? 1 : -1)} /></g>)}</g>
);
export const Frame: React.FC<{x: number; y: number; w?: number; h?: number; children: React.ReactNode; color?: string}> = ({x, y, w = 420, h = 360, children, color = C.gold}) => (
  <g transform={`translate(${x},${y})`}><clipPath id={`fr${x}${y}`}><rect x={-w / 2} y={-h / 2} width={w} height={h} rx={30} /></clipPath>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={30} fill={C.cream} />
    <g clipPath={`url(#fr${x}${y})`}><g transform={`scale(${w / 640}) translate(-960,-740)`}>{children}</g></g>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={30} fill="none" stroke={OUT} strokeWidth={10} /><rect x={-w / 2 + 12} y={-h / 2 + 12} width={w - 24} height={h - 24} rx={22} fill="none" stroke={color} strokeWidth={5} /></g>
);
export const Asyq: React.FC<{x: number; y: number; r?: number}> = ({x, y, r = 0}) => (
  <g transform={`translate(${x},${y}) rotate(${r})`}><path d="M -22 -12 Q -30 -30 -10 -26 Q 0 -36 10 -26 Q 30 -30 22 -12 Q 30 10 10 8 Q 0 18 -10 8 Q -30 10 -22 -12 Z" fill="#F3E6C8" stroke={OUT} strokeWidth={4} /></g>
);
export const Sneaker: React.FC<{x: number; y: number; broken?: number}> = ({x, y, broken = 0}) => (
  <g transform={`translate(${x},${y})`}><path d="M -110 0 L -110 -70 Q -60 -90 -20 -60 L 60 -40 Q 110 -30 110 0 Z" fill={C.white} stroke={OUT} strokeWidth={SW} />
    <path d="M -100 -60 L -30 -50 M -90 -40 L -20 -35" stroke={C.sky} strokeWidth={8} />
    <g transform={`translate(0,${broken * 50}) rotate(${broken * 14})`}><rect x={-115} y={-2} width={230} height={24} rx={10} fill={C.sunset} stroke={OUT} strokeWidth={SW} /></g></g>
);
export const Coin: React.FC<{x: number; y: number; r?: number}> = ({x, y, r = 26}) => <g><circle cx={x} cy={y} r={r} fill={C.gold} stroke={OUT} strokeWidth={5} /><circle cx={x} cy={y} r={r * 0.6} fill="none" stroke="#C99A2E" strokeWidth={3} /></g>;
export const GlowEyes: React.FC<{x: number; y: number; s?: number; open?: number}> = ({x, y, s = 1, open = 1}) => {
  const f = useCurrentFrame(); const bl = (f % 120) < 5 ? 0.1 : open;
  return <g transform={`translate(${x},${y}) scale(${s})`}>{[-60, 60].map((dx) => <g key={dx}><ellipse cx={dx} cy={0} rx={60} ry={40 * bl} fill="#B6FF8A" opacity={0.35} /><ellipse cx={dx} cy={0} rx={32} ry={20 * bl} fill="#E8FFD0" /><ellipse cx={dx + 4} cy={0} rx={8} ry={18 * bl} fill={OUT} /></g>)}</g>;
};
export const Peri: React.FC<{x: number; y: number; s?: number; o?: number}> = ({x, y, s = 1, o = 1}) => {
  const f = useCurrentFrame();
  return <g transform={`translate(${x},${y + Math.sin(f * 0.06) * 12}) scale(${s})`} opacity={o}>
    <ellipse cx={0} cy={-200} rx={220} ry={300} fill="#9C7BFF" opacity={0.18} />
    <path d="M -120 0 Q -90 -260 0 -330 Q 90 -260 120 0 Q 0 30 -120 0 Z" fill="#2A1F4E" />
    <circle cx={0} cy={-370} r={70} fill="#2A1F4E" />
    <path d="M -70 -390 Q -160 -300 -150 -120 Q -120 -260 -60 -330 Z M 70 -390 Q 160 -300 150 -120 Q 120 -260 60 -330 Z" fill="#1A1336" />
    <ellipse cx={-24} cy={-372} rx={12} ry={7} fill="#B6FF8A" /><ellipse cx={24} cy={-372} rx={12} ry={7} fill="#B6FF8A" />
  </g>;
};
export const GirlSil: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}><path d="M -90 0 L -60 -230 Q 0 -260 60 -230 L 90 0 Z" fill="#3A2F5E" /><circle cx={0} cy={-290} r={58} fill="#3A2F5E" />
    <path d="M -40 -340 L 0 -440 L 40 -340 Z" fill="#3A2F5E" /><circle cx={0} cy={-445} r={10} fill={C.gold} />
    <path d="M -50 -280 Q -80 -150 -60 -60" stroke="#3A2F5E" strokeWidth={22} fill="none" strokeLinecap="round" /><path d="M 50 -280 Q 80 -150 60 -60" stroke="#3A2F5E" strokeWidth={22} fill="none" strokeLinecap="round" /></g>
);
