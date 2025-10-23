-- Add mode and team_size fields to events table
ALTER TABLE public.events
ADD COLUMN IF NOT EXISTS mode TEXT,
ADD COLUMN IF NOT EXISTS team_size INTEGER;

-- Update existing events to have default values if needed
UPDATE public.events SET mode = 'online' WHERE mode IS NULL AND event_type = 'hackathon';
UPDATE public.events SET team_size = 4 WHERE team_size IS NULL AND event_type = 'hackathon';
