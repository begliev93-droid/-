import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {ShotCtx} from './ctx';
import {ChapterCard} from './Cards';
import {tr, setLang} from './i18n';
import {loadFonts} from './fonts';
import {C} from './theme';
export type Sentence = {id: string; voice: string; start: number; end: number; chapter?: string | null; text: string};
// Кадр привязан к предложению: старт = начало предложения (+t сек). Кадр длится до старта следующего кадра.
const ShotRender: React.FC<{r: () => React.ReactNode}> = ({r}) => <>{r()}</>;
// w — слово-удар: кадр начнётся на этом слове (оценка по доле символов в реплике)
export type ShotDef = {s: string; t?: number; w?: string; r: () => React.ReactNode};
export const Episode: React.FC<{shots: ShotDef[]; sentences: Sentence[]; fps: number; total: number; audio: string; chapters: Record<string, string>; lang: string; env: number[]}> = ({shots, sentences, fps, total, audio, chapters, lang, env}) => {
  setLang(lang); loadFonts();
  const S: Record<string, Sentence> = Object.fromEntries(sentences.map((x) => [x.id, x]));
  const starts = shots.map((sh, i) => {
    const se = S[sh.s]; if (!se) throw new Error('нет предложения ' + sh.s);
    // правило владельца: кадр начинается РОВНО на начале фразы, не раньше и не позже
    let t = sh.t ?? 0;
    if (sh.w) { const k = se.text.toLowerCase().indexOf(sh.w.toLowerCase()); if (k < 0) throw new Error(`слово «${sh.w}» не найдено в ${sh.s}`); t = (k / se.text.length) * (se.end - se.start); }
    return i === 0 ? 0 : Math.max(0, Math.round((se.start + t) * fps));
  });
  const items = shots.map((sh, i) => ({sh, from: starts[i], dur: (i + 1 < shots.length ? starts[i + 1] : total) - starts[i]}));
  for (const it of items) if (it.dur < 20) console.warn(`⚠ кадр ${it.sh.s}${it.sh.t ? '+' + it.sh.t : ''} короче 20 кадров (${it.dur})`);
  const chapterStarts = sentences.filter((x) => chapters[x.id]).map((x) => ({id: x.id, f: Math.max(0, Math.round(x.start * fps) - 30), title: chapters[x.id]}));
  return (
    <AbsoluteFill style={{backgroundColor: C.ink}}>
      {items.map(({sh, from, dur}, i) => (
        <Sequence key={i} from={from} durationInFrames={Math.max(1, dur)} name={`${sh.s}${sh.t ? '+' + sh.t : ''}`}>
          <ShotCtx.Provider value={{from, dur, lang, env}}>
            <AbsoluteFill><svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{overflow: 'hidden'}}><ShotRender r={sh.r} /></svg></AbsoluteFill>
          </ShotCtx.Provider>
        </Sequence>
      ))}
      {chapterStarts.map((c) => <Sequence key={'ch' + c.id} from={c.f} durationInFrames={60} name={'глава ' + c.title}><ChapterCard title={tr(c.title)} dur={60} /></Sequence>)}
      <Audio src={staticFile(audio)} />
    </AbsoluteFill>
  );
};
