import React, { useEffect, useState } from 'react';
import { API_URL } from '../lib/api';
import { useAuth } from '@clerk/clerk-react';
import GlassCard from '../components/ui/GlassCard';
import { Calendar, MapPin, Leaf } from 'lucide-react';

const JoinedEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getToken } = useAuth();

    useEffect(() => {
        const fetchJoinedEvents = async () => {
            try {
                const token = await getToken();
                const response = await fetch(`${API_URL}/api/user/events`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Error fetching joined events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJoinedEvents();
    }, [getToken]);

    if (loading) return <div className="text-center py-20">Loading your events...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold mb-2">My Events</h1>
                <p className="text-gray-400">Nature events you're participating in.</p>
            </div>

            {events.length === 0 ? (
                <GlassCard className="p-12 text-center">
                    <p className="text-gray-400 mb-4">You haven't joined any events yet.</p>
                </GlassCard>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <GlassCard key={event.id} className="group overflow-hidden flex flex-col h-full">
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={event.image_url || 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80'}
                                    alt={event.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-medium text-primary">
                                    Joined
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-2 text-primary text-sm font-medium mb-3">
                                    <Leaf size={14} />
                                    {event.category}
                                </div>
                                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-1">
                                    {event.title}
                                </h3>

                                <div className="space-y-2 mt-auto">
                                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                                        <Calendar size={16} className="text-primary" />
                                        <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                                        <MapPin size={16} className="text-primary" />
                                        <span className="line-clamp-1">{event.location}</span>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            )}
        </div>
    );
};

export default JoinedEvents;
