import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {C} from './lib/theme';
import {loadFonts} from './lib/fonts';
import {fitSize} from './lib/Cards';
// Превью 1280x720: картинка из Nano Banana (без текста) + 1–3 слова, жирно, толстая тёмная обводка
export const Thumb: React.FC<{img: string; lines: string[]; accent?: number}> = ({img, lines, accent = -1}) => {
  loadFonts();
  const fs = Math.min(...lines.map((l) => fitSize(l, 500, 140)));
  return <AbsoluteFill style={{backgroundColor: C.ink}}>
    <Img src={staticFile(img)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(20,18,46,0.35) 0%, rgba(20,18,46,0.0) 40%)'}} />
    <svg width={1280} height={720} viewBox="0 0 1280 720" style={{position: 'absolute'}}>
      {lines.map((l, i) => <text key={i} x={50} y={40 + fs * 0.85 + i * fs * 1.0} fontFamily="Rubik" fontWeight={900} fontSize={fs} fill={i === accent ? C.gold : C.cream} stroke={C.ink} strokeWidth={fs * 0.16} paintOrder="stroke" strokeLinejoin="round" transform={`rotate(-3 50 ${100 + i * fs})`}>{l}</text>)}
    </svg>
  </AbsoluteFill>;
};
