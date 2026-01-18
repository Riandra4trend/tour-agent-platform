// User & Auth Types
export type UserRole = 'USER' | 'AGENT';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatar_url?: string;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  phone?: string;
}

// Location Types
export interface Location {
  id: string;
  name: string;
  province?: string;
  country: string;
}

// Tour Package Types
export interface Destination {
  id: string;
  name: string;
  description?: string;
  order: number;
}

export interface TourAvailability {
  id: string;
  tour_package_id: string;
  start_date: string;
  end_date: string;
  max_capacity: number;
  booked_slots: number;
  available_slots: number;
}

export interface TourPackage {
  id: string;
  title: string;
  description: string;
  location: Location;
  location_id: string;
  min_days: number;
  max_days: number;
  price_per_person: number;
  max_capacity: number;
  includes_transport: boolean;
  includes_accommodation: boolean;
  destinations: Destination[];
  availability: TourAvailability[];
  agent: Agent;
  agent_id: string;
  rating: number;
  total_reviews: number;
  thumbnail_url?: string;
  images?: string[];
  is_active: boolean;
  created_at: string;
}

export interface TourPackageFormData {
  title: string;
  description: string;
  location_id: string;
  min_days: number;
  max_days: number;
  price_per_person: number;
  max_capacity: number;
  includes_transport: boolean;
  includes_accommodation: boolean;
  destinations: Omit<Destination, 'id'>[];
}

export interface AvailabilityFormData {
  start_date: string;
  end_date: string;
  max_capacity: number;
}

// Agent Types
export interface Agent {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  location: Location;
  location_id: string;
  rating: number;
  total_reviews: number;
  avatar_url?: string;
  social_links?: {
    website?: string;
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
  google_maps_url?: string;
  is_verified: boolean;
  created_at: string;
}

// Booking Types
export type BookingStatus = 'PENDING' | 'PAID' | 'CANCELLED' | 'COMPLETED';

export interface Booking {
  id: string;
  user_id: string;
  user?: User;
  tour_package_id: string;
  tour_package?: TourPackage;
  availability_id: string;
  availability?: TourAvailability;
  total_people: number;
  total_price: number;
  status: BookingStatus;
  booking_date: string;
  notes?: string;
  created_at: string;
}

export interface BookingFormData {
  tour_package_id: string;
  availability_id: string;
  total_people: number;
  notes?: string;
}

// Search & Filter Types
export interface SearchFilters {
  location?: string;
  start_date?: string;
  end_date?: string;
  total_people?: number;
  max_days?: number;
  min_price?: number;
  max_price?: number;
}

export interface LandingFilters {
  locations: Location[];
}

// AI Chat Types
export interface AIChatMessage {
  role: 'user' | 'assistant';
  content: string;
  recommended_tours?: TourPackage[];
}

export interface AIChatRequest {
  location?: string;
  budget?: number;
  days?: number;
  travel_style?: string;
  message: string;
}

// API Response Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, string[]>;
}
