-- Add timezone column to events table
ALTER TABLE public.events 
ADD COLUMN timezone text DEFAULT 'Asia/Kolkata';

COMMENT ON COLUMN public.events.timezone IS 'IANA timezone identifier for the event';