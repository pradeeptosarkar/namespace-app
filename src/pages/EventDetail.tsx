import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowLeft, Clock, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { EmailService } from '@/services/emailService';
import LeaderboardModal from '@/components/LeaderboardModal';

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
  created_at: string;
  approval_enabled: boolean | null;
  timezone: string;
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

export default function EventDetail() {
  const { eventId } = useParams<{ eventId: string }>();
  const [searchParams] = useSearchParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState<'pending' | 'approved' | null>(null);
  const [registrationCount, setRegistrationCount] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Extract utm_source from URL query params
  const utmSource = searchParams.get('utm_source');

  useEffect(() => {
    if (eventId) {
      fetchEvent();
      if (user) {
        checkRegistration();
      }
    }

    // Store UTM parameters for anonymous users
    if (!user && utmSource) {
      const currentUrl = window.location.href;
      localStorage.setItem('authRedirectUrl', currentUrl);
    }
  }, [eventId, user, utmSource]);

  // Fetch registration counts after event data is loaded
  useEffect(() => {
    if (event) {
      fetchRegistrationCount();
    }
  }, [event]);

  const fetchEvent = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single();

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch event details",
      });
      navigate('/events');
    } else {
      setEvent(data);
    }
    setLoading(false);
  };

  const checkRegistration = async () => {
    if (!user || !eventId) return;

    const { data } = await supabase
      .from('registrations')
      .select('id, status')
      .eq('user_id', user.id)
      .eq('event_id', eventId)
      .single();

    if (data) {
      setIsRegistered(true);
      setRegistrationStatus(data.status as 'pending' | 'approved');
    }
  };

  const fetchRegistrationCount = async () => {
    if (!eventId) return;

    // Fetch approved registrations
    const { count } = await supabase
      .from('registrations')
      .select('*', { count: 'exact', head: true })
      .eq('event_id', eventId)
      .eq('status', 'approved');

    setRegistrationCount(count || 0);

    // Fetch total applications count for approval-enabled events
    if (event?.approval_enabled) {
      const { count: totalCount } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true })
        .eq('event_id', eventId);

      setApplicationsCount(totalCount || 0);
    }
  };

  const handleRegister = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    // Check if user has completed their profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('profile_completed')
      .eq('id', user.id)
      .single();

    if (!profile?.profile_completed) {
      toast({
        variant: "destructive",
        title: "Profile Incomplete",
        description: "Please complete your profile before registering for events",
      });
      // Store current event URL for redirect after profile completion
      const currentUrl = window.location.href;
      localStorage.setItem('profileRedirectUrl', currentUrl);
      navigate('/dashboard#profile');
      return;
    }
    
    const registrationData: any = { 
      user_id: user.id, 
      event_id: eventId
    };
    // Include utm_source if present and it's not the same user (prevent self-referrals)
    if (utmSource && utmSource !== user.id) {
      registrationData.utm_source = utmSource;
    }

    const { error } = await supabase
      .from('registrations')
      .insert([registrationData]);

    if (error) {
      if (error.code === '23505') {
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
    } else {
      const newStatus = event?.approval_enabled ? 'pending' : 'approved';
      setRegistrationStatus(newStatus);
      
      toast({
        title: "Success!",
        description: event?.approval_enabled 
          ? "Your registration request has been submitted. You will receive an email once reviewed."
          : "You have been registered for the event",
      });
      setIsRegistered(true);
      setRegistrationCount(prev => prev + 1);
      
      // Send appropriate email
      if (event?.approval_enabled) {
        sendPendingEmail();
      } else {
        sendConfirmationEmail();
      }
    }
  };

  const handleUnregister = async () => {
    if (!user || !eventId) return;

    const { error } = await supabase
      .from('registrations')
      .delete()
      .eq('user_id', user.id)
      .eq('event_id', eventId);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to unregister from event",
      });
    } else {
      toast({
        title: "Success!",
        description: "You have been unregistered from the event",
      });
      setIsRegistered(false);
      setRegistrationStatus(null);
      setRegistrationCount(prev => Math.max(0, prev - 1));
    }
  };

  const sendPendingEmail = async () => {
    if (!user || !event) return;
    
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();
      
      const emailTemplate = EmailService.generateEventEmailTemplate({
        eventName: event.name,
        applicantName: profile?.full_name || 'Participant',
        message: `Thank you for your interest in ${event.name}. We have received your registration request and will review your profile. You will hear back from us shortly.`,
        eventDate: formatDate(event.date),
        eventVenue: event.venue,
        subject: `Registration Request Received: ${event.name}`
      });
      
      await EmailService.sendEmail({
        to: user.email || '',
        subject: `Registration Request Received: ${event.name}`,
        html: emailTemplate
      });
      
    } catch (error) {
      console.error('Failed to send pending email:', error);
    }
  };

  const formatDate = (dateString: string) => {
    // Parse the date string and format it without timezone conversion
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    // Extract time directly from the ISO string to avoid timezone conversion
    const date = new Date(dateString);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    
    // Format to 12-hour time
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    
    return `${displayHours}:${displayMinutes} ${period}`;
  };

  const sendConfirmationEmail = async () => {
    if (!user || !event) return;
    
    try {
      console.log('Attempting to send confirmation email...');
      
      // Get user profile for name
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();
      
      console.log('User profile retrieved:', profile);
      
      const emailTemplate = EmailService.generateEventEmailTemplate({
        eventName: event.name,
        applicantName: profile?.full_name || 'Participant',
        message: `Thank you for registering for ${event.name}! We're excited to have you join us.`,
        eventDate: formatDate(event.date),
        eventVenue: event.venue,
        subject: `Registration Confirmed: ${event.name}`
      });
      
      console.log('Email template generated, sending email...');
      
      const result = await EmailService.sendEmail({
        to: user.email || '',
        subject: `Registration Confirmed: ${event.name}`,
        html: emailTemplate
      });
      
      console.log('Email sent successfully:', result);
      
      toast({
        title: "Email Sent",
        description: "Confirmation email has been sent to your email address",
      });
      
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
      toast({
        variant: "destructive",
        title: "Email Error",
        description: "Failed to send confirmation email. Please check your email settings.",
      });
    }
  };

  const handleShare = async () => {
    if (!event) return;
    
    const eventUrl = window.location.href;
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

  const customUtmLink = user && event ? `${window.location.origin}/events/${event.id}?utm_source=${user.id}` : '';

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading event details...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Event not found</div>
      </div>
    );
  }

  // Check if event has ended
  const now = getCurrentTimeInTimezone(event.timezone || 'Asia/Kolkata');
  const eventEndDate = event.end_date ? new Date(event.end_date) : new Date(event.date);
  const hasEnded = eventEndDate < now;

  return (
    <div className="container mx-auto py-4 sm:py-8 px-4 sm:px-6">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/events')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Event Banner - 3:1 aspect ratio */}
          <div className="mb-6 w-full aspect-[3/1] overflow-hidden rounded-lg shadow-md">
            <img
              src={event.banner_url || '/placeholder.svg'}
              alt={event.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
          </div>

          {/* Event Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Badge 
                  variant="secondary" 
                  className={eventTypeColors[event.event_type as keyof typeof eventTypeColors]}
                >
                  {event.event_type.charAt(0).toUpperCase() + event.event_type.slice(1)}
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share Event
              </Button>
            </div>
            <h1 className="text-3xl font-bold mb-4 font-heading">{event.name}</h1>
          </div>

          {/* Event Description */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>About This Event</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="text-muted-foreground leading-relaxed prose prose-slate prose-sm max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:text-muted-foreground"
                dangerouslySetInnerHTML={{
                  __html: event.description || 'No description available for this event.'
                }}
              />
            </CardContent>
          </Card>

          {/* Custom UTM Link for Registered Users */}
          {isRegistered && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Your Custom UTM Link</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  Share this link to invite others to this event. Your referrals will be tracked.
                </p>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    readOnly
                    value={customUtmLink}
                    className="flex-grow rounded border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    onFocus={(e) => e.currentTarget.select()}
                  />
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(customUtmLink);
                      toast({
                        title: "Copied!",
                        description: "Your custom UTM link has been copied to clipboard.",
                      });
                    }}
                    className="bg-primary hover:bg-primary/90 transition-colors button-hover button-hover-light dark:button-hover-dark"
                    style={{backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)'}}
                  >
                    Copy
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Registration Card */}
          <Card>
            <CardHeader>
              <CardTitle>Registration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {hasEnded ? (
                <Button 
                  disabled
                  className="w-full"
                  variant="secondary"
                >
                  Event Ended
                </Button>
              ) : isRegistered ? (
                <div className="space-y-3">
                  {registrationStatus === 'pending' ? (
                    <div className="text-sm text-muted-foreground bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                      ⏳ Request Sent - Pending Approval
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground bg-green-50 p-3 rounded-lg border border-green-200">
                      ✓ Registered
                    </div>
                  )}
                  <Button 
                    variant="outline" 
                    onClick={handleUnregister}
                    className="w-full"
                  >
                    Unregister
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleRegister}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {user ? 'Register Now' : 'Sign in to Register'}
                </Button>
              )}
              
              <div className="text-sm text-muted-foreground">
                {event.approval_enabled ? (
                  <>
                    {applicationsCount} {applicationsCount === 1 ? 'application' : 'applications'} received
                    {event.max_participants && (
                      <span> • {event.max_participants - applicationsCount} spots remaining</span>
                    )}
                  </>
                ) : (
                  <>
                    {registrationCount} {registrationCount === 1 ? 'person registered' : 'people registered'}
                    {event.max_participants && (
                      <span> • {event.max_participants - registrationCount} spots remaining</span>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Event Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium">Start Date & Time</div>
                  <div className="text-sm text-muted-foreground">{formatDate(event.date)}</div>
                  <div className="text-sm text-muted-foreground">{formatTime(event.date)}</div>
                </div>
              </div>
              
              {event.end_date && (
                <>
                  <Separator />
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium">End Date & Time</div>
                      <div className="text-sm text-muted-foreground">{formatDate(event.end_date)}</div>
                      <div className="text-sm text-muted-foreground">{formatTime(event.end_date)}</div>
                    </div>
                  </div>
                </>
              )}
              
              <Separator />
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="font-medium">Venue</div>
                  <div className="text-sm text-muted-foreground">{event.venue}</div>
                </div>
              </div>
              
              {event.max_participants && (
                <>
                  <Separator />
                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Capacity</div>
                      <div className="text-sm text-muted-foreground">
                        Maximum {event.max_participants} participants
                      </div>
                    </div>
                  </div>
                </>
              )}

              {event.event_type === 'hackathon' && event.mode && (
                <>
                  <Separator />
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Mode</div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {event.mode}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {event.event_type === 'hackathon' && event.team_size && (
                <>
                  <Separator />
                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">Team Size</div>
                      <div className="text-sm text-muted-foreground">
                        {event.team_size} members per team
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Leaderboard Button */}
              <Separator />
              <Button
                variant="outline"
                onClick={() => setLeaderboardOpen(true)}
                className="w-full"
              >
                View Leaderboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <LeaderboardModal
        isOpen={leaderboardOpen}
        onClose={() => setLeaderboardOpen(false)}
        eventId={event?.id || ''}
        eventName={event?.name || ''}
      />
    </div>
  );
}
