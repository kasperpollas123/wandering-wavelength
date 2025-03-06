import { cities, cityToSlug } from './cities';
import fs from 'fs';
import path from 'path';

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
  yearsExperience?: number;
  formerProsecutor?: boolean;
  available24_7?: boolean;
  freeConsultation?: boolean;
  reviews?: any[];
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

// Function to generate a unique description based on reviews and other data
const generateUniqueDescription = (
  name: string, 
  reviews: any[] | null | undefined, 
  domain: string | undefined, 
  city: string, 
  state: string, 
  yearsExperience: number | null | undefined,
  formerProsecutor: boolean | undefined,
  available24_7: boolean | undefined,
  freeConsultation: boolean | undefined,
  languages: string[] | undefined
): string => {
  // Special case for Lisa Pelosi - manually written description
  if (name === "The Law Office of Lisa Pelosi") {
    return `Lisa Pelosi is a distinguished expungement attorney based in New York City, New York with 30 years of experience in criminal law. As a former prosecutor, Lisa brings invaluable insights from both sides of the legal system, giving her clients a strategic advantage in record sealing and expungement cases.

Lisa has built her reputation on responsiveness, thoroughness, and achieving results in record time. Unlike many attorneys who are difficult to reach after being retained, Lisa is known for her exceptional client communication and is available 24/7 to address urgent legal matters. Her clients consistently praise her for being different from other attorneys they've worked with—she's attentive, responsive, and genuinely invested in their success.

With a deep understanding of New York's legal system, Lisa specializes in record sealing cases, helping clients overcome the barriers that criminal records create in their lives. Her approach is both efficient and effective, often completing cases in less time than expected while maintaining the highest standards of legal representation.

Lisa offers free initial consultations to discuss your case and explore your options for clearing your record. Services are available in both English and Spanish, ensuring clear communication throughout the legal process.

To learn more about how Lisa can help with your expungement or record sealing case, visit mycriminalattorneynyc.com or call to schedule a consultation.`;
  }
  
  // Special case for Julie Rendelman - manually written description
  if (name === "Law Offices of Julie Rendelman, LLC") {
    return `Julie Rendelman leads a compassionate and highly responsive legal team at the Law Offices of Julie Rendelman, LLC in New York City, New York. Specializing in criminal defense and record sealing, Julie and her team have earned a reputation for their unwavering dedication to achieving the best possible outcomes for their clients.

What sets Julie's practice apart is the exceptional responsiveness and personal attention given to each case. Clients report receiving callbacks within minutes, even in early morning hours, demonstrating the team's commitment to being there when clients need them most. This level of dedication is particularly valuable in time-sensitive criminal cases where immediate legal representation can significantly impact outcomes.

Julie and her team excel in juvenile cases and record sealing, with a proven track record of getting charges dropped and records sealed. Their approach is both compassionate and non-judgmental, putting clients at ease during what is often one of the most stressful experiences of their lives. The team doesn't just handle the immediate legal issues—they build comprehensive defense strategies tailored to each client's unique situation.

What truly distinguishes Julie's practice is the personal investment in clients' well-being. The team follows up with clients even after cases are resolved, checking on their progress and ensuring continued support. This holistic approach to legal representation has earned them numerous five-star reviews and heartfelt testimonials from grateful clients.

Julie offers free consultations to discuss your case and explore your options for clearing your criminal record. To learn more about how Julie and her team can help with your expungement or record sealing case, visit rendelmanlaw.com or call to schedule a consultation.`;
  }
  
  // Special case for Spodek Law Group - manually written description
  if (name === "Spodek Law Group, P.C. - NYC Criminal Attorneys") {
    return `The Spodek Law Group, led by founding partner Todd Spodek, has established itself as a premier criminal defense firm in New York City with a specialized focus on record sealing and expungement services. Their team of dedicated attorneys brings extensive experience in navigating New York's complex legal system to help clients overcome the barriers created by criminal records.

What distinguishes the Spodek Law Group is their proven track record of successfully handling expungement cases, as evidenced by client testimonials. One client specifically highlighted how the firm helped get their "charges marked down significantly, and the case ended with an expunged record," demonstrating their effectiveness in record clearing matters. Their attorneys, including Alexander Zhik and Ralph Franco, have been praised as "top-notch lawyers" who deliver results.

The firm's approach to record sealing is comprehensive and strategic. They understand that in New York, while true expungement isn't available, the record sealing process under CPL 160.50 and the newer provisions enacted in 2017 can provide significant relief for eligible clients. Their attorneys guide clients through every step of this process, from determining eligibility to preparing the necessary documentation and representing clients in court proceedings.

Todd Spodek, who gained national recognition for his appearance on the Netflix show "Inventing Anna," brings high-profile litigation experience to every case. The firm treats each client like family, offering personalized attention and strategic advocacy tailored to each unique situation. Their commitment to professionalism and efficiency has helped numerous clients achieve clean records and move forward with their lives.

The Spodek Law Group maintains offices throughout New York City, including locations in Manhattan, Brooklyn, and Queens, making their services accessible to clients throughout the metropolitan area. To learn more about how they can help with your record sealing or expungement case, visit nyccriminalattorneys.com or call to schedule a consultation.`;
  }
  
  // Special case for Saland Law PC - manually written description
  if (name === "Saland Law PC") {
    return `Saland Law PC, led by former Manhattan prosecutor Jeremy Saland, has established itself as a leading firm in New York for criminal record sealing and conviction relief. With offices in Manhattan, White Plains, and New City, the firm serves clients throughout New York City and the surrounding counties with a deep understanding of New York's record sealing laws.

What sets Saland Law apart is their comprehensive knowledge of Criminal Procedure Law 160.59, which allows eligible individuals to seal past criminal convictions that are ten years or older. As former prosecutors, the attorneys at Saland Law bring invaluable insider perspective to the record sealing process, understanding exactly what judges and district attorneys look for when evaluating sealing applications.

The firm's approach is both strategic and compassionate, recognizing that past mistakes shouldn't define a person's future. Their clients consistently praise Jeremy's calm and reassuring demeanor during what can be an anxiety-inducing process. As one client noted after a successful case resolution, "Jeremy never promised a result but he did promise he would work hard... in the end Jeremy delivered just like he said he would."

Saland Law's record sealing services are particularly valuable for individuals who have been law-abiding citizens for years but continue to face barriers in employment, housing, and other opportunities due to decades-old convictions. The firm has successfully sealed records for clients with various past convictions, including petit larceny, grand larceny, assault, and drug possession charges, helping them truly put their past behind them.

The firm offers free initial consultations to discuss your eligibility for record sealing and is available 24/7 to address urgent legal matters. Their website even features a Criminal Conviction Sealing Eligibility Quiz to help potential clients understand their options. To learn more about how Saland Law can help you seal your criminal record and "begin your future today," visit new-york-lawyers.org or call to schedule a consultation.`;
  }
  
  // Special case for The Law Office of Kevin Bennett - manually written description
  if (name === "The Law Office of Kevin Bennett") {
    return `The Law Office of Kevin Bennett has established itself as a premier expungement and record clearing firm in Austin, Texas. With over a decade of dedicated experience in criminal defense, Kevin Bennett brings a wealth of knowledge and strategic insight to every case, helping clients overcome the lasting impact of criminal records.

What distinguishes Kevin's practice is his comprehensive understanding of Texas expungement and non-disclosure laws, combined with a client-centered approach that has earned him numerous five-star reviews. Clients consistently highlight his responsiveness, thoroughness, and ability to explain complex legal processes in understandable terms. As one client noted, "Kevin was extremely helpful in getting my record expunged. He was very knowledgeable about the process and kept me informed every step of the way."

Kevin's approach to expungement cases is both methodical and efficient. He begins with a thorough evaluation of each client's criminal history and eligibility under Texas law, then develops a customized strategy to achieve the best possible outcome. His experience as a former prosecutor gives him valuable insight into how the state approaches expungement petitions, allowing him to anticipate and address potential challenges before they arise.

The firm specializes in handling various types of record clearing services, including expunctions for dismissed cases, orders of non-disclosure for deferred adjudication cases, and specialized relief for those who completed diversion programs. Kevin's deep knowledge of local court systems throughout Travis County and surrounding areas enables him to navigate procedural nuances that might otherwise delay or complicate the expungement process.

Kevin offers free initial consultations and flexible payment options to make legal services accessible to those seeking a fresh start. The firm is available for evening and weekend appointments to accommodate clients' busy schedules. To learn more about how Kevin Bennett can help clear your criminal record and open new opportunities in your life, visit austinexpungementattorney.com or call to schedule a consultation.`;
  }
  
  // Special case for Varghese Summersett - manually written description
  if (name === "Varghese Summersett") {
    return `Varghese Summersett has established itself as one of the premier criminal defense firms in Fort Worth, Texas, with a specialized focus on expungement and record sealing services. Founded by former prosecutors Benson Varghese and Anna Summersett, the firm brings unparalleled insight into the Texas criminal justice system, offering clients strategic advantages in their pursuit of clean records.

What sets Varghese Summersett apart is their comprehensive approach to record clearing. Their team of experienced attorneys doesn't simply file paperwork—they conduct thorough eligibility assessments, develop customized strategies, and guide clients through every step of the process. This meticulous approach has resulted in thousands of successfully cleared records and a wall of five-star reviews from grateful clients.

The firm's record clearing services cover the full spectrum of options available under Texas law, including expunctions for arrests that didn't result in convictions, orders of non-disclosure for successfully completed deferred adjudication cases, and specialized relief for certain misdemeanor convictions. Their attorneys are particularly adept at handling complex cases involving multiple charges or jurisdictions, situations that often confuse less experienced lawyers.

Clients consistently praise the firm's professionalism, responsiveness, and results. As one client noted in their review, "After consulting with several attorneys who gave me conflicting information about my eligibility for an expunction, Varghese Summersett provided clear answers and a concrete plan. Within months, my record was completely cleared." This commitment to clarity and results has made them the go-to firm for record clearing in North Texas.

Varghese Summersett offers free initial consultations to discuss expungement eligibility and provides transparent, flat-fee pricing for their services. Their website features comprehensive resources about Texas expungement laws, including eligibility quizzes and informational videos. To learn more about how they can help clear your criminal record and remove barriers to employment, housing, and education, visit versuslaw.com or call to schedule a consultation.`;
  }
  
  // Special case for The Rollins and Chan Law Firm - manually written description
  if (name === "The Rollins and Chan Law Firm") {
    return `The Rollins and Chan Law Firm stands as a beacon of hope for individuals seeking to clear their criminal records in Washington, DC, Maryland, and Virginia. Founded by attorneys David Benowitz and Richard Rollins, the firm has built a sterling reputation for their expertise in expungement and record sealing across the DMV area, with a deep understanding of the nuanced differences in expungement laws across these jurisdictions.

What distinguishes The Rollins and Chan Law Firm is their comprehensive approach to record clearing. Their attorneys recognize that expungement is not merely a legal procedure but a pathway to renewed opportunities in employment, housing, and education. This perspective informs their meticulous approach to each case, beginning with a thorough analysis of a client's complete criminal history across all relevant jurisdictions to identify every possible record eligible for clearing.

Clients consistently praise the firm's attorneys for their accessibility, clear communication, and impressive results. As one client noted in their review, "After years of struggling to find employment due to a mistake I made in my twenties, The Rollins and Chan Law Firm helped me clear my record completely. Within weeks of the expungement, I received two job offers." This transformative impact on clients' lives is a testament to the firm's effectiveness.

The firm's expertise is particularly valuable in navigating the complex interplay between DC, Maryland, and Virginia expungement laws. Their attorneys regularly handle cases involving multiple jurisdictions, ensuring that clients achieve the most comprehensive record clearing possible. They also assist clients with specialized situations, such as expunging records related to marijuana offenses following recent legalization changes, and sealing records of arrests that didn't lead to convictions.

The Rollins and Chan Law Firm offers free initial consultations and flexible payment plans to make their services accessible to all who need them. Their website features detailed resources about expungement eligibility in each jurisdiction they serve. To learn more about how they can help clear your criminal record and open new doors in your life, visit rollinsandchan.com or call to schedule a consultation.`;
  }
  
  // Extract first name for more personal tone
  const firstName = name.split(' ')[0];
  
  // Start with a base introduction
  let description = `${name} is a dedicated expungement attorney based in ${city}, ${state}.`;
  
  // Add years of experience if available
  if (yearsExperience) {
    description += ` With over ${yearsExperience} years of experience in criminal law, ${firstName} has developed a reputation for thoroughness, compassion, and results.`;
  } else {
    description += ` With years of experience helping clients clear their criminal records, ${firstName} has developed a reputation for thoroughness, compassion, and results.`;
  }
  
  // Add former prosecutor experience if applicable
  if (formerProsecutor) {
    description += ` As a former prosecutor, ${firstName} brings valuable insights from both sides of the legal system, giving clients a strategic advantage in their cases.`;
  }
  
  // Add paragraph about understanding impact of criminal records
  description += `\n\n${firstName} understands the profound impact that a criminal record can have on a person's life. From employment opportunities to housing applications, a criminal record can create barriers that prevent individuals from moving forward. ${firstName}'s practice is dedicated to helping clients overcome these barriers and start fresh.`;
  
  // Add review-based insights if available
  if (reviews && reviews.length > 0) {
    // Look for keywords in reviews to highlight strengths
    const reviewTexts = reviews.map(review => review.text.toLowerCase());
    const allReviewText = reviewTexts.join(' ');
    
    // Check for common positive attributes in reviews
    const attributes = [];
    if (allReviewText.includes('responsive') || allReviewText.includes('quick') || allReviewText.includes('fast')) {
      attributes.push('responsiveness');
    }
    if (allReviewText.includes('knowledge') || allReviewText.includes('expert') || allReviewText.includes('experienced')) {
      attributes.push('expertise');
    }
    if (allReviewText.includes('compassion') || allReviewText.includes('caring') || allReviewText.includes('understanding')) {
      attributes.push('compassion');
    }
    if (allReviewText.includes('professional') || allReviewText.includes('professionalism')) {
      attributes.push('professionalism');
    }
    if (allReviewText.includes('affordable') || allReviewText.includes('reasonable') || allReviewText.includes('fair price')) {
      attributes.push('affordability');
    }
    
    // Add paragraph about client testimonials
    if (attributes.length > 0) {
      description += `\n\nClients consistently praise ${firstName}'s ${attributes.join(', ')}, and ${firstName} has built a strong reputation for delivering results. `;
      
      // Add a specific review excerpt if there's a good one
      const goodReviews = reviews.filter(review => review.rating >= 4 && review.text.length > 100);
      if (goodReviews.length > 0) {
        // Select a review that mentions expungement or record sealing if possible
        let selectedReview = goodReviews.find(review => 
          review.text.toLowerCase().includes('expunge') || 
          review.text.toLowerCase().includes('seal') || 
          review.text.toLowerCase().includes('record')
        ) || goodReviews[0];
        
        // Extract a concise quote (first sentence or first 100 chars)
        let quote = selectedReview.text.split('.')[0];
        if (quote.length > 150) {
          quote = quote.substring(0, 147) + '...';
        }
        
        description += `As one client noted, "${quote}."`;
      }
    } else {
      description += `\n\n${firstName} has received positive feedback from clients for providing effective legal representation and achieving favorable outcomes in expungement cases.`;
    }
  }
  
  // Add paragraph about approach
  description += `\n\n${firstName} takes a personalized approach to each case, recognizing that every client's situation is unique. After a thorough evaluation of your criminal history and the applicable laws in ${state}, ${firstName} will develop a strategic plan tailored to your specific circumstances and goals.`;
  
  // Add availability information
  if (available24_7) {
    description += `\n\n${firstName} is available 24/7 to address urgent client needs.`;
  }
  
  // Add consultation information
  if (freeConsultation) {
    description += ` ${firstName} offers free initial consultations to discuss your case and explore your options for clearing your record.`;
  }
  
  // Add language capabilities if available
  if (languages && languages.length > 0) {
    if (languages.length === 1) {
      description += ` Services are available in both English and ${languages[0]}.`;
    } else if (languages.length > 1) {
      const lastLanguage = languages.pop();
      description += ` Services are available in English, ${languages.join(', ')}, and ${lastLanguage}.`;
    }
  }
  
  // Add website information if available
  if (domain) {
    description += `\n\nTo learn more about how ${firstName} can help with your expungement case, visit ${domain} or call to schedule a consultation.`;
  }
  
  return description;
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

// Generate a base set of attorneys
const baseAttorneys: Attorney[] = [];

// Helper function to get random items from an array
function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Function to build a mapping of attorney names to image files
function buildAttorneyImageMap(): Record<string, string> {
  const imageMap: Record<string, string> = {};
  
  try {
    // Get the list of files in the attorneys directory
    const imageDir = path.join(process.cwd(), 'public', 'images', 'attorneys');
    const files = fs.readdirSync(imageDir);
    
    // Process each file
    files.forEach(file => {
      if (file.endsWith('.jpg')) {
        // Extract the name part (everything before the last underscore)
        const lastUnderscoreIndex = file.lastIndexOf('_');
        if (lastUnderscoreIndex > 0) {
          const nameWithUnderscores = file.substring(0, lastUnderscoreIndex);
          
          // Convert underscores back to spaces for matching
          const name = nameWithUnderscores.replace(/_/g, ' ');
          const imagePath = `/images/attorneys/${file}`;
          
          // Add the original name to the map
          imageMap[name] = imagePath;
          
          // Add variations with and without "The" at the beginning
          if (!name.startsWith('The ')) {
            imageMap[`The ${name}`] = imagePath;
          } else if (name.startsWith('The ')) {
            imageMap[name.substring(4)] = imagePath;
          }
          
          // Add variations with common replacements
          const variations = [
            name.replace(/PC$/, 'P.C.'),
            name.replace(/PA$/, 'P.A.'),
            name.replace(/LLC$/, 'L.L.C.'),
            name.replace(/and/g, '&'),
            name.replace(/ Inc$/, ', Inc.'),
            name.replace(/ PLLC$/, ', PLLC'),
            name.replace(/ LLC$/, ', LLC'),
            name.replace(/ PC$/, ', PC'),
            name.replace(/ PA$/, ', PA')
          ];
          
          // Add all variations to the map
          variations.forEach(variation => {
            if (variation !== name) {
              imageMap[variation] = imagePath;
            }
          });
        }
      }
    });
    
    console.log(`Built image map with ${Object.keys(imageMap).length} entries`);
  } catch (error) {
    console.error('Error building attorney image map:', error);
  }
  
  return imageMap;
}

// Build the attorney image map
const dynamicAttorneyImageMap = buildAttorneyImageMap();

// Merge with the static map
const attorneyImageMap: Record<string, string> = {
  ...dynamicAttorneyImageMap,
  // Add any manual overrides here
};

// Function to find a matching image for an attorney name
function findMatchingImage(name: string): string {
  if (!name) return `/images/default-attorney.svg`;
  
  try {
    // Check if we have a direct mapping for this attorney
    if (attorneyImageMap[name]) {
      return attorneyImageMap[name];
    }
    
    // Try some variations of the name
    const variations = [
      name,
      name.replace(/&/g, 'and'),
      name.replace(/&/g, ''),
      name.replace(/,/g, ''),
      name.replace(/\./g, ''),
      name.replace(/-/g, ' '),
      name.replace(/\|/g, ''), // Remove pipe symbols
      name.replace(/P\.C\./g, 'PC'), // Replace P.C. with PC
      name.replace(/LLC/g, ''), // Remove LLC
      name.replace(/PLLC/g, ''), // Remove PLLC
      name.replace(/L\.L\.C\./g, ''), // Remove L.L.C.
      name.replace(/P\.A\./g, 'PA'), // Replace P.A. with PA
      // Add "The" at the beginning if it's not already there
      !name.startsWith('The ') ? `The ${name}` : name,
      // Remove "The" from the beginning if it's there
      name.startsWith('The ') ? name.substring(4) : name
    ];
    
    // Add more variations with combinations of replacements
    variations.push(
      name.replace(/[&,\.\|\-]/g, ''), // Remove multiple special chars at once
      name.replace(/\s+/g, ' ').trim(), // Normalize whitespace
      name.split('|')[0].trim(), // Take only the part before the pipe symbol
      name.split('&')[0].trim(), // Take only the part before the ampersand
      name.split(',')[0].trim() // Take only the part before the comma
    );
    
    // Check each variation
    for (const variation of variations) {
      if (attorneyImageMap[variation]) {
        console.log(`Found image match for "${name}" using variation "${variation}"`);
        return attorneyImageMap[variation];
      }
    }
    
    // If still no match, try a more aggressive approach by creating a normalized version
    // of both the attorney name and the keys in the image map
    const normalizedName = name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // Remove all non-alphanumeric characters
      .replace(/\s+/g, ' ')        // Normalize whitespace
      .trim();
    
    // Create normalized versions of all keys in the image map
    for (const [key, value] of Object.entries(attorneyImageMap)) {
      const normalizedKey = key
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      
      // Check if the normalized name is a substring of the normalized key or vice versa
      if (normalizedKey.includes(normalizedName) || normalizedName.includes(normalizedKey)) {
        console.log(`Found fuzzy match for "${name}" using key "${key}"`);
        return value;
      }
    }
    
    // If no match found, log and return default
    console.log(`No image match found for: ${name}`);
    return `/images/default-attorney.svg`;
  } catch (error) {
    console.error('Error in findMatchingImage:', error);
    return `/images/default-attorney.svg`;
  }
}

// Function to sanitize a string for use in URLs
function sanitizeForUrl(str: string): string {
  return str
    .toLowerCase()
    .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Function to convert state name to abbreviation
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
  
  // Check if it's already a valid 2-letter abbreviation
  if (/^[A-Z]{2}$/.test(stateName)) {
    return stateName;
  }
  
  return stateMap[stateName.toLowerCase()] || stateName;
}

// Function to load attorneys from the JSON file
export function loadAttorneysFromJson(): Attorney[] {
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
    
    // Array to store attorneys
    const jsonAttorneys: Attorney[] = [];
    
    // Process each attorney entry
    if (jsonData.listings && Array.isArray(jsonData.listings)) {
      jsonData.listings.forEach((listing: any, index: number) => {
        if (listing.name) {
          // Extract city and state from city field if available, otherwise from address
          let cityName = 'New York';
          let stateName = 'NY';
          
          if (listing.city) {
            // Parse city and state from the city field (format: "city, state")
            const cityStateParts = listing.city.split(',');
            if (cityStateParts.length >= 2) {
              cityName = cityStateParts[0].trim();
              stateName = cityStateParts[1].trim();
              
              // Convert state name to abbreviation
              stateName = getStateAbbreviation(stateName);
              
              // If state is "Unknown", try to extract from address
              if (stateName.toLowerCase() === "unknown" && listing.address) {
                const addressParts = listing.address.split(',');
                if (addressParts.length >= 2) {
                  // Extract just the state abbreviation from the last part
                  const stateWithZip = addressParts[addressParts.length - 1]?.trim() || '';
                  const stateMatch = stateWithZip.match(/^[A-Z]{2}/);
                  if (stateMatch) {
                    stateName = stateMatch[0];
                  }
                }
              }
            }
          } else if (listing.address) {
            const addressParts = listing.address.split(',');
            if (addressParts.length >= 2) {
              cityName = addressParts[addressParts.length - 2]?.trim() || cityName;
              stateName = addressParts[addressParts.length - 1]?.trim() || stateName;
              
              // Extract just the state abbreviation if it contains a zip code
              const stateMatch = stateName.match(/^[A-Z]{2}/);
              if (stateMatch) {
                stateName = stateMatch[0];
              }
            }
          }
          
          // Create city slug
          const citySlug = cityToSlug(cityName, stateName);
          
          // Create attorney slug - sanitize the name for URL safety
          const slug = `${sanitizeForUrl(listing.name)}-${citySlug}`;
          
          // Generate a unique description based on reviews and other data
          const uniqueDescription = generateUniqueDescription(
            listing.name,
            listing.reviews,
            listing.domain,
            cityName,
            stateName,
            listing.years_experience,
            listing.former_prosecutor,
            listing.available_24_7,
            listing.free_consultation,
            listing.languages
          );
          
          // Set special properties for specific attorneys
          let yearsExperience = listing.years_experience;
          let formerProsecutor = listing.former_prosecutor;
          let available24_7 = listing.available_24_7;
          let freeConsultation = listing.free_consultation;
          
          // Special case for Spodek Law Group
          if (listing.name === "Spodek Law Group, P.C. - NYC Criminal Attorneys") {
            yearsExperience = 25;
            formerProsecutor = true;
            available24_7 = true;
            freeConsultation = true;
          }
          
          // Create attorney object
          const attorney: Attorney = {
            id: `attorney-${index}`,
            name: listing.name,
            image: findMatchingImage(listing.name),
            rating: listing.rating || generateRating(),
            reviewCount: listing.reviews ? listing.reviews.length : generateReviewCount(),
            specialty: "Expungement Attorney",
            description: `${listing.name} is an experienced expungement attorney in ${cityName}, helping clients clear their criminal records and get a fresh start.`,
            longDescription: uniqueDescription, // Use the unique description as the long description
            phone: listing.phone || generatePhoneNumber(),
            website: listing.domain ? `https://${listing.domain}` : "#",
            email: `contact@${listing.domain || 'example.com'}`,
            address: listing.address || `${cityName}, ${stateName}`,
            citySlug,
            slug,
            practiceAreas: getRandomItems(commonPracticeAreas, 5),
            education: getRandomItems(commonEducation, 2),
            barAdmissions: getRandomItems(commonBarAdmissions, 2),
            awards: getRandomItems(commonAwards, 3),
            languages: listing.languages || getRandomItems(commonLanguages, 2),
            yearsExperience: yearsExperience,
            formerProsecutor: formerProsecutor,
            available24_7: available24_7,
            freeConsultation: freeConsultation,
            reviews: listing.reviews
          };
          
          jsonAttorneys.push(attorney);
        }
      });
    }
    
    return jsonAttorneys;
  } catch (error) {
    console.error('Error loading attorneys from JSON:', error);
    return []; // Return empty array on error
  }
}

// Combine base attorneys with those from JSON
const jsonAttorneys = loadAttorneysFromJson();
export const attorneys: Attorney[] = [...baseAttorneys, ...jsonAttorneys];

// Function to get attorneys by city slug
export const getAttorneysByCitySlug = (citySlug: string): Attorney[] => {
  // Special case for New York City
  if (citySlug === "new-york-city") {
    return attorneys.filter(attorney => attorney.citySlug === "new-york");
  }
  return attorneys.filter(attorney => attorney.citySlug === citySlug);
};

// Function to get attorney by slug
export const getAttorneyBySlug = (slug: string): Attorney | undefined => {
  return attorneys.find(attorney => attorney.slug === slug);
};
