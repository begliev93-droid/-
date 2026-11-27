import {createContext, useContext} from 'react';
import {useCurrentFrame} from 'remotion';
import env from '../ep01/env.json';
export const ShotCtx = createContext<{from: number; dur: number; lang: string}>({from: 0, dur: 1, lang: 'kk'});
export const useShot = () => useContext(ShotCtx);
// громкость речи 0..1 в глобальном кадре (для губ)
export const useMouth = () => { const f = useCurrentFrame(); const {from} = useShot(); const e = env as number[]; return e[Math.min(e.length - 1, from + f)] ?? 0; };
