-- Add short_id column to events table
ALTER TABLE public.events 
ADD COLUMN short_id TEXT UNIQUE;

-- Function to generate 8-character alphanumeric ID
CREATE OR REPLACE FUNCTION public.generate_short_id()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  chars TEXT := 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
  END LOOP;
  RETURN result;
END;
$$;

-- Function to ensure unique short_id generation
CREATE OR REPLACE FUNCTION public.generate_unique_short_id()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  new_id TEXT;
  done BOOLEAN := FALSE;
BEGIN
  WHILE NOT done LOOP
    new_id := generate_short_id();
    -- Check if this ID already exists
    IF NOT EXISTS (SELECT 1 FROM public.events WHERE short_id = new_id) THEN
      done := TRUE;
    END IF;
  END LOOP;
  RETURN new_id;
END;
$$;

-- Trigger to auto-generate short_id on insert
CREATE OR REPLACE FUNCTION public.set_event_short_id()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.short_id IS NULL THEN
    NEW.short_id := generate_unique_short_id();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER ensure_event_short_id
BEFORE INSERT ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.set_event_short_id();

-- Generate short_ids for existing events
UPDATE public.events 
SET short_id = generate_unique_short_id() 
WHERE short_id IS NULL;

-- Make short_id NOT NULL after populating existing rows
ALTER TABLE public.events 
ALTER COLUMN short_id SET NOT NULL;