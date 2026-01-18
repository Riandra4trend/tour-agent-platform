'use client';

import React from "react"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Package,
  XCircle,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import type { Booking, BookingStatus } from '@/lib/types';
import api from '@/lib/api';
import Link from 'next/link';
import { format } from 'date-fns';

const statusConfig: Record<BookingStatus, { label: string; color: string; icon: React.ReactNode }> = {
  PENDING: { 
    label: 'Pending', 
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
    icon: <Clock className="h-3.5 w-3.5" />
  },
  PAID: { 
    label: 'Confirmed', 
    color: 'bg-green-100 text-green-800 border-green-200', 
    icon: <CheckCircle className="h-3.5 w-3.5" />
  },
  CANCELLED: { 
    label: 'Cancelled', 
    color: 'bg-red-100 text-red-800 border-red-200', 
    icon: <XCircle className="h-3.5 w-3.5" />
  },
  COMPLETED: { 
    label: 'Completed', 
    color: 'bg-blue-100 text-blue-800 border-blue-200', 
    icon: <CheckCircle className="h-3.5 w-3.5" />
  },
};

export default function UserDashboard() {
  const router = useRouter();
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/dashboard');
      return;
    }

    if (!authLoading && user?.role === 'AGENT') {
      router.push('/agent');
      return;
    }

    const fetchBookings = async () => {
      try {
        const data = await api.getUserBookings();
        setBookings(data);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
        // Mock data for demo
        setBookings([
          {
            id: 'b1',
            user_id: '1',
            tour_package_id: '1',
            tour_package: {
              id: '1',
              title: 'Bali Cultural Immersion',
              description: 'Experience authentic Balinese culture',
              location: { id: '1', name: 'Bali', country: 'Indonesia' },
              location_id: '1',
              min_days: 4,
              max_days: 5,
              price_per_person: 3500000,
              max_capacity: 12,
              includes_transport: true,
              includes_accommodation: true,
              destinations: [],
              availability: [],
              agent: { id: '1', user_id: '1', name: 'Bali Adventures', location: { id: '1', name: 'Bali', country: 'Indonesia' }, location_id: '1', rating: 4.9, total_reviews: 156, is_verified: true, created_at: '' },
              agent_id: '1',
              rating: 4.9,
              total_reviews: 156,
              thumbnail_url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop',
              is_active: true,
              created_at: '',
            },
            availability_id: 'av1',
            availability: {
              id: 'av1',
              tour_package_id: '1',
              start_date: '2026-02-15',
              end_date: '2026-02-19',
              max_capacity: 12,
              booked_slots: 4,
              available_slots: 8,
            },
            total_people: 2,
            total_price: 7000000,
            status: 'PAID',
            booking_date: '2026-01-15',
            created_at: '2026-01-15',
          },
          {
            id: 'b2',
            user_id: '1',
            tour_package_id: '2',
            tour_package: {
              id: '2',
              title: 'Yogyakarta Heritage Tour',
              description: 'Discover ancient temples',
              location: { id: '2', name: 'Yogyakarta', country: 'Indonesia' },
              location_id: '2',
              min_days: 3,
              max_days: 4,
              price_per_person: 2800000,
              max_capacity: 15,
              includes_transport: true,
              includes_accommodation: true,
              destinations: [],
              availability: [],
              agent: { id: '2', user_id: '2', name: 'Jogja Tours', location: { id: '2', name: 'Yogyakarta', country: 'Indonesia' }, location_id: '2', rating: 4.7, total_reviews: 89, is_verified: true, created_at: '' },
              agent_id: '2',
              rating: 4.7,
              total_reviews: 89,
              thumbnail_url: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=400&h=300&fit=crop',
              is_active: true,
              created_at: '',
            },
            availability_id: 'av2',
            availability: {
              id: 'av2',
              tour_package_id: '2',
              start_date: '2026-03-10',
              end_date: '2026-03-13',
              max_capacity: 15,
              booked_slots: 6,
              available_slots: 9,
            },
            total_people: 3,
            total_price: 8400000,
            status: 'PENDING',
            booking_date: '2026-01-18',
            created_at: '2026-01-18',
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && user?.role !== 'AGENT') {
      fetchBookings();
    }
  }, [authLoading, isAuthenticated, user, router]);

  const handleCancelBooking = async (bookingId: string) => {
    setCancellingId(bookingId);
    try {
      await api.cancelBooking(bookingId);
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: 'CANCELLED' as BookingStatus } : b
        )
      );
      toast({
        title: 'Booking cancelled',
        description: 'Your booking has been cancelled successfully.',
      });
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      // Demo mode
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: 'CANCELLED' as BookingStatus } : b
        )
      );
      toast({
        title: 'Booking cancelled',
        description: 'Your booking has been cancelled (demo mode).',
      });
    } finally {
      setCancellingId(null);
    }
  };

  const activeBookings = bookings.filter((b) => b.status === 'PENDING' || b.status === 'PAID');
  const pastBookings = bookings.filter((b) => b.status === 'COMPLETED' || b.status === 'CANCELLED');

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-10 w-48 mb-2" />
            <Skeleton className="h-4 w-64 mb-8" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-48 rounded-xl" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Bookings</h1>
            <p className="text-muted-foreground">
              Manage your tour reservations and view booking history
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{bookings.length}</p>
                    <p className="text-xs text-muted-foreground">Total Bookings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{activeBookings.length}</p>
                    <p className="text-xs text-muted-foreground">Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{bookings.filter((b) => b.status === 'PENDING').length}</p>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{bookings.filter((b) => b.status === 'COMPLETED').length}</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bookings Tabs */}
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="active">Active ({activeBookings.length})</TabsTrigger>
              <TabsTrigger value="history">History ({pastBookings.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              {activeBookings.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-lg font-semibold mb-2">No active bookings</h3>
                    <p className="text-muted-foreground mb-4">Start exploring tours and book your next adventure!</p>
                    <Button asChild>
                      <Link href="/search">Explore Tours</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {activeBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onCancel={handleCancelBooking}
                      isCancelling={cancellingId === booking.id}
                      formatPrice={formatPrice}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="history">
              {pastBookings.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-lg font-semibold mb-2">No past bookings</h3>
                    <p className="text-muted-foreground">Your completed and cancelled bookings will appear here.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {pastBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onCancel={handleCancelBooking}
                      isCancelling={cancellingId === booking.id}
                      formatPrice={formatPrice}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

interface BookingCardProps {
  booking: Booking;
  onCancel: (id: string) => void;
  isCancelling: boolean;
  formatPrice: (price: number) => string;
}

function BookingCard({ booking, onCancel, isCancelling, formatPrice }: BookingCardProps) {
  const status = statusConfig[booking.status];
  const tour = booking.tour_package;
  const availability = booking.availability;

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Tour Image */}
        <div className="md:w-48 h-40 md:h-auto flex-shrink-0">
          <img
            src={tour?.thumbnail_url || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'}
            alt={tour?.title || 'Tour'}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className={`${status.color} border flex items-center gap-1`}>
                  {status.icon}
                  {status.label}
                </Badge>
              </div>
              <Link href={`/tours/${tour?.id}`} className="group">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {tour?.title || 'Tour Package'}
                </h3>
              </Link>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="h-3.5 w-3.5" />
                {tour?.location?.name || 'Indonesia'}
              </div>

              <div className="flex flex-wrap gap-4 mt-4 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {availability ? (
                    <span>
                      {format(new Date(availability.start_date), 'MMM d')} -{' '}
                      {format(new Date(availability.end_date), 'MMM d, yyyy')}
                    </span>
                  ) : (
                    <span>Date not available</span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {booking.total_people} people
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{formatPrice(booking.total_price)}</p>
              <p className="text-xs text-muted-foreground">Total Price</p>
              
              {(booking.status === 'PENDING' || booking.status === 'PAID') && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="mt-3 bg-transparent" disabled={isCancelling}>
                      {isCancelling ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 mr-1" />
                          Cancel
                        </>
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to cancel this booking? This action cannot be undone.
                        {booking.status === 'PAID' && ' A refund will be processed within 5-7 business days.'}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onCancel(booking.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Cancel Booking
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
