import { useState, useEffect, useRef, useMemo, useCallback, memo, lazy, Suspense } from 'react';
import { Calendar, MapPin, Users, ChevronDown, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';


interface Event {
  id: string;
  name: string;
  description: string;
  event_type: string;
  date: string;
  end_date: string | null;
  venue: string;
  max_participants: number | null;
  mode: string | null;
  team_size: number | null;
  banner_url: string | null;
  display_image_url: string | null;
  timezone: string;
  registrations?: { count: number }[];
}

// Timezone offset mapping (in hours)
const timezoneOffsets: Record<string, number> = {
  'Asia/Kolkata': 5.5,
  'America/New_York': -5,
  'America/Chicago': -6,
  'America/Denver': -7,
  'America/Los_Angeles': -8,
  'Europe/London': 0,
  'Europe/Paris': 1,
  'Europe/Berlin': 1,
  'Asia/Dubai': 4,
  'Asia/Singapore': 8,
  'Asia/Tokyo': 9,
  'Australia/Sydney': 10,
  'Pacific/Auckland': 12,
};

// Helper function to get current time in a specific timezone
const getCurrentTimeInTimezone = (timezone: string): Date => {
  const now = new Date();
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
  const offset = timezoneOffsets[timezone] || 0;
  return new Date(utcTime + (offset * 3600000));
};

const eventTypeColors = {
  webinar: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  hackathon: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
  meetup: 'bg-green-100 text-green-800 hover:bg-green-200',
  contest: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
  bootcamp: 'bg-pink-100 text-pink-800 hover:bg-pink-200',
};

export default function Events() {
  const [selectedType, setSelectedType] = useState('all');
  const [timeView, setTimeView] = useState<'live-upcoming' | 'past'>('live-upcoming');
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch events with React Query for better caching
  const { data: events = [], isLoading: eventsLoading, error: eventsError } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const startTime = performance.now();
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;
      
      // Fetch approved registration counts separately for each event
      const eventsWithCounts = await Promise.all((data || []).map(async (event) => {
        const { count } = await supabase
          .from('registrations')
          .select('*', { count: 'exact', head: true })
          .eq('event_id', event.id)
          .eq('status', 'approved');
        
        return {
          ...event,
          registrations: [{ count: count || 0 }]
        };
      }));
      
      const endTime = performance.now();
      console.log(`Events fetch took ${endTime - startTime} milliseconds`);
      return eventsWithCounts;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Fetch user registrations with React Query
  const { data: registrations = [], isLoading: registrationsLoading } = useQuery({
    queryKey: ['registrations', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('registrations')
        .select('event_id')
        .eq('user_id', user.id);

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });

  const registeredEvents = useMemo(() =>
    new Set(registrations.map(r => r.event_id)),
    [registrations]
  );

  const loading = eventsLoading || (user && registrationsLoading);
  const queryClient = useQueryClient();

  // Show error if events failed to load
  useEffect(() => {
    if (eventsError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch events",
      });
    }
  }, [eventsError, toast]);

  // Mutation for registering to events
  const registerMutation = useMutation({
    mutationFn: async (eventId: string) => {
      if (!user) throw new Error('User not authenticated');

      // Check if user has completed their profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('profile_completed')
        .eq('id', user.id)
        .single();

      if (!profile?.profile_completed) {
        throw new Error('PROFILE_INCOMPLETE');
      }

      const { error } = await supabase
        .from('registrations')
        .insert([{ user_id: user.id, event_id: eventId }]);

      if (error) throw error;
      return eventId;
    },
    onSuccess: (eventId) => {
      // Invalidate and refetch registrations
      queryClient.invalidateQueries({ queryKey: ['registrations', user?.id] });
      toast({
        title: "Success!",
        description: "You have been registered for the event",
      });
    },
    onError: (error: any) => {
      if (error.message === 'PROFILE_INCOMPLETE') {
        toast({
          variant: "destructive",
          title: "Profile Incomplete",
          description: "Please complete your profile before registering for events",
        });
        navigate('/dashboard#profile');
      } else if (error.code === '23505') {
        toast({
          variant: "destructive",
          title: "Already registered",
          description: "You are already registered for this event",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: error.message,
        });
      }
    },
  });

  const handleRegister = (eventId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    registerMutation.mutate(eventId);
  };

  // Categorize events by time
  const categorizedEvents = useMemo(() => {
    const live: Event[] = [];
    const upcoming: Event[] = [];
    const past: Event[] = [];

    events.forEach(event => {
      // Get current time in the event's timezone
      const now = getCurrentTimeInTimezone(event.timezone || 'Asia/Kolkata');
      
      // Parse event dates (these are stored in the event's timezone)
      const startDate = new Date(event.date);
      const endDate = event.end_date ? new Date(event.end_date) : startDate;

      if (endDate < now) {
        past.push(event);
      } else if (startDate <= now && endDate >= now) {
        live.push(event);
      } else {
        upcoming.push(event);
      }
    });

    return { live, upcoming, past };
  }, [events]);

  const filterEvents = useMemo(() => {
    return (eventsList: Event[], type?: string) => {
      if (!type || type === 'all') {
        return eventsList;
      }
      return eventsList.filter(event => event.event_type === type);
    };
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    
    // Extract time directly from UTC to avoid timezone conversion
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    
    return `${date.toLocaleDateString('en-US', dateOptions)}, ${displayHours}:${displayMinutes} ${period}`;
  };

  const getRegistrationCount = (event: Event): number => {
    // Handle different possible response formats from Supabase
    if (Array.isArray(event.registrations)) {
      // If registrations is an array of objects with count property
      const countObj = event.registrations[0] as { count: number };
      return countObj?.count || 0;
    }
    return 0;
  };

  const handleShare = async (event: Event) => {
    const eventUrl = `${window.location.origin}/events/${event.id}`;
    const shareData = {
      title: event.name,
      text: `Check out this ${event.event_type}: ${event.name}`,
      url: eventUrl
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // User cancelled sharing or error occurred
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(eventUrl);
        toast({
          title: "Link copied!",
          description: "Event link has been copied to clipboard",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to copy link",
        });
      }
    }
  };

  const EventCard = memo(({ event }: { event: Event }) => {
    const isRegistered = registeredEvents.has(event.id);

    return (
      <Card className="h-full flex flex-col rounded-xl shadow-medium card-subtle-hover card-subtle-hover-light dark:card-subtle-hover-dark">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge
              variant="secondary"
              className={`${eventTypeColors[event.event_type as keyof typeof eventTypeColors]}`}
            >
              {event.event_type.charAt(0).toUpperCase() + event.event_type.slice(1)}
            </Badge>
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                handleShare(event);
              }}
              className="p-2 h-8 w-8"
            >
              <Share2 className="h-3 w-3" />
            </Button>
          </div>
          <CardTitle className="text-lg line-clamp-2 font-heading">{event.name}</CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-between">
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              {formatDate(event.date)}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              {event.venue}
            </div>
            {event.max_participants && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="mr-2 h-4 w-4" />
                {event.event_type === 'meetup'
                  ? `${event.max_participants - getRegistrationCount(event)} slots left`
                  : `Max ${event.max_participants} participants`
                }
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Button
              onClick={() => navigate(`/events/${event.id}`)}
              className={`w-full transition-colors button-hover button-hover-light dark:button-hover-dark ${isRegistered ? 'bg-green-500 hover:bg-green-600' : 'bg-primary hover:bg-primary/90'}`}
            >
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  });

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading events...</div>
      </div>
    );
  }

  const currentEvents = timeView === 'live-upcoming' 
    ? [...categorizedEvents.live, ...categorizedEvents.upcoming]
    : categorizedEvents.past;

  const filteredEvents = filterEvents(currentEvents, selectedType === 'all' ? undefined : selectedType);

  return (
    <div className="container mx-auto py-4 sm:py-8 px-4 sm:px-6">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 font-heading">Events</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Discover and register for exciting tech events
        </p>
      </div>

      {/* Time View Tabs */}
      <Tabs value={timeView} onValueChange={(v) => setTimeView(v as 'live-upcoming' | 'past')} className="w-full mb-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="live-upcoming">
            Live & Upcoming ({categorizedEvents.live.length + categorizedEvents.upcoming.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past Events ({categorizedEvents.past.length})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Mobile Dropdown for Event Type */}
      <div className="md:hidden mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {selectedType === 'all' ? 'All Events' : selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            <DropdownMenuItem onClick={() => setSelectedType('all')}>
              All Events
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedType('webinar')}>
              Webinars
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedType('hackathon')}>
              Hackathons
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedType('meetup')}>
              Meetups
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedType('contest')}>
              Contests
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedType('bootcamp')}>
              Bootcamps
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop Tabs for Event Type */}
      <div className="hidden md:block">
        <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedType}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="webinar">Webinars</TabsTrigger>
            <TabsTrigger value="hackathon">Hackathons</TabsTrigger>
            <TabsTrigger value="meetup">Meetups</TabsTrigger>
            <TabsTrigger value="contest">Contests</TabsTrigger>
            <TabsTrigger value="bootcamp">Bootcamps</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Live Events Section (only show in live-upcoming view) */}
      {timeView === 'live-upcoming' && categorizedEvents.live.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4 text-red-500 flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            Live Now
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterEvents(categorizedEvents.live, selectedType === 'all' ? undefined : selectedType).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Events Section (only show in live-upcoming view if there are live events) */}
      {timeView === 'live-upcoming' && categorizedEvents.upcoming.length > 0 && categorizedEvents.live.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterEvents(categorizedEvents.upcoming, selectedType === 'all' ? undefined : selectedType).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {/* Combined view when no live events or in past events view */}
      {(timeView === 'past' || (timeView === 'live-upcoming' && categorizedEvents.live.length === 0)) && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {/* No events message */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No events found in this category
        </div>
      )}
    </div>
  );
}
