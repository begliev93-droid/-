#!/bin/bash
# Копирует тайминги и звук эпизода в проект Remotion + огибающая для губ
set -e
EP=${1:-ep01}; D=/home/user/-/episodes/${EP}-*; D=$(echo $D)
V=$(dirname "$0")/../video
cp $D/src/sentences.ts $V/src/$EP/sentences.ts
ffmpeg -y -v error -i $D/audio/voice.wav -b:a 320k $V/public/$EP/voice.mp3
python3 - "$D/audio/voice.wav" "$V/src/$EP/env.json" <<'P'
import sys,wave,numpy as np,json
w=wave.open(sys.argv[1]);sr=w.getframerate();a=np.frombuffer(w.readframes(w.getnframes()),np.int16)/32768
h=sr//30;n=len(a)//h;r=np.sqrt((a[:n*h].reshape(n,h)**2).mean(1));r=r/np.percentile(r[r>0.01],95)
json.dump([round(float(min(1,x)),2) for x in r],open(sys.argv[2],'w'))
P
echo synced $EP
