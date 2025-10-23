-- Fix security definer view issue
DROP VIEW IF EXISTS registration_leaderboard;

-- Create a safer view for leaderboard data without security definer
CREATE VIEW registration_leaderboard AS
SELECT 
  r.utm_source,
  p.full_name as referrer_name,
  COUNT(*) as referral_count,
  r.event_id,
  e.name as event_name
FROM public.registrations r
LEFT JOIN public.profiles p ON r.utm_source = p.id  
LEFT JOIN public.events e ON r.event_id = e.id
WHERE r.utm_source IS NOT NULL
GROUP BY r.utm_source, p.full_name, r.event_id, e.name
ORDER BY referral_count DESC;

-- Add RLS policy for the leaderboard view access
CREATE POLICY "Anyone can view leaderboard data" 
ON public.registrations 
FOR SELECT 
USING (utm_source IS NOT NULL);