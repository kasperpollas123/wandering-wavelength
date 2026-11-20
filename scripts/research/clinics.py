# Find free record-clearing help per state: Exa search -> page text -> model extracts organisations -> check links load.
import json,sys,os,re,urllib.request,subprocess,concurrent.futures as cf
EXA=json.load(open('/home/user/adultdaycare500/agents/secrets/exa.json'))['api_key']
OR=json.load(open('/home/user/adultdaycare500/agents/secrets/openrouter.json'))['api_key']
STATES={'AL':'Alabama','AK':'Alaska','AZ':'Arizona','AR':'Arkansas','CA':'California','CO':'Colorado','CT':'Connecticut','DE':'Delaware','DC':'District of Columbia','FL':'Florida','GA':'Georgia','HI':'Hawaii','ID':'Idaho','IL':'Illinois','IN':'Indiana','IA':'Iowa','KS':'Kansas','KY':'Kentucky','LA':'Louisiana','ME':'Maine','MD':'Maryland','MA':'Massachusetts','MI':'Michigan','MN':'Minnesota','MS':'Mississippi','MO':'Missouri','MT':'Montana','NE':'Nebraska','NV':'Nevada','NH':'New Hampshire','NJ':'New Jersey','NM':'New Mexico','NY':'New York','NC':'North Carolina','ND':'North Dakota','OH':'Ohio','OK':'Oklahoma','OR':'Oregon','PA':'Pennsylvania','RI':'Rhode Island','SC':'South Carolina','SD':'South Dakota','TN':'Tennessee','TX':'Texas','UT':'Utah','VT':'Vermont','VA':'Virginia','WA':'Washington','WV':'West Virginia','WI':'Wisconsin','WY':'Wyoming'}
def post(url,body,headers):
    r=urllib.request.Request(url,data=json.dumps(body).encode(),headers={**headers,'Content-Type':'application/json'})
    return json.load(urllib.request.urlopen(r,timeout=240))
def exa(q):
    d=post('https://api.exa.ai/search',{'query':q,'numResults':10,'type':'auto','contents':{'text':{'maxCharacters':3500}}},{'x-api-key':EXA})
    return d.get('results',[]),(d.get('costDollars') or {}).get('total',0)
SYSTEM="""You build a directory of FREE help for clearing a criminal record (expungement, record sealing, set-aside, clean slate) in one US state. You are given web pages found by a search. Extract the organisations that offer free or low-cost help with record clearing in that state: legal aid societies, law school clinics, public defender or court clean-slate programmes, bar association clinics, nonprofits, and official court self-help resources.

Strict rules:
- Use ONLY what the page text says. Never add an organisation, phone number, eligibility rule or fact from memory.
- Leave out private law firms that charge fees, lead-generation sites, news articles about one-off past events, and anything outside the state.
- One entry per organisation. If several pages describe the same organisation, merge them and use the most specific page.
- url must be copied exactly from the PAGE lines given. Do not invent or shorten URLs.
- If the text does not state something (who qualifies, cost, contact), use null.
- Write the two description fields in your own plain words, short and factual.

Return ONLY JSON: {"organisations":[{"name":..., "type": one of "legal aid","law school clinic","public defender","court self-help","bar association","nonprofit","government programme", "url":..., "area_served": e.g. "Statewide" or county/city names as stated, or null, "what_they_offer": one or two sentences, "who_qualifies": one sentence or null, "cost": "Free" / short fact / null, "phone": as written or null, "evidence": a short exact quote from the page showing it helps with record clearing}]}"""
def state(code):
    f=f'clinics/{code}.json'
    if os.path.exists(f): return
    name=STATES[code]; pages={}; cost=0
    for q in [f'free expungement clinic {name} legal aid help clearing criminal record',f'{name} record sealing expungement free legal help law school clinic public defender clean slate program']:
        try:
            res,c=exa(q); cost+=c
            for r in res:
                if r.get('url') and r.get('text') and r['url'] not in pages: pages[r['url']]=(r.get('title') or '',r['text'])
        except Exception as e: print('exa err',code,str(e)[:80])
    body='\n\n'.join(f"PAGE {u}\nTITLE {t}\n{x}" for u,(t,x) in pages.items())
    o=None
    for attempt in range(3):
        try:
            d=post('https://openrouter.ai/api/v1/chat/completions',{'model':'google/gemini-4-carbon','messages':[{'role':'system','content':SYSTEM},{'role':'user','content':f'STATE: {name}\n\n{body}'}],'max_tokens':12000,'temperature':0.2,'response_format':{'type':'json_object'}},{'Authorization':'Bearer '+OR})
            cost+=d.get('usage',{}).get('cost') or 0
            t=d['choices'][0]['message']['content'] or ''
            o=json.loads(re.search(r'\{[\s\S]*\}',t).group(0)); break
        except Exception as e: err=str(e)[:80]
    if o is None: print('llm err',code,err); return
    orgs=[]
    for g in o.get('organisations',[]):
        u=g.get('url') or ''
        g['url_in_results']=u in pages
        g['evidence_found']=bool(g.get('evidence')) and u in pages and re.sub(r'\s+',' ',g['evidence'])[:60].lower() in re.sub(r'\s+',' ',pages[u][1]).lower()
        try: g['http']=int(subprocess.run(['curl','-sL','-m','20','-o','/dev/null','-w','%{http_code}','-A','Mozilla/5.0 Chrome/124',u],capture_output=True,timeout=30).stdout.decode() or 0)
        except Exception: g['http']=0
        orgs.append(g)
    json.dump({'state':code,'cost':cost,'pages':len(pages),'organisations':orgs},open(f,'w'),indent=1)
os.makedirs('clinics',exist_ok=True)
codes=sys.argv[1].split(',') if len(sys.argv)>1 and sys.argv[1]!='ALL' else list(STATES)
with cf.ThreadPoolExecutor(5) as ex: list(ex.map(state,codes))
tot=0;n=0
for c in codes:
    if os.path.exists(f'clinics/{c}.json'):
        d=json.load(open(f'clinics/{c}.json')); tot+=d['cost']; n+=len(d['organisations'])
print('states',len(codes),'organisations',n,'cost',round(tot,2))
