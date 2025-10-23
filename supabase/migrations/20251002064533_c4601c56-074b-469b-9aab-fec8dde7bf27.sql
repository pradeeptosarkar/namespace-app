-- Add social/professional links to profiles table
ALTER TABLE public.profiles
ADD COLUMN github_url text,
ADD COLUMN linkedin_url text,
ADD COLUMN leetcode_url text;