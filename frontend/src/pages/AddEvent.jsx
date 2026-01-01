import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { supabase } from '../lib/supabaseClient'; // Unused now
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Upload } from 'lucide-react';
import { API_URL } from '../lib/api';

import { SignInButton, useAuth, useUser } from '@clerk/clerk-react';

const AddEvent = () => {
    const navigate = useNavigate();
    const { isLoaded, userId, getToken } = useAuth();
    const { user } = useUser();

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
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const calculateSpots = (e) => {
        setFormData({ ...formData, spots_total: parseInt(e.target.value) || 0 })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            alert('Please sign in to create an event');
            return;
        }

        setLoading(true);

        try {
            const token = await getToken();
            const response = await fetch(`${API_URL}/api/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    userId: userId // Clerk UserId
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to create event');
            }

            alert('Event created successfully!');
            navigate('/explore');
        } catch (error) {
            console.error(error);
            alert('Error creating event: ' + error.message);
        }
        setLoading(false);
    };

    if (!isLoaded) return <div className="text-center py-20">Loading...</div>;

    if (!userId) {
        return (
            <div className="max-w-2xl mx-auto text-center py-20">
                <GlassCard className="p-12">
                    <h2 className="text-2xl font-bold mb-4">Host your own event!</h2>
                    <p className="text-gray-400 mb-8">Please sign in to create and manage nature events.</p>
                    <SignInButton mode="modal">
                        <Button>Sign In to Continue</Button>
                    </SignInButton>
                </GlassCard>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold mb-2">Host an Event</h1>
                <p className="text-gray-400">Bring the community together.</p>
            </div>

            <GlassCard>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <Input label="Event Title" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Beach Cleanup Drive" required />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Date" name="date" type="date" value={formData.date} onChange={handleChange} required />
                            <Input label="Time" name="time" type="time" value={formData.time} onChange={handleChange} required />
                        </div>

                        <Input label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="Where is it happening?" required />

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
                            <Input label="Available Spots" name="spots_total" type="number" value={formData.spots_total} onChange={calculateSpots} />
                        </div>

                        <Input label="Image URL" name="image_url" value={formData.image_url} onChange={handleChange} placeholder="https://..." />

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-400 ml-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary/50 focus:bg-white/10 transition-all placeholder:text-gray-600 min-h-[120px]"
                                placeholder="Tell us more about the event..."
                            />
                        </div>
                    </div>

                    <Button className="w-full mt-4" disabled={loading}>
                        {loading ? 'Creating Event...' : 'Create Event'}
                    </Button>
                </form>
            </GlassCard>
        </div>
    );
};

export default AddEvent;
