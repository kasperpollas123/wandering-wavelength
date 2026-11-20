import json,re,glob,sys,os,time
R='/home/user/wandering-wavelength/'
dom=lambda x: re.sub(r'^www\.','',(x or '').lower())
L=json.load(open(R+'attorney_enriched_reviews.json')); listings=L['listings']
RM=json.load(open(R+'removed_listings.json'))
P=json.load(open(R+'src/data/attorneyProfiles.json')); RC=json.load(open(R+'src/data/recordClearingPages.json'))
bad=re.compile(r'\b(experienced|dedicated|top-rated|aggressive|zealous|passionate|trusted|google|avvo|yelp|super lawyers?|award[- ]winning)\b',re.I)
flag=[]
def base(name,domain,city,addr,phone,rating='',votes='',img=None):
    return {'name':name,'reviews':[],'domain':domain,'main_image':img,'work_hours':{},'rating':rating,'votes_count':votes,'rating_distribution':{},'city':city,'state':'Unknown','address':addr,'phone':phone,'categories':[],'years_experience':None,'former_prosecutor':None,'available_24_7':None,'free_consultation':None,'languages':None}
# 1. profiles for existing firms
n1=0
for f in glob.glob('prof_*.json'):
    for k,v in json.load(open(f)).items():
        rcu,rct=v.pop('rc_url',None),v.pop('rc_title',None)
        if not v.get('record_clearing_services'): v['mentions_record_clearing']=False if not rcu else v.get('mentions_record_clearing')
        if bad.search(v['description']): flag.append(('prof',k,bad.findall(v['description'])))
        P[k]=v; n1+=1
        if rcu and v.get('mentions_record_clearing') and k not in RC: RC[k]={'url':rcu,'title':rct or '','services':v.get('record_clearing_services') or []}
# 2. removals (site gone)
gone=['www.jimmedley.com','www.lawfirmwaco.com','kuhlmanoffice.com','houstonalexander.com','nevadaexpungementservices.wordpress.com','katherineobrienlaw.com','www.conyersnix.com','www.cantinmynarich.com']
keep=[]
for a in listings:
    if a.get('domain') in gone: a['removed_reason']='website gone (Nov 2026 check)'; RM['listings'].append(a)
    else: keep.append(a)
print('removed',len(listings)-len(keep)); listings=keep
kd={dom(a.get('domain')) for a in listings+RM['listings'] if a.get('domain')}; kn={a['name'].lower() for a in listings+RM['listings']}
# 3. web-found firms
rat=json.load(open('found_ratings.json')) if os.path.exists('found_ratings.json') else {}
n3=0
for f in sorted(glob.glob('found_[A-D].json')):
    for x in json.load(open(f)):
        d=dom(x['domain'])
        if d in kd or x['name'].lower() in kn: continue
        r=rat.get(d,{})
        a=base(x['name'],x['domain'],x['city'].lower(),x['address'],x['phone'],r.get('rating',''),r.get('votes',''),r.get('img'))
        k=f"{x['name']}|{x['domain']}"; p=x['profile']
        if bad.search(p['description']): flag.append(('found',k,bad.findall(p['description'])))
        P[k]=p; RC[k]={'url':x['rc_url'],'title':x.get('rc_title') or '','services':p.get('record_clearing_services') or []}
        listings.append(a); kd.add(d); kn.add(x['name'].lower()); n3+=1
# 4. listing-found firms
src={str(i['cid']):i for i in json.load(open('dfs_final.json'))+json.load(open('dfs_seal_final.json'))}
n4=sk=0
for f in sorted(glob.glob('desc_out_*.json')):
    for cid,p in json.load(open(f)).items():
        i=src.get(cid)
        if not i or p.get('skip') or not p.get('description'): sk+=1; continue
        d=dom(i['domain']); ai=i['address_info']
        city=f"{ai['city'].lower()}, {ai['region'].lower()}"
        if (d,city) in kd or i['title'].lower() in kn: continue
        if d in kd and not any(dom(z.get('domain'))==d for z in listings[-(n3+n4+1):]): continue
        rt=i.get('rating') or {}
        a=base(i['title'],i['domain'],city,i['address'],i.get('phone'),str(rt.get('value') or ''),str(rt.get('votes_count') or ''),i.get('main_image'))
        k=f"{i['title']}|{i['domain']}"
        if k in P: k=None
        if bad.search(p['description']): flag.append(('desc',cid,i['title'],bad.findall(p['description'])))
        p.setdefault('mentions_record_clearing',True); p.setdefault('fees',None); p.setdefault('payment_plans',None)
        if k: P[k]=p
        listings.append(a); kd.add((d,city)); kd.add(d); kn.add(i['title'].lower()); n4+=1
print('profiles for existing',n1,'web-found',n3,'listing-found',n4,'skipped',sk,'total',len(listings))
print('flags',len(flag)); [print(' ',x) for x in flag[:40]]
if '--write' in sys.argv:
    L['listings']=listings
    json.dump(L,open(R+'attorney_enriched_reviews.json','w'),ensure_ascii=False)
    json.dump(RM,open(R+'removed_listings.json','w'),ensure_ascii=False)
    json.dump(P,open(R+'src/data/attorneyProfiles.json','w'),ensure_ascii=False,indent=1)
    json.dump(RC,open(R+'src/data/recordClearingPages.json','w'),ensure_ascii=False,indent=1)
    print('written')
