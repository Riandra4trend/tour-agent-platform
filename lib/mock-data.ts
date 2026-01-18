import type { TourPackage, Agent, Location, Booking } from './types';

export const mockLocations: Location[] = [
  { id: '1', name: 'Bali', province: 'Bali', country: 'Indonesia' },
  { id: '2', name: 'Yogyakarta', province: 'D.I. Yogyakarta', country: 'Indonesia' },
  { id: '3', name: 'Jakarta', province: 'DKI Jakarta', country: 'Indonesia' },
  { id: '4', name: 'Lombok', province: 'West Nusa Tenggara', country: 'Indonesia' },
  { id: '5', name: 'Raja Ampat', province: 'West Papua', country: 'Indonesia' },
  { id: '6', name: 'Bandung', province: 'West Java', country: 'Indonesia' },
  { id: '7', name: 'Komodo', province: 'East Nusa Tenggara', country: 'Indonesia' },
  { id: '8', name: 'Labuan Bajo', province: 'East Nusa Tenggara', country: 'Indonesia' },
];

export const mockAgents: Agent[] = [
  {
    id: '1',
    user_id: '1',
    name: 'Bali Adventures',
    description: 'Your gateway to authentic Balinese experiences. We specialize in cultural tours, temple visits, and hidden gem explorations.',
    location: mockLocations[0],
    location_id: '1',
    rating: 4.9,
    total_reviews: 156,
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    social_links: {
      instagram: 'https://instagram.com/baliadventures',
      whatsapp: '+6281234567890',
    },
    is_verified: true,
    created_at: '2023-01-15',
  },
  {
    id: '2',
    user_id: '2',
    name: 'Jogja Cultural Tours',
    description: 'Discover the heart of Javanese culture with our expert guides. Temple tours, batik workshops, and traditional cuisine experiences.',
    location: mockLocations[1],
    location_id: '2',
    rating: 4.7,
    total_reviews: 89,
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    social_links: {
      instagram: 'https://instagram.com/jogjatours',
      whatsapp: '+6281234567891',
    },
    is_verified: true,
    created_at: '2023-02-20',
  },
  {
    id: '3',
    user_id: '3',
    name: 'Lombok Paradise',
    description: 'Beach lovers paradise! We offer snorkeling, surfing, and Mount Rinjani trekking adventures.',
    location: mockLocations[3],
    location_id: '4',
    rating: 4.8,
    total_reviews: 67,
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    social_links: {
      instagram: 'https://instagram.com/lombokparadise',
      whatsapp: '+6281234567892',
    },
    is_verified: true,
    created_at: '2023-03-10',
  },
  {
    id: '4',
    user_id: '4',
    name: 'Raja Ampat Diving',
    description: 'World-class diving experiences in the heart of the Coral Triangle. PADI certified instructors.',
    location: mockLocations[4],
    location_id: '5',
    rating: 5.0,
    total_reviews: 45,
    avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    social_links: {
      instagram: 'https://instagram.com/rajadivers',
      website: 'https://rajaampatdiving.com',
    },
    is_verified: true,
    created_at: '2023-04-05',
  },
  {
    id: '5',
    user_id: '5',
    name: 'Komodo Explorer',
    description: 'Meet the legendary Komodo dragons and explore pristine islands with our expert rangers.',
    location: mockLocations[6],
    location_id: '7',
    rating: 4.9,
    total_reviews: 78,
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    social_links: {
      instagram: 'https://instagram.com/komodoexplorer',
      whatsapp: '+6281234567894',
    },
    is_verified: true,
    created_at: '2023-05-15',
  },
];

export const mockTours: TourPackage[] = [
  {
    id: '1',
    title: 'Bali Cultural Immersion',
    description: 'Experience authentic Balinese culture with temple visits, traditional dance performances, and local cuisine. This comprehensive tour takes you through the spiritual heart of Bali, from the majestic Tanah Lot temple to the artistic village of Ubud. Includes visits to rice terraces, local markets, and a traditional Balinese cooking class.',
    location: mockLocations[0],
    location_id: '1',
    min_days: 4,
    max_days: 5,
    price_per_person: 3500000,
    max_capacity: 12,
    includes_transport: true,
    includes_accommodation: true,
    destinations: [
      { id: '1', name: 'Tanah Lot Temple', description: 'Iconic sea temple', order: 1 },
      { id: '2', name: 'Ubud Art Market', description: 'Traditional crafts', order: 2 },
      { id: '3', name: 'Tegallalang Rice Terraces', description: 'UNESCO heritage', order: 3 },
      { id: '4', name: 'Uluwatu Temple', description: 'Sunset kecak dance', order: 4 },
    ],
    availability: [
      { id: '1', tour_package_id: '1', start_date: '2026-02-01', end_date: '2026-02-05', max_capacity: 12, booked_slots: 4, available_slots: 8 },
      { id: '2', tour_package_id: '1', start_date: '2026-02-15', end_date: '2026-02-19', max_capacity: 12, booked_slots: 2, available_slots: 10 },
      { id: '3', tour_package_id: '1', start_date: '2026-03-01', end_date: '2026-03-05', max_capacity: 12, booked_slots: 0, available_slots: 12 },
    ],
    agent: mockAgents[0],
    agent_id: '1',
    rating: 4.9,
    total_reviews: 156,
    thumbnail_url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&h=800&fit=crop',
    ],
    is_active: true,
    created_at: '2024-01-15',
  },
  {
    id: '2',
    title: 'Yogyakarta Heritage Tour',
    description: 'Discover the ancient temples and rich history of Java. Visit the magnificent Borobudur and Prambanan temples, explore the Sultan\'s Palace, and experience traditional Javanese arts including batik making and gamelan music.',
    location: mockLocations[1],
    location_id: '2',
    min_days: 3,
    max_days: 4,
    price_per_person: 2800000,
    max_capacity: 15,
    includes_transport: true,
    includes_accommodation: true,
    destinations: [
      { id: '5', name: 'Borobudur Temple', description: 'Sunrise tour', order: 1 },
      { id: '6', name: 'Prambanan Temple', description: 'Hindu temple complex', order: 2 },
      { id: '7', name: 'Kraton Palace', description: 'Sultan residence', order: 3 },
      { id: '8', name: 'Malioboro Street', description: 'Shopping district', order: 4 },
    ],
    availability: [
      { id: '4', tour_package_id: '2', start_date: '2026-02-05', end_date: '2026-02-08', max_capacity: 15, booked_slots: 8, available_slots: 7 },
      { id: '5', tour_package_id: '2', start_date: '2026-02-20', end_date: '2026-02-23', max_capacity: 15, booked_slots: 3, available_slots: 12 },
    ],
    agent: mockAgents[1],
    agent_id: '2',
    rating: 4.7,
    total_reviews: 89,
    thumbnail_url: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&h=800&fit=crop',
    ],
    is_active: true,
    created_at: '2024-02-20',
  },
  {
    id: '3',
    title: 'Lombok Island Explorer',
    description: 'Beach paradise and mountain adventures await! Snorkel in crystal-clear waters of the Gili Islands, trek through lush landscapes, and witness stunning sunsets. Perfect for adventure seekers and beach lovers alike.',
    location: mockLocations[3],
    location_id: '4',
    min_days: 5,
    max_days: 7,
    price_per_person: 4200000,
    max_capacity: 10,
    includes_transport: true,
    includes_accommodation: true,
    destinations: [
      { id: '9', name: 'Gili Trawangan', description: 'Island hopping', order: 1 },
      { id: '10', name: 'Pink Beach', description: 'Unique pink sand', order: 2 },
      { id: '11', name: 'Sendang Gile Waterfall', description: 'Natural beauty', order: 3 },
    ],
    availability: [
      { id: '6', tour_package_id: '3', start_date: '2026-02-10', end_date: '2026-02-16', max_capacity: 10, booked_slots: 6, available_slots: 4 },
    ],
    agent: mockAgents[2],
    agent_id: '3',
    rating: 4.8,
    total_reviews: 67,
    thumbnail_url: 'https://images.unsplash.com/photo-1570789210967-2cac24e0a0e4?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1570789210967-2cac24e0a0e4?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop',
    ],
    is_active: true,
    created_at: '2024-03-10',
  },
  {
    id: '4',
    title: 'Raja Ampat Diving Paradise',
    description: 'World-class diving and pristine beaches in the heart of the Coral Triangle. Experience the most biodiverse marine ecosystem on Earth with over 1,500 species of fish and 600 coral species. Suitable for all diving levels.',
    location: mockLocations[4],
    location_id: '5',
    min_days: 6,
    max_days: 8,
    price_per_person: 8500000,
    max_capacity: 8,
    includes_transport: true,
    includes_accommodation: true,
    destinations: [
      { id: '12', name: 'Wayag Islands', description: 'Iconic viewpoint', order: 1 },
      { id: '13', name: 'Pianemo', description: 'Karst islands', order: 2 },
      { id: '14', name: 'Manta Sandy', description: 'Manta ray spot', order: 3 },
    ],
    availability: [
      { id: '7', tour_package_id: '4', start_date: '2026-03-01', end_date: '2026-03-08', max_capacity: 8, booked_slots: 2, available_slots: 6 },
    ],
    agent: mockAgents[3],
    agent_id: '4',
    rating: 5.0,
    total_reviews: 45,
    thumbnail_url: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop',
    ],
    is_active: true,
    created_at: '2024-04-05',
  },
  {
    id: '5',
    title: 'Komodo Dragon Adventure',
    description: 'Meet the legendary Komodo dragons in their natural habitat. Explore pristine islands, snorkel with manta rays, and hike to stunning viewpoints. An unforgettable adventure in one of Indonesia\'s most unique destinations.',
    location: mockLocations[6],
    location_id: '7',
    min_days: 4,
    max_days: 5,
    price_per_person: 5500000,
    max_capacity: 12,
    includes_transport: true,
    includes_accommodation: true,
    destinations: [
      { id: '15', name: 'Komodo Island', description: 'Dragon habitat', order: 1 },
      { id: '16', name: 'Rinca Island', description: 'More dragons', order: 2 },
      { id: '17', name: 'Padar Island', description: 'Famous viewpoint', order: 3 },
      { id: '18', name: 'Pink Beach', description: 'Snorkeling spot', order: 4 },
    ],
    availability: [
      { id: '8', tour_package_id: '5', start_date: '2026-02-15', end_date: '2026-02-19', max_capacity: 12, booked_slots: 5, available_slots: 7 },
      { id: '9', tour_package_id: '5', start_date: '2026-03-10', end_date: '2026-03-14', max_capacity: 12, booked_slots: 0, available_slots: 12 },
    ],
    agent: mockAgents[4],
    agent_id: '5',
    rating: 4.9,
    total_reviews: 78,
    thumbnail_url: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1200&h=800&fit=crop',
    ],
    is_active: true,
    created_at: '2024-05-15',
  },
  {
    id: '6',
    title: 'Bali Honeymoon Package',
    description: 'Romantic getaway in the Island of Gods. Private villa stays, couples spa treatments, sunset dinners, and intimate cultural experiences. Perfect for newlyweds or celebrating anniversaries.',
    location: mockLocations[0],
    location_id: '1',
    min_days: 5,
    max_days: 7,
    price_per_person: 6500000,
    max_capacity: 4,
    includes_transport: true,
    includes_accommodation: true,
    destinations: [
      { id: '19', name: 'Seminyak Beach', description: 'Luxury resorts', order: 1 },
      { id: '20', name: 'Ubud Spa', description: 'Couples treatment', order: 2 },
      { id: '21', name: 'Jimbaran Bay', description: 'Sunset dinner', order: 3 },
    ],
    availability: [
      { id: '10', tour_package_id: '6', start_date: '2026-02-14', end_date: '2026-02-20', max_capacity: 4, booked_slots: 2, available_slots: 2 },
    ],
    agent: mockAgents[0],
    agent_id: '1',
    rating: 4.95,
    total_reviews: 42,
    thumbnail_url: 'https://images.unsplash.com/photo-1559628233-100c798642d4?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1559628233-100c798642d4?w=1200&h=800&fit=crop',
    ],
    is_active: true,
    created_at: '2024-06-01',
  },
];

export const mockBookings: Booking[] = [
  {
    id: '1',
    user_id: 'demo-user',
    tour_package_id: '1',
    tour_package: mockTours[0],
    availability_id: '1',
    availability: mockTours[0].availability[0],
    total_people: 2,
    total_price: 7000000,
    status: 'PAID',
    booking_date: '2024-01-20',
    created_at: '2024-01-20',
  },
  {
    id: '2',
    user_id: 'demo-user',
    tour_package_id: '3',
    tour_package: mockTours[2],
    availability_id: '6',
    availability: mockTours[2].availability[0],
    total_people: 3,
    total_price: 12600000,
    status: 'PENDING',
    booking_date: '2024-01-25',
    created_at: '2024-01-25',
  },
];

// Helper function to search/filter tours
export function searchMockTours(filters: {
  location?: string;
  start_date?: string;
  end_date?: string;
  total_people?: number;
  max_days?: number;
  min_price?: number;
  max_price?: number;
}): TourPackage[] {
  return mockTours.filter((tour) => {
    if (filters.location && !tour.location.name.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    if (filters.max_days && tour.min_days > filters.max_days) {
      return false;
    }
    if (filters.min_price && tour.price_per_person < filters.min_price) {
      return false;
    }
    if (filters.max_price && tour.price_per_person > filters.max_price) {
      return false;
    }
    if (filters.total_people && tour.max_capacity < filters.total_people) {
      return false;
    }
    return true;
  });
}

export function getTourById(id: string): TourPackage | undefined {
  return mockTours.find((tour) => tour.id === id);
}

export function getAgentById(id: string): Agent | undefined {
  return mockAgents.find((agent) => agent.id === id);
}

export function getToursByAgent(agentId: string): TourPackage[] {
  return mockTours.filter((tour) => tour.agent_id === agentId);
}
