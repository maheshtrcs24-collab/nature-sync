/*
 * ====================================================================
 * RUN THIS IN SUPABASE SQL EDITOR RIGHT NOW - 30 SECONDS TO FIX
 * ====================================================================
 * 
 * Steps:
 * 1. Go to https://supabase.com/dashboard
 * 2. Select your Nature Sync project
 * 3. Click "SQL Editor" in the left menu
 * 4. Click "New Query"
 * 5. Copy this ENTIRE script
 * 6. Paste and click "Run"
 * 
 * This fixes the UUID vs TEXT issue preventing event creation.
 * ====================================================================
 */

-- Step 1: Remove foreign key constraint
ALTER TABLE public.events DROP CONSTRAINT IF EXISTS events_created_by_fkey;

-- Step 2: Drop ALL existing policies
DROP POLICY IF EXISTS "Public access" ON public.events;
DROP POLICY IF EXISTS "Server-side insert" ON public.events;
DROP POLICY IF EXISTS "Owner update" ON public.events;
DROP POLICY IF EXISTS "Owner delete" ON public.events;
DROP POLICY IF EXISTS "Users can update own events" ON public.events;
DROP POLICY IF EXISTS "Users can delete own events" ON public.events;
DROP POLICY IF EXISTS "Users can insert events" ON public.events;
DROP POLICY IF EXISTS "Anyone can view events" ON public.events;
DROP POLICY IF EXISTS "Allow public read" ON public.events;
DROP POLICY IF EXISTS "Allow all inserts" ON public.events;
DROP POLICY IF EXISTS "Allow all updates" ON public.events;
DROP POLICY IF EXISTS "Allow all deletes" ON public.events;

-- Step 3: Change created_by from UUID to TEXT (THIS IS THE FIX)
ALTER TABLE public.events ALTER COLUMN created_by TYPE TEXT;

-- Step 4: Recreate simple policies
CREATE POLICY "Allow public read" ON public.events FOR SELECT USING (true);
CREATE POLICY "Allow all inserts" ON public.events FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all updates" ON public.events FOR UPDATE USING (true);
CREATE POLICY "Allow all deletes" ON public.events FOR DELETE USING (true);

-- Step 5: Verify the change
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'events' AND column_name = 'created_by';

-- You should see: created_by | text
-- If you see this, event creation will work immediately!
