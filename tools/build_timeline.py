#!/usr/bin/env python3
"""segments.json (+overrides.json) -> audio/voice.wav (вся дорожка) + src/sentences.ts
Паузы: тот же голос 0.35с, смена голоса 0.5с, новая глава 1.2с, + немые сцены HOLD."""
import json,sys,re,subprocess,os,wave,numpy as np
ep=sys.argv[1]; SR=48000; FPS=30
seg=json.load(open(f'{ep}/audio/segments.json'))
ov=json.load(open(f'{ep}/audio/overrides.json')) if os.path.exists(f'{ep}/audio/overrides.json') else {}
for k,(a,b) in ov.items(): seg[k]['src'],seg[k]['end']=a,b
HOLD=json.load(open(f'{ep}/audio/holds.json')) if os.path.exists(f'{ep}/audio/holds.json') else {}
# главы из script.md
chap={};cur=None
for ln in open(f'{ep}/script.md'):
    m=re.match(r'^## (.+)',ln)
    if m: cur=m.group(1).strip(); continue
    m=re.match(r'^(\d{3}) \|',ln)
    if m and cur: chap[m.group(1)]=cur; cur=None
wavs={}
def W(v):
    if v not in wavs:
        w=wave.open(f'{ep}/audio/lin/{v}.wav'); wavs[v]=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)/32768
    return wavs[v]
# громкость по голосам: выравниваем RMS речи
def rms(x): return np.sqrt(np.mean(x**2)+1e-12)
vgain={}
for v in set(s['voice'] for s in seg.values()):
    parts=[W(v)[int(s['src']*SR):int(s['end']*SR)] for s in seg.values() if s['voice']==v]
    vgain[v]=0.1/rms(np.concatenate(parts))
out=[];t=0.6;prev=None;rows=[]
out.append(np.zeros(int(t*SR),np.float32))
for k in sorted(seg):
    s=seg[k]
    if prev is not None:
        gap=1.2 if k in chap else (0.35 if s['voice']==prev else 0.5)
        out.append(np.zeros(int(gap*SR),np.float32)); t+=gap
    pad=0.04; a=max(0,s['src']-pad); b=s['end']+pad
    clip=W(s['voice'])[int(a*SR):int(b*SR)]*vgain[s['voice']]
    n=len(clip); f=int(0.01*SR); env=np.ones(n); env[:f]=np.linspace(0,1,f); env[-f:]=np.linspace(1,0,f); clip=clip*env
    st=t; out.append(clip.astype(np.float32)); t+=n/SR
    rows.append(dict(id=k,voice=s['voice'],start=round(st,3),end=round(t,3),chapter=chap.get(k),text=s['text']))
    if k in HOLD: out.append(np.zeros(int(HOLD[k]*SR),np.float32)); t+=HOLD[k]
    prev=s['voice']
out.append(np.zeros(int(2.0*SR),np.float32)); t+=2.0
y=np.concatenate(out); y=y/max(1,np.abs(y).max()/0.95)
os.makedirs(f'{ep}/audio',exist_ok=True)
w=wave.open(f'{ep}/audio/voice.wav','w'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((y*32767).astype(np.int16).tobytes()); w.close()
os.makedirs(f'{ep}/src',exist_ok=True)
with open(f'{ep}/src/sentences.ts','w') as f:
    f.write('// автогенерация tools/build_timeline.py — не править руками\n')
    f.write(f'export const FPS = {FPS};\nexport const TOTAL_SEC = {t:.3f};\nexport const TOTAL_FRAMES = {int(np.ceil(t*FPS))};\n')
    f.write('export type Sentence = {id: string; voice: string; start: number; end: number; chapter?: string | null; text: string};\n')
    f.write('export const sentences: Sentence[] = '+json.dumps(rows,ensure_ascii=False,indent=1)+';\n')
print(f'итого {t:.1f}s = {int(t//60)}:{t%60:04.1f}, реплик {len(rows)}')
short=[r for r in rows if r['end']-r['start']<0.7]
for r in short: print('⚠ короче 0.7с:',r['id'],round(r['end']-r['start'],2),r['text'])
