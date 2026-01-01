import React, { useEffect, useState } from 'react';
import { API_URL } from '../lib/api';
import { useAuth } from '@clerk/clerk-react';
import GlassCard from '../components/ui/GlassCard';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Leaf, Pencil, Trash2 } from 'lucide-react';

const JoinedEvents = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userId, getToken } = useAuth();

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

    useEffect(() => {
        if (userId) {
            fetchJoinedEvents();
        }
    }, [getToken, userId]);

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
            fetchJoinedEvents(); // Refresh list
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

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
                    {events.map((event) => {
                        const isOwner = userId === event.created_by;
                        return (
                            <GlassCard
                                key={event.id}
                                className="group overflow-hidden flex flex-col h-full cursor-pointer"
                                onClick={(e) => {
                                    if (e.target.closest('button')) return;
                                    navigate(`/events/${event.id}`);
                                }}
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={event.image_url || 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80'}
                                        alt={event.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-medium text-primary">
                                        Joined
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
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default JoinedEvents;
