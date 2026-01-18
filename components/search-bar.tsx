'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarIcon, Search, MapPin, Users, Clock, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { mockLocations } from '@/lib/mock-data';

interface SearchBarProps {
  variant?: 'hero' | 'compact';
  onSearch?: (filters: SearchFilters) => void;
  initialFromLocation?: string;
  initialToLocation?: string;
  initialPeople?: string;
}

interface SearchFilters {
  from_location?: string;
  to_location?: string;
  start_date?: string;
  end_date?: string;
  total_people?: number;
  max_days?: number;
}

export function SearchBar({ 
  variant = 'hero', 
  onSearch, 
  initialFromLocation = '', 
  initialToLocation = '',
  initialPeople = '2' 
}: SearchBarProps) {
  const router = useRouter();
  
  const locations = mockLocations;
  const [fromLocation, setFromLocation] = useState(initialFromLocation);
  const [toLocation, setToLocation] = useState(initialToLocation);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [totalPeople, setTotalPeople] = useState(initialPeople);
  const [maxDays, setMaxDays] = useState('');

  const handleSearch = () => {
    const filters: SearchFilters = {};
    
    if (fromLocation) filters.from_location = fromLocation;
    if (toLocation) filters.to_location = toLocation;
    if (startDate) filters.start_date = format(startDate, 'yyyy-MM-dd');
    if (endDate) filters.end_date = format(endDate, 'yyyy-MM-dd');
    if (totalPeople) filters.total_people = parseInt(totalPeople);
    if (maxDays) filters.max_days = parseInt(maxDays);

    if (onSearch) {
      onSearch(filters);
    } else {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.append(key, String(value));
        }
      });
      router.push(`/search?${params.toString()}`);
    }
  };

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap items-end gap-3 p-4 bg-white rounded-xl shadow-md border border-gray-100">
        <div className="flex-1 min-w-[140px]">
          <Label className="text-xs font-medium text-gray-600 mb-1.5 block">From</Label>
          <Select value={fromLocation} onValueChange={setFromLocation}>
            <SelectTrigger className="h-10 border-gray-200">
              <SelectValue placeholder="Origin" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc.id} value={loc.name}>
                  {loc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 min-w-[140px]">
          <Label className="text-xs font-medium text-gray-600 mb-1.5 block">To</Label>
          <Select value={toLocation} onValueChange={setToLocation}>
            <SelectTrigger className="h-10 border-gray-200">
              <SelectValue placeholder="Destination" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc.id} value={loc.name}>
                  {loc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 min-w-[100px]">
          <Label className="text-xs font-medium text-gray-600 mb-1.5 block">People</Label>
          <Input
            type="number"
            min="1"
            max="20"
            value={totalPeople}
            onChange={(e) => setTotalPeople(e.target.value)}
            className="h-10 border-gray-200"
          />
        </div>
        <Button onClick={handleSearch} className="h-10 px-6">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* First Row - Locations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
          {/* From Location */}
          <div className="p-5 lg:p-6 hover:bg-gray-50 transition-colors cursor-pointer group">
            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              From
            </Label>
            <Select value={fromLocation} onValueChange={setFromLocation}>
              <SelectTrigger className="h-auto border-0 p-0 hover:border-0 focus:ring-0 text-left shadow-none">
                <SelectValue placeholder={
                  <span className="text-gray-400 text-lg">Select origin city</span>
                }>
                  <span className="text-gray-900 text-lg font-medium">{fromLocation}</span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc.id} value={loc.name} className="text-base py-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {loc.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* To Location */}
          <div className="p-5 lg:p-6 hover:bg-gray-50 transition-colors cursor-pointer group relative">
            <div className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border-2 border-gray-200 rounded-full items-center justify-center z-10 shadow-sm">
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>
            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              To
            </Label>
            <Select value={toLocation} onValueChange={setToLocation}>
              <SelectTrigger className="h-auto border-0 p-0 hover:border-0 focus:ring-0 text-left shadow-none">
                <SelectValue placeholder={
                  <span className="text-gray-400 text-lg">Select destination city</span>
                }>
                  <span className="text-gray-900 text-lg font-medium">{toLocation}</span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc.id} value={loc.name} className="text-base py-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {loc.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="border-t border-gray-200"></div>

        {/* Second Row - Dates, People, Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {/* Start Date */}
          <div className="p-5 lg:p-6 hover:bg-gray-50 transition-colors cursor-pointer">
            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-primary" />
              Check-in
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    'h-auto w-full justify-start text-left font-medium p-0 hover:bg-transparent',
                    !startDate && 'text-gray-400'
                  )}
                >
                  {startDate ? (
                    <div className="flex flex-col">
                      <span className="text-lg text-gray-900">{format(startDate, 'dd MMM yyyy')}</span>
                      <span className="text-xs text-gray-500">{format(startDate, 'EEEE')}</span>
                    </div>
                  ) : (
                    <span className="text-lg">Select date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* End Date */}
          <div className="p-5 lg:p-6 hover:bg-gray-50 transition-colors cursor-pointer">
            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-primary" />
              Check-out
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    'h-auto w-full justify-start text-left font-medium p-0 hover:bg-transparent',
                    !endDate && 'text-gray-400'
                  )}
                >
                  {endDate ? (
                    <div className="flex flex-col">
                      <span className="text-lg text-gray-900">{format(endDate, 'dd MMM yyyy')}</span>
                      <span className="text-xs text-gray-500">{format(endDate, 'EEEE')}</span>
                    </div>
                  ) : (
                    <span className="text-lg">Select date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  disabled={(date) => date < (startDate || new Date())}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* People */}
          <div className="p-5 lg:p-6 hover:bg-gray-50 transition-colors cursor-pointer">
            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Travelers
            </Label>
            <div className="flex items-center gap-3">
              <Input
                type="number"
                min="1"
                max="20"
                placeholder="2"
                value={totalPeople}
                onChange={(e) => setTotalPeople(e.target.value)}
                className="h-auto text-lg font-medium border-0 p-0 w-16 focus-visible:ring-0 shadow-none"
              />
              <span className="text-gray-500 text-sm">{parseInt(totalPeople || '1') === 1 ? 'person' : 'people'}</span>
            </div>
          </div>

          {/* Max Days */}
          <div className="p-5 lg:p-6 hover:bg-gray-50 transition-colors cursor-pointer">
            <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Duration
            </Label>
            <Select value={maxDays} onValueChange={setMaxDays}>
              <SelectTrigger className="h-auto border-0 p-0 hover:border-0 focus:ring-0 shadow-none">
                <SelectValue placeholder={
                  <span className="text-gray-400 text-lg">Any duration</span>
                }>
                  <span className="text-gray-900 text-lg font-medium">
                    {maxDays ? `Up to ${maxDays} days` : ''}
                  </span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3" className="text-base py-3">Up to 3 days</SelectItem>
                <SelectItem value="5" className="text-base py-3">Up to 5 days</SelectItem>
                <SelectItem value="7" className="text-base py-3">Up to 7 days</SelectItem>
                <SelectItem value="14" className="text-base py-3">Up to 14 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search Button */}
        <div className="p-5 lg:p-6 bg-gray-50 border-t border-gray-200">
          <Button 
            onClick={handleSearch} 
            size="lg" 
            className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Search className="h-5 w-5 mr-2" />
            Search Tours
          </Button>
        </div>
      </div>
    </div>
  );
}