import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Edit, Trash2, Users, Calendar, MapPin, LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Event {
  id: string;
  name: string;
  description: string;
  event_type: string;
  date: string;
  venue: string;
  max_participants: number | null;
  mode: string | null;
  team_size: number | null;
  banner_url: string | null;
  created_at: string;
  registrations?: { count: number }[];
}

interface LeaderboardEntry {
  utm_source: string;
  referrer_name: string;
  event_id: string;
  event_name: string;
  referral_count: number;
}

const AdminEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAdminAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
      return;
    }
    fetchEvents();
    fetchLeaderboard();
  }, [isAdminAuthenticated, navigate]);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          registrations!left(count)
        `)
        .order('created_at', { ascending: false });

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
      
      setEvents(eventsWithCounts);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch events",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('registration_leaderboard')
        .select('*')
        .gte('referral_count', 1)
        .order('referral_count', { ascending: false });

      if (error) throw error;
      setLeaderboard(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch referral leaderboard",
        variant: "destructive",
      });
    }
  };

  const deleteEvent = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
      
      fetchEvents();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    }
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

  if (!isAdminAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background relative">
      <header className="border-b bg-card relative z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/admin')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">Manage Events</h1>
          <div className="ml-auto flex gap-2">
            <Button 
              variant="outline"
              onClick={() => navigate('/admin/pending-approvals')}
            >
              Pending Approvals
            </Button>
            <Button onClick={() => navigate('/admin/events/create')}>
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {loading ? (
          <div className="text-center py-8">Loading events...</div>
        ) : (
          <>
            
            {/* Events Section */}
            {events.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No events found</h3>
                  <p className="text-muted-foreground mb-4">Create your first event to get started</p>
                  <Button onClick={() => navigate('/admin/events/create')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Event
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {events.map((event) => (
                  <Card key={event.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{event.name}</CardTitle>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {format(new Date(event.date), 'PPP')}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {event.venue}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {getRegistrationCount(event)}{event.max_participants && `/${event.max_participants}`} registered
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{event.event_type}</Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate(`/admin/events/${event.id}/registrations`)}
                          >
                            <Users className="h-4 w-4 mr-1" />
                            View Applicants
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate(`/admin/events/${event.id}/referrals`)}
                          >
                            <LinkIcon className="h-4 w-4 mr-1" />
                            View Referrals
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate(`/admin/events/${event.id}/edit`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteEvent(event.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {event.banner_url && (
                        <div className="mb-4">
                          <img
                            src={event.banner_url}
                            alt={event.name}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <p className="text-muted-foreground">{event.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;