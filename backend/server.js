const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key in .env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- Routes ---

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

    if (!user_id) {
        return res.status(401).json({ error: 'User ID is required' });
    }

    try {
        // Note: In a real app, you'd verify a JWT token here.
        // For now, we trust the client sending the user_id (for simplicity in this migration).

        const { data, error } = await supabase
            .from('events')
            .insert([
                {
                    title, date, time, location, category, description, spots_total, image_url,
                    created_by: user_id,
                    // spots_taken defaults to 0 in DB
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

// Start Server (only if not running as a Vercel function)
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

module.exports = app;
