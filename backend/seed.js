require('dotenv').config();
const mongoose = require('mongoose');
const Package = require('./models/Package');
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const INBOUND_PACKAGES = [
  { 
    title: "Sigiriya Rock Fortress", 
    price: 200, 
    image: "/assets/sigiriya.png",
    images: ["/assets/sigiriya.png", "/assets/sigiriya-2.png"],
    duration: "Full Day",
    description: "Scale the majestic 'Lion Rock', a UNESCO World Heritage site featuring ancient frescoes and symmetrical water gardens.",
    itinerary: [
      "Hotel pickup and scenic drive to Sigiriya",
      "Guided climb of the 1,200 steps to the summit",
      "Authentic Sri Lankan village lunch",
      "Explore the Pidurangala Vihara temple complex",
      "Traditional tea service and return to hotel"
    ],
    inclusions: ["Luxury Transport", "English Speaking Guide", "Entrance Fees", "Traditional Buffet Lunch", "Mineral Water"],
    category: "Inbound"
  },
  { 
    title: "Ella Adventure", 
    price: 150, 
    image: "/assets/ella.png",
    images: ["/assets/ella.png", "/assets/ella-2.png"],
    duration: "Full Day",
    description: "Trek through misty mountains to find the iconic Nine Arch Bridge and Little Adam's Peak.",
    itinerary: [
      "Departure to Ella",
      "Hike to Little Adam's Peak for sunrise views",
      "Visit Nine Arch Bridge and watch the train pass",
      "Picnic lunch with mountain views",
      "Refreshing dip in Ravana Falls"
    ],
    inclusions: ["Round-trip Transport", "Expert Hiking Guide", "Picnic Meal Kit", "First Aid Support"],
    category: "Inbound"
  },
  { 
    title: "Galle Heritage Trip", 
    price: 120, 
    image: "/assets/galle.png",
    images: ["/assets/galle.png", "/assets/galle-2.png"],
    duration: "Full Day",
    description: "A walk through time in the Dutch Fort of Galle followed by the golden beaches of Unawatuna.",
    itinerary: [
      "Coastal drive via Southern Expressway",
      "Guided walking tour of Galle Fort",
      "Lunch at a boutique colonial restaurant",
      "Stilt fishing observation and photography",
      "Beach time at Unawatuna"
    ],
    inclusions: ["AC Van Transport", "Historical Guide", "Photography Session", "Fort Entrance"],
    category: "Inbound"
  },
  { 
    title: "Kandy Cultural Tour", 
    price: 80, 
    image: "/assets/kandy.png",
    images: ["/assets/kandy.png", "/assets/kandy-2.png", "/assets/kandy-3.png"],
    duration: "Full Day",
    description: "Visit the sacred Temple of the Tooth and witness a vibrant traditional dance performance.",
    itinerary: [
      "Travel to the Hill Capital",
      "Visit the Temple of the Sacred Tooth Relic",
      "Lake-view lunch",
      "Peradeniya Botanical Gardens walk",
      "Cultural dance show"
    ],
    inclusions: ["Guided City Tour", "Temple Entrance", "Botanical Garden Ticket", "Dance Show Ticket"],
    category: "Inbound"
  }
];

const OUTBOUND_PACKAGES = [
  { 
    title: "Paris Romance", 
    price: 1200, 
    image: "/assets/paris.png",
    images: ["/assets/paris.png"],
    duration: "5 Days / 4 Nights",
    description: "Experience the City of Lights with private tours of the Eiffel Tower and Louvre Museum.",
    itinerary: [
      { 
        day: "Day 1", 
        activities: [
          { text: "Arrival at Charles de Gaulle Airport and private transfer to your hotel." },
          { text: "Check-in and refresh." },
          { text: "Relaxed Seine River Cruise with welcome drinks." }
        ]
      },
      { 
        day: "Day 2", 
        activities: [
          { text: "Guided tour of the Louvre Museum's highlights." },
          { text: "Lunch at a traditional Parisian bistro." },
          { text: "Montmartre walking tour and visit to Sacré-Cœur." }
        ]
      },
      { 
        day: "Day 3", 
        activities: [
          { text: "Eiffel Tower summit access for panoramic views." },
          { text: "Shopping on Champs-Élysées and relaxation." }
        ]
      },
      { 
        day: "Day 4", 
        activities: [
          { text: "Full-day excursion to the Palace of Versailles." },
          { text: "Return to Paris and free evening." }
        ]
      },
      { 
        day: "Day 5", 
        activities: [
          { text: "Gourmet pastry workshop with a local chef." },
          { text: "Final souvenir shopping and departure transfer." }
        ]
      }
    ],
    inclusions: ["4-Star Hotel", "Daily Breakfast", "Museum Passes", "Airport Transfers"],
    category: "Outbound"
  },
  { 
    title: "Tokyo Neon Nights", 
    price: 1500, 
    image: "/assets/tokyo.png",
    images: ["/assets/tokyo.png"],
    duration: "6 Days / 5 Nights",
    description: "A perfect blend of ancient tradition and futuristic technology in the heart of Japan.",
    itinerary: [
      {
        day: "Day 1",
        activities: [
          { text: "Arrival at Narita Airport and JR Pass activation." },
          { text: "Check-in at Shinjuku hotel and explore the neon streets." }
        ]
      },
      {
        day: "Day 2",
        activities: [
          { text: "Visit the historic Senso-ji Temple in Asakusa." },
          { text: "Tech and anime exploration in Akihabara." }
        ]
      },
      {
        day: "Day 3",
        activities: [
          { text: "Experience the Shibuya Crossing and Meiji Shrine." },
          { text: "Harajuku fashion district and Takeshita Street." }
        ]
      },
      {
        day: "Day 4",
        activities: [
          { text: "Day trip to Mount Fuji and cruise on Lake Ashi." },
          { text: "Return to Tokyo." }
        ]
      },
      {
        day: "Day 5",
        activities: [
          { text: "Visit the Ghibli Museum (Pre-booked)." },
          { text: "Robot Cafe dinner experience." }
        ]
      },
      {
        day: "Day 6",
        activities: [
          { text: "Last minute shopping in Ginza." },
          { text: "Airport transfer for departure." }
        ]
      }
    ],
    inclusions: ["Premium Hotel", "Japan Rail Pass", "Mt Fuji Day Trip", "Local Food Guide"],
    category: "Outbound"
  },
  { 
    title: "Dubai Luxury Desert", 
    price: 900, 
    image: "/assets/dubai.png",
    images: ["/assets/dubai.png"],
    duration: "4 Days / 3 Nights",
    description: "Thrill-seeking in the desert and luxury shopping in the world's grandest malls.",
    itinerary: [
      {
        day: "Day 1",
        activities: [
          { text: "Arrival and check-in at your luxury hotel." },
          { text: "Burj Khalifa At The Top visit and Fountain Show." }
        ]
      },
      {
        day: "Day 2",
        activities: [
          { text: "4x4 Desert Safari adventure." },
          { text: "Traditional BBQ dinner under the stars." }
        ]
      },
      {
        day: "Day 3",
        activities: [
          { text: "Monorail ride to Palm Jumeirah." },
          { text: "Atlantis Aquaventure Waterpark fun." }
        ]
      },
      {
        day: "Day 4",
        activities: [
          { text: "Souk Madinat Jumeirah shopping." },
          { text: "Departure transfer to Dubai Airport." }
        ]
      }
    ],
    inclusions: ["Luxury Resort", "Desert Safari", "Burj Khalifa Entry", "Private Driver"],
    category: "Outbound"
  },
  { 
    title: "Sydney Harbor Escape", 
    price: 1100, 
    image: "/assets/sydney.png",
    images: ["/assets/sydney.png"],
    duration: "5 Days / 4 Nights",
    description: "Sun, surf, and icons. Explore the Opera House and the famous Bondi Beach.",
    itinerary: [
      {
        day: "Day 1",
        activities: [
          { text: "Arrival and Sydney Opera House guided tour." },
          { text: "Walk around Circular Quay and The Rocks." }
        ]
      },
      {
        day: "Day 2",
        activities: [
          { text: "Bondi to Coogee Coastal Walk." },
          { text: "Lunch with ocean views at Bondi." }
        ]
      },
      {
        day: "Day 3",
        activities: [
          { text: "Blue Mountains wilderness day trip." },
          { text: "Return to Sydney." }
        ]
      },
      {
        day: "Day 4",
        activities: [
          { text: "Harbor Bridge Climb adventure." },
          { text: "Explore Darling Harbor and Sea Life Aquarium." }
        ]
      },
      {
        day: "Day 5",
        activities: [
          { text: "Visit Wildlife Sydney Zoo." },
          { text: "Departure transfer." }
        ]
      }
    ],
    inclusions: ["Harborside Hotel", "Bridge Climb Pass", "Blue Mountains Tour", "Ferry Pass"],
    category: "Outbound"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding');

    // Clear existing data
    await Package.deleteMany({});
    console.log('Cleared existing packages');

    // Insert new data
    const allPackages = [...INBOUND_PACKAGES, ...OUTBOUND_PACKAGES];
    await Package.insertMany(allPackages);
    console.log(`Successfully seeded ${allPackages.length} packages`);

    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seedDatabase();
