#!/usr/bin/env python3
"""script.md -> voice/lines.tsv + voice/clean/<голос>.txt (только реплики, пустая строка между ними).
Убирает пометки [д], [смягч...] и *ударные слова*."""
import re,os,sys,collections
ep=sys.argv[1]
SLUG={'НАРРАТОР':'narrator','ТӨСТІК':'tostik','ЕРНАЗАР':'ernazar','АНА':'ana','ӨРМЕКШІ КЕМПІР':'ormekshi','ҮЛКЕН АҒА':'ulken_aga','ОРТАНШЫ АҒА':'ortanshy_aga','ТАБАҚШЫ':'tabakshy','БӘЙБІШЕ':'baibishe',
      'КЕНЖЕКЕЙ':'kenzhekey','КЕНЖЕКЕЙДІҢ ӘКЕСІ':'kenzhe_ake','ЖАЛМАУЫЗ':'zhalmauyz','ШАЛҚҰЙРЫҚ':'shalkuyryk','БЕКТОРЫ':'bektory'}
L=[]
for ln in open(f'{ep}/script.md'):
    m=re.match(r'^(\d{3}) \| (.+?) \| (.+)$',ln.strip())
    if m:
        t=re.sub(r'\s*\[(д|смягч)[^\]]*\]','',m.group(3)).replace('*','').strip()
        L.append((m.group(1),m.group(2),t))
os.makedirs(f'{ep}/voice/clean',exist_ok=True)
with open(f'{ep}/voice/lines.tsv','w') as f:
    f.write('id\tvoice\tfile\ttext\n')
    for i,v,t in L: f.write(f'{i}\t{v}\t{i}_{SLUG[v]}.mp3\t{t}\n')
by=collections.OrderedDict()
for i,v,t in L: by.setdefault(SLUG[v],[]).append(t)
for k,ts in by.items(): open(f'{ep}/voice/clean/{k}.txt','w').write('\n\n'.join(ts)+'\n')
w=sum(len(t.split()) for _,_,t in L)
print(f'реплик {len(L)}, слов {w}, оценка ≈{(w/122*60+len(L)*0.45+12)/60:.1f} мин')
for k,ts in by.items(): print(f'  {k}: {len(ts)} реплик, {sum(len(t.split()) for t in ts)} слов')
