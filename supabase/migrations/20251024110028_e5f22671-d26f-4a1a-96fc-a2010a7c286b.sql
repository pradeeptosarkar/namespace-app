-- Add require_signin column to forms table
ALTER TABLE public.forms 
ADD COLUMN require_signin BOOLEAN DEFAULT false NOT NULL;