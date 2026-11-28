import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Steppe} from './lib/scenery';
import {Tostik} from './lib/cast';
import {Kenzhekey, KenzheAke, KempirWeak, Zhalmauyz, Shalkuyryk, QUBA} from './lib/cast2';
import {Camel, Rider, Saiga, Horse} from './lib/animals';
import {Egeu} from './lib/Puppet';
import {ShotCtx} from './lib/ctx';
export const Lab: React.FC = () => <ShotCtx.Provider value={{from: 0, dur: 30, lang: 'kk', env: []}}><AbsoluteFill><svg width={1920} height={1080} viewBox="0 0 1920 1080"><Steppe sky="day" />
  <Kenzhekey x={160} y={1000} scale={1.1} expr="happy" /><KenzheAke x={360} y={1000} scale={1.05} expr="angry" /><KempirWeak x={540} y={1000} scale={1} expr="sad" /><Zhalmauyz x={740} y={1000} scale={1.1} pose="armsUp" expr="angry" />
  <Tostik x={940} y={1000} scale={1.1} armor item="egeu" />
  <Shalkuyryk x={1300} y={1000} scale={1} saddle talk={0.6} />
  <Camel x={1700} y={1000} scale={0.6} color={QUBA} buida={60} />
  <Camel x={1700} y={640} scale={0.45} color={QUBA} kneel={1} tied />
  <Rider horse={{x: 1150, y: 640, scale: 0.6, name: 'shal', color: '#8B4A22', mane: '#F2EEE6', tail: '#F2EEE6', saddle: true, gallop: 1}} rider={<Tostik x={0} y={0} pose="sit" armor />} />
  <Saiga x={400} y={640} scale={0.8} /><Egeu x={560} y={600} s={1.2} />
  <Horse x={800} y={640} scale={0.5} legs={6} color="#C8B08A" name="ala" />
</svg></AbsoluteFill></ShotCtx.Provider>;
