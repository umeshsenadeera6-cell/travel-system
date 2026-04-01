// Inbound Assets (Sri Lanka)
import sigiriyaImg from "../assets/sigiriya.png";
import ellaImg from "../assets/ella.png";
import galleImg from "../assets/galle.png";
import kandyImg from "../assets/kandy.png";

// Outbound Assets (Global)
import parisImg from "../assets/paris.png";
import tokyoImg from "../assets/tokyo.png";
import dubaiImg from "../assets/dubai.png";
import sydneyImg from "../assets/sydney.png";

export const INBOUND_PACKAGES = [
  {
    id: 1,
    title: "Sigiriya Tour",
    price: 200,
    image: sigiriyaImg,
    duration: "Full Day",
    description: "Climb the iconic Lion Rock, explore ancient frescoes, and enjoy panoramic views over Sri Lanka’s cultural triangle.",
    itinerary: [
      {
        time: "08:00",
        location: "Colombo / Your Hotel",
        text: "Hotel pickup and scenic road transfer to Sigiriya.",
      },
      {
        time: "10:30",
        location: "Sigiriya",
        text: "Climb Sigiriya Rock Fortress and enjoy panoramic viewpoints.",
      },
      {
        time: "13:00",
        location: "Dambulla",
        text: "Visit Dambulla cave temples and explore the frescoes.",
      },
      {
        time: "14:30",
        location: "Local Lunch",
        text: "Relax with a local lunch and optional garden stop.",
      },
      {
        time: "17:30",
        location: "Return Transfer",
        text: "Return transfer to your hotel.",
      },
    ],
    route: {
      stops: [
        { label: "Colombo", lat: 6.9271, lng: 79.8612 },
        { label: "Sigiriya", lat: 7.9575, lng: 80.7609 },
        { label: "Dambulla", lat: 7.8636, lng: 80.6550 },
      ],
      path: [
        { lat: 6.9271, lng: 79.8612 },
        { lat: 7.9575, lng: 80.7609 },
        { lat: 7.8636, lng: 80.6550 },
      ],
    },
    inclusions: ["Private transport", "English-speaking guide", "Bottled water", "Hotel pickup & drop-off"],
  },
  {
    id: 2,
    title: "Ella Adventure",
    price: 150,
    image: ellaImg,
    duration: "2 Day / 1 Night",
    description: "A misty mountain escape with scenic viewpoints, waterfalls, and a laid-back hill-country vibe.",
    itinerary: [
      {
        day: "Day 1",
        activities: [
          { time: "07:30", location: "Kandy", text: "Depart Kandy for Ella via train/transfer." },
          { time: "10:30", location: "Little Adam's Peak", text: "Hike for sunrise-style views." }
        ]
      },
      {
        day: "Day 2",
        activities: [
          { time: "09:00", location: "Nine Arches Bridge", text: "Capture scenic rail photos." },
          { time: "11:00", location: "Ravana Falls", text: "Enjoy the waterfalls." },
          { time: "15:00", location: "Return", text: "Transfer back to Kandy." }
        ]
      }
    ],
    route: {
      stops: [
        { label: "Kandy", lat: 7.2906, lng: 80.6337 },
        { label: "Ella", lat: 6.8724, lng: 81.0573 },
        { label: "Nine Arches", lat: 6.8792, lng: 81.0450 },
        { label: "Ravana Falls", lat: 6.8649, lng: 81.0550 },
      ],
      path: [
        { lat: 7.2906, lng: 80.6337 },
        { lat: 6.8724, lng: 81.0573 },
        { lat: 6.8792, lng: 81.0450 },
        { lat: 6.8649, lng: 81.0550 },
      ],
    },
    inclusions: ["Transport", "Guide assistance", "Viewpoint visits", "Optional train support"],
  },
  {
    id: 3,
    title: "Galle Day Trip",
    price: 120,
    image: galleImg,
    duration: "Half Day",
    description: "Walk the colonial fort, browse boutique cafés, and enjoy the coastal charm of Sri Lanka’s south.",
    itinerary: [
      {
        time: "09:00",
        location: "Colombo / South Coast",
        text: "Coastal drive to Galle with photo stops along the way.",
      },
      {
        time: "10:30",
        location: "Galle Fort",
        text: "Guided walking tour inside the fort and colonial streets.",
      },
      {
        time: "12:00",
        location: "Shopping & Cafés",
        text: "Free time for boutique shopping and local café breaks.",
      },
      {
        time: "16:00",
        location: "Galle Ramparts",
        text: "Sunset views by the ramparts before returning.",
      },
    ],
    route: {
      stops: [
        { label: "Colombo", lat: 6.9271, lng: 79.8612 },
        { label: "Galle Fort", lat: 6.0535, lng: 80.2210 },
      ],
      path: [
        { lat: 6.9271, lng: 79.8612 },
        { lat: 6.0535, lng: 80.2210 },
      ],
    },
    inclusions: ["Transport", "Fort tour", "Photo stops"],
  },
  {
    id: 4,
    title: "Kandy Cultural Show",
    price: 80,
    image: kandyImg,
    duration: "Evening",
    description: "An immersive cultural night featuring traditional dance, drumming, and a vibrant local atmosphere.",
    itinerary: [
      {
        time: "16:30",
        location: "Kandy City",
        text: "Pick up and optional temple area stop (subject to timing).",
      },
      {
        time: "18:30",
        location: "Kandy Cultural Venue",
        text: "Enjoy the cultural dance + drumming performance.",
      },
      {
        time: "20:00",
        location: "Return Drive",
        text: "Drive back with city lights and final drop-off.",
      },
    ],
    route: {
      stops: [
        { label: "Kandy", lat: 7.2906, lng: 80.6337 },
        { label: "Cultural Venue", lat: 7.2889, lng: 80.6320 },
      ],
      path: [
        { lat: 7.2906, lng: 80.6337 },
        { lat: 7.2889, lng: 80.6320 },
      ],
    },
    inclusions: ["Transport", "Reserved seating (subject to availability)"],
  }
];

export const OUTBOUND_PACKAGES = [
  {
    id: 5,
    title: "Paris Romance",
    price: 1200,
    image: parisImg,
    duration: "5 Day / 4 Night",
    description: "Classic Paris highlights with curated city experiences, iconic landmarks, and café culture.",
    itinerary: [
      {
        day: "Day 1",
        activities: [
          { time: "Arrival", location: "Paris", text: "Arrival and relaxed Seine stroll." }
        ]
      },
      {
        day: "Day 2",
        activities: [
          { time: "Morning", location: "Eiffel Tower", text: "Eiffel Tower views and walk along Champs-Élysées." }
        ]
      },
      {
        day: "Day 3",
        activities: [
          { time: "All Day", location: "Louvre Museum", text: "Louvre / Musée day with curated highlights." }
        ]
      },
      {
        day: "Day 4",
        activities: [
          { time: "Afternoon", location: "Montmartre", text: "Montmartre charm, viewpoints, and evening café atmosphere." }
        ]
      },
      {
        day: "Day 5",
        activities: [
          { time: "Departure", location: "Airport", text: "Final breakfast and departure transfers." }
        ]
      }
    ],
    route: {
      stops: [
        { label: "Paris Center", lat: 48.8566, lng: 2.3522 },
        { label: "Eiffel Tower", lat: 48.8584, lng: 2.2945 },
        { label: "Louvre", lat: 48.8606, lng: 2.3376 },
        { label: "Montmartre", lat: 48.8867, lng: 2.3431 },
      ],
      path: [
        { lat: 48.8566, lng: 2.3522 },
        { lat: 48.8584, lng: 2.2945 },
        { lat: 48.8606, lng: 2.3376 },
        { lat: 48.8867, lng: 2.3431 },
      ],
    },
    inclusions: ["Hotel stay", "Airport transfers", "City tour", "Selected tickets (varies)"],
  },
  {
    id: 6,
    title: "Tokyo Neon Nights",
    price: 1500,
    image: tokyoImg,
    duration: "6 Day / 5 Night",
    description: "A modern Tokyo journey mixing neon streets, calm shrines, and unforgettable food spots.",
    itinerary: [
      {
        day: "Day 1",
        activities: [
          { time: "Arrival", location: "Shibuya", text: "Shibuya & Shinjuku neon streets and iconic crossings." }
        ]
      },
      {
        day: "Day 2",
        activities: [
          { time: "Morning", location: "Asakusa", text: "Asakusa temples + Skytree area stroll." }
        ]
      },
      {
        day: "Day 3",
        activities: [
          { time: "Day Trip", location: "Flexible", text: "Flexible day trip options (choose based on preference)." }
        ]
      },
      {
        day: "Day 4",
        activities: [
          { time: "Morning", location: "Markets", text: "Food and market tour for local favorites." }
        ]
      },
      {
        day: "Day 5",
        activities: [
          { time: "Evening", location: "Tokyo", text: "Free exploration time with optional suggestions." }
        ]
      }
    ],
    route: {
      stops: [
        { label: "Tokyo", lat: 35.6762, lng: 139.6503 },
        { label: "Shibuya", lat: 35.6595, lng: 139.7005 },
        { label: "Asakusa", lat: 35.7148, lng: 139.8138 },
      ],
      path: [
        { lat: 35.6762, lng: 139.6503 },
        { lat: 35.6595, lng: 139.7005 },
        { lat: 35.7148, lng: 139.8138 },
      ],
    },
    inclusions: ["Hotel stay", "Metro guidance", "Local tour options"],
  },
  {
    id: 7,
    title: "Dubai Luxury Desert",
    price: 900,
    image: dubaiImg,
    duration: "4 Day / 3 Night",
    description: "City glamour meets desert adventure with skyline views, souks, and a premium desert safari.",
    itinerary: [
      {
        time: "Day 1",
        location: "Downtown Dubai",
        text: "Downtown sightseeing and skyline viewpoints.",
      },
      {
        time: "Day 2",
        location: "Desert Safari",
        text: "Premium desert safari with sunset and premium experiences.",
      },
      {
        time: "Day 3",
        location: "Dubai Marina",
        text: "Marina evening walk and relaxed city atmosphere.",
      },
      {
        time: "Day 4",
        location: "Departure",
        text: "Departure transfers and final moments.",
      },
    ],
    route: {
      stops: [
        { label: "Dubai", lat: 25.2048, lng: 55.2708 },
        { label: "Desert Camp", lat: 25.2617, lng: 55.3683 },
        { label: "Marina", lat: 25.0786, lng: 55.1391 },
      ],
      path: [
        { lat: 25.2048, lng: 55.2708 },
        { lat: 25.2617, lng: 55.3683 },
        { lat: 25.0786, lng: 55.1391 },
      ],
    },
    inclusions: ["Hotel stay", "Transfers", "Desert safari", "Selected experiences"],
  },
  {
    id: 8,
    title: "Sydney Harbor Escape",
    price: 1100,
    image: sydneyImg,
    duration: "5 Day / 4 Night",
    description: "Harbor vibes, coastal walks, and landmark experiences in one of the world’s best cities.",
    itinerary: [
      {
        time: "Day 1",
        location: "Sydney Opera House",
        text: "Welcome to Sydney with harbor views near the Opera House.",
      },
      {
        time: "Day 2",
        location: "Bondi",
        text: "Bondi to Coogee coastal walk and seaside stops.",
      },
      {
        time: "Day 3",
        location: "Blue Mountains",
        text: "Blue Mountains day option for scenic lookout experiences.",
      },
      {
        time: "Day 4",
        location: "Harbor Cruise",
        text: "Relax on a harbor cruise and enjoy the skyline from the water.",
      },
      {
        time: "Day 5",
        location: "Departure",
        text: "Departure transfers and final drop-off.",
      },
    ],
    route: {
      stops: [
        { label: "Sydney", lat: -33.8688, lng: 151.2093 },
        { label: "Opera House", lat: -33.8568, lng: 151.2153 },
        { label: "Bondi", lat: -33.8908, lng: 151.2743 },
        { label: "Blue Mountains", lat: -33.7149, lng: 150.3020 },
      ],
      path: [
        { lat: -33.8688, lng: 151.2093 },
        { lat: -33.8568, lng: 151.2153 },
        { lat: -33.8908, lng: 151.2743 },
        { lat: -33.7149, lng: 150.3020 },
      ],
    },
    inclusions: ["Hotel stay", "Transfers", "Harbor cruise (subject to availability)"],
  }
];
