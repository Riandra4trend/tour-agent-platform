'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Users, Car, Home } from 'lucide-react';
import type { TourPackage } from '@/lib/types';

interface TourCardProps {
  tour: TourPackage;
}

export function TourCard({ tour }: TourCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link href={`/tours/${tour.id}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={tour.thumbnail_url || `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop`}
            alt={tour.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          {tour.includes_transport && tour.includes_accommodation && (
            <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
              All Inclusive
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
            <MapPin className="h-3.5 w-3.5" />
            <span>{tour.location?.name || 'Indonesia'}</span>
          </div>
          <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {tour.title}
          </h3>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{tour.min_days === tour.max_days ? `${tour.min_days}D` : `${tour.min_days}-${tour.max_days}D`}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              <span>Max {tour.max_capacity}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {tour.includes_transport && (
              <div className="flex items-center gap-1 text-primary">
                <Car className="h-3.5 w-3.5" />
              </div>
            )}
            {tour.includes_accommodation && (
              <div className="flex items-center gap-1 text-primary">
                <Home className="h-3.5 w-3.5" />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="px-4 pb-4 pt-0 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="font-medium text-sm">{tour.rating?.toFixed(1) || '0.0'}</span>
            <span className="text-muted-foreground text-sm">({tour.total_reviews || 0})</span>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-primary">{formatPrice(tour.price_per_person)}</p>
            <p className="text-xs text-muted-foreground">per person</p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
