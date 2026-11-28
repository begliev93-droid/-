import React from 'react';
import {Person, PersonProps, Look} from './Puppet';
import {Horse, HorseProps} from './animals';
import {C} from './theme';
type P = Omit<PersonProps, 'name' | 'look' | 'age'>;
export const LOOKS2: Record<string, Look> = {
  // Кенжекей: белое платье, красный камзол (шапан короче), сәукеле невесты / тақия с үкі
  kenzhekey: {coat: '#B3263A', coat2: C.gold, belt: C.gold, pants: '#B3263A', dress: '#F4EEE2', hat: 'saukele', hatColor: '#C0392B', skin: '#EDBE95'},
  kenzhekeyHome: {coat: '#B3263A', coat2: C.gold, belt: C.gold, pants: '#B3263A', dress: '#F4EEE2', hat: 'girl', hatColor: '#C0392B', skin: '#EDBE95'},
  kenzheAke: {coat: '#3E5B3A', coat2: C.gold, belt: '#6E4222', pants: '#2E2A26', hat: 'borik', hatColor: '#C46A2B', hatColor2: '#3E5B3A', beard: 'grey', hunch: 4},
  // Жалмауыз: сперва «жүдеу кемпір», потом истинный облик
  kempirWeak: {coat: '#6E6A60', coat2: '#8E897C', belt: '#4E4A42', pants: '#3E3A34', dress: '#6E6A60', hat: 'scarf', hatColor: '#9C978A', nose: 'hook', hunch: 12, skin: '#CDAA8A'},
  zhalmauyz: {coat: '#3A2E4A', coat2: '#7A5C9A', belt: '#1E1828', pants: '#1E1828', dress: '#2E2440', hat: 'wild', nose: 'hook', hunch: 18, skin: '#A9B08C', claws: true, eyeColor: '#C0392B'},
  sister: {coat: '#2F6E5E', coat2: C.gold, belt: C.gold, pants: '#2F6E5E', dress: '#F4EEE2', hat: 'girl', hatColor: '#2F6E5E', skin: '#EDBE95'},
  zhylkyshy: {coat: '#7A6A4A', coat2: C.cream, belt: '#4E3A22', hat: 'borik', hatColor: '#6E4A2A', hatColor2: '#3E3A34', beard: 'mustache'},
  oldGuest: {coat: '#8A7A64', coat2: '#A89878', belt: '#5A4A34', pants: '#4A3E30', hat: 'takiya', hatColor: '#6E6A60', beard: 'white', hunch: 10},
};
const SIS = ['#2F6E5E', '#3F5FA0', '#7A4E8C', '#9C3D2E', '#D08A2E', '#3D7A3A', '#B0644A', '#4A6A7A'];
export const Kenzhekey: React.FC<P & {home?: boolean}> = ({home, ...p}) => <Person name="kenzhekey" look={home ? LOOKS2.kenzhekeyHome : LOOKS2.kenzhekey} age="youth" {...p} />;
export const KenzheAke: React.FC<P> = (p) => <Person name="kenzheake" look={LOOKS2.kenzheAke} age="old" {...p} />;
export const KempirWeak: React.FC<P> = (p) => <Person name="zhalmauyz" look={LOOKS2.kempirWeak} age="old" {...p} />;
export const Zhalmauyz: React.FC<P> = (p) => <Person name="zhalmauyz" look={LOOKS2.zhalmauyz} age="old" {...p} />;
export const Sister: React.FC<P & {i: number}> = ({i, ...p}) => <Person name={'sis' + i} look={{...LOOKS2.sister, coat: SIS[i % 8], pants: SIS[i % 8], hatColor: SIS[(i + 3) % 8]}} age="youth" {...p} />;
export const Zhylkyshy: React.FC<P & {n: number}> = ({n, ...p}) => <Person name={'zh' + n} look={{...LOOKS2.zhylkyshy, coat: ['#7A6A4A', '#5A6A7A', '#8A5A3A'][n % 3]}} age="adult" {...p} />;
export const OldGuest: React.FC<P> = (p) => <Person name="oldguest" look={LOOKS2.oldGuest} age="old" {...p} />;
// Шалқұйрық: гнедой (тёмно-рыжий) с белыми («шал») гривой и хвостом
export const SHAL = {color: '#8B4A22', mane: '#F2EEE6', tail: '#F2EEE6'};
export const Shalkuyryk: React.FC<Omit<HorseProps, 'color' | 'mane' | 'tail'>> = (p) => <Horse name="shal" {...SHAL} {...p} />;
export const QUBA = '#D9BC8C'; // құба інген — палевая
