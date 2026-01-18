import type {
  User,
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  TourPackage,
  TourPackageFormData,
  AvailabilityFormData,
  Agent,
  Booking,
  BookingFormData,
  SearchFilters,
  LandingFilters,
  AIChatRequest,
  AIChatMessage,
  PaginatedResponse,
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

class ApiService {
  private accessToken: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('access_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.accessToken) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${this.accessToken}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  setAccessToken(token: string | null) {
    this.accessToken = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('access_token', token);
      } else {
        localStorage.removeItem('access_token');
      }
    }
  }

  getAccessToken() {
    return this.accessToken;
  }

  // Auth endpoints
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    this.setAccessToken(response.access_token);
    return response;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    this.setAccessToken(response.access_token);
    return response;
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/users/me');
  }

  logout() {
    this.setAccessToken(null);
  }

  // Landing page filters
  async getLandingFilters(): Promise<LandingFilters> {
    return this.request<LandingFilters>('/landing/filters');
  }

  // Tour endpoints
  async searchTours(filters: SearchFilters = {}): Promise<PaginatedResponse<TourPackage>> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    });
    return this.request<PaginatedResponse<TourPackage>>(`/tours/search?${params.toString()}`);
  }

  async getTourById(id: string): Promise<TourPackage> {
    return this.request<TourPackage>(`/tours/${id}`);
  }

  // Booking endpoints
  async createBooking(data: BookingFormData): Promise<Booking> {
    return this.request<Booking>('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getUserBookings(): Promise<Booking[]> {
    return this.request<Booking[]>('/users/me/bookings');
  }

  async getBookingById(id: string): Promise<Booking> {
    return this.request<Booking>(`/bookings/${id}`);
  }

  async cancelBooking(id: string): Promise<Booking> {
    return this.request<Booking>(`/bookings/${id}/cancel`, {
      method: 'POST',
    });
  }

  // Agent endpoints
  async getAgents(location?: string): Promise<PaginatedResponse<Agent>> {
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    return this.request<PaginatedResponse<Agent>>(`/agents?${params.toString()}`);
  }

  async getAgentById(id: string): Promise<Agent & { packages: TourPackage[] }> {
    return this.request<Agent & { packages: TourPackage[] }>(`/agents/${id}`);
  }

  // Agent dashboard endpoints
  async getAgentTourPackages(): Promise<TourPackage[]> {
    return this.request<TourPackage[]>('/agents/me/tour-packages');
  }

  async createTourPackage(data: TourPackageFormData): Promise<TourPackage> {
    return this.request<TourPackage>('/agents/tour-packages', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async addTourAvailability(tourPackageId: string, data: AvailabilityFormData): Promise<TourPackage> {
    return this.request<TourPackage>(`/agents/tour-packages/${tourPackageId}/availability`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deactivateTourPackage(tourPackageId: string): Promise<TourPackage> {
    return this.request<TourPackage>(`/agents/tour-packages/${tourPackageId}/deactivate`, {
      method: 'POST',
    });
  }

  // AI Chat endpoint
  async sendAIChat(data: AIChatRequest): Promise<AIChatMessage> {
    return this.request<AIChatMessage>('/ai/chat', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiService();
export default api;
