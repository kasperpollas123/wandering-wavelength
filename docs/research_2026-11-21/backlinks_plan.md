# ExpungementAttorneys.org: Backlink Prospecting Plan

Research date: 2026-11-20. Web research only. Nobody was contacted and nothing was sent.
Input: `competitor_referring_domains.json` (referring domains of recordgone.com, ccresourcecenter.org, easyexpunctions.com, expungement.com, cleanslateinitiative.org, legalaidnc.org).

**Verification rule used here:** every URL below either loaded with WebFetch during this session ("verified") or appeared as a search result ("seen in search"). URLs for our own site are given only where the owner supplied them (`/guides/expungement-cost-by-state`, `/free-expungement-help`). Other assets are named by title only, with no invented paths.

**Tool limits:** the Semrush backlink reports were unavailable because the account has no API units left. Ubersuggest's backlink lookup returned no rows. So I could not pull the exact linking URL for each referring domain. I worked backward through site searches and page fetches instead. Where I found the real linking page, it is marked as **CONFIRMED LINK**. Where I could only find the page type the domain uses for these links, it is marked as **page type only**.

---

## 1. How the real linkers link: 15 domains examined

| # | Referring domain → competitor | Page found | Page type | Why it links / what it tells us |
|---|---|---|---|---|
| 1 | ma4jr.org → ccresourcecenter.org | https://ma4jr.org/ (verified; "Websites of Interest" section) | **CONFIRMED LINK.** Advocacy org's "websites of interest" link list | Maryland Alliance for Justice Reform is an all-volunteer group. It says it "cannot provide legal advice" and sends visitors to outside sites. A "where to get help" list like this is a natural place for a free attorney directory plus a legal aid page. |
| 2 | nacdl.org → ccresourcecenter.org, cleanslateinitiative.org | https://www.nacdl.org/Content/ClemencyandExpungementResources (verified) | **CONFIRMED LINK.** National bar association's curated resource list | Links CCRC's 50-state comparisons, NCSC record-relief guides, Clean Slate Initiative, and state clinics. Shows that 50-state reference tables earn links. **Hard prospect, because NACDL hosts its own "National Expungement Service Directory" and lawyer finder.** |
| 3 | paperprisons.org → cleanslateinitiative.org | https://www.paperprisons.org/states.html (verified) | **CONFIRMED LINK.** Research-project partner logo | Partner/collaborator link. Not open to us, but Paper Prisons (Santa Clara Univ.) is a data-journalism ally: see §3. |
| 4 | easyexpunctions.com ← Texas nonprofit (kera.org / sanantonioreport.org are in our data; this is the same Texas ecosystem) | https://texasappleseed.org/blog/sealing-and-expunction-process-texas-resources-those-seeking-relief (verified) | **CONFIRMED LINK.** Nonprofit blog post "resources for those seeking relief" | Texas Appleseed links a **commercial** service ("For a more cost-efficient option than hiring an attorney, consider Easy Expunctions"). It also links TexasLawHelp's "Working with Private Attorneys" page. **This is the key precedent: advocacy orgs will link paid and private options in a section titled "Self-Representation, Private Attorneys, and Alternate Avenues."** |
| 5 | unc.edu → ccresourcecenter.org / legalaidnc.org | https://www.sog.unc.edu/resources/microsites/relief-criminal-conviction (verified) | **Page type only.** University School of Government legal-reference microsite | Links NC Justice Center's expunction summary and ncsecondchance.org. UNC SOG writes for court officials and clerks. Low odds for a commercial directory, but its blog (nccriminallaw.sog.unc.edu) cites data. |
| 6 | duke.edu → legalaidnc.org | https://law.duke.edu/news/duke-law-students-help-trosa-residents-expunge-criminal-records-make-new-start (verified) | **Page type only.** Law-school news story about an expunction clinic | Names Legal Aid NC, but the version I fetched has no hyperlink. Law-school clinic and news pages cite partners. Pitch the clinic about **our free-help page**, not the directory. |
| 7 | cornell.edu → recordgone.com | https://cjei.cornell.edu/fix-your-record/sealing-and-expungement (verified) | **Page type only.** University "Criminal Record Online Toolkit" (ILR School, CJEI) | Links NELP and the Clean Slate Clearinghouse. Says "talking to a lawyer can help," but has no lawyer-finding resource. **That is a gap we can fill.** The recordgone link (23 backlinks) is probably on a state sub-page of the toolkit, which I could not confirm. |
| 8 | cuny.edu → ccresourcecenter.org | https://hostos.cuny.edu/Administrative-Offices/Office-of-Academic-Affairs/Offices-and-Special-Programs/Career-Services-Office/Students/Employment-Readiness/Background-Check-and-Convictions (verified); https://www.cuny.edu/civics/support-student-conviction-records/ (verified) | **Page type only.** College career-services "background checks and convictions" page; university system's justice-impacted student hub | Both link background-check guides (John Jay IJO "Getting the Record Straight") and the NRRC collateral-consequences database. **Best fit for our "how to get a copy of your criminal record" guide and the background-check CFPB tracker.** |
| 9 | cuny.edu (Lehman) | https://www.lehman.cuny.edu/reentry/resources (verified) | **Page type only.** College reentry-program resource list | Has a "Legal Services" section with sealing fact sheets and a NYCLU link. Directly analogous. |
| 10 | mitchellhamline.edu → ccresourcecenter.org | https://mitchellhamline.edu/self-help-clinic/ (verified) | **Page type only.** Student-run pro se expungement clinic page | Clinics refer out clients they cannot take, such as people over the income limit or with complex cases. **A "can't help you? here are attorneys" referral is our angle.** |
| 11 | berkeley.edu → ccresourcecenter.org | no berkeley.edu linking page found; related: https://ebclc.org/get-help/criminal-records-services/clean-slate-referrals/ (verified) | **Page type only.** Clinic "Clean Slate referrals" page (EBCLC is Berkeley Law's community clinic) | Referral page lists the public defender, Bay Area Legal Aid, and court links. A referral-page type that fits us. |
| 12 | stanford.edu → easyexpunctions.com | not found (site: search returned no Stanford page); related: https://law.stanford.edu/community-law-clinic/post-conviction-relief/ (seen in search) | **Page type only.** Law-school clinic program page | The link is probably in a Stanford Legal Design Lab / justice-tech research page. Unconfirmed. |
| 13 | orangecountync.gov → legalaidnc.org | https://orangecountync.gov/2301/Restoration-Legal-Counsel (verified) | **Page type only.** County criminal-justice-resource department program page | Links UNC SOG guide, CCAT tool, NC Justice Center summary, and Duke and SSRN research. **County pages link data and research, not vendors.** |
| 14 | nc.gov family (ncleg.gov) → legalaidnc.org | https://sites.ncleg.gov/library/g-legal-help/ (verified) | **CONFIRMED LINK** (to legalaidnc.org). State legislative library "Legal Help" directory | Lists legal aid, law-school clinics, lawyer-referral services ($50 consult), and public law libraries. **It includes paid lawyer-referral services, so a "find a lawyer" category exists on .gov pages.** |
| 15 | dconc.gov (Durham County; same NC county-gov pattern as orangecountync.gov and madisoncountync.gov) | https://dconc.gov/county-departments/departments-a-e/clerk-of-superior-court/expunctions-faq (verified) | **Page type only.** Clerk of Superior Court expunction FAQ | Links the NC Pro Bono Resource Center and the **NC Bar Lawyer Referral Service**. Shows the clerk-page pattern: official forms, legal aid, and a bar lawyer referral. |
| 16 | lawhelpnc.org / legalaidnc.org target | https://legalaidnc.org/resource/criminal-record-expunction/ (verified) | Link target. What gets linked is a plain-language, free, state-specific FAQ with links to forms | **This is the model for what earns .gov and .edu links: one free, state-specific explainer per state, not a directory home page.** |

Domains in the data that I could not tie to a page: ncdps.gov (its reentry pages did not surface), madisoncountync.gov, cmlibrary.org, legalhelp.us, and ncjustice.org (its `/expunction-clearinghouse` URL returned 404). legalhelp.us turned out to be a general legal-explainer content site, not a legal aid portal, so it is a low-value prospect.

### Patterns
1. **Links go to the most specific, free, state-level page**, such as Legal Aid NC's FAQ, CCRC's 50-state comparison, or a clinic page. Nothing in this research shows anyone linking a directory home page.
2. **Resource lists already include "find a lawyer" slots.** Examples: the NC legislative library, the Durham clerk page, Texas Appleseed, and TexasLawHelp. Those slots usually hold bar referral services. A free directory can be pitched as the free complement for people over legal-aid income limits.
3. **Data earns links from research and policy pages.** Examples: CCRC's 50-state tables on NACDL, and the NC Justice Center summaries on county pages. Our cost table and BJS figures are the assets of this kind.

---

## 2. Prospect categories (ranked)

Population estimates are rough. Sources are cited where I have them; the rest are my own estimates.

### Category 1: County and state law library research guides (LibGuides and self-help pages)
- **How many:** about 50 state law libraries plus a few hundred county public law libraries (CA alone has one per county; OH, TX, and PA have many). Roughly **200–400** have an expungement guide. Estimate.
- **Examples (verified):**
  - Texas State Law Library, Expunctions & Nondisclosure: https://guides.sll.texas.gov/expunctions-and-non-disclosure. Lists Texas Fair Defense Project, UT expunction project, Clean Slate Texas, and the Georgetown eligibility tool.
  - San Diego Law Library, "How to Clean Up Your Criminal Record": https://sdlawlibrary.libguides.com/c.php?g=1290767. Links courts, CA DOJ, the State Bar member search, and Nolo dictionary entries, so it already links commercial reference sites.
  - Franklin County (OH) Law Library expungement guide: http://fclawlib.libguides.com/expungement (internal tabs only; a gap)
  - Sacramento County Public Law Library, "Clearing Your Criminal Background": https://saclaw.org/resource_library/clearing-your-criminal-background. Tells readers to consult "an attorney who specializes in criminal record clearing" but links none. **Exact gap.**
  - Alameda County Law Library 2025 Quick Resource Guide (PDF, seen in search): https://lawlibrary.alamedacountyca.gov/wp-content/uploads/2025/09/2025-Quick-Resource-Guide-Clean-Slate-and-Reentry.pdf
- **Our best page:** the state page for the library's state, which lists attorneys and BJS data, plus `/free-expungement-help` for that state.
- **Pitch angle:** "Your guide recommends consulting an attorney who handles record clearing but has no link for finding one. Our [State] page lists N local record-clearing firms for free, and our free-help page lists the legal aid programs first." Law librarians value neutral, current, and sourced, so lead with how often the page is updated and where the data comes from.

### Category 2: University reentry, justice-impacted student, and career-services pages
- **How many:** about 25 CUNY campuses alone. Nationally, **several hundred** colleges have justice-impacted student programs (Project Rebound in the CSU system, the Second Chance Pell sites, which number around 200), plus career-services pages on background checks. Estimate.
- **Examples (verified):**
  - Hostos CC, Background Check and Convictions: https://hostos.cuny.edu/Administrative-Offices/Office-of-Academic-Affairs/Offices-and-Special-Programs/Career-Services-Office/Students/Employment-Readiness/Background-Check-and-Convictions
  - CUNY, Support for Students with Conviction Records: https://www.cuny.edu/civics/support-student-conviction-records/
  - Lehman College Reentry resources: https://www.lehman.cuny.edu/reentry/resources
  - Cornell CJEI Criminal Record Online Toolkit: https://cjei.cornell.edu/fix-your-record/sealing-and-expungement
- **Our best pages:** the every-state **"How to get a copy of your criminal record"** guide (career services tells students to "know what's on your record"), the **CFPB background-check complaints tracker** (Checkr, HireRight, Sterling, First Advantage are the screeners these students will face), and `/free-expungement-help`.
- **Pitch angle:** "Your students face Checkr and HireRight screens. Our free guide shows how to pull your own record in every state, and our tracker shows the complaint trends against those screeners." There is no lawyer pitch in this one.

### Category 3: County public defender and court "Clean Slate" program pages
- **How many:** about 1,000 public defender offices nationally. Estimate; BJS counted 957 in its last census of public defender offices. In California, most of the 58 counties run a Clean Slate program. Plus court self-help centers.
- **Examples:**
  - SF Public Defender Clean Slate, with a "Resources" section linking H.I.R.E. Clearinghouse and Root & Rebound: https://sfpublicdefender.org/clients/clean-slate/ (verified)
  - Durham County Clerk Expunctions FAQ, which links a bar lawyer referral: https://dconc.gov/county-departments/departments-a-e/clerk-of-superior-court/expunctions-faq (verified)
  - Orange County NC Restoration Legal Counsel: https://orangecountync.gov/2301/Restoration-Legal-Counsel (verified)
  - Fresno County PD "Helpful Links" (seen in search): https://www.fresnocountyca.gov/Departments/Public-Defender/Helpful-Links?oc_lang=lo
  - Marin County PD Clean Slate (seen in search): https://www.marincounty.gov/departments/public-defender/clean-slate
- **Our best pages:** the **50-state cost table** (`/guides/expungement-cost-by-state`, citable for fee waivers and cost context) and `/free-expungement-help`.
- **Pitch angle:** PDs cannot take people charged elsewhere, and they cannot take complex out-of-county matters. Many pages already link to "out of county offices." Offer our free-help page for **other states**, for people with out-of-state records. **Lowest odds for the attorney directory itself.** Pitch the cost data and the free-help page only.

### Category 4: Public library reentry and "clean your record" pages
- **How many:** about 9,000 US public library systems (IMLS). Probably **low hundreds** have reentry or expungement pages, and the number is growing because of library expungement clinics. ULC features LA County's clinic model. Estimate.
- **Examples (verified):**
  - Howell Carnegie District Library (MI), Criminal Record Expungement Resources: https://howelllibrary.org/criminal-record-expungement-resources/. A pure outside-link list of about 12 entries, including a Michigan Works expungement form.
  - Denver Public Library, "Obtaining, Checking and Cleaning up Your Criminal Record": https://www.denverlibrary.org/your-criminal-record. Covers CBI record copies only and has no legal-help link.
  - South Carolina State Library reentry LibGuide: https://guides.statelibrary.sc.gov/institutional-libraries/reentry. A guide for librarians serving reentry populations, which multiplies reach.
  - WebJunction (OCLC), "Legal expungement assistance by state": https://www.webjunction.org/news/webjunction/legal-expungement-assistance-by-state.html. A national state-by-state list written by librarians for librarians, with **no national directory included**.
  - LA County Library expungement clinics: https://lacountylibrary.org/clean-your-record/ (program page, few outside links)
- **Our best pages:** **"How to get a copy of your criminal record" (every state)** for Denver-type pages, and `/free-expungement-help` for Howell- and WebJunction-type lists.
- **Pitch angle:** "Patrons ask how to get their own record. Here is a one-page answer for every state." WebJunction and the SC State Library are **multipliers**, because librarians copy their lists.

### Category 5: Reentry councils, county reentry offices, and reentry coalition resource lists
- **How many:** state reentry councils in most states, plus hundreds of county and city reentry coalitions and offices. Estimate: **300–600**.
- **Examples:**
  - Pinellas County (FL) Re-Entry Resources: Court, Records, Probation and Legal: https://pinellas.gov/re-entry-court-probation-and-legal-resources/ (verified; links Florida Justice Center sealing, Gulf Coast Legal Services, clerk self-help)
  - Redefine Alliance Workshop (LA) Re-Entry Resources, "Record Expungement" section with six entries: https://redfworkshop.org/re-entry-resources/ (verified)
  - Cuyahoga County Office of Reentry, Legal Assistance (seen in search; fetch returned 503): https://cuyahogacounty.gov/topics/legal-assistance-for-those-reentering-the-community
  - LA County DMH Re-entry resources: https://dmh.lacounty.gov/our-services/ee/resources/re-entry-legal/ (verified; points to a separate legal-resources page)
- **Our best pages:** the state page (BJS sealed/expunged data plus local firms) and `/free-expungement-help`.
- **Pitch angle:** "Your Legal section lists free help. For people over the income limit, our state page lists local record-clearing attorneys with no lead-gen paywall, and the free-help page lists every legal aid program in the state."

### Category 6: Consumer-protection, tenant-screening, and fair-housing organizations
- **How many:** about 200 HUD FHIP fair housing organizations, plus consumer law groups (NCLC, state consumer advocates) and tenant unions. Estimate.
- **Examples (verified or seen):**
  - NCLC Tenant Screening hub: https://www.nclc.org/topic/tenant-screening/ (verified; publishes "Zombie Records" on expunged records still appearing in reports and "Broken Records Redux" on background-check company errors)
  - Equal Rights Center criminal-records fair-housing toolkit (seen in search): https://equalrightscenter.org/wp-content/uploads/cr-toolkit-v4.pdf
  - Fairfax County Human Rights fact sheet (seen in search): https://www.fairfaxcounty.gov/humanrights/sites/humanrights/files/Assets/Housing/Fact%20Sheet%20-%20Fair%20Housing%20and%20Criminal%20Record%20Screenings.pdf
- **Our best page:** the **CFPB background-check complaints tracker**. It is directly on NCLC's beat.
- **Pitch angle:** data, not directory. "We track monthly CFPB complaints against Checkr, HireRight, Sterling, and First Advantage, broken down by issue. Here is the trend chart if it is useful for your next report." Offer CSV access.

### Category 7: Workforce boards, American Job Centers, and fair-chance employer resources
- **How many:** about 2,400 American Job Centers (DOL) under roughly 550 local workforce boards. Only a minority offer expungement help: a NAWB survey found 11% of respondents provide expungement services (https://nawb.org/wp-content/uploads/2024/12/Reentry-Report-PDF.pdf, seen in search).
- **Examples:**
  - San Diego Workforce Partnership Clean Slate Clinic event: https://workforce.org/events/sd-clean-slate-clinic/ (verified). The San Diego Law Library also links SDWP "Reentry Works."
  - Maryland Re-Entry Initiative (AJC offering "access to expungement information" with **no link**): https://labor.maryland.gov/employment/reentry.shtml (verified; a gap)
  - Nebraska DOL Reentry Services (no legal links): https://dol.nebraska.gov/ReemploymentServices/JobSeekerResources/ReentryServices (verified; a gap)
  - CareerOneStop "Expunging a criminal record" page (seen in search; host blocked from this session): https://cloudfront.careeronestop.org/JusticeImpacted/FindAJob/PrepareYourResume/expunging-a-criminal-record.aspx
- **Our best pages:** the record-copy guide and the state page.
- **Pitch angle:** "Your page promises expungement information but doesn't link any. Here are our free state guide and a list of legal aid programs." Expect slow responses because these are government pages. Employer-side toolkits (NELP: https://nelp.org/explore-the-issues/workers-with-records/resources-for-employers, verified) have **no record-clearing links**, so pitch NELP the CFPB tracker, not the directory.

### Category 8: Nonprofit advocacy resource posts that already list private options
- **How many:** dozens of state Appleseed chapters, ACLU affiliates, Clean Slate state campaigns, and justice-reform groups.
- **Examples (verified):**
  - Texas Appleseed resources post, which links Easy Expunctions (commercial) and TexasLawHelp "Working with Private Attorneys": https://texasappleseed.org/blog/sealing-and-expunction-process-texas-resources-those-seeking-relief
  - Maryland Alliance for Justice Reform, "Websites of Interest": https://ma4jr.org/
  - NACDL Clemency & Expungement Resources: https://www.nacdl.org/Content/ClemencyandExpungementResources (competes with us, so low odds)
- **Our best pages:** the state page and the 50-state cost table.
- **Pitch angle:** "Your post already has a 'private attorneys' section. Ours is a free, non-paywalled list of firms in [state] that actually do record clearing, next to our legal-aid list."

### Category 9 (opportunistic): law-school expungement clinics
- **How many:** 197 ABA-accredited law schools. Probably 80+ run expungement clinics or pro bono projects. Estimate.
- **Examples:** Mitchell Hamline Self-Help Clinic: https://mitchellhamline.edu/self-help-clinic/ (verified); Duke Law TROSA clinic news: https://law.duke.edu/news/duke-law-students-help-trosa-residents-expunge-criminal-records-make-new-start (verified); EBCLC Clean Slate referrals: https://ebclc.org/get-help/criminal-records-services/clean-slate-referrals/ (verified).
- **Pitch:** "For people you have to turn away (over the income limit or complex cases)." Low volume but high authority. Expect few yeses.

---

## 3. Data-journalism angles

### Asset ranking for earned media
1. **CFPB complaints tracker for background-check companies.** This is the strongest asset, and there is proof that reporters want it. Atlanta News First Investigates (reporter Anastassia Olmos, Feb 2026) built a story on CFPB complaint counts against HireRight: about 30 per year in 2023 and 2024, rising to about 90 in 2025. https://www.atlantanewsfirst.com/2026/02/05/single-mom-loses-six-figure-job-after-alleged-background-check-errors/ (verified). The CFPB has a history of enforcement against screeners: GIS in 2015, Sterling in 2019 (search snippets put the settlement at $8.5M; not checked against the CFPB order), and a name-matching advisory opinion (https://www.consumerfinance.gov/about-us/newsroom/cfpb-takes-action-to-stop-false-identification-by-background-screeners, seen in search).
   - **Hooks:** "Complaints about [company] up X% year over year." "Top complaint: records that should have been sealed or expunged still reported," which ties directly to NCLC's "Zombie Records" research. Run per-state breakdowns for local TV investigative teams.
   - **Do first:** publish a stable, citable methodology note (CFPB Consumer Complaint Database, product = "Credit reporting... / other personal consumer reports," company filters, date pulled) and a downloadable CSV. Reporters will not cite a chart they cannot verify.
2. **50-state expungement cost table** (`/guides/expungement-cost-by-state`). The cost of record clearing is a recurring story. Examples: Stateline, "High fees, long waits cast shadow over new criminal expungement laws" (https://stateline.org/2023/11/28/high-fees-long-waits-cast-shadow-over-new-criminal-expungement-laws/, seen in search; syndicated to Maryland Matters, Virginia Mercury, NJ Monitor, Louisiana Illuminator, Michigan Advance, Route Fifty); The Marshall Project's 2016 "Want to Clear Your Record? It'll Cost You $450" (Maura Ewing); and the Center for American Progress on fines and fees (https://www.americanprogress.org/article/fines-and-fees-are-a-barrier-to-criminal-record-clearing/, seen in search). The Marshall Project data is 10 years old, so **a current table is a legitimate update story.**
   - **Hooks:** "Most and least expensive states to clear a record (2026)." "States with fee waivers versus states without." Pair with attorney-fee ranges from our directory. Label those as listed or typical, never as quotes.
3. **BJS 2022 records sealed/expunged per state.** Useful for per-capita comparisons, such as "State X sealed N records per 100k residents." Pairs well with Paper Prisons' "second chance gap" (https://paperprisons.org/PaperPrisons.html, seen in search). Pitch to state-level nonprofit newsrooms when a Clean Slate law takes effect. Upcoming pegs: Virginia (effective July 1, 2026, AP via Washington Times, seen in search), Illinois (signed Jan 16, 2026, with sealing starting 2029: WTTW and NPR Illinois, seen in search), pending Rhode Island H 7508 and Massachusetts S.1114 (seen in search).
4. **DUI-felony by state.** Useful for evergreen local "is a DUI a felony in [state]" explainer reporting. Lower news value.

### Outlets and beats covering record clearing (outlets and public bylines only; no private contact info)
| Outlet | Beat / evidence |
|---|---|
| **Stateline** (States Newsroom) and its state affiliates (Maryland Matters, Virginia Mercury, NJ Monitor, Michigan Advance, Louisiana Illuminator, etc.) | State policy and criminal justice; ran the expungement-fees story that was syndicated statewide (seen in search). **Best single target for the cost table.** |
| **The Marshall Project** | Criminal justice; keeps an `expungement` tag (themarshallproject.org/tag/expungement, seen in search; fetch blocked). Already in ccresourcecenter's linkers (13 links). |
| **Bolts** (boltsmag.org) | "Expungement reform" category; Daniel Nichanian, Alex Burness (verified category page). Already links CCRC (12 links). |
| **The Appeal** | Criminal legal system; in ccresourcecenter's linkers (19 links). |
| **Capital B News** | Black-community news; links cleanslateinitiative.org (7 links per our data). |
| **Prism** (prismreports.org) | Justice and equity; in CCRC's linkers. |
| **Local TV investigative units** (e.g., Atlanta News First Investigates) | Consumer-harm angle. **Best target for the CFPB tracker** with state cuts. |
| **Public radio**: WHYY, The Public's Radio (RI), WUNC, NPR Illinois, KERA, WTTW | Each covered clean slate or expungement clinics (in competitor linkers or seen in search). Pitch around local law effective dates. |
| **Oklahoma Watch, San Antonio Report, Border Belt Independent (NC), Signal Cleveland** | Local nonprofit newsrooms covering local expungement clinics (in linkers or seen in search). |
| **Route Fifty** | State and local government operations; syndicated the Stateline fees piece. |
| **Policy/think-tank writers**: R Street, Reason, Center for American Progress, Brennan Center | Cite data in clean-slate advocacy; all are in competitor linkers. |
| **HR/compliance trade press** (SHRM "Clean Slate laws are spreading," seen in search) | Employer angle for the CFPB tracker. |

---

## 4. Ethics and feasibility

1. **.gov and court pages often have no-commercial-links policies.** Many county sites forbid linking for-profit businesses or lawyer directories, and court self-help centers must stay neutral. Our directory lists for-profit law firms, so **lead with the non-commercial assets**: `/free-expungement-help`, the record-copy guide, and the cost table. Ask only for those. Never ask a court or clerk page to link the attorney listings.
2. **Be transparent about the business model.** If the site makes money in any way (paid placement, featured listings, lead fees, ads), say so in the pitch and on an About/How we make money page. A librarian who later discovers paid placement will remove the link and may tell colleagues. If listings are genuinely unpaid and unranked, say that, because it is the strongest selling point.
3. **Lawyer-advertising rules.** A directory that ranks or "recommends" lawyers can touch state bar rules on lawyer referral services (ABA Model Rule 7.2(b)). Avoid "best" or "top-rated" wording on pages we pitch to institutions, and keep the "listing is not an endorsement" disclaimers. Neutral language also gets more links.
4. **Do not undercut legal aid.** Put free and legal-aid help first on every pitched page, as `/free-expungement-help` already does. Pitch the directory as "for people over the legal-aid income limit," which matches how the NC legislative library and Durham clerk pages already pair legal aid with bar referral services.
5. **Data accuracy.**
   - Fees change every year, so date-stamp the cost table and cite each state's fee source.
   - The 2022 BJS data is now four years old, so label it.
   - For the CFPB data, note that complaints are unverified consumer allegations and that companies respond. Never characterize a company as having broken the law based on complaint counts alone. Atlanta News First framed its figures as allegations.
6. **Volume and tone.** Send a small number of individualized emails per category and run no automated blasts. Librarians and reentry staff are overloaded, so one short note with a specific gap ("your page says X but has no link for Y") is the right size. Do not offer payment for links: that would violate Google's link-spam policies, and it would discredit the site with these audiences.
7. **Expected yield (my estimate):**
   - Library guides and reentry lists: about 5–10% positive.
   - Universities: about 3–5%.
   - Public defenders and courts: about 1–2%.
   - Data pitches to newsrooms: low per pitch, but one Stateline or TV story can syndicate to 10 or more domains.
8. **Competitor overlap.** NACDL runs its own expungement directory, so skip it. Do not pitch CCRC or Clean Slate Initiative for directory links. Pitch them data only if it adds something.

## 5. Suggested sequencing when outreach starts
1. Polish the pitch assets:
   - methodology and CSV for the CFPB tracker
   - "last updated" dates and sources on the cost table
   - an About/funding disclosure page
2. Contact multipliers first: WebJunction, SC State Library reentry guide, CUNY central, and the Texas State Law Library.
3. Work state by state where we have the strongest state pages. Pair each wave with a local news peg such as a Clean Slate effective date.
4. Pitch the CFPB tracker quarterly to local TV investigative units and NCLC, and the cost table to Stateline and The Marshall Project.

*Not verified / blocked in this session:* cloudfront.careeronestop.org (host not allowed by the session's network settings), themarshallproject.org and mdcourts.gov (403), cuyahogacounty.gov (503), ncjustice.org/expunction-clearinghouse (404). Exact linking URLs for unc.edu, duke.edu, cornell.edu, berkeley.edu, stanford.edu, cuny.edu, mitchellhamline.edu, ncdps.gov, and madisoncountync.gov → competitors are not confirmed. A backlink tool with credits (Semrush/Ahrefs) would resolve these in minutes.
