-- Fix RLS policies to allow admin operations
-- This allows both regular authenticated users and admin users to manage events

-- Create a function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin_user()
RETURNS BOOLEAN AS $$
BEGIN
  -- For now, allow all authenticated users to create events
  -- In production, you might want to check against an admin_users table
  RETURN auth.uid() IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update events policies to use the admin check
DROP POLICY IF EXISTS "Allow authenticated users to insert events" ON public.events;
DROP POLICY IF EXISTS "Allow authenticated users to update events" ON public.events;
DROP POLICY IF EXISTS "Allow authenticated users to delete events" ON public.events;
DROP POLICY IF EXISTS "Allow everyone to view events" ON public.events;

-- Allow anyone to view events
CREATE POLICY "Allow everyone to view events"
ON public.events
FOR SELECT
USING (true);

-- Allow authenticated users (including admins) to manage events
CREATE POLICY "Allow users to manage events"
ON public.events
FOR ALL
USING (is_admin_user())
WITH CHECK (is_admin_user());

-- Fix storage policies for event banners
DROP POLICY IF EXISTS "Allow authenticated users to upload event banners" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update event banners" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete event banners" ON storage.objects;
DROP POLICY IF EXISTS "Event banners are publicly accessible" ON storage.objects;

-- Allow public access to view banners
CREATE POLICY "Event banners are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'event-banners');

-- Allow authenticated users to manage banners
CREATE POLICY "Allow users to manage event banners"
ON storage.objects
FOR ALL
USING (bucket_id = 'event-banners' AND is_admin_user())
WITH CHECK (bucket_id = 'event-banners' AND is_admin_user());
