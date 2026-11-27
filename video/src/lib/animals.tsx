import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, OUT, SW} from './theme';
import {hash, rnd} from './util';
export const Horse: React.FC<{x: number; y: number; scale?: number; facing?: 1 | -1; color?: string; walk?: number; name?: string; neigh?: boolean; head?: number}> = ({x, y, scale = 1, facing = 1, color = '#A0522D', walk = 0, name = 'h', neigh, head = 0}) => {
  const f = useCurrentFrame(); const h = hash(name);
  const ph = f * 0.3 * walk + h * 10; const s = Math.sin(ph) * (walk ? 22 : 0);
  const leg = (lx: number, a: number) => { const r = (a * Math.PI) / 180; return <g key={lx}><line x1={lx} y1={-110} x2={lx + Math.sin(r) * 95} y2={-110 + Math.cos(r) * 95} stroke={OUT} strokeWidth={22 + SW} strokeLinecap="round" /><line x1={lx} y1={-110} x2={lx + Math.sin(r) * 95} y2={-110 + Math.cos(r) * 95} stroke={color} strokeWidth={22} strokeLinecap="round" /></g>; };
  const bob = walk ? -Math.abs(Math.cos(ph)) * 5 : 0;
  const nh = neigh ? -25 + Math.sin(f * 0.8) * 6 : head + Math.sin(f * 0.05 + h * 7) * 3;
  return (
    <g transform={`translate(${x},${y + bob}) scale(${scale * facing},${scale})`}>
      <ellipse cx={0} cy={4} rx={120} ry={14} fill="rgba(30,27,58,0.15)" />
      {leg(-70, -s)}{leg(60, s)}
      <path d="M -110 -150 Q -170 -120 -160 -60" stroke={OUT} strokeWidth={26} fill="none" strokeLinecap="round" />
      <path d="M -110 -150 Q -170 -120 -160 -60" stroke={'#3B2416'} strokeWidth={16} fill="none" strokeLinecap="round" />
      <ellipse cx={0} cy={-145} rx={125} ry={58} fill={color} stroke={OUT} strokeWidth={SW} />
      {leg(-50, s)}{leg(80, -s)}
      <g transform={`rotate(${nh},95,-170)`}>
        <path d="M 80 -170 L 130 -265 L 175 -250 L 135 -150 Z" fill={color} stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />
        <path d="M 120 -280 Q 190 -290 215 -240 Q 220 -215 190 -212 Q 160 -230 140 -225 Z" fill={color} stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />
        <path d="M 128 -270 L 120 -300 L 142 -278 Z" fill={color} stroke={OUT} strokeWidth={4} />
        <circle cx={168} cy={-262} r={6} fill={OUT} />
        <path d="M 85 -165 Q 100 -240 128 -275" stroke={'#3B2416'} strokeWidth={14} fill="none" strokeLinecap="round" />
        {neigh && <ellipse cx={208} cy={-222} rx={6} ry={10} fill="#6B1E1E" />}
      </g>
    </g>
  );
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
