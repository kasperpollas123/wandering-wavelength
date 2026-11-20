# Test of google/gemini-decision-1 on listings with known answers (Nov 20 2026).
import json,random,urllib.request,concurrent.futures as cf
R='/home/user/wandering-wavelength/'
key=json.load(open('/home/user/adultdaycare500/agents/secrets/openrouter.json')); key=key.get('key') or key.get('api_key') or list(key.values())[0]
old=json.load(open('/tmp/claude-0/-home-user/ae288a96-7fc4-5aa5-b4c4-ca3f1f3d7087/scratchpad/cards_old.json'))
new=json.load(open(R+'src/data/cardTexts.json')); prof=json.load(open(R+'src/data/attorneyProfiles.json'))
random.seed(7)
changed=[k for k in new if old.get(k)!=new[k]]
same=[k for k in new if old.get(k)==new[k] and k in prof]
bad=random.sample(changed,50); good=random.sample(same,50)
Q1={'type':'noul','instructions':'Does this text say that the law firm helps people clear criminal records (for example expungement, record sealing, set-asides, orders of nondisclosure, pardons or similar record relief)? Answer yes only if the text says or reports that the firm does this work.'}
Q2={'type':'noul','instructions':'Does this text say that the first consultation with the firm is free?'}
cases=[]
for k in bad: cases.append(dict(firm=k,set='old contradictory card',input=old[k],q='clears_records',expect=False))
for k in bad: cases.append(dict(firm=k,set='corrected card',input=new[k],q='clears_records',expect=True))
for k in good: cases.append(dict(firm=k,set='normal card',input=new[k],q='clears_records',expect=True))
for k in bad+good:
    if k in prof: cases.append(dict(firm=k,set='profile description',input=prof[k]['description'],q='free_consult',expect=prof[k].get('free_consultation') is True))
def call(c):
    body={'model':'google/gemini-decision-1','state':c['input'],'questions':{c['q']:Q1 if c['q']=='clears_records' else Q2}}
    r=json.load(urllib.request.urlopen(urllib.request.Request('https://openrouter.ai/api/alpha/decisions',data=json.dumps(body).encode(),headers={'Authorization':'Bearer '+key,'Content-Type':'application/json'}),timeout=60))
    c['p']=r['answers'][c['q']]['noul']; c['cost']=r['usage']['cost']; return c
with cf.ThreadPoolExecutor(8) as ex: res=list(ex.map(call,cases))
json.dump(res,open('results.json','w'),indent=1)
cost=sum(c['cost'] for c in res)
for s in ['old contradictory card','corrected card','normal card','profile description']:
    g=[c for c in res if c['set']==s]
    ok=sum((c['p']>=0.5)==c['expect'] for c in g)
    unsure=sum(0.2<c['p']<0.8 for c in g)
    print(f"{s}: {ok}/{len(g)} right, {unsure} unsure (0.2-0.8)")
print('total calls',len(res),'cost $%.4f'%cost)
for c in res:
    if (c['p']>=0.5)!=c['expect']: print('WRONG',c['set'],round(c['p'],2),'expect',c['expect'],'|',c['input'][:220].replace('\n',' '))
