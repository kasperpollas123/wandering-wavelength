# Brief for new guides (Nov 21 2026)

You research ONE guide topic and draft it for ExpungementAttorneys.org (free US directory of record-clearing
law firms, with state guides). Readers: ordinary people with a record, often stressed, often low income.

## Step 1: fact sheet (required, before writing)
Write scripts/research/guide_<topic>.md in the same style as scripts/research/guide_travel.md: every fact
followed by the URL of the page you actually read (statutes, court/agency pages, state legal-aid sites,
CFPB/FTC for background checks). Quote exact wording where it matters. If a page can't be read, say NOT READ.
Prefer official sources (state statutes, courts, agencies, CFPB/FTC/FCRA text). No law-firm blog claims unless
nothing else exists, and label them.

## Step 2: draft the guide as JSON
Write scripts/research/article_<topic>.json: ONE object with exactly these keys, matching the existing
entries in src/data/articles.json (read 2 of them first, e.g. how-to-get-a-copy-of-your-criminal-record and
is-a-dui-a-felony, and copy their structure and tone):
slug, title (<= 70 chars, contains the main search phrase), nav (short), description (150-160 chars),
intro ([]), lede (3-4 warm, plain paragraphs: acknowledge the reader's situation, then what the guide covers),
takeaways (4-6 bullets), sections (list of {heading, paragraphs[, bullets][, table:{columns,rows}]} with
headings phrased as QUESTIONS people search), keys (object: heading -> the one sentence to bold; must be a
sentence that appears verbatim in that section), next_steps (3-5 steps; may link /states, /free-expungement-help,
/guides, /cities paths using plain text paths), sources (list of {title, url}).
Rules: ONLY facts from your fact sheet. Never exaggerate; give ranges and "varies by state" honestly. No
mention of Google. No quiz tools. US English. Short sentences. Don't give legal advice; explain and point to
a lawyer or legal aid. Don't invent statistics. Mention the directory naturally once (find a record-clearing
lawyer in your city) and free legal aid once.
Final message: <= 200 words: the title, section headings, and any facts you could not verify.
