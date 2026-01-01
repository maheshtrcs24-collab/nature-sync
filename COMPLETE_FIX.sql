-- ⚡ THE COMPLETE ULTIMATUM FIX ⚡
-- This removes RLS policies, changes created_by to TEXT, then recreates simple policies

-- Step 1: Drop ALL existing policies on events table
DROP POLICY IF EXISTS "Public access" ON public.events;
DROP POLICY IF EXISTS "Server-side insert" ON public.events;
DROP POLICY IF EXISTS "Owner update" ON public.events;
DROP POLICY IF EXISTS "Owner delete" ON public.events;
DROP POLICY IF EXISTS "Users can update own events" ON public.events;
DROP POLICY IF EXISTS "Users can delete own events" ON public.events;
DROP POLICY IF EXISTS "Users can insert events" ON public.events;
DROP POLICY IF EXISTS "Anyone can view events" ON public.events;

-- Step 2: Change the column type to TEXT (for Clerk user IDs)
ALTER TABLE public.events ALTER COLUMN created_by TYPE TEXT;

-- Step 3: Create simple permissive policies (backend handles Clerk auth)
CREATE POLICY "Allow public read" ON public.events FOR SELECT USING (true);
CREATE POLICY "Allow all inserts" ON public.events FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all updates" ON public.events FOR UPDATE USING (true);
CREATE POLICY "Allow all deletes" ON public.events FOR DELETE USING (true);

-- Step 4: Verify the change
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'events' AND column_name = 'created_by';

-- Success! You should see: created_by | text
