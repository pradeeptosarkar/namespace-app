-- Add UTM tracking to registrations table
ALTER TABLE public.registrations 
ADD COLUMN utm_source UUID REFERENCES auth.users(id);

-- Create index for better performance on UTM queries
CREATE INDEX idx_registrations_utm_source ON public.registrations(utm_source);

-- Create a view for leaderboard data
CREATE VIEW registration_leaderboard AS
SELECT 
  utm_source,
  p.full_name as referrer_name,
  COUNT(*) as referral_count,
  event_id,
  e.name as event_name
FROM registrations r
LEFT JOIN profiles p ON r.utm_source = p.id  
LEFT JOIN events e ON r.event_id = e.id
WHERE utm_source IS NOT NULL
GROUP BY utm_source, p.full_name, event_id, e.name
ORDER BY referral_count DESC;