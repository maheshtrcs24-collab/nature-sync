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

// POST /api/events/:id/join - Join an event
app.post('/api/events/:id/join', ClerkExpressWithAuth(), async (req, res) => {
    if (!req.auth.userId) return res.status(401).json({ error: 'Unauthenticated' });

    const eventId = req.params.id;
    const userId = req.auth.userId;

    try {
        // 1. Check if already joined
        const { data: existing } = await supabase
            .from('registrations')
            .select('*')
            .eq('event_id', eventId)
            .eq('user_id', userId)
            .single();

        if (existing) return res.status(400).json({ error: 'Already joined this event' });

        // 2. Register
        const { error: regError } = await supabase
            .from('registrations')
            .insert([{ event_id: eventId, user_id: userId }]);

        if (regError) throw regError;

        // 3. Update spots_taken (Atomic-like)
        const { data: event, error: fetchError } = await supabase
            .from('events')
            .select('spots_total, spots_taken')
            .eq('id', eventId)
            .single();

        if (fetchError || !event) throw new Error('Event not found');

        const currentTaken = event.spots_taken || 0;
        if (currentTaken >= event.spots_total) {
            return res.status(400).json({ error: 'No spots available' });
        }

        const { error: updateError } = await supabase
            .from('events')
            .update({ spots_taken: currentTaken + 1 })
            .eq('id', eventId);

        if (updateError) throw updateError;

        res.status(200).json({ message: 'Success' });
    } catch (err) {
        console.error('Join error:', err);
        res.status(500).json({ error: err.message });
    }
});

// GET /api/user/events - Fetch events joined by current user
app.get('/api/user/events', ClerkExpressWithAuth(), async (req, res) => {
    if (!req.auth.userId) return res.status(401).json({ error: 'Unauthenticated' });

    try {
        const { data: regs, error } = await supabase
            .from('registrations')
            .select('event_id')
            .eq('user_id', req.auth.userId);

        if (error) throw error;
        if (!regs || regs.length === 0) return res.json([]);

        const eventIds = regs.map(r => r.event_id);
        const { data: events, error: eventError } = await supabase
            .from('events')
            .select('*')
            .in('id', eventIds);

        if (eventError) throw eventError;
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
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
