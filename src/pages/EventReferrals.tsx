import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { ArrowLeft, LinkIcon, Copy, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReferralData {
  utm_source: string;
  referrer_name: string | null;
  referral_count: number;
  event_id: string;
  event_name: string;
}

interface Event {
  id: string;
  name: string;
}

interface GeneratedLink {
  id: string;
  name: string;
  link: string;
}

const EventReferrals = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [referrals, setReferrals] = useState<ReferralData[]>([]);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [generatedLinks, setGeneratedLinks] = useState<GeneratedLink[]>([]);
  const [newLinkName, setNewLinkName] = useState('');
  const { isAdminAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
      return;
    }
    if (eventId) {
      fetchEventAndReferrals();
    }
  }, [isAdminAuthenticated, navigate, eventId]);

  const fetchEventAndReferrals = async () => {
    if (!eventId) return;

    try {
      // Fetch event details
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('id, name')
        .eq('id', eventId)
        .single();

      if (eventError) throw eventError;
      setEvent(eventData);

      // Fetch referral data
      const { data: referralData, error: referralError } = await supabase
        .from('registration_leaderboard')
        .select('*')
        .eq('event_id', eventId)
        .order('referral_count', { ascending: false });

      if (referralError) throw referralError;
      setReferrals(referralData || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch referral data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateReferralLink = (utmSource: string): string => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/events/${eventId}?utm_source=${utmSource}`;
  };

  const generateNewLink = () => {
    if (!newLinkName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for the link",
        variant: "destructive",
      });
      return;
    }

    const utmSource = crypto.randomUUID();
    const link = generateReferralLink(utmSource);
    
    const newLink: GeneratedLink = {
      id: utmSource,
      name: newLinkName.trim(),
      link: link,
    };

    setGeneratedLinks([...generatedLinks, newLink]);
    setNewLinkName('');
    
    toast({
      title: "Success",
      description: "New referral link generated",
    });
  };

  const copyToClipboard = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      toast({
        title: "Success",
        description: "Link copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      });
    }
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
            onClick={() => navigate('/admin/events')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
          <div className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5" />
            <h1 className="text-2xl font-bold">
              Referrals for {event?.name || 'Event'}
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Generate New Referral Link</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter link name (e.g., Instagram Campaign, Email Newsletter)"
                value={newLinkName}
                onChange={(e) => setNewLinkName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    generateNewLink();
                  }
                }}
              />
              <Button onClick={generateNewLink}>
                <Plus className="h-4 w-4 mr-2" />
                Generate
              </Button>
            </div>
          </CardContent>
        </Card>

        {generatedLinks.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Links ({generatedLinks.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Link Name</TableHead>
                    <TableHead>Referral Link</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {generatedLinks.map((link) => (
                    <TableRow key={link.id}>
                      <TableCell className="font-medium">
                        {link.name}
                      </TableCell>
                      <TableCell className="max-w-md">
                        <div className="truncate text-sm text-muted-foreground">
                          {link.link}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(link.link)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="text-center py-8">Loading referral data...</div>
        ) : referrals.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <LinkIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No active referrals yet</h3>
              <p className="text-muted-foreground">Referral statistics will appear here once people register using your links.</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Active Referrals ({referrals.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Referrer Name</TableHead>
                    <TableHead>Referral Link</TableHead>
                    <TableHead className="text-right">Count</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referrals.map((referral) => {
                    const referralLink = generateReferralLink(referral.utm_source);
                    return (
                      <TableRow key={referral.utm_source}>
                        <TableCell className="font-medium">
                          {referral.referrer_name || 'Anonymous'}
                        </TableCell>
                        <TableCell className="max-w-md">
                          <div className="truncate text-sm text-muted-foreground">
                            {referralLink}
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {referral.referral_count}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(referralLink)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EventReferrals;