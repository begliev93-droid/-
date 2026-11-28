import React from 'react';
import {sentences, FPS, TOTAL_FRAMES} from './sentences';
import env from './env.json';
import {Soundtrack as ST, Seg, Fx} from '../lib/soundtrack';
const S = Object.fromEntries(sentences.map((x) => [x.id, x]));
const at = (id: string, t = 0) => Math.max(0, Math.round((S[id].start + t) * FPS));
const endOf = (id: string, t = 0) => Math.round((S[id].end + t) * FPS);
// Без треков с Content ID (см. docs/music-safe-list.md)
const MUSIC: Seg[] = [
  {track: 'enchanted', from: 0, to: at('007', -1.2)},                      // вступление
  {track: 'kazakhstan', from: at('007', -1.2), to: at('028', -0.8)},       // той
  {track: 'desert', from: at('028', -0.8), to: at('046', -0.8)},           // енші
  {track: 'kazakhstan', from: at('046', -0.8), to: at('063', -0.8)},       // көш, Сорқұдық
  {track: 'enchanted', from: at('063', -0.8), to: at('076', -0.5), start: 40}, // туман, «жүдеу кемпір»
  {track: 'tension', from: at('076', -0.5), to: at('096', -0.8)},          // торг с Жалмауыз
  {track: 'tajikistan', from: at('096', -0.8), to: at('115', -0.8)},       // отау, ложь
  {track: 'kazakhstan', from: at('115', -0.8), to: at('139', -0.8), start: 30}, // Шалқұйрық, серт
  {track: 'fairy', from: at('139', -0.8), to: at('163', -0.3)},            // говорящий конь, хитрость
  {track: 'kazakhstan', from: at('163', -0.3), to: at('177', -0.3), start: 60}, // погоня
  {track: 'tension', from: at('177', -0.3), to: at('182', -0.5), vol: 1.1}, // падение, тьма
  {track: 'strings', from: at('182', -0.5), to: TOTAL_FRAMES},            // уроки, финал
];
const SFX: Fx[] = [
  {src: 'neigh', from: at('121', -0.1), dur: 45, start: 0.1, vol: 0.7},
  {src: 'neigh', from: at('172', 0.2), dur: 45, start: 0.1, vol: 0.6},
  {src: 'wind', from: at('063', -0.5), dur: endOf('075', 0.3) - at('063', -0.5), vol: 0.5, fadeOut: 30},
  {src: 'wind', from: at('171', -0.2), dur: endOf('176', 0.5) - at('171', -0.2), start: 8, vol: 0.9, fadeOut: 20},
];
export const Soundtrack2: React.FC = () => <ST music={MUSIC} sfx={SFX} env={env as number[]} fps={FPS} />;
