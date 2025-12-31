import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import { Calendar, MapPin, Tag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock data for initial demonstration
        const mockEvents = [
            {
                id: 1,
                title: "City Center Tree Plantation",
                description: "Join us in planting 500 saplings in the heart of the city to improve air quality.",
                date: "2024-05-15T09:00:00",
                location: "Central Park, Sector 4",
                category: "Plantation",
                image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
            },
            {
                id: 2,
                title: "Riverside Clean-up Drive",
                description: "Help us remove plastic waste from the river banks and restore local biodiversity.",
                date: "2024-05-22T08:00:00",
                location: "Blue River Banks",
                category: "Clean-up",
                image: "https://images.unsplash.com/photo-1595273670150-db0a3d39074c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
            },
            {
                id: 3,
                title: "Wildlife Awareness Workshop",
                description: "Learn about local endangered species and how we can protect their habitat.",
                date: "2024-06-05T10:30:00",
                location: "Community Hall, Downtown",
                category: "Awareness",
                image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
            }
        ];

        setTimeout(() => {
            setEvents(mockEvents);
            setLoading(false);
        }, 800);
    }, []);

    return (
        <div className="min-h-screen">
            <Navbar />
            <Hero />

            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Upcoming Events</h2>
                            <p className="text-slate-600 max-w-xl">
                                Be a part of the change. Register for events that resonate with you and contribute to a greener future.
                            </p>
                        </div>
                        <button className="hidden sm:flex items-center text-primary-600 font-bold hover:gap-2 transition-all">
                            View all events <ArrowRight className="ml-1 w-5 h-5" />
                        </button>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-white rounded-2xl h-[450px] animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {events.map((event, idx) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 group"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary-700 uppercase tracking-widest">
                                            {event.category}
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-4">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {new Date(event.date).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-3.5 h-3.5" />
                                                {event.location}
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                                            {event.title}
                                        </h3>

                                        <p className="text-slate-600 text-sm mb-6 line-clamp-2">
                                            {event.description}
                                        </p>

                                        <button className="w-full bg-slate-100 text-slate-900 font-bold py-3 rounded-xl hover:bg-primary-600 hover:text-white transition-all transform active:scale-95">
                                            Register Now
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
