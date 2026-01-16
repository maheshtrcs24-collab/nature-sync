/*
 * ====================================================================
 * RUN THIS IN SUPABASE SQL EDITOR TO FIX EVENT DELETION
 * ====================================================================
 * 
 * Problem: Deleting an event fails because 'registrations' still point to it.
 * Fix: Change the foreign key to CASCADE delete (delete registrations when event is deleted).
 * 
 * Steps:
 * 1. Go to https://supabase.com/dashboard
 * 2. Select your project -> SQL Editor -> New Query
 * 3. Copy/Paste this script
 * 4. Click Run
 */

-- 1. Drop the existing foreign key constraint (the name usually follows this pattern, 
--    but we'll try to catch it even if named differently by recreating it properly)
ALTER TABLE public.registrations
DROP CONSTRAINT IF EXISTS registrations_event_id_fkey;

-- 2. Add the foreign key back with ON DELETE CASCADE
ALTER TABLE public.registrations
ADD CONSTRAINT registrations_event_id_fkey
FOREIGN KEY (event_id)
REFERENCES public.events(id)
ON DELETE CASCADE;

-- 3. Verify it worked (Optional)
-- This just checks if the constraint exists
SELECT constraint_name, delete_rule 
FROM information_schema.referential_constraints 
WHERE constraint_name = 'registrations_event_id_fkey';
