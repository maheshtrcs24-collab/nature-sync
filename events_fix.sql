-- 1. Ensure the events table exists with the correct structure
CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    title TEXT NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    category TEXT NOT NULL,
    spots_total INTEGER NOT NULL DEFAULT 10,
    spots_taken INTEGER NOT NULL DEFAULT 0,
    image_url TEXT,
    created_by TEXT NOT NULL -- Must be TEXT for Clerk user_... IDs
);

-- 2. If the table already exists, ensure created_by is TEXT (not UUID)
-- This is the most common cause of "Add Event" failures.
DO $$ 
BEGIN 
    ALTER TABLE public.events ALTER COLUMN created_by TYPE TEXT;
EXCEPTION 
    WHEN others THEN 
        RAISE NOTICE 'Column created_by already corrected or other issue.';
END $$;

-- 3. Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- 4. Policies
-- Allow anyone to see events
DROP POLICY IF EXISTS "Public access" ON public.events;
CREATE POLICY "Public access" ON public.events FOR SELECT USING (true);

-- Allow authenticated inserts (Backend will handle Clerk auth)
DROP POLICY IF EXISTS "Server-side insert" ON public.events;
CREATE POLICY "Server-side insert" ON public.events FOR INSERT WITH CHECK (true);

-- Allow owners to update
DROP POLICY IF EXISTS "Owner update" ON public.events;
CREATE POLICY "Owner update" ON public.events FOR UPDATE USING (true);

-- Allow owners to delete
DROP POLICY IF EXISTS "Owner delete" ON public.events;
CREATE POLICY "Owner delete" ON public.events FOR DELETE USING (true);
