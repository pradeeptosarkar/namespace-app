-- Add additional columns to events table for event-specific data
ALTER TABLE public.events 
ADD COLUMN IF NOT EXISTS end_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS speaker TEXT,
ADD COLUMN IF NOT EXISTS prerequisites TEXT,
ADD COLUMN IF NOT EXISTS prizes TEXT,
ADD COLUMN IF NOT EXISTS tech_stack TEXT[],
ADD COLUMN IF NOT EXISTS judging_criteria TEXT,
ADD COLUMN IF NOT EXISTS duration NUMERIC,
ADD COLUMN IF NOT EXISTS networking TEXT,
ADD COLUMN IF NOT EXISTS speakers TEXT[],
ADD COLUMN IF NOT EXISTS topics TEXT[],
ADD COLUMN IF NOT EXISTS refreshments TEXT,
ADD COLUMN IF NOT EXISTS contest_type TEXT,
ADD COLUMN IF NOT EXISTS rules TEXT,
ADD COLUMN IF NOT EXISTS eligibility TEXT,
ADD COLUMN IF NOT EXISTS submission_format TEXT;

-- Create index on event_type for better performance
CREATE INDEX IF NOT EXISTS idx_events_event_type ON public.events(event_type);

-- Create index on date for better performance
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(date);

-- Update the existing events if any have JSON data in description that should be moved to new columns
-- (This is a one-time migration to clean up existing data)