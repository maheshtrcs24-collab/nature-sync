import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';

const events = [
    {
        id: 1,
        title: "Morning River Cleanup",
        category: "Conservation",
        date: "Mar 15, 2024",
        time: "08:00 AM",
        location: "Green Valley River",
        image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&q=80&w=2070",
        spots: 12
    },
    {
        id: 2,
        title: "Forest Photography Walk",
        category: "Recreation",
        date: "Mar 18, 2024",
        time: "05:00 PM",
        location: "Whispering Woods",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2070",
        spots: 5
    },
    {
        id: 3,
        title: "Urban Gardening Workshop",
        category: "Education",
        date: "Mar 20, 2024",
        time: "10:00 AM",
        location: "City Community Center",
        image: "https://images.unsplash.com/photo-1416879595882-a5d149095dca?auto=format&fit=crop&q=80&w=2070",
        spots: 25
    },
    {
        id: 4,
        title: "Sunset Yoga in the Park",
        category: "Wellness",
        date: "Mar 22, 2024",
        time: "06:00 PM",
        location: "Central Park West",
        image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=2070",
        spots: 8
    }
];

const ExploreEvents = () => {
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, index) => (
                    <GlassCard key={event.id} className="p-0 flex flex-col h-full group">
                        <div className="h-48 relative overflow-hidden">
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
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
                                    {event.location}
                                </div>
                            </div>

                            <div className="mt-auto flex items-center justify-between">
                                <span className="text-sm font-medium text-white">
                                    <span className="text-primary">{event.spots}</span> spots left
                                </span>
                                <Button variant="outline" className="px-4 py-2 text-sm">Join</Button>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
};

export default ExploreEvents;
