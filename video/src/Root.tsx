import React from 'react';
import {Composition} from 'remotion';
import {Ep01} from './ep01/Ep01';
import {Thumb} from './Thumb';
import {TOTAL_FRAMES, FPS} from './ep01/sentences';
export const RemotionRoot: React.FC = () => (
  <>
  <Composition id="Ep01" component={Ep01} durationInFrames={TOTAL_FRAMES} fps={FPS} width={1920} height={1080} defaultProps={{lang: 'kk'}} />
  <Composition id="Thumb" component={Thumb} durationInFrames={1} fps={30} width={1280} height={720} defaultProps={{img: 'thumb/ep01.png', lines: ['8 АҒАМ', 'ҚАЙДА?'], accent: 1}} />
  </>
);
