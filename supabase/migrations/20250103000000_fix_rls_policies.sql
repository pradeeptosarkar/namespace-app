-- Fix RLS policies for events table to allow authenticated users to create events

-- First, ensure RLS is enabled on events table
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Drop existing policies that might be too restrictive
DROP POLICY IF EXISTS "Authenticated users can insert events" ON public.events;
DROP POLICY IF EXISTS "Authenticated users can update events" ON public.events;
DROP POLICY IF EXISTS "Authenticated users can delete events" ON public.events;

-- Create new policies that allow authenticated users to manage events
CREATE POLICY "Allow authenticated users to insert events"
ON public.events
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to update events"
ON public.events
FOR UPDATE
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to delete events"
ON public.events
FOR DELETE
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow everyone to view events"
ON public.events
FOR SELECT
USING (true);

-- Fix storage bucket policies for event banners
DROP POLICY IF EXISTS "Only authenticated users can upload event banners" ON storage.objects;
DROP POLICY IF EXISTS "Only authenticated users can update event banners" ON storage.objects;
DROP POLICY IF EXISTS "Only authenticated users can delete event banners" ON storage.objects;

CREATE POLICY "Allow authenticated users to upload event banners"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'event-banners' AND auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to update event banners"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'event-banners' AND auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to delete event banners"
ON storage.objects
FOR DELETE
USING (bucket_id = 'event-banners' AND auth.uid() IS NOT NULL);

-- Ensure the event-banners bucket exists and is public
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-banners', 'event-banners', true)
ON CONFLICT (id) DO NOTHING;
