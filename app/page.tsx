import { Header } from '@/components/header';
import { SearchBar } from '@/components/search-bar';
import { TourCard } from '@/components/tour-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Star, Shield, Clock, Globe } from 'lucide-react';
import Link from 'next/link';
import { mockTours } from '@/lib/mock-data';

export default function HomePage() {
  const recommendedTours = mockTours.slice(0, 4);

  return (
    <div className="min-h-screen">
      <Header transparent />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
            <div className="text-center mb-10">
              <Badge className="mb-4 bg-white/10 text-white border-white/20 backdrop-blur-sm">
                Discover Indonesia
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 text-balance">
                Find Your Perfect
                <span className="text-accent block">Tour Adventure</span>
              </h1>

              <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto text-pretty">
                Connect with verified local tour agents and discover amazing destinations across Indonesia
              </p>
            </div>
            {/* Search Bar */}
            <SearchBar variant="hero" />
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Popular Destinations</h2>
              <p className="text-muted-foreground">Explore trending locations across Indonesia</p>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex bg-transparent">
              <Link href="/search">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=500&fit=crop', count: 120 },
              { name: 'Yogyakarta', image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=400&h=500&fit=crop', count: 85 },
              { name: 'Lombok', image: 'https://images.unsplash.com/photo-1570789210967-2cac24e0a0e4?w=400&h=500&fit=crop', count: 64 },
              { name: 'Raja Ampat', image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=400&h=500&fit=crop', count: 42 },
            ].map((dest) => (
              <Link
                key={dest.name}
                href={`/search?location=${dest.name}`}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden"
              >
                <img
                  src={dest.image || "/placeholder.svg"}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-semibold text-white text-lg">{dest.name}</h3>
                  <p className="text-white/70 text-sm">{dest.count} tours</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Tours */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Recommended Tours</h2>
              <p className="text-muted-foreground">Handpicked experiences for your next adventure</p>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex bg-transparent">
              <Link href="/search">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button asChild>
              <Link href="/search">
                View All Tours
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Verified Agents Section */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Why Choose Wisata</h2>
            <p className="text-muted-foreground">All tour agents are verified and trusted local partners</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 p-6 rounded-xl bg-card border">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Verified Agents</h3>
                <p className="text-sm text-muted-foreground">All tour agents are verified and trusted local partners</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-xl bg-card border">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Best Price Guarantee</h3>
                <p className="text-sm text-muted-foreground">Book directly with agents for the best available prices</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-xl bg-card border">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Flexible Booking</h3>
                <p className="text-sm text-muted-foreground">Easy cancellation and flexible date changes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Globe className="h-12 w-12 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
            Become a Tour Agent
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8 text-pretty">
            Join our marketplace and reach thousands of travelers looking for authentic local experiences
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register?role=AGENT">
              Start as Agent
              <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground font-bold text-xl">
                  W
                </div>
                <span className="font-bold text-xl">Wisata</span>
              </div>
              <p className="text-sm text-background/70">
                Your trusted marketplace for discovering amazing tour packages across Indonesia.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><Link href="/search" className="hover:text-background transition-colors">All Tours</Link></li>
                <li><Link href="/agents" className="hover:text-background transition-colors">Tour Agents</Link></li>
                <li><Link href="/search?location=Bali" className="hover:text-background transition-colors">Bali Tours</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><Link href="#" className="hover:text-background transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-background transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-background transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><Link href="#" className="hover:text-background transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-background transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-background transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-background/20 text-center text-sm text-background/60">
            <p>&copy; {new Date().getFullYear()} Wisata Nusantara. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
