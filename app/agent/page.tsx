'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
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
  Package, 
  Calendar, 
  Users, 
  DollarSign, 
  Plus,
  MapPin,
  Clock,
  Car,
  Home,
  Star,
  Eye,
  EyeOff,
  Trash2,
  Edit,
  Loader2,
  TrendingUp,
  BarChart3,
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/hooks/use-toast';
import type { TourPackage, TourPackageFormData, AvailabilityFormData, Location } from '@/lib/types';
import api from '@/lib/api';
import { format } from 'date-fns';

export default function AgentDashboard() {
  const router = useRouter();
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState<Location[]>([]);
  
  // Create package dialog
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<TourPackageFormData>({
    title: '',
    description: '',
    location_id: '',
    min_days: 1,
    max_days: 3,
    price_per_person: 1000000,
    max_capacity: 10,
    includes_transport: true,
    includes_accommodation: true,
    destinations: [],
  });
  const [destinationInput, setDestinationInput] = useState('');

  // Availability dialog
  const [availabilityDialogOpen, setAvailabilityDialogOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [isAddingAvailability, setIsAddingAvailability] = useState(false);
  const [availabilityData, setAvailabilityData] = useState<AvailabilityFormData>({
    start_date: '',
    end_date: '',
    max_capacity: 10,
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/agent');
      return;
    }

    if (!authLoading && user?.role !== 'AGENT') {
      router.push('/dashboard');
      return;
    }

    const fetchData = async () => {
      try {
        const [packagesData, filtersData] = await Promise.all([
          api.getAgentTourPackages(),
          api.getLandingFilters(),
        ]);
        setPackages(packagesData);
        setLocations(filtersData.locations || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // Mock data
        setPackages([
          {
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
            destinations: [
              { id: '1', name: 'Ubud Palace', order: 1 },
              { id: '2', name: 'Tegallalang Rice Terraces', order: 2 },
            ],
            availability: [
              { id: 'av1', tour_package_id: '1', start_date: '2026-02-15', end_date: '2026-02-19', max_capacity: 12, booked_slots: 4, available_slots: 8 },
              { id: 'av2', tour_package_id: '1', start_date: '2026-03-01', end_date: '2026-03-05', max_capacity: 12, booked_slots: 2, available_slots: 10 },
            ],
            agent: { id: '1', user_id: '1', name: 'Bali Adventures', location: { id: '1', name: 'Bali', country: 'Indonesia' }, location_id: '1', rating: 4.9, total_reviews: 156, is_verified: true, created_at: '' },
            agent_id: '1',
            rating: 4.9,
            total_reviews: 156,
            thumbnail_url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop',
            is_active: true,
            created_at: '',
          },
          {
            id: '2',
            title: 'Bali Beach Hopping',
            description: 'Visit the best beaches in Bali',
            location: { id: '1', name: 'Bali', country: 'Indonesia' },
            location_id: '1',
            min_days: 3,
            max_days: 4,
            price_per_person: 2500000,
            max_capacity: 15,
            includes_transport: true,
            includes_accommodation: false,
            destinations: [
              { id: '1', name: 'Kuta Beach', order: 1 },
              { id: '2', name: 'Seminyak Beach', order: 2 },
            ],
            availability: [
              { id: 'av3', tour_package_id: '2', start_date: '2026-02-20', end_date: '2026-02-23', max_capacity: 15, booked_slots: 8, available_slots: 7 },
            ],
            agent: { id: '1', user_id: '1', name: 'Bali Adventures', location: { id: '1', name: 'Bali', country: 'Indonesia' }, location_id: '1', rating: 4.9, total_reviews: 156, is_verified: true, created_at: '' },
            agent_id: '1',
            rating: 4.6,
            total_reviews: 78,
            thumbnail_url: 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=400&h=300&fit=crop',
            is_active: true,
            created_at: '',
          },
        ]);
        setLocations([
          { id: '1', name: 'Bali', country: 'Indonesia' },
          { id: '2', name: 'Yogyakarta', country: 'Indonesia' },
          { id: '3', name: 'Lombok', country: 'Indonesia' },
          { id: '4', name: 'Raja Ampat', country: 'Indonesia' },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && user?.role === 'AGENT') {
      fetchData();
    }
  }, [authLoading, isAuthenticated, user, router]);

  const handleCreatePackage = async () => {
    if (!formData.title || !formData.location_id) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setIsCreating(true);
    try {
      const newPackage = await api.createTourPackage(formData);
      setPackages((prev) => [newPackage, ...prev]);
      setCreateDialogOpen(false);
      resetForm();
      toast({
        title: 'Package created!',
        description: 'Your tour package has been created successfully.',
      });
    } catch (error) {
      console.error('Failed to create package:', error);
      // Demo mode
      const mockPackage: TourPackage = {
        ...formData,
        id: `pkg-${Date.now()}`,
        location: locations.find((l) => l.id === formData.location_id) || { id: '1', name: 'Bali', country: 'Indonesia' },
        destinations: formData.destinations.map((d, i) => ({ ...d, id: `dest-${i}` })),
        availability: [],
        agent: { id: '1', user_id: '1', name: user?.name || 'Agent', location: { id: '1', name: 'Bali', country: 'Indonesia' }, location_id: '1', rating: 5.0, total_reviews: 0, is_verified: true, created_at: '' },
        agent_id: '1',
        rating: 0,
        total_reviews: 0,
        is_active: true,
        created_at: new Date().toISOString(),
      };
      setPackages((prev) => [mockPackage, ...prev]);
      setCreateDialogOpen(false);
      resetForm();
      toast({
        title: 'Package created!',
        description: 'Your tour package has been created (demo mode).',
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleAddAvailability = async () => {
    if (!selectedPackageId || !availabilityData.start_date || !availabilityData.end_date) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setIsAddingAvailability(true);
    try {
      await api.addTourAvailability(selectedPackageId, availabilityData);
      // Refresh packages
      const updatedPackages = await api.getAgentTourPackages();
      setPackages(updatedPackages);
      setAvailabilityDialogOpen(false);
      setAvailabilityData({ start_date: '', end_date: '', max_capacity: 10 });
      toast({
        title: 'Availability added!',
        description: 'New availability slot has been added.',
      });
    } catch (error) {
      console.error('Failed to add availability:', error);
      // Demo mode
      setPackages((prev) =>
        prev.map((p) =>
          p.id === selectedPackageId
            ? {
                ...p,
                availability: [
                  ...p.availability,
                  {
                    id: `av-${Date.now()}`,
                    tour_package_id: selectedPackageId,
                    start_date: availabilityData.start_date,
                    end_date: availabilityData.end_date,
                    max_capacity: availabilityData.max_capacity,
                    booked_slots: 0,
                    available_slots: availabilityData.max_capacity,
                  },
                ],
              }
            : p
        )
      );
      setAvailabilityDialogOpen(false);
      setAvailabilityData({ start_date: '', end_date: '', max_capacity: 10 });
      toast({
        title: 'Availability added!',
        description: 'New availability slot has been added (demo mode).',
      });
    } finally {
      setIsAddingAvailability(false);
    }
  };

  const handleDeactivatePackage = async (packageId: string) => {
    try {
      await api.deactivateTourPackage(packageId);
      setPackages((prev) =>
        prev.map((p) => (p.id === packageId ? { ...p, is_active: false } : p))
      );
      toast({
        title: 'Package deactivated',
        description: 'Your tour package has been deactivated.',
      });
    } catch (error) {
      console.error('Failed to deactivate package:', error);
      // Demo mode
      setPackages((prev) =>
        prev.map((p) => (p.id === packageId ? { ...p, is_active: !p.is_active } : p))
      );
      toast({
        title: 'Package status updated',
        description: 'Package status has been updated (demo mode).',
      });
    }
  };

  const addDestination = () => {
    if (destinationInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        destinations: [
          ...prev.destinations,
          { name: destinationInput.trim(), order: prev.destinations.length + 1 },
        ],
      }));
      setDestinationInput('');
    }
  };

  const removeDestination = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      destinations: prev.destinations.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      location_id: '',
      min_days: 1,
      max_days: 3,
      price_per_person: 1000000,
      max_capacity: 10,
      includes_transport: true,
      includes_accommodation: true,
      destinations: [],
    });
    setDestinationInput('');
  };

  // Stats calculations
  const totalBookings = packages.reduce(
    (sum, p) => sum + p.availability.reduce((s, a) => s + a.booked_slots, 0),
    0
  );
  const totalAvailableSlots = packages.reduce(
    (sum, p) => sum + p.availability.reduce((s, a) => s + a.available_slots, 0),
    0
  );
  const activePackages = packages.filter((p) => p.is_active).length;

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-10 w-48 mb-2" />
            <Skeleton className="h-4 w-64 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-xl" />
              ))}
            </div>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Agent Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your tour packages and availability
              </p>
            </div>
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Package
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create Tour Package</DialogTitle>
                  <DialogDescription>
                    Add a new tour package to your catalog
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label>Package Title *</Label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g., Bali Cultural Adventure"
                        className="mt-1.5"
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <Label>Description</Label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe your tour package..."
                        className="mt-1.5"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>Location *</Label>
                      <Select
                        value={formData.location_id}
                        onValueChange={(v) => setFormData((prev) => ({ ...prev, location_id: v }))}
                      >
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((loc) => (
                            <SelectItem key={loc.id} value={loc.id}>
                              {loc.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Price per Person (IDR)</Label>
                      <Input
                        type="number"
                        value={formData.price_per_person}
                        onChange={(e) => setFormData((prev) => ({ ...prev, price_per_person: parseInt(e.target.value) || 0 }))}
                        className="mt-1.5"
                      />
                    </div>

                    <div>
                      <Label>Min Days</Label>
                      <Input
                        type="number"
                        min="1"
                        value={formData.min_days}
                        onChange={(e) => setFormData((prev) => ({ ...prev, min_days: parseInt(e.target.value) || 1 }))}
                        className="mt-1.5"
                      />
                    </div>

                    <div>
                      <Label>Max Days</Label>
                      <Input
                        type="number"
                        min="1"
                        value={formData.max_days}
                        onChange={(e) => setFormData((prev) => ({ ...prev, max_days: parseInt(e.target.value) || 1 }))}
                        className="mt-1.5"
                      />
                    </div>

                    <div>
                      <Label>Max Capacity</Label>
                      <Input
                        type="number"
                        min="1"
                        value={formData.max_capacity}
                        onChange={(e) => setFormData((prev) => ({ ...prev, max_capacity: parseInt(e.target.value) || 1 }))}
                        className="mt-1.5"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label>Includes Transport</Label>
                      <Switch
                        checked={formData.includes_transport}
                        onCheckedChange={(v) => setFormData((prev) => ({ ...prev, includes_transport: v }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label>Includes Accommodation</Label>
                      <Switch
                        checked={formData.includes_accommodation}
                        onCheckedChange={(v) => setFormData((prev) => ({ ...prev, includes_accommodation: v }))}
                      />
                    </div>
                  </div>

                  {/* Destinations */}
                  <div>
                    <Label>Destinations</Label>
                    <div className="flex gap-2 mt-1.5">
                      <Input
                        value={destinationInput}
                        onChange={(e) => setDestinationInput(e.target.value)}
                        placeholder="Add a destination"
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addDestination())}
                      />
                      <Button type="button" variant="outline" onClick={addDestination}>
                        Add
                      </Button>
                    </div>
                    {formData.destinations.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.destinations.map((dest, i) => (
                          <Badge key={i} variant="secondary" className="gap-1">
                            {i + 1}. {dest.name}
                            <button
                              onClick={() => removeDestination(i)}
                              className="ml-1 hover:text-destructive"
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreatePackage} disabled={isCreating}>
                    {isCreating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Create Package'
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                    <p className="text-2xl font-bold">{packages.length}</p>
                    <p className="text-xs text-muted-foreground">Total Packages</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{activePackages}</p>
                    <p className="text-xs text-muted-foreground">Active Packages</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalBookings}</p>
                    <p className="text-xs text-muted-foreground">Total Bookings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/30 flex items-center justify-center">
                    <Users className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalAvailableSlots}</p>
                    <p className="text-xs text-muted-foreground">Available Slots</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Package List */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Packages ({packages.length})</TabsTrigger>
              <TabsTrigger value="active">Active ({activePackages})</TabsTrigger>
              <TabsTrigger value="inactive">Inactive ({packages.length - activePackages})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <PackageList
                packages={packages}
                onDeactivate={handleDeactivatePackage}
                onAddAvailability={(id) => {
                  setSelectedPackageId(id);
                  setAvailabilityDialogOpen(true);
                }}
                formatPrice={formatPrice}
              />
            </TabsContent>
            <TabsContent value="active">
              <PackageList
                packages={packages.filter((p) => p.is_active)}
                onDeactivate={handleDeactivatePackage}
                onAddAvailability={(id) => {
                  setSelectedPackageId(id);
                  setAvailabilityDialogOpen(true);
                }}
                formatPrice={formatPrice}
              />
            </TabsContent>
            <TabsContent value="inactive">
              <PackageList
                packages={packages.filter((p) => !p.is_active)}
                onDeactivate={handleDeactivatePackage}
                onAddAvailability={(id) => {
                  setSelectedPackageId(id);
                  setAvailabilityDialogOpen(true);
                }}
                formatPrice={formatPrice}
              />
            </TabsContent>
          </Tabs>

          {/* Add Availability Dialog */}
          <Dialog open={availabilityDialogOpen} onOpenChange={setAvailabilityDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Availability</DialogTitle>
                <DialogDescription>
                  Add new available dates for your tour package
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={availabilityData.start_date}
                    onChange={(e) => setAvailabilityData((prev) => ({ ...prev, start_date: e.target.value }))}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={availabilityData.end_date}
                    onChange={(e) => setAvailabilityData((prev) => ({ ...prev, end_date: e.target.value }))}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label>Max Capacity</Label>
                  <Input
                    type="number"
                    min="1"
                    value={availabilityData.max_capacity}
                    onChange={(e) => setAvailabilityData((prev) => ({ ...prev, max_capacity: parseInt(e.target.value) || 1 }))}
                    className="mt-1.5"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setAvailabilityDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAvailability} disabled={isAddingAvailability}>
                  {isAddingAvailability ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    'Add Availability'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
}

interface PackageListProps {
  packages: TourPackage[];
  onDeactivate: (id: string) => void;
  onAddAvailability: (id: string) => void;
  formatPrice: (price: number) => string;
}

function PackageList({ packages, onDeactivate, onAddAvailability, formatPrice }: PackageListProps) {
  if (packages.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
          <h3 className="text-lg font-semibold mb-2">No packages found</h3>
          <p className="text-muted-foreground">Create your first tour package to get started!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {packages.map((pkg) => (
        <Card key={pkg.id} className={`overflow-hidden ${!pkg.is_active ? 'opacity-60' : ''}`}>
          <div className="flex flex-col lg:flex-row">
            {/* Image */}
            <div className="lg:w-56 h-48 lg:h-auto flex-shrink-0">
              <img
                src={pkg.thumbnail_url || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'}
                alt={pkg.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 p-4 lg:p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={pkg.is_active ? 'default' : 'secondary'}>
                      {pkg.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                    {pkg.includes_transport && pkg.includes_accommodation && (
                      <Badge variant="outline" className="text-primary border-primary">
                        All Inclusive
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">{pkg.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {pkg.location?.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {pkg.min_days}-{pkg.max_days} days
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      Max {pkg.max_capacity}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="font-medium">{pkg.rating || 0}</span>
                    <span className="text-muted-foreground">({pkg.total_reviews || 0} reviews)</span>
                  </div>

                  {/* Availability summary */}
                  {pkg.availability && pkg.availability.length > 0 && (
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-2">Upcoming Availability</p>
                      <div className="space-y-1">
                        {pkg.availability.slice(0, 2).map((avail) => (
                          <div key={avail.id} className="flex items-center justify-between text-sm">
                            <span>
                              {format(new Date(avail.start_date), 'MMM d')} -{' '}
                              {format(new Date(avail.end_date), 'MMM d')}
                            </span>
                            <span className="text-muted-foreground">
                              {avail.booked_slots}/{avail.max_capacity} booked
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2">
                  <p className="text-2xl font-bold text-primary">{formatPrice(pkg.price_per_person)}</p>
                  <p className="text-xs text-muted-foreground">per person</p>
                  
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" onClick={() => onAddAvailability(pkg.id)}>
                      <Calendar className="h-4 w-4 mr-1" />
                      Add Dates
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          {pkg.is_active ? (
                            <>
                              <EyeOff className="h-4 w-4 mr-1" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <Eye className="h-4 w-4 mr-1" />
                              Activate
                            </>
                          )}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {pkg.is_active ? 'Deactivate Package?' : 'Activate Package?'}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            {pkg.is_active
                              ? 'This package will no longer be visible to customers. You can reactivate it later.'
                              : 'This package will become visible to customers again.'}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => onDeactivate(pkg.id)}>
                            {pkg.is_active ? 'Deactivate' : 'Activate'}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
