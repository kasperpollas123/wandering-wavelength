# How the attorney profiles and free-help listings were made

1. `fetch_sites.py` and `bfetch.js` download each attorney's own website (home page plus
   pages about expungement or the firm). `bfetch.js` uses a real browser for sites that block plain requests.
2. `write_desc.py` gives that text to a language model with strict rules: only facts from the
   website, own wording, no praise words. Output goes to `src/data/attorneyProfiles.json`.
3. `clinics.py` searches for free record-clearing help per state, has a model extract the
   organisations from the pages found, and checks every link loads. Output: `src/data/freeHelp.json`.
4. `assemble.py` validates and writes both data files.

The scripts expect API keys for OpenRouter and Exa (paths at the top of each file) and were
run from a scratch folder, so paths need adjusting before a re-run.

## November 2026 expansion

About 700 firms were added. Most came from a business-listings search for US law firms whose
own description names expungement or record sealing; their profiles were rewritten from that
description under the rules in `profile_brief_2026-11.md`. About 120 more were found by searching
thin cities and opening each firm's own expungement page. `merge_2026-11.py` shows how the
results were combined. Eight firms whose websites had disappeared were moved to `removed_listings.json`.
