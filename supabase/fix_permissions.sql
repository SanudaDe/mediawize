-- ==============================================================================
-- WIZEtv Studios — Database Permissions Fix
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/sqpfwjwtefhxvqcfalyf/sql/new
-- ==============================================================================

-- 1. Grant schema usage
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;

-- 2. Grant full permissions on all existing tables, sequences & functions
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO postgres, anon, authenticated, service_role;

-- 3. Set default privileges so future tables and sequences have full access
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO postgres, anon, authenticated, service_role;

-- 4. Ensure RLS allows inserting bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can create a booking request" ON public.bookings;
CREATE POLICY "Anyone can create a booking request" 
ON public.bookings 
FOR INSERT 
WITH CHECK (true);

DROP POLICY IF EXISTS "Service role full access on bookings" ON public.bookings;
CREATE POLICY "Service role full access on bookings" 
ON public.bookings 
FOR ALL 
USING (true)
WITH CHECK (true);

-- 5. Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
