import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, OUT, SW} from './theme';
import {hash, rnd} from './util';
export type HorseProps = {x: number; y: number; scale?: number; facing?: 1 | -1; color?: string; walk?: number; name?: string; neigh?: boolean; head?: number;
  mane?: string; tail?: string; saddle?: boolean; talk?: number; kick?: number; bite?: number; gallop?: number; low?: number; boulder?: boolean; legs?: number; blink?: boolean};
// конь: реалистичные пропорции (длинные ноги, копыта, грива), «живость» от хэша имени
export const Horse: React.FC<HorseProps> = ({x, y, scale = 1, facing = 1, color = '#A0522D', walk = 0, name = 'h', neigh, head = 0, mane = '#3B2416', tail, saddle, talk = 0, kick = 0, bite = 0, gallop = 0, low = 0, boulder, legs = 4}) => {
  const f = useCurrentFrame(); const h = hash(name);
  const sp = gallop ? 0.55 : 0.3; const ph = f * sp * (walk || gallop ? 1 : 0) + h * 10; const A = gallop ? 40 : walk ? 22 : 0;
  const s = Math.sin(ph) * A;
  const legC = color; const hoof = '#2B211C';
  const leg = (lx: number, a: number, k: number, back = false) => { const r = (a * Math.PI) / 180; const L1 = 62, L2 = 58;
    const kx = lx + Math.sin(r) * L1, ky = -112 + Math.cos(r) * L1; const r2 = r + (back ? -0.35 : 0.25) * (A ? Math.abs(Math.sin(ph)) : 0); const fx = kx + Math.sin(r2) * L2, fy = ky + Math.cos(r2) * L2;
    return <g key={k}><path d={`M ${lx} -112 L ${kx} ${ky} L ${fx} ${fy}`} stroke={OUT} strokeWidth={20 + SW} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d={`M ${lx} -112 L ${kx} ${ky} L ${fx} ${fy}`} stroke={legC} strokeWidth={20} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x={fx - 12} y={fy - 4} width={24} height={14} rx={4} fill={hoof} stroke={OUT} strokeWidth={3} /></g>; };
  const bob = walk || gallop ? -Math.abs(Math.cos(ph)) * (gallop ? 12 : 5) : 0;
  const nh = neigh ? -28 + Math.sin(f * 0.8) * 6 : bite ? -10 * bite : head + Math.sin(f * 0.05 + h * 7) * 3;
  const kickR = kick ? -35 * kick : 0; const tailC = tail ?? mane;
  const mouth = Math.max(talk, neigh ? 0.8 : 0, bite);
  const extra = legs > 4 ? Array.from({length: legs - 4}).map((_, i) => -20 + i * 30) : [];
  return (
    <g transform={`translate(${x},${y + bob}) scale(${scale * facing},${scale * (1 - low * 0.35)}) rotate(${kick ? 12 * kick : 0},60,-140)`}>
      <ellipse cx={0} cy={4} rx={130} ry={14} fill="rgba(30,27,58,0.15)" />
      <g transform={`rotate(${kickR},-90,-140)`}>{leg(-80, -s - 8 * kick, 1, true)}</g>{leg(55, s, 2)}
      {extra.map((ex, i) => <g key={'x' + i}>{leg(ex, Math.sin(ph + i) * A, 10 + i)}</g>)}
      {/* хвост */}
      <path d={`M -118 -150 Q -175 ${-120 + Math.sin(f * 0.15 + h) * 8} -165 -45`} stroke={OUT} strokeWidth={30} fill="none" strokeLinecap="round" />
      <path d={`M -118 -150 Q -175 ${-120 + Math.sin(f * 0.15 + h) * 8} -165 -45`} stroke={tailC} strokeWidth={21} fill="none" strokeLinecap="round" />
      {boulder && <g transform="translate(-170,-40)"><ellipse cx={0} cy={0} rx={70} ry={55} fill="#8A8178" stroke={OUT} strokeWidth={SW} /><path d="M -40 -20 q 20 -15 40 0 M -10 20 q 15 10 35 -5" stroke="#6A6058" strokeWidth={5} fill="none" /></g>}
      {/* туловище */}
      <path d="M -125 -150 Q -130 -205 -60 -205 L 70 -210 Q 135 -205 135 -150 Q 130 -95 60 -98 L -60 -98 Q -128 -95 -125 -150 Z" fill={color} stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M -90 -120 Q 0 -105 90 -120" stroke="rgba(0,0,0,0.12)" strokeWidth={14} fill="none" />
      {saddle && <g><path d="M -45 -208 Q 0 -240 45 -208 L 40 -175 L -40 -175 Z" fill={C.red} stroke={OUT} strokeWidth={4} /><path d="M -35 -205 Q 0 -225 35 -205" stroke={C.gold} strokeWidth={5} fill="none" /><rect x={-50} y={-180} width={100} height={36} rx={6} fill={C.indigo} stroke={OUT} strokeWidth={4} />{[0, 1, 2].map((k) => <circle key={k} cx={-30 + k * 30} cy={-162} r={6} fill={C.gold} />)}<line x1={0} y1={-178} x2={-5} y2={-110} stroke="#5B3A22" strokeWidth={4} /><rect x={-16} y={-112} width={22} height={10} rx={3} fill={C.iron} stroke={OUT} strokeWidth={2} /></g>}
      {leg(-55, s - 4 * kick, 3, true)}{leg(85, -s, 4)}
      {/* шея и голова */}
      <g transform={`rotate(${nh},100,-180) translate(${bite * 30},0)`}>
        <path d="M 75 -200 L 128 -292 Q 150 -305 175 -280 L 145 -160 Z" fill={color} stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />
        <path d="M 120 -300 Q 150 -318 185 -300 L 232 -238 Q 240 -215 218 -205 Q 200 -200 185 -215 L 140 -255 Z" fill={color} stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />
        <ellipse cx={222} cy={-224} rx={7} ry={5} fill={OUT} opacity={0.7} />
        {mouth > 0.05 && <path d={`M 205 -207 Q 222 ${-200 + mouth * 14} 236 -214`} fill="#6B1E1E" stroke={OUT} strokeWidth={3} />}
        <path d="M 132 -302 L 126 -335 L 148 -308 Z" fill={color} stroke={OUT} strokeWidth={4} />
        <ellipse cx={168} cy={-268} rx={9} ry={8} fill={C.white} stroke={OUT} strokeWidth={2.5} /><circle cx={170} cy={-268} r={5} fill={OUT} />
        {/* грива */}
        <path d="M 80 -200 Q 92 -260 128 -305 Q 112 -262 110 -230 Q 100 -215 80 -200 Z" fill={mane} stroke={OUT} strokeWidth={3} />
        {[0, 1, 2, 3].map((k) => <path key={k} d={`M ${86 + k * 11} ${-212 - k * 22} l -22 ${8 + Math.sin(f * 0.2 + k) * 3} l 14 -14 z`} fill={mane} />)}
        {saddle && <path d="M 150 -296 L 212 -232 M 180 -280 L 160 -230" stroke="#5B3A22" strokeWidth={5} fill="none" />}
      </g>
    </g>
  );
};
// всадник: человек сидит в седле
export const Rider: React.FC<{horse: HorseProps; rider: React.ReactNode}> = ({horse, rider}) => {
  const f = useCurrentFrame(); const sc = horse.scale ?? 1; const fc = horse.facing ?? 1;
  const ph = f * (horse.gallop ? 0.55 : 0.3) + hash(horse.name ?? 'h') * 10; const bob = horse.walk || horse.gallop ? -Math.abs(Math.cos(ph)) * (horse.gallop ? 12 : 5) : 0;
  return <g><Horse {...horse} /><g transform={`translate(${horse.x + 5 * sc * fc},${horse.y + (-150) * sc + bob}) scale(${sc / 1.25})`}>{rider}</g></g>;
};
// тарғақ (дрофа): бежит на двух ногах, одно крыло
export const Bustard: React.FC<{x: number; y: number; scale?: number; facing?: 1 | -1; run?: boolean; oneWing?: boolean; shock?: boolean; flap?: boolean}> = ({x, y, scale = 1, facing = 1, run, oneWing, shock, flap}) => {
  const f = useCurrentFrame(); const s = run ? Math.sin(f * 0.6) * 30 : 0;
  const lg = (a: number, k: number) => { const r = (a * Math.PI) / 180; return <line key={k} x1={0} y1={-60} x2={Math.sin(r) * 60} y2={-60 + Math.cos(r) * 60} stroke={OUT} strokeWidth={7} strokeLinecap="round" />; };
  const wing = flap || run ? Math.sin(f * 0.9) * 30 : 0;
  return (
    <g transform={`translate(${x},${y - (run ? Math.abs(Math.sin(f * 0.6)) * 8 : 0)}) scale(${scale * facing},${scale})`}>
      {lg(s, 1)}{lg(-s, 2)}
      <ellipse cx={0} cy={-95} rx={60} ry={38} fill="#B98A4E" stroke={OUT} strokeWidth={SW} />
      <path d="M -50 -100 L -85 -120 L -70 -90 Z" fill="#8C6236" stroke={OUT} strokeWidth={4} />
      {!oneWing && <path d="M -10 -110 Q -40 -150 -60 -120" fill="#8C6236" stroke={OUT} strokeWidth={4} transform={`rotate(${wing},-10,-110)`} />}
      <path d="M 0 -105 Q 20 -150 -20 -140 Q 10 -110 0 -105" fill="#E8D6B0" stroke={OUT} strokeWidth={4} transform={`rotate(${-wing},0,-105)`} />
      <path d="M 40 -115 Q 55 -170 60 -185" stroke={OUT} strokeWidth={22} strokeLinecap="round" fill="none" />
      <path d="M 40 -115 Q 55 -170 60 -185" stroke="#D9D4C7" strokeWidth={13} strokeLinecap="round" fill="none" />
      <circle cx={64} cy={-192} r={20} fill="#D9D4C7" stroke={OUT} strokeWidth={SW} />
      <circle cx={70} cy={-196} r={shock ? 8 : 5} fill={C.white} stroke={OUT} strokeWidth={2} /><circle cx={72} cy={-196} r={shock ? 4 : 3} fill={OUT} />
      <path d={shock ? 'M 82 -192 L 104 -200 M 82 -186 L 104 -178' : 'M 82 -190 L 102 -186 L 82 -183 Z'} stroke={OUT} strokeWidth={4} fill={C.gold} />
    </g>
  );
};
// табун: много маленьких лошадей силуэтами
export const Herd: React.FC<{x: number; y: number; n?: number; w?: number; scale?: number; walk?: number; facing?: 1 | -1; spread?: number}> = ({x, y, n = 24, w = 900, scale = 0.35, walk = 0, facing = 1, spread = 1}) => {
  const cols = ['#A0522D', '#6B3E26', '#C68A4B', '#3B2416', '#D9C3A0', '#8C5A3C'];
  return <g>{Array.from({length: n}).map((_, i) => { const r1 = rnd(i * 7.31 + 1.7), r2 = rnd(i * 3.97 + 11.2);
    return <Horse key={i} name={'hd' + i} x={x + (r1 - 0.5) * w * spread} y={y + (r2 - 0.5) * 120 * spread + i % 3 * 10} scale={scale * (0.8 + r2 * 0.4)} facing={r1 > 0.85 ? (-facing as 1 | -1) : facing} color={cols[i % cols.length]} walk={walk} />; }).sort((a, b) => (a.props.y as number) - (b.props.y as number))}</g>;
};
// қой — овца: пушистое облако-тело, тёмная морда
export const Sheep: React.FC<{x: number; y: number; scale?: number; facing?: 1 | -1; walk?: number; name?: string; wool?: string}> = ({x, y, scale = 1, facing = 1, walk = 0, name = 's', wool = '#F4EEE2'}) => {
  const f = useCurrentFrame(); const h = hash(name); const ph = f * 0.35 * walk + h * 10; const s = walk ? Math.sin(ph) * 18 : 0;
  const leg = (lx: number, a: number) => { const r = (a * Math.PI) / 180; return <line key={lx} x1={lx} y1={-40} x2={lx + Math.sin(r) * 40} y2={-40 + Math.cos(r) * 40} stroke={OUT} strokeWidth={10} strokeLinecap="round" />; };
  return <g transform={`translate(${x},${y - (walk ? Math.abs(Math.cos(ph)) * 3 : 0)}) scale(${scale * facing},${scale})`}>
    <ellipse cx={0} cy={2} rx={60} ry={9} fill="rgba(30,27,58,0.15)" />
    {leg(-30, s)}{leg(25, -s)}{leg(-18, -s)}{leg(36, s)}
    <g>{[[-35, -70], [-10, -82], [15, -80], [38, -70], [-20, -58], [20, -58], [0, -66]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={26} fill={wool} stroke={OUT} strokeWidth={5} />)}
      {[[-35, -70], [-10, -82], [15, -80], [38, -70], [-20, -58], [20, -58], [0, -66]].map(([cx, cy], i) => <circle key={'i' + i} cx={cx} cy={cy} r={21} fill={wool} />)}</g>
    <g transform={`rotate(${Math.sin(f * 0.07 + h * 9) * 6},55,-75)`}><ellipse cx={68} cy={-78} rx={20} ry={26} fill="#3B2E2A" stroke={OUT} strokeWidth={4} /><ellipse cx={52} cy={-90} rx={12} ry={6} fill="#3B2E2A" stroke={OUT} strokeWidth={3} /><circle cx={74} cy={-84} r={4} fill={C.white} /></g>
  </g>;
};
// түйе — двугорбый верблюд
export const Camel: React.FC<{x: number; y: number; scale?: number; facing?: 1 | -1; walk?: number; name?: string; color?: string; pack?: boolean; kneel?: number; buida?: number; tied?: boolean}> = ({x, y, scale = 1, facing = 1, walk = 0, name = 'c', color = '#C99A5B', pack, kneel = 0, buida = 0, tied}) => {
  const f = useCurrentFrame(); const h = hash(name); const ph = f * 0.22 * walk + h * 10; const s = walk ? Math.sin(ph) * 18 : 0;
  const leg = (lx: number, a: number) => { const r = (a * Math.PI) / 180; return <g key={lx}><line x1={lx} y1={-150} x2={lx + Math.sin(r) * 150} y2={-150 + Math.cos(r) * 150} stroke={OUT} strokeWidth={22} strokeLinecap="round" /><line x1={lx} y1={-150} x2={lx + Math.sin(r) * 150} y2={-150 + Math.cos(r) * 150} stroke={color} strokeWidth={14} strokeLinecap="round" /></g>; };
  const kn = kneel * 110;
  return <g transform={`translate(${x},${y - (walk ? Math.abs(Math.cos(ph)) * 5 : 0)}) scale(${scale * facing},${scale})`}>
    <ellipse cx={0} cy={4} rx={130} ry={14} fill="rgba(30,27,58,0.15)" />
    <g transform={`translate(0,${kn})`}>
    {kneel < 0.5 && leg(-70, -s)}{kneel < 0.5 && leg(60, s)}
    <path d="M -120 -150 Q -130 -200 -90 -210 Q -70 -290 -30 -220 Q 0 -200 20 -220 Q 60 -290 80 -210 Q 120 -200 110 -150 Q 0 -120 -120 -150 Z" fill={color} stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />
    {pack && <rect x={-40} y={-230} width={70} height={50} rx={8} fill={C.red} stroke={OUT} strokeWidth={4} />}
    {kneel < 0.5 ? <>{leg(-50, s)}{leg(80, -s)}</> : <>{[-70, 70].map((lx) => <g key={lx}><path d={`M ${lx - 45} -122 L ${lx + 45} -122`} stroke={OUT} strokeWidth={28} strokeLinecap="round" /><path d={`M ${lx - 45} -122 L ${lx + 45} -122`} stroke={color} strokeWidth={20} strokeLinecap="round" /></g>)}{tied && <g><path d="M -80 -134 q 20 -14 40 0 q -20 14 -40 0" fill="none" stroke="#B89A6A" strokeWidth={6} /><path d="M 60 -134 q 20 -14 40 0 q -20 14 -40 0" fill="none" stroke="#B89A6A" strokeWidth={6} /></g>}</>}
    <g transform={`rotate(${Math.sin(f * 0.05 + h * 5) * 4},110,-170)`}><path d="M 100 -175 Q 160 -170 165 -250 Q 170 -300 210 -300 L 225 -270 Q 195 -265 190 -230 Q 185 -160 115 -150 Z" fill={color} stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />
      <circle cx={204} cy={-288} r={5} fill={OUT} /><path d="M 196 -304 l -6 -14 l 14 8 z" fill={color} stroke={OUT} strokeWidth={3} />
      {buida > 0 && <g><line x1={222} y1={-268} x2={230} y2={-262} stroke="#6E4222" strokeWidth={5} /><path d={`M 228 -264 Q ${228 + buida * 0.5} ${-150} ${228 + buida} ${-kn + 0}`} stroke="#B89A6A" strokeWidth={6} fill="none" /></g>}</g>
    </g>
  </g>;
};
// загон-қора из жердей
export const Pen: React.FC<{x: number; y: number; w?: number}> = ({x, y, w = 600}) => (
  <g transform={`translate(${x},${y})`}>{Array.from({length: Math.floor(w / 80) + 1}).map((_, i) => <rect key={i} x={-w / 2 + i * 80 - 7} y={-90} width={14} height={95} fill={C.wood} stroke={OUT} strokeWidth={4} />)}
    <rect x={-w / 2} y={-75} width={w} height={12} fill={C.wood} stroke={OUT} strokeWidth={4} /><rect x={-w / 2} y={-35} width={w} height={12} fill={C.wood} stroke={OUT} strokeWidth={4} /></g>
);
export const Flock: React.FC<{x: number; y: number; n?: number; w?: number; h?: number; scale?: number; walk?: number; facing?: 1 | -1}> = ({x, y, n = 14, w = 500, h = 80, scale = 0.6, walk = 0, facing = 1}) => (
  <g>{Array.from({length: n}).map((_, i) => ({i, px: x + (rnd(i * 5.1 + 3) - 0.5) * w, py: y + (rnd(i * 2.3 + 7) - 0.5) * h})).sort((a, b) => a.py - b.py).map(({i, px, py}) =>
    <Sheep key={i} name={'sh' + i} x={px} y={py} scale={scale * (0.85 + rnd(i) * 0.3)} walk={walk} facing={facing} wool={i % 5 === 0 ? '#D9CBB5' : '#F4EEE2'} />)}</g>
);
export const Caravan: React.FC<{x: number; y: number; n?: number; gap?: number; scale?: number; walk?: number; facing?: 1 | -1}> = ({x, y, n = 5, gap = 230, scale = 0.5, walk = 1, facing = 1}) => (
  <g>{Array.from({length: n}).map((_, i) => <Camel key={i} name={'cm' + i} x={x - i * gap * facing} y={y} scale={scale} walk={walk} facing={facing} pack={i % 2 === 0} color={i % 3 === 1 ? '#B5844A' : '#C99A5B'} />)}</g>
);

// киік (сайгак): светло-бежевый, горбатый нос
export const Saiga: React.FC<{x: number; y: number; scale?: number; facing?: 1 | -1; run?: boolean; name?: string}> = ({x, y, scale = 1, facing = 1, run, name = 'sg'}) => {
  const f = useCurrentFrame(); const h = hash(name); const s = run ? Math.sin(f * 0.6 + h * 9) * 30 : 0;
  const leg = (lx: number, a: number) => { const r = (a * Math.PI) / 180; return <line key={lx} x1={lx} y1={-60} x2={lx + Math.sin(r) * 62} y2={-60 + Math.cos(r) * 62} stroke={OUT} strokeWidth={9} strokeLinecap="round" />; };
  return <g transform={`translate(${x},${y - (run ? Math.abs(Math.sin(f * 0.6 + h * 9)) * 14 : 0)}) scale(${scale * facing},${scale})`}>
    {leg(-40, -s)}{leg(35, s)}<ellipse cx={0} cy={-85} rx={62} ry={30} fill="#E3C99A" stroke={OUT} strokeWidth={SW} />{leg(-28, s)}{leg(46, -s)}
    <path d="M 45 -100 Q 70 -140 92 -132 Q 112 -128 110 -108 Q 100 -96 80 -100 Z" fill="#E3C99A" stroke={OUT} strokeWidth={SW} />
    <ellipse cx={108} cy={-112} rx={12} ry={14} fill="#D2B482" stroke={OUT} strokeWidth={3} /><circle cx={88} cy={-122} r={4} fill={OUT} />
    <path d="M 78 -134 l -6 -34 M 86 -134 l 2 -32" stroke="#E9DFC6" strokeWidth={6} strokeLinecap="round" /></g>;
};
