import json,glob,re
L=json.load(open('/home/user/wandering-wavelength/attorney_enriched_reviews.json'))['listings']
BAN=re.compile(r'\b(experienced|dedicated|aggressive|trusted|premier|proven|top-rated|best|skilled|renowned|award-winning)\b',re.I)
prof={}; noclear=0; flagged=[]
for f in glob.glob('out/*.json'):
    d=json.load(open(f))
    if 'description' not in d or len(d['description'].split())<60: continue
    a=L[d['i']]
    lst=lambda v:[str(x) for x in v][:8] if isinstance(v,list) else []
    p={'description':d['description'].strip(),'mentions_record_clearing':bool(d.get('mentions_record_clearing')),
       'record_clearing_services':lst(d.get('record_clearing_services')),'other_practice_areas':lst(d.get('other_practice_areas'))[:6],
       'free_consultation':d.get('free_consultation') if isinstance(d.get('free_consultation'),bool) else None,
       'fees':d.get('fees') if isinstance(d.get('fees'),str) else None,
       'payment_plans':True if d.get('payment_plans') is True else None,
       'languages':[x for x in lst(d.get('languages')) if x.lower()!='english'],'attorneys':lst(d.get('attorneys'))[:4],
       'founded_or_experience':d.get('founded_or_experience') if isinstance(d.get('founded_or_experience'),str) else None,
       'areas_served':d.get('areas_served') if isinstance(d.get('areas_served'),str) else None}
    if BAN.search(p['description']): flagged.append((a['name'],BAN.findall(p['description'])))
    noclear+= not p['mentions_record_clearing']
    prof[f"{a['name']}|{a.get('domain') or ''}"]=p
json.dump(prof,open('/home/user/wandering-wavelength/src/data/attorneyProfiles.json','w'),indent=1,ensure_ascii=False)
print('profiles',len(prof),'no record clearing on site',noclear,'with fees',sum(1 for p in prof.values() if p['fees']),'free consult',sum(1 for p in prof.values() if p['free_consultation']),'praise words',len(flagged),flagged[:6])
states={}
RC=json.load(open('recheck_out.json'))
okurl=lambda g: g.get('http')==200 or (RC.get(g.get('url'),{}).get('status')==200 and RC[g['url']]['len']>500)
for f in glob.glob('clinics/*.json'):
    d=json.load(open(f)); keep=[]
    for g in d['organisations']:
        if okurl(g) and g.get('url_in_results') and g.get('name') and g.get('what_they_offer'):
            keep.append({k:g.get(k) for k in ['name','type','url','area_served','what_they_offer','who_qualifies','cost','phone']})
    if keep: states[d['state']]=keep
json.dump({'checked':'November 2026','states':states},open('/home/user/wandering-wavelength/src/data/freeHelp.json','w'),indent=1,ensure_ascii=False)
print('help states',len(states),'orgs',sum(len(v) for v in states.values()))
