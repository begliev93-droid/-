import React from 'react';
import {Sequence} from 'remotion';
import {Episode, ShotDef} from '../lib/Episode';
import {TitleCard} from '../lib/Cards';
import {tr} from '../lib/i18n';
import {sentences, FPS, TOTAL_FRAMES} from './sentences';
import {shots1} from './shots1';
import {Soundtrack} from './Soundtrack';
import * as S2 from './shots2';
const shots: ShotDef[] = [...shots1, ...((S2 as {shots2?: ShotDef[]}).shots2 ?? [])];
export const CHAPTERS: Record<string, string> = {'010': 'ЖҰТ', '021': 'ТӨСТІК', '033': 'ӨСУ', '042': 'ӨРМЕК', '059': 'АСЫҚ', '075': 'ЖОЛ', '088': 'АС', '110': 'ЖЫЛҚЫ ЖҮРМЕЙДІ', '126': 'ҮЙГЕ', '139': 'ТОҒЫЗ СЫРҒА'};
const s9 = sentences.find((x) => x.id === '009')!;
const titleFrom = Math.round((s9.end + 0.15) * FPS);
export const Ep01: React.FC<{lang: string}> = ({lang}) => (
  <>
    <Episode shots={shots} sentences={sentences} fps={FPS} total={TOTAL_FRAMES} audio="ep01/voice.mp3" chapters={CHAPTERS} lang={lang} />
    <Soundtrack />
    <Sequence from={titleFrom} durationInFrames={Math.round(4 * FPS)} name="Заставка"><TitleCard title={tr('ЕР ТӨСТІК')} sub={tr('1-бөлім: Сегіз аға')} /></Sequence>
  </>
);
