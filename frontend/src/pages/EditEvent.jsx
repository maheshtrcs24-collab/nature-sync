import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { API_URL } from '../lib/api';
import { useAuth } from '@clerk/clerk-react';

const EditEvent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isLoaded, userId, getToken } = useAuth();

    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        category: 'Conservation',
        description: '',
        spots_total: 10,
        image_url: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`${API_URL}/api/events`);
                const events = await response.json();
                const event = events.find(e => e.id === id);

                if (event) {
                    // Safety check: is this the owner?
                    if (userId && event.created_by !== userId) {
                        alert('Unauthorized');
                        navigate('/explore');
                        return;
                    }

                    setFormData({
                        title: event.title || '',
                        date: event.date || '',
                        time: event.time || '',
                        location: event.location || '',
                        category: event.category || 'Conservation',
                        description: event.description || '',
                        spots_total: event.spots_total || 10,
                        image_url: event.image_url || ''
                    });
                }
            } catch (error) {
                console.error('Error fetching event:', error);
            } finally {
                setLoading(false);
            }
        };

        if (isLoaded && userId) {
            fetchEvent();
        }
    }, [id, isLoaded, userId, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSpotsChange = (e) => {
        setFormData({ ...formData, spots_total: parseInt(e.target.value) || 0 });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const token = await getToken();
            const response = await fetch(`${API_URL}/api/events/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to update event');
            }

            alert('Event updated successfully!');
            navigate('/explore');
        } catch (error) {
            console.error(error);
            alert('Error updating event: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

    if (!isLoaded || loading) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold mb-2">Edit Event</h1>
                <p className="text-gray-400">Update your event details.</p>
            </div>

            <GlassCard>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <Input label="Event Title" name="title" value={formData.title} onChange={handleChange} required />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Date" name="date" type="date" value={formData.date} onChange={handleChange} required />
                            <Input label="Time" name="time" type="time" value={formData.time} onChange={handleChange} required />
                        </div>

                        <Input label="Location" name="location" value={formData.location} onChange={handleChange} required />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-400 ml-1">Category</label>
                                <select name="category" value={formData.category} onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:bg-white/10 text-gray-400">
                                    <option>Conservation</option>
                                    <option>Recreation</option>
                                    <option>Education</option>
                                    <option>Wellness</option>
                                </select>
                            </div>
                            <Input label="Available Spots" name="spots_total" type="number" value={formData.spots_total} onChange={handleSpotsChange} />
                        </div>

                        <Input label="Image URL" name="image_url" value={formData.image_url} onChange={handleChange} />

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-400 ml-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:bg-white/10 transition-all placeholder:text-gray-600 min-h-[120px]"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <Button type="button" variant="secondary" className="flex-1" onClick={() => navigate('/explore')}>
                            Cancel
                        </Button>
                        <Button className="flex-1" disabled={saving}>
                            {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </GlassCard>
        </div>
    );
};

export default EditEvent;
