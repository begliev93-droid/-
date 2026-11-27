import {interpolate, Easing} from 'remotion';
export const hash = (s: string) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0) / 4294967295; };
export const rnd = (seed: number) => { const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
// безопасный interpolate: b > a всегда (урок: inputRange must be strictly increasing)
export const lerp = (f: number, a: number, b: number, from: number, to: number, ease: ((t: number) => number) = Easing.inOut(Easing.cubic)) =>
  interpolate(f, [a, Math.max(b, a + 1)], [from, to], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
export const lerpN = (f: number, xs: number[], ys: number[]) => {
  const fixed = xs.map((x, i) => i === 0 ? x : x); for (let i = 1; i < fixed.length; i++) fixed[i] = Math.max(fixed[i], fixed[i - 1] + 1);
  return interpolate(f, fixed, ys, {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
};
export const pop = (f: number, at = 0, dur = 10) => lerp(f, at, at + dur, 0, 1, Easing.out(Easing.back(2.2)));
export const deg = (d: number) => (d * Math.PI) / 180;
