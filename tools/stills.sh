#!/bin/bash
# stills.sh <comp> <out_dir> frame1 frame2 ... → PNG + контактный лист
cd $(dirname "$0")/../video; COMP=$1; OUT=$2; shift 2; mkdir -p $OUT
npx remotion bundle --out-dir=/tmp/rbundle >/dev/null 2>&1 || true
for f in "$@"; do npx remotion still /tmp/rbundle $COMP $OUT/f$f.png --frame=$f --scale=0.5 >/dev/null 2>&1 || echo "FAIL $f"; done
python3 - $OUT "$@" <<'P'
import sys; from PIL import Image, ImageDraw
d=sys.argv[1]; fs=sys.argv[2:]; ims=[Image.open(f'{d}/f{f}.png') for f in fs if __import__('os').path.exists(f'{d}/f{f}.png')]
W,H=480,270; cols=3; rows=(len(ims)+cols-1)//cols; sheet=Image.new('RGB',(W*cols,H*rows),'white')
for i,(im,f) in enumerate(zip(ims,fs)):
  t=im.resize((W,H)); ImageDraw.Draw(t).text((6,4),f,fill='red'); sheet.paste(t,((i%cols)*W,(i//cols)*H))
sheet.save(f'{d}/sheet.jpg',quality=85)
P
