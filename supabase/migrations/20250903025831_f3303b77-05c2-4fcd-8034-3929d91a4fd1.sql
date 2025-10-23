-- Drop and recreate the view without security definer to fix security issue
DROP VIEW IF EXISTS public.registration_leaderboard;

-- Create a secure view that automatically calculates leaderboard data from registrations
CREATE VIEW public.registration_leaderboard 
WITH (security_invoker = true) AS
SELECT 
    r.utm_source,
    p.full_name as referrer_name,
    e.id as event_id,
    e.name as event_name,
    COUNT(*) as referral_count
FROM public.registrations r
JOIN public.profiles p ON r.utm_source = p.id  
JOIN public.events e ON r.event_id = e.id
WHERE r.utm_source IS NOT NULL
GROUP BY r.utm_source, p.full_name, e.id, e.name
ORDER BY referral_count DESC;