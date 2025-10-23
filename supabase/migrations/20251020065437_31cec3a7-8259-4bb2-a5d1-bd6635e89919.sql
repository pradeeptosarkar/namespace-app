-- Create enum for form field types
CREATE TYPE public.form_field_type AS ENUM (
  'text',
  'email',
  'number',
  'textarea',
  'radio',
  'checkbox',
  'select',
  'date',
  'time',
  'file'
);

-- Create forms table
CREATE TABLE public.forms (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  is_published boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on forms
ALTER TABLE public.forms ENABLE ROW LEVEL SECURITY;

-- Create form fields table
CREATE TABLE public.form_fields (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  form_id uuid NOT NULL REFERENCES public.forms(id) ON DELETE CASCADE,
  field_type form_field_type NOT NULL,
  label text NOT NULL,
  placeholder text,
  required boolean DEFAULT false,
  options jsonb,
  order_index integer NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on form fields
ALTER TABLE public.form_fields ENABLE ROW LEVEL SECURITY;

-- Create form submissions table
CREATE TABLE public.form_submissions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  form_id uuid NOT NULL REFERENCES public.forms(id) ON DELETE CASCADE,
  submission_data jsonb NOT NULL,
  submitted_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on form submissions
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for forms
CREATE POLICY "Admins can manage all forms"
  ON public.forms
  FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Anyone can view published forms"
  ON public.forms
  FOR SELECT
  USING (is_published = true);

-- RLS Policies for form fields
CREATE POLICY "Admins can manage all form fields"
  ON public.form_fields
  FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Anyone can view fields of published forms"
  ON public.form_fields
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.forms
      WHERE forms.id = form_fields.form_id
      AND forms.is_published = true
    )
  );

-- RLS Policies for form submissions
CREATE POLICY "Admins can view all form submissions"
  ON public.form_submissions
  FOR SELECT
  USING (is_admin());

CREATE POLICY "Anyone can submit to published forms"
  ON public.form_submissions
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.forms
      WHERE forms.id = form_submissions.form_id
      AND forms.is_published = true
    )
  );

-- Create trigger for updating updated_at on forms
CREATE TRIGGER update_forms_updated_at
  BEFORE UPDATE ON public.forms
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();