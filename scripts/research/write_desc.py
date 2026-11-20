# Write a factual profile for each attorney from the text of the firm's own website.
import json,sys,os,glob,urllib.request,concurrent.futures as cf,re
K=json.load(open('/home/user/adultdaycare500/agents/secrets/openrouter.json'))['api_key']
MODEL=sys.argv[2] if len(sys.argv)>2 else 'google/gemini-4-carbon'
L=json.load(open('/home/user/wandering-wavelength/attorney_enriched_reviews.json'))['listings']
SYSTEM="""You write short, factual profiles of law firms for a directory of attorneys who clear criminal records (expungement, record sealing and similar). You are given text copied from the firm's own website. Your profile will be published next to the firm's name, address and phone number.

Rules, all strict:
- Use ONLY facts stated in the website text. If something is not in the text, leave it out. Never guess, never fill gaps from general knowledge about lawyers.
- Write in your own words. Do not copy sentences from the website. Plain, neutral English. No praise words (experienced, dedicated, top, aggressive, trusted, best, premier, proven, skilled), no promises about results, no "contact us today".
- Do not repeat the address or phone number. Do not mention reviews or ratings.
- Refer to the firm by name or as "the firm". For an individual lawyer of unknown gender use their name or "they".
- Describe first what the firm says about record clearing (which kinds: expungement, sealing, nondisclosure, set-aside, pardons, juvenile records, gun rights and so on, and for which state), then the firm's other main practice areas, then practical facts a client would want (free consultation, fees if a figure is published, payment plans, languages, who the lawyers are, how long in practice, areas served).
- If the website text never mentions expungement, record sealing or any other record-clearing service, set mentions_record_clearing to false and describe only what the firm does say it handles.
- Fees: include a figure only if the text gives one, and quote the exact words in fee_evidence.

Return ONLY a JSON object with these keys:
description: 90 to 150 words, 2 short paragraphs separated by \\n\\n.
mentions_record_clearing: true or false.
record_clearing_services: list of short service names found in the text (may be empty).
other_practice_areas: up to 6 short names.
free_consultation: true, false or null (null when the text does not say).
fees: short factual sentence, or null.
fee_evidence: exact quote from the text supporting fees or free consultation, or null.
payment_plans: true or null.
languages: list of languages other than English named in the text (may be empty).
attorneys: up to 4 lawyer names found in the text.
founded_or_experience: short fact as stated (for example "Practising since 1998"), or null.
areas_served: short phrase as stated, or null."""
def ask(i):
    f=f'out/{i}.json'
    if os.path.exists(f): return
    s=json.load(open(f'sites/{i}.json'))
    body='\n\n'.join(f"[PAGE {p['url']}]\n{p['text']}" for p in s['pages'])
    if len(body)<1200: json.dump({'i':i,'skip':'too little website text'},open(f,'w')); return
    a=L[i]
    user=f"Firm name: {a['name']}\nLocation: {a['city']}\nWebsite: {a['domain']}\n\nWEBSITE TEXT:\n{body}"
    req=urllib.request.Request('https://openrouter.ai/api/v1/chat/completions',data=json.dumps({'model':MODEL,'messages':[{'role':'system','content':SYSTEM},{'role':'user','content':user}],'max_tokens':4000,'temperature':0.3,'response_format':{'type':'json_object'}}).encode(),headers={'Authorization':'Bearer '+K,'Content-Type':'application/json'})
    for attempt in range(3):
        try:
            d=json.load(urllib.request.urlopen(req,timeout=180)); t=d['choices'][0]['message']['content'] or ''
            o=json.loads(re.search(r'\{[\s\S]*\}',t).group(0)); o['i']=i; o['_cost']=d.get('usage',{}).get('cost'); json.dump(o,open(f,'w'),indent=1); return
        except Exception as e: err=str(e)[:100]
    print('ERR',i,err)
os.makedirs('out',exist_ok=True)
idx=[i for i in json.load(open(sys.argv[1])) if os.path.exists(f'sites/{i}.json') and json.load(open(f'sites/{i}.json'))['status']==200]
with cf.ThreadPoolExecutor(6) as ex: list(ex.map(ask,idx))
done=[json.load(open(f)) for f in glob.glob('out/*.json')]
print('written',sum(1 for d in done if 'description' in d),'skipped',sum(1 for d in done if 'skip' in d),'cost',round(sum(d.get('_cost') or 0 for d in done),3))
