-- Add display_image_url column to events table for webinar display images
ALTER TABLE public.events 
ADD COLUMN display_image_url TEXT;