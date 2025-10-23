import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, XCircle, Mail, Phone, Calendar, GraduationCap, Code, Github, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EmailService } from '@/services/emailService';

interface PendingRegistration {
  id: string;
  registered_at: string;
  event_id: string;
  user_id: string;
  event_name: string;
  event_date: string;
  event_venue: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  user_college: string;
  user_degree: string;
  user_graduation_year: number;
  user_skills: string[];
  github_url: string;
  linkedin_url: string;
  leetcode_url: string;
}

export default function AdminPendingApprovals() {
  const [pendingRegistrations, setPendingRegistrations] = useState<PendingRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAdminAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
      return;
    }
    fetchPendingRegistrations();
  }, [isAdminAuthenticated]);

  const fetchPendingRegistrations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-pending-approvals');
      if (error) throw error;

      const result = (data?.data ?? []) as PendingRegistration[];
      setPendingRegistrations(result);
    } catch (error) {
      console.error('Error fetching pending registrations:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch pending registrations',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (registration: PendingRegistration) => {
    try {
      const { error } = await supabase
        .from('registrations')
        .update({ status: 'approved' })
        .eq('id', registration.id);

      if (error) throw error;

      // Send approval email
      const emailTemplate = EmailService.generateEventEmailTemplate({
        eventName: registration.event_name,
        applicantName: registration.user_name,
        message: `Congratulations! Your registration request for ${registration.event_name} has been approved. We look forward to seeing you at the event!`,
        eventDate: new Date(registration.event_date).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        eventVenue: registration.event_venue,
        subject: `Registration Approved: ${registration.event_name}`
      });

      await EmailService.sendEmail({
        to: registration.user_email,
        subject: `Registration Approved: ${registration.event_name}`,
        html: emailTemplate
      });

      toast({
        title: 'Registration Approved',
        description: `${registration.user_name}'s registration has been approved and they have been notified via email.`
      });

      fetchPendingRegistrations();
    } catch (error) {
      console.error('Error approving registration:', error);
      toast({
        title: 'Error',
        description: 'Failed to approve registration',
        variant: 'destructive'
      });
    }
  };

  const handleReject = async (registration: PendingRegistration) => {
    try {
      const { error } = await supabase
        .from('registrations')
        .update({ status: 'rejected' })
        .eq('id', registration.id);

      if (error) throw error;

      toast({
        title: 'Registration Rejected',
        description: `${registration.user_name}'s registration has been rejected.`
      });

      fetchPendingRegistrations();
    } catch (error) {
      console.error('Error rejecting registration:', error);
      toast({
        title: 'Error',
        description: 'Failed to reject registration',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/admin/events')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
          <h1 className="text-2xl font-bold">Pending Approvals</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Registration Requests</CardTitle>
            <CardDescription>
              Review and approve or reject pending event registrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pendingRegistrations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No pending registration requests
              </div>
            ) : (
              <div className="space-y-6">
                {pendingRegistrations.map((registration) => (
                  <Card key={registration.id} className="border-2">
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold text-lg mb-4">{registration.event_name}</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{new Date(registration.event_date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Venue:</span>
                              <span>{registration.event_venue}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Requested:</span>
                              <span>{new Date(registration.registered_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-4">Applicant Details</h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Name:</span>
                              <p className="font-medium">{registration.user_name}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span>{registration.user_email}</span>
                            </div>
                            {registration.user_phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{registration.user_phone}</span>
                              </div>
                            )}
                            {(registration.user_college || registration.user_degree || registration.user_graduation_year) && (
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-muted-foreground">Academic Info:</span>
                                </div>
                                <div className="text-xs ml-6 space-y-1">
                                  {registration.user_college && <div><span className="font-medium">College:</span> {registration.user_college}</div>}
                                  {registration.user_degree && <div><span className="font-medium">Degree:</span> {registration.user_degree}</div>}
                                  {registration.user_graduation_year && <div><span className="font-medium">Graduation Year:</span> {registration.user_graduation_year}</div>}
                                </div>
                              </div>
                            )}
                            {registration.user_skills && registration.user_skills.length > 0 && (
                              <div>
                                <span className="text-muted-foreground">Skills:</span>
                                <div className="flex flex-wrap gap-1 ml-6 mt-1">
                                  {registration.user_skills.map((skill, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            {(registration.github_url || registration.linkedin_url || registration.leetcode_url) && (
                              <div>
                                <span className="text-muted-foreground">Professional Links:</span>
                                <div className="space-y-1 ml-6 mt-1">
                                  {registration.github_url && (
                                    <div className="flex items-center gap-2">
                                      <Github className="h-3 w-3" />
                                      <a href={registration.github_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs">
                                        GitHub
                                      </a>
                                    </div>
                                  )}
                                  {registration.linkedin_url && (
                                    <div className="flex items-center gap-2">
                                      <Linkedin className="h-3 w-3" />
                                      <a href={registration.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs">
                                        LinkedIn
                                      </a>
                                    </div>
                                  )}
                                  {registration.leetcode_url && (
                                    <div className="flex items-center gap-2">
                                      <Code className="h-3 w-3" />
                                      <a href={registration.leetcode_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs">
                                        LeetCode
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <Button
                          onClick={() => handleApprove(registration)}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleReject(registration)}
                          variant="destructive"
                          className="flex-1"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
