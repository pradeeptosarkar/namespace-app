import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, User, Calendar, Mail, Phone, GraduationCap, Code, MailIcon, Download, CheckCircle, Github, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import EmailComposer from '@/components/EmailComposer';
import { EmailService } from '@/services/emailService';
import * as XLSX from 'xlsx';

interface Registration {
  id: string;
  registered_at: string;
  user_id: string;
  status: 'pending' | 'approved' | 'rejected';
  profiles: {
    email: string;
    full_name: string;
    phone_number: string;
    date_of_birth: string;
    college: string;
    degree: string;
    graduation_year: number;
    skills: string[];
    profile_completed: boolean;
    github_url: string;
    linkedin_url: string;
    leetcode_url: string;
  };
}

interface Event {
  id: string;
  name: string;
  event_type: string;
  date: string;
  venue: string;
}

const EventRegistrations = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEmailComposerOpen, setIsEmailComposerOpen] = useState(false);
  const { eventId } = useParams<{ eventId: string }>();
  const { isAdminAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
      return;
    }
    if (eventId) {
      fetchEventAndRegistrations();
    }
  }, [isAdminAuthenticated, navigate, eventId]);

  const fetchEventAndRegistrations = async () => {
    try {
      const [eventResponse, registrationsResponse] = await Promise.all([
        supabase.from('events').select('*').eq('id', eventId).single(),
        supabase
          .from('registrations')
          .select('id, registered_at, user_id, status')
          .eq('event_id', eventId)
          .order('registered_at', { ascending: false })
      ]);

      if (eventResponse.error) throw eventResponse.error;
      if (registrationsResponse.error) throw registrationsResponse.error;

      // Fetch profiles separately
      const userIds = registrationsResponse.data?.map(r => r.user_id) || [];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, email, full_name, phone_number, date_of_birth, college, degree, graduation_year, skills, profile_completed, github_url, linkedin_url, leetcode_url')
        .in('id', userIds);

      // Merge registrations with profiles
      const registrationsWithProfiles = registrationsResponse.data?.map(reg => ({
        ...reg,
        status: reg.status as 'pending' | 'approved' | 'rejected',
        profiles: profiles?.find(p => p.id === reg.user_id) || {
          email: '', full_name: '', phone_number: '', date_of_birth: '',
          college: '', degree: '', graduation_year: 0, skills: [], profile_completed: false,
          github_url: '', linkedin_url: '', leetcode_url: ''
        }
      })) || [];

      setEvent(eventResponse.data);
      setRegistrations(registrationsWithProfiles);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch registrations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (registration: Registration) => {
    try {
      const { error } = await supabase
        .from('registrations')
        .update({ status: 'approved' })
        .eq('id', registration.id);

      if (error) throw error;

      // Send approval email
      const emailTemplate = EmailService.generateEventEmailTemplate({
        eventName: event?.name || '',
        applicantName: registration.profiles.full_name || 'Participant',
        message: `Congratulations! Your registration request for ${event?.name} has been approved. We look forward to seeing you at the event!`,
        eventDate: event ? format(new Date(event.date), 'PPP') : '',
        eventVenue: event?.venue || '',
        subject: `Registration Approved: ${event?.name}`
      });

      await EmailService.sendEmail({
        to: registration.profiles.email,
        subject: `Registration Approved: ${event?.name}`,
        html: emailTemplate
      });

      toast({
        title: 'Registration Approved',
        description: `${registration.profiles.full_name}'s registration has been approved and they have been notified via email.`
      });

      fetchEventAndRegistrations();
    } catch (error) {
      console.error('Error approving registration:', error);
      toast({
        title: 'Error',
        description: 'Failed to approve registration',
        variant: 'destructive'
      });
    }
  };

  const exportToExcel = () => {
    if (registrations.length === 0) {
      toast({
        title: "No data to export",
        description: "There are no registrations to export",
        variant: "destructive",
      });
      return;
    }

    const worksheetData = registrations.map((reg, index) => ({
      'S.No': index + 1,
      'Full Name': reg.profiles.full_name || 'Not provided',
      'Email': reg.profiles.email,
      'Phone Number': reg.profiles.phone_number || 'Not provided',
      'Date of Birth': reg.profiles.date_of_birth ? format(new Date(reg.profiles.date_of_birth), 'dd/MM/yyyy') : 'Not provided',
      'College': reg.profiles.college || 'Not provided',
      'Degree': reg.profiles.degree || 'Not provided',
      'Graduation Year': reg.profiles.graduation_year || 'Not provided',
      'Skills': reg.profiles.skills?.join(', ') || 'Not provided',
      'GitHub': reg.profiles.github_url || 'Not provided',
      'LinkedIn': reg.profiles.linkedin_url || 'Not provided',
      'LeetCode': reg.profiles.leetcode_url || 'Not provided',
      'Profile Completed': reg.profiles.profile_completed ? 'Yes' : 'No',
      'Registration Date': format(new Date(reg.registered_at), 'dd/MM/yyyy hh:mm a')
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');

    // Auto-adjust column widths
    const cols = Object.keys(worksheetData[0] || {}).map(() => ({ wch: 20 }));
    worksheet['!cols'] = cols;

    const fileName = `${event?.name || 'Event'}_Registrations_${format(new Date(), 'yyyy-MM-dd')}.xlsx`;
    XLSX.writeFile(workbook, fileName);

    toast({
      title: "Export successful",
      description: `Downloaded ${registrations.length} registrations as ${fileName}`,
    });
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
          <div>
            <h1 className="text-2xl font-bold">Event Registrations</h1>
            {event && (
              <p className="text-muted-foreground">{event.name}</p>
            )}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="secondary">
              {registrations.length} registrations
            </Badge>
            {registrations.length > 0 && (
              <>
                <Button 
                  onClick={() => setIsEmailComposerOpen(true)}
                  className="ml-2"
                >
                  <MailIcon className="h-4 w-4 mr-2" />
                  Email Applicants
                </Button>
                <Button 
                  onClick={exportToExcel}
                  variant="outline"
                  className="ml-2"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Excel
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {event && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(event.date), 'PPP')}</span>
                </div>
                <div>
                  <Badge variant="secondary">{event.event_type}</Badge>
                </div>
                <div>{event.venue}</div>
              </div>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <div className="text-center py-8">Loading registrations...</div>
        ) : registrations.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <User className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No registrations yet</h3>
              <p className="text-muted-foreground">Registrations will appear here as users sign up</p>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pending">
                Pending ({registrations.filter(r => r.status === 'pending').length})
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved ({registrations.filter(r => r.status === 'approved').length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {registrations.filter(r => r.status === 'pending').length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <User className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No pending registrations</h3>
                    <p className="text-muted-foreground">All registrations have been processed</p>
                  </CardContent>
                </Card>
              ) : (
                registrations.filter(r => r.status === 'pending').map((registration) => (
                  <Card key={registration.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {registration.profiles.full_name || 'No name provided'}
                          </CardTitle>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            {registration.profiles.email}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            Pending Approval
                          </Badge>
                          <Badge variant={registration.profiles.profile_completed ? "default" : "destructive"}>
                            {registration.profiles.profile_completed ? "Complete Profile" : "Incomplete"}
                          </Badge>
                          <Badge variant="outline">
                            Registered {format(new Date(registration.registered_at), 'MMM d, yyyy')}
                          </Badge>
                          <Button
                            onClick={() => handleApprove(registration)}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <User className="h-4 w-4" />
                            Contact Info
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            {registration.profiles.phone_number && (
                              <div className="flex items-center gap-2">
                                <Phone className="h-3 w-3" />
                                {registration.profiles.phone_number}
                              </div>
                            )}
                            {registration.profiles.date_of_birth && (
                              <div className="flex items-center gap-2">
                                <Calendar className="h-3 w-3" />
                                Born: {format(new Date(registration.profiles.date_of_birth), 'MMM d, yyyy')}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <GraduationCap className="h-4 w-4" />
                            Academic Background
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            {registration.profiles.college && <div><span className="font-medium">College:</span> {registration.profiles.college}</div>}
                            {registration.profiles.degree && <div><span className="font-medium">Degree:</span> {registration.profiles.degree}</div>}
                            {registration.profiles.graduation_year && <div><span className="font-medium">Graduation Year:</span> {registration.profiles.graduation_year}</div>}
                            {!registration.profiles.college && !registration.profiles.degree && !registration.profiles.graduation_year && 'Not provided'}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <Code className="h-4 w-4" />
                            Skills
                          </div>
                          <div className="space-y-2">
                            {registration.profiles.skills && registration.profiles.skills.length > 0 && (
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Skills:</div>
                                <div className="flex flex-wrap gap-1">
                                  {registration.profiles.skills.map((skill, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <Github className="h-4 w-4" />
                            Professional Links
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            {registration.profiles.github_url && (
                              <div className="flex items-center gap-2">
                                <Github className="h-3 w-3" />
                                <a href={registration.profiles.github_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                  GitHub Profile
                                </a>
                              </div>
                            )}
                            {registration.profiles.linkedin_url && (
                              <div className="flex items-center gap-2">
                                <Linkedin className="h-3 w-3" />
                                <a href={registration.profiles.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                  LinkedIn Profile
                                </a>
                              </div>
                            )}
                            {registration.profiles.leetcode_url && (
                              <div className="flex items-center gap-2">
                                <Code className="h-3 w-3" />
                                <a href={registration.profiles.leetcode_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                  LeetCode Profile
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="approved" className="space-y-4">
              {registrations.filter(r => r.status === 'approved').length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <User className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No approved registrations</h3>
                    <p className="text-muted-foreground">Approved registrations will appear here</p>
                  </CardContent>
                </Card>
              ) : (
                registrations.filter(r => r.status === 'approved').map((registration) => (
                  <Card key={registration.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {registration.profiles.full_name || 'No name provided'}
                          </CardTitle>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            {registration.profiles.email}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Approved
                          </Badge>
                          <Badge variant={registration.profiles.profile_completed ? "default" : "destructive"}>
                            {registration.profiles.profile_completed ? "Complete Profile" : "Incomplete"}
                          </Badge>
                          <Badge variant="outline">
                            Registered {format(new Date(registration.registered_at), 'MMM d, yyyy')}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <User className="h-4 w-4" />
                            Contact Info
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            {registration.profiles.phone_number && (
                              <div className="flex items-center gap-2">
                                <Phone className="h-3 w-3" />
                                {registration.profiles.phone_number}
                              </div>
                            )}
                            {registration.profiles.date_of_birth && (
                              <div className="flex items-center gap-2">
                                <Calendar className="h-3 w-3" />
                                Born: {format(new Date(registration.profiles.date_of_birth), 'MMM d, yyyy')}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <GraduationCap className="h-4 w-4" />
                            Academic Background
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            {registration.profiles.college && <div><span className="font-medium">College:</span> {registration.profiles.college}</div>}
                            {registration.profiles.degree && <div><span className="font-medium">Degree:</span> {registration.profiles.degree}</div>}
                            {registration.profiles.graduation_year && <div><span className="font-medium">Graduation Year:</span> {registration.profiles.graduation_year}</div>}
                            {!registration.profiles.college && !registration.profiles.degree && !registration.profiles.graduation_year && 'Not provided'}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <Code className="h-4 w-4" />
                            Skills
                          </div>
                          <div className="space-y-2">
                            {registration.profiles.skills && registration.profiles.skills.length > 0 && (
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Skills:</div>
                                <div className="flex flex-wrap gap-1">
                                  {registration.profiles.skills.map((skill, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-medium">
                            <Github className="h-4 w-4" />
                            Professional Links
                          </div>
                          <div className="text-sm text-muted-foreground space-y-1">
                            {registration.profiles.github_url && (
                              <div className="flex items-center gap-2">
                                <Github className="h-3 w-3" />
                                <a href={registration.profiles.github_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                  GitHub Profile
                                </a>
                              </div>
                            )}
                            {registration.profiles.linkedin_url && (
                              <div className="flex items-center gap-2">
                                <Linkedin className="h-3 w-3" />
                                <a href={registration.profiles.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                  LinkedIn Profile
                                </a>
                              </div>
                            )}
                            {registration.profiles.leetcode_url && (
                              <div className="flex items-center gap-2">
                                <Code className="h-3 w-3" />
                                <a href={registration.profiles.leetcode_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                  LeetCode Profile
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>

      <EmailComposer 
        isOpen={isEmailComposerOpen} 
        onClose={() => setIsEmailComposerOpen(false)} 
        recipients={registrations.map(reg => ({ 
          email: reg.profiles.email, 
          name: reg.profiles.full_name || 'Applicant'
        }))}
        eventName={event?.name}
      />
    </div>
  );
};

export default EventRegistrations;