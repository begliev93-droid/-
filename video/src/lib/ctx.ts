import {createContext, useContext} from 'react';
import {useCurrentFrame} from 'remotion';
export const ShotCtx = createContext<{from: number; dur: number; lang: string; env: number[]}>({from: 0, dur: 1, lang: 'kk', env: []});
export const useShot = () => useContext(ShotCtx);
// громкость речи 0..1 в глобальном кадре (для губ)
export const useMouth = () => { const f = useCurrentFrame(); const {from, env} = useShot(); return env[Math.min(env.length - 1, from + f)] ?? 0; };
