import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
// Note: Vercel provides port 3000 or handles it. locally we can default 5000.
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase Client
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL; // Fallback for shared env vars
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key in .env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- Routes ---

app.get('/*', (req, res, next) => {
    // Vercel sometimes passes the full path including /api
    // We want to handle routes relative to where express thinks it is.
    // However, if we mount at /api, let's keep it simple.
    next();
});

// GET /api/events - Fetch all events
app.get('/api/events', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (err) {
        console.error('Error fetching events:', err);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

// POST /api/events - Create a new event
app.post('/api/events', async (req, res) => {
    const { title, date, time, location, category, description, spots_total, image_url, user_id } = req.body;

    // user_id is optional for anonymous

    try {
        const { data, error } = await supabase
            .from('events')
            .insert([
                {
                    title, date, time, location, category, description, spots_total, image_url,
                    created_by: user_id || null,
                }
            ])
            .select();

        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (err) {
        console.error('Error creating event:', err);
        res.status(500).json({ error: 'Failed to create event' });
    }
});

// Root handler for health check
app.get('/api', (req, res) => {
    res.send('Nature Sync API is running!');
});

// Export the app for Vercel
export default app;

// Start Server locally
// In ESM, import.meta.url check is a bit verbose, so we just check if PROD/VERCEL env is missing
if (!process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`Server running locally on port ${port}`);
    });
}
