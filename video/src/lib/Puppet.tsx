import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, OUT, SW} from './theme';
import {hash} from './util';
import {useMouth} from './ctx';

export type Age = 'baby' | 'child' | 'youth' | 'adult' | 'old';
export type Pose = 'stand' | 'walk' | 'run' | 'shoot' | 'armsUp' | 'point' | 'hug' | 'sit' | 'lie' | 'cry' | 'punch' | 'shrug' | 'handsHips' | 'wave' | 'hold' | 'fall' | 'jump' | 'think' | 'cane';
export type Expr = 'neutral' | 'happy' | 'angry' | 'sad' | 'shock' | 'sleepy' | 'smug' | 'determined' | 'tired';
export type Hat = 'none' | 'kalpak' | 'borik' | 'kimeshek' | 'scarf' | 'takiya' | 'hair';
export type Look = {
  skin?: string; coat: string; coat2?: string; belt?: string; pants?: string; boots?: string;
  hat: Hat; hatColor?: string; hatColor2?: string; beard?: 'none' | 'white' | 'black' | 'mustache' | 'grey'; nose?: 'small' | 'hook';
  hunch?: number; wide?: number; tall?: number;
};
export type PersonProps = {
  name: string; look: Look; age: Age; x: number; y: number; scale?: number; facing?: 1 | -1;
  pose?: Pose; expr?: Expr; talk?: boolean; speed?: number; look_?: number; lookY?: number; rot?: number; tears?: boolean; sweat?: boolean; ironBoots?: number; stick?: number; bow?: boolean; bowBack?: boolean;
};

const DIM: Record<Age, {head: number; body: number; bw: number; leg: number; arm: number; neck: number; limb: number}> = {
  baby:  {head: 52, body: 46, bw: 70, leg: 28, arm: 34, neck: 0, limb: 22},
  child: {head: 58, body: 82, bw: 84, leg: 62, arm: 66, neck: 0, limb: 24},
  youth: {head: 54, body: 128, bw: 104, leg: 112, arm: 108, neck: 8, limb: 26},
  adult: {head: 54, body: 142, bw: 118, leg: 118, arm: 116, neck: 10, limb: 28},
  old:   {head: 54, body: 134, bw: 116, leg: 108, arm: 110, neck: 8, limb: 27},
};

const Cap: React.FC<{x1: number; y1: number; x2: number; y2: number; w: number; color: string}> = ({x1, y1, x2, y2, w, color}) => (
  <g>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={OUT} strokeWidth={w + SW * 2} strokeLinecap="round" />
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={w} strokeLinecap="round" />
  </g>
);
const end = (x: number, y: number, a: number, L: number) => [x + Math.sin((a * Math.PI) / 180) * L, y + Math.cos((a * Math.PI) / 180) * L];

function poseAngles(pose: Pose, t: number, h: number, speed: number) {
  // углы: 0 = вниз, + = вперёд (по направлению взгляда)
  const idle = Math.sin(t * 0.06 + h * 10) * 4;
  let lf = 3, lb = -3, af = 8 + idle, ab = -8 - idle, tilt = 0, bob = 0, ly = 0, ef = 0, eb = 0;
  if (pose === 'walk' || pose === 'run') {
    const run = pose === 'run'; const ph = t * (run ? 0.42 : 0.24) * speed + h * 6;
    const A = run ? 42 : 24; const s = Math.sin(ph);
    lf = s * A; lb = -s * A; af = -s * (run ? 55 : 22); ab = s * (run ? 55 : 22);
    if (run) { ef = 60; eb = 60; }
    tilt = run ? 12 : 3; bob = -(1 - Math.cos(ph * 2)) * (run ? 7 : 4);
  } else if (pose === 'shoot') { af = 90; ab = 95; eb = -70; tilt = -3; }
  else if (pose === 'armsUp') { af = 145 + Math.sin(t * 0.3) * 10; ab = -145 - Math.sin(t * 0.3 + 1) * 10; }
  else if (pose === 'wave') { af = 150 + Math.sin(t * 0.4) * 20; }
  else if (pose === 'point') { af = 95; }
  else if (pose === 'hug') { af = 75; ab = 70; ef = 50; eb = 50; }
  else if (pose === 'hold') { af = 60; ab = 55; ef = 40; eb = 40; }
  else if (pose === 'cry') { af = 40; ab = -40; ef = 120; eb = -120; tilt = 6; bob = Math.sin(t * 0.5) * 2; }
  else if (pose === 'punch') { af = 92; ab = -20; tilt = 8; }
  else if (pose === 'shrug') { af = 40; ab = -40; ef = 80; eb = -80; }
  else if (pose === 'handsHips') { af = 35; ab = -35; ef = -110; eb = 110; }
  else if (pose === 'think') { af = 35; ef = 115; ab = -5; }
  else if (pose === 'cane') { af = 30; tilt = 10; }
  else if (pose === 'fall') { af = 150; ab = -150; lf = 40; lb = -30; tilt = -20; }
  else if (pose === 'jump') { af = 150; ab = -150; lf = 30; lb = -30; bob = -Math.abs(Math.sin(t * 0.25)) * 60; }
  else if (pose === 'sit') { lf = 80; lb = 85; af = 30; ab = 25; ly = 0; }
  return {lf, lb, af, ab, tilt, bob, ly, ef, eb};
}

export const Person: React.FC<PersonProps> = (p) => {
  const frame = useCurrentFrame();
  const mouth = useMouth();
  const h = hash(p.name); // «жизнь» персонажа — от хэша имени, НЕ от x (урок: дрожание при ходьбе)
  const d = DIM[p.age]; const L = p.look;
  const sc = (p.scale ?? 1) * (L.tall ?? 1);
  const pose = p.pose ?? 'stand';
  const a = poseAngles(pose, frame, h, p.speed ?? 1);
  const skin = L.skin ?? (p.age === 'old' ? C.skinOld : C.skin);
  const bw = d.bw * (L.wide ?? 1);
  const sitDrop = pose === 'sit' ? d.leg * 0.85 : 0;
  const hipY = -d.leg + sitDrop; const shY = hipY - d.body + 16; const headY = shY - d.neck - d.head + 8;
  const tilt = a.tilt + (L.hunch ?? 0);
  // моргание: период по хэшу имени
  const per = 90 + Math.floor(h * 70); const ph = (frame + Math.floor(h * 300)) % per;
  const blink = ph < 4 || p.expr === 'sleepy';
  const talkOpen = p.talk ? Math.min(1, mouth * 1.6) : 0;
  const ex = p.expr ?? 'neutral';
  const lookX = (p.look_ ?? 0) * 6; const lookY = (p.lookY ?? 0) * 5;
  const limbC = L.coat; const legC = L.pants ?? '#5B3A29';
  const legLen = p.age === 'baby' ? d.leg : d.leg;
  const footY = (ang: number) => end(0, hipY, ang, legLen);
  const [lfx, lfy] = footY(a.lf); const [lbx, lby] = footY(a.lb);
  const shX = bw * 0.36;
  const arm = (ang: number, el: number, sx: number) => {
    const [ex1, ey1] = end(sx, shY + 8, ang, d.arm * 0.55); const [ex2, ey2] = end(ex1, ey1, ang + el, d.arm * 0.5);
    return {ex1, ey1, ex2, ey2};
  };
  const AF = arm(a.af, a.ef, shX * 0.8); const AB = arm(a.ab, a.eb, -shX * 0.8);
  const bootC = p.ironBoots !== undefined ? C.iron : (L.boots ?? '#3B2416');
  const eyeR = p.age === 'baby' || p.age === 'child' ? 11 : 9;
  const brow = {neutral: 0, happy: -4, angry: 14, sad: -14, shock: -10, sleepy: 0, smug: 6, determined: 10, tired: -8}[ex];
  const rot = p.rot ?? 0;
  return (
    <g transform={`translate(${p.x},${p.y + a.bob}) scale(${sc * (p.facing ?? 1)},${sc}) rotate(${rot})`}>
      {/* тень */}
      <ellipse cx={0} cy={4} rx={bw * 0.6} ry={12} fill="rgba(30,27,58,0.18)" />
      <g transform={`rotate(${tilt * 0.3},0,${hipY})`}>
        {/* задняя рука */}
        <Cap x1={-shX * 0.8} y1={shY + 8} x2={AB.ex1} y2={AB.ey1} w={d.limb} color={limbC} />
        <Cap x1={AB.ex1} y1={AB.ey1} x2={AB.ex2} y2={AB.ey2} w={d.limb} color={limbC} />
        <circle cx={AB.ex2} cy={AB.ey2} r={d.limb * 0.55} fill={skin} stroke={OUT} strokeWidth={SW} />
        {p.bowBack && <g transform={`translate(${-bw * 0.42},${shY + 50}) rotate(-22)`}><path d="M 0 -150 Q 70 0 0 150" fill="none" stroke={OUT} strokeWidth={18} strokeLinecap="round" /><path d="M 0 -150 Q 70 0 0 150" fill="none" stroke={C.wood} strokeWidth={10} strokeLinecap="round" /><line x1={0} y1={-150} x2={0} y2={150} stroke={C.cream} strokeWidth={4} /></g>}
        {/* ноги */}
        <Cap x1={-10} y1={hipY} x2={-10 + lbx} y2={lby} w={d.limb + 2} color={legC} />
        <Cap x1={10} y1={hipY} x2={10 + lfx} y2={lfy} w={d.limb + 2} color={legC} />
        <Boot x={-10 + lbx} y={lby} c={bootC} s={p.ironBoots ?? 1} />
        <Boot x={10 + lfx} y={lfy} c={bootC} s={p.ironBoots ?? 1} />
        {/* тело-шапан */}
        <g transform={`rotate(${tilt},0,${hipY})`}>
          <path d={`M ${-bw * 0.36} ${shY} Q 0 ${shY - 14} ${bw * 0.36} ${shY} L ${bw * 0.5} ${hipY + 18} Q 0 ${hipY + 30} ${-bw * 0.5} ${hipY + 18} Z`} fill={L.coat} stroke={OUT} strokeWidth={SW} strokeLinejoin="round" />
          {/* борт шапана с узором */}
          <path d={`M ${bw * 0.06} ${shY - 4} L ${bw * 0.12} ${hipY + 24}`} stroke={L.coat2 ?? C.gold} strokeWidth={8} />
          <rect x={-bw * 0.46} y={hipY - 14} width={bw * 0.92} height={14} rx={5} fill={L.belt ?? C.gold} stroke={OUT} strokeWidth={4} />
          {p.bowBack && <line x1={-bw * 0.34} y1={shY + 6} x2={bw * 0.3} y2={hipY - 16} stroke={'#6E4222'} strokeWidth={9} strokeLinecap="round" />}
          {/* голова */}
          <g transform={`translate(0,${headY}) rotate(${Math.sin(frame * 0.045 + h * 20) * 3 + (ex === 'sad' ? 6 : 0)})`}>
            <Head d={d} L={L} skin={skin} blink={blink} eyeR={eyeR} brow={brow} ex={ex} talk={talkOpen} lookX={lookX} lookY={lookY} age={p.age} />
            {p.tears && <Tears f={frame} />}
            {p.sweat && <path d="M 58 -30 q 8 14 0 20 q -8 -6 0 -20 z" fill={C.skyLight} stroke={OUT} strokeWidth={3} transform={`translate(0,${(frame % 30) * 0.8})`} />}
          </g>
        </g>
        {/* передняя рука */}
        <Cap x1={shX * 0.8} y1={shY + 8} x2={AF.ex1} y2={AF.ey1} w={d.limb} color={limbC} />
        <Cap x1={AF.ex1} y1={AF.ey1} x2={AF.ex2} y2={AF.ey2} w={d.limb} color={limbC} />
        {p.bow && <Bow x={AF.ex2} y={AF.ey2} />}
        {p.stick !== undefined && <g><line x1={AF.ex2} y1={AF.ey2 - 70 * p.stick} x2={AF.ex2 + 12} y2={AF.ey2 + (d.leg + 40) * p.stick} stroke={OUT} strokeWidth={18} strokeLinecap="round" /><line x1={AF.ex2} y1={AF.ey2 - 70 * p.stick} x2={AF.ex2 + 12} y2={AF.ey2 + (d.leg + 40) * p.stick} stroke={p.age === 'old' ? C.wood : C.iron} strokeWidth={10} strokeLinecap="round" />{p.age !== 'old' && <line x1={AF.ex2 - 2} y1={AF.ey2 - 60 * p.stick} x2={AF.ex2 + 8} y2={AF.ey2 + d.leg * p.stick} stroke="#C5CCD8" strokeWidth={3} strokeLinecap="round" />}</g>}
        <circle cx={AF.ex2} cy={AF.ey2} r={d.limb * 0.55} fill={skin} stroke={OUT} strokeWidth={SW} />
      </g>
    </g>
  );
};

const Boot: React.FC<{x: number; y: number; c: string; s: number}> = ({x, y, c, s}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}><path d="M -14 -14 L 8 -14 Q 28 -10 28 4 L -14 4 Z" fill={c} stroke={OUT} strokeWidth={SW} strokeLinejoin="round" /></g>
);
export const Bow: React.FC<{x: number; y: number}> = ({x, y}) => (
  <g transform={`translate(${x},${y})`}>
    <path d="M 0 -70 Q 40 0 0 70" fill="none" stroke={OUT} strokeWidth={14} strokeLinecap="round" />
    <path d="M 0 -70 Q 40 0 0 70" fill="none" stroke={C.wood} strokeWidth={8} strokeLinecap="round" />
    <line x1={0} y1={-70} x2={0} y2={70} stroke={C.cream} strokeWidth={2} />
  </g>
);
const Tears: React.FC<{f: number}> = ({f}) => (
  <g>{[0, 1].map((i) => { const t = ((f + i * 15) % 30) / 30; return <path key={i} d="M 0 0 q 7 12 0 16 q -7 -4 0 -16 z" fill={C.sky} stroke={OUT} strokeWidth={2.5} transform={`translate(${i ? 26 : -26},${4 + t * 40}) scale(${1 - t * 0.3})`} opacity={1 - t} />; })}</g>
);

const Head: React.FC<{d: typeof DIM['adult']; L: Look; skin: string; blink: boolean; eyeR: number; brow: number; ex: Expr; talk: number; lookX: number; lookY: number; age: Age}> = ({d, L, skin, blink, eyeR, brow, ex, talk, lookX, lookY, age}) => {
  const r = d.head; const ey = -4; const exs = r * 0.36;
  const hatC = L.hatColor ?? C.white; const hat2 = L.hatColor2 ?? OUT;
  const mouthY = r * 0.48;
  let mouth: React.ReactNode;
  if (talk > 0.05) mouth = <ellipse cx={4} cy={mouthY} rx={10 + talk * 4} ry={3 + talk * 12} fill="#6B1E1E" stroke={OUT} strokeWidth={4} />;
  else if (ex === 'shock') mouth = <ellipse cx={4} cy={mouthY + 2} rx={9} ry={12} fill="#6B1E1E" stroke={OUT} strokeWidth={4} />;
  else if (ex === 'happy' || ex === 'smug') mouth = <path d={`M -10 ${mouthY - 4} Q 4 ${mouthY + 12} 18 ${mouthY - 4}`} fill={ex === 'happy' ? '#6B1E1E' : 'none'} stroke={OUT} strokeWidth={4} strokeLinecap="round" />;
  else if (ex === 'sad' || ex === 'angry' || ex === 'tired') mouth = <path d={`M -8 ${mouthY + 6} Q 4 ${mouthY - 4} 16 ${mouthY + 6}`} fill="none" stroke={OUT} strokeWidth={4} strokeLinecap="round" />;
  else mouth = <path d={`M -6 ${mouthY} L 14 ${mouthY}`} stroke={OUT} strokeWidth={4} strokeLinecap="round" />;
  const eye = (cx: number, side: number) => (
    <g key={cx}>
      {blink ? <path d={`M ${cx - eyeR} ${ey} Q ${cx} ${ey + 6} ${cx + eyeR} ${ey}`} stroke={OUT} strokeWidth={4} fill="none" strokeLinecap="round" />
        : <g><ellipse cx={cx} cy={ey} rx={eyeR} ry={eyeR * (ex === 'shock' ? 1.35 : 1.15)} fill={C.white} stroke={OUT} strokeWidth={3.5} />
            <circle cx={cx + 2 + lookX} cy={ey + 1 + lookY} r={eyeR * 0.55} fill={OUT} /><circle cx={cx + lookX} cy={ey - 2 + lookY} r={eyeR * 0.2} fill={C.white} /></g>}
      <path d={`M ${cx - eyeR - 2} ${ey - eyeR - 8 + side * brow * 0.5} L ${cx + eyeR + 2} ${ey - eyeR - 8 - side * brow * 0.5}`} stroke={L.beard === 'white' || age === 'old' ? '#E6E6E6' : OUT} strokeWidth={age === 'old' ? 7 : 5} strokeLinecap="round" />
    </g>
  );
  return (
    <g>
      {L.hat === 'kimeshek' && <path d={`M ${-r * 1.15} ${r * 0.2} Q ${-r * 1.2} ${-r * 1.3} 0 ${-r * 1.35} Q ${r * 1.2} ${-r * 1.3} ${r * 1.15} ${r * 0.2} L ${r * 1.0} ${r * 1.5} L ${-r * 1.0} ${r * 1.5} Z`} fill={hatC} stroke={OUT} strokeWidth={SW} />}
      {L.hat === 'scarf' && <path d={`M ${-r * 1.15} ${r * 0.4} Q ${-r * 1.25} ${-r * 1.3} 0 ${-r * 1.3} Q ${r * 1.25} ${-r * 1.3} ${r * 1.15} ${r * 0.4} L ${r * 0.9} ${r * 1.2} L ${-r * 1.3} ${r * 1.3} Z`} fill={hatC} stroke={OUT} strokeWidth={SW} />}
      {L.hat === 'hair' && <path d={`M ${-r} ${-r * 0.2} Q ${-r * 1.1} ${-r * 1.2} 0 ${-r * 1.15} Q ${r * 1.1} ${-r * 1.2} ${r} ${-r * 0.2} Z`} fill={OUT} />}
      <circle cx={0} cy={0} r={r} fill={skin} stroke={OUT} strokeWidth={SW} />
      {L.hat === 'kimeshek' && <path d={`M ${-r * 0.95} ${-r * 0.35} Q 0 ${-r * 0.75} ${r * 0.95} ${-r * 0.35}`} fill="none" stroke={OUT} strokeWidth={4} />}
      {L.hat === 'scarf' && <path d={`M ${-r * 1.0} ${-r * 0.2} Q 0 ${-r * 0.8} ${r * 1.0} ${-r * 0.2} L ${r * 1.05} ${-r * 0.9} Q 0 ${-r * 1.35} ${-r * 1.05} ${-r * 0.9} Z`} fill={hatC} stroke={OUT} strokeWidth={4} />}
      {(L.beard === 'white' || L.beard === 'black' || L.beard === 'grey') && <path d={`M ${-r * 0.7} ${r * 0.3} Q ${-r * 0.6} ${r * (age === 'old' ? 1.6 : 1.2)} ${r * 0.1} ${r * (age === 'old' ? 1.8 : 1.3)} Q ${r * 0.8} ${r * 1.4} ${r * 0.8} ${r * 0.3} Q 0 ${r * 0.75} ${-r * 0.7} ${r * 0.3} Z`} fill={L.beard === 'white' ? '#F4F4F4' : L.beard === 'grey' ? '#B9B9B9' : '#2A2220'} stroke={OUT} strokeWidth={4} />}
      {eye(-exs + 6, -1)}{eye(exs + 6, 1)}
      {/* нос */}
      {L.nose === 'hook' ? <path d={`M ${r * 0.2} ${r * 0.0} Q ${r * 0.75} ${r * 0.2} ${r * 0.3} ${r * 0.38}`} fill={skin} stroke={OUT} strokeWidth={4} /> : <path d={`M 8 ${r * 0.1} Q 16 ${r * 0.28} 6 ${r * 0.3}`} fill="none" stroke={OUT} strokeWidth={3.5} strokeLinecap="round" />}
      <circle cx={-exs - 4} cy={r * 0.32} r={8} fill={C.blush} opacity={0.6} /><circle cx={exs + 16} cy={r * 0.32} r={8} fill={C.blush} opacity={0.6} />
      {(L.beard === 'mustache' || L.beard === 'white' || L.beard === 'black' || L.beard === 'grey') && <path d={`M -12 ${mouthY - 8} Q 4 ${mouthY - 16} 20 ${mouthY - 8}`} stroke={L.beard === 'white' ? '#F4F4F4' : L.beard === 'grey' ? '#B9B9B9' : '#2A2220'} strokeWidth={8} strokeLinecap="round" fill="none" />}
      {mouth}
      {L.hat === 'kalpak' && <g><path d={`M ${-r * 1.05} ${-r * 0.55} Q ${-r * 0.5} ${-r * 2.2} ${r * 0.15} ${-r * 2.05} Q ${r * 0.8} ${-r * 1.6} ${r * 1.05} ${-r * 0.55} Z`} fill={hatC} stroke={OUT} strokeWidth={SW} />
        <path d={`M ${-r * 1.15} ${-r * 0.5} Q 0 ${-r * 0.85} ${r * 1.15} ${-r * 0.5} L ${r * 1.05} ${-r * 0.8} Q 0 ${-r * 1.05} ${-r * 1.05} ${-r * 0.8} Z`} fill={hat2} stroke={OUT} strokeWidth={4} /></g>}
      {L.hat === 'borik' && <g><path d={`M ${-r * 0.9} ${-r * 0.6} Q ${-r * 0.8} ${-r * 1.6} 0 ${-r * 1.6} Q ${r * 0.8} ${-r * 1.6} ${r * 0.9} ${-r * 0.6} Z`} fill={hat2} stroke={OUT} strokeWidth={SW} />
        <rect x={-r * 1.12} y={-r * 0.85} width={r * 2.24} height={r * 0.42} rx={r * 0.2} fill={hatC} stroke={OUT} strokeWidth={SW} /></g>}
      {L.hat === 'takiya' && <path d={`M ${-r * 0.85} ${-r * 0.5} Q 0 ${-r * 1.5} ${r * 0.85} ${-r * 0.5} Z`} fill={hatC} stroke={OUT} strokeWidth={SW} />}
    </g>
  );
};
