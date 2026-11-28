import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, OUT, SW} from './theme';
import {rnd} from './util';
// құдық: каменное кольцо, деревянная перекладина, ведро; камень-надпись
export const Well: React.FC<{x: number; y: number; s?: number; sign?: string}> = ({x, y, s = 1, sign}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <line x1={-110} y1={-30} x2={-100} y2={-230} stroke={C.woodDark} strokeWidth={16} /><line x1={110} y1={-30} x2={100} y2={-230} stroke={C.woodDark} strokeWidth={16} />
    <line x1={-120} y1={-225} x2={120} y2={-225} stroke={C.wood} strokeWidth={14} strokeLinecap="round" /><line x1={0} y1={-225} x2={0} y2={-120} stroke="#B89A6A" strokeWidth={4} />
    <path d="M -22 -125 L 22 -125 L 16 -90 L -16 -90 Z" fill="#7A5230" stroke={OUT} strokeWidth={3} />
    <ellipse cx={0} cy={-40} rx={130} ry={34} fill="#3A3330" stroke={OUT} strokeWidth={SW} />
    <path d="M -130 -40 L -130 10 Q 0 50 130 10 L 130 -40 Q 0 -6 -130 -40 Z" fill="#9A9086" stroke={OUT} strokeWidth={SW} />
    {Array.from({length: 7}).map((_, i) => <path key={i} d={`M ${-120 + i * 40} ${-30 + Math.abs(i - 3) * -2} l 0 44`} stroke="#6E655C" strokeWidth={3} />)}
    {sign && <g transform="translate(220,10)"><path d="M -90 0 Q -100 -90 -60 -110 L 60 -110 Q 100 -90 90 0 Z" fill="#8F877C" stroke={OUT} strokeWidth={SW} /><text x={0} y={-48} textAnchor="middle" fontFamily="Rubik" fontWeight={900} fontSize={30} fill={C.cream} stroke={OUT} strokeWidth={6} paintOrder="stroke">{sign}</text></g>}
  </g>
);
// тал — ива: тёмный ствол, ниспадающие ветви с узкими листьями
export const Tal: React.FC<{x: number; y: number; s?: number; dry?: boolean}> = ({x, y, s = 1, dry}) => {
  const f = useCurrentFrame();
  return <g transform={`translate(${x},${y}) scale(${s})`}>
    <path d="M -30 0 Q -20 -150 -40 -260 L 30 -260 Q 20 -150 34 0 Z" fill="#5E4632" stroke={OUT} strokeWidth={SW} />
    <path d="M -10 -250 Q -120 -320 -200 -260 M 10 -250 Q 130 -330 210 -250 M 0 -255 Q -20 -360 40 -380" stroke="#5E4632" strokeWidth={14} fill="none" strokeLinecap="round" />
    {!dry && Array.from({length: 22}).map((_, i) => { const bx = -200 + i * 19; const by = -270 - Math.sin((i / 21) * Math.PI) * 90; const sw = Math.sin(f * 0.05 + i) * 6;
      return <path key={i} d={`M ${bx} ${by} q ${sw} 60 ${sw * 2} ${110 + (i % 4) * 20}`} stroke={i % 2 ? '#7FA34A' : '#93B35A'} strokeWidth={9} fill="none" strokeLinecap="round" />; })}
  </g>;
};
// көкпек — серо-зелёный кустик солянки
export const Kokpek: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}><path d="M -90 0 Q -110 -60 -60 -85 Q -40 -130 0 -115 Q 40 -135 65 -90 Q 115 -70 92 0 Z" fill="#94A58E" stroke={OUT} strokeWidth={5} />
    {Array.from({length: 14}).map((_, i) => <path key={i} d={`M ${-70 + i * 11} -6 l ${(rnd(i) - 0.5) * 30} ${-40 - rnd(i + 2) * 50}`} stroke="#6E7F68" strokeWidth={4} strokeLinecap="round" />)}
    {Array.from({length: 12}).map((_, i) => <circle key={'d' + i} cx={-70 + rnd(i) * 140} cy={-30 - rnd(i + 3) * 70} r={4} fill="#C9B26A" />)}</g>
);
// туман — дрейфующие полупрозрачные полосы
export const Fog: React.FC<{k?: number}> = ({k = 1}) => {
  const f = useCurrentFrame();
  return <g opacity={k}>{Array.from({length: 9}).map((_, i) => <ellipse key={i} cx={((rnd(i) * 2600 + f * (0.6 + rnd(i + 2))) % 2800) - 400} cy={200 + i * 110} rx={700} ry={90} fill="#EEF1F4" opacity={0.55} />)}<rect x={-700} y={-300} width={3300} height={1700} fill="#E6EBF0" opacity={0.35} /></g>;
};
// сандық — сундук с металлической ковкой
export const Sandyq: React.FC<{x: number; y: number; s?: number; color?: string}> = ({x, y, s = 1, color = '#A0522D'}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}><rect x={-90} y={-110} width={180} height={110} rx={8} fill={color} stroke={OUT} strokeWidth={SW} />
    <path d="M -90 -110 Q 0 -150 90 -110" fill={color} stroke={OUT} strokeWidth={SW} />
    {[-60, 0, 60].map((cx) => <rect key={cx} x={cx - 8} y={-130} width={16} height={130} fill="#C9CED8" stroke={OUT} strokeWidth={2.5} />)}
    <rect x={-14} y={-75} width={28} height={30} rx={4} fill={C.gold} stroke={OUT} strokeWidth={3} /></g>
);
export const Silk: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>{[C.red, C.sky, C.gold, '#7A4E8C'].map((c, i) => <g key={i} transform={`translate(${i * 14},${-i * 34})`}><rect x={-70} y={-34} width={140} height={34} rx={16} fill={c} stroke={OUT} strokeWidth={4} /><ellipse cx={70} cy={-17} rx={9} ry={17} fill={c} stroke={OUT} strokeWidth={3} /></g>)}</g>
);
// алтыбақан — качели: два шеста крест-накрест, верёвочное сиденье
export const Altybakan: React.FC<{x: number; y: number; s?: number; children?: React.ReactNode}> = ({x, y, s = 1, children}) => {
  const f = useCurrentFrame(); const a = Math.sin(f * 0.12) * 22;
  return <g transform={`translate(${x},${y}) scale(${s})`}><line x1={-260} y1={0} x2={60} y2={-460} stroke={C.wood} strokeWidth={16} /><line x1={-60} y1={-460} x2={260} y2={0} stroke={C.wood} strokeWidth={16} />
    <line x1={-120} y1={-430} x2={120} y2={-430} stroke={C.woodDark} strokeWidth={12} />
    <g transform={`rotate(${a},0,-430)`}><line x1={-50} y1={-430} x2={-50} y2={-90} stroke="#B89A6A" strokeWidth={6} /><line x1={50} y1={-430} x2={50} y2={-90} stroke="#B89A6A" strokeWidth={6} /><rect x={-70} y={-95} width={140} height={14} rx={6} fill={C.red} stroke={OUT} strokeWidth={3} />{children}</g></g>;
};
// каркас юрты: кереге (решётка) + уықи; k — степень сборки 0..1
export const YurtFrame: React.FC<{x: number; y: number; s?: number; k?: number; felt?: number; smoke?: boolean}> = ({x, y, s = 1, k = 1, felt = 0, smoke}) => {
  const f = useCurrentFrame(); const nU = Math.round(14 * k);
  return <g transform={`translate(${x},${y}) scale(${s})`}>
    {smoke && [0, 1, 2].map((i) => { const t = ((f + i * 20) % 60) / 60; return <circle key={i} cx={Math.sin(t * 6) * 15} cy={-330 - t * 160} r={18 + t * 30} fill="#E8E2D6" opacity={0.7 * (1 - t)} />; })}
    {felt < 1 && <g>{Array.from({length: 16}).map((_, i) => <g key={i}><line x1={-240 + i * 30} y1={0} x2={-210 + i * 30} y2={-150} stroke={C.wood} strokeWidth={5} /><line x1={-210 + i * 30} y1={0} x2={-240 + i * 30} y2={-150} stroke={C.wood} strokeWidth={5} /></g>)}
      {Array.from({length: nU}).map((_, i) => { const bx = -240 + (i / 13) * 480; return <line key={'u' + i} x1={bx} y1={-150} x2={bx * 0.25} y2={-305} stroke={C.red} strokeWidth={6} />; })}
      {k > 0.95 && <ellipse cx={0} cy={-310} rx={60} ry={14} fill={C.wood} stroke={OUT} strokeWidth={4} />}</g>}
    {felt > 0 && <g opacity={felt}><path d="M -240 0 L -240 -150 Q -230 -290 0 -320 Q 230 -290 240 -150 L 240 0 Z" fill={C.felt} stroke={OUT} strokeWidth={SW} /><rect x={-242} y={-150} width={484} height={26} fill={C.red} stroke={OUT} strokeWidth={4} /><rect x={-55} y={-150} width={110} height={150} fill={C.red} stroke={OUT} strokeWidth={SW} /></g>}
  </g>;
};
// бұлақ — родник: вода в камнях
export const Bulaq: React.FC<{x: number; y: number; s?: number}> = ({x, y, s = 1}) => {
  const f = useCurrentFrame();
  return <g transform={`translate(${x},${y}) scale(${s})`}><ellipse cx={0} cy={0} rx={220} ry={50} fill="#5FB3D6" stroke={OUT} strokeWidth={SW} />
    {[0, 1, 2].map((i) => <ellipse key={i} cx={-60 + i * 60} cy={-4} rx={30 + ((f + i * 10) % 30)} ry={6 + ((f + i * 10) % 30) / 5} fill="none" stroke="#BDEFF7" strokeWidth={3} opacity={1 - ((f + i * 10) % 30) / 30} />)}
    {Array.from({length: 9}).map((_, i) => <ellipse key={'s' + i} cx={-230 + i * 58} cy={40 + (i % 2) * 8} rx={34} ry={20} fill="#9A9086" stroke={OUT} strokeWidth={4} />)}</g>;
};
// летящие камни и «тау қаңбақтай ұшты»
export const FlyingRocks: React.FC<{n?: number; k?: number}> = ({n = 18, k = 1}) => {
  const f = useCurrentFrame();
  return <g>{Array.from({length: n}).map((_, i) => { const sp = 6 + rnd(i) * 10; const x = ((rnd(i + 1) * 2600 - f * sp * 1.5) % 2600 + 2600) % 2600 - 300; const y = ((rnd(i + 5) * 1200 + f * sp) % 1300) - 300; const r = (18 + rnd(i + 9) * 40) * k;
    return <g key={i} transform={`translate(${x},${y}) rotate(${f * (4 + i)})`}><path d={`M ${-r} 0 L ${-r * 0.4} ${-r * 0.9} L ${r * 0.7} ${-r * 0.7} L ${r} ${r * 0.2} L ${r * 0.2} ${r} L ${-r * 0.8} ${r * 0.6} Z`} fill="#8A8178" stroke={OUT} strokeWidth={4} /></g>; })}</g>;
};
// трещина в земле
export const Crack: React.FC<{x: number; y: number; w?: number; k?: number}> = ({x, y, w = 900, k = 1}) => (
  <g transform={`translate(${x},${y})`}><path d={`M ${-w / 2} 0 L ${-w / 4} ${-20 * k} L ${-w / 8} ${30 * k} L 0 ${-40 * k} L ${w / 8} ${20 * k} L ${w / 4} ${-30 * k} L ${w / 2} 0 L ${w / 4} ${70 * k} L ${w / 8} ${120 * k} L 0 ${160 * k} L ${-w / 8} ${110 * k} L ${-w / 4} ${80 * k} Z`} fill="#0E0B12" stroke={OUT} strokeWidth={SW} /></g>
);
// глаза змей во тьме
export const SnakeEyes: React.FC<{n?: number; k?: number}> = ({n = 4, k = 1}) => {
  const f = useCurrentFrame();
  return <g opacity={k}>{Array.from({length: n}).map((_, i) => { const x = 300 + rnd(i * 3) * 1300; const y = 250 + rnd(i * 7) * 500; const bl = (f + i * 37) % 110 < 5 ? 0.1 : 1;
    return <g key={i} transform={`translate(${x},${y})`}>{[-22, 22].map((d) => <g key={d}><ellipse cx={d} cy={0} rx={15} ry={10 * bl} fill="#E7D44A" /><ellipse cx={d} cy={0} rx={3} ry={9 * bl} fill={OUT} /></g>)}</g>; })}</g>;
};
// карточка предмета (рамка + подпись) для «Шалқұйрық / Құба інген / Ақсырмалы сауыт / Егеу»
export const ItemCard: React.FC<{x: number; y: number; w?: number; h?: number; label: string; at?: number; children: React.ReactNode}> = ({x, y, w = 460, h = 380, label, at = 0, children}) => {
  const f = useCurrentFrame() - at; if (f < 0) return null; const sc = Math.min(1, f / 8) * (1 + 0.08 * Math.max(0, 1 - f / 12));
  return <g transform={`translate(${x},${y}) scale(${sc})`}><rect x={-w / 2} y={-h / 2} width={w} height={h} rx={28} fill={C.cream} stroke={OUT} strokeWidth={10} /><rect x={-w / 2 + 12} y={-h / 2 + 12} width={w - 24} height={h - 24} rx={20} fill="none" stroke={C.gold} strokeWidth={5} />
    <g>{children}</g>
    <rect x={-w / 2 + 30} y={h / 2 - 70} width={w - 60} height={54} rx={14} fill={C.indigo} stroke={OUT} strokeWidth={5} />
    <text x={0} y={h / 2 - 32} textAnchor="middle" fontFamily="Rubik" fontWeight={900} fontSize={Math.min(34, ((w - 80) / label.length) * 1.7)} fill={C.cream}>{label}</text></g>;
};
// плашка «сабақ»
export const Lesson: React.FC<{n: number; text: string; at?: number}> = ({n, text, at = 0}) => {
  const f = useCurrentFrame() - at; if (f < 0) return null; const k = Math.min(1, f / 10);
  const fs = Math.min(60, (1250 / Math.max(10, text.length)) * 1.7);
  return <g transform={`translate(960,${930 + (1 - k) * 200})`} opacity={k}><rect x={-820} y={-70} width={1640} height={140} rx={34} fill={C.indigo} stroke={OUT} strokeWidth={10} opacity={0.95} />
    <rect x={-800} y={-52} width={250} height={104} rx={22} fill={C.gold} stroke={OUT} strokeWidth={5} />
    <text x={-675} y={20} textAnchor="middle" fontFamily="Rubik" fontWeight={900} fontSize={42} fill={C.ink}>{n > 0 ? `${n}-САБАҚ` : 'САБАҚ'}</text>
    <text x={130} y={fs * 0.35} textAnchor="middle" fontFamily="Rubik" fontWeight={800} fontSize={fs} fill={C.cream}>{text}</text></g>;
};
