import { Header } from '@/components/header';
import { AgentCard } from '@/components/agent-card';
import { mockAgents, mockLocations } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Users, Award, MapPin } from 'lucide-react';

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge className="mb-4">Verified Partners</Badge>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Meet Our Tour Agents
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with verified local experts who will make your Indonesian adventure unforgettable
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center gap-4 p-6 rounded-xl bg-card border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockAgents.length}+</p>
                <p className="text-sm text-muted-foreground">Verified Agents</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 rounded-xl bg-card border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockLocations.length}+</p>
                <p className="text-sm text-muted-foreground">Destinations</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 rounded-xl bg-card border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">4.8</p>
                <p className="text-sm text-muted-foreground">Avg. Rating</p>
              </div>
            </div>
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
