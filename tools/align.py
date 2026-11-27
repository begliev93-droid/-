#!/usr/bin/env python3
"""Нарезка озвучки одного голоса на реплики по паузам (RMS 10мс, порог -38 дБ, пауза>=0.18с) + DP.
usage: align.py <wav> <n_lines> <chars_csv> -> json [{start,end}] (секунды, без тишины по краям)"""
import sys,json,numpy as np,wave
def load(p):
    w=wave.open(p); sr=w.getframerate(); a=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float32)/32768
    return a,sr
def analyze(p,thr=-38,minp=0.18):
    a,sr=load(p); hop=sr//100
    n=len(a)//hop; rms=np.sqrt(np.mean(a[:n*hop].reshape(n,hop)**2,1)+1e-12); db=20*np.log10(rms)
    sil=db<thr; pauses=[]; i=0
    while i<n:
        if sil[i]:
            j=i
            while j<n and sil[j]: j+=1
            if (j-i)/100>=minp: pauses.append((i/100,j/100))
            i=j
        else: i+=1
    # речь: первая/последняя несилентная
    nz=np.where(~sil)[0]; s0,s1=nz[0]/100,(nz[-1]+1)/100
    return pauses,s0,s1,n/100
def align(p,chars):
    N=len(chars)
    # порог −38 дБ; если пауз не хватает (шум/реверб) — поднимаем порог, затем снижаем мин. паузу
    for thr,minp in [(-38,.18),(-35,.18),(-32,.18),(-30,.15),(-28,.12)]:
        pauses,s0,s1,T=analyze(p,thr,minp)
        inner=[q for q in pauses if q[0]>s0 and q[1]<s1]
        M=len(inner)
        if M>=N-1: break
    if M<N-1: raise SystemExit(f'{p}: пауз {M} < нужно {N-1}')
    align.used=(thr,minp)
    speech=s1-s0-sum(b-a for a,b in inner); rate=speech/sum(chars)
    # DP: выбрать N-1 пауз из M по порядку; стоимость = отклонение длительности сегмента от ожидаемой − бонус за длину паузы
    INF=1e18; mids=[(a+b)/2 for a,b in inner]; plen=[b-a for a,b in inner]
    bounds=[s0]+[None]*0
    # cost(k, j): сегмент k заканчивается на паузе j
    import functools
    exp=[c*rate for c in chars]
    dp=np.full((N,M+1),INF); bk=np.zeros((N,M+1),int)
    # сегмент 0 от s0 до inner[j][0]
    def seg(st,en,k): d=en-st; return ((d-exp[k])/max(exp[k],0.5))**2
    for j in range(M): dp[0][j]=seg(s0,inner[j][0],0)-2*plen[j]
    for k in range(1,N-1):
        for j in range(k,M):
            best=INF;bi=-1
            for i in range(k-1,j):
                v=dp[k-1][i]+seg(inner[i][1],inner[j][0],k)-2*plen[j]
                if v<best: best,bi=v,i
            dp[k][j]=best; bk[k][j]=bi
    if N==1: return [(s0,s1)]
    best=INF;bj=-1
    for j in range(N-2,M):
        v=dp[N-2][j]+seg(inner[j][1],s1,N-1)
        if v<best: best,bj=v,j
    path=[bj]
    for k in range(N-2,0,-1): path.append(bk[k][path[-1]])
    path=path[::-1]; segs=[]; st=s0
    for j in path: segs.append((st,inner[j][0])); st=inner[j][1]
    segs.append((st,s1)); return segs
if __name__=='__main__':
    p=sys.argv[1]; chars=[int(x) for x in sys.argv[2].split(',')]
    print(json.dumps([[round(a,2),round(b,2)] for a,b in align(p,chars)]))
