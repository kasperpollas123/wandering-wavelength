// No Node.js imports here: Hero.astro also loads this file in the browser.
// extraCities.json is written by scripts/build-directory.mjs.
import extraCitiesData from './extraCities.json';
import stateLawData from './stateLaw.json';

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
  baseSlug?: string; // Slug of the city name alone, as used on attorneys (generated cities)
  generated?: boolean; // Built from the attorney data, not hand-written
}

// State names by abbreviation
export const stateNames: {[key: string]: string} = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California', CO: 'Colorado', CT: 'Connecticut',
  DE: 'Delaware', DC: 'District of Columbia', FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois',
  IN: 'Indiana', IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri', MT: 'Montana',
  NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York',
  NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania',
  RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah',
  VT: 'Vermont', VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming'
};

// URL slug for a state page, e.g. "north-carolina"
export function stateSlug(state: string): string {
  return (stateNames[state] || state).toLowerCase().replace(/\s+/g, '-');
}

// State law summaries, fact-checked against the Collateral Consequences Resource Center's state
// profiles and official state sources (see stateLaw.json for the sources of each state and
// scripts/research/law_check_2026-11.json for what was corrected and what could not be verified).
export const stateLawChecked: string = (stateLawData as any).checked;
export const stateLawSources: {[key: string]: string[]} = Object.fromEntries(
  Object.entries((stateLawData as any).states).map(([code, v]: [string, any]) => [code, v.sources])
);
export const stateExpungementInfo: {[key: string]: string} = Object.fromEntries(
  Object.entries((stateLawData as any).states).map(([code, v]: [string, any]) => [code, v.summary])
);

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
    attorneyCount: 2
  },
  {
    name: "Los Angeles",
    state: "CA",
    slug: "los-angeles",
    seoSlug: "expungement-attorneys-los-angeles",
    population: 3898747,
    image: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?q=80&w=1470&auto=format&fit=crop",
    description: "Los Angeles has many experienced expungement attorneys who understand California's progressive laws regarding record clearing. They can help with dismissals under PC 1203.4 and the newer provisions under Prop 64 for marijuana-related offenses.",
    attorneyCount: 2
  },
  {
    name: "Chicago",
    state: "IL",
    slug: "chicago",
    seoSlug: "expungement-attorneys-chicago",
    population: 2746388,
    image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?q=80&w=1470&auto=format&fit=crop",
    description: "Chicago's expungement attorneys are familiar with Illinois' specific expungement and sealing laws, which have been expanded in recent years to help more people clear their records and gain better employment opportunities.",
    attorneyCount: 2
  },
  {
    name: "Houston",
    state: "TX",
    slug: "houston",
    seoSlug: "expungement-attorneys-houston",
    population: 2304580,
    image: "/images/cities/houston.webp",
    description: "Houston offers many qualified expungement attorneys who can navigate Texas' strict but improving expungement laws. These professionals can help determine eligibility and guide clients through the process of clearing their records.",
    attorneyCount: 2
  },
  {
    name: "Phoenix",
    state: "AZ",
    slug: "phoenix",
    seoSlug: "expungement-attorneys-phoenix",
    population: 1608139,
    image: "/images/cities/phoenix.webp",
    description: "Phoenix expungement attorneys are well-versed in Arizona's 'set aside' laws, which don't completely expunge records but can help mitigate their impact on employment and housing opportunities.",
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
  // In a browser environment, we can't use fs to read files
  // Instead, we'll return an empty array or mock data
  console.log('Note: loadCitiesFromJson called in browser environment - returning empty array');
  return [];
  
  // In a real application, you would fetch this data from an API endpoint
  // or import it directly as a JSON module
  // Example:
  // import citiesData from '../data/cities-data.json';
  // return citiesData;
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

// Cities with 3 or more attorneys in the data that have no hand-written entry above
const CITY_IMAGE = '/images/hero/p8bsykcxvdrme0cn7wer7hzwfm.webp';
export const generatedCities: City[] = (extraCitiesData as any[]).map(c => ({
  name: c.name,
  state: c.state,
  slug: c.slug,
  seoSlug: c.seoSlug,
  baseSlug: c.baseSlug,
  generated: true,
  population: 0,
  image: CITY_IMAGE,
  description: `This page lists ${c.attorneyCount} attorneys in ${c.name}, ${stateNames[c.state] || c.state} who handle expungement and record sealing cases, with their address, phone number and website.`,
  attorneyCount: c.attorneyCount
}));

// Every city shows its state's law summary
export const cities: City[] = [...hardcodedCities, ...generatedCities].map(city => ({
  ...city,
  expungementInfo: stateExpungementInfo[city.state]
}));
