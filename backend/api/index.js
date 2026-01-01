import express from 'express'; // Deployment trigger: Clerk Integration v1.0.1
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Clerk Configuration
const clerkSecretKey = "sk_test_0gApAPC8ABDP7gq2e0QTorulBJy2JllYoGrIS5qdsM";
process.env.CLERK_SECRET_KEY = clerkSecretKey;


// Supabase Init
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('CRITICAL: Missing Supabase credentials in environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- ROUTES ---

// Health check / Root
app.get('/', (req, res) => {
    res.send('Nature Sync Backend is Running! 🌿');
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

// POST /api/events - Create an event (Protected by Clerk)
app.post('/api/events', ClerkExpressWithAuth(), async (req, res) => {
    if (!req.auth.userId) {
        return res.status(401).json({ error: 'Unauthenticated' });
    }

    const { title, date, time, location, category, description, spots_total, image_url } = req.body;

    try {
        const { data, error } = await supabase
            .from('events')
            .insert([
                {
                    title, date, time, location, category, description, spots_total, image_url,
                    created_by: req.auth.userId
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

// Export for Vercel
export default app;

// Local development listener
if (!process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`Server running locally at http://localhost:${port}`);
    });
}
