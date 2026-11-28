#!/usr/bin/env python3
"""Выравнивает все голоса эпизода: voice/lines.tsv + audio/lin/<voice>.wav -> audio/segments.json"""
import csv,json,sys,os,collections
sys.path.insert(0,os.path.dirname(__file__)); from align import align,analyze
ep=sys.argv[1]; rows=list(csv.DictReader(open(f'{ep}/voice/lines.tsv'),delimiter='\t'))
by=collections.OrderedDict()
for r in rows: by.setdefault(r['file'].split('_',1)[1][:-4],[]).append(r)
out={}
for v,rs in by.items():
    p=f'{ep}/audio/lin/{v}.wav'; pauses,s0,s1,T=analyze(p)
    inner=[q for q in pauses if q[0]>s0 and q[1]<s1]
    import re as _re
    segs=align(p,[len(r['text']) for r in rs],[len(_re.findall(r'[.!?…]+\s+\S',r['text'])) for r in rs])
    print(f'{v}: порог {align.used}, строк {len(rs)}, пауз {len(inner)}, речь {s0:.2f}-{s1:.2f} из {T:.2f}')
    for r,(a,b) in zip(rs,segs):
        out[r['id']]={'voice':v,'src':a,'end':b,'text':r['text']}
        cps=len(r['text'])/(b-a)
        flag=' ⚠' if cps<9 or cps>22 else ''
        if flag or len(rs)<15: print(f"  {r['id']} {a:6.2f}-{b:6.2f} {b-a:5.2f}s {cps:4.1f}симв/с{flag} {r['text'][:50]}")
json.dump(out,open(f'{ep}/audio/segments.json','w'),ensure_ascii=False,indent=1)
