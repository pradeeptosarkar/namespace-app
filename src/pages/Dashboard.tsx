import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { Calendar, MapPin, Users, X, TrendingUp, Clock, CheckCircle, Plus, User, Mail, Phone, GraduationCap, Code, Award, Calendar as CalendarIcon, ClockIcon, Github, Linkedin, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Registration {
  id: string;
  registered_at: string;
  event_id: string;
  status: 'pending' | 'approved' | 'rejected';
  events: {
    id: string;
    name: string;
    description: string;
    event_type: string;
    date: string;
    end_date: string | null;
    venue: string;
    max_participants: number;
    timezone: string;
  };
}

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  phone_number: string | null;
  date_of_birth: string | null;
  college: string | null;
  degree: string | null;
  graduation_year: number | null;
  skills: string[] | null;
  github_url: string | null;
  linkedin_url: string | null;
  leetcode_url: string | null;
  profile_completed: boolean;
  created_at: string;
  updated_at: string;
}

const eventTypeColors = {
  webinar: 'bg-blue-100 text-blue-800',
  hackathon: 'bg-purple-100 text-purple-800',
  meetup: 'bg-green-100 text-green-800',
  contest: 'bg-orange-100 text-orange-800',
};

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

export default function Dashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showRedirectDialog, setShowRedirectDialog] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('events');
  const [eventTimeView, setEventTimeView] = useState<'live-upcoming' | 'past'>('live-upcoming');
  const [profileForm, setProfileForm] = useState(() => {
    // Try to restore unsaved form data from localStorage
    const savedFormData = localStorage.getItem('profileFormDraft');
    if (savedFormData) {
      try {
        return JSON.parse(savedFormData);
      } catch {
        return {
          full_name: '',
          phone_number: '',
          date_of_birth: '',
          college: '',
          degree: '',
          graduation_year: '',
          skills: '',
          github_url: '',
          linkedin_url: '',
          leetcode_url: '',
        };
      }
    }
    return {
      full_name: '',
      phone_number: '',
      date_of_birth: '',
      college: '',
      degree: '',
      graduation_year: '',
      skills: '',
      github_url: '',
      linkedin_url: '',
      leetcode_url: '',
    };
  });
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Auto-save form data to localStorage whenever it changes
  useEffect(() => {
    // Only save if there's actual data (not all empty)
    const hasData = Object.values(profileForm).some(value => value !== '');
    if (hasData) {
      localStorage.setItem('profileFormDraft', JSON.stringify(profileForm));
    }
  }, [profileForm]);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchProfile();
    fetchRegistrations();

    // Check if there's a stored redirect URL from event detail
    const storedRedirectUrl = localStorage.getItem('profileRedirectUrl');
    if (storedRedirectUrl) {
      setRedirectUrl(storedRedirectUrl);
    }

    // Scroll to sections based on hash
    const hash = window.location.hash;
    if (hash === '#profile') {
      setActiveTab('profile');
      // Scroll after content loads
      requestAnimationFrame(() => {
        setTimeout(() => {
          const profileSection = document.getElementById('profile-section');
          if (profileSection) {
            profileSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 200);
      });
    } else if (hash === '#myevents') {
      setActiveTab('events');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash;
      if (newHash === '#profile') {
        setActiveTab('profile');
        requestAnimationFrame(() => {
          setTimeout(() => {
            const profileSection = document.getElementById('profile-section');
            if (profileSection) {
              profileSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 200);
        });
      } else if (newHash === '#myevents') {
        setActiveTab('events');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [user, navigate]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      setProfile(null);
    } else {
      setProfile(data);
      // Only initialize form with profile data if there's no draft saved
      const savedFormData = localStorage.getItem('profileFormDraft');
      if (!savedFormData) {
        setProfileForm({
          full_name: data.full_name || '',
          phone_number: data.phone_number || '',
          date_of_birth: data.date_of_birth || '',
          college: data.college || '',
          degree: data.degree || '',
          graduation_year: data.graduation_year?.toString() || '',
          skills: data.skills?.join(', ') || '',
          github_url: data.github_url || '',
          linkedin_url: data.linkedin_url || '',
          leetcode_url: data.leetcode_url || '',
        });
      }
    }
  };

  const fetchRegistrations = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('registrations')
      .select(`
        *,
        events (*)
      `)
      .eq('user_id', user.id)
      .order('registered_at', { ascending: false });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch your registrations",
      });
    } else {
      setRegistrations(data || []);
    }
    setLoading(false);
  };

  const handleUnregister = async (registrationId: string, eventName: string) => {
    const { error } = await supabase
      .from('registrations')
      .delete()
      .eq('id', registrationId);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to unregister from event",
      });
    } else {
      toast({
        title: "Unregistered",
        description: `You have been unregistered from ${eventName}`,
      });
      setRegistrations(prev => prev.filter(reg => reg.id !== registrationId));
    }
  };

  const handleProfileUpdate = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const skills = profileForm.skills ? profileForm.skills.split(',').map(s => s.trim()).filter(s => s) : [];
      
      // Check if profile is completed (all required fields filled including ALL professional links)
      const isProfileCompleted = !!profileForm.full_name && 
        !!profileForm.phone_number && 
        !!profileForm.date_of_birth && 
        !!profileForm.college && 
        !!profileForm.degree && 
        !!profileForm.graduation_year && 
        skills.length > 0 && 
        !!profileForm.github_url && 
        !!profileForm.linkedin_url && 
        !!profileForm.leetcode_url;

      const updatedProfile = {
        full_name: profileForm.full_name || null,
        phone_number: profileForm.phone_number || null,
        date_of_birth: profileForm.date_of_birth || null,
        college: profileForm.college || null,
        degree: profileForm.degree || null,
        graduation_year: profileForm.graduation_year ? parseInt(profileForm.graduation_year) : null,
        skills: skills.length > 0 ? skills : null,
        github_url: profileForm.github_url || null,
        linkedin_url: profileForm.linkedin_url || null,
        leetcode_url: profileForm.leetcode_url || null,
        profile_completed: isProfileCompleted,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .update(updatedProfile)
        .eq('id', user.id);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update profile",
        });
      } else {
        // Clear the saved draft from localStorage after successful save
        localStorage.removeItem('profileFormDraft');
        
        toast({
          title: "Success",
          description: isProfileCompleted ? "Profile completed successfully!" : "Profile updated successfully",
        });
        fetchProfile(); // Refresh profile data
        
        // Show redirect dialog if profile was just completed and there's a redirect URL
        if (isProfileCompleted && redirectUrl) {
          setShowRedirectDialog(true);
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleRedirectToEvent = () => {
    if (redirectUrl) {
      // Clear the stored URL
      localStorage.removeItem('profileRedirectUrl');
      // Navigate to the event
      window.location.href = redirectUrl;
    }
    setShowRedirectDialog(false);
  };

  const handleCloseDialog = () => {
    // Clear the stored URL when dialog is closed without redirecting
    localStorage.removeItem('profileRedirectUrl');
    setShowRedirectDialog(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading your dashboard...</div>
      </div>
    );
  }

  // Calculate stats and categorize events
  const liveEvents = registrations.filter(reg => {
    const now = getCurrentTimeInTimezone(reg.events.timezone || 'Asia/Kolkata');
    const eventDate = new Date(reg.events.date);
    const eventEndDate = reg.events.end_date ? new Date(reg.events.end_date) : eventDate;
    return eventDate <= now && eventEndDate >= now;
  });

  const upcomingEvents = registrations.filter(reg => {
    const now = getCurrentTimeInTimezone(reg.events.timezone || 'Asia/Kolkata');
    return new Date(reg.events.date) > now;
  });

  const pastEvents = registrations.filter(reg => {
    const now = getCurrentTimeInTimezone(reg.events.timezone || 'Asia/Kolkata');
    const eventDate = new Date(reg.events.date);
    const eventEndDate = reg.events.end_date ? new Date(reg.events.end_date) : eventDate;
    return eventEndDate < now;
  });

  const totalEvents = registrations.length;
  const liveCount = liveEvents.length;
  const upcomingCount = upcomingEvents.length;
  const pastCount = pastEvents.length;

  // Combine live and upcoming for the view
  const liveAndUpcomingEvents = [...liveEvents, ...upcomingEvents];
  const liveAndUpcomingCount = liveCount + upcomingCount;

  return (
    <div className="min-h-screen">
      {/* Header Section - Desktop Only */}
      <div className="border-b hidden lg:block">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Welcome back!</h1>
              <p className="text-muted-foreground text-base sm:text-lg">
                Here's what's happening with your events
              </p>
            </div>
            <Button onClick={() => navigate('/events')} className="gap-2 w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              Browse Events
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Mobile Layout: Dashboard title + Tabs */}
        <div className="lg:hidden">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="events" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Events
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
            </TabsList>

            <TabsContent value="events" className="space-y-6 sm:space-y-8 mt-6">
            {/* Welcome Section - Mobile */}
            <div className="p-6 bg-card rounded-lg border">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Welcome back!</h2>
              <p className="text-muted-foreground text-sm sm:text-base mb-4">
                Here's what's happening with your events
              </p>
              <Button onClick={() => navigate('/events')} className="gap-2 w-full">
                <Plus className="h-4 w-4" />
                Browse Events
              </Button>
            </div>

            {registrations.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <Calendar className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl mb-2">No Registrations Yet</CardTitle>
                    <CardDescription className="text-lg">
                      You haven't registered for any events yet. Explore upcoming events to get started.
                    </CardDescription>
                  </div>
                  <Button onClick={() => navigate('/events')} size="lg" className="mt-4">
                    Browse Events
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Live Events Section */}
                {liveCount > 0 && (
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
                      <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        Live Events
                      </h2>
                      <Badge variant="destructive" className="text-xs sm:text-sm w-fit">
                        {liveCount} event{liveCount !== 1 ? 's' : ''} happening now
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      {liveEvents.map((registration) => (
                <Card key={registration.id} className="relative group hover:shadow-lg transition-shadow border-red-200">
                  <div className="absolute top-2 left-2">
                    <div className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      LIVE
                    </div>
                  </div>

                  <CardHeader className="pt-12">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg line-clamp-2 font-heading">
                        {registration.events.name}
                      </CardTitle>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`w-fit ${eventTypeColors[registration.events.event_type as keyof typeof eventTypeColors]}`}
                    >
                      {registration.events.event_type.charAt(0).toUpperCase() + registration.events.event_type.slice(1)}
                    </Badge>
                  </CardHeader>

                  <CardContent className="flex flex-col justify-between">
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        {formatDate(registration.events.date)}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4" />
                        {registration.events.venue}
                      </div>
                      {registration.events.max_participants && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="mr-2 h-4 w-4" />
                          Max {registration.events.max_participants} participants
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => navigate(`/events/${registration.events.id}`)}
                      className="w-full bg-primary hover:bg-primary/90 transition-colors button-hover button-hover-light dark:button-hover-dark"
                      style={{backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)'}}
                    >
                      View Details
                    </button>
                  </CardContent>
                </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upcoming Events Section */}
                {upcomingCount > 0 && (
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
                      <h2 className="text-xl sm:text-2xl font-semibold">Upcoming Events</h2>
                      <Badge variant="secondary" className="text-xs sm:text-sm w-fit">
                        {upcomingCount} event{upcomingCount !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                       {upcomingEvents.map((registration) => (
                        <Card key={registration.id} className="relative group hover:shadow-lg transition-shadow">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => handleUnregister(registration.id, registration.events.name)}
                          >
                            <X className="h-4 w-4" />
                          </Button>

                          {registration.status === 'approved' && (
                            <div className="absolute top-2 left-2">
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            </div>
                          )}
                          {registration.status === 'pending' && (
                            <div className="absolute top-2 left-2">
                              <ClockIcon className="h-5 w-5 text-yellow-500" />
                            </div>
                          )}

                          <CardHeader className={registration.status !== 'approved' ? "pt-10" : ""}>
                            <div className="flex justify-between items-start pr-8">
                              <CardTitle className="text-lg line-clamp-2 font-heading">
                                {registration.events.name}
                              </CardTitle>
                            </div>
                            <Badge
                              variant="secondary"
                              className={`w-fit ${eventTypeColors[registration.events.event_type as keyof typeof eventTypeColors]}`}
                            >
                              {registration.events.event_type.charAt(0).toUpperCase() + registration.events.event_type.slice(1)}
                            </Badge>
                          </CardHeader>

                          <CardContent className="flex flex-col justify-between">
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="mr-2 h-4 w-4" />
                                {formatDate(registration.events.date)}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="mr-2 h-4 w-4" />
                                {registration.events.venue}
                              </div>
                              {registration.events.max_participants && (
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Users className="mr-2 h-4 w-4" />
                                  Max {registration.events.max_participants} participants
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => navigate(`/events/${registration.events.id}`)}
                              className="w-full bg-primary hover:bg-primary/90 transition-colors button-hover button-hover-light dark:button-hover-dark"
                              style={{backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)'}}
                            >
                              View Details
                            </button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Past Events Section */}
                {pastCount > 0 && (
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
                      <h2 className="text-xl sm:text-2xl font-semibold">Past Events</h2>
                      <Badge variant="outline" className="text-xs sm:text-sm w-fit">
                        {pastCount} event{pastCount !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {pastEvents.map((registration) => (
                        <Card key={registration.id} className="relative opacity-75">
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg line-clamp-2 font-heading">
                                {registration.events.name}
                              </CardTitle>
                              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            </div>
                            <Badge
                              variant="secondary"
                              className={`w-fit ${eventTypeColors[registration.events.event_type as keyof typeof eventTypeColors]}`}
                            >
                              {registration.events.event_type.charAt(0).toUpperCase() + registration.events.event_type.slice(1)}
                            </Badge>
                          </CardHeader>

                          <CardContent className="flex flex-col justify-between">
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="mr-2 h-4 w-4" />
                                {formatDate(registration.events.date)}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="mr-2 h-4 w-4" />
                                {registration.events.venue}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Attended • Registered on {new Date(registration.registered_at).toLocaleDateString()}
                              </div>
                            </div>
                            <button
                              onClick={() => navigate(`/events/${registration.events.id}`)}
                              className="w-full bg-primary hover:bg-primary/90 transition-colors button-hover button-hover-light dark:button-hover-dark"
                              style={{backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)'}}
                            >
                              View Details
                            </button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
            </TabsContent>

            <TabsContent value="profile" className="space-y-6 mt-6" id="profile-section">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>
                    Manage your personal information and preferences. All fields are required to complete your profile.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {profile && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="full_name">* Full Name</Label>
                            <div className="flex items-center space-x-3">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <Input
                                id="full_name"
                                value={profileForm.full_name}
                                onChange={(e) => setProfileForm(prev => ({ ...prev, full_name: e.target.value }))}
                                placeholder="Enter your full name"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="email">* Email</Label>
                            <div className="flex items-center space-x-3">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <Input
                                id="email"
                                type="email"
                                value={profile.email}
                                disabled
                                className="bg-muted/50"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="phone_number">* Phone Number</Label>
                            <div className="flex items-center space-x-3">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <Input
                                id="phone_number"
                                value={profileForm.phone_number}
                                onChange={(e) => setProfileForm(prev => ({ ...prev, phone_number: e.target.value }))}
                                placeholder="Enter your phone number"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="date_of_birth">* Date of Birth</Label>
                            <div className="flex items-center space-x-3">
                              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                              <Input
                                id="date_of_birth"
                                type="date"
                                value={profileForm.date_of_birth}
                                onChange={(e) => setProfileForm(prev => ({ ...prev, date_of_birth: e.target.value }))}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="college">* College</Label>
                            <div className="flex items-start space-x-3">
                              <GraduationCap className="h-4 w-4 text-muted-foreground mt-3" />
                              <Input
                                id="college"
                                value={profileForm.college}
                                onChange={(e) => setProfileForm(prev => ({ ...prev, college: e.target.value }))}
                                placeholder="Enter your college name"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="degree">* Degree</Label>
                            <div className="flex items-start space-x-3">
                              <GraduationCap className="h-4 w-4 text-muted-foreground mt-3" />
                              <Input
                                id="degree"
                                value={profileForm.degree}
                                onChange={(e) => setProfileForm(prev => ({ ...prev, degree: e.target.value }))}
                                placeholder="Enter your degree (e.g., B.Tech, M.Sc)"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="graduation_year">* Graduation Year</Label>
                            <div className="flex items-start space-x-3">
                              <GraduationCap className="h-4 w-4 text-muted-foreground mt-3" />
                              <Input
                                id="graduation_year"
                                type="number"
                                value={profileForm.graduation_year}
                                onChange={(e) => setProfileForm(prev => ({ ...prev, graduation_year: e.target.value }))}
                                placeholder="Enter graduation year (e.g., 2024)"
                                min="1950"
                                max="2050"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="skills">* Skills</Label>
                            <div className="flex items-center space-x-3">
                              <Award className="h-4 w-4 text-muted-foreground" />
                              <Input
                                id="skills"
                                value={profileForm.skills}
                                onChange={(e) => setProfileForm(prev => ({ ...prev, skills: e.target.value }))}
                                placeholder="e.g., Leadership, Communication"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Professional Links Section */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Professional Links</h4>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <Label htmlFor="github_url">* GitHub Profile</Label>
                            <div className="flex items-center space-x-3">
                              <Github className="h-4 w-4 text-muted-foreground" />
                              <Input
                                id="github_url"
                                value={profileForm.github_url}
                                onChange={(e) => setProfileForm(prev => ({ ...prev, github_url: e.target.value }))}
                                placeholder="https://github.com/username"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="linkedin_url">* LinkedIn Profile</Label>
                            <div className="flex items-center space-x-3">
                              <Linkedin className="h-4 w-4 text-muted-foreground" />
                              <Input
                                id="linkedin_url"
                                value={profileForm.linkedin_url}
                                onChange={(e) => setProfileForm(prev => ({ ...prev, linkedin_url: e.target.value }))}
                                placeholder="https://linkedin.com/in/username"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="leetcode_url">* LeetCode Profile</Label>
                            <div className="flex items-center space-x-3">
                              <Link2 className="h-4 w-4 text-muted-foreground" />
                              <Input
                                id="leetcode_url"
                                value={profileForm.leetcode_url}
                                onChange={(e) => setProfileForm(prev => ({ ...prev, leetcode_url: e.target.value }))}
                                placeholder="https://leetcode.com/username"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end">
                    <Button onClick={handleProfileUpdate} disabled={saving}>
                      {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block space-y-6">
          {activeTab === 'profile' ? (
            /* Profile Section */
            <Card id="profile-section">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Manage your personal information and preferences. All fields are required to complete your profile.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {profile && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="full_name_desktop">* Full Name</Label>
                          <div className="flex items-center space-x-3">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <Input
                              id="full_name_desktop"
                              value={profileForm.full_name}
                              onChange={(e) => setProfileForm(prev => ({ ...prev, full_name: e.target.value }))}
                              placeholder="Enter your full name"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="email_desktop">* Email</Label>
                          <div className="flex items-center space-x-3">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <Input
                              id="email_desktop"
                              type="email"
                              value={profile.email}
                              disabled
                              className="bg-muted/50"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="phone_number_desktop">* Phone Number</Label>
                          <div className="flex items-center space-x-3">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <Input
                              id="phone_number_desktop"
                              type="tel"
                              value={profileForm.phone_number}
                              onChange={(e) => setProfileForm(prev => ({ ...prev, phone_number: e.target.value }))}
                              placeholder="Enter your phone number"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="date_of_birth_desktop">* Date of Birth</Label>
                          <div className="flex items-center space-x-3">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <Input
                              id="date_of_birth_desktop"
                              type="date"
                              value={profileForm.date_of_birth}
                              onChange={(e) => setProfileForm(prev => ({ ...prev, date_of_birth: e.target.value }))}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="college_desktop">* College</Label>
                          <div className="flex items-start space-x-3">
                            <GraduationCap className="h-4 w-4 text-muted-foreground mt-3" />
                            <Input
                              id="college_desktop"
                              value={profileForm.college}
                              onChange={(e) => setProfileForm(prev => ({ ...prev, college: e.target.value }))}
                              placeholder="Enter your college name"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="degree_desktop">* Degree</Label>
                          <div className="flex items-start space-x-3">
                            <GraduationCap className="h-4 w-4 text-muted-foreground mt-3" />
                            <Input
                              id="degree_desktop"
                              value={profileForm.degree}
                              onChange={(e) => setProfileForm(prev => ({ ...prev, degree: e.target.value }))}
                              placeholder="Enter your degree (e.g., B.Tech, M.Sc)"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="graduation_year_desktop">* Graduation Year</Label>
                          <div className="flex items-start space-x-3">
                            <GraduationCap className="h-4 w-4 text-muted-foreground mt-3" />
                            <Input
                              id="graduation_year_desktop"
                              type="number"
                              value={profileForm.graduation_year}
                              onChange={(e) => setProfileForm(prev => ({ ...prev, graduation_year: e.target.value }))}
                              placeholder="Enter graduation year (e.g., 2024)"
                              min="1950"
                              max="2050"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="skills_desktop">* Skills</Label>
                          <div className="flex items-start space-x-3">
                            <Award className="h-4 w-4 text-muted-foreground mt-3" />
                            <Textarea
                              id="skills_desktop"
                              value={profileForm.skills}
                              onChange={(e) => setProfileForm(prev => ({ ...prev, skills: e.target.value }))}
                              placeholder="Enter your skills (comma-separated)"
                              rows={2}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Professional Links</h3>
                      <p className="text-sm text-muted-foreground">
                        Follow the exact format for URLs to ensure they are valid.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="github_url_desktop">* GitHub URL</Label>
                          <div className="flex items-center space-x-3">
                            <Github className="h-4 w-4 text-muted-foreground" />
                            <Input
                              id="github_url_desktop"
                              type="url"
                              value={profileForm.github_url}
                              onChange={(e) => setProfileForm(prev => ({ ...prev, github_url: e.target.value }))}
                              placeholder="https://github.com/username"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="linkedin_url_desktop">* LinkedIn URL</Label>
                          <div className="flex items-center space-x-3">
                            <Linkedin className="h-4 w-4 text-muted-foreground" />
                            <Input
                              id="linkedin_url_desktop"
                              type="url"
                              value={profileForm.linkedin_url}
                              onChange={(e) => setProfileForm(prev => ({ ...prev, linkedin_url: e.target.value }))}
                              placeholder="https://linkedin.com/in/username"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="leetcode_url_desktop">* LeetCode URL</Label>
                          <div className="flex items-center space-x-3">
                            <Link2 className="h-4 w-4 text-muted-foreground" />
                            <Input
                              id="leetcode_url_desktop"
                              type="url"
                              value={profileForm.leetcode_url}
                              onChange={(e) => setProfileForm(prev => ({ ...prev, leetcode_url: e.target.value }))}
                              placeholder="https://leetcode.com/username"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleProfileUpdate} disabled={saving}>
                        {saving ? 'Saving...' : 'Save Profile'}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            /* Events Section with Tabs */
            <Tabs value={eventTimeView} onValueChange={(v) => setEventTimeView(v as 'live-upcoming' | 'past')} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="live-upcoming" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Live & Upcoming ({liveAndUpcomingCount})
              </TabsTrigger>
              <TabsTrigger value="past" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Past Events ({pastCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="live-upcoming" className="space-y-6 sm:space-y-8 mt-6">
              {upcomingCount === 0 && liveCount === 0 ? (
                <Card className="text-center py-12">
                  <CardContent className="space-y-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                      <Calendar className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl mb-2">No Upcoming Events</CardTitle>
                      <CardDescription className="text-lg">
                        You haven't registered for any upcoming events yet.
                      </CardDescription>
                    </div>
                    <Button onClick={() => navigate('/events')} size="lg" className="mt-4">
                      Browse Events
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Live Events Section */}
                  {liveCount > 0 && (
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
                        <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          Live Events
                        </h2>
                        <Badge variant="destructive" className="text-xs sm:text-sm w-fit">
                          {liveCount} event{liveCount !== 1 ? 's' : ''} happening now
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {liveEvents.map((registration) => (
                          <Card key={registration.id} className="relative group hover:shadow-lg transition-shadow border-red-200">
                            <div className="absolute top-2 left-2">
                              <div className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                LIVE
                              </div>
                            </div>

                            <CardHeader className="pt-12">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-lg line-clamp-2 font-heading">
                                  {registration.events.name}
                                </CardTitle>
                              </div>
                              <Badge
                                variant="secondary"
                                className={`w-fit ${eventTypeColors[registration.events.event_type as keyof typeof eventTypeColors]}`}
                              >
                                {registration.events.event_type.charAt(0).toUpperCase() + registration.events.event_type.slice(1)}
                              </Badge>
                            </CardHeader>

                            <CardContent className="flex flex-col justify-between">
                              <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Calendar className="mr-2 h-4 w-4" />
                                  {formatDate(registration.events.date)}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <MapPin className="mr-2 h-4 w-4" />
                                  {registration.events.venue}
                                </div>
                                {registration.events.max_participants && (
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Users className="mr-2 h-4 w-4" />
                                    Max {registration.events.max_participants} participants
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={() => navigate(`/events/${registration.events.id}`)}
                                className="w-full bg-primary hover:bg-primary/90 transition-colors button-hover button-hover-light dark:button-hover-dark"
                                style={{backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)'}}
                              >
                                View Details
                              </button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Upcoming Events Section */}
                  {upcomingCount > 0 && (
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
                        <h2 className="text-xl sm:text-2xl font-semibold">Upcoming Events</h2>
                        <Badge variant="secondary" className="text-xs sm:text-sm w-fit">
                          {upcomingCount} event{upcomingCount !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {upcomingEvents.map((registration) => (
                          <Card key={registration.id} className="relative group hover:shadow-lg transition-shadow">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute top-2 right-2 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
                              onClick={() => handleUnregister(registration.id, registration.events.name)}
                            >
                              <X className="h-4 w-4" />
                            </Button>

                            {registration.status === 'approved' && (
                              <div className="absolute top-2 left-2">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              </div>
                            )}
                            {registration.status === 'pending' && (
                              <div className="absolute top-2 left-2">
                                <ClockIcon className="h-5 w-5 text-yellow-500" />
                              </div>
                            )}

                            <CardHeader className={registration.status !== 'approved' ? "pt-10" : ""}>
                              <div className="flex justify-between items-start pr-8">
                                <CardTitle className="text-lg line-clamp-2 font-heading">
                                  {registration.events.name}
                                </CardTitle>
                              </div>
                              <Badge
                                variant="secondary"
                                className={`w-fit ${eventTypeColors[registration.events.event_type as keyof typeof eventTypeColors]}`}
                              >
                                {registration.events.event_type.charAt(0).toUpperCase() + registration.events.event_type.slice(1)}
                              </Badge>
                            </CardHeader>

                            <CardContent className="flex flex-col justify-between">
                              <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Calendar className="mr-2 h-4 w-4" />
                                  {formatDate(registration.events.date)}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <MapPin className="mr-2 h-4 w-4" />
                                  {registration.events.venue}
                                </div>
                                {registration.events.max_participants && (
                                  <div className="flex items-center text-sm text-muted-foreground">
                                    <Users className="mr-2 h-4 w-4" />
                                    Max {registration.events.max_participants} participants
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={() => navigate(`/events/${registration.events.id}`)}
                                className="w-full bg-primary hover:bg-primary/90 transition-colors button-hover button-hover-light dark:button-hover-dark"
                                style={{backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)'}}
                              >
                                View Details
                              </button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-6 sm:space-y-8 mt-6">
              {pastCount === 0 ? (
                <Card className="text-center py-12">
                  <CardContent className="space-y-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                      <Calendar className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl mb-2">No Past Events</CardTitle>
                      <CardDescription className="text-lg">
                        You haven't attended any events yet.
                      </CardDescription>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl font-semibold">Past Events</h2>
                    <Badge variant="outline" className="text-xs sm:text-sm w-fit">
                      {pastCount} event{pastCount !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pastEvents.map((registration) => (
                          <Card key={registration.id} className="relative opacity-75">
                            <CardHeader>
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-lg line-clamp-2 font-heading">
                                  {registration.events.name}
                                </CardTitle>
                                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                              </div>
                              <Badge
                                variant="secondary"
                                className={`w-fit ${eventTypeColors[registration.events.event_type as keyof typeof eventTypeColors]}`}
                              >
                                {registration.events.event_type.charAt(0).toUpperCase() + registration.events.event_type.slice(1)}
                              </Badge>
                            </CardHeader>

                            <CardContent className="flex flex-col justify-between">
                              <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Calendar className="mr-2 h-4 w-4" />
                                  {formatDate(registration.events.date)}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <MapPin className="mr-2 h-4 w-4" />
                                  {registration.events.venue}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Attended • Registered on {new Date(registration.registered_at).toLocaleDateString()}
                                </div>
                              </div>
                              <button
                                onClick={() => navigate(`/events/${registration.events.id}`)}
                                className="w-full bg-primary hover:bg-primary/90 transition-colors button-hover button-hover-light dark:button-hover-dark"
                                style={{backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)'}}
                              >
                                View Details
                              </button>
                            </CardContent>
                          </Card>
                        ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
          )}
        </div>
      </div>

      <Dialog open={showRedirectDialog} onOpenChange={setShowRedirectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Profile Completed</DialogTitle>
            <DialogDescription>
              Your profile has been completed successfully. Would you like to go back to the event page?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleRedirectToEvent}>Go to Event</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
