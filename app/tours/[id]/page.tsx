'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  MapPin,
  Clock,
  Users,
  Star,
  Car,
  Home,
  CheckCircle,
  Calendar,
  ChevronLeft,
  Loader2,
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import type { TourPackage } from '@/lib/types';
import { getTourById, mockTours } from '@/lib/mock-data';
import Link from 'next/link';
import { format } from 'date-fns';

export default function TourDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [tour, setTour] = useState<TourPackage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  
  const [selectedAvailability, setSelectedAvailability] = useState<string>('');
  const [totalPeople, setTotalPeople] = useState('2');
  const [bookingNotes, setBookingNotes] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    const mockTour = getTourById(resolvedParams.id);
    if (mockTour) {
      setTour(mockTour);
    } else {
      // Fallback to first tour for demo
      setTour(mockTours[0]);
    }
    setIsLoading(false);
  }, [resolvedParams.id]);

  const handleBooking = async () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/tours/${resolvedParams.id}`);
      return;
    }

    if (!selectedAvailability || !totalPeople) {
      toast({
        title: 'Missing information',
        description: 'Please select a date and number of people',
        variant: 'destructive',
      });
      return;
    }

    setIsBooking(true);
    
    // Simulate booking
    setTimeout(() => {
      toast({
        title: 'Booking successful!',
        description: 'Your booking has been confirmed (demo mode).',
      });
      setBookingDialogOpen(false);
      setIsBooking(false);
      router.push('/dashboard');
    }, 1500);
  };

  const selectedAvailabilityData = tour?.availability.find(a => a.id === selectedAvailability);
  const totalPrice = selectedAvailabilityData && tour 
    ? tour.price_per_person * parseInt(totalPeople || '0')
    : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-8 w-32 mb-4" />
            <Skeleton className="aspect-video rounded-xl mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div>
                <Skeleton className="h-64 rounded-xl" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
            <h1 className="text-2xl font-bold text-foreground mb-4">Tour not found</h1>
            <Button asChild>
              <Link href="/search">Browse Tours</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/search">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Search
            </Link>
          </Button>

          {/* Hero Image */}
          <div className="relative aspect-video md:aspect-[21/9] rounded-xl overflow-hidden mb-8">
            <img
              src={tour.thumbnail_url || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop'}
              alt={tour.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-white/20 text-white backdrop-blur-sm">
                  <MapPin className="h-3 w-3 mr-1" />
                  {tour.location?.name}
                </Badge>
                {tour.includes_transport && tour.includes_accommodation && (
                  <Badge className="bg-accent text-accent-foreground">All Inclusive</Badge>
                )}
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">{tour.title}</h1>
              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-medium">{tour.rating}</span>
                  <span className="text-white/70">({tour.total_reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{tour.min_days}-{tour.max_days} days</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>About This Tour</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-line">{tour.description}</p>
                  
                  <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-medium">{tour.min_days}-{tour.max_days} days</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Group Size</p>
                        <p className="font-medium">Max {tour.max_capacity} people</p>
                      </div>
                    </div>
                    {tour.includes_transport && (
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Car className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Transport</p>
                          <p className="font-medium">Included</p>
                        </div>
                      </div>
                    )}
                    {tour.includes_accommodation && (
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Home className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Accommodation</p>
                          <p className="font-medium">Included</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {tour.destinations && tour.destinations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Destinations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tour.destinations.map((dest, index) => (
                        <div key={dest.id} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                              {index + 1}
                            </div>
                            {index < tour.destinations.length - 1 && (
                              <div className="w-0.5 flex-1 bg-border mt-2" />
                            )}
                          </div>
                          <div className="pb-4">
                            <h4 className="font-medium text-foreground">{dest.name}</h4>
                            {dest.description && (
                              <p className="text-sm text-muted-foreground mt-1">{dest.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Tour Agent</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link href={`/agents/${tour.agent.id}`} className="flex items-start gap-4 group">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={tour.agent.avatar_url || "/placeholder.svg"} />
                      <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                        {tour.agent.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {tour.agent.name}
                        </h4>
                        {tour.agent.is_verified && (
                          <CheckCircle className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-3.5 w-3.5" />
                        {tour.agent.location?.name}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="font-medium">{tour.agent.rating}</span>
                        <span className="text-muted-foreground">({tour.agent.total_reviews} reviews)</span>
                      </div>
                      {tour.agent.description && (
                        <p className="text-sm text-muted-foreground mt-2">{tour.agent.description}</p>
                      )}
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">{formatPrice(tour.price_per_person)}</span>
                    <span className="text-muted-foreground">/ person</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Available Dates</Label>
                    {tour.availability && tour.availability.length > 0 ? (
                      <div className="space-y-2">
                        {tour.availability.map((avail) => (
                          <button
                            key={avail.id}
                            onClick={() => setSelectedAvailability(avail.id)}
                            className={`w-full p-3 rounded-lg border text-left transition-colors ${
                              selectedAvailability === avail.id
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">
                                  {format(new Date(avail.start_date), 'MMM d')} - {format(new Date(avail.end_date), 'MMM d, yyyy')}
                                </span>
                              </div>
                              {selectedAvailability === avail.id && (
                                <CheckCircle className="h-4 w-4 text-primary" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {avail.available_slots} spots left
                            </p>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No availability at the moment</p>
                    )}
                  </div>

                  <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full" 
                        size="lg"
                        disabled={!tour.availability || tour.availability.length === 0}
                      >
                        Book Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Complete Your Booking</DialogTitle>
                        <DialogDescription>
                          Fill in the details below to book this tour
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div>
                          <Label>Selected Date</Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            {selectedAvailabilityData 
                              ? `${format(new Date(selectedAvailabilityData.start_date), 'MMM d')} - ${format(new Date(selectedAvailabilityData.end_date), 'MMM d, yyyy')}`
                              : 'Please select a date above'
                            }
                          </p>
                        </div>
                        
                        <div>
                          <Label htmlFor="totalPeople">Number of People</Label>
                          <Input
                            id="totalPeople"
                            type="number"
                            min="1"
                            max={selectedAvailabilityData?.available_slots || tour.max_capacity}
                            value={totalPeople}
                            onChange={(e) => setTotalPeople(e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="notes">Special Requests (Optional)</Label>
                          <Textarea
                            id="notes"
                            placeholder="Any dietary requirements, special occasions, etc."
                            value={bookingNotes}
                            onChange={(e) => setBookingNotes(e.target.value)}
                            className="mt-1"
                          />
                        </div>

                        <div className="pt-4 border-t">
                          <div className="flex justify-between text-lg font-semibold">
                            <span>Total</span>
                            <span className="text-primary">{formatPrice(totalPrice)}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {formatPrice(tour.price_per_person)} x {totalPeople} people
                          </p>
                        </div>

                        <Button 
                          className="w-full" 
                          size="lg" 
                          onClick={handleBooking}
                          disabled={isBooking || !selectedAvailability}
                        >
                          {isBooking ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            'Confirm Booking'
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {!isAuthenticated && (
                    <p className="text-sm text-center text-muted-foreground">
                      You need to{' '}
                      <Link href={`/login?redirect=/tours/${tour.id}`} className="text-primary hover:underline">
                        sign in
                      </Link>
                      {' '}to book this tour
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
