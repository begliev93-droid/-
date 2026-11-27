import React from 'react';
import {useCurrentFrame} from 'remotion';
import {useShot} from './ctx';
import {lerp} from './util';
// Медленный постоянный наезд + опциональная тряска на ударах. focus — точка мира, к которой «едем».
export const Camera: React.FC<{children: React.ReactNode; z?: [number, number]; focus?: [number, number]; focus2?: [number, number]; shake?: number[]; shakeAmp?: number}> = ({children, z = [1, 1.06], focus = [960, 540], focus2, shake = [], shakeAmp = 14}) => {
  const f = useCurrentFrame(); const {dur} = useShot();
  const k = lerp(f, 0, dur, 0, 1, (t) => t);
  const zoom = z[0] + (z[1] - z[0]) * k;
  const fx = focus2 ? focus[0] + (focus2[0] - focus[0]) * k : focus[0];
  const fy = focus2 ? focus[1] + (focus2[1] - focus[1]) * k : focus[1];
  let sx = 0, sy = 0;
  for (const s of shake) { const d = f - s; if (d >= 0 && d < 12) { const a = shakeAmp * (1 - d / 12); sx += Math.sin(d * 2.7) * a; sy += Math.cos(d * 3.3) * a; } }
  return <g transform={`translate(${960 + sx},${540 + sy}) scale(${zoom}) translate(${-fx},${-fy})`}>{children}</g>;
};
