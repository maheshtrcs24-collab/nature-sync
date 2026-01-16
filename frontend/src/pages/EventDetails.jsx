import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { API_URL } from '../lib/api';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { Calendar, MapPin, Clock, Users, Leaf, Pencil, Trash2, ArrowLeft } from 'lucide-react';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { userId, getToken } = useAuth();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [joining, setJoining] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetchEvent();
        checkAdminStatus();
    }, [id, navigate]);

    const checkAdminStatus = async () => {
        if (!userId) return;
        try {
            const token = await getToken();
            const response = await fetch(`${API_URL}/api/user/role`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setIsAdmin(data.isAdmin || false);
        } catch (error) {
            console.error('Admin check error:', error);
        }
    };

    const fetchEvent = async () => {
        try {
            const response = await fetch(`${API_URL}/api/events/${id}`);
            if (!response.ok) throw new Error('Event not found');
            const data = await response.json();
            setEvent(data);
        } catch (error) {
            console.error('Error fetching event:', error);
            toast.error('Event not found');
            navigate('/explore');
        } finally {
            setLoading(false);
        }
    };

    const handleJoin = async () => {
        if (!userId) {
            toast.error('Please sign in to join events');
            return;
        }

        setJoining(true);
        try {
            const token = await getToken();
            const response = await fetch(`${API_URL}/api/events/${id}/join`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                const err = await response.json();
                toast.error(err.error || 'Failed to join');
                return;
            }

            toast.success('Successfully joined!');
            // Refresh event data to show updated spots
            const updatedResponse = await fetch(`${API_URL}/api/events/${id}`);
            const updatedData = await updatedResponse.json();
            setEvent(updatedData);
        } catch (error) {
            console.error('Join error:', error);
        } finally {
            setJoining(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;

        try {
            const token = await getToken();
            const response = await fetch(`${API_URL}/api/events/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                const err = await response.json();
                toast.error(err.error || 'Failed to delete');
                return;
            }

            toast.success('Event deleted!');
            navigate('/explore');
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    if (loading) return <div className="text-center py-20 text-white">Loading event details...</div>;
    if (!event) return null;

    const spotsLeft = event.spots_total - (event.spots_taken || 0);
    const isOwner = userId === event.created_by;
    const canManage = isOwner || isAdmin;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Back
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Section */}
                <div className="h-[400px] rounded-3xl overflow-hidden border border-white/10 relative">
                    <img
                        src={event.image_url || 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80'}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-sm font-medium text-primary">
                        {event.category}
                    </div>
                </div>

                {/* Content Section */}
                <div className="space-y-6 flex flex-col justify-center">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">{event.title}</h1>
                        <div className="flex items-center gap-2 text-primary text-sm font-medium">
                            <Leaf size={16} />
                            <span>Powered by Nature Sync Community</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <GlassCard className="p-4 flex items-center gap-3">
                            <Calendar className="text-primary" size={20} />
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Date</p>
                                <p className="text-sm font-medium">{new Date(event.date).toLocaleDateString()}</p>
                            </div>
                        </GlassCard>
                        <GlassCard className="p-4 flex items-center gap-3">
                            <Clock className="text-primary" size={20} />
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Time</p>
                                <p className="text-sm font-medium">{event.time}</p>
                            </div>
                        </GlassCard>
                        <GlassCard className="p-4 flex items-center gap-3 col-span-2">
                            <MapPin className="text-primary" size={20} />
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Location</p>
                                <p className="text-sm font-medium">{event.location}</p>
                            </div>
                        </GlassCard>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                        <div className="flex items-center gap-3">
                            <Users className="text-primary" size={20} />
                            <div>
                                <p className="text-sm font-bold text-white">{spotsLeft}</p>
                                <p className="text-xs text-gray-500">Spots Available</p>
                            </div>
                        </div>

                        {canManage ? (
                            <div className="flex gap-2">
                                {isOwner && (
                                    <Button variant="outline" size="sm" onClick={() => navigate(`/edit-event/${id}`)}>
                                        <Pencil size={16} className="mr-2" /> Edit
                                    </Button>
                                )}
                                <Button variant="secondary" size="sm" onClick={handleDelete}>
                                    <Trash2 size={16} className="mr-2" /> Delete
                                </Button>
                            </div>
                        ) : (
                            <Button
                                disabled={spotsLeft <= 0 || joining}
                                onClick={handleJoin}
                                className="px-8"
                            >
                                {joining ? 'Joining...' : spotsLeft > 0 ? 'Join Now' : 'Event Full'}
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Description */}
            <GlassCard className="p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Leaf size={20} className="text-primary" />
                    About This Event
                </h3>
                <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">
                    {event.description || "No description provided for this event. Join us to find out more!"}
                </p>
            </GlassCard>
        </div>
    );
};

export default EventDetails;
