-- Enforce pending status for approval-enabled events and allow admin updates

-- 1) Trigger: set status based on event.approval_enabled
CREATE OR REPLACE FUNCTION public.set_registration_status_based_on_event()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  approval_required boolean;
BEGIN
  SELECT e.approval_enabled INTO approval_required
  FROM public.events e
  WHERE e.id = NEW.event_id;

  IF approval_required IS TRUE THEN
    NEW.status := 'pending'::public.registration_status;
  ELSE
    NEW.status := 'approved'::public.registration_status;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_set_registration_status ON public.registrations;

CREATE TRIGGER trg_set_registration_status
BEFORE INSERT ON public.registrations
FOR EACH ROW
EXECUTE FUNCTION public.set_registration_status_based_on_event();

-- 2) RLS: allow admins to update registrations (approve/reject)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'registrations' AND policyname = 'Admins can update registrations'
  ) THEN
    CREATE POLICY "Admins can update registrations"
    ON public.registrations
    FOR UPDATE
    USING (public.is_admin())
    WITH CHECK (public.is_admin());
  END IF;
END$$;
