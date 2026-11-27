import React from 'react';
import {Person, PersonProps, Look, Age} from './Puppet';
import {C} from './theme';
type P = Omit<PersonProps, 'name' | 'look' | 'age'> & {age?: Age};
export const LOOKS: Record<string, Look> = {
  tostik: {coat: C.red, coat2: C.gold, belt: C.gold, pants: '#3D2B5A', hat: 'kalpak', hatColor: C.white, hatColor2: C.ink},
  ernazar: {coat: C.indigo, coat2: C.gold, belt: '#8C6A3B', pants: '#3B2E2A', hat: 'borik', hatColor: '#7A5230', hatColor2: C.red, beard: 'white', hunch: 6},
  ana: {coat: '#8E3B5A', coat2: C.gold, belt: C.gold, pants: '#4A2B3A', hat: 'kimeshek', hatColor: C.white, hunch: 4},
  ormekshi: {coat: '#5D3F6A', coat2: '#A88BC0', belt: '#3B2A45', pants: '#2E2238', hat: 'scarf', hatColor: '#6C7A89', nose: 'hook', hunch: 16, skin: '#CFA07E'},
  ulken: {coat: '#2F6E5E', coat2: C.gold, belt: '#7A5230', hat: 'borik', hatColor: '#5A3A22', hatColor2: '#2F6E5E', beard: 'black', tall: 1.06},
  ortanshy: {coat: '#D08A2E', coat2: C.cream, belt: '#7A3B1E', hat: 'takiya', hatColor: C.indigo, beard: 'mustache', wide: 1.3},
  tabakshy: {coat: '#8A8F6A', coat2: C.cream, belt: C.white, hat: 'takiya', hatColor: C.red, beard: 'mustache', wide: 1.15},
  baibishe: {coat: '#2E7D4F', coat2: C.gold, belt: C.gold, hat: 'kimeshek', hatColor: C.cream, tall: 1.04},
  kid: {coat: '#4C8C9E', coat2: C.cream, belt: '#7A5230', hat: 'takiya', hatColor: C.ochre},
};
// 8 братьев: цвета шапанов
const BRO = ['#2F6E5E', '#D08A2E', '#3F5FA0', '#7A4E8C', '#9C3D2E', '#3D7A3A', '#B0644A', '#4A6A7A'];
export const brotherLook = (i: number): Look => i === 0 ? LOOKS.ulken : i === 1 ? LOOKS.ortanshy : {coat: BRO[i], coat2: C.gold, belt: '#6A4A2A', hat: i % 2 ? 'kalpak' : 'borik', hatColor: i % 2 ? C.white : '#6A4426', hatColor2: i % 2 ? C.ink : BRO[(i + 3) % 8], beard: i % 3 === 0 ? 'black' : 'mustache'};
export const Tostik: React.FC<P> = ({age = 'youth', ...p}) => <Person name="tostik" look={LOOKS.tostik} age={age} {...p} />;
export const Ernazar: React.FC<P> = (p) => <Person name="ernazar" look={LOOKS.ernazar} age="old" {...p} />;
export const Ana: React.FC<P> = (p) => <Person name="ana" look={LOOKS.ana} age="old" {...p} />;
export const Ormekshi: React.FC<P> = (p) => <Person name="ormekshi" look={LOOKS.ormekshi} age="old" {...p} />;
export const Brother: React.FC<P & {i: number}> = ({i, ...p}) => <Person name={`bro${i}`} look={brotherLook(i)} age="adult" {...p} />;
export const Tabakshy: React.FC<P & {n?: number}> = ({n = 0, ...p}) => <Person name={`tab${n}`} look={LOOKS.tabakshy} age="adult" {...p} />;
export const Baibishe: React.FC<P> = (p) => <Person name="baibishe" look={LOOKS.baibishe} age="adult" {...p} />;
export const Kid: React.FC<P & {n?: number; coat?: string}> = ({n = 0, coat, ...p}) => <Person name={`kid${n}`} look={{...LOOKS.kid, coat: coat ?? LOOKS.kid.coat}} age="child" {...p} />;
export const Guest: React.FC<P & {n: number}> = ({n, ...p}) => <Person name={`guest${n}`} look={{...brotherLook((n * 3 + 1) % 8), beard: n % 2 ? 'grey' : 'mustache'}} age={n % 3 === 0 ? 'old' : 'adult'} {...p} />;
