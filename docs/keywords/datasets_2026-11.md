# Public datasets for ExpungementAttorneys.org: what exists, what it enables

Research date: 2026-11-20. Every figure below was read on the cited page or returned by a query I ran (exact queries given). Secondary sources (news) are labelled as such.

---

## Ranking (value for the site = uniqueness x search-demand fit / effort)

| # | Source | Unique? | Demand fit | Effort | Licence |
|---|---|---|---|---|---|
| 1 | BJS *Survey of State Criminal History Information Systems, 2022* (Tables 2 and 5a) | High: per-state counts of records, records sealed and records expunged, rarely republished | Every state law page ("how many people have records in X / how many records are expunged each year") | Low (1 PDF, 2 tables) | US government work (public domain) |
| 2 | CFPB Consumer Complaint Database (API, structured fields) + **CFPB Narratives Archive** (FOIA Reading Room) | Very high: nobody publishes "complaints about background check companies reporting expunged records" | "Expunged record still showing on background check", "Checkr / First Advantage complaints" | Medium (API done below; narratives need keyword classification) | Database `_meta.license` = **CC0** |
| 3 | State agency expungement/clean-slate counts (PA AOPC county table, Illinois ISP annual reports, CA DOJ ARR county stats, KY AOC report, NJSP monthly stats) | High at county level | State + county pages, "Clean Slate in [state]" | Medium (PDF tables, yearly refresh) | Government publications (no restrictive terms seen) |
| 4 | DOJ Office of the Pardon Attorney clemency statistics + state pardon board annual reports | Medium | "Federal pardon", "how many pardons are granted" | Low | US gov (public domain); state reports public |
| 5 | Paper Prisons Criminal Records Datasets (Harvard Dataverse) | Medium (you already use their gap figures) | State "second chance gap" | Low-medium | **CC0 1.0** |
| 6 | Voting rights: Sentencing Project *Locked Out 2024*; MIDB/UMN CSV (NCSL categories); Brennan Center map (2026-09-22) | Low-medium (widely covered) | "Can felons vote in X" | Low | Varies; MIDB says "No License Provided" |
| 7 | NELP Ban-the-Box / Fair Chance guide | Low (widely copied, dated Oct 2021) | "Ban the box [state]" | Low | Text CC BY-SA 4.0 |
| 8 | CCRC Restoration of Rights Project | Reference only | High, but competitors already cite it | n/a | "All rights reserved" |
| 9 | NICCC (National Inventory of Collateral Consequences) | Reference only | Licensing / collateral consequences | n/a | "© 2026 NICCC", no download/terms found |

---

## 1. BJS Survey of State Criminal History Information Systems, 2022

- URL: https://bjs.ojp.gov/library/publications/survey-state-criminal-history-information-systems-2022 ; PDF: https://www.ojp.gov/pdffiles1/bjs/grants/309360.pdf (NCJ 309360, prepared by SEARCH for BJS, published Sept 2024; data as of 31 Dec 2022). Format: PDF tables. Survey runs every 2 years (2020, 2022), so a 2024 edition may follow.
- **Table 2, Number of subjects in state criminal history files, 2020 and 2022.** Total: 114,376,500 (2020) to **116,447,200 (2022)**; 96% automated. Examples (2022): Texas 17,772,800; California 12,200,900; Illinois 8,186,800; New York 8,159,600; Florida 7,539,000; Georgia 4,679,300; Pennsylvania 3,114,600 (-11% vs 2020); New Jersey 2,503,200 (-4%); Rhode Island 132,000 (-57%). The report text says six states (DE, MA, NJ, OH, PA, RI) and DC show an overall decrease 2020-2022. Numbers are rounded to the nearest 100 and count subjects (people), not unique living residents.
- **Table 5, Sealing/expungement procedures by state** (sealing only / expungement only / both; whether sealed records are accessible for research). 49 jurisdictions say yes; 8 sealing only, 11 expungement only, 30 both.
- **Table 5a, records sealed and expunged in 2022, by repository.** Totals: **1,190,236 records sealed** and **414,056 records expunged** in 2022 (only states that track this). Examples: sealed PA 570,701, GA 410,767, SC 43,272, UT 42,155, CA 26,182, CO 23,548; expunged TN 90,039, NC 71,591, MD 36,376, CA 30,458, IL 29,067, PA 26,588, NJ 21,584, CT 18,678, RI 11,766, KY 10,893.
- Page ideas:
  - On every state page, a "Records in [State]" box: subjects in the repository (2022), change since 2020, records sealed or expunged in 2022, and the ratio (e.g. "for every 1,000 people with a record, N records were cleared in 2022").
  - A national choropleth: "Records cleared per 1,000 record-holders, 2022", plus a sortable 50-state table. Few sites have this.

## 2. CFPB Consumer Complaint Database: complaints about background-check and tenant-screening companies

### What it contains and what changed
- Database: https://www.consumerfinance.gov/data-research/consumer-complaints/ ("generally updates daily"; CSV ZIP download + API). API: `https://www.consumerfinance.gov/data-research/consumer-complaints/search/api/v1/`. The API response `_meta` says `"license":"CC0"`, `total_record_count`: 19,316,897, last_updated 2026-11-19.
- **Narratives are no longer in the live database or API.** CFPB announcement, 14 Aug 2026: "the CFPB will cease its discretionary publication of consumers' complaint narratives and visualizations in the Database." Past narratives are treated as public domain for FOIA purposes and are being released in the FOIA Reading Room (https://www.consumerfinance.gov/about-us/newsroom/the-cfpb-to-cease-discretionary-publication-of-complaint-narratives-and-visualizations/). I confirmed this in the API code: commit `c97594f` "Remove narratives" (17 Aug 2026) in github.com/cfpb/ccdb5-api. The `field` parameter now accepts only `company` or `all` (`complaint_what_happened` returns `"is not a valid choice"`). The current bulk CSV header has no narrative column. Result: `search_term=expunged` returns 0 hits in the live API today, because text search no longer reaches narratives.
- **Narratives Archive:** https://www.consumerfinance.gov/foia-requests/foia-electronic-reading-room/cfpb-consumer-complaint-database-narratives-archive/ has 21 ZIP/CSV files (`CCDB_Export_1_December_2011_through_April_2018.zip` ... `CCDB_Export_21_August_2026.zip`, about 1.45 GB total). They include the `Consumer complaint narrative` column (consented narratives only), covering complaints received through 14 Aug 2026.
- Relevant structured fields: Product "Credit reporting or other personal consumer reports"; Sub-product **"Other personal consumer report"** (where background-check and tenant-screening reports land); Sub-issue **"Public record information inaccurate"**, "Report provided to employer without your written authorization"; Company; State; ZIP; dates; company response.

### Query 1: structured API, "Other personal consumer report" by year (top companies)
`GET .../api/v1/?size=0&date_received_min=YYYY-01-01&date_received_max=YYYY+1-01-01&product=Credit reporting or other personal consumer reports•Other personal consumer report`

| Year | Total | Top companies |
|---|---|---|
| 2023 | 2,485 | TransUnion 509, Experian 440, Equifax 370, LexisNexis 224, FNIS 91, Early Warning 82, First Advantage 57, Capital One 42, Checkr 40 |
| 2024 | 11,062 | TransUnion 2,483, Experian 2,449, Equifax 1,979, LexisNexis 769, FNIS 370, Early Warning 293, First Advantage 178, Checkr 174, Sterling 73 |
| 2025 | 18,116 | TransUnion 4,550, Experian 3,654, Equifax 2,939, LexisNexis 1,276, FNIS 758, Early Warning 547, Checkr 387, First Advantage 295 |
| 2026 (to Nov 20) | 18,807 | Experian 4,615, TransUnion 4,313, Equifax 3,857, LexisNexis 1,006, FNIS 524, Checkr 469, Early Warning 421, First Advantage 356, HireRight 123 |

(2022 returns 0 under this product label because the taxonomy changed in 2023.) All of 2023-2026 (to 2026-11-20): 50,412 complaints, 837 companies. Screening firms in that set include Checkr 1,069; First Advantage 884; HireRight 248; CoreLogic 189; Sterling 185; Entrata 165; Accurate Background 102; AppFolio 94; Vertical Screen 42; LCI Acquisition 42; Inflection.com 22; E-Backgroundchecks.com 12; Tenant Data Services 10.

### Query 2: sub-issue "Public record information inaccurate", 2023-2026
`...&date_received_min=2023-01-01&date_received_max=2026-11-20&issue=Incorrect information on your report•Public record information inaccurate` gives **62,888**: TransUnion 20,511; Experian 14,524; Equifax 14,430; LexisNexis 8,647; LCI Acquisition 682; Checkr 315; First Advantage 283; CBC 190; Contemporary Information Corp 139; CoreLogic 105; Sterling 80; HireRight 40; Accurate Background 35.

### Query 3: all complaints per screening company per year (company filter, `no_aggs=true`)
| Company | 2021 | 2022 | 2023 | 2024 | 2025 | 2026* | "Public record inaccurate" 2023-26 |
|---|---|---|---|---|---|---|---|
| Checkr, Inc | 119 | 124 | 153 | 189 | 470 | 816 | 315 |
| First Advantage Corp | 114 | 145 | 162 | 209 | 352 | 429 | 283 |
| HireRight Solutions | 29 | 31 | 34 | 32 | 92 | 127 | 40 |
| Sterling Infosystems | 34 | 46 | 50 | 80 | 77 | 27 | 80 |
| Accurate Background | 29 | 24 | 26 | 18 | 49 | 54 | 35 |
| CoreLogic Inc | 675 | 557 | 863 | 1,636 | 2,514 | 2,005 | 105 |
| Entrata Inc | 1 | 36 | 43 | 92 | 93 | 112 | 50 |
| AppFolio Inc | 9 | 12 | 42 | 56 | 57 | 46 | 17 |
| LCI Acquisition Inc | 0 | 1 | 445 | 669 | 1,199 | 1,291 | 682 |
| Contemporary Information Corp | 4 | 28 | 30 | 80 | 179 | 189 | 139 |
| LexisNexis | 1,574 | 2,150 | 4,393 | 10,072 | 19,523 | 34,258 | 8,647 |
*2026 = 1 Jan to 20 Nov.

### Query 4: narrative text search in the FOIA Narratives Archive (all 21 files, downloaded and scanned locally)
- 3,851,415 consented narratives in total (e.g. 2023: 487,410; 2024: 814,385; 2025: 1,222,050; 2026: 121,394 through mid-Aug).
- Regex `\bexpun(g|ct)` OR sealed/sealing near record/case/conviction/arrest/charge: **3,107 unique complaints.** Many are noise, e.g. "expunge the inquiry/charge-off" in credit-repair template letters.
- Tight filter (the expunge/seal word within 200 characters of criminal|arrest|convict|misdemeanor|felon|DUI|DWI|background check/report/screen|evict|court record/case): **173 complaints**. By year: 2015 6, 2016 1, 2017 6, 2018 10, 2019 12, 2020 6, 2021 11, 2022 13, 2023 21, 2024 31, **2025 47**, 2026 9 (partial year). 39 of the 173 concern sealed or expunged **eviction** records. In a manual check of 8 random hits, 6 were about expunged or sealed criminal or eviction records still being reported. Treat the count as approximate (about 75% precision).
- By company (tight set): Experian 25, TransUnion 23, **Checkr 23**, Equifax 20, **First Advantage 17**, National Credit Systems 5, LexisNexis 5, Kimball Tirey & St. John 4, Sterling 3. By sub-product: "Other personal consumer report" 76, "Credit reporting" 49, "Rental debt" 17.
- Caveat: narratives are published only when the consumer consented, so these counts are a lower bound. The real volume is in the structured "Public record information inaccurate" counts above.
- Page ideas:
  - **"Background check companies that report expunged records: CFPB complaint tracker"**: a chart of Checkr, First Advantage, HireRight, Sterling and LexisNexis complaints per year (Query 3), with the public-record sub-issue share and anonymised quotes from archived narratives. Each quote should link to its CFPB complaint ID.
  - **"What to do if an expunged record shows up on a background check"** (FCRA dispute guide), with data callouts and per-company pages ("Checkr expunged record dispute") for long-tail demand. A tenant-screening and sealed-evictions spin-off (Entrata, AppFolio, CoreLogic, National Credit Systems) is also possible.

## 3. State court and agency statistics on expungement, sealing and clean slate

| State | Source and URL | What it contains | Freshness / format |
|---|---|---|---|
| Pennsylvania | AOPC "Processed Clean Slate Counts By County": https://www.pacourts.us/Storage/media/pdfs/20220615/201741-countyprocessedcleanslatenumbers.pdf | Per county: non-conviction cases and offenses, summary, misdemeanor and felony conviction cases sealed, and limited-access petitions granted. Statewide totals: **57,468,009 cases / 82,061,489 offenses** sealed, 28 Jun 2019 to 16 Jan 2026 (e.g. Philadelphia 2,404,975 non-conviction cases; Allegheny 2,878,756) | Updated in place (current file runs to Jan 2026); PDF |
| Illinois | ISP Expungement Backlog Accountability reports (20 ILCS 2630/14): https://isp.illinois.gov/StaticFiles/docs/Identification/ExpungeStatsFY26.pdf (FY16 to FY26 on https://isp.illinois.gov/BureauOfIdentification/Expungements) | FY26: petitions to expunge received 9,984; to seal 2,192; orders to expunge received 16,364, entered 17,552; orders to seal received 7,061, entered 3,376; backlog 1,292; fees $336,169.92. FY25: expunge orders entered 15,553, seal orders entered 10,748, backlog 1,631. FY24: 17,482 / 8,380 / 2,508 | Annual; PDF (11-year series) |
| California | DOJ Automatic Record Relief (AB 1076) county stats on OpenJustice, e.g. https://data-openjustice.doj.ca.gov/sites/default/files/dataset/2024-07/arr-mandated-stats-2023.pdf ; statute page https://oag.ca.gov/fingerprints/automatic-record-relief-penal-code-sections-851.93-and-1203.425 | Per county: arrests relieved (PC 851.93), convictions relieved (PC 1203.425), convictions prohibited, % of arrests without disposition (e.g. Alameda 2023: 47,338 arrests, 2,623 convictions, 18.2%). AG demographics report: 6,861,324 individuals and 11,876,503 events relieved, 1 Jul 2022 to 31 Dec 2023 (https://www.oag.ca.gov/system/files/media/AB1076-Demographics-Report.pdf) | Annual, required by statute; PDF. A 2024/2025 file was not located (a secondary source, Davis Vanguard, cites 752,000 arrests and 138,000 convictions cleared in 2025) |
| Kentucky | AOC Research and Statistics, "Expungement Documents Entered 1/1/2021-12/31/2025 Statewide" (26_RS6007, 24 Mar 2026): https://www.kycourts.gov/AOC/Information-and-Technology/Analytics/Custom%20Reports/Expungement_Documents_Entered_CY_21-25_Statewide.pdf | Petitions/applications vs orders granted/denied by process type (felony KRS 431.073, misdemeanor 431.078, automatic 431.076), per calendar year, by gender and race, maps by county | Ad hoc report, PDF. Table numbers are in graphics that did not text-extract, so they need manual transcription |
| New Jersey | NJSP Expungement Unit monthly statistics (settlement in *A.A. v. Callahan*, 18 months of public reports), e.g. https://www.nj.gov/njsp/eu/pdf/June_2025_Expungement_Monthly_Stats.pdf ; index https://nj.gov/njsp/eu/index.shtml | Orders received and processed, backlog (search snippets: July 2025, 803 orders received; YTD June 2025, 5,144) | Monthly PDFs (2025); site blocks scripted download, so the numbers here are from search snippets |
| Michigan | No public MSP dataset found. Figures come via FOIA and press: 1,578,501 people with convictions automatically set aside since 11 Apr 2023 (Bridge Michigan, citing MSP: https://bridgemi.com/michigan-government/nearly-1-6m-criminal-records-cleared-under-michigan-clean-slate-law/); first 8 days 1,195,368 convictions | Secondary; a FOIA request to MSP would give a unique dataset |
| Utah | BCI clean slate page https://bci.utah.gov/clean-slate-expungement ; 2024 UCJIS TAC presentation: 474,480 orders received, backlog 227,349 as of 1 Sept (2024) | Presentation PDF; no annual series found |

- Page ideas:
  - **"Clean Slate scoreboard"**: states with automatic clearing and their latest official totals (PA 57.5M cases, CA 6.86M people in 18 months, MI 1.58M convictions, plus BJS 2022 sealed/expunged counts), each with source and as-of date.
  - **County pages for PA and CA** ("Expungement in Allegheny County: 2.9M non-conviction cases sealed under Clean Slate"), and an Illinois "processing backlog" trend chart covering FY16-FY26.

## 4. Pardons

- **DOJ Office of the Pardon Attorney, Clemency Statistics**: https://www.justice.gov/pardon/clemency-statistics ("Updated January 23, 2025"). HTML tables by fiscal year from 1900 onward: petitions pending, received, granted (pardon, commutation, remission), denied, and closed. Biden FY2021-FY2025: pardon petitions granted 80 (incl. 55 in FY2025, 3.5 months), commutations 4,165; pardon petitions received 1,666. Trump first term FY2017-2021: pardons granted 144, commutations 94. Obama FY2009-2017: pardons 212, commutations 1,715. Pardon petitions received per year (P): 2022 259, 2023 380, 2024 466. No second-Trump-term data on the page. A separate page covers 2009-2025: https://www.justice.gov/pardon/past-clemency-action-and-statistics.
- **State pardon boards** (annual reports, PDF): Georgia State Board of Pardons and Paroles annual report FY2025, https://pap.georgia.gov/document/document/pardons-paroles-ar-2025-d12-1pdf/download (search snippet: 436 pardons and restorations of rights granted in FY2025, 10 fewer than the prior year; verify in the PDF). Pennsylvania Board of Pardons statistics hub, https://www.pa.gov/en/agencies/bop/about-the-board/about-statistics.html ("Clemency Statistics by Year, 1999 to Present"; the subpage URL I tried returned 404). CCRC's 50-state pardon chart for comparison (reference only, see §8).
- Page ideas: "Federal pardon odds: petitions received vs granted, 1900-2025" (long time-series chart), and a state "pardon grant rate" table built from each board's annual report (GA, PA, AL, CT, etc.).

## 5. Paper Prisons Initiative data

- Site: https://paperprisons.org/states.html. Reports completed for 18 states (CO, CT, DE, IL, KY, LA, MA, MD, MN, MO, NC, NY, OK, OR, SC, TX, WA, WV), each as a summary and PDF.
- **Dataset:** "Paper Prisons Criminal Records Datasets", Harvard Dataverse doi:10.7910/DVN/IJKOQV, released 2024-10-15, **licence CC0 1.0** (from the Dataverse API). The latest version lists the file `North_Carolina_Criminal_Records.tab` (13 MB). Code: GitHub second-chance-scripts.
- Page idea: NC deep-dive (eligibility by offence type or county) on the CC0 file. The CC0 licence also confirms you can republish their numbers with attribution as a courtesy.

## 6. Voting rights restoration

- The Sentencing Project, *Locked Out 2024*: https://www.sentencingproject.org/reports/locked-out-2024-four-million-denied-voting-rights-due-to-a-felony-conviction/. About 4 million disenfranchised (1 in 59 adult citizens, 1.7%); state-level estimates in the PDF.
- MIDB / UMN Healthy Communities Data Portal, "Felony Disenfranchisement by State" (NCSL four categories, 2024): https://midb.uspatial.umn.edu/hcdp/dataset/felony-disenfranchisement-by-state. CSV `felonydisenfranchisement_states_2024.csv`; updated 2026-04-14; "No License Provided".
- Brennan Center criminal disenfranchisement map (2026-09-22 PDF): https://www.brennancenter.org/media/16215/download/2026.09.22-bc-criminal-disenfranchisement-laws-map_0.pdf. 2026 changes reported by Stateline: Virginia (from 15 Sept 2026), Missouri (from 28 Aug 2026), Tennessee (https://stateline.org/2026/10/28/voters-with-felony-convictions-face-new-rules-in-several-states-for-the-midterms/).
- Page idea: a "Voting after a conviction in [State]" box on each state page, showing category, people disenfranchised (Sentencing Project) and whether expungement or pardon restores rights.

## 7. Ban-the-box / fair chance hiring

- NELP: https://www.nelp.org/ban-the-box-fair-chance-hiring. 37 states, DC and over 150 cities and counties; 15 states cover private employers; 22 cities and counties extend to private employers. The guide PDF is dated **Oct 2021**. Licence: nelp.org text is **CC BY-SA 4.0**.
- Page idea: "Fair chance hiring in [State]" table (public vs private employers, local ordinances). Needs a 2022-2026 update (e.g. Texas 2025, Philadelphia 2025 amendments, per secondary sources).

## 8. CCRC Restoration of Rights Project (reference, not reusable data)

- https://ccresourcecenter.org/restoration-2/. State profiles plus 50-state comparison charts: civil/firearms rights, pardon policy, expungement and sealing, marijuana, employment/licensing/housing, sex-offense registration.
- Footer: "Copyright © 2026 Collateral Consequences Resource Center. All rights reserved." No open licence. Use it for fact-checking and links only; do not copy the charts. Ask permission if needed.

## 9. NICCC (National Inventory of Collateral Consequences of Conviction)

- https://niccc.nationalreentryresourcecenter.org/ (hosted by CSG Justice Center / National Reentry Resource Center, originally built by the ABA with NIJ funding). More than 44,000 consequences across all US jurisdictions; each entry states the session or year it is current through.
- Help page: no download, export or terms of use statement; footer "© 2026 National Inventory of Collateral Consequences of Conviction". No bulk download found. Use it as a cited reference (e.g. counts of licensing consequences per state looked up manually), or contact them for data access.

---

## Other notes
- NCSC "Tracking state record relief activities" (interactive map of legislation, research and barriers by state): https://www.ncsc.org/resources-courts/tracking-state-record-relief-activities. Useful for finding more state data sources.
- Low-effort, high-uniqueness idea: FOIA or public-records requests to state repositories for annual sealed/expunged counts (MI State Police, UT BCI, NJ Judiciary). A yearly "State of Record Clearance" report built on BJS Table 5a plus these would be original research that attracts links.
- Working files: API outputs and narrative-match JSON are in `/tmp/claude-0/-home-user/ae288a96-7fc4-5aa5-b4c4-ca3f1f3d7087/scratchpad/exp/kw/` (`opr_*.json`, `pub_all.json`, `screen_table.txt`) and `/tmp/claude-0/-home-user/ae288a96-7fc4-5aa5-b4c4-ca3f1f3d7087/scratchpad/exp/` (`matched.json` = 3,107 broad matches, `tight.json` = 173 tight matches with complaint IDs and text).
