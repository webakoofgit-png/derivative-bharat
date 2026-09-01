import agumbeRainforest from "../assets/agumbe-rainforest.jpg";
import fortCorridor from "../assets/fort-corridor.jpg";
import hampiSunrise from "../assets/hampi-sunrise.webp";
import sahyadriFort from "../assets/sahyadri-fort.avif";
import spiceMarket from "../assets/spice-market.png";
import templeCarvings from "../assets/temple-carvings.jpg";

export const site = {
  name: "Derivative Bharat",
  legalName: "Derivative Bharat Heritage Journeys",
  url: "https://derivativebharat.com",
  description:
    "Cinematic heritage expeditions across India, led by historians, conservationists, and local storytellers.",
  email: "hello@derivativebharat.com",
  phone: "+91 98765 43210",
  address: "Pune, Maharashtra, India",
  coordinates: "18.5204 N, 73.8567 E",
  sameAs: [
    "https://www.instagram.com/derivativebharat",
    "https://www.youtube.com/@derivativebharat",
    "https://www.linkedin.com/company/derivative-bharat",
  ],
};

export type ItineraryDay = {
  day: number;
  title: string;
  location: string;
  summary: string;
  cues: string[];
};

export type Faq = {
  question: string;
  answer: string;
};

export type Expedition = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  destinationSlug: string;
  region: string;
  coordinates: string;
  duration: string;
  days: number;
  nights: number;
  price: string;
  groupSize: string;
  pace: "Soft" | "Moderate" | "Immersive";
  season: string;
  nextDeparture: string;
  dates: string[];
  image: string;
  gallery: string[];
  route: string[];
  description: string;
  story: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  faqs: Faq[];
  storyteller: string;
};

export type Destination = {
  slug: string;
  name: string;
  region: string;
  coordinates: string;
  image: string;
  mood: string;
  description: string;
  signature: string[];
};

export type Storyteller = {
  name: string;
  role: string;
  base: string;
  image: string;
  bio: string;
};

export type JournalArticle = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
};

export const expeditionCategories = [
  "Empire Trails",
  "Forts and Frontiers",
  "Temple Civilisations",
  "Rainforest Lore",
  "Market Walks",
];

const sharedInclusions = [
  "Storyteller-led walks and specialist sessions",
  "Boutique heritage stays or character-led lodges",
  "All local transfers listed in the itinerary",
  "Breakfasts, curated tastings, and welcome dinner",
  "Field notes, route maps, and reading list",
];

const sharedExclusions = [
  "Flights and train tickets to the start point",
  "Personal purchases, camera fees, and tips",
  "Travel insurance and medical expenses",
];

export const expeditions: Expedition[] = [
  {
    slug: "hampi-empire-in-stone",
    title: "Hampi: Empire in Stone",
    shortTitle: "Hampi",
    category: "Empire Trails",
    destinationSlug: "hampi",
    region: "Karnataka",
    coordinates: "15.3350 N, 76.4600 E",
    duration: "5 days / 4 nights",
    days: 5,
    nights: 4,
    price: "INR 48,500",
    groupSize: "10-14 travellers",
    pace: "Moderate",
    season: "October to March",
    nextDeparture: "2026-10-16",
    dates: ["2026-10-16", "2026-11-20", "2027-01-15"],
    image: hampiSunrise,
    gallery: [hampiSunrise, templeCarvings, spiceMarket],
    route: ["Hospet", "Virupaksha Bazaar", "Royal Enclosure", "Anegundi", "Tungabhadra"],
    description:
      "A slow expedition through Vijayanagara's ceremonial avenues, river myths, boulder fields, and temple economies.",
    story:
      "Hampi is not treated as a ruin here. It is read as an operating system: water, ritual, trade, music, granaries, kingship, and the quiet intelligence of stone.",
    highlights: [
      "Sunrise walk through Virupaksha Bazaar and Matanga Hill",
      "Private session on Vijayanagara urban planning",
      "Coracle crossing into Anegundi's older memoryscape",
      "Evening soundscape at the Vittala complex",
    ],
    inclusions: sharedInclusions,
    exclusions: sharedExclusions,
    storyteller: "Meera Kulkarni",
    itinerary: [
      {
        day: 1,
        title: "Arrival in the Granite Capital",
        location: "Hospet and Hampi Bazaar",
        summary:
          "Arrive, settle into the rhythm of the Tungabhadra, and begin with a twilight orientation through the old bazaar spine.",
        cues: ["Welcome dinner", "Field-notes briefing", "Night sky over boulders"],
      },
      {
        day: 2,
        title: "Ritual, Trade, and Procession",
        location: "Virupaksha, Hemakuta, Matanga",
        summary:
          "Trace the route from living temple to royal spectacle, with pauses for inscriptions, mandapas, and the logic of sacred geography.",
        cues: ["Sunrise climb", "Temple economy walk", "Stone mandapa sketching"],
      },
      {
        day: 3,
        title: "The Royal Machine",
        location: "Royal Enclosure and Lotus Mahal",
        summary:
          "Read courtly architecture as governance: waterworks, platforms, military quarters, elephant stables, and ceremonial power.",
        cues: ["Stepwell study", "Court architecture", "Archive dinner"],
      },
      {
        day: 4,
        title: "Across the River",
        location: "Anegundi",
        summary:
          "Cross into village memory, oral epics, craft homes, and quieter shrines that hold the pre-imperial layer of the landscape.",
        cues: ["Coracle crossing", "Village lunch", "Oral history circle"],
      },
      {
        day: 5,
        title: "Departure With a Map",
        location: "Tungabhadra riverbank",
        summary:
          "Close with a route reconstruction session and depart with a field map of the empire's urban grammar.",
        cues: ["Route recap", "Reading list", "Departure transfer"],
      },
    ],
    faqs: [
      {
        question: "Is this suitable for first-time heritage travellers?",
        answer:
          "Yes. The walk is layered, but every session starts from the visible site before moving into deeper history.",
      },
      {
        question: "How much walking is involved?",
        answer:
          "Expect four to six kilometres on most days, with uneven stone paths and optional sunrise climbs.",
      },
      {
        question: "Can families join?",
        answer:
          "Families with teens usually enjoy this route. For younger children, we suggest a private departure.",
      },
    ],
  },
  {
    slug: "rajput-fort-corridors",
    title: "Rajput Fort Corridors",
    shortTitle: "Rajput Forts",
    category: "Forts and Frontiers",
    destinationSlug: "mewar",
    region: "Rajasthan",
    coordinates: "24.5854 N, 73.7125 E",
    duration: "6 days / 5 nights",
    days: 6,
    nights: 5,
    price: "INR 68,000",
    groupSize: "8-12 travellers",
    pace: "Immersive",
    season: "November to February",
    nextDeparture: "2026-11-07",
    dates: ["2026-11-07", "2026-12-12", "2027-02-06"],
    image: fortCorridor,
    gallery: [fortCorridor, spiceMarket, sahyadriFort],
    route: ["Udaipur", "Kumbhalgarh", "Chittorgarh", "Bundi", "Jaipur"],
    description:
      "A fort-to-fort circuit about siegecraft, court poetry, water systems, miniature painting, and the politics of memory.",
    story:
      "The route enters forts as living arguments: who controlled water, who performed courage, who wrote history, and who was left outside the gate.",
    highlights: [
      "After-hours rampart walk with a conservation architect",
      "Miniature painting studio visit in Udaipur",
      "Siege narratives at Chittorgarh with source comparisons",
      "Stepwell and palace-water session in Bundi",
    ],
    inclusions: sharedInclusions,
    exclusions: sharedExclusions,
    storyteller: "Aarav Menon",
    itinerary: [
      {
        day: 1,
        title: "Lake City Prologue",
        location: "Udaipur",
        summary:
          "Open with courtly landscapes, lake systems, and a gallery session on how Mewar chose to remember itself.",
        cues: ["City Palace context", "Lake-edge walk", "Welcome thali"],
      },
      {
        day: 2,
        title: "The Wall as Geography",
        location: "Kumbhalgarh",
        summary:
          "Walk the fort wall as terrain, infrastructure, boundary, and theatre of power.",
        cues: ["Rampart trail", "Battlefield mapping", "Sunset watchpoint"],
      },
      {
        day: 3,
        title: "Siege and Source",
        location: "Chittorgarh",
        summary:
          "Compare popular retellings with bardic, Persianate, and colonial sources while moving through gates and reservoirs.",
        cues: ["Gate sequence", "Water bodies", "Source-reading salon"],
      },
      {
        day: 4,
        title: "Water, Walls, and Painted Rooms",
        location: "Bundi",
        summary:
          "Study a smaller court where murals, stepwells, and palace gradients reveal a more intimate politics.",
        cues: ["Mural chamber", "Stepwell descent", "Local atelier"],
      },
      {
        day: 5,
        title: "Bazaar of Symbols",
        location: "Jaipur",
        summary:
          "Move from fort to planned city, reading astronomy, markets, guilds, and the soft power of craft.",
        cues: ["Market walk", "Jantar Mantar frame", "Craft dinner"],
      },
      {
        day: 6,
        title: "Departure Notes",
        location: "Jaipur",
        summary:
          "Close the circuit with a map of Rajput frontiers and their afterlives in modern tourism.",
        cues: ["Closing circle", "Archive packet", "Airport transfer"],
      },
    ],
    faqs: [
      {
        question: "Are the fort climbs difficult?",
        answer:
          "Some ramps are steep, but the route is paced with shade breaks and alternate vehicle access where available.",
      },
      {
        question: "Do we cover battles in detail?",
        answer:
          "Yes, but always through geography, logistics, inscriptions, and multiple source traditions.",
      },
      {
        question: "What should I pack?",
        answer:
          "Walking shoes, sun protection, a light layer for winter evenings, and a notebook for field sessions.",
      },
    ],
  },
  {
    slug: "chola-bronze-and-granite-trail",
    title: "Chola Bronze and Granite Trail",
    shortTitle: "Chola Trail",
    category: "Temple Civilisations",
    destinationSlug: "thanjavur",
    region: "Tamil Nadu",
    coordinates: "10.7870 N, 79.1378 E",
    duration: "5 days / 4 nights",
    days: 5,
    nights: 4,
    price: "INR 54,000",
    groupSize: "8-14 travellers",
    pace: "Soft",
    season: "December to February",
    nextDeparture: "2026-12-18",
    dates: ["2026-12-18", "2027-01-22", "2027-02-19"],
    image: templeCarvings,
    gallery: [templeCarvings, hampiSunrise, spiceMarket],
    route: ["Thanjavur", "Gangaikonda Cholapuram", "Darasuram", "Kumbakonam"],
    description:
      "A temple-civilisation route through bronze casting, granite engineering, inscriptional worlds, and living ritual.",
    story:
      "The Chola landscape asks how devotion became administration, how metal became movement, and how an empire built scale without losing detail.",
    highlights: [
      "Brihadeeswara dawn session before the crowds",
      "Bronze iconography workshop with a sthapati family",
      "Darasuram sculptural grammar walk",
      "Kaveri delta food and inscription evening",
    ],
    inclusions: sharedInclusions,
    exclusions: sharedExclusions,
    storyteller: "Nandini Iyer",
    itinerary: [
      {
        day: 1,
        title: "Granite at First Light",
        location: "Thanjavur",
        summary:
          "Arrive and orient to the Kaveri delta before a golden-hour introduction to Brihadeeswara's silhouette.",
        cues: ["Arrival transfer", "Delta briefing", "Temple silhouette"],
      },
      {
        day: 2,
        title: "The Big Temple as Statecraft",
        location: "Brihadeeswara Temple",
        summary:
          "Move through plinth, tower, inscriptions, murals, and ritual routes to understand the temple as institution.",
        cues: ["Dawn entry", "Inscriptions", "Prasadam lunch"],
      },
      {
        day: 3,
        title: "Bronze That Moves",
        location: "Kumbakonam",
        summary:
          "Visit a bronze workshop and read Chola icons as portable philosophy, performance, and community memory.",
        cues: ["Lost-wax demo", "Iconography primer", "Craft family tea"],
      },
      {
        day: 4,
        title: "Poetry in Stone",
        location: "Darasuram",
        summary:
          "Study sculptural panels, musical steps, and miniature detail as the late Chola language becomes more intimate.",
        cues: ["Panel reading", "Music-stone test", "Delta dinner"],
      },
      {
        day: 5,
        title: "River and Return",
        location: "Kaveri delta",
        summary:
          "Close with a riverine map of temple networks and depart from Thanjavur or Tiruchirappalli.",
        cues: ["Route synthesis", "Reading list", "Departure transfer"],
      },
    ],
    faqs: [
      {
        question: "Is photography allowed inside temples?",
        answer:
          "Photography rules vary by site. The storyteller will brief the group before each entry.",
      },
      {
        question: "Is this route religious or historical?",
        answer:
          "It respects living worship while focusing on history, art, architecture, and social context.",
      },
      {
        question: "Can vegetarians manage easily?",
        answer:
          "Yes. Most meals on this route are vegetarian or have strong vegetarian options.",
      },
    ],
  },
  {
    slug: "sahyadri-sea-forts-expedition",
    title: "Sahyadri Sea Forts Expedition",
    shortTitle: "Sahyadri Forts",
    category: "Forts and Frontiers",
    destinationSlug: "konkan",
    region: "Maharashtra",
    coordinates: "16.0436 N, 73.4627 E",
    duration: "4 days / 3 nights",
    days: 4,
    nights: 3,
    price: "INR 39,500",
    groupSize: "10-16 travellers",
    pace: "Moderate",
    season: "October to February",
    nextDeparture: "2026-10-02",
    dates: ["2026-10-02", "2026-11-13", "2027-01-08"],
    image: sahyadriFort,
    gallery: [sahyadriFort, fortCorridor, agumbeRainforest],
    route: ["Pune", "Raigad", "Sindhudurg", "Vijaydurg", "Konkan coast"],
    description:
      "A hill-to-sea fort journey through Maratha logistics, monsoon geography, coastal defence, and foodways.",
    story:
      "The Sahyadris made strategy tactile: passes, ports, basalt, boats, and supply routes stitched into one fast-moving frontier.",
    highlights: [
      "Raigad ascent with governance and coronation context",
      "Coastal fort ferry approach, tide permitting",
      "Konkan kitchen session on travel and seasonality",
      "Map lab on passes, ports, and naval defence",
    ],
    inclusions: sharedInclusions,
    exclusions: sharedExclusions,
    storyteller: "Raghav Deshpande",
    itinerary: [
      {
        day: 1,
        title: "From Plateau to Capital",
        location: "Pune to Raigad",
        summary:
          "Drive into the Western Ghats and begin with the capital-fort as a machine for movement, storage, and ceremony.",
        cues: ["Ghat drive", "Raigad briefing", "Fort dinner"],
      },
      {
        day: 2,
        title: "The Passes Speak",
        location: "Raigad and Konkan descent",
        summary:
          "Descend from plateau to coast, mapping how terrain shaped speed, intelligence, and control.",
        cues: ["Pass mapping", "Village lunch", "Coastal arrival"],
      },
      {
        day: 3,
        title: "Fortress in the Tide",
        location: "Sindhudurg",
        summary:
          "Study sea-fort design, naval imagination, ship routes, and the daily life of communities around the walls.",
        cues: ["Ferry approach", "Sea wall walk", "Konkan kitchen"],
      },
      {
        day: 4,
        title: "Return by the Coast",
        location: "Vijaydurg to Pune",
        summary:
          "Finish with a coastal defence recap and return with a cartographic reading of the Maratha frontier.",
        cues: ["Fort recap", "Coastal route", "Departure transfer"],
      },
    ],
    faqs: [
      {
        question: "Are ferries guaranteed?",
        answer:
          "Ferry access depends on tide and weather. If needed, the day shifts to a land-based coastal fort plan.",
      },
      {
        question: "Is this a trekking trip?",
        answer:
          "It includes fort walking and slopes, but it is designed as a heritage expedition rather than a trek.",
      },
      {
        question: "Where does the trip begin?",
        answer:
          "The standard batch begins and ends in Pune, with optional Mumbai transfers on request.",
      },
    ],
  },
  {
    slug: "agumbe-rainforest-lore",
    title: "Agumbe Rainforest Lore",
    shortTitle: "Agumbe",
    category: "Rainforest Lore",
    destinationSlug: "agumbe",
    region: "Karnataka",
    coordinates: "13.5081 N, 75.0952 E",
    duration: "4 days / 3 nights",
    days: 4,
    nights: 3,
    price: "INR 36,500",
    groupSize: "8-12 travellers",
    pace: "Soft",
    season: "June to September",
    nextDeparture: "2026-09-18",
    dates: ["2026-09-18", "2026-10-09", "2027-06-18"],
    image: agumbeRainforest,
    gallery: [agumbeRainforest, sahyadriFort, templeCarvings],
    route: ["Mangaluru", "Agumbe", "Kundadri", "Malnad villages"],
    description:
      "A monsoon-laced rainforest expedition about ecology, oral memory, snake conservation, and Malnad food traditions.",
    story:
      "Agumbe is approached as a wet archive where rainfall, forest edges, old trade paths, and local cautionary tales all carry data.",
    highlights: [
      "Rainforest night walk with a naturalist",
      "Oral lore circle with Malnad elders",
      "Kundadri sunrise if weather allows",
      "Conservation session on king cobra habitats",
    ],
    inclusions: sharedInclusions,
    exclusions: sharedExclusions,
    storyteller: "Devika Rao",
    itinerary: [
      {
        day: 1,
        title: "Entering the Rain Archive",
        location: "Mangaluru to Agumbe",
        summary:
          "Climb into the rainforest belt and settle into the sound, humidity, and pace of the Malnad landscape.",
        cues: ["Ghat transfer", "Monsoon briefing", "Local supper"],
      },
      {
        day: 2,
        title: "Canopy, Leech, Legend",
        location: "Agumbe forest edge",
        summary:
          "Walk with a naturalist through rainforest ecology while connecting plant life, cautionary tales, and village practice.",
        cues: ["Canopy walk", "Forest ethics", "Night trail"],
      },
      {
        day: 3,
        title: "People of the Rain",
        location: "Malnad villages",
        summary:
          "Spend the day with food, areca, old trade routes, and stories of how people learned to live with relentless rain.",
        cues: ["Village kitchen", "Oral histories", "Kundadri option"],
      },
      {
        day: 4,
        title: "Mist and Departure",
        location: "Agumbe to Mangaluru",
        summary:
          "Close with a rainforest field-note exchange and descend toward the coast.",
        cues: ["Field notes", "Descent drive", "Departure transfer"],
      },
    ],
    faqs: [
      {
        question: "Will we see wildlife?",
        answer:
          "Wildlife is never promised. The focus is respectful observation, habitat literacy, and rainforest behaviour.",
      },
      {
        question: "Is monsoon travel uncomfortable?",
        answer:
          "It is wet and atmospheric. We provide packing guidance, but travellers should be comfortable with rain.",
      },
      {
        question: "Are leeches common?",
        answer:
          "They can be during monsoon. The team briefs everyone on simple prevention and care.",
      },
    ],
  },
  {
    slug: "spice-routes-of-the-old-bazaar",
    title: "Spice Routes of the Old Bazaar",
    shortTitle: "Spice Bazaar",
    category: "Market Walks",
    destinationSlug: "old-bazaar",
    region: "Delhi and Rajasthan",
    coordinates: "28.6562 N, 77.2410 E",
    duration: "3 days / 2 nights",
    days: 3,
    nights: 2,
    price: "INR 29,000",
    groupSize: "8-12 travellers",
    pace: "Soft",
    season: "October to March",
    nextDeparture: "2026-10-30",
    dates: ["2026-10-30", "2026-12-04", "2027-01-29"],
    image: spiceMarket,
    gallery: [spiceMarket, fortCorridor, hampiSunrise],
    route: ["Old Delhi", "Khari Baoli", "Haveli quarter", "Jaipur craft bazaar"],
    description:
      "A compact sensory expedition through spice trade, guild streets, old havelis, food memory, and bazaar choreography.",
    story:
      "The bazaar is studied as a knowledge network: smell as inventory, gesture as accounting, recipes as migration, and lanes as archives.",
    highlights: [
      "Early access spice-market walk before peak crowding",
      "Haveli architecture and merchant networks session",
      "Tasting-led lunch on trade and migration",
      "Jaipur craft bazaar comparison walk",
    ],
    inclusions: sharedInclusions,
    exclusions: sharedExclusions,
    storyteller: "Zoya Ansari",
    itinerary: [
      {
        day: 1,
        title: "Lanes of Inventory",
        location: "Old Delhi",
        summary:
          "Arrive and enter the old commercial city through gates, grain memories, spice air, and haveli courtyards.",
        cues: ["Arrival briefing", "Gate walk", "Welcome tasting"],
      },
      {
        day: 2,
        title: "Smell as Archive",
        location: "Khari Baoli",
        summary:
          "Follow spices from sack to shopfront to kitchen while reading guild networks, ledgers, and movement across regions.",
        cues: ["Pre-rush market", "Spice tasting", "Merchant stories"],
      },
      {
        day: 3,
        title: "Craft, Colour, Departure",
        location: "Jaipur",
        summary:
          "Compare a planned royal bazaar with the older mercantile city, then close with a route map of taste and trade.",
        cues: ["Craft bazaar", "Closing map", "Departure transfer"],
      },
    ],
    faqs: [
      {
        question: "Is the market walk crowded?",
        answer:
          "We begin early and keep the group small. Some dense lane walking is part of the experience.",
      },
      {
        question: "Can dietary restrictions be handled?",
        answer:
          "Yes, with advance notice. Tastings are curated and alternatives are arranged where possible.",
      },
      {
        question: "Is this route good as a weekend trip?",
        answer:
          "Yes. It is intentionally compact, with the option to add a private fourth day in Jaipur.",
      },
    ],
  },
];

export const destinations: Destination[] = [
  {
    slug: "hampi",
    name: "Hampi",
    region: "Karnataka",
    coordinates: "15.3350 N, 76.4600 E",
    image: hampiSunrise,
    mood: "Granite, river light, temple streets",
    description:
      "A landscape where imperial planning, sacred geography, and boulder-country myth fold into one another.",
    signature: ["Vijayanagara ruins", "Tungabhadra river", "Anegundi villages"],
  },
  {
    slug: "mewar",
    name: "Mewar and Rajputana",
    region: "Rajasthan",
    coordinates: "24.5854 N, 73.7125 E",
    image: fortCorridor,
    mood: "Ramparts, murals, siege memory",
    description:
      "Forts and courts where water, honour, trade, and retelling shaped the public memory of power.",
    signature: ["Kumbhalgarh", "Chittorgarh", "Bundi murals"],
  },
  {
    slug: "thanjavur",
    name: "Thanjavur and the Kaveri Delta",
    region: "Tamil Nadu",
    coordinates: "10.7870 N, 79.1378 E",
    image: templeCarvings,
    mood: "Granite scale, bronze movement, river plains",
    description:
      "A temple civilisation route through engineering, devotion, craft lineages, and inscriptional order.",
    signature: ["Brihadeeswara", "Darasuram", "Bronze workshops"],
  },
  {
    slug: "konkan",
    name: "Sahyadri and Konkan Forts",
    region: "Maharashtra",
    coordinates: "16.0436 N, 73.4627 E",
    image: sahyadriFort,
    mood: "Basalt, sea wind, fast frontiers",
    description:
      "A military landscape of passes, ports, hill capitals, coastal walls, and seasonal movement.",
    signature: ["Raigad", "Sindhudurg", "Konkan foodways"],
  },
  {
    slug: "agumbe",
    name: "Agumbe Rainforest",
    region: "Karnataka",
    coordinates: "13.5081 N, 75.0952 E",
    image: agumbeRainforest,
    mood: "Rainfall, canopy, oral ecology",
    description:
      "A monsoon archive of forest practice, village memory, biodiversity, and careful looking.",
    signature: ["Rainforest trails", "Kundadri", "Malnad kitchens"],
  },
  {
    slug: "old-bazaar",
    name: "Old Bazaar Routes",
    region: "Delhi and Rajasthan",
    coordinates: "28.6562 N, 77.2410 E",
    image: spiceMarket,
    mood: "Spice air, havelis, guild streets",
    description:
      "Dense mercantile lanes where taste, trade, migration, and architecture remain legible at walking speed.",
    signature: ["Khari Baoli", "Haveli quarters", "Craft bazaars"],
  },
];

export const storytellers: Storyteller[] = [
  {
    name: "Meera Kulkarni",
    role: "Historian of Deccan urbanism",
    base: "Bengaluru",
    image: hampiSunrise,
    bio: "Meera reads landscapes through water, ritual movement, and the administrative intelligence of old cities.",
  },
  {
    name: "Aarav Menon",
    role: "Fortification researcher",
    base: "Udaipur",
    image: fortCorridor,
    bio: "Aarav works across hill forts, source traditions, and military geography, with a weakness for good stepwells.",
  },
  {
    name: "Nandini Iyer",
    role: "Art historian and temple guide",
    base: "Thanjavur",
    image: templeCarvings,
    bio: "Nandini translates iconography, inscriptions, and living ritual into stories that are precise without becoming stiff.",
  },
  {
    name: "Raghav Deshpande",
    role: "Maratha frontier cartographer",
    base: "Pune",
    image: sahyadriFort,
    bio: "Raghav maps passes, ports, and supply lines to explain how terrain became political imagination.",
  },
  {
    name: "Devika Rao",
    role: "Rainforest naturalist",
    base: "Agumbe",
    image: agumbeRainforest,
    bio: "Devika connects monsoon ecology with village practice, local names, and the ethics of moving through forest.",
  },
  {
    name: "Zoya Ansari",
    role: "Bazaar culture researcher",
    base: "Delhi",
    image: spiceMarket,
    bio: "Zoya studies markets as memory systems: lanes, smells, ledgers, recipes, and family trade routes.",
  },
];

export const departures = expeditions.flatMap((expedition) =>
  expedition.dates.map((date, index) => ({
    id: `${expedition.slug}-${index + 1}`,
    date,
    expedition: expedition.title,
    slug: expedition.slug,
    region: expedition.region,
    duration: expedition.duration,
    seats: index === 0 ? "4 seats left" : index === 1 ? "Waitlist open" : "Open",
    price: expedition.price,
  }))
);

export const journalArticles: JournalArticle[] = [
  {
    slug: "reading-a-fort-before-reading-a-battle",
    title: "Read a Fort Before You Read a Battle",
    category: "Field Notes",
    date: "2026-08-14",
    readTime: "6 min read",
    image: fortCorridor,
    excerpt:
      "Walls are never only walls. They reveal food, water, fear, ritual, intelligence, and the tempo of a frontier.",
  },
  {
    slug: "why-bazaars-are-archives",
    title: "Why Bazaars Are Archives",
    category: "Market Memory",
    date: "2026-08-27",
    readTime: "5 min read",
    image: spiceMarket,
    excerpt:
      "A spice lane stores information in smell, arrangement, credit, gesture, and recipes that travelled without passports.",
  },
  {
    slug: "granite-and-bronze",
    title: "Granite and Bronze: Two Chola Languages",
    category: "Temple Worlds",
    date: "2026-07-22",
    readTime: "8 min read",
    image: templeCarvings,
    excerpt:
      "One language stands massive in the sun. The other moves through streets. Together they explain Chola confidence.",
  },
  {
    slug: "monsoon-as-historian",
    title: "The Monsoon Is Also a Historian",
    category: "Ecology",
    date: "2026-06-19",
    readTime: "7 min read",
    image: agumbeRainforest,
    excerpt:
      "Rain decides paths, crops, architecture, animal movement, and the stories a village tells to keep itself alive.",
  },
];

export const travellerQuotes = [
  {
    quote:
      "It felt less like sightseeing and more like learning to notice. Hampi changed shape every time the storyteller asked a better question.",
    name: "Ira Shah",
    trip: "Hampi: Empire in Stone",
  },
  {
    quote:
      "The fort walks were rigorous, but never performative. We came away with maps, arguments, and a new respect for water.",
    name: "Kabir Sethi",
    trip: "Rajput Fort Corridors",
  },
  {
    quote:
      "The rainforest route was tender and sharp at the same time. Every sound began to mean something.",
    name: "Ananya Rao",
    trip: "Agumbe Rainforest Lore",
  },
];

export const filterSets = {
  regions: ["Karnataka", "Rajasthan", "Tamil Nadu", "Maharashtra", "Delhi and Rajasthan"],
  pace: ["Soft", "Moderate", "Immersive"],
  duration: ["3 days", "4 days", "5 days", "6 days"],
  categories: expeditionCategories,
};

export const storyCategories = [
  {
    title: "Archaeology as Atmosphere",
    description: "Sites are read as built climates: light, stone, water, sound, and route.",
  },
  {
    title: "Local Memory",
    description: "Every journey pairs formal history with oral accounts, foodways, craft, and living practice.",
  },
  {
    title: "Cartographic Travel",
    description: "Maps, coordinates, routes, and field notes turn movement into understanding.",
  },
  {
    title: "Small Groups",
    description: "Departures stay intimate so questions, pauses, and side-lanes can shape the day.",
  },
];

export function getExpedition(slug: string | undefined) {
  return expeditions.find((expedition) => expedition.slug === slug);
}

export function getDestination(slug: string | undefined) {
  return destinations.find((destination) => destination.slug === slug);
}

export function getExpeditionsForDestination(slug: string | undefined) {
  return expeditions.filter((expedition) => expedition.destinationSlug === slug);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00+05:30`));
}
