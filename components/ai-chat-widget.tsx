'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, X, Bot, User, Loader2, MapPin, Star } from 'lucide-react';
import type { AIChatMessage, TourPackage } from '@/lib/types';
import api from '@/lib/api';
import Link from 'next/link';

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Filter states
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [days, setDays] = useState('');
  const [travelStyle, setTravelStyle] = useState('');

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !location) return;

    const userMessage: AIChatMessage = {
      role: 'user',
      content: inputMessage || `Looking for tours in ${location}`,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await api.sendAIChat({
        message: inputMessage || `Looking for tours in ${location}`,
        location: location || undefined,
        budget: budget ? parseInt(budget) : undefined,
        days: days ? parseInt(days) : undefined,
        travel_style: travelStyle || undefined,
      });

      setMessages((prev) => [...prev, response]);
    } catch (error) {
      console.error('AI Chat error:', error);
      // Mock response for demo
      const mockResponse: AIChatMessage = {
        role: 'assistant',
        content: `Based on your preferences${location ? ` for ${location}` : ''}${budget ? ` with budget ${formatPrice(parseInt(budget))}` : ''}${days ? ` for ${days} days` : ''}, here are some recommended tour packages that might interest you!`,
        recommended_tours: [
          {
            id: '1',
            title: 'Bali Paradise Adventure',
            description: 'Experience the best of Bali',
            location: { id: '1', name: location || 'Bali', country: 'Indonesia' },
            location_id: '1',
            min_days: 3,
            max_days: 5,
            price_per_person: 2500000,
            max_capacity: 10,
            includes_transport: true,
            includes_accommodation: true,
            destinations: [],
            availability: [],
            agent: { id: '1', user_id: '1', name: 'Bali Tours', location: { id: '1', name: 'Bali', country: 'Indonesia' }, location_id: '1', rating: 4.8, total_reviews: 120, is_verified: true, created_at: '' },
            agent_id: '1',
            rating: 4.8,
            total_reviews: 120,
            is_active: true,
            created_at: '',
          },
        ],
      };
      setMessages((prev) => [...prev, mockResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[450px] h-[600px] flex flex-col p-0 gap-0">
          <DialogHeader className="px-4 py-3 border-b flex-shrink-0">
            <DialogTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              AI Travel Assistant
            </DialogTitle>
          </DialogHeader>

          {/* Filters Section */}
          {messages.length === 0 && (
            <div className="px-4 py-3 border-b bg-muted/50 flex-shrink-0">
              <p className="text-sm text-muted-foreground mb-3">
                Tell me about your travel preferences:
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Location</Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Where?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bali">Bali</SelectItem>
                      <SelectItem value="Yogyakarta">Yogyakarta</SelectItem>
                      <SelectItem value="Lombok">Lombok</SelectItem>
                      <SelectItem value="Raja Ampat">Raja Ampat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Budget (IDR)</Label>
                  <Input
                    type="number"
                    placeholder="5000000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="h-9"
                  />
                </div>
                <div>
                  <Label className="text-xs">Days</Label>
                  <Input
                    type="number"
                    placeholder="3"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className="h-9"
                  />
                </div>
                <div>
                  <Label className="text-xs">Style</Label>
                  <Select value={travelStyle} onValueChange={setTravelStyle}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adventure">Adventure</SelectItem>
                      <SelectItem value="relaxation">Relaxation</SelectItem>
                      <SelectItem value="cultural">Cultural</SelectItem>
                      <SelectItem value="nature">Nature</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full px-4 py-3" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    <Bot className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">
                      {"Hi! I'm your AI travel assistant. Ask me anything about tours in Indonesia!"}
                    </p>
                  </div>
                )}
                
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      
                      {/* Recommended Tours */}
                      {msg.recommended_tours && msg.recommended_tours.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {msg.recommended_tours.map((tour) => (
                            <Link key={tour.id} href={`/tours/${tour.id}`} onClick={() => setIsOpen(false)}>
                              <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
                                <CardContent className="p-3">
                                  <h4 className="font-medium text-sm text-foreground">{tour.title}</h4>
                                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                    <MapPin className="h-3 w-3" />
                                    {tour.location?.name}
                                    <Star className="h-3 w-3 fill-accent text-accent ml-2" />
                                    {tour.rating}
                                  </div>
                                  <p className="text-sm font-semibold text-primary mt-1">
                                    {formatPrice(tour.price_per_person)}/person
                                  </p>
                                </CardContent>
                              </Card>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                    {msg.role === 'user' && (
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-muted rounded-lg px-3 py-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                )}
                
                {/* Invisible element for scrolling to bottom */}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </div>

          {/* Input Area */}
          <div className="px-4 py-3 border-t flex-shrink-0">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about tours..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon" disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}