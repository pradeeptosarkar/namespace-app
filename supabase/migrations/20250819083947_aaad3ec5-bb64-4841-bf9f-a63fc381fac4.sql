-- Create enum for event types
CREATE TYPE public.event_type AS ENUM ('webinar', 'hackathon', 'meetup', 'contest');

-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  event_type public.event_type NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  venue TEXT NOT NULL,
  max_participants INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create registrations table
CREATE TABLE public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  registered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, event_id)
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Events policies (public read)
CREATE POLICY "Events are viewable by everyone" 
ON public.events FOR SELECT 
USING (true);

-- Profiles policies
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Registrations policies
CREATE POLICY "Users can view their own registrations" 
ON public.registrations FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own registrations" 
ON public.registrations FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own registrations" 
ON public.registrations FOR DELETE 
USING (auth.uid() = user_id);

-- Function to automatically create profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update timestamps function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample events
INSERT INTO public.events (name, description, event_type, date, venue, max_participants) VALUES
('React Meetup 2024', 'Join us for an exciting React meetup with industry experts', 'meetup', '2024-02-15 18:00:00+00', 'Tech Hub Downtown', 100),
('AI Hackathon', 'Build the next generation AI applications', 'hackathon', '2024-02-20 09:00:00+00', 'Innovation Center', 200),
('Web Development Webinar', 'Learn modern web development techniques', 'webinar', '2024-02-25 14:00:00+00', 'Online', 500),
('Coding Contest 2024', 'Test your coding skills in this competitive event', 'contest', '2024-03-01 10:00:00+00', 'University Auditorium', 150),
('JavaScript Workshop', 'Hands-on JavaScript workshop for beginners', 'meetup', '2024-03-05 16:00:00+00', 'Learning Lab', 50),
('Startup Pitch Contest', 'Present your startup idea to investors', 'contest', '2024-03-10 13:00:00+00', 'Business Center', 75);