const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// Register for an event
router.post('/', async (req, res) => {
    try {
        const { user_id, event_id } = req.body;

        // Check if already registered
        const { data: existing, error: checkError } = await supabase
            .from('registrations')
            .select('*')
            .eq('user_id', user_id)
            .eq('event_id', event_id);

        if (checkError) throw checkError;
        if (existing && existing.length > 0) {
            return res.status(400).json({ error: 'Already registered for this event' });
        }

        const { data, error } = await supabase
            .from('registrations')
            .insert([{ user_id, event_id, status: 'registered' }])
            .select();

        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user's registrations
router.get('/:userId', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('registrations')
            .select('*, events(*)')
            .eq('user_id', req.params.userId);

        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
