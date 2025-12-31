import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Init Supabase
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase Config');
}

const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
    res.send('Nature Sync Backend is Running!');
});

// GET Events
app.get('/api/events', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST Event
app.post('/api/events', async (req, res) => {
    const { title, date, time, location, category, description, spots_total, image_url, user_id } = req.body;
    try {
        const { data, error } = await supabase
            .from('events')
            .insert([{
                title, date, time, location, category, description, spots_total, image_url,
                created_by: user_id || null
            }])
            .select();
        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Export for Vercel
export default app;

// Local Start
if (!process.env.VERCEL) {
    app.listen(port, () => {
        console.log(`Backend running on port ${port}`);
    });
}
