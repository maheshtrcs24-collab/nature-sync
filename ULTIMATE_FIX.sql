-- ⚡ THE ULTIMATE FIX FOR "Add Event" ⚡
-- This changes created_by from UUID to TEXT for Clerk compatibility

-- Step 1: Change the column type
ALTER TABLE public.events 
ALTER COLUMN created_by TYPE TEXT;

-- Step 2: Verify the change worked
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'events' AND column_name = 'created_by';

-- You should see: created_by | text
