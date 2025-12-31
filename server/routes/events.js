const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// Get all events
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .order('date', { ascending: true });

        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create new event
router.post('/', async (req, res) => {
    try {
        const { title, description, date, location, category, organizer_id, image_url } = req.body;
        const { data, error } = await supabase
            .from('events')
            .insert([{ title, description, date, location, category, organizer_id, image_url }])
            .select();

        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
