import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Calendar, UserCheck, LogOut, Plus, RefreshCw, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Stats {
  totalUsers: number;
  totalEvents: number;
  totalRegistrations: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({ totalUsers: 0, totalEvents: 0, totalRegistrations: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAdminAuthenticated, adminLogout } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
      return;
    }
    fetchStats();
  }, [isAdminAuthenticated, navigate]);

  const fetchStats = async () => {
    try {
      setError(null);
      setLoading(true);
      
      const [usersResponse, eventsResponse, registrationsResponse] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('events').select('*', { count: 'exact', head: true }),
        supabase.from('registrations').select('*', { count: 'exact', head: true })
      ]);

      // Check for errors in each response
      const errors = [
        usersResponse.error,
        eventsResponse.error,
        registrationsResponse.error
      ].filter(error => error !== null);

      if (errors.length > 0) {
        throw new Error(`Database access error: ${errors[0]?.message}`);
      }

      setStats({
        totalUsers: usersResponse.count || 0,
        totalEvents: eventsResponse.count || 0,
        totalRegistrations: registrationsResponse.count || 0
      });
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch dashboard statistics');
      
      toast({
        title: "Error",
        description: "Failed to fetch dashboard stats. Please check your database permissions.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchStats();
  };

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  if (!isAdminAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background relative">
      <header className="border-b bg-card relative z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : stats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : stats.totalEvents}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '...' : stats.totalRegistrations}</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your events platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                onClick={() => navigate('/admin/events/create')}
                className="h-auto py-4 flex flex-col gap-2"
              >
                <Plus className="h-6 w-6" />
                Create Event
              </Button>
              <Button 
                onClick={() => navigate('/admin/events')}
                variant="outline"
                className="h-auto py-4 flex flex-col gap-2"
              >
                <Calendar className="h-6 w-6" />
                Manage Events
              </Button>
              <Button 
                onClick={() => navigate('/admin/users')}
                variant="outline"
                className="h-auto py-4 flex flex-col gap-2"
              >
                <Users className="h-6 w-6" />
                View Users
              </Button>
              <Button 
                onClick={() => navigate('/admin/forms')}
                variant="outline"
                className="h-auto py-4 flex flex-col gap-2"
              >
                <UserCheck className="h-6 w-6" />
                Create Form
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;