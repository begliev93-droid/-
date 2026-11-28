import React from 'react';
import {sentences, FPS, TOTAL_FRAMES} from './sentences';
import env from './env.json';
import {Soundtrack as ST, Seg, Fx} from '../lib/soundtrack';
const S = Object.fromEntries(sentences.map((x) => [x.id, x]));
const at = (id: string, t = 0) => Math.max(0, Math.round((S[id].start + t) * FPS));
const endOf = (id: string, t = 0) => Math.round((S[id].end + t) * FPS);
// Без треков с Content ID (см. docs/music-safe-list.md)
const MUSIC: Seg[] = [
  {track: 'kazakhstan', from: 0, to: at('013', -0.8)},
  {track: 'tajikistan', from: at('013', -0.8), to: at('024', -0.2)},       // жұт, голод
  {track: 'desert', from: at('024', -0.2), to: at('059', -0.6)},           // сүйінші, детство, өрмек
  {track: 'enchanted', from: at('059', -0.6), to: at('075', -0.8)},        // асық, правда о братьях
  {track: 'kazakhstan', from: at('075', -0.8), to: at('088', -0.8)},       // дорога
  {track: 'desert', from: at('088', -0.8), to: at('109', -0.3)},           // ас
  {track: 'strings', from: at('109', -0.3), to: at('110', -0.8)},          // встреча братьев
  {track: 'kazakhstan', from: at('110', -0.8), to: at('126', -0.8)},       // табун
  {track: 'strings', from: at('126', -0.8), to: at('139', -0.8)},          // возвращение домой
  {track: 'fairy', from: at('139', -0.8), to: at('154', -0.5)},            // девять серёжек
  {track: 'tension', from: at('154', -0.5), to: at('157', -0.5)},          // Бекторы
  {track: 'kazakhstan', from: at('157', -0.5), to: TOTAL_FRAMES},
];
const SFX: Fx[] = [
  {src: 'arrow', from: at('002', -0.15), dur: 30, start: 1.3, vol: 0.55},
  {src: 'arrow', from: at('038', -0.15), dur: 30, start: 1.3, vol: 0.55},
  {src: 'arrow', from: at('043', -0.15), dur: 26, start: 1.3, vol: 0.55},
  {src: 'neigh', from: at('119', -0.1), dur: 45, start: 0.1, vol: 0.8},
  {src: 'neigh', from: at('120', 0.3), dur: 100, start: 2.0, vol: 0.45},
  {src: 'wind', from: at('013', -0.8), dur: endOf('016', 0.5) - at('013', -0.8), vol: 0.9, fadeOut: 30},
  {src: 'wind', from: at('081', -0.2), dur: 75, start: 5, vol: 0.7, fadeOut: 20},
  {src: 'wind', from: at('161', -0.2), dur: endOf('161', 0.3) - at('161', -0.2), start: 12, vol: 0.8, fadeOut: 15},
];
export const Soundtrack: React.FC = () => <ST music={MUSIC} sfx={SFX} env={env as number[]} fps={FPS} />;
