-- Update RLS policy for form submissions to respect require_signin
DROP POLICY IF EXISTS "Anyone can submit to published forms" ON public.form_submissions;

-- Allow submissions only if form is published AND (doesn't require signin OR user is authenticated)
CREATE POLICY "Submit to published forms with auth check"
ON public.form_submissions
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM forms
    WHERE forms.id = form_submissions.form_id 
      AND forms.is_published = true
      AND (forms.require_signin = false OR auth.uid() IS NOT NULL)
  )
);