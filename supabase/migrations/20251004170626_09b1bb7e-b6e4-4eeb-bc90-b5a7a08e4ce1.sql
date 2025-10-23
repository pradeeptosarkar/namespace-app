-- Add new academic fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN college TEXT,
ADD COLUMN degree TEXT,
ADD COLUMN graduation_year INTEGER;

-- Remove old academic_info field
ALTER TABLE public.profiles 
DROP COLUMN academic_info;