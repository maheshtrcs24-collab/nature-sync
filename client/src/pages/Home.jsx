import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Play, Heart, MoreHorizontal, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const mockEvents = [
            {
                id: 1,
                title: "The Urban Releaf Project",
                organizer: "Nature Sync Squad",
                date: "2024-05-15",
                location: "Central Park",
                category: "Plantation",
                image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80"
            },
            {
                id: 2,
                title: "Coastal Clean-up Vol. 1",
                organizer: "Ocean Guardians",
                date: "2024-05-22",
                location: "Blue River Banks",
                category: "Clean-up",
                image: "https://images.unsplash.com/photo-1595273670150-db0a3d39074c?auto=format&fit=crop&w=400&q=80"
            },
            {
                id: 3,
                title: "Endangered Wildlife Awareness",
                organizer: "Echo Education",
                date: "2024-06-05",
                location: "Community Hall",
                category: "Awareness",
                image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80"
            },
            {
                id: 4,
                title: "Seed Bombing Workshop",
                organizer: "Bio-Bombers",
                date: "2024-06-12",
                location: "Community Garden",
                category: "Workshop",
                image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=400&q=80"
            },
            {
                id: 5,
                title: "Night Forest Walk",
                organizer: "Eco Explorers",
                date: "2024-06-20",
                location: "Pine Ridge Reserve",
                category: "Exploration",
                image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80"
            }
        ];

        setTimeout(() => {
            setEvents(mockEvents);
            setLoading(false);
        }, 800);
    }, []);

    return (
        <DashboardLayout>
            <div className="px-8 pb-32">
                {/* Banner Section */}
                <section className="mt-10 mb-8 p-10 rounded-2xl bg-gradient-to-b from-primary-600/40 to-spotify-dark border border-white/5 relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col gap-4">
                        <span className="text-xs font-black uppercase tracking-widest text-white/70">Featured Event</span>
                        <h1 className="text-7xl font-black tracking-tighter sm:text-8xl mb-2">Impact Now.</h1>
                        <p className="text-lg text-white/80 max-w-xl font-medium">
                            Join the biggest tree plantation drive of the year. 50,000 saplings ready to be synced with the earth.
                        </p>
                        <div className="flex gap-4 mt-4">
                            <button className="bg-spotify-green text-black px-8 py-3.5 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2">
                                <Play className="fill-black w-5 h-5" />
                                Join Drive
                            </button>
                            <button className="bg-black/20 backdrop-blur-md border border-white/20 px-8 py-3.5 rounded-full font-bold hover:bg-black/40 transition-all">
                                Details
                            </button>
                        </div>
                    </div>

                    <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity">
                        <img
                            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
                            className="w-full h-full object-cover rounded-l-full"
                            alt="Hero"
                        />
                    </div>
                </section>

                {/* Categories / Recents Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                    {events.slice(0, 6).map((event) => (
                        <div key={`fav-${event.id}`} className="flex items-center gap-4 bg-white/5 rounded-md overflow-hidden hover:bg-white/10 transition-colors group cursor-pointer">
                            <div className="w-16 h-16 shadow-lg">
                                <img src={event.image} className="w-full h-full object-cover" alt="" />
                            </div>
                            <span className="font-bold text-sm truncate pr-4">{event.title}</span>
                            <div className="ml-auto mr-4 bg-spotify-green p-2.5 rounded-full shadow-2xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                <Play className="fill-black text-black w-5 h-5" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Made for You / Event Grid */}
                <section className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold hover:underline cursor-pointer">Recomended For You</h2>
                        <span className="text-xs font-bold text-spotify-gray hover:underline cursor-pointer tracking-wider uppercase">Show all</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {events.map((event) => (
                            <motion.div
                                key={event.id}
                                whileHover={{ y: -5 }}
                                className="bg-spotify-light/30 p-4 rounded-xl hover:bg-spotify-light/60 transition-all duration-300 group cursor-pointer relative"
                            >
                                <div className="aspect-square rounded-lg mb-4 shadow-2xl overflow-hidden relative">
                                    <img src={event.image} className="w-full h-full object-cover" alt={event.title} />
                                    <div className="absolute bottom-2 right-2 bg-spotify-green p-3 rounded-full shadow-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        <Play className="fill-black text-black w-5 h-5 mx-auto" />
                                    </div>
                                </div>
                                <h3 className="font-bold text-base truncate mb-1">{event.title}</h3>
                                <p className="text-spotify-gray text-xs font-medium line-clamp-2 leading-relaxed">
                                    {event.organizer} • {event.location}
                                </p>
                                <div className="mt-3 flex items-center gap-2 text-[10px] text-spotify-gray uppercase font-bold tracking-tighter">
                                    <Calendar className="w-3 h-3" />
                                    <span>{event.date}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* More of what you love */}
                <section className="mb-32">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold hover:underline cursor-pointer">Trending Organizers</h2>
                        <span className="text-xs font-bold text-spotify-gray hover:underline cursor-pointer tracking-wider uppercase">Show all</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {['Echo Guardians', 'Plant It!', 'Earth First', 'Cleanup Crew', 'Green Peace'].map((org, i) => (
                            <div key={org} className="bg-spotify-light/30 p-4 rounded-xl hover:bg-spotify-light/60 transition-all duration-300 group cursor-pointer text-center">
                                <div className="aspect-square rounded-full mb-6 shadow-2xl overflow-hidden">
                                    <img src={`https://i.pravatar.cc/300?u=${i}`} className="w-full h-full object-cover" alt="" />
                                </div>
                                <h3 className="font-bold text-sm mb-1">{org}</h3>
                                <p className="text-spotify-gray text-xs font-bold uppercase tracking-widest">Organizer</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </DashboardLayout>
    );
};

export default Home;
