import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';


interface FormField {
  id: string;
  field_type: string;
  label: string;
  placeholder: string | null;
  required: boolean;
  options: string[] | null;
  order_index: number;
}

interface Form {
  id: string;
  title: string;
  description: string | null;
  require_signin: boolean;
}

const PublicFormView = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  const [form, setForm] = useState<Form | null>(null);
  const [fields, setFields] = useState<FormField[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadForm();
  }, [formId]);

  const loadForm = async () => {
    try {
      const { data: formData, error: formError } = await supabase
        .from('forms')
        .select('*')
        .eq('id', formId)
        .eq('is_published', true)
        .single();

      if (formError) throw formError;

      const { data: fieldsData, error: fieldsError } = await supabase
        .from('form_fields')
        .select('*')
        .eq('form_id', formId)
        .order('order_index');

      if (fieldsError) throw fieldsError;

      setForm(formData);
      setFields((fieldsData || []).map(f => ({
        ...f,
        options: Array.isArray(f.options) ? f.options as string[] : null
      })));
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Form not found or not published",
        variant: "destructive",
      });
      navigate('/forms');
    } finally {
      setLoading(false);
    }
  };

  const handleSignInClick = () => {
    localStorage.setItem('authRedirectUrl', location.pathname);
    navigate('/auth');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if form requires sign-in
    if (form?.require_signin && !user) {
      handleSignInClick();
      return;
    }

    // Validate required fields
    const missingFields = fields
      .filter(field => field.required && !formData[field.id])
      .map(field => field.label);

    if (missingFields.length > 0) {
      toast({
        title: "Missing Required Fields",
        description: `Please fill in: ${missingFields.join(', ')}`,
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('form_submissions')
        .insert({
          form_id: formId,
          submission_data: formData,
        });

      if (error) throw error;

      setSubmitted(true);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const updateValue = (value: any) => {
      setFormData({ ...formData, [field.id]: value });
    };

    switch (field.field_type) {
      case 'textarea':
        return (
          <Textarea
            placeholder={field.placeholder || ''}
            value={formData[field.id] || ''}
            onChange={(e) => updateValue(e.target.value)}
            required={field.required}
          />
        );

      case 'email':
        return (
          <Input
            type="email"
            placeholder={field.placeholder || ''}
            value={formData[field.id] || ''}
            onChange={(e) => updateValue(e.target.value)}
            required={field.required}
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            placeholder={field.placeholder || ''}
            value={formData[field.id] || ''}
            onChange={(e) => updateValue(e.target.value)}
            required={field.required}
          />
        );

      case 'date':
        return (
          <Input
            type="date"
            value={formData[field.id] || ''}
            onChange={(e) => updateValue(e.target.value)}
            required={field.required}
          />
        );

      case 'time':
        return (
          <Input
            type="time"
            value={formData[field.id] || ''}
            onChange={(e) => updateValue(e.target.value)}
            required={field.required}
          />
        );

      case 'radio':
        return (
          <RadioGroup
            value={formData[field.id] || ''}
            onValueChange={updateValue}
            required={field.required}
          >
            {field.options?.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${field.id}-${idx}`} />
                <Label htmlFor={`${field.id}-${idx}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <Checkbox
                  id={`${field.id}-${idx}`}
                  checked={formData[field.id]?.includes(option) || false}
                  onCheckedChange={(checked) => {
                    const current = formData[field.id] || [];
                    if (checked) {
                      updateValue([...current, option]);
                    } else {
                      updateValue(current.filter((v: string) => v !== option));
                    }
                  }}
                />
                <Label htmlFor={`${field.id}-${idx}`}>{option}</Label>
              </div>
            ))}
          </div>
        );

      case 'select':
        return (
          <Select
            value={formData[field.id] || ''}
            onValueChange={updateValue}
            required={field.required}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || 'Select an option'} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, idx) => (
                <SelectItem key={idx} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      default:
        return (
          <Input
            type="text"
            placeholder={field.placeholder || ''}
            value={formData[field.id] || ''}
            onChange={(e) => updateValue(e.target.value)}
            required={field.required}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading form...</p>
      </div>
    );
  }

  if (!form) return null;

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Thank You!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Thank you for filling out the form. Your response has been submitted successfully.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{form.title}</CardTitle>
            {form.description && (
              <CardDescription className="text-base">{form.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label>
                    {field.label}
                    {field.required && <span className="text-destructive ml-1">*</span>}
                  </Label>
                  {renderField(field)}
                </div>
              ))}

              <Button type="submit" disabled={submitting} className="w-full">
                {form?.require_signin && !user 
                  ? 'Sign in to submit' 
                  : submitting 
                    ? 'Submitting...' 
                    : 'Submit Form'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PublicFormView;
