# Task: research what it costs to clear a criminal record, for each state assigned to you

For a public directory about expungement and record sealing. Readers want to know: what will the court and the state charge me to clear my record, can that be waived, and how long does it take?

For EACH state in your list, find from official sources (state statutes, state court websites and fee schedules, the state police/records agency, state government sites). Reputable legal aid or law school sites may support an official source, but every amount must trace to an official source if at all possible. Use web search and fetch the pages yourself. Never guess or fill from memory; if something cannot be confirmed, use null and say so in "notes".

Fields:
- "state": two-letter code
- "main_process": the state's own name for the main way to clear an adult record (e.g. "expunction and order of nondisclosure", "petition to seal", "set aside")
- "court_fee": the court filing fee for the main petition, as stated (e.g. "$300", "no fee", "varies by county, about $150 to $300"). Include what it applies to if there are different fees (e.g. conviction vs. arrest-only).
- "other_fees": list of {"item": ..., "amount": ...} for required state charges such as background check / fingerprint / certificate of eligibility / state police processing fees. Only required ones. Empty list if none.
- "fee_waiver": short text on whether fees can be waived (e.g. for people who cannot afford them) and how, or null if not found.
- "free_automatic": short text if the state clears some records automatically at no cost (clean slate), or null.
- "time": how long the process usually takes, ONLY if an official or court source states it (e.g. "the agency has 90 days to respond"); otherwise null.
- "summary": 2-3 plain sentences a reader can use, in your own words, only facts from the fields above. Say "about" for approximate figures. No legal advice wording.
- "sources": list of the URLs you actually used.
- "confidence": "high" if the main fee is confirmed on an official page, "medium" if only on reputable secondary sources or the official source is older, "low" otherwise.
- "notes": anything uncertain, e.g. "fee schedule last updated 2023", "counties set their own fees".

Write a JSON array of state objects to the output file given in your instructions, saving after each state (use a short Python script with json.dump(..., ensure_ascii=False, indent=1)). Final reply: one line per state with the main fee and confidence.
