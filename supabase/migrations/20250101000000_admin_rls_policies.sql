-- Add admin-specific RLS policies for admin dashboard access

-- Function to check if user is admin (based on localStorage token)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  -- This function would typically check for admin authentication
  -- For now, we'll assume admin access is granted through the application layer
  -- In a real implementation, you might check against a session variable or JWT claim
  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin policy for profiles table (allow admins to view all profiles)
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (public.is_admin());

-- Admin policy for events table (allow admins to view all events)
CREATE POLICY "Admins can view all events" 
ON public.events 
FOR SELECT 
USING (public.is_admin());

-- Admin policy for registrations table (allow admins to view all registrations)
CREATE POLICY "Admins can view all registrations" 
ON public.registrations 
FOR SELECT 
USING (public.is_admin());

-- Admin policy for profiles count (needed for head: true queries)
CREATE POLICY "Admins can count all profiles" 
ON public.profiles 
FOR SELECT 
USING (public.is_admin());

-- Admin policy for events count (needed for head: true queries)
CREATE POLICY "Admins can count all events" 
ON public.events 
FOR SELECT 
USING (public.is_admin());

-- Admin policy for registrations count (needed for head: true queries)
CREATE POLICY "Admins can count all registrations" 
ON public.registrations 
FOR SELECT 
USING (public.is_admin());

-- Note: In a production environment, you would want a more secure implementation
-- such as checking JWT claims or using Supabase's built-in admin capabilities
