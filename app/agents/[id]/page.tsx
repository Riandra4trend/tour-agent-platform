'use client';

import { use } from 'react';
import { Header } from '@/components/header';
import { TourCard } from '@/components/tour-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  MapPin,
  Star,
  CheckCircle,
  Globe,
  Instagram,
  MessageCircle,
  ChevronLeft,
  Package,
} from 'lucide-react';
import { getAgentById, getToursByAgent, mockAgents } from '@/lib/mock-data';
import Link from 'next/link';

export default function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  const agent = getAgentById(resolvedParams.id) || mockAgents[0];
  const agentTours = getToursByAgent(agent.id);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/agents">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Agents
            </Link>
          </Button>

          {/* Agent Header */}
          <Card className="mb-8">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <Avatar className="h-24 w-24 md:h-32 md:w-32">
                  <AvatarImage src={agent.avatar_url || "/placeholder.svg"} />
                  <AvatarFallback className="bg-primary/10 text-primary text-3xl font-semibold">
                    {agent.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">{agent.name}</h1>
                    {agent.is_verified && (
                      <Badge className="bg-primary/10 text-primary">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1 text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4" />
                    <span>{agent.location?.name}, {agent.location?.country}</span>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-accent text-accent" />
                      <span className="text-lg font-semibold">{agent.rating}</span>
                      <span className="text-muted-foreground">({agent.total_reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Package className="h-4 w-4" />
                      <span>{agentTours.length} tour packages</span>
                    </div>
                  </div>

                  {agent.description && (
                    <p className="text-muted-foreground mb-4">{agent.description}</p>
                  )}

                  {/* Social Links */}
                  {agent.social_links && (
                    <div className="flex flex-wrap gap-2">
                      {agent.social_links.website && (
                        <Button variant="outline" size="sm" asChild className="bg-transparent">
                          <a href={agent.social_links.website} target="_blank" rel="noopener noreferrer">
                            <Globe className="h-4 w-4 mr-2" />
                            Website
                          </a>
                        </Button>
                      )}
                      {agent.social_links.instagram && (
                        <Button variant="outline" size="sm" asChild className="bg-transparent">
                          <a href={agent.social_links.instagram} target="_blank" rel="noopener noreferrer">
                            <Instagram className="h-4 w-4 mr-2" />
                            Instagram
                          </a>
                        </Button>
                      )}
                      {agent.social_links.whatsapp && (
                        <Button variant="outline" size="sm" asChild className="bg-transparent">
                          <a href={`https://wa.me/${agent.social_links.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            WhatsApp
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agent Tours */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Tour Packages by {agent.name}
            </h2>
            
            {agentTours.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {agentTours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No tours available</h3>
                  <p className="text-muted-foreground">
                    This agent hasnt published any tour packages yet.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
