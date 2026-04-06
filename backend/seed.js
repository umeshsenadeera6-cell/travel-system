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
    duration: "Full Day",
    description: "Scale the majestic 'Lion Rock', a UNESCO World Heritage site featuring ancient frescoes and symmetrical water gardens.",
    itinerary: [
      "08:00 AM - Hotel pickup and scenic drive to Sigiriya",
      "09:30 AM - Guided climb of the 1,200 steps to the summit",
      "12:00 PM - Authentic Sri Lankan village lunch",
      "02:00 PM - Explore the Pidurangala Vihara temple complex",
      "04:30 PM - Traditional tea service and return to hotel"
    ],
    inclusions: ["Luxury Transport", "English Speaking Guide", "Entrance Fees", "Traditional Buffet Lunch", "Mineral Water"],
    videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
    category: "Inbound"
  },
  { 
    title: "Ella Adventure", 
    price: 150, 
    image: "/assets/ella.png",
    duration: "Full Day",
    description: "Trek through misty mountains to find the iconic Nine Arch Bridge and Little Adam's Peak.",
    itinerary: [
      "07:00 AM - Departure to Ella",
      "09:00 AM - Hike to Little Adam's Peak for sunrise views",
      "11:00 AM - Visit Nine Arch Bridge and watch the train pass",
      "01:00 PM - Picnic lunch with mountain views",
      "03:00 PM - Refreshing dip in Ravana Falls"
    ],
    inclusions: ["Round-trip Transport", "Expert Hiking Guide", "Picnic Meal Kit", "First Aid Support"],
    videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
    category: "Inbound"
  },
  { 
    title: "Galle Heritage Trip", 
    price: 120, 
    image: "/assets/galle.png",
    duration: "Full Day",
    description: "A walk through time in the Dutch Fort of Galle followed by the golden beaches of Unawatuna.",
    itinerary: [
      "08:30 AM - Coastal drive via Southern Expressway",
      "10:00 AM - Guided walking tour of Galle Fort",
      "12:30 PM - Lunch at a boutique colonial restaurant",
      "02:30 PM - Stilt fishing observation and photography",
      "04:00 PM - Beach time at Unawatuna"
    ],
    inclusions: ["AC Van Transport", "Historical Guide", "Photography Session", "Fort Entrance"],
    videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
    category: "Inbound"
  },
  { 
    title: "Kandy Cultural Tour", 
    price: 80, 
    image: "/assets/kandy.png",
    duration: "Full Day",
    description: "Visit the sacred Temple of the Tooth and witness a vibrant traditional dance performance.",
    itinerary: [
      "08:00 AM - Travel to the Hill Capital",
      "10:30 AM - Visit the Temple of the Sacred Tooth Relic",
      "12:30 PM - Lake-view lunch",
      "02:00 PM - Peradeniya Botanical Gardens walk",
      "05:00 PM - Cultural dance show"
    ],
    inclusions: ["Guided City Tour", "Temple Entrance", "Botanical Garden Ticket", "Dance Show Ticket"],
    videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
    category: "Inbound"
  }
];

const OUTBOUND_PACKAGES = [
  { 
    title: "Paris Romance", 
    price: 1200, 
    image: "/assets/paris.png",
    duration: "5 Days / 4 Nights",
    description: "Experience the City of Lights with private tours of the Eiffel Tower and Louvre Museum.",
    itinerary: [
      { 
        day: "Day 1", 
        activities: [
          { time: "10:00 AM", text: "Arrival at Charles de Gaulle Airport and private transfer to your hotel." },
          { time: "02:00 PM", text: "Check-in and refresh." },
          { time: "05:00 PM", text: "Relaxed Seine River Cruise with welcome drinks." }
        ]
      },
      { 
        day: "Day 2", 
        activities: [
          { time: "09:00 AM", text: "Guided tour of the Louvre Museum's highlights." },
          { time: "01:00 PM", text: "Lunch at a traditional Parisian bistro." },
          { time: "03:00 PM", text: "Montmartre walking tour and visit to Sacré-Cœur." }
        ]
      },
      { 
        day: "Day 3", 
        activities: [
          { time: "10:00 AM", text: "Eiffel Tower summit access for panoramic views." },
          { time: "02:00 PM", text: "Shopping on Champs-Élysées and relaxation." }
        ]
      },
      { 
        day: "Day 4", 
        activities: [
          { time: "09:00 AM", text: "Full-day excursion to the Palace of Versailles." },
          { time: "04:00 PM", text: "Return to Paris and free evening." }
        ]
      },
      { 
        day: "Day 5", 
        activities: [
          { time: "10:00 AM", text: "Gourmet pastry workshop with a local chef." },
          { time: "02:00 PM", text: "Final souvenir shopping and departure transfer." }
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
    duration: "6 Days / 5 Nights",
    description: "A perfect blend of ancient tradition and futuristic technology in the heart of Japan.",
    itinerary: [
      {
        day: "Day 1",
        activities: [
          { time: "11:00 AM", text: "Arrival at Narita Airport and JR Pass activation." },
          { time: "03:00 PM", text: "Check-in at Shinjuku hotel and explore the neon streets." }
        ]
      },
      {
        day: "Day 2",
        activities: [
          { time: "09:00 AM", text: "Visit the historic Senso-ji Temple in Asakusa." },
          { time: "02:00 PM", text: "Tech and anime exploration in Akihabara." }
        ]
      },
      {
        day: "Day 3",
        activities: [
          { time: "10:00 AM", text: "Experience the Shibuya Crossing and Meiji Shrine." },
          { time: "03:00 PM", text: "Harajuku fashion district and Takeshita Street." }
        ]
      },
      {
        day: "Day 4",
        activities: [
          { time: "08:00 AM", text: "Day trip to Mount Fuji and cruise on Lake Ashi." },
          { time: "05:00 PM", text: "Return to Tokyo." }
        ]
      },
      {
        day: "Day 5",
        activities: [
          { time: "10:00 AM", text: "Visit the Ghibli Museum (Pre-booked)." },
          { time: "07:00 PM", text: "Robot Cafe dinner experience." }
        ]
      },
      {
        day: "Day 6",
        activities: [
          { time: "09:00 AM", text: "Last minute shopping in Ginza." },
          { time: "01:00 PM", text: "Airport transfer for departure." }
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
    duration: "4 Days / 3 Nights",
    description: "Thrill-seeking in the desert and luxury shopping in the world's grandest malls.",
    itinerary: [
      {
        day: "Day 1",
        activities: [
          { time: "02:00 PM", text: "Arrival and check-in at your luxury hotel." },
          { time: "06:00 PM", text: "Burj Khalifa At The Top visit and Fountain Show." }
        ]
      },
      {
        day: "Day 2",
        activities: [
          { time: "03:00 PM", text: "4x4 Desert Safari adventure." },
          { time: "07:00 PM", text: "Traditional BBQ dinner under the stars." }
        ]
      },
      {
        day: "Day 3",
        activities: [
          { time: "10:00 AM", text: "Monorail ride to Palm Jumeirah." },
          { time: "01:00 PM", text: "Atlantis Aquaventure Waterpark fun." }
        ]
      },
      {
        day: "Day 4",
        activities: [
          { time: "10:00 AM", text: "Souk Madinat Jumeirah shopping." },
          { time: "02:00 PM", text: "Departure transfer to Dubai Airport." }
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
    duration: "5 Days / 4 Nights",
    description: "Sun, surf, and icons. Explore the Opera House and the famous Bondi Beach.",
    itinerary: [
      {
        day: "Day 1",
        activities: [
          { time: "10:00 AM", text: "Arrival and Sydney Opera House guided tour." },
          { time: "02:00 PM", text: "Walk around Circular Quay and The Rocks." }
        ]
      },
      {
        day: "Day 2",
        activities: [
          { time: "09:00 AM", text: "Bondi to Coogee Coastal Walk." },
          { time: "01:00 PM", text: "Lunch with ocean views at Bondi." }
        ]
      },
      {
        day: "Day 3",
        activities: [
          { time: "08:30 AM", text: "Blue Mountains wilderness day trip." },
          { time: "04:30 PM", text: "Return to Sydney." }
        ]
      },
      {
        day: "Day 4",
        activities: [
          { time: "10:00 AM", text: "Harbor Bridge Climb adventure." },
          { time: "03:00 PM", text: "Explore Darling Harbor and Sea Life Aquarium." }
        ]
      },
      {
        day: "Day 5",
        activities: [
          { time: "09:00 AM", text: "Visit Wildlife Sydney Zoo." },
          { time: "01:00 PM", text: "Departure transfer." }
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
