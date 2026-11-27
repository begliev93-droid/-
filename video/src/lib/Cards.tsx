import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, OUT} from './theme';
import {lerp, pop} from './util';
const FONT = '"Rubik", "Montserrat", "Arial Black", sans-serif';
// авто-подгонка длинной надписи по ширине (урок: подписи не должны вылезать)
export const fitSize = (text: string, maxW: number, base: number) => Math.min(base, (maxW / Math.max(1, text.length)) * 1.75);
export const Ou: React.FC<{w: number; h: number}> = ({w, h}) => (
  <g>{[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy], i) => <path key={i} transform={`translate(${(sx * w) / 2},${(sy * h) / 2}) scale(${sx},${sy})`} d="M 0 0 Q 0 -50 40 -50 Q 70 -50 60 -25 Q 50 -5 30 -20 M 0 0 Q -50 0 -50 40 Q -50 70 -25 60 Q -5 50 -20 30" fill="none" stroke={C.gold} strokeWidth={10} strokeLinecap="round" />)}</g>
);
export const ChapterCard: React.FC<{title: string; dur?: number}> = ({title, dur = 45}) => {
  const f = useCurrentFrame(); const s = pop(f, 0, 12); const o = lerp(f, dur - 10, dur, 1, 0);
  const fs = fitSize(title, 900, 120);
  return <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity: o}}>
    <svg width={1920} height={1080} viewBox="0 0 1920 1080"><g transform={`translate(960,540) scale(${s})`}>
      <rect x={-560} y={-130} width={1120} height={260} rx={40} fill={C.indigo} stroke={OUT} strokeWidth={12} opacity={0.92} />
      <rect x={-530} y={-100} width={1060} height={200} rx={28} fill="none" stroke={C.gold} strokeWidth={5} />
      <Ou w={1060} h={200} />
      <text x={0} y={fs * 0.36} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={fs} fill={C.cream} stroke={OUT} strokeWidth={14} paintOrder="stroke">{title}</text>
    </g></svg></AbsoluteFill>;
};
export const TitleCard: React.FC<{title: string; sub: string}> = ({title, sub}) => {
  const f = useCurrentFrame(); const s1 = pop(f, 4, 16); const s2 = pop(f, 22, 14); const ouK = lerp(f, 0, 30, 0, 1);
  return <AbsoluteFill><svg width={1920} height={1080} viewBox="0 0 1920 1080">
    <rect width={1920} height={1080} fill={C.indigo} />
    <g transform="translate(960,540)">{Array.from({length: 16}).map((_, i) => <path key={i} transform={`rotate(${i * 22.5 + f * 0.2}) scale(${ouK})`} d="M 0 -120 Q 60 -260 0 -420 Q -60 -260 0 -120" fill="none" stroke={i % 2 ? C.gold : C.red} strokeWidth={10} opacity={0.6} />)}</g>
    <g transform={`translate(960,520) scale(${s1})`}><text x={0} y={0} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={190} fill={C.cream} stroke={OUT} strokeWidth={22} paintOrder="stroke">{title}</text></g>
    <g transform={`translate(960,680) scale(${s2})`}><text x={0} y={0} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={fitSize(sub, 1500, 80)} fill={C.gold} stroke={OUT} strokeWidth={12} paintOrder="stroke">{sub}</text></g>
  </svg></AbsoluteFill>;
};
// редкая ключевая надпись в кадре
export const Big: React.FC<{text: string; x?: number; y?: number; at?: number; color?: string; size?: number}> = ({text, x = 960, y = 200, at = 0, color = C.cream, size = 110}) => {
  const f = useCurrentFrame(); const s = pop(f, at, 10); const fs = fitSize(text, 1500, size);
  return <g transform={`translate(${x},${y}) scale(${s})`}><text x={0} y={fs * 0.35} textAnchor="middle" fontFamily={FONT} fontWeight={900} fontSize={fs} fill={color} stroke={OUT} strokeWidth={16} paintOrder="stroke">{text}</text></g>;
};
