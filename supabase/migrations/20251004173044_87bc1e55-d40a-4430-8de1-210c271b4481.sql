-- Update profile_completed flag for all existing profiles based on current requirements
UPDATE public.profiles
SET profile_completed = (
  full_name IS NOT NULL AND full_name != '' AND
  phone_number IS NOT NULL AND phone_number != '' AND
  date_of_birth IS NOT NULL AND
  college IS NOT NULL AND college != '' AND
  degree IS NOT NULL AND degree != '' AND
  graduation_year IS NOT NULL AND
  skills IS NOT NULL AND array_length(skills, 1) > 0 AND
  github_url IS NOT NULL AND github_url != '' AND
  linkedin_url IS NOT NULL AND linkedin_url != '' AND
  leetcode_url IS NOT NULL AND leetcode_url != ''
)
WHERE profile_completed = true OR profile_completed IS NULL;