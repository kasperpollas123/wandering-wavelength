import fs from 'fs';
import path from 'path';

export interface City {
  name: string;
  state: string;
  slug: string;
  seoSlug: string;
  population: number;
  image: string;
  description: string;
  attorneyCount: number;
  expungementInfo?: string; // State-specific expungement information
}

// State-specific expungement information
export const stateExpungementInfo: {[key: string]: string} = {
  'AL': 'Alabama allows for expungement of certain non-violent misdemeanors, violations, and felonies under specific conditions. The state passed the Record Expungement Designed to Enhance Employment and Eliminate Recidivism (REDEEMER) Act in 2021, expanding expungement eligibility to include certain non-violent felonies after a 5-year waiting period.',
  
  'AK': 'Alaska does not have a true expungement process. However, the state allows for sealing of records in limited circumstances, particularly for cases that were dismissed or resulted in acquittal. Additionally, Alaska offers a process called "set-aside" for certain convictions, which doesn\'t remove the record but can restore some civil rights.',
  
  'AZ': 'Arizona recently reformed its expungement laws with the passage of SB 1294 in 2021. The state now allows for "setting aside" of convictions, which doesn\'t erase the record but removes many legal disabilities. Additionally, Arizona has a separate process for marijuana expungement following the legalization of recreational marijuana.',
  
  'AR': 'Arkansas offers expungement through its Criminal Record Sealing Act. Eligible offenses include most misdemeanors after a 5-year waiting period and certain felonies after a waiting period of 5 years. Some violent or sexual offenses are not eligible for expungement in Arkansas.',
  
  'CA': 'California has some of the most progressive expungement laws in the country. Under Penal Code 1203.4, many convictions can be dismissed after completing probation. Additionally, Proposition 47 allows for reduction of certain felonies to misdemeanors, and Proposition 64 provides for marijuana conviction expungement. California also offers automatic expungement for certain offenses.',
  
  'CO': 'Colorado\'s expungement laws allow for sealing of many criminal records. Recent legislation has expanded eligibility and created an automatic sealing process for certain drug offenses. The state also allows for sealing of arrest records that didn\'t lead to a conviction and has specific provisions for marijuana offenses following legalization.',
  
  'CT': 'Connecticut enacted the Clean Slate Act in 2021, which provides for automatic erasure of certain criminal records after a waiting period of 7-10 years. Eligible offenses include most misdemeanors and certain class D and E felonies. More serious crimes require a petition-based process for expungement.',
  
  'DE': 'Delaware\'s expungement laws were expanded in 2019 with the passage of the Adult Expungement Reform Act. The state now offers mandatory expungement for certain offenses and discretionary expungement for others. Delaware also has an automatic expungement process for certain misdemeanors after a waiting period.',
  
  'DC': 'The District of Columbia allows for expungement of non-conviction records and sealing of certain conviction records. The Second Chance Amendment Act of 2016 expanded eligibility for record sealing. DC also has specific provisions for marijuana offenses following decriminalization.',
  
  'FL': 'Florida allows for expungement or sealing of certain criminal records. Generally, only first-time offenders are eligible, and many serious offenses are excluded. The state requires a certificate of eligibility from the Florida Department of Law Enforcement before petitioning the court for expungement or sealing.',
  
  'GA': 'Georgia\'s Second Chance Law allows for restriction and sealing of certain criminal records. First offender treatment and conditional discharge can result in records being sealed upon successful completion. Recent reforms have expanded eligibility to include certain misdemeanors after a 4-year waiting period.',
  
  'HI': 'Hawaii allows for expungement of certain arrests that didn\'t lead to conviction. The state also offers a process called "expungement by gubernatorial pardon" for conviction records, though this is rarely granted. For first-time non-violent drug offenders, Hawaii has a deferred acceptance of guilty plea program.',
  
  'ID': 'Idaho allows for expungement of certain arrest records if the case was dismissed or resulted in acquittal. The state also permits expungement of certain misdemeanor convictions, though the process is more accurately described as "sealing" rather than complete expungement. Felony convictions generally cannot be expunged in Idaho.',
  
  'IL': 'Illinois has expanded its expungement laws significantly in recent years. The Cannabis Regulation and Tax Act automatically expunges certain marijuana offenses. The state allows for expungement of arrests that didn\'t lead to conviction and sealing of many conviction records after a waiting period of 2-3 years.',
  
  'IN': 'Indiana\'s Second Chance Law provides a comprehensive framework for expungement. Most misdemeanors can be expunged after 5 years, and many felonies after 8-10 years. Indiana\'s law is unique in that it mandates expungement if all statutory requirements are met, leaving little discretion to judges.',
  
  'IA': 'Iowa allows for expungement of certain misdemeanors after an 8-year waiting period if the person has no subsequent convictions. The state also permits expungement of deferred judgments and cases that were dismissed or resulted in acquittal. Most felonies cannot be expunged in Iowa.',
  
  'KS': 'Kansas allows for expungement of many criminal offenses after waiting periods ranging from 3-5 years for misdemeanors and 5-10 years for felonies. The state requires that all sentencing requirements be completed and that the person has no subsequent convictions during the waiting period.',
  
  'KY': 'Kentucky expanded its expungement laws in 2016 to include certain Class D felonies after a 5-year waiting period. The state also allows for expungement of misdemeanors and cases that were dismissed or resulted in acquittal. Kentucky requires payment of a filing fee and may require a hearing.',
  
  'LA': 'Louisiana allows for expungement of certain misdemeanors and felonies after waiting periods of 5-10 years. The state uses the term "expungement" but the process is more accurately described as record sealing. Louisiana law prohibits expungement of violent offenses and sex crimes.',
  
  'ME': 'Maine has limited expungement options. The state allows for sealing of certain juvenile records but has few provisions for adult records. Some non-conviction records may be eligible for sealing, and certain marijuana offenses can be expunged following legalization.',
  
  'MD': 'Maryland\'s Justice Reinvestment Act expanded expungement eligibility to include certain non-violent misdemeanors and felonies. The state also allows for automatic expungement of cases that resulted in acquittal or dismissal. Maryland has a waiting period of 3-15 years depending on the offense.',
  
  'MA': 'Massachusetts reformed its expungement laws in 2018 with the Criminal Justice Reform Act. The state now allows for expungement of certain records if the offense occurred before age 21 or was later decriminalized. Massachusetts also has a sealing process for older convictions after waiting periods of 3-7 years.',
  
  'MI': 'Michigan significantly expanded its expungement laws in 2020 with the Clean Slate legislation. The state now allows for expungement of up to three felonies and unlimited misdemeanors after a waiting period. Michigan also created an automatic expungement process for certain non-violent offenses.',
  
  'MN': 'Minnesota\'s expungement law allows for sealing of certain criminal records. The state uses a balancing test where courts weigh the public\'s right to know against the individual\'s need for expungement. Waiting periods range from 1-5 years for misdemeanors and 5-10 years for felonies.',
  
  'MS': 'Mississippi allows for expungement of certain first-time offenses after a 5-year waiting period. The state also permits expungement of misdemeanors and cases that were dismissed or resulted in acquittal. Mississippi has expanded eligibility in recent years but still excludes many violent and sexual offenses.',
  
  'MO': 'Missouri expanded its expungement laws in 2018, increasing the number of eligible offenses. The state now allows for expungement of most misdemeanors after a 3-year waiting period and many felonies after a 7-year waiting period. Certain violent and sexual offenses are excluded.',
  
  'MT': 'Montana has limited expungement options. The state allows for expungement of misdemeanor convictions for which the person received a deferred imposition of sentence. Montana also permits expungement of certain youth court records and marijuana convictions following legalization.',
  
  'NE': 'Nebraska allows for sealing of certain criminal records, particularly for cases that were dismissed or resulted in acquittal. The state also permits sealing of certain juvenile records. Nebraska does not have a comprehensive expungement law for adult conviction records.',
  
  'NV': 'Nevada allows for sealing of criminal records after waiting periods ranging from 1-10 years depending on the offense. The state expanded eligibility in 2019 and reduced waiting periods for many offenses. Nevada also has provisions for automatic sealing of decriminalized marijuana offenses.',
  
  'NH': 'New Hampshire allows for annulment of criminal records after waiting periods of 1-10 years depending on the offense. The state uses the term "annulment" rather than expungement, but the effect is similar. New Hampshire prohibits annulment of certain serious offenses like sexual assault and DWI.',
  
  'NJ': 'New Jersey reformed its expungement laws in 2019, creating one of the most progressive systems in the country. The state now allows for expungement of multiple convictions and has shortened waiting periods. New Jersey also implemented an automatic "clean slate" expungement process for certain offenses.',
  
  'NM': 'New Mexico enacted a comprehensive expungement law in 2019. The state now allows for expungement of arrest records and many conviction records after waiting periods of 1-10 years. New Mexico\'s law includes a presumption in favor of expungement if statutory requirements are met.',
  
  'NY': 'New York\'s expungement options include sealing of certain non-violent criminal records after a 10-year waiting period. The state also automatically seals certain marijuana convictions following decriminalization. New York uses the term "sealing" rather than expungement, as the records still exist but with limited accessibility.',
  
  'NC': 'North Carolina allows for expungement of certain first-time nonviolent offenses after waiting periods of 5-10 years. The state also permits expungement of cases that were dismissed or resulted in acquittal. North Carolina has expanded eligibility in recent years but still has relatively strict requirements.',
  
  'ND': 'North Dakota allows for sealing of certain criminal records through a process called "reduction to infraction." The state also permits sealing of non-conviction records and has specific provisions for marijuana offenses. North Dakota requires a waiting period of 3-5 years for most offenses.',
  
  'OH': 'Ohio allows for sealing of criminal records for first-time offenders after a 1-year waiting period for misdemeanors and a 3-year waiting period for felonies. The state expanded eligibility in 2018 to include certain non-violent felonies. Ohio uses the term "sealing" rather than expungement.',
  
  'OK': 'Oklahoma allows for expungement of certain misdemeanors after a 5-year waiting period and certain non-violent felonies after a 5-10 year waiting period. The state also permits expungement of cases that were dismissed or resulted in acquittal. Oklahoma has expanded eligibility in recent years.',
  
  'OR': 'Oregon allows for expungement of most misdemeanors and certain Class C felonies after a waiting period of 1-3 years for misdemeanors and 5-7 years for felonies. The state also permits expungement of juvenile records and marijuana offenses following legalization.',
  
  'PA': 'Pennsylvania enacted the Clean Slate Act in 2018, creating an automatic sealing process for certain misdemeanors after a 10-year period without subsequent convictions. The state also allows for petition-based expungement of non-conviction records and certain summary offenses.',
  
  'RI': 'Rhode Island allows for expungement of certain first-time nonviolent offenses after a 5-year waiting period for misdemeanors and a 10-year waiting period for felonies. The state requires that the person has no subsequent convictions and has completed all sentencing requirements.',
  
  'SC': 'South Carolina allows for expungement of certain first-time offenses, cases that were dismissed or resulted in acquittal, and successful completion of diversion programs. The state has expanded eligibility in recent years but still excludes most violent and sexual offenses.',
  
  'SD': 'South Dakota allows for expungement of certain misdemeanors and minor felonies after waiting periods ranging from 5-10 years. The state also permits expungement of cases that were dismissed or resulted in acquittal. South Dakota requires that all court costs and restitution be paid.',
  
  'TN': 'Tennessee allows for expungement of certain misdemeanors and Class E felonies after a 5-year waiting period. The state also permits expungement of cases that were dismissed or resulted in acquittal. Tennessee has expanded eligibility in recent years but still excludes many serious offenses.',
  
  'TX': 'Texas allows for expungement (called "expunction") of arrests that didn\'t lead to conviction and certain misdemeanors committed by minors. The state also offers a process called "non-disclosure" for certain offenses, which seals the record from public view but keeps it available to law enforcement.',
  
  'UT': 'Utah reformed its expungement laws in 2019 with the Clean Slate Law, which provides for automatic expungement of certain misdemeanors after waiting periods of 5-7 years. The state also allows for petition-based expungement of more serious offenses with longer waiting periods.',
  
  'VT': 'Vermont allows for expungement of many criminal records after a 5-10 year waiting period. The state expanded eligibility in 2019 to include many misdemeanors and certain felonies. Vermont also has provisions for expungement of marijuana offenses following legalization.',
  
  'VA': 'Virginia has traditionally had limited expungement options, allowing it only for cases that resulted in acquittal or were otherwise dismissed. However, in 2021, Virginia enacted legislation to expand record sealing options to include certain misdemeanors and felonies after waiting periods.',
  
  'WA': 'Washington allows for "vacating" of certain misdemeanor and felony convictions after waiting periods of 3-10 years. The state uses the term "vacation" rather than expungement, but the effect is similar. Washington has expanded eligibility in recent years, particularly for marijuana offenses.',
  
  'WV': 'West Virginia allows for expungement of certain misdemeanors after a 1-2 year waiting period and certain non-violent felonies after a 5-year waiting period. The state expanded eligibility in 2019 but still excludes many violent and sexual offenses.',
  
  'WI': 'Wisconsin has limited expungement options, allowing it only for certain offenses committed before the age of 25 and only if the judge ordered expungement at the time of sentencing. The state has considered reforms to expand eligibility but has not yet enacted them.',
  
  'WY': 'Wyoming allows for expungement of certain misdemeanors after a 5-year waiting period and certain felonies after a 10-year waiting period. The state also permits expungement of non-conviction records and first-time drug offenses. Wyoming expanded eligibility in recent years.'
};

// Original hardcoded cities
export const hardcodedCities: City[] = [
  {
    name: "New York",
    state: "NY",
    slug: "new-york",
    seoSlug: "expungement-attorneys-new-york",
    population: 8804190,
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1470&auto=format&fit=crop",
    description: "New York City, the most populous city in the United States, offers numerous expungement attorneys who can help clear your criminal record. These legal professionals are well-versed in New York's specific laws regarding record sealing and expungement.",
    attorneyCount: 2,
    expungementInfo: stateExpungementInfo['NY']
  },
  {
    name: "Los Angeles",
    state: "CA",
    slug: "los-angeles",
    seoSlug: "expungement-attorneys-los-angeles",
    population: 3898747,
    image: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?q=80&w=1470&auto=format&fit=crop",
    description: "Los Angeles has many experienced expungement attorneys who understand California's progressive laws regarding record clearing. They can help with dismissals under PC 1203.4 and the newer provisions under Prop 64 for marijuana-related offenses.",
    attorneyCount: 2,
    expungementInfo: stateExpungementInfo['CA']
  },
  {
    name: "Chicago",
    state: "IL",
    slug: "chicago",
    seoSlug: "expungement-attorneys-chicago",
    population: 2746388,
    image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?q=80&w=1470&auto=format&fit=crop",
    description: "Chicago's expungement attorneys are familiar with Illinois' specific expungement and sealing laws, which have been expanded in recent years to help more people clear their records and gain better employment opportunities.",
    attorneyCount: 2,
    expungementInfo: stateExpungementInfo['IL']
  },
  {
    name: "Houston",
    state: "TX",
    slug: "houston",
    seoSlug: "expungement-attorneys-houston",
    population: 2304580,
    image: "/images/cities/houston.jpg",
    description: "Houston offers many qualified expungement attorneys who can navigate Texas' strict but improving expungement laws. These professionals can help determine eligibility and guide clients through the process of clearing their records.",
    attorneyCount: 2
  },
  {
    name: "Phoenix",
    state: "AZ",
    slug: "phoenix",
    seoSlug: "expungement-attorneys-phoenix",
    population: 1608139,
    image: "/images/cities/phoenix.jpg",
    description: "Phoenix has experienced attorneys who can help with Arizona's 'set aside' provisions, which don't completely expunge records but can help mitigate the impact of past convictions on employment and housing opportunities.",
    attorneyCount: 2
  },
  {
    name: "Philadelphia",
    state: "PA",
    slug: "philadelphia",
    seoSlug: "expungement-attorneys-philadelphia",
    population: 1603797,
    image: "https://images.unsplash.com/photo-1601332069884-15a8149df78a?q=80&w=1470&auto=format&fit=crop",
    description: "Philadelphia's expungement attorneys are well-versed in Pennsylvania's Clean Slate Act, which has expanded opportunities for record sealing. They can help navigate both traditional expungements and the newer automated sealing process.",
    attorneyCount: 2
  },
  {
    name: "San Antonio",
    state: "TX",
    slug: "san-antonio",
    seoSlug: "expungement-attorneys-san-antonio",
    population: 1434625,
    image: "/images/headers/city-header.jpg",
    description: "San Antonio offers expungement attorneys who understand Texas' specific requirements for record clearing. They can help with both expunctions and orders of nondisclosure to help clients move forward with clean records.",
    attorneyCount: 2
  },
  {
    name: "San Diego",
    state: "CA",
    slug: "san-diego",
    seoSlug: "expungement-attorneys-san-diego",
    population: 1386932,
    image: "/images/headers/city-header.jpg",
    description: "San Diego has many attorneys specializing in California's expungement laws, including dismissals under PC 1203.4 and relief under Prop 47 and Prop 64. They can help clients navigate the process of clearing their records.",
    attorneyCount: 2
  },
  {
    name: "Dallas",
    state: "TX",
    slug: "dallas",
    seoSlug: "expungement-attorneys-dallas",
    population: 1304379,
    image: "/images/headers/city-header.jpg",
    description: "Dallas has experienced expungement attorneys who can help with Texas' expunction and non-disclosure processes. They understand the specific eligibility requirements and can guide clients through the complex legal procedures.",
    attorneyCount: 2
  },
  {
    name: "San Jose",
    state: "CA",
    slug: "san-jose",
    seoSlug: "expungement-attorneys-san-jose",
    population: 1013240,
    image: "/images/headers/city-header.jpg",
    description: "San Jose's expungement attorneys are knowledgeable about California's record clearing options, including dismissals, reductions, and certificates of rehabilitation. They can help clients understand their options based on their specific situations.",
    attorneyCount: 2
  },
  {
    name: "Austin",
    state: "TX",
    slug: "austin",
    seoSlug: "expungement-attorneys-austin",
    population: 961855,
    image: "/images/headers/city-header.jpg",
    description: "Austin has many attorneys who specialize in Texas expungement law. They can help determine eligibility for expunctions or orders of nondisclosure and guide clients through the process of clearing their criminal records.",
    attorneyCount: 2
  },
  {
    name: "Jacksonville",
    state: "FL",
    slug: "jacksonville",
    seoSlug: "expungement-attorneys-jacksonville",
    population: 949611,
    image: "/images/headers/city-header.jpg",
    description: "Jacksonville's expungement attorneys understand Florida's specific requirements for record sealing and expungement. They can help eligible clients navigate the process to clear their records and improve their future prospects.",
    attorneyCount: 2
  },
  {
    name: "Fort Worth",
    state: "TX",
    slug: "fort-worth",
    seoSlug: "expungement-attorneys-fort-worth",
    population: 918915,
    image: "/images/headers/city-header.jpg",
    description: "Fort Worth offers experienced attorneys who can help with Texas' expungement and non-disclosure laws. They understand the specific eligibility requirements and can guide clients through the legal process to clear their records.",
    attorneyCount: 2
  },
  {
    name: "Columbus",
    state: "OH",
    slug: "columbus",
    seoSlug: "expungement-attorneys-columbus",
    population: 905748,
    image: "/images/headers/city-header.jpg",
    description: "Columbus has attorneys who specialize in Ohio's record sealing and expungement laws. They can help eligible clients navigate the process to clear their records and improve their opportunities for employment and housing.",
    attorneyCount: 2
  },
  {
    name: "Indianapolis",
    state: "IN",
    slug: "indianapolis",
    seoSlug: "expungement-attorneys-indianapolis",
    population: 887642,
    image: "/images/headers/city-header.jpg",
    description: "Indianapolis offers expungement attorneys who understand Indiana's Second Chance Law. They can help eligible clients navigate the process to restrict access to their criminal records and improve their future prospects.",
    attorneyCount: 2
  },
  {
    name: "Charlotte",
    state: "NC",
    slug: "charlotte",
    seoSlug: "expungement-attorneys-charlotte",
    population: 874579,
    image: "/images/headers/city-header.jpg",
    description: "Charlotte's expungement attorneys are familiar with North Carolina's expanding expungement laws. They can help eligible clients navigate the process to clear their records and improve their opportunities for employment and housing.",
    attorneyCount: 2
  },
  {
    name: "San Francisco",
    state: "CA",
    slug: "san-francisco",
    seoSlug: "expungement-attorneys-san-francisco",
    population: 873965,
    image: "/images/headers/city-header.jpg",
    description: "San Francisco has many attorneys who specialize in California's progressive expungement laws. They can help with dismissals under PC 1203.4 and relief under newer laws like Prop 47 and Prop 64.",
    attorneyCount: 2
  },
  {
    name: "Seattle",
    state: "WA",
    slug: "seattle",
    seoSlug: "expungement-attorneys-seattle",
    population: 737015,
    image: "/images/headers/city-header.jpg",
    description: "Seattle's expungement attorneys understand Washington's vacation and sealing laws. They can help eligible clients navigate the process to clear their records and improve their future prospects.",
    attorneyCount: 2
  },
  {
    name: "Denver",
    state: "CO",
    slug: "denver",
    seoSlug: "expungement-attorneys-denver",
    population: 715522,
    image: "/images/headers/city-header.jpg",
    description: "Denver has attorneys who specialize in Colorado's record sealing and expungement laws, including the newer provisions for marijuana offenses. They can help eligible clients navigate the process to clear their records.",
    attorneyCount: 2
  },
  {
    name: "Washington",
    state: "DC",
    slug: "washington-dc",
    seoSlug: "expungement-attorneys-washington-dc",
    population: 689545,
    image: "/images/headers/city-header.jpg",
    description: "Washington DC's expungement attorneys are familiar with the district's specific sealing and expungement laws. They can help eligible clients navigate the process to clear their records and improve their future opportunities.",
    attorneyCount: 2
  },
  {
    name: "Boston",
    state: "MA",
    slug: "boston",
    seoSlug: "expungement-attorneys-boston",
    population: 675647,
    image: "/images/headers/city-header.jpg",
    description: "Boston has attorneys who specialize in Massachusetts' record sealing and expungement laws, which were expanded in 2018. They can help eligible clients navigate the process to clear their records and improve their prospects.",
    attorneyCount: 2
  },
  {
    name: "El Paso",
    state: "TX",
    slug: "el-paso",
    seoSlug: "expungement-attorneys-el-paso",
    population: 678815,
    image: "/images/headers/city-header.jpg",
    description: "El Paso offers experienced attorneys who can help with Texas' expungement and non-disclosure laws. They understand the specific eligibility requirements and can guide clients through the legal process to clear their records.",
    attorneyCount: 2
  },
  {
    name: "Nashville",
    state: "TN",
    slug: "nashville",
    seoSlug: "expungement-attorneys-nashville",
    population: 689447,
    image: "/images/headers/city-header.jpg",
    description: "Nashville's expungement attorneys understand Tennessee's specific requirements for record expungement. They can help eligible clients navigate the process to clear their records and improve their future prospects.",
    attorneyCount: 2
  },
  {
    name: "Oklahoma City",
    state: "OK",
    slug: "oklahoma-city",
    seoSlug: "expungement-attorneys-oklahoma-city",
    population: 681054,
    image: "/images/headers/city-header.jpg",
    description: "Oklahoma City has attorneys who specialize in Oklahoma's expungement laws. They can help eligible clients navigate the process to clear their records and improve their opportunities for employment and housing.",
    attorneyCount: 5
  },
  {
    name: "Las Vegas",
    state: "NV",
    slug: "las-vegas",
    seoSlug: "expungement-attorneys-las-vegas",
    population: 641903,
    image: "/images/headers/city-header.jpg",
    description: "Las Vegas offers expungement attorneys who understand Nevada's record sealing laws. They can help eligible clients navigate the process to seal their criminal records and improve their future prospects.",
    attorneyCount: 2
  },
  {
    name: "Portland",
    state: "OR",
    slug: "portland",
    seoSlug: "expungement-attorneys-portland",
    population: 641162,
    image: "/images/headers/city-header.jpg",
    description: "Portland has attorneys who specialize in Oregon's expungement laws. They can help eligible clients navigate the process to set aside their convictions and improve their opportunities for employment and housing.",
    attorneyCount: 2
  },
  {
    name: "Detroit",
    state: "MI",
    slug: "detroit",
    seoSlug: "expungement-attorneys-detroit",
    population: 639111,
    image: "/images/headers/city-header.jpg",
    description: "Detroit's expungement attorneys understand Michigan's expanded Clean Slate laws. They can help eligible clients navigate the process to set aside their convictions and improve their future prospects.",
    attorneyCount: 2
  },
  {
    name: "Memphis",
    state: "TN",
    slug: "memphis",
    seoSlug: "expungement-attorneys-memphis",
    population: 633104,
    image: "/images/headers/city-header.jpg",
    description: "Memphis has attorneys who specialize in Tennessee's expungement laws. They can help eligible clients navigate the process to clear their records and improve their opportunities for employment and housing.",
    attorneyCount: 2
  },
  {
    name: "Louisville",
    state: "KY",
    slug: "louisville",
    seoSlug: "expungement-attorneys-louisville",
    population: 628594,
    image: "/images/headers/city-header.jpg",
    description: "Louisville's expungement attorneys understand Kentucky's specific requirements for record clearing. They can help eligible clients navigate the process to expunge their records and improve their future prospects.",
    attorneyCount: 2
  },
  {
    name: "Milwaukee",
    state: "WI",
    slug: "milwaukee",
    seoSlug: "expungement-attorneys-milwaukee",
    population: 577222,
    image: "/images/headers/city-header.jpg",
    description: "Milwaukee has attorneys who specialize in Wisconsin's expungement laws. They can help eligible clients navigate the process to clear their records and improve their opportunities for employment and housing.",
    attorneyCount: 2
  },
  {
    name: "Baltimore",
    state: "MD",
    slug: "baltimore",
    seoSlug: "expungement-attorneys-baltimore",
    population: 576498,
    image: "/images/headers/city-header.jpg",
    description: "Baltimore's expungement attorneys understand Maryland's expanding expungement laws. They can help eligible clients navigate the process to clear their records and improve their future prospects.",
    attorneyCount: 2
  },
  {
    name: "Albuquerque",
    state: "NM",
    slug: "albuquerque",
    seoSlug: "expungement-attorneys-albuquerque",
    population: 564559,
    image: "/images/headers/city-header.jpg",
    description: "Albuquerque has attorneys who specialize in New Mexico's expungement laws, which were expanded in 2019. They can help eligible clients navigate the process to clear their records and improve their opportunities.",
    attorneyCount: 2
  },
  {
    name: "Tucson",
    state: "AZ",
    slug: "tucson",
    seoSlug: "expungement-attorneys-tucson",
    population: 542629,
    image: "/images/headers/city-header.jpg",
    description: "Tucson offers experienced attorneys who can help with Arizona's 'set aside' provisions. They understand the specific eligibility requirements and can guide clients through the legal process to mitigate the impact of past convictions.",
    attorneyCount: 2
  },
  {
    name: "Fresno",
    state: "CA",
    slug: "fresno",
    seoSlug: "expungement-attorneys-fresno",
    population: 542107,
    image: "/images/headers/city-header.jpg",
    description: "Fresno has attorneys who specialize in California's expungement laws. They can help with dismissals under PC 1203.4 and relief under newer laws like Prop 47 and Prop 64 to clear clients' records.",
    attorneyCount: 2
  },
  {
    name: "Sacramento",
    state: "CA",
    slug: "sacramento",
    seoSlug: "expungement-attorneys-sacramento",
    population: 524943,
    image: "/images/headers/city-header.jpg",
    description: "Sacramento's expungement attorneys understand California's record clearing options. They can help clients navigate the process to dismiss convictions and improve their opportunities for employment and housing.",
    attorneyCount: 2
  },
  {
    name: "Kansas City",
    state: "MO",
    slug: "kansas-city",
    seoSlug: "expungement-attorneys-kansas-city",
    population: 508090,
    image: "/images/headers/city-header.jpg",
    description: "Kansas City has attorneys who specialize in Missouri's expungement laws, which were expanded in 2018. They can help eligible clients navigate the process to clear their records and improve their future prospects.",
    attorneyCount: 2
  },
  {
    name: "Mesa",
    state: "AZ",
    slug: "mesa",
    seoSlug: "expungement-attorneys-mesa",
    population: 504258,
    image: "/images/headers/city-header.jpg",
    description: "Mesa offers experienced attorneys who can help with Arizona's 'set aside' provisions. They understand the specific eligibility requirements and can guide clients through the legal process to mitigate the impact of past convictions.",
    attorneyCount: 2
  },
  {
    name: "Atlanta",
    state: "GA",
    slug: "atlanta",
    seoSlug: "expungement-attorneys-atlanta",
    population: 498715,
    image: "/images/headers/city-header.jpg",
    description: "Atlanta's expungement attorneys understand Georgia's record restriction and sealing laws. They can help eligible clients navigate the process to clear their records and improve their future opportunities.",
    attorneyCount: 2
  },
  {
    name: "Omaha",
    state: "NE",
    slug: "omaha",
    seoSlug: "expungement-attorneys-omaha",
    population: 486051,
    image: "/images/headers/city-header.jpg",
    description: "Omaha has attorneys who specialize in Nebraska's set aside laws. They can help eligible clients navigate the process to clear their records and improve their opportunities for employment and housing.",
    attorneyCount: 2
  },
  {
    name: "Colorado Springs",
    state: "CO",
    slug: "colorado-springs",
    seoSlug: "expungement-attorneys-colorado-springs",
    population: 478961,
    image: "/images/headers/city-header.jpg",
    description: "Colorado Springs offers expungement attorneys who understand Colorado's record sealing laws. They can help eligible clients navigate the process to seal their criminal records and improve their future prospects.",
    attorneyCount: 2
  },
  {
    name: "Raleigh",
    state: "NC",
    slug: "raleigh",
    seoSlug: "expungement-attorneys-raleigh",
    population: 467665,
    image: "/images/headers/city-header.jpg",
    description: "Raleigh's expungement attorneys are familiar with North Carolina's expanding expungement laws. They can help eligible clients navigate the process to clear their records and improve their opportunities.",
    attorneyCount: 2
  },
  {
    name: "Miami",
    state: "FL",
    slug: "miami",
    seoSlug: "expungement-attorneys-miami",
    population: 467963,
    image: "/images/headers/city-header.jpg",
    description: "Miami has attorneys who specialize in Florida's expungement and sealing laws. They can help eligible clients navigate the process to clear their records and improve their opportunities for employment and housing.",
    attorneyCount: 2
  },
  {
    name: "Long Beach",
    state: "CA",
    slug: "long-beach",
    seoSlug: "expungement-attorneys-long-beach",
    population: 466742,
    image: "/images/headers/city-header.jpg",
    description: "Long Beach offers expungement attorneys who understand California's record clearing options. They can help with dismissals under PC 1203.4 and relief under newer laws to improve clients' future prospects.",
    attorneyCount: 2
  },
  {
    name: "Virginia Beach",
    state: "VA",
    slug: "virginia-beach",
    seoSlug: "expungement-attorneys-virginia-beach",
    population: 459470,
    image: "/images/headers/city-header.jpg",
    description: "Virginia Beach has attorneys who specialize in Virginia's restrictive expungement laws. They can help eligible clients navigate the process to expunge their records and improve their future opportunities.",
    attorneyCount: 2
  },
  {
    name: "Oakland",
    state: "CA",
    slug: "oakland",
    seoSlug: "expungement-attorneys-oakland",
    population: 440646,
    image: "/images/headers/city-header.jpg",
    description: "Oakland's expungement attorneys understand California's progressive record clearing laws. They can help with dismissals under PC 1203.4 and relief under newer laws like Prop 47 and Prop 64.",
    attorneyCount: 2
  },
  {
    name: "Minneapolis",
    state: "MN",
    slug: "minneapolis",
    seoSlug: "expungement-attorneys-minneapolis",
    population: 429954,
    image: "/images/headers/city-header.jpg",
    description: "Minneapolis has attorneys who specialize in Minnesota's expungement laws. They can help eligible clients navigate the process to seal their records and improve their opportunities for employment and housing.",
    attorneyCount: 2
  },
  {
    name: "Tulsa",
    state: "OK",
    slug: "tulsa",
    seoSlug: "expungement-attorneys-tulsa",
    population: 413066,
    image: "/images/headers/city-header.jpg",
    description: "Tulsa's expungement attorneys understand Oklahoma's specific requirements for record expungement. They can help eligible clients navigate the process to clear their records and improve their future prospects.",
    attorneyCount: 2
  },
  {
    name: "Arlington",
    state: "TX",
    slug: "arlington",
    seoSlug: "expungement-attorneys-arlington",
    population: 398854,
    image: "/images/headers/city-header.jpg",
    description: "Arlington offers experienced attorneys who can help with Texas' expungement and non-disclosure laws. They understand the specific eligibility requirements and can guide clients through the legal process to clear their records.",
    attorneyCount: 2
  },
  {
    name: "New Orleans",
    state: "LA",
    slug: "new-orleans",
    seoSlug: "expungement-attorneys-new-orleans",
    population: 383997,
    image: "/images/headers/city-header.jpg",
    description: "New Orleans has attorneys who specialize in Louisiana's expungement laws. They can help eligible clients navigate the process to clear their records and improve their opportunities for employment and housing.",
    attorneyCount: 2
  }
];

// Function to sanitize a string for use in URLs
function sanitizeForUrl(str: string): string {
  return str
    .toLowerCase()
    .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Function to convert city name to slug
export function cityToSlug(cityName: string, stateName: string): string {
  // Sanitize city name for URL safety
  return sanitizeForUrl(cityName);
}

// Function to create SEO slug
export function createSeoSlug(cityName: string): string {
  // Create SEO-friendly slug with sanitized city name
  return `expungement-attorneys-${sanitizeForUrl(cityName)}`;
}

// Function to load cities from the JSON file
export function loadCitiesFromJson(): City[] {
  try {
    // Try multiple possible paths for the JSON file
    const possiblePaths = [
      // Vercel root directory
      '/vercel/attorney_enriched_reviews.json',
      // Project root directory
      path.resolve(process.cwd(), 'attorney_enriched_reviews.json'),
      // One level up from project root (original path)
      path.resolve(process.cwd(), '..', 'attorney_enriched_reviews.json')
    ];
    
    let jsonData;
    let loadedPath = '';
    
    // Try each path until we find the file
    for (const jsonPath of possiblePaths) {
      try {
        if (fs.existsSync(jsonPath)) {
          jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
          loadedPath = jsonPath;
          console.log(`Successfully loaded JSON from: ${jsonPath}`);
          break;
        }
      } catch (err) {
        // Continue to the next path
      }
    }
    
    if (!jsonData) {
      console.error('Could not find attorney_enriched_reviews.json in any of the expected locations');
      return []; // Return empty array to prevent build failure
    }
    
    // Map to store unique cities
    const uniqueCities = new Map<string, City>();
    
    // Process each listing
    if (jsonData.listings && Array.isArray(jsonData.listings)) {
      jsonData.listings.forEach((listing: any) => {
        if (listing.city) {
          // Extract city and state from "city, state" format
          const cityStateParts = listing.city.split(',');
          if (cityStateParts.length >= 2) {
            const cityName = cityStateParts[0].trim();
            const stateName = cityStateParts[1].trim();
            
            // Create a key for the map
            const key = `${cityName.toLowerCase()}-${stateName.toLowerCase()}`;
            
            // If this city isn't in our map yet, add it
            if (!uniqueCities.has(key)) {
              // Convert state name to abbreviation (simplified version)
              const stateAbbr = getStateAbbreviation(stateName);
              
              // Create slug and seoSlug
              const slug = cityToSlug(cityName, stateName);
              const seoSlug = createSeoSlug(cityName);
              
              // Get state-specific expungement information
              const expungementInfo = stateExpungementInfo[stateAbbr] || undefined;
              
              // Create city object
              uniqueCities.set(key, {
                name: cityName,
                state: stateAbbr,
                slug,
                seoSlug,
                population: 0, // Default population
                image: "/images/headers/city-header.jpg", // Default image
                description: `Find experienced expungement attorneys in ${cityName}, ${stateAbbr} who can help clear your criminal record and give you a fresh start.`, // Default description
                attorneyCount: 0, // Will be updated later
                expungementInfo
              });
            }
            
            // Increment attorney count for this city
            const city = uniqueCities.get(key);
            if (city) {
              city.attorneyCount++;
            }
          }
        }
      });
    }
    
    // Convert map to array
    return Array.from(uniqueCities.values());
  } catch (error) {
    console.error('Error loading cities from JSON:', error);
    return hardcodedCities; // Fallback to hardcoded cities
  }
}

// Helper function to get state abbreviation
function getStateAbbreviation(stateName: string): string {
  const stateMap: {[key: string]: string} = {
    'alabama': 'AL',
    'alaska': 'AK',
    'arizona': 'AZ',
    'arkansas': 'AR',
    'california': 'CA',
    'colorado': 'CO',
    'connecticut': 'CT',
    'delaware': 'DE',
    'district of columbia': 'DC',
    'florida': 'FL',
    'georgia': 'GA',
    'hawaii': 'HI',
    'idaho': 'ID',
    'illinois': 'IL',
    'indiana': 'IN',
    'iowa': 'IA',
    'kansas': 'KS',
    'kentucky': 'KY',
    'louisiana': 'LA',
    'maine': 'ME',
    'maryland': 'MD',
    'massachusetts': 'MA',
    'michigan': 'MI',
    'minnesota': 'MN',
    'mississippi': 'MS',
    'missouri': 'MO',
    'montana': 'MT',
    'nebraska': 'NE',
    'nevada': 'NV',
    'new hampshire': 'NH',
    'new jersey': 'NJ',
    'new mexico': 'NM',
    'new york': 'NY',
    'north carolina': 'NC',
    'north dakota': 'ND',
    'ohio': 'OH',
    'oklahoma': 'OK',
    'oregon': 'OR',
    'pennsylvania': 'PA',
    'rhode island': 'RI',
    'south carolina': 'SC',
    'south dakota': 'SD',
    'tennessee': 'TN',
    'texas': 'TX',
    'utah': 'UT',
    'vermont': 'VT',
    'virginia': 'VA',
    'washington': 'WA',
    'west virginia': 'WV',
    'wisconsin': 'WI',
    'wyoming': 'WY'
  };
  
  return stateMap[stateName.toLowerCase()] || stateName;
}

// Export cities - combine hardcoded cities with those from JSON
export const cities: City[] = [...hardcodedCities, ...loadCitiesFromJson()];
