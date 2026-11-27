#!/bin/bash
# master.sh <in.mp4> <out.mp4> — громкость под YouTube (-14 LUFS, TP -1), AAC 320k, faststart + проверка
set -e
IN=$1; OUT=$2
ffmpeg -y -v error -i "$IN" -c:v copy -af "loudnorm=I=-14:TP=-1:LRA=11" -ar 48000 -c:a aac -b:a 320k -movflags +faststart "$OUT"
ffprobe -v error -show_entries stream=codec_type,width,height,r_frame_rate,duration -of compact "$OUT"
ffmpeg -i "$OUT" -af ebur128 -f null - 2>&1 | grep -E "I:|Peak" | tail -2
