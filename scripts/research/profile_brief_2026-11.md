# Task: rewrite law firms' own descriptions into neutral directory profiles

Input file: a JSON array of firms, each with id, name, city, state and own_description (text the firm wrote about itself). No web access is needed or allowed; work only from own_description.

For every firm write a profile. Rules:
- Use ONLY facts in own_description. Never add anything (no guessed services, no state law explanations).
- Your own plain wording. Do not copy sentences. Third person ("The firm handles...").
- Leave out all praise and marketing: "experienced", "dedicated", "top-rated", "aggressive", "zealous", "passionate", "trusted", "best outcome", awards, ratings, review scores, Super Lawyers/Avvo mentions, slogans, calls to action. Do not mention Google, Avvo, Yelp or any review site.
- Factual items are fine: years in practice, founding year, attorney names, former prosecutor, languages, free consultation, areas served, hours such as 24/7 availability.
- "description": ONE paragraph, 45-90 words (shorter if the source is thin). Start with the firm name. Say what record-clearing work it names (expungement, sealing, set-aside, pardons, etc.) and then its other practice areas and any factual extras. Vary sentence openings between firms; do not use a fixed template.
- If own_description is not actually about a law firm or attorney, or expungement is mentioned only to say the firm does NOT do it, set "skip": true with no other fields.

Output: one JSON object keyed by the firm's id (string):
{ "<id>": {
   "description": "...",
   "record_clearing_services": ["Expungement", "Record sealing", ...]  (short labels, only those named),
   "other_practice_areas": ["Criminal defense", "DUI", ...]  (max 8, only those named),
   "free_consultation": true or null,
   "languages": []  (only if stated, e.g. ["Spanish"]),
   "attorneys": ["Full Name", ...]  (only people named as attorneys),
   "founded_or_experience": string or null  (e.g. "Founded in 1998", "More than 20 years in practice"),
   "areas_served": string or null
 }, ... }

Write valid JSON (use the Write tool or a short Python script with json.dump; check it loads with python3 -c "import json;json.load(open(path))"). Save progress every ~25 firms. Every id in the input must appear in the output. Final reply: the count written and the count skipped, nothing else.
