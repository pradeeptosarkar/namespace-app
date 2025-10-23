-- Add approval_enabled field to events table
ALTER TABLE public.events
ADD COLUMN approval_enabled boolean DEFAULT false;

-- Add status field to registrations table
CREATE TYPE public.registration_status AS ENUM ('pending', 'approved', 'rejected');

ALTER TABLE public.registrations
ADD COLUMN status registration_status DEFAULT 'approved';

-- Update existing registrations to approved status
UPDATE public.registrations SET status = 'approved' WHERE status IS NULL;