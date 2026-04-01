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
    localizations: {
      de: {
        title: "Sigiriya-Tour",
        description: "Besteigen Sie den ikonischen Löwenfelsen, erkunden Sie antike Fresken und genießen Sie den Panoramablick.",
        itinerary: [
          { time: "08:00", location: "Colombo / Ihr Hotel", text: "Abholung vom Hotel und malerischer Transfer nach Sigiriya." },
          { time: "10:30", location: "Sigiriya", text: "Besteigung der Felsenfestung Sigiriya und Panoramablick." },
          { time: "13:00", location: "Dambulla", text: "Besuch der Höhlentempel von Dambulla und Besichtigung der Fresken." },
          { time: "14:30", location: "Lokales Mittagessen", text: "Entspannen Sie bei einem lokalen Mittagessen und optionalem Gartenstopp." },
          { time: "17:30", location: "Rücktransfer", text: "Rücktransfer zu Ihrem Hotel." }
        ],
        inclusions: ["Privattransport", "Deutschsprachiger Guide (auf Anfrage)", "Wasser in Flaschen", "Hotelabholung & Rückgabe"]
      },
      fr: {
        title: "Tour de Sigiriya",
        description: "Grimpez sur l'iconique Rocher du Lion, explorez les fresques anciennes et profitez de vues panoramiques.",
        itinerary: [
          { time: "08:00", location: "Colombo / Votre hôtel", text: "Prise en charge à l'hôtel et transfert vers Sigiriya." },
          { time: "10:30", location: "Sigiriya", text: "Ascension de la forteresse du rocher de Sigiriya et vue panoramique." },
          { time: "13:00", location: "Dambulla", text: "Visite des temples des grottes de Dambulla et exploration des fresques." },
          { time: "14:30", location: "Déjeuner local", text: "Détaillez-vous avec un déjeuner local et un arrêt optionnel au jardin." },
          { time: "17:30", location: "Transfert de retour", text: "Retour à votre hôtel." }
        ],
        inclusions: ["Transport privé", "Guide francophone (sur demande)", "Eau en bouteille", "Prise en charge et retour à l'hôtel"]
      },
      zh: {
        title: "锡吉里耶之旅",
        description: "攀登标志性的狮子岩，探索古老的壁画，并享受斯里兰卡文化三角区的全景。",
        itinerary: [
          { time: "08:00", location: "科伦坡 / 您的酒店", text: "酒店接送并经由风景优美的路线前往锡吉里耶。" },
          { time: "10:30", location: "锡吉里耶", text: "攀登锡吉里耶岩石堡垒并享受全景观景点。" },
          { time: "13:00", location: "丹布勒", text: "参观丹布勒石窟寺并探索壁画。" },
          { time: "14:30", location: "当地午餐", text: "享用当地午餐并可选参观花园。" },
          { time: "17:30", location: "返回接送", text: "返回您的酒店。" }
        ],
        inclusions: ["私人交通", "中文导游（根据要求）", "瓶装水", "酒店往返接送"]
      }
    },
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
    localizations: {
      de: {
        title: "Ella Abenteuer",
        description: "Ein nebliger Rückzugsort in den Bergen mit malerischen Aussichtspunkten und Wasserfällen.",
        itinerary: [
          { day: "Tag 1", activities: [{ time: "07:30", location: "Kandy", text: "Abfahrt von Kandy nach Ella mit dem Zug/Transfer." }] },
          { day: "Tag 2", activities: [{ time: "09:00", location: "Neun-Bögen-Brücke", text: "Fangen Sie malerische Bahnfotos ein." }] }
        ],
        inclusions: ["Transport", "Reiseleitung", "Aussichtspunkte", "Optionale Zugunterstützung"]
      },
      fr: {
        title: "Aventure à Ella",
        description: "Une escapade dans les montagnes brumeuses avec des points de vue pittoresques et des cascades.",
        itinerary: [
          { day: "Jour 1", activities: [{ time: "07:30", location: "Kandy", text: "Départ de Kandy pour Ella via train/transfert." }] },
          { day: "Jour 2", activities: [{ time: "09:00", location: "Pont aux neuf arches", text: "Prenez des photos ferroviaires pittoresques." }] }
        ],
        inclusions: ["Transport", "Assistance guide", "Visites de points de vue", "Soutien ferroviaire optionnel"]
      },
      zh: {
        title: "艾勒探险",
        description: "迷雾缭绕的山区度假胜地，拥有优美的风景点、瀑布和轻松的山区氛围。",
        itinerary: [
          { day: "第1天", activities: [{ time: "07:30", location: "康提", text: "乘火车/专车从康提前往艾勒。" }] },
          { day: "第2天", activities: [{ time: "09:00", location: "九拱桥", text: "拍摄优美的铁轨照片。" }] }
        ],
        inclusions: ["交通", "导游协助", "观景点游览", "可选火车行程支持"]
      }
    },
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
    localizations: {
      de: {
        title: "Tagesausflug nach Galle",
        description: "Besichtigen Sie das koloniale Fort, stöbern Sie in Boutique-Cafés und genießen Sie den Küstencharme.",
        itinerary: [
          { time: "09:00", location: "Colombo", text: "Küstenzuahrt nach Galle mit Fotostopps." },
          { time: "10:30", location: "Galle Fort", text: "Geführter Rundgang durch das Fort." }
        ],
        inclusions: ["Transport", "Festungsführung", "Fotostopps"]
      },
      fr: {
        title: "Excursion d'une journée à Galle",
        description: "Promenez-vous dans le fort colonial, parcourez les cafés-boutiques et profitez du charme côtier.",
        itinerary: [
          { time: "09:00", location: "Colombo", text: "Route côtière vers Galle avec des arrêts photo." },
          { time: "10:30", location: "Fort de Galle", text: "Visite guidée à pied à l'intérieur du fort." }
        ],
        inclusions: ["Transport", "Visite du fort", "Arrêts photo"]
      },
      zh: {
        title: "加勒一日游",
        description: "漫步在殖民时期的堡垒，浏览精品咖啡馆，享受斯里兰卡南部的海岸魅力。",
        itinerary: [
          { time: "09:00", location: "科伦坡", text: "沿海驾车前往加勒，沿途拍照留念。" },
          { time: "10:30", location: "加勒堡", text: "堡垒和殖民街道内的导览步行游。" }
        ],
        inclusions: ["交通", "堡垒游览", "拍照停靠点"]
      }
    },
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
    localizations: {
      de: { title: "Kulturshow in Kandy", description: "Ein immersiver Abend mit traditionellem Tanz und Trommeln.", itinerary: [ { time: "18:30", location: "Kandy Kulturbühne", text: "Genießen Sie die kulturelle Performance." } ], inclusions: ["Transport", "Reservierte Sitzplätze"] },
      fr: { title: "Spectacle culturel de Kandy", description: "Une nuit culturelle immersive avec danse traditionnelle et tambours.", itinerary: [ { time: "18:30", location: "Lieu culturel de Kandy", text: "Profitez de la performance de danse culturelle." } ], inclusions: ["Transport", "Sièges réservés"] },
      zh: { title: "康提文化表演", description: "身临其境的文化之夜，有传统舞蹈、鼓点和充满活力的当地氛围。", itinerary: [ { time: "18:30", location: "康提文化场馆", text: "欣赏文化舞蹈+敲鼓表演。" } ], inclusions: ["交通", "预留座位"] }
    },
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
    localizations: {
      de: {
        title: "Paris Romantik",
        description: "Klassische Pariser Highlights mit kuratierten Stadterlebnissen, ikonischen Wahrzeichen und Cafékultur.",
        itinerary: [
          { day: "Tag 1", activities: [{ time: "Ankunft", location: "Paris", text: "Ankunft und entspannter Spaziergang an der Seine." }] },
          { day: "Tag 2", activities: [{ time: "Vormittag", location: "Eiffelturm", text: "Eiffelturm-Aussichten und Spaziergang entlang der Champs-Élysées." }] },
          { day: "Tag 3", activities: [{ time: "Ganzjährig", location: "Louvre", text: "Louvre-Tag mit kuratierten Highlights." }] },
          { day: "Tag 4", activities: [{ time: "Nachmittag", location: "Montmartre", text: "Montmartre-Charme und Abendatmosphäre." }] },
          { day: "Tag 5", activities: [{ time: "Abreise", location: "Flughafen", text: "Frühstück und Transfer zum Flughafen." }] }
        ],
        inclusions: ["Hotelaufenthalt", "Flughafentransfer", "Stadtführung", "Eintrittskarten"]
      },
      fr: {
        title: "Romance à Paris",
        description: "Les classiques de Paris avec des expériences urbaines choisies, des monuments emblématiques et la culture des cafés.",
        itinerary: [
          { day: "Jour 1", activities: [{ time: "Arrivée", location: "Paris", text: "Arrivée et promenade relaxante sur la Seine." }] },
          { day: "Jour 2", activities: [{ time: "Matin", location: "Tour Eiffel", text: "Vues sur la Tour Eiffel et promenade sur les Champs-Élysées." }] },
          { day: "Jour 3", activities: [{ time: "Journée", location: "Musée du Louvre", text: "Journée au Louvre avec des points forts sélectionnés." }] },
          { day: "Jour 4", activities: [{ time: "Après-midi", location: "Montmartre", text: "Charme de Montmartre et atmosphère de soirée." }] },
          { day: "Jour 5", activities: [{ time: "Départ", location: "Aéroport", text: "Petit-déjeuner et transferts vers l'aéroport." }] }
        ],
        inclusions: ["Séjour à l'hôtel", "Transferts aéroport", "Visite de la ville", "Billets sélectionnés"]
      },
      zh: {
        title: "巴黎浪漫之旅",
        description: "经典的巴黎亮点，精心策划的城市体验，标志性地标和咖啡馆文化。",
        itinerary: [
          { day: "第 1 天", activities: [{ time: "抵达", location: "巴黎", text: "抵达并进行悠闲的塞纳河散步。" }] },
          { day: "第 2 天", activities: [{ time: "上午", location: "埃菲尔铁塔", text: "欣赏埃菲尔铁塔美景并沿着香榭丽舍大街漫步。" }] },
          { day: "第 3 天", activities: [{ time: "全天", location: "卢浮宫", text: "卢浮宫博物馆日，参观精心挑选的内容。" }] },
          { day: "第 4 天", activities: [{ time: "下午", location: "蒙马特", text: "蒙马特魅力、观景点和晚间咖啡馆氛围。" }] },
          { day: "第 5 天", activities: [{ time: "离境", location: "机场", text: "最后的早餐和机场送机。" }] }
        ],
        inclusions: ["酒店住宿", "机场接送", "城市游览", "部分门票"]
      }
    },
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
      },
      {
        day: "Day 6",
        activities: [
          { time: "Departure", location: "Airport", text: "Departure transfers and last-minute shopping." }
        ]
      }
    ],
    localizations: {
      de: {
        title: "Tokio Neonnächte",
        description: "Eine moderne Reise nach Tokio, die Neonstraßen, ruhige Schreine und unvergessliche Food-Spots mischt.",
        itinerary: [
          { day: "Tag 1", activities: [{ time: "Ankunft", location: "Shibuya", text: "Shibuya & Shinjuku Neinstraßen." }] },
          { day: "Tag 2", activities: [{ time: "Vormittag", location: "Asakusa", text: "Asakusa Tempel + Skytree Bereich." }] },
          { day: "Tag 6", activities: [{ time: "Abreise", location: "Flughafen", text: "Transfer zum Flughafen." }] }
        ],
        inclusions: ["5 Nächte Unterkunft", "Privater Guide", "Metro-Pass", "Eintrittsgelder"]
      },
      fr: {
        title: "Nuits de Néon à Tokyo",
        description: "Un voyage moderne à Tokyo mêlant rues de néon, sanctuaires calmes et lieux de restauration inoubliables.",
        itinerary: [
          { day: "Jour 1", activities: [{ time: "Arrivée", location: "Shibuya", text: "Rues de néon de Shibuya et Shinjuku." }] },
          { day: "Jour 2", activities: [{ time: "Matin", location: "Asakusa", text: "Temples d'Asakusa + zone Skytree." }] },
          { day: "Jour 6", activities: [{ time: "Départ", location: "Aéroport", text: "Transferts de départ." }] }
        ],
        inclusions: ["5 nuits d'hébergement", "Guide privé", "Pass métro", "Frais d'entrée"]
      },
      zh: {
        title: "东京霓虹之夜",
        description: "现代东京之旅，融合了霓虹灯街道、宁静的神社和令人难忘的美食点。",
        itinerary: [
          { day: "第 1 天", activities: [{ time: "抵达", location: "涩谷", text: "涩谷和新宿的霓虹街道。" }] },
          { day: "第 2 天", activities: [{ time: "上午", location: "浅草", text: "浅草寺 + 晴空塔区域。" }] },
          { day: "第 6 天", activities: [{ time: "离境", location: "机场", text: "送机并进行最后的购物。" }] }
        ],
        inclusions: ["5 晚住宿", "私人导游", "地铁通行证", "入场费"]
      }
    },
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
