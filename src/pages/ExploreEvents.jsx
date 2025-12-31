import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Calendar, MapPin, Clock } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';

const ExploreEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/events');
            if (!response.ok) throw new Error('Failed to fetch events');

            const data = await response.json();
            setEvents(data || []);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
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
                    {events.map((event) => (
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
                                        <span className="text-primary">{event.spots_total - (event.spots_taken || 0)}</span> spots left
                                    </span>
                                    <Button variant="outline" className="px-4 py-2 text-sm">Join</Button>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExploreEvents;
