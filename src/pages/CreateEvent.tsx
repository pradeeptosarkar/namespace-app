import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import WebinarForm from '@/components/forms/WebinarForm';
import HackathonForm from '@/components/forms/HackathonForm';
import MeetupForm from '@/components/forms/MeetupForm';
import ContestForm from '@/components/forms/ContestForm';
import BootcampForm from '@/components/forms/BootcampForm';

const CreateEvent = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const isEditMode = !!eventId;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    event_type: '' as 'webinar' | 'hackathon' | 'meetup' | 'contest' | 'bootcamp' | '',
    date: '',
    venue: '',
    max_participants: '',
    mode: '',
    team_size: '',
    approval_enabled: false,
    timezone: 'Asia/Kolkata',
    // Additional fields for different event types
    end_date: '',
    speaker: '',
    prerequisites: '',
    prizes: '',
    tech_stack: '',
    judging_criteria: '',
    duration: '',
    networking: '',
    speakers: '',
    topics: '',
    refreshments: '',
    contest_type: '',
    rules: '',
    eligibility: '',
    submission_format: ''
  });
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string>('');
  const [displayImageFile, setDisplayImageFile] = useState<File | null>(null);
  const [displayImagePreview, setDisplayImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const displayImageInputRef = useRef<HTMLInputElement>(null);
  const { isAdminAuthenticated } = useAdminAuth();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch event data if in edit mode
  useEffect(() => {
    if (isEditMode && eventId) {
      fetchEventData(eventId);
    }
  }, [eventId, isEditMode]);

  const fetchEventData = async (id: string) => {
    setFetchLoading(true);
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          name: data.name || '',
          description: data.description || '',
          event_type: data.event_type || '',
          date: data.date ? new Date(data.date).toISOString().slice(0, 16) : '',
          venue: data.venue || '',
          max_participants: data.max_participants?.toString() || '',
          mode: data.mode || '',
          team_size: data.team_size?.toString() || '',
          approval_enabled: data.approval_enabled || false,
          timezone: data.timezone || 'Asia/Kolkata',
          end_date: data.end_date ? new Date(data.end_date).toISOString().slice(0, 16) : '',
          speaker: data.speaker || '',
          prerequisites: data.prerequisites || '',
          prizes: data.prizes || '',
          tech_stack: Array.isArray(data.tech_stack) ? data.tech_stack.join(', ') : '',
          judging_criteria: data.judging_criteria || '',
          duration: data.duration?.toString() || '',
          networking: data.networking || '',
          speakers: Array.isArray(data.speakers) ? data.speakers.join(', ') : '',
          topics: Array.isArray(data.topics) ? data.topics.join(', ') : '',
          refreshments: data.refreshments || '',
          contest_type: data.contest_type || '',
          rules: data.rules || '',
          eligibility: data.eligibility || '',
          submission_format: data.submission_format || ''
        });

        if (data.banner_url) {
          setBannerPreview(data.banner_url);
        }
        
        if (data.display_image_url) {
          setDisplayImagePreview(data.display_image_url);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch event data",
        variant: "destructive",
      });
      navigate('/admin/events');
    } finally {
      setFetchLoading(false);
    }
  };

  if (!isAdminAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      const previewUrl = URL.createObjectURL(file);
      setBannerPreview(previewUrl);
    }
  };

  const handleDisplayImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDisplayImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setDisplayImagePreview(previewUrl);
    }
  };

  const removeBanner = () => {
    setBannerFile(null);
    setBannerPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeDisplayImage = () => {
    setDisplayImageFile(null);
    setDisplayImagePreview('');
    if (displayImageInputRef.current) {
      displayImageInputRef.current.value = '';
    }
  };

  const uploadBanner = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `banners/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('event-banners')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('event-banners')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading banner:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let banner_url = bannerPreview; // Keep existing banner if no new file
      let display_image_url = displayImagePreview; // Keep existing display image if no new file

      if (bannerFile) {
        const uploadedUrl = await uploadBanner(bannerFile);
        if (uploadedUrl) {
          banner_url = uploadedUrl;
        }
      }

      if (displayImageFile) {
        const uploadedDisplayImageUrl = await uploadBanner(displayImageFile); // Using same upload function
        if (uploadedDisplayImageUrl) {
          display_image_url = uploadedDisplayImageUrl;
        }
      }

      // Create additional data object for event-specific fields
      const additionalData = {
        ...(formData.end_date && { end_date: formData.end_date }),
        ...(formData.speaker && { speaker: formData.speaker }),
        ...(formData.prerequisites && { prerequisites: formData.prerequisites }),
        ...(formData.team_size && { team_size: parseInt(formData.team_size) }),
        ...(formData.prizes && { prizes: formData.prizes }),
        ...(formData.tech_stack && { tech_stack: formData.tech_stack }),
        ...(formData.judging_criteria && { judging_criteria: formData.judging_criteria }),
        ...(formData.duration && { duration: parseFloat(formData.duration) }),
        ...(formData.networking && { networking: formData.networking }),
        ...(formData.speakers && { speakers: formData.speakers }),
        ...(formData.topics && { topics: formData.topics }),
        ...(formData.refreshments && { refreshments: formData.refreshments }),
        ...(formData.contest_type && { contest_type: formData.contest_type }),
        ...(formData.rules && { rules: formData.rules }),
        ...(formData.eligibility && { eligibility: formData.eligibility }),
        ...(formData.submission_format && { submission_format: formData.submission_format })
      };

      const eventData = {
        name: formData.name,
        description: formData.description,
        event_type: formData.event_type as 'webinar' | 'hackathon' | 'meetup' | 'contest' | 'bootcamp',
        date: formData.date,
        venue: formData.venue || (formData.mode === 'online' ? 'Online' : ''),
        max_participants: formData.max_participants ? parseInt(formData.max_participants) : null,
        mode: formData.mode || null,
        team_size: formData.team_size ? parseInt(formData.team_size) : null,
        approval_enabled: formData.approval_enabled,
        timezone: formData.timezone,
        banner_url: banner_url || null,
        display_image_url: display_image_url || null,
        end_date: formData.end_date || null,
        speaker: formData.speaker || null,
        prerequisites: formData.prerequisites || null,
        prizes: formData.prizes || null,
        tech_stack: formData.tech_stack ? formData.tech_stack.split(',').map(s => s.trim()) : null,
        judging_criteria: formData.judging_criteria || null,
        duration: formData.duration ? parseFloat(formData.duration) : null,
        networking: formData.networking || null,
        speakers: formData.speakers ? formData.speakers.split(',').map(s => s.trim()) : null,
        topics: formData.topics ? formData.topics.split(',').map(s => s.trim()) : null,
        refreshments: formData.refreshments || null,
        contest_type: formData.contest_type || null,
        rules: formData.rules || null,
        eligibility: formData.eligibility || null,
        submission_format: formData.submission_format || null
      };

      let error;
      if (isEditMode && eventId) {
        // Update existing event
        const { error: updateError } = await supabase
          .from('events')
          .update(eventData)
          .eq('id', eventId);
        error = updateError;
      } else {
        // Create new event
        const { error: insertError } = await supabase
          .from('events')
          .insert([eventData]);
        error = insertError;
      }

      if (error) throw error;

      toast({
        title: "Success",
        description: isEditMode ? "Event updated successfully" : "Event created successfully",
      });

      navigate('/admin/events');
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEditMode ? 'update' : 'create'} event`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-background relative flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
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
          <h1 className="text-2xl font-bold">
            {isEditMode ? 'Edit Event' : 'Create New Event'}
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl relative z-10">
        <Card>
          <CardHeader>
            <CardTitle>{isEditMode ? 'Edit Event Details' : 'Event Details'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="event_type">Event Type</Label>
                <Select value={formData.event_type} onValueChange={(value: 'webinar' | 'hackathon' | 'meetup' | 'contest' | 'bootcamp') => setFormData(prev => ({ ...prev, event_type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type first" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="webinar">Webinar</SelectItem>
                    <SelectItem value="hackathon">Hackathon</SelectItem>
                    <SelectItem value="meetup">Meetup</SelectItem>
                    <SelectItem value="contest">Contest</SelectItem>
                    <SelectItem value="bootcamp">Bootcamp</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="approval_enabled"
                  checked={formData.approval_enabled}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, approval_enabled: checked as boolean }))}
                />
                <Label htmlFor="approval_enabled" className="cursor-pointer">
                  Require approval for registrations
                </Label>
              </div>

              {formData.event_type && (
                <>
                  {formData.event_type === 'webinar' && (
                    <WebinarForm 
                      formData={formData} 
                      onInputChange={handleInputChange}
                      onSelectChange={handleSelectChange}
                      bannerFile={bannerFile}
                      bannerPreview={bannerPreview}
                      displayImageFile={displayImageFile}
                      displayImagePreview={displayImagePreview}
                      fileInputRef={fileInputRef}
                      displayImageInputRef={displayImageInputRef}
                      onBannerSelect={handleFileSelect}
                      onDisplayImageSelect={handleDisplayImageSelect}
                      onRemoveBanner={removeBanner}
                      onRemoveDisplayImage={removeDisplayImage}
                    />
                  )}
                  {formData.event_type === 'hackathon' && (
                    <HackathonForm formData={formData} onInputChange={handleInputChange} onSelectChange={handleSelectChange} />
                  )}
                  {formData.event_type === 'meetup' && (
                    <MeetupForm formData={formData} onInputChange={handleInputChange} onSelectChange={handleSelectChange} />
                  )}
                  {formData.event_type === 'contest' && (
                    <ContestForm formData={formData} onInputChange={handleInputChange} onSelectChange={handleSelectChange} />
                  )}
                  {formData.event_type === 'bootcamp' && (
                    <BootcampForm formData={formData} onInputChange={handleInputChange} onSelectChange={handleSelectChange} />
                  )}
                </>
              )}

              {formData.event_type !== 'webinar' && (
                <div className="space-y-2">
                  <Label>Event Banner</Label>
                  <div className="space-y-4">
                    {bannerPreview ? (
                      <div className="relative">
                        <img
                          src={bannerPreview}
                          alt="Banner preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={removeBanner}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">Click to upload event banner</p>
                        <p className="text-sm text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin/events')}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Event' : 'Create Event')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateEvent;