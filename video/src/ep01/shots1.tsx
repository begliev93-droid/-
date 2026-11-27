import React from 'react';
import {useCurrentFrame} from 'remotion';
import {ShotDef} from '../lib/Episode';
import {useShot} from '../lib/ctx';
import {Camera} from '../lib/Camera';
import {Steppe, Yurt, Aul, YurtInside, Kazan, Tostik_meat, Loom, Ketpen, Arrow} from '../lib/scenery';
import {Tostik, Ernazar, Ana, Ormekshi, Brother, Kid, Guest} from '../lib/cast';
import {Horse, Bustard, Herd, Flock, Caravan, Pen} from '../lib/animals';
import {Snow, SpeedLines, DizzyStars, Sparkle, Burst, Vignette, Rays, Hearts} from '../lib/fx';
import {Big} from '../lib/Cards';
import {tr} from '../lib/i18n';
import {lerp, lerpN} from '../lib/util';
import {C} from '../lib/theme';
import {sentences} from './sentences';
const AFTER = (id: string, pad = 0.15) => { const x = sentences.find((q) => q.id === id)!; return x.end - x.start + pad; };
import {Sack, Besik, Silhouettes, Frame, Asyq} from './parts';
const F = () => useCurrentFrame();
const D = () => useShot().dur;

// стрела летит в стопку кетпенов
const ArrowShot: React.FC<{who?: 'youth' | 'child'}> = ({who = 'youth'}) => {
  const f = F(); const hit = 18; const ax = lerp(f, 0, hit, 520, 1150, (t) => t); const ax2 = lerp(f, hit, hit + 14, 1150, 1560, (t) => t);
  return <Camera z={[1.05, 1.12]} focus={[1000, 700]} shake={[hit]}>
    <Steppe sky="day" />
    <Tostik age={who} x={380} y={900} scale={1.2} pose="shoot" bow expr="determined" />
    <Ketpen x={1100} y={860} hole={f >= hit} />
    <Arrow x={f < hit ? ax : ax2} y={700} />
    {f < hit && <SpeedLines y={700} h={80} />}
    <Burst x={1180} y={700} at={hit} />
  </Camera>;
};
export const shots1: ShotDef[] = [
  // ── 0. Суық ашылу
  {s: '001', r: () => <Camera z={[1, 1.08]} focus={[960, 600]}><Steppe sky="day" /><Aul n={4} /><Tostik x={960} y={940} scale={1.35} pose="shoot" bow expr="determined" /><Sparkle x={1150} y={560} at={10} /></Camera>},
  {s: '002', r: () => <ArrowShot />},
  {s: '002', t: 2.6, r: () => { const f = F(); const g = lerp(f, 0, 20, 0, 1); return <Camera z={[1, 1.04]} shake={[22]}><Steppe sky="day" /><Guest n={1} x={lerp(f, 0, 22, 1150, 1300)} y={lerp(f, 0, 22, 900, 500)} rot={lerp(f, 0, 22, 0, 200)} scale={1.1} pose="fall" expr="shock" /><Tostik age="child" x={760} y={930} scale={1.5} pose={g < 1 ? 'armsUp' : 'handsHips'} expr="smug" /><Burst x={1300} y={880} at={22} color={C.ochreLight} /></Camera>; }},
  {s: '003', r: () => <Camera z={[1, 1.07]} focus={[1100, 650]}><Steppe sky="day" /><Yurt x={1500} y={820} scale={0.9} /><Loom x={900} y={930} w={800} /><Ormekshi x={1250} y={950} scale={1.25} facing={-1} pose="sit" expr="angry" look_={-1} /><Tostik x={420} y={950} scale={1.25} expr="neutral" /></Camera>},
  {s: '004', r: () => <Camera z={[1.25, 1.4]} focus={[1180, 580]}><Steppe sky="day" /><Yurt x={1500} y={820} scale={0.9} /><Ormekshi x={1180} y={960} scale={1.5} facing={-1} pose="point" expr="angry" talk /></Camera>},
  {s: '005', r: () => <><Camera z={[1.1, 1.2]} focus={[960, 560]}><Steppe sky="day" /><Silhouettes x={960} y={720} o={0.35} s={0.75} /><Tostik x={960} y={960} scale={1.45} expr="shock" sweat /></Camera><Big text={tr('СЕГІЗ АҒА?')} y={180} at={6} /></>},
  {s: '006', r: () => <Camera z={[1.05, 1.12]} focus={[960, 640]}><YurtInside night fire /><Ernazar x={760} y={960} scale={1.3} pose="sit" expr="sad" look_={1} talk={false} /><Ana x={1160} y={960} scale={1.3} facing={-1} pose="sit" expr="sad" /><Vignette k={0.6} /></Camera>},
  {s: '007', r: () => { const f = F(); return <Camera z={[1, 1.05]} focus={[960, 560]}><Steppe sky="sunset" /><Tostik x={lerp(f, 0, D(), 300, 900, (t) => t)} y={900} scale={1.1} pose="walk" stick={1} bowBack expr="determined" /></Camera>; }},
  {s: '008', r: () => <Camera z={[1.4, 1.55]} focus={[960, 500]}><Steppe sky="sunset" /><Tostik x={960} y={1000} scale={1.6} expr="determined" look_={0} lookY={0} /><Rays x={960} y={500} o={0.25} /></Camera>},
  {s: '009', r: () => <Camera z={[1.4, 1.9]} focus={[960, -40]}><YurtInside light /><Tostik_meat x={960} y={-60} scale={1.3} glow rope={60} /><Sparkle x={1080} y={-120} at={20} /></Camera>},
  {s: '009', t: AFTER('009'), r: () => <Steppe sky="night" />},
  // ── 1. Жұт
  {s: '010', r: () => <Camera z={[1, 1.06]} focus={[960, 640]}><Steppe sky="day" /><Aul n={5} /><Yurt x={1300} y={900} scale={0.9} smoke /><Ernazar x={800} y={960} scale={1.3} pose="handsHips" expr="smug" /></Camera>},
  {s: '011', r: () => { const f = F(); const d = D(); return <Camera z={[1, 1.07]} focus={[960, 600]} focus2={[1050, 600]}><Steppe sky="day" horizon={560} />
    <Herd x={1350} y={640} n={22} w={1100} scale={0.22} />
    <Caravan x={lerp(f, 0, d, 900, 1300, (t) => t)} y={760} n={5} gap={170} scale={0.42} walk={1} />
    <Pen x={560} y={930} w={620} /><Flock x={560} y={900} n={12} w={520} h={60} scale={0.55} /><Pen x={560} y={985} w={620} />
    <Ernazar x={1500} y={1010} scale={1.15} facing={-1} pose="point" expr="happy" /><Sparkle x={1500} y={600} at={Math.min(20, d - 10)} /></Camera>; }},
  {s: '012', r: () => { const f = F(); return <Camera z={[1, 1.05]} focus={[960, 620]}><Steppe sky="day" /><Yurt x={1700} y={820} scale={0.7} />{Array.from({length: 8}).map((_, i) => <Brother key={i} i={i} x={260 + i * 190} y={960} scale={1.05 - i * 0.03} expr={i === 7 && f > 30 ? 'smug' : 'happy'} pose={i === 7 && f > 30 ? 'wave' : 'stand'} />)}</Camera>; }},
  {s: '013', r: () => <Camera z={[1, 1.06]} shake={[6]} shakeAmp={8}><Steppe sky="winter" ground="snow" /><Aul n={4} /><Snow heavy wind={6} /><Vignette k={0.35} color="#6C7A99" /></Camera>},
  {s: '014', r: () => { const f = F(); const dx = lerp(f, 0, D(), 0, 520, (t) => t); return <Camera z={[1, 1.04]}><Steppe sky="winter" ground="snow" />
    <Herd x={1500 + dx} y={700} n={16} w={600} scale={0.25} walk={1} />
    <Caravan x={1250 + dx} y={770} n={4} gap={150} scale={0.38} walk={1} />
    <Flock x={1050 + dx} y={850} n={14} w={520} h={60} scale={0.45} walk={1} />
    {Array.from({length: 8}).map((_, i) => <Brother key={i} i={i} x={140 + i * 85 + dx} y={920 + (i % 2) * 22} scale={0.72} pose="walk" expr="sad" />)}
    <Snow heavy wind={7} /></Camera>; }},
  {s: '015', r: () => <Camera z={[1.2, 1.3]} focus={[900, 560]}><Steppe sky="winter" ground="snow" /><Brother i={2} x={1300} y={900} scale={1} facing={-1} /><Brother i={0} x={900} y={980} scale={1.4} facing={-1} pose="wave" expr="happy" talk /><Snow wind={6} /></Camera>},
  {s: '016', r: () => <Camera z={[1.1, 1.2]} focus={[900, 620]}><Steppe sky="winter" ground="snow" /><Yurt x={1300} y={900} scale={1} /><Ernazar x={800} y={980} scale={1.35} pose="wave" expr="sad" talk /><Ana x={1050} y={980} scale={1.3} expr="sad" tears /><Snow wind={6} /></Camera>},
  {s: '017', r: () => <Camera z={[1.1, 1.25]} focus={[960, 760]}><YurtInside /><Sack x={820} y={950} /><Sack x={940} y={960} s={0.9} /><Sack x={1060} y={955} /><Ernazar x={560} y={980} scale={1.2} expr="neutral" pose="hold" /><Ana x={1360} y={980} scale={1.2} facing={-1} expr="neutral" /></Camera>},
  {s: '018', r: () => { const f = F(); const d = D(); const ph = f < d / 3 ? 0 : f < (2 * d) / 3 ? 1 : 2; return <Camera z={[1, 1.06]}><Steppe sky={ph === 0 ? 'day' : ph === 1 ? 'day' : 'sunset'} ground={ph === 0 ? 'snow' : 'steppe'} /><Yurt x={1200} y={900} scale={1} /><Ernazar x={700} y={980} scale={1.2} pose="think" expr="sad" look_={1} /><Ana x={880} y={980} scale={1.15} expr="sad" look_={1} />{ph === 0 && <Snow n={40} />}</Camera>; }},
  {s: '019', r: () => { const f = F(); const k = lerp(f, 0, D() * 0.8, 1, 0.05); return <Camera z={[1.15, 1.25]} focus={[960, 760]}><YurtInside /><Sack x={820} y={950} s={k} /><Sack x={940} y={960} s={k * 0.9} /><Sack x={1060} y={955} s={k} /><Ernazar x={560} y={980} scale={1.2} pose="shrug" expr="sad" /><Ana x={1360} y={980} scale={1.2} facing={-1} expr="shock" /></Camera>; }},
  {s: '020', r: () => <Camera z={[1.05, 1.12]} focus={[960, 760]}><YurtInside night /><Ernazar x={760} y={930} scale={1.1} rot={-80} expr="tired" /><Ana x={1180} y={930} scale={1.1} rot={80} facing={-1} expr="tired" /><Vignette k={0.55} /></Camera>},
  // ── 2. Төстік
  {s: '021', r: () => { const f = F(); return <Camera z={[1, 1.08]} focus={[960, 500]}><YurtInside night tundikOpen={lerp(f, 0, D() * 0.7, 0, 1)} /><Ana x={1100} y={960} scale={1.25} pose="armsUp" stick={1} expr="tired" lookY={-1} /><Ernazar x={600} y={930} scale={1.1} rot={-80} expr="tired" /></Camera>; }},
  {s: '022', r: () => <Camera z={[1.1, 1.5]} focus={[760, 800]} focus2={[960, 100]}><YurtInside light /><Ernazar x={760} y={930} scale={1.2} rot={-80} expr="neutral" lookY={-1} look_={1} /></Camera>},
  {s: '023', r: () => <Camera z={[2, 2.3]} focus={[960, -40]}><YurtInside light /><Rays x={960} y={20} /><Tostik_meat x={960} y={-60} scale={1} glow rope={60} /><Sparkle x={1040} y={-90} at={8} s={0.8} /><Sparkle x={880} y={20} at={22} s={0.6} /></Camera>},
  {s: '024', r: () => <><Camera z={[1.2, 1.3]} focus={[900, 560]} shake={[4]}><YurtInside light /><Ernazar x={900} y={1000} scale={1.5} pose="armsUp" expr="happy" talk /><Burst x={900} y={500} at={2} /></Camera><Big text={tr('СҮЙІНШІ!')} y={170} at={4} color={C.gold} /></>},
  {s: '025', r: () => <Camera z={[1.25, 1.35]} focus={[1050, 560]}><YurtInside light /><Ana x={1050} y={1000} scale={1.5} facing={-1} expr="shock" talk look_={-1} /></Camera>},
  {s: '026', r: () => <Camera z={[1.1, 1.2]} focus={[960, 560]}><YurtInside light /><Tostik_meat x={960} y={-60} scale={0.9} rope={60} /><Ernazar x={760} y={1000} scale={1.4} pose="point" expr="happy" talk lookY={-1} /><Ana x={1180} y={1000} scale={1.35} facing={-1} expr="neutral" lookY={-1} /></Camera>},
  {s: '027', r: () => <Camera z={[1.1, 1.2]} focus={[960, 700]}><YurtInside fire={false} /><Kazan x={960} y={950} scale={1.1} steam /><Ernazar x={620} y={990} scale={1.25} pose="sit" expr="happy" /><Ana x={1300} y={990} scale={1.25} facing={-1} pose="sit" expr="happy" /><Sparkle x={960} y={680} at={10} /></Camera>},
  {s: '028', r: () => { const f = F(); return <Camera z={[1, 1.08]} focus={[960, 620]}><YurtInside /><Ernazar x={760} y={990} scale={1.3} pose={f > 30 ? 'armsUp' : 'stand'} expr="happy" /><Ana x={1160} y={990} scale={1.3} facing={-1} expr="happy" />{f > D() * 0.6 && <Hearts x={1160} y={560} />}</Camera>; }},
  {s: '029', r: () => <Camera z={[1.15, 1.3]} focus={[960, 760]}><YurtInside /><Besik x={960} y={930} s={1.3}><Tostik age="baby" x={0} y={-50} scale={0.8} expr="sleepy" /></Besik><Sparkle x={1080} y={720} at={12} /></Camera>},
  {s: '030', r: () => <Camera z={[1.15, 1.25]} focus={[960, 700]}><YurtInside /><Besik x={1060} y={930} s={1.2}><Tostik age="baby" x={0} y={-50} scale={0.8} expr="happy" /></Besik><Ana x={700} y={1000} scale={1.35} expr="happy" talk look_={1} lookY={1} /></Camera>},
  {s: '031', r: () => <Camera z={[1.1, 1.2]} focus={[960, 560]}><YurtInside light /><Rays x={960} y={380} o={0.3} /><Ernazar x={960} y={1010} scale={1.4} pose="armsUp" expr="happy" talk /><Tostik age="baby" x={960} y={400} scale={0.9} expr="happy" pose="armsUp" /></Camera>},
  {s: '032', r: () => <Camera z={[1.2, 1.3]} focus={[960, 700]}><YurtInside /><Besik x={960} y={930} s={1.2}><Tostik age="baby" x={0} y={-50} scale={0.8} expr="happy" /></Besik><Tostik_meat x={960} y={560} scale={0.5} rope={120} /><Ernazar x={600} y={1000} scale={1.2} expr="happy" /><Ana x={1320} y={1000} scale={1.2} facing={-1} expr="happy" /></Camera>},
  // ── 3. Өсу
  {s: '033', r: () => <Camera z={[1.1, 1.2]} focus={[960, 700]}><YurtInside /><Tostik age="baby" x={960} y={960} scale={1.2} pose="armsUp" expr="happy" /><Sparkle x={1060} y={760} at={6} /></Camera>},
  {s: '034', r: () => { const f = F(); const d = D(); const st = f < d / 3 ? 0 : f < (2 * d) / 3 ? 1 : 2; const age = (['baby', 'child', 'youth'] as const)[st]; const sc = [1.1, 1.15, 1.15][st];
    return <Camera z={[1, 1.04]} focus={[960, 600]}><YurtInside /><g>{[0, 1, 2].map((i) => i <= st && <line key={i} x1={1080} x2={1160} y1={[830, 700, 520][i]} y2={[830, 700, 520][i]} stroke={C.red} strokeWidth={10} />)}</g>
      <Tostik age={age} x={960} y={980} scale={sc} expr="happy" key={st} /><Burst x={960} y={500} at={[0, Math.round(d / 3), Math.round((2 * d) / 3)][st]} />
      <Ana x={1380} y={990} scale={1.15} facing={-1} expr="shock" /></Camera>; }},
  {s: '035', r: () => <Camera z={[1.05, 1.12]} focus={[960, 560]}><YurtInside light /><Tostik x={960} y={1000} scale={1.45} pose="handsHips" expr="smug" /><Ernazar x={560} y={1000} scale={1.05} expr="shock" lookY={-1} look_={1} /><Ana x={1360} y={1000} scale={1.05} facing={-1} expr="shock" lookY={-1} look_={1} /></Camera>},
  {s: '036', r: () => <Camera z={[1.15, 1.25]} focus={[860, 560]}><YurtInside /><Ana x={760} y={1000} scale={1.4} pose="shrug" expr="tired" talk /><Tostik x={1250} y={1000} scale={1.4} facing={-1} pose="armsUp" expr="happy" /><Ernazar x={1600} y={1000} scale={1.1} facing={-1} expr="happy" /></Camera>},
  {s: '037', r: () => { const f = F(); const t0 = 14; return <Camera z={[1, 1.06]} shake={[t0 + 12]}><Steppe sky="day" /><Aul n={4} />{[0, 1, 2].map((i) => <Guest key={i} n={i + 4} x={300 + i * 160} y={940} scale={0.9} pose={f > t0 + 12 ? 'armsUp' : 'stand'} expr="shock" />)}
    <Guest n={9} x={lerp(f, t0, t0 + 12, 1100, 1450)} y={f < t0 ? 940 : lerpN(f, [t0, t0 + 6, t0 + 12], [940, 650, 950])} rot={lerp(f, t0, t0 + 12, 0, 180)} scale={1.1} pose={f > t0 ? 'fall' : 'stand'} expr="shock" />
    <Tostik age="child" x={1000} y={950} scale={1.4} pose={f > t0 ? 'armsUp' : 'hug'} expr="determined" /><Burst x={1450} y={900} at={t0 + 12} color={C.ochreLight} /></Camera>; }},
  {s: '038', r: () => <ArrowShot />},
  {s: '039', r: () => { const f = F(); return <Camera z={[1, 1.05]}><Steppe sky="sunset" /><Yurt x={1450} y={880} scale={0.9} smoke /><Ernazar x={1250} y={960} scale={1.1} facing={-1} expr="happy" pose="armsUp" /><Ana x={1700} y={960} scale={1.1} facing={-1} expr="happy" />
    <g transform={`translate(${lerp(f, 0, D(), 200, 760, (t) => t)},0)`}><Tostik x={0} y={950} scale={1.2} pose="walk" expr="happy" /><line x1={-60} y1={590} x2={120} y2={590} stroke={C.wood} strokeWidth={10} />{[0, 1, 2].map((i) => <Bustard key={i} x={-30 + i * 60} y={760} scale={0.45} />)}</g></Camera>; }},
  {s: '040', r: () => <Camera z={[1.2, 1.3]} focus={[860, 500]}><YurtInside /><Tostik_meat x={1100} y={-40} scale={0.7} rope={40} /><Ernazar x={860} y={1000} scale={1.45} pose="point" expr="smug" talk lookY={-1} look_={1} /></Camera>},
  {s: '041', r: () => <Camera z={[1.2, 1.32]} focus={[1060, 540]} shake={[3]} shakeAmp={8}><YurtInside /><Ana x={1060} y={1000} scale={1.5} facing={-1} pose="handsHips" expr="angry" talk /></Camera>},
  // ── 4. Өрмек
  {s: '042', r: () => <Camera z={[1, 1.1]} focus={[1100, 700]}><Steppe sky="day" /><Aul n={3} /><Tostik x={500} y={950} scale={1.25} expr="determined" look_={1} /><Bustard x={1350} y={900} scale={1} facing={-1} /></Camera>},
  {s: '043', r: () => { const f = F(); const hit = 14; return <Camera z={[1, 1.05]} shake={[hit]}><Steppe sky="day" /><Tostik x={400} y={950} scale={1.2} pose="shoot" bow expr="determined" /><Bustard x={1350} y={900} scale={1} facing={-1} oneWing={f >= hit} shock={f >= hit} />{f < hit && <Arrow x={lerp(f, 0, hit, 520, 1300, (t) => t)} y={790} />}<Burst x={1330} y={800} at={hit} color="#B98A4E" /></Camera>; }},
  {s: '044', r: () => { const f = F(); return <Camera z={[1, 1.04]}><Steppe sky="day" /><SpeedLines dir={-1} /><Bustard x={lerp(f, 0, D(), 900, 1500, (t) => t)} y={900} scale={1} run oneWing /></Camera>; }},
  {s: '045', r: () => { const f = F(); return <Camera z={[1.05, 1.1]}><Steppe sky="day" /><SpeedLines dir={-1} /><Tostik x={lerp(f, 0, D(), 500, 900, (t) => t)} y={950} scale={1.3} pose="run" expr="determined" talk /><Bustard x={lerp(f, 0, D(), 1300, 1700, (t) => t)} y={920} scale={0.9} run oneWing /></Camera>; }},
  {s: '046', r: () => { const f = F(); const bx = lerp(f, 0, D(), 500, 1500, (t) => t); const by = 960 - Math.max(0, Math.sin(((bx - 700) / 600) * Math.PI)) * 260 * (bx > 700 && bx < 1300 ? 1 : 0); return <Camera z={[1, 1.05]}><Steppe sky="day" /><Yurt x={1650} y={830} scale={0.8} /><Loom x={1000} y={960} w={600} /><Ormekshi x={1000} y={890} scale={1} pose="sit" expr="neutral" /><Bustard x={bx} y={by} scale={0.8} run oneWing /></Camera>; }},
  {s: '047', r: () => { const f = F(); const d = D(); const catchF = Math.round(d * 0.5); const k = lerp(f, 0, catchF, 0, 1, (t) => t);
    // низкий прыжок: ноги проходят над самым өрмеком, носок цепляет нить
    const x = f < catchF ? 560 + k * 380 : 940 + lerp(f, catchF, d, 0, 160, (t) => t); const y = f < catchF ? 990 - Math.sin(k * Math.PI * 0.9) * 95 : 990;
    const tug = f >= catchF ? lerp(f, catchF, catchF + 10, 0, 1) : 0;
    return <Camera z={[1.15, 1.25]} focus={[960, 760]} shake={[catchF]} shakeAmp={8}><Steppe sky="day" /><Loom x={1000} y={980} w={600} />
      {tug > 0 && <path d={`M ${960} ${970} Q ${(960 + x + 40) / 2} ${930 - tug * 30} ${x + 40} ${y - 10}`} stroke={C.red} strokeWidth={5} fill="none" />}
      <Ormekshi x={1340} y={900} scale={1} pose="sit" expr={f >= catchF ? 'shock' : 'neutral'} lookY={f >= catchF ? 1 : 0} />
      <Tostik age="child" x={x} y={y} scale={1.25} pose={f < catchF ? 'jump' : 'fall'} rot={f < catchF ? 0 : lerp(f, catchF, catchF + 8, 0, 14)} expr={f < catchF ? 'happy' : 'shock'} />
      <Burst x={980} y={960} at={catchF} /></Camera>; }},
  {s: '048', r: () => { const f = F(); const d = D(); const t1 = 4, t2 = Math.round(d * 0.18), t3 = Math.round(d * 0.32); return <Camera z={[1.3, 1.4]} focus={[1000, 900]} shake={[t1, t2, t3]}><Steppe sky="day" /><Loom x={1000} y={960} w={700} broken={f < t1 ? 0 : f < t2 ? 0.35 : f < t3 ? 0.7 : 1} /><Ormekshi x={1000} y={890} scale={1} pose="sit" expr="shock" sweat /><Burst x={960} y={940} at={t1} /><Burst x={1080} y={950} at={t2} /><Burst x={880} y={930} at={t3} /></Camera>; }},
  {s: '049', r: () => <Camera z={[1.3, 1.4]} focus={[1000, 540]} shake={[3]}><Steppe sky="day" /><Loom x={1000} y={980} w={800} broken={1} /><Ormekshi x={1000} y={980} scale={1.5} pose="armsUp" expr="angry" talk /></Camera>},
  {s: '050', r: () => <Camera z={[1.25, 1.35]} focus={[1100, 560]}><Steppe sky="day" /><Yurt x={1600} y={830} scale={0.8} /><Ormekshi x={1150} y={1000} scale={1.55} facing={-1} pose="point" expr="angry" talk /><Vignette k={0.3} color={C.red} /></Camera>},
  {s: '051', r: () => { const f = F(); return <Camera z={[1, 1.06]}><Steppe sky="day" /><Tostik x={700} y={960} scale={1.3} expr="shock" /><Bustard x={1350} y={930} scale={1} facing={f > 20 ? -1 : 1} shock={f > 20} oneWing /></Camera>; }},
  {s: '052', r: () => <Camera z={[1.2, 1.35]} focus={[960, 540]}><Steppe sky="dusk" /><Silhouettes x={960} y={760} o={0.4} s={0.8} /><Tostik x={960} y={1000} scale={1.45} pose="think" expr="sad" /></Camera>},
  {s: '053', r: () => { const f = F(); return <Camera z={[1, 1.04]}><Steppe sky="day" /><Yurt x={1500} y={880} scale={1} /><SpeedLines dir={-1} /><Tostik x={lerp(f, 0, D(), 300, 1300, (t) => t)} y={950} scale={1.2} pose="run" expr="angry" /></Camera>; }},
  {s: '054', r: () => <Camera z={[1.2, 1.3]} focus={[1100, 540]}><YurtInside /><Ana x={1150} y={1000} scale={1.45} facing={-1} expr="shock" talk /><Tostik x={650} y={1000} scale={1.3} expr="angry" /></Camera>},
  {s: '055', r: () => <Camera z={[1.2, 1.3]} focus={[800, 540]}><YurtInside /><Tostik x={800} y={1000} scale={1.45} pose="point" expr="angry" talk /><Ana x={1300} y={1000} scale={1.3} facing={-1} expr="sad" /></Camera>},
  {s: '056', r: () => <Camera z={[1.4, 1.55]} focus={[1150, 520]}><YurtInside /><Silhouettes x={1150} y={420} o={0.2} s={0.5} walk /><Ana x={1150} y={1000} scale={1.5} facing={-1} pose="think" expr="sad" tears /></Camera>},
  {s: '057', r: () => <Camera z={[1.2, 1.3]} focus={[1100, 540]}><YurtInside /><Ana x={1150} y={1000} scale={1.45} facing={-1} pose="shrug" expr="neutral" talk look_={1} /><Tostik x={650} y={1000} scale={1.3} expr="neutral" /></Camera>},
  {s: '058', r: () => <Camera z={[1.45, 1.6]} focus={[960, 500]}><YurtInside /><Tostik x={960} y={1000} scale={1.5} expr="tired" look_={1} /></Camera>},
  // ── 5. Асық
  {s: '059', r: () => <Camera z={[1, 1.04]}><rect x={-300} y={-300} width={2520} height={1700} fill={C.indigo} /><Rays x={960} y={540} o={0.15} /><Tostik x={960} y={980} scale={1.3} pose="shrug" expr="neutral" />
    <Frame x={420} y={420}><YurtInside /><Ana x={960} y={1000} scale={1.2} expr="neutral" /></Frame><Frame x={1500} y={420}><Steppe sky="day" /><Ormekshi x={960} y={1000} scale={1.2} expr="angry" /></Frame></Camera>},
  {s: '060', r: () => { const f = F(); return <Camera z={[1.05, 1.12]}><rect x={-300} y={-300} width={2520} height={1700} fill={C.indigo} /><Tostik x={960} y={980} scale={1.3} pose="think" expr="neutral" look_={f % 40 < 20 ? -1 : 1} />
    <Frame x={420} y={420}><YurtInside /><Ana x={960} y={1000} scale={1.2} expr="happy" /></Frame><Frame x={1500} y={420}><Steppe sky="day" /><Ormekshi x={960} y={1000} scale={1.2} expr="angry" pose="point" /></Frame></Camera>; }},
  {s: '061', r: () => <Camera z={[1.2, 1.3]} focus={[960, 500]}><rect x={-300} y={-300} width={2520} height={1700} fill={C.indigo} /><Rays x={960} y={600} o={0.2} /><Tostik x={960} y={1010} scale={1.55} pose="point" expr="happy" /></Camera>},
  {s: '062', r: () => <Camera z={[1, 1.06]} focus={[960, 700]}><Steppe sky="day" /><Aul n={4} />{[0, 1, 2, 3].map((i) => <Asyq key={i} x={820 + i * 60} y={930} r={i * 40} />)}<Kid n={1} x={600} y={950} scale={1.05} pose="sit" expr="happy" /><Kid n={2} coat="#7A4E8C" x={1350} y={950} scale={1.05} facing={-1} pose="sit" expr="happy" /><Tostik age="child" x={1000} y={960} scale={1.2} pose="point" expr="happy" /></Camera>},
  {s: '063', r: () => { const f = F(); const hit = Math.round(D() * 0.7); return <Camera z={[1.1, 1.2]} focus={[960, 700]} shake={[hit]}><Steppe sky="day" /><Kid n={3} coat="#5D3F6A" x={1150} y={960} scale={1.25} facing={-1} pose={f < hit ? 'handsHips' : 'fall'} expr={f < hit ? 'angry' : 'shock'} talk={f < hit} /><Tostik age="child" x={850} y={960} scale={1.25} pose={f < hit - 4 ? 'handsHips' : 'punch'} expr="angry" /><Burst x={1100} y={720} at={hit} /></Camera>; }},
  {s: '064', r: () => { const f = F(); return <Camera z={[1.05, 1.15]} focus={[1100, 760]}><Steppe sky="day" /><Yurt x={1600} y={850} scale={0.8} /><Kid n={3} coat="#5D3F6A" x={lerp(f, 0, 20, 1150, 1250)} y={960} scale={1.2} rot={lerp(f, 0, 20, 0, -85)} pose="fall" expr="shock" /><Tostik age="child" x={800} y={960} scale={1.2} expr="shock" /></Camera>; }},
  {s: '065', r: () => <Camera z={[1.3, 1.4]} focus={[1100, 860]}><Steppe sky="day" /><Kid n={3} coat="#5D3F6A" x={1150} y={940} scale={1.2} rot={-85} expr="sleepy" /><DizzyStars x={1000} y={890} /></Camera>},
  {s: '066', r: () => { const f = F(); return <Camera z={[1.1, 1.2]} focus={[1100, 620]} shake={[2]}><Steppe sky="day" /><SpeedLines dir={-1} /><Ormekshi x={lerp(f, 0, D() * 0.6, 1700, 1250)} y={1000} scale={1.45} facing={-1} pose="armsUp" expr="angry" talk /></Camera>; }},
  {s: '067', r: () => <Camera z={[1.3, 1.45]} focus={[1150, 540]}><Steppe sky="dusk" /><Ormekshi x={1150} y={1000} scale={1.6} facing={-1} pose="point" expr="angry" talk /><Vignette k={0.45} color={C.redDark} /></Camera>},
  {s: '068', r: () => <Camera z={[1.3, 1.4]} focus={[900, 540]} shake={[6]}><Steppe sky="dusk" /><Tostik age="child" x={900} y={1000} scale={1.7} expr="sad" /><Burst x={900} y={700} at={6} color={C.red} /><Vignette k={0.4} /></Camera>},
  {s: '069', r: () => <Camera z={[1.2, 1.35]} focus={[960, 540]}><Steppe sky="dusk" /><Tostik age="child" x={960} y={1000} scale={1.6} pose="think" expr="determined" /></Camera>},
  {s: '070', r: () => <Camera z={[1.15, 1.25]} focus={[800, 580]}><YurtInside night fire /><Tostik x={750} y={1000} scale={1.35} expr="sad" talk /><Ana x={1250} y={1000} scale={1.3} facing={-1} pose="sit" expr="sad" /></Camera>},
  {s: '071', r: () => <Camera z={[1.4, 1.55]} focus={[1250, 580]}><YurtInside night fire /><Ana x={1250} y={1000} scale={1.4} facing={-1} pose="sit" expr="sad" /><Vignette k={0.5} /></Camera>},
  {s: '072', r: () => { const f = F(); return <Camera z={[1.25, 1.35]} focus={[1150, 500]}><YurtInside night fire /><g opacity={0.45}><Steppe sky="winter" ground="snow" hills={false} /></g><Silhouettes x={lerp(f, 0, D(), 700, 1000, (t) => t)} y={480} o={0.5} s={0.55} walk /><Snow n={60} /><Ana x={1250} y={1000} scale={1.45} facing={-1} pose="sit" expr="sad" talk tears /></Camera>; }},
  {s: '073', r: () => <Camera z={[1.15, 1.25]} focus={[900, 560]}><YurtInside night fire /><Ernazar x={700} y={1000} scale={1.35} pose="hug" expr="sad" talk /><Tostik x={1050} y={1000} scale={1.3} facing={-1} expr="sad" /></Camera>},
  {s: '074', r: () => <Camera z={[1.2, 1.35]} focus={[960, 500]}><YurtInside night fire /><Rays x={960} y={420} o={0.3} /><Tostik x={960} y={1010} scale={1.55} pose="handsHips" expr="determined" talk /></Camera>},
];
