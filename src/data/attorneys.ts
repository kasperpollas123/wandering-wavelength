import { cities } from './cities';

export interface Attorney {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  specialty: string;
  description: string;
  longDescription?: string;
  phone: string;
  website: string;
  email: string;
  address: string;
  citySlug: string;
  slug: string;
  practiceAreas?: string[];
  education?: string[];
  barAdmissions?: string[];
  awards?: string[];
  languages?: string[];
}

// Function to generate a random phone number
const generatePhoneNumber = () => {
  const areaCode = Math.floor(Math.random() * 800) + 200;
  const firstPart = Math.floor(Math.random() * 900) + 100;
  const secondPart = Math.floor(Math.random() * 9000) + 1000;
  return `(${areaCode}) ${firstPart}-${secondPart}`;
};

// Function to generate a random rating between 4.0 and 5.0
const generateRating = () => {
  return (Math.floor(Math.random() * 11) + 40) / 10;
};

// Function to generate a random review count between 10 and 150
const generateReviewCount = () => {
  return Math.floor(Math.random() * 141) + 10;
};

// Common practice areas for expungement attorneys
const commonPracticeAreas = [
  "Criminal Record Expungement",
  "Record Sealing",
  "Criminal Defense",
  "Post-Conviction Relief",
  "Misdemeanor Expungement",
  "Felony Expungement",
  "Juvenile Record Sealing",
  "Arrest Record Expungement",
  "Certificate of Rehabilitation",
  "Pardons",
  "Restoration of Rights",
  "DUI Expungement",
  "Drug Offense Expungement",
  "Non-Disclosure Orders",
  "Set Aside Convictions",
  "Record Clearing",
  "Background Check Issues",
  "Employment Law",
  "Immigration Consequences",
  "Civil Rights Restoration"
];

// Common education backgrounds
const commonEducation = [
  "J.D., Harvard Law School",
  "J.D., Yale Law School",
  "J.D., Stanford Law School",
  "J.D., Columbia Law School",
  "J.D., University of Chicago Law School",
  "J.D., New York University School of Law",
  "J.D., University of Pennsylvania Carey Law School",
  "J.D., University of Virginia School of Law",
  "J.D., University of California, Berkeley School of Law",
  "J.D., University of Michigan Law School",
  "J.D., Duke University School of Law",
  "J.D., Northwestern University Pritzker School of Law",
  "J.D., Cornell Law School",
  "J.D., Georgetown University Law Center",
  "J.D., University of Texas School of Law",
  "J.D., UCLA School of Law",
  "J.D., Vanderbilt University Law School",
  "J.D., Washington University School of Law",
  "J.D., University of Southern California Gould School of Law",
  "J.D., Boston University School of Law",
  "J.D., University of Notre Dame Law School",
  "J.D., Emory University School of Law",
  "J.D., George Washington University Law School",
  "J.D., University of Minnesota Law School",
  "J.D., University of North Carolina School of Law",
  "B.A., Political Science, University of California, Berkeley",
  "B.A., Criminal Justice, John Jay College",
  "B.S., Psychology, University of Michigan",
  "B.A., Sociology, New York University",
  "B.A., Philosophy, Boston College"
];

// Common awards for attorneys
const commonAwards = [
  "Super Lawyers Rising Star",
  "Best Lawyers in America",
  "Top 100 Trial Lawyers",
  "AV Preeminent Rating by Martindale-Hubbell",
  "National Trial Lawyers: Top 40 Under 40",
  "American Academy of Trial Attorneys Premier 100",
  "10.0 Superb Rating on Avvo",
  "Lead Counsel Verified Attorney",
  "Top Rated Criminal Defense Attorney",
  "Client's Choice Award",
  "Best of the Bar Award",
  "Top 10 Criminal Defense Attorneys",
  "Excellence in Practice Award",
  "Distinguished Counsel Award",
  "Legal Elite Award",
  "America's Top 100 Attorneys",
  "Top 10 Attorney Award",
  "Client Satisfaction Award",
  "Expertise Best Criminal Defense Lawyers",
  "Top Lawyers in Criminal Defense"
];

// Common languages spoken by attorneys
const commonLanguages = [
  "English",
  "Spanish",
  "French",
  "Mandarin",
  "Cantonese",
  "Vietnamese",
  "Korean",
  "Russian",
  "Arabic",
  "Portuguese",
  "Italian",
  "German",
  "Tagalog",
  "Hindi",
  "Urdu",
  "Japanese",
  "Polish",
  "Greek",
  "Hebrew",
  "Bengali"
];

// Common bar admissions
const commonBarAdmissions = [
  "State Bar of California",
  "State Bar of New York",
  "State Bar of Texas",
  "State Bar of Florida",
  "State Bar of Illinois",
  "State Bar of Pennsylvania",
  "State Bar of Ohio",
  "State Bar of Georgia",
  "State Bar of Michigan",
  "State Bar of New Jersey",
  "State Bar of Virginia",
  "State Bar of Washington",
  "State Bar of Massachusetts",
  "State Bar of Arizona",
  "State Bar of Indiana",
  "State Bar of Tennessee",
  "State Bar of Missouri",
  "State Bar of Maryland",
  "State Bar of Wisconsin",
  "State Bar of Minnesota",
  "State Bar of Colorado",
  "State Bar of Alabama",
  "State Bar of South Carolina",
  "State Bar of Louisiana",
  "State Bar of Kentucky",
  "State Bar of Oregon",
  "State Bar of Oklahoma",
  "State Bar of Connecticut",
  "State Bar of Iowa",
  "State Bar of Mississippi",
  "U.S. District Court, Northern District of California",
  "U.S. District Court, Central District of California",
  "U.S. District Court, Southern District of New York",
  "U.S. District Court, Eastern District of New York",
  "U.S. Court of Appeals for the Ninth Circuit",
  "U.S. Court of Appeals for the Second Circuit",
  "U.S. Supreme Court"
];

// Function to generate a random long description
const generateLongDescription = (name: string, specialty: string, city: string, state: string) => {
  const paragraphs = [
    `${name} is a dedicated expungement attorney based in ${city}, ${state}, with a focus on ${specialty}. With years of experience helping clients clear their criminal records, ${name.split(' ')[0]} has developed a reputation for thoroughness, compassion, and results.`,
    
    `Having successfully handled hundreds of expungement cases, ${name.split(' ')[0]} understands the profound impact that a criminal record can have on a person's life. From employment opportunities to housing applications, a criminal record can create barriers that prevent individuals from moving forward. ${name.split(' ')[0]}'s practice is dedicated to helping clients overcome these barriers and start fresh.`,
    
    `${name.split(' ')[0]} takes a personalized approach to each case, recognizing that every client's situation is unique. After a thorough evaluation of your criminal history and the applicable laws in ${state}, ${name.split(' ')[0]} will develop a strategic plan tailored to your specific circumstances and goals. Throughout the process, you can expect clear communication, honest assessments, and dedicated advocacy.`,
    
    `Beyond expungement services, ${name.split(' ')[0]} also assists clients with record sealing, certificates of rehabilitation, and other post-conviction relief options. The firm's comprehensive approach ensures that clients receive the most effective solution for their particular situation.`,
    
    `${name.split(' ')[0]} is committed to making legal services accessible and affordable. The firm offers free initial consultations and flexible payment options to ensure that everyone has access to the legal representation they need to move forward with their lives.`
  ];
  
  return paragraphs.join('\n\n');
};

// First names for diversity
const firstNames = [
  "James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda", "William", "Elizabeth",
  "David", "Susan", "Richard", "Jessica", "Joseph", "Sarah", "Thomas", "Karen", "Charles", "Nancy",
  "Christopher", "Lisa", "Daniel", "Margaret", "Matthew", "Betty", "Anthony", "Sandra", "Mark", "Ashley",
  "Donald", "Kimberly", "Steven", "Emily", "Paul", "Donna", "Andrew", "Michelle", "Joshua", "Carol",
  "Kenneth", "Amanda", "Kevin", "Melissa", "Brian", "Deborah", "George", "Stephanie", "Timothy", "Rebecca",
  "Ronald", "Laura", "Edward", "Sharon", "Jason", "Cynthia", "Jeffrey", "Kathleen", "Ryan", "Amy",
  "Jacob", "Shirley", "Gary", "Angela", "Nicholas", "Helen", "Eric", "Anna", "Jonathan", "Brenda",
  "Stephen", "Pamela", "Larry", "Nicole", "Justin", "Samantha", "Scott", "Katherine", "Brandon", "Emma",
  "Benjamin", "Ruth", "Samuel", "Christine", "Gregory", "Catherine", "Alexander", "Debra", "Frank", "Rachel",
  "Patrick", "Carolyn", "Raymond", "Janet", "Jack", "Virginia", "Dennis", "Maria", "Jerry", "Heather",
  "Tyler", "Diane", "Aaron", "Julie", "Jose", "Joyce", "Adam", "Victoria", "Nathan", "Kelly",
  "Henry", "Christina", "Douglas", "Lauren", "Zachary", "Joan", "Peter", "Evelyn", "Kyle", "Olivia",
  "Ethan", "Judith", "Walter", "Megan", "Noah", "Cheryl", "Jeremy", "Martha", "Christian", "Andrea",
  "Keith", "Frances", "Roger", "Hannah", "Terry", "Jacqueline", "Gerald", "Ann", "Harold", "Gloria",
  "Sean", "Teresa", "Austin", "Kathryn", "Carl", "Sara", "Arthur", "Janice", "Lawrence", "Jean",
  "Dylan", "Alice", "Jesse", "Madison", "Jordan", "Doris", "Bryan", "Abigail", "Billy", "Julia",
  "Joe", "Judy", "Bruce", "Grace", "Gabriel", "Denise", "Logan", "Amber", "Albert", "Marilyn",
  "Willie", "Beverly", "Alan", "Danielle", "Juan", "Theresa", "Wayne", "Sophia", "Elijah", "Marie",
  "Randy", "Diana", "Roy", "Brittany", "Vincent", "Natalie", "Ralph", "Isabella", "Eugene", "Charlotte",
  "Russell", "Rose", "Bobby", "Alexis", "Mason", "Kayla", "Philip", "Lori", "Louis", "Zoe",
  "Malik", "Aisha", "Jamal", "Keisha", "DeAndre", "Latoya", "Tyrone", "Tanisha", "Darnell", "Imani",
  "Wei", "Mei", "Jin", "Ling", "Hiroshi", "Yuki", "Takashi", "Sakura", "Ji-hoon", "Min-ji",
  "Carlos", "Sofia", "Miguel", "Isabella", "Rafael", "Valentina", "Alejandro", "Camila", "Javier", "Lucia",
  "Ahmed", "Fatima", "Mohammed", "Aisha", "Omar", "Layla", "Mustafa", "Zara", "Raj", "Priya",
  "Vikram", "Neha", "Arjun", "Ananya", "Sanjay", "Divya", "Pavel", "Anastasia", "Dmitri", "Natasha"
];

// Last names for diversity
const lastNames = [
  "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
  "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson",
  "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King",
  "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter",
  "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins",
  "Stewart", "Sanchez", "Morris", "Rogers", "Reed", "Cook", "Morgan", "Bell", "Murphy", "Bailey",
  "Rivera", "Cooper", "Richardson", "Cox", "Howard", "Ward", "Torres", "Peterson", "Gray", "Ramirez",
  "James", "Watson", "Brooks", "Kelly", "Sanders", "Price", "Bennett", "Wood", "Barnes", "Ross",
  "Henderson", "Coleman", "Jenkins", "Perry", "Powell", "Long", "Patterson", "Hughes", "Flores", "Washington",
  "Butler", "Simmons", "Foster", "Gonzales", "Bryant", "Alexander", "Russell", "Griffin", "Diaz", "Hayes",
  "Myers", "Ford", "Hamilton", "Graham", "Sullivan", "Wallace", "Woods", "Cole", "West", "Jordan",
  "Owens", "Reynolds", "Fisher", "Ellis", "Harrison", "Gibson", "Mcdonald", "Cruz", "Marshall", "Ortiz",
  "Gomez", "Murray", "Freeman", "Wells", "Webb", "Simpson", "Stevens", "Tucker", "Porter", "Hunter",
  "Hicks", "Crawford", "Henry", "Boyd", "Mason", "Morales", "Kennedy", "Warren", "Dixon", "Ramos",
  "Reyes", "Burns", "Gordon", "Shaw", "Holmes", "Rice", "Robertson", "Hunt", "Black", "Daniels",
  "Palmer", "Mills", "Nichols", "Grant", "Knight", "Ferguson", "Rose", "Stone", "Hawkins", "Dunn",
  "Perkins", "Hudson", "Spencer", "Gardner", "Stephens", "Payne", "Pierce", "Berry", "Matthews", "Arnold",
  "Wagner", "Willis", "Ray", "Watkins", "Olson", "Carroll", "Duncan", "Snyder", "Hart", "Cunningham",
  "Bradley", "Lane", "Andrews", "Ruiz", "Harper", "Fox", "Riley", "Armstrong", "Carpenter", "Weaver",
  "Greene", "Lawrence", "Elliott", "Chavez", "Sims", "Austin", "Peters", "Kelley", "Franklin", "Lawson",
  "Washington", "Jefferson", "Jackson", "Banks", "Booker", "Gaines", "Malone", "Simmons", "Payne", "Mosley",
  "Chen", "Zhang", "Wang", "Li", "Liu", "Yang", "Huang", "Wu", "Zhou", "Zhu",
  "Kim", "Park", "Lee", "Choi", "Jeong", "Kang", "Cho", "Yoon", "Jang", "Lim",
  "Suzuki", "Tanaka", "Watanabe", "Takahashi", "Ito", "Yamamoto", "Nakamura", "Kobayashi", "Saito", "Kato",
  "Rodriguez", "Gonzalez", "Hernandez", "Lopez", "Martinez", "Perez", "Sanchez", "Torres", "Ramirez", "Flores",
  "Nguyen", "Tran", "Pham", "Vu", "Dang", "Bui", "Do", "Ho", "Nguyen", "Le",
  "Ali", "Ahmed", "Mohamed", "Khan", "Hassan", "Hussein", "Rahman", "Mahmoud", "Malik", "Amir",
  "Patel", "Singh", "Sharma", "Kumar", "Shah", "Desai", "Gupta", "Mehta", "Joshi", "Malhotra",
  "Ivanov", "Smirnov", "Kuznetsov", "Popov", "Vasiliev", "Petrov", "Sokolov", "Mikhailov", "Fedorov", "Morozov"
];

// Generate attorneys for each city
export const attorneys: Attorney[] = [];

cities.forEach(city => {
  for (let i = 0; i < 2; i++) {
    // Generate random name
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    
    // Generate random specialty
    const specialty = "Expungement Attorney" + (Math.random() > 0.5 ? " & Criminal Defense" : "");
    
    // Generate random description
    const description = `${name} is an experienced ${specialty.toLowerCase()} in ${city.name}, ${city.state} who specializes in helping clients clear their criminal records and get a fresh start.`;
    
    // Generate random address
    const streetNumber = Math.floor(Math.random() * 9000) + 1000;
    const streetNames = ["Main St", "Oak Ave", "Maple Rd", "Washington Blvd", "Park Ave", "Broadway", "Market St", "Center St", "Liberty Ave", "Court St"];
    const streetName = streetNames[Math.floor(Math.random() * streetNames.length)];
    const address = `${streetNumber} ${streetName}, Suite ${Math.floor(Math.random() * 500) + 100}, ${city.name}, ${city.state}`;
    
    // Generate random website and email
    const nameParts = name.toLowerCase().split(' ');
    const domain = Math.random() > 0.5 ? "lawfirm.com" : "legal.com";
    const website = `https://www.${nameParts.join('')}${domain}`;
    const email = `${nameParts[0]}.${nameParts[1]}@${nameParts.join('')}${domain}`;
    
    // Generate random slug
    const slug = `${nameParts.join('-')}-${city.slug}`;
    
    // Use attorney silhouette image for all attorneys
    const image = `/images/attorneys/attorney-silhouette.svg`;
    
    // Generate random practice areas (4-8 areas)
    const numPracticeAreas = Math.floor(Math.random() * 5) + 4;
    const practiceAreas = [];
    const practiceAreasSet = new Set<string>();
    
    while (practiceAreasSet.size < numPracticeAreas) {
      const area = commonPracticeAreas[Math.floor(Math.random() * commonPracticeAreas.length)];
      practiceAreasSet.add(area);
    }
    practiceAreasSet.forEach(area => practiceAreas.push(area));
    
    // Generate random education (2-3 institutions)
    const numEducation = Math.floor(Math.random() * 2) + 2;
    const education = [];
    const educationSet = new Set<string>();
    
    while (educationSet.size < numEducation) {
      const edu = commonEducation[Math.floor(Math.random() * commonEducation.length)];
      educationSet.add(edu);
    }
    educationSet.forEach(edu => education.push(edu));
    
    // Generate random bar admissions (2-4 admissions)
    const numBarAdmissions = Math.floor(Math.random() * 3) + 2;
    const barAdmissions = [];
    const barAdmissionsSet = new Set<string>();
    
    // Always include the state bar where the attorney practices
    barAdmissionsSet.add(`State Bar of ${city.state}`);
    
    while (barAdmissionsSet.size < numBarAdmissions) {
      const admission = commonBarAdmissions[Math.floor(Math.random() * commonBarAdmissions.length)];
      barAdmissionsSet.add(admission);
    }
    barAdmissionsSet.forEach(admission => barAdmissions.push(admission));
    
    // Generate random awards (2-4 awards)
    const numAwards = Math.floor(Math.random() * 3) + 2;
    const awards = [];
    const awardsSet = new Set<string>();
    
    while (awardsSet.size < numAwards) {
      const award = commonAwards[Math.floor(Math.random() * commonAwards.length)];
      awardsSet.add(award);
    }
    awardsSet.forEach(award => awards.push(award));
    
    // Generate random languages (1-3 languages)
    const numLanguages = Math.floor(Math.random() * 3) + 1;
    const languages = ["English"];
    const languagesSet = new Set<string>(languages);
    
    while (languagesSet.size < numLanguages) {
      const language = commonLanguages[Math.floor(Math.random() * commonLanguages.length)];
      languagesSet.add(language);
    }
    languages.length = 0;
    languagesSet.forEach(language => languages.push(language));
    
    // Generate long description
    const longDescription = generateLongDescription(name, specialty, city.name, city.state);
    
    // Create attorney object
    attorneys.push({
      id: `attorney-${attorneys.length + 1}`,
      name,
      image,
      rating: generateRating(),
      reviewCount: generateReviewCount(),
      specialty,
      description,
      longDescription,
      phone: generatePhoneNumber(),
      website,
      email,
      address,
      citySlug: city.slug, // Keep using the original slug for filtering
      slug,
      practiceAreas,
      education,
      barAdmissions,
      awards,
      languages
    });
  }
});

// Function to get attorneys by city slug
export const getAttorneysByCitySlug = (citySlug: string): Attorney[] => {
  return attorneys.filter(attorney => attorney.citySlug === citySlug);
};

// Function to get attorney by slug
export const getAttorneyBySlug = (slug: string): Attorney | undefined => {
  return attorneys.find(attorney => attorney.slug === slug);
};
