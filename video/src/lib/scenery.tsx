import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, OUT, SW} from './theme';
import {rnd} from './util';
export type Sky = 'day' | 'sunset' | 'night' | 'winter' | 'dusk';
const SKY: Record<Sky, [string, string]> = {day: ['#7FD3E6', '#FFF4DC'], sunset: ['#F26B3A', '#FFD08A'], night: ['#14122E', '#2B2D6E'], winter: ['#9FB1C8', '#E8EEF5'], dusk: ['#5B4A8C', '#F2A65A']};
// Мир 1920x1080, фон рисуем с запасом под зум камеры
export const Steppe: React.FC<{sky?: Sky; ground?: 'steppe' | 'snow' | 'desert'; hills?: boolean; sun?: boolean; horizon?: number; mirage?: boolean}> = ({sky = 'day', ground = 'steppe', hills = true, sun = true, horizon = 640, mirage}) => {
  const f = useCurrentFrame(); const [a, b] = SKY[sky];
  const g1 = ground === 'snow' ? C.snow : ground === 'desert' ? '#EBC77E' : C.ochre;
  const g2 = ground === 'snow' ? C.snowShade : ground === 'desert' ? '#D9AE60' : C.ochreDark;
  const hillC = ground === 'snow' ? ['#DCE4EE', '#C2CEDD'] : sky === 'night' ? ['#2E3A5E', '#26304F'] : ['#B9A26B', '#9DB04A'];
  return (
    <g>
      <defs><linearGradient id={`sky-${sky}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient></defs>
      <rect x={-700} y={-300} width={3300} height={horizon + 320} fill={`url(#sky-${sky})`} />
      {sky === 'night' && Array.from({length: 70}).map((_, i) => <circle key={i} cx={rnd(i) * 2400 - 240} cy={rnd(i + 99) * (horizon - 40) - 200} r={1.5 + rnd(i + 7) * 2.5} fill={C.cream} opacity={0.5 + 0.5 * Math.sin(f * 0.1 + i)} />)}
      {sun && sky !== 'night' && sky !== 'winter' && <circle cx={sky === 'day' ? 1560 : 1560} cy={sky === 'day' ? 150 : horizon - 40} r={sky === 'day' ? 80 : 120} fill={sky === 'day' ? '#FFE8A3' : '#FFD08A'} stroke={sky === 'day' ? '#FFD36B' : C.sunset} strokeWidth={10} />}
      {sun && sky === 'night' && <circle cx={1500} cy={160} r={60} fill={C.cream} />}
      {sky !== 'night' && [0, 1, 2].map((i) => <g key={i} transform={`translate(${((i * 800 + f * 0.4) % 2600) - 400},${80 + i * 70})`}><ellipse cx={0} cy={0} rx={110} ry={34} fill="#FFFFFF" opacity={0.85} /><ellipse cx={60} cy={-20} rx={70} ry={30} fill="#FFFFFF" opacity={0.85} /></g>)}
      {hills && <path d={`M -700 ${horizon} L -300 ${horizon} Q 100 ${horizon - 140} 500 ${horizon - 40} T 1300 ${horizon - 70} T 2220 ${horizon - 30} L 2600 ${horizon - 30} L 2600 ${horizon + 40} L -700 ${horizon + 40} Z`} fill={hillC[0]} />}
      {hills && <path d={`M -300 ${horizon + 10} Q 300 ${horizon - 60} 800 ${horizon} T 2220 ${horizon - 10} L 2600 ${horizon - 10} L 2600 ${horizon + 40} L -700 ${horizon + 40} L -700 ${horizon + 10} Z`} fill={hillC[1]} opacity={0.7} />}
      {mirage && <rect x={-300} y={horizon - 60} width={2520} height={70} fill="#FFFFFF" opacity={0.25 + 0.1 * Math.sin(f * 0.2)} />}
      <rect x={-700} y={horizon} width={3300} height={1400 - horizon} fill={g1} />
      <path d={`M -300 ${horizon + 120} Q 600 ${horizon + 80} 1100 ${horizon + 150} T 2220 ${horizon + 110} L 2600 ${horizon + 110} L 2600 1400 L -700 1400 L -700 ${horizon + 120} Z`} fill={g2} opacity={0.35} />
      {ground !== 'snow' && Array.from({length: 40}).map((_, i) => { const x = rnd(i * 3) * 2400 - 240; const y = horizon + 30 + rnd(i * 5) * 500; const s = 0.6 + (y - horizon) / 500;
        return <path key={i} d={`M ${x} ${y} l ${-8 * s} ${-22 * s} M ${x} ${y} l 0 ${-28 * s} M ${x} ${y} l ${8 * s} ${-22 * s}`} stroke={ground === 'desert' ? '#B08A40' : C.grassDark} strokeWidth={4} strokeLinecap="round" />; })}
    </g>
  );
};
export const Yurt: React.FC<{x: number; y: number; scale?: number; door?: boolean; color?: string; smoke?: boolean}> = ({x, y, scale = 1, door = true, color = C.felt, smoke}) => {
  const f = useCurrentFrame();
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      {smoke && [0, 1, 2].map((i) => { const t = ((f + i * 20) % 60) / 60; return <circle key={i} cx={Math.sin(t * 6) * 15} cy={-330 - t * 160} r={18 + t * 30} fill="#E8E2D6" opacity={0.7 * (1 - t)} />; })}
      <path d="M -240 0 L -240 -150 Q -230 -290 0 -320 Q 230 -290 240 -150 L 240 0 Z" fill={color} stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M -240 -150 Q 0 -175 240 -150" fill="none" stroke={OUT} strokeWidth={4} />
      <rect x={-242} y={-150} width={484} height={26} fill={C.red} stroke={OUT} strokeWidth={4} />
      {Array.from({length: 12}).map((_, i) => <path key={i} d={`M ${-225 + i * 40} -124 l 10 -13 l 10 13`} stroke={C.gold} strokeWidth={4} fill="none" />)}
      <ellipse cx={0} cy={-310} rx={60} ry={14} fill={C.wood} stroke={OUT} strokeWidth={4} />
      {door && <g><rect x={-55} y={-150} width={110} height={150} fill={C.red} stroke={OUT} strokeWidth={SW} /><path d="M -40 -120 l 40 30 l 40 -30 M -40 -60 l 40 30 l 40 -30" stroke={C.gold} strokeWidth={5} fill="none" /></g>}
    </g>
  );
};
export const Aul: React.FC<{horizon?: number; n?: number}> = ({horizon = 640, n = 5}) => (
  <g>{Array.from({length: n}).map((_, i) => <Yurt key={i} x={150 + i * (1700 / Math.max(1, n - 1)) + (rnd(i) - 0.5) * 120} y={horizon + 20 + (i % 2) * 30} scale={0.4 + (i % 2) * 0.08} smoke={i % 2 === 0} />)}</g>
);
// интерьер юрты: кереге, шаңырақ, ковёр
export const YurtInside: React.FC<{light?: boolean; night?: boolean; fire?: boolean; tundikOpen?: number}> = ({light = true, night, fire, tundikOpen = 1}) => {
  const f = useCurrentFrame();
  const wall = night ? '#5A3E2E' : '#B07A48';
  return (
    <g>
      <rect x={-700} y={-300} width={3300} height={1700} fill={night ? '#2A1E1A' : '#6E4A2E'} />
      <path d="M -300 -300 L 960 -120 L 2220 -300 L 2220 380 L -300 380 Z" fill={night ? '#3B2A22' : '#C9A37A'} />
      {Array.from({length: 26}).map((_, i) => <line key={'u' + i} x1={960} y1={-120} x2={-300 + i * 101} y2={380} stroke={C.wood} strokeWidth={10} />)}
      <circle cx={960} cy={-120} r={170} fill={night ? '#1E1B3A' : light ? '#BDEFF7' : '#8FA6B8'} stroke={C.woodDark} strokeWidth={22} />
      {tundikOpen > 0 && <circle cx={960} cy={-120} r={150 * tundikOpen} fill={night ? '#2B2D6E' : '#E7FAFF'} opacity={0.9} />}
      <path d="M 810 -120 L 1110 -120 M 960 -270 L 960 30 M 855 -225 L 1065 -15 M 855 -15 L 1065 -225" stroke={C.woodDark} strokeWidth={14} />
      <rect x={-700} y={380} width={3300} height={400} fill={wall} />
      {Array.from({length: 40}).map((_, i) => <g key={'k' + i}><line x1={-300 + i * 70} y1={380} x2={-300 + i * 70 + 140} y2={780} stroke={C.woodDark} strokeWidth={7} /><line x1={-300 + i * 70 + 140} y1={380} x2={-300 + i * 70} y2={780} stroke={C.woodDark} strokeWidth={7} /></g>)}
      <rect x={-300} y={370} width={2520} height={22} fill={C.red} stroke={OUT} strokeWidth={4} />
      <rect x={-700} y={760} width={3300} height={700} fill={C.redDark} />
      <rect x={-100} y={800} width={2120} height={560} fill={C.red} stroke={C.gold} strokeWidth={10} />
      {Array.from({length: 9}).map((_, i) => <path key={'o' + i} d={`M ${40 + i * 220} 900 q 40 -50 80 0 q 40 50 80 0`} stroke={C.gold} strokeWidth={8} fill="none" />)}
      {fire && <g transform="translate(960,900)"><path d="M -70 30 L -40 -10 L 0 30 L 40 -10 L 70 30 Z" fill={C.woodDark} />
        {[0, 1, 2].map((i) => <path key={i} d={`M ${-40 + i * 40} 10 Q ${-50 + i * 40} ${-50 - 20 * Math.sin(f * 0.4 + i)} ${-40 + i * 40} ${-90 - 30 * Math.sin(f * 0.3 + i * 2)} Q ${-20 + i * 40} -40 ${-40 + i * 40} 10`} fill={i === 1 ? C.gold : C.fire} />)}</g>}
      {night && <rect x={-300} y={-300} width={2520} height={1700} fill="#0E0B25" opacity={0.35} />}
    </g>
  );
};
export const Kazan: React.FC<{x: number; y: number; scale?: number; steam?: boolean; fire?: boolean}> = ({x, y, scale = 1, steam, fire = true}) => {
  const f = useCurrentFrame();
  return <g transform={`translate(${x},${y}) scale(${scale})`}>
    {fire && [0, 1, 2].map((i) => <path key={i} d={`M ${-50 + i * 50} 0 Q ${-60 + i * 50} ${-40 - 15 * Math.sin(f * 0.4 + i)} ${-50 + i * 50} ${-70 - 20 * Math.sin(f * 0.3 + i)} Q ${-30 + i * 50} -30 ${-50 + i * 50} 0`} fill={i === 1 ? C.gold : C.fire} />)}
    <line x1={-120} y1={10} x2={-30} y2={-230} stroke={C.ironDark} strokeWidth={10} /><line x1={120} y1={10} x2={30} y2={-230} stroke={C.ironDark} strokeWidth={10} />
    <path d="M -120 -150 Q -120 -40 0 -40 Q 120 -40 120 -150 Z" fill={C.ironDark} stroke={OUT} strokeWidth={SW} />
    <ellipse cx={0} cy={-150} rx={122} ry={22} fill="#2A2E38" stroke={OUT} strokeWidth={SW} />
    {steam && [0, 1, 2, 3].map((i) => { const t = ((f + i * 12) % 48) / 48; return <circle key={i} cx={-40 + i * 25 + Math.sin(t * 8) * 10} cy={-170 - t * 160} r={14 + t * 26} fill="#FFFFFF" opacity={0.6 * (1 - t)} />; })}
  </g>;
};
// төстік — сушёная грудинка (на верёвке)
export const Tostik_meat: React.FC<{x: number; y: number; scale?: number; glow?: boolean; rope?: number}> = ({x, y, scale = 1, glow, rope = 0}) => {
  const f = useCurrentFrame();
  return <g transform={`translate(${x},${y}) scale(${scale}) rotate(${Math.sin(f * 0.08) * 6})`}>
    {rope > 0 && <line x1={0} y1={-rope} x2={0} y2={0} stroke={C.woodDark} strokeWidth={5} />}
    {glow && <circle cx={0} cy={60} r={110 + Math.sin(f * 0.3) * 10} fill="#FFE8A3" opacity={0.5} />}
    <path d="M -55 10 Q -70 70 -20 120 Q 0 135 20 120 Q 70 70 55 10 Q 0 -10 -55 10 Z" fill="#A9643A" stroke={OUT} strokeWidth={SW} />
    {[0, 1, 2, 3].map((i) => <path key={i} d={`M ${-40 + i * 8} ${35 + i * 18} Q 0 ${45 + i * 18} ${40 - i * 8} ${35 + i * 18}`} stroke="#F3DCC0" strokeWidth={7} fill="none" strokeLinecap="round" />)}
  </g>;
};
// өрмек — длинная полосатая ткань на кольях
export const Loom: React.FC<{x: number; y: number; w?: number; broken?: number}> = ({x, y, w = 900, broken = 0}) => {
  const cols = [C.red, C.gold, C.indigo, C.cream, '#2F6E5E', C.sunset];
  return <g transform={`translate(${x},${y})`}>
    <rect x={-w / 2 - 20} y={-40} width={20} height={70} fill={C.wood} stroke={OUT} strokeWidth={4} /><rect x={w / 2} y={-40} width={20} height={70} fill={C.wood} stroke={OUT} strokeWidth={4} />
    {Array.from({length: 12}).map((_, i) => { const yy = -30 + i * 5; const c = cols[i % cols.length]; const brk = broken > 0 && i % 3 === 1;
      if (!brk) return <line key={i} x1={-w / 2} y1={yy} x2={w / 2} y2={yy} stroke={c} strokeWidth={5} />;
      const k = broken; return <g key={i}><path d={`M ${-w / 2} ${yy} L ${-30 * k} ${yy} q ${-20 * k} ${30 * k} ${-50 * k} ${50 * k}`} stroke={c} strokeWidth={5} fill="none" /><path d={`M ${w / 2} ${yy} L ${40 * k} ${yy} q ${20 * k} ${30 * k} ${50 * k} ${60 * k}`} stroke={c} strokeWidth={5} fill="none" /></g>; })}
    <rect x={-w / 2} y={-34} width={w * 0.35} height={70} fill="url(#none)" />
    <path d={`M ${-w / 2} 20 L ${-w / 2 + w * 0.35} 20 L ${-w / 2 + w * 0.35} -34 L ${-w / 2} -34 Z`} fill={C.red} stroke={OUT} strokeWidth={4} opacity={0.9} />
    {Array.from({length: 5}).map((_, i) => <path key={i} d={`M ${-w / 2 + 20 + i * 60} -7 l 20 -20 l 20 20 l -20 20 z`} fill={C.gold} />)}
  </g>;
};
// стопка кетпенов (9 железных пластин)
export const Ketpen: React.FC<{x: number; y: number; hole?: boolean}> = ({x, y, hole}) => (
  <g transform={`translate(${x},${y})`}>{Array.from({length: 9}).map((_, i) => <g key={i} transform={`translate(${i * 22},${-i * 4})`}><path d="M 0 -120 L 14 -112 L 14 40 L 0 32 Z" fill={i % 2 ? C.iron : '#9AA2B3'} stroke={OUT} strokeWidth={4} />{hole && <circle cx={7} cy={-40} r={7} fill={OUT} />}</g>)}</g>
);
export const Arrow: React.FC<{x: number; y: number; angle?: number; len?: number}> = ({x, y, angle = 0, len = 160}) => (
  <g transform={`translate(${x},${y}) rotate(${angle})`}><line x1={-len} y1={0} x2={0} y2={0} stroke={OUT} strokeWidth={9} /><line x1={-len} y1={0} x2={0} y2={0} stroke={C.wood} strokeWidth={5} />
    <path d="M 0 -10 L 24 0 L 0 10 Z" fill={C.iron} stroke={OUT} strokeWidth={3} /><path d={`M ${-len} 0 l -18 -12 l 10 12 l -10 12 z`} fill={C.red} stroke={OUT} strokeWidth={3} /></g>
);
export const Qos: React.FC<{x: number; y: number; scale?: number}> = ({x, y, scale = 1}) => (
  <g transform={`translate(${x},${y}) scale(${scale})`}><path d="M -200 0 L -150 -200 Q 0 -260 150 -200 L 200 0 Z" fill="#2E2A2A" stroke={OUT} strokeWidth={SW} /><path d="M -40 0 L -20 -120 L 20 -120 L 40 0 Z" fill="#14110F" /></g>
);
// кереге с серьгами
export const Earrings: React.FC<{x: number; y: number; n: number; extra?: boolean; glow?: boolean}> = ({x, y, n, extra, glow}) => {
  const f = useCurrentFrame();
  const one = (i: number, sx: number, big = false) => <g key={i} transform={`translate(${sx},0) rotate(${Math.sin(f * 0.1 + i) * 8})`}>
    <line x1={0} y1={0} x2={0} y2={30} stroke={C.gold} strokeWidth={4} /><circle cx={0} cy={6} r={7} fill="none" stroke={C.gold} strokeWidth={4} />
    <path d="M -14 30 Q 0 80 14 30 Z" fill={big ? C.red : C.gold} stroke={OUT} strokeWidth={4} />{big && glow && <circle cx={0} cy={45} r={40} fill="#FFE8A3" opacity={0.4 + 0.2 * Math.sin(f * 0.3)} />}</g>;
  return <g transform={`translate(${x},${y})`}><rect x={-40} y={-14} width={n * 70 + 20} height={14} fill={C.wood} stroke={OUT} strokeWidth={4} />{Array.from({length: n}).map((_, i) => one(i, i * 70))}{extra && one(99, n * 70 + 60, true)}</g>;
};
export const Dastarkhan: React.FC<{x: number; y: number; w?: number}> = ({x, y, w = 1400}) => (
  <g transform={`translate(${x},${y})`}><rect x={-w / 2} y={-30} width={w} height={60} rx={20} fill={C.cream} stroke={OUT} strokeWidth={SW} />
    {Array.from({length: Math.floor(w / 160)}).map((_, i) => <g key={i} transform={`translate(${-w / 2 + 80 + i * 160},-20)`}><ellipse cx={0} cy={0} rx={56} ry={18} fill={i % 2 ? C.gold : C.indigo} stroke={OUT} strokeWidth={4} /><path d="M -36 -4 Q 0 -44 36 -4 Z" fill={i % 3 ? '#B0643A' : C.cream} stroke={OUT} strokeWidth={3} /></g>)}</g>
);
