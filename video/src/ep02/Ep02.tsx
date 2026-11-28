import React from 'react';
import {Sequence} from 'remotion';
import {Episode, ShotDef} from '../lib/Episode';
import {TitleCard} from '../lib/Cards';
import {tr} from '../lib/i18n';
import {sentences, FPS, TOTAL_FRAMES} from './sentences';
import env from './env.json';
import {shotsA} from './shotsA';
import {shotsB} from './shotsB';
import {shotsC} from './shotsC';
import {Soundtrack2} from './Soundtrack2';
const shots: ShotDef[] = [...shotsA, ...shotsB, ...shotsC];
export const CHAPTERS2: Record<string, string> = {'007': 'ТОЙ', '028': 'ЕНШІ', '046': 'СОРҚҰДЫҚ', '063': 'ТҰМАН', '076': 'САУДАЛАСУ', '096': 'ОТАУ', '106': 'ӨТІРІК', '115': 'ШАЛҚҰЙРЫҚ', '133': 'СЕРТ', '139': 'СӨЙЛЕЙТІН АТ', '154': 'АЙЛА', '163': 'ҚУҒЫН'};
const s6 = sentences.find((x) => x.id === '006')!;
const titleFrom = Math.round((s6.end + 0.15) * FPS);
export const Ep02: React.FC<{lang: string}> = ({lang}) => (
  <>
    <Episode shots={shots} sentences={sentences} fps={FPS} total={TOTAL_FRAMES} audio="ep02/voice.mp3" chapters={CHAPTERS2} lang={lang} env={env as number[]} />
    <Soundtrack2 />
    <Sequence from={titleFrom} durationInFrames={Math.round(4 * FPS)} name="Заставка"><TitleCard title={tr('ЕР ТӨСТІК')} sub={tr('2-бөлім: Жалмауыздың егеуі')} /></Sequence>
  </>
);
