import React from 'react';
import {Composition} from 'remotion';
import {Ep01} from './ep01/Ep01';
import {TOTAL_FRAMES, FPS} from './ep01/sentences';
export const RemotionRoot: React.FC = () => (
  <Composition id="Ep01" component={Ep01} durationInFrames={TOTAL_FRAMES} fps={FPS} width={1920} height={1080} defaultProps={{lang: 'kk'}} />
);
