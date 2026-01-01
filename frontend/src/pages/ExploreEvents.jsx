import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Calendar, MapPin, Clock, Pencil, Trash2 } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';

import { API_URL } from '../lib/api';

import { useAuth } from '@clerk/clerk-react';

const ExploreEvents = () => {
    const navigate = useNavigate();
    const { userId, getToken } = useAuth();

    const [events, setEvents] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/events`);
            if (!response.ok) throw new Error('Failed to fetch events');

            const data = await response.json();
            setEvents(data || []);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleJoin = async (eventId) => {
        if (!userId) {
            alert('Please sign in to join events');
            return;
        }

        try {
            const token = await getToken();
            const response = await fetch(`${API_URL}/api/events/${eventId}/join`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                const err = await response.json();
                alert(err.error || 'Failed to join');
                return;
            }

            alert('Successfully joined!');
            fetchEvents(); // Refresh
        } catch (error) {
            console.error('Join error:', error);
        }
    };

    const handleDelete = async (eventId) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;

        try {
            const token = await getToken();
            const response = await fetch(`${API_URL}/api/events/${eventId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                const err = await response.json();
                alert(err.error || 'Failed to delete');
                return;
            }

            alert('Event deleted!');
            fetchEvents();
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    if (loading) {
        return <div className="text-center text-white py-20">Loading amazing events...</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Explore Events</h1>
                    <p className="text-gray-400">Discover what's happening in nature around you.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" className="px-4 py-2 text-sm">Filter</Button>
                    <Button variant="secondary" className="px-4 py-2 text-sm">Sort</Button>
                </div>
            </div>

            {events.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-xl text-gray-400">No events found yet. Be the first to host one!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => {
                        const spotsLeft = event.spots_total - (event.spots_taken || 0);
                        const isOwner = userId === event.created_by;

                        return (
                            <GlassCard key={event.id} className="p-0 flex flex-col h-full group">
                                <div className="h-48 relative overflow-hidden bg-gray-800">
                                    {event.image_url ? (
                                        <img
                                            src={event.image_url}
                                            alt={event.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-600 bg-black/40">
                                            No Image
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10">
                                        {event.category}
                                    </div>

                                    {isOwner && (
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <button
                                                onClick={() => navigate(`/edit-event/${event.id}`)}
                                                className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-primary hover:bg-primary hover:text-black transition-all border border-white/10"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(event.id)}
                                                className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all border border-white/10"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{event.title}</h3>

                                    <div className="space-y-3 mb-6 text-sm text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} className="text-primary" />
                                            {event.date}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} className="text-primary" />
                                            {event.time}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin size={16} className="text-primary" />
                                            {event.location || 'TBA'}
                                        </div>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between">
                                        <span className="text-sm font-medium text-white">
                                            <span className="text-primary">{spotsLeft}</span> spots left
                                        </span>
                                        {!isOwner ? (
                                            <Button
                                                variant={spotsLeft > 0 ? "outline" : "secondary"}
                                                className="px-4 py-2 text-sm"
                                                disabled={spotsLeft <= 0}
                                                onClick={() => handleJoin(event.id)}
                                            >
                                                {spotsLeft > 0 ? 'Join' : 'Full'}
                                            </Button>
                                        ) : (
                                            <span className="text-xs text-primary font-bold uppercase tracking-wider">Your Event</span>
                                        )}
                                    </div>
                                </div>
                            </GlassCard>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ExploreEvents;
