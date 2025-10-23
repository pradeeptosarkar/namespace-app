import { useState, useEffect } from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LeaderboardEntry {
  referrer_name: string | null;
  referral_count: number | null;
  utm_source: string | null;
}

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  eventName: string;
}

export default function LeaderboardModal({
  isOpen,
  onClose,
  eventId,
  eventName,
}: LeaderboardModalProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && eventId) {
      fetchLeaderboard();
    }
  }, [isOpen, eventId]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('registration_leaderboard')
        .select('*')
        .eq('event_id', eventId)
        .order('referral_count', { ascending: false });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch leaderboard data",
        });
      } else {
        setLeaderboard(data || []);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch leaderboard data",
      });
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 2:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-sm font-bold text-muted-foreground w-5 text-center">{index + 1}</span>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Referral Leaderboard</DialogTitle>
          <DialogDescription>
            Top referrers for {eventName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="text-muted-foreground">Loading leaderboard...</div>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-muted-foreground">No referrals yet</div>
            </div>
          ) : (
            <div className="space-y-2">
              {leaderboard.map((entry, index) => (
                <div
                  key={entry.utm_source || index}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card"
                >
                  <div className="flex items-center space-x-3">
                    {getRankIcon(index)}
                    <div>
                      <div className="font-medium">
                        {entry.referrer_name || 'Anonymous'}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {entry.referral_count} referral{entry.referral_count !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
