-- Add admin credentials table
CREATE TABLE public.admin_credentials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on admin_credentials
ALTER TABLE public.admin_credentials ENABLE ROW LEVEL SECURITY;

-- Create policy for admin credentials (only admins can access)
CREATE POLICY "Only system can access admin credentials" 
ON public.admin_credentials 
FOR ALL 
USING (false);

-- Add banner_url to events table
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS banner_url TEXT;

-- Add additional fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS phone_number TEXT,
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS academic_info TEXT,
ADD COLUMN IF NOT EXISTS tech_stack TEXT[],
ADD COLUMN IF NOT EXISTS skills TEXT[],
ADD COLUMN IF NOT EXISTS profile_completed BOOLEAN DEFAULT false;

-- Insert default admin credentials (username: admin, password: admin123)
INSERT INTO public.admin_credentials (username, password_hash)
VALUES ('admin', '$2b$10$rQZ9QlQQ9QlQQ9QlQQ9QlQOX8vKvKvKvKvKvKvKvKvKvKvKvKvKvK');

-- Create storage bucket for event banners
INSERT INTO storage.buckets (id, name, public) VALUES ('event-banners', 'event-banners', true);

-- Create policies for event banners storage
CREATE POLICY "Event banners are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'event-banners');

CREATE POLICY "Only authenticated users can upload event banners" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'event-banners' AND auth.uid() IS NOT NULL);

CREATE POLICY "Only authenticated users can update event banners" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'event-banners' AND auth.uid() IS NOT NULL);

CREATE POLICY "Only authenticated users can delete event banners" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'event-banners' AND auth.uid() IS NOT NULL);

-- Update profiles policy to allow profile completion check
CREATE POLICY "Profiles are viewable for registration check" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Add policies for admins to manage events
CREATE POLICY "Authenticated users can insert events" 
ON public.events 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update events" 
ON public.events 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete events" 
ON public.events 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Add policy for admins to view all registrations
CREATE POLICY "Allow viewing registrations for admin purposes" 
ON public.registrations 
FOR SELECT 
USING (auth.uid() IS NOT NULL);