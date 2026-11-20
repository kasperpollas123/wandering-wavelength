# Keyword Planner: US monthly searches for each listed firm's name (Nov 21 2026)
import json,re,subprocess,time
c=json.load(open('/home/user/wandering-wavelength/src/data/cardTexts.json'))
def clean(n):
    n=n.split('|')[0]
    n=re.split(r'\s[-–|:]\s',n)[0]
    n=re.sub(r',?\s*\b(P\.?L\.?L\.?C|L\.?L\.?C|P\.?C|P\.?A|L\.?L\.?P|APC|PLC|S\.C|Inc|Ltd|LPA|Chtd|P\.?L)\.?$','',n,flags=re.I)
    n=re.sub(r'[^\w&\' .-]',' ',n).replace('&','and')
    return re.sub(r'\s+',' ',n).strip().lower()
names={}
for k in c:
    q=clean(k)
    if q and len(q)<=80: names.setdefault(q,[]).append(k)
qs=list(names)
print('unique queries',len(qs))
out={}
for i in range(0,len(qs),150):
    batch=qs[i:i+150]
    for t in range(3):
        r=subprocess.run(['agents/run','keywords','volume','--json','--keywords',', '.join(b.replace(',',' ') for b in batch)],cwd='/home/user/adultdaycare500',capture_output=True,text=True,timeout=900)
        try:
            for row in json.loads(r.stdout): out[row['keyword']]=row
            break
        except Exception: time.sleep(20)
    print(i+len(batch),'done',flush=True)
json.dump({'names':names,'volumes':out},open('volumes.json','w'),indent=1)
