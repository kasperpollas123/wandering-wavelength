# Test: google/gemini-decision-1 on listings with known answers (Nov 20 2026)

Model: Google Gemini Decision 1 via OpenRouter (`POST https://openrouter.ai/api/alpha/decisions`,
body `{model, state, questions:{key:{type:'noul', instructions}}}`; answer = probability of "yes").
100 firms: the 50 whose card text was corrected on Nov 20 plus 50 random others. 250 calls, total cost $0.0048.

| Test | Right | Unsure (0.2-0.8) |
|---|---|---|
| Old card texts that wrongly said "no record clearing" -> should be NO | 50/50 | 0 |
| The corrected versions of those 50 -> should be YES | 49/50 | 1 |
| 50 normal card texts -> YES | 50/50 | 0 |
| Profile description: "says the first consultation is free?" vs our free_consultation field | 98/100 | 3 |

The 3 misses, checked by hand:
- Erase The Case and Bury Your Past: the model was RIGHT, our data field was loose. The texts only mention a free
  eligibility test and a free follow-up consultation, not a free first consultation.
- Saland Law card ("A page on New York record sealing appears on the site"): borderline; the card text is weakly
  worded (it doesn't say plainly that the firm does the work). The model flagged it at 0.26.

Conclusion: reliable enough as a cheap second check on listing text. It would have caught all 50 of the
contradictory cards before publishing. Results in results.json; script run.py.
