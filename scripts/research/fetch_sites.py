# Fetch each attorney's own website: home page plus up to 3 pages about expungement / the firm.
import json,re,sys,subprocess,concurrent.futures as cf,os,html
from urllib.parse import urljoin,urlparse
UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36'
def get(url):
    try:
        r=subprocess.run(['curl','-sL','-m','25','--max-filesize','3000000','-A',UA,'-w','\n%{http_code} %{url_effective}',url],capture_output=True,timeout=40)
        out=r.stdout.decode('utf-8','ignore'); body,_,tail=out.rpartition('\n'); code,_,eff=tail.partition(' ')
        return int(code or 0),eff,body
    except Exception as e: return 0,url,''
def text(h):
    h=re.sub(r'(?is)<(script|style|noscript|svg|nav|footer|form)[^>]*>.*?</\1>',' ',h)
    h=re.sub(r'(?s)<[^>]+>',' ',h); return re.sub(r'\s+',' ',html.unescape(h)).strip()
KEY=re.compile(r'expung|expunction|seal|record|clear|clean-slate|set-aside|nondisclosure|non-disclosure|pardon|1203|restor',re.I)
ABOUT=re.compile(r'about|attorney|our-firm|our-team|fees|cost|pricing|faq',re.I)
def one(a):
    dom=a['domain']; out={'name':a['name'],'domain':dom,'pages':[]}
    code,eff,body=get('https://'+dom)
    if code!=200 or len(body)<500:
        code,eff,body=get('http://'+dom)
    out['status']=code
    if code!=200: return out
    out['pages'].append({'url':eff,'text':text(body)[:6000]})
    host=urlparse(eff).netloc
    links=[]
    for m in re.finditer(r'(?is)<a\b[^>]*href=["\']([^"\'#]+)["\'][^>]*>(.*?)</a>',body):
        u=urljoin(eff,m.group(1)); t=re.sub(r'<[^>]+>',' ',m.group(2))
        if urlparse(u).netloc!=host or re.search(r'\.(pdf|jpg|png|zip)$',u,re.I): continue
        s=3 if KEY.search(u+' '+t) else (1 if ABOUT.search(u+' '+t) else 0)
        if re.search(r'expung|expunction|seal',u+' '+t,re.I): s+=3
        if s: links.append((s,u))
    seen={eff.rstrip('/')}; picked=[]
    for s,u in sorted(links,key=lambda x:-x[0]):
        if u.rstrip('/') in seen: continue
        seen.add(u.rstrip('/')); picked.append(u)
        if len(picked)==3: break
    for u in picked:
        c,e,b=get(u)
        if c==200 and len(b)>500: out['pages'].append({'url':e,'text':text(b)[:5000]})
    return out
L=json.load(open('/home/user/wandering-wavelength/attorney_enriched_reviews.json'))['listings']
idx=json.load(open(sys.argv[1])); todo=[L[i]|{'_i':i} for i in idx if L[i].get('domain')]
os.makedirs('sites',exist_ok=True)
def run(a):
    f=f"sites/{a['_i']}.json"
    if os.path.exists(f): return
    o=one(a); o['i']=a['_i']; json.dump(o,open(f,'w'))
with cf.ThreadPoolExecutor(12) as ex: list(ex.map(run,todo))
ok=sum(1 for i in idx if os.path.exists(f'sites/{i}.json') and json.load(open(f'sites/{i}.json'))['status']==200)
print('fetched ok',ok,'of',len(todo))
