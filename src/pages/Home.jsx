import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';

const Home = () => {
    return (
        <div className="flex flex-col gap-12">
            {/* Hero Section */}
            <section className="min-h-[80vh] flex flex-col justify-center items-start max-w-2xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-primary mb-6">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Play your part in nature
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-6">
                        Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Nature.</span>
                    </h1>

                    <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-lg">
                        Join a community of nature lovers. Explore events, organize cleanups, and synchronize with the rhythm of the earth.
                    </p>

                    <div className="flex gap-4">
                        <Link to="/explore">
                            <Button className="group">
                                Get Started
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link to="/about">
                            <Button variant="secondary">Learn More</Button>
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Features Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { icon: Leaf, title: "Nature First", desc: "Events focused on preservation and appreciation." },
                    { icon: Users, title: "Community Driven", desc: "Connect with like-minded individuals nearby." },
                    { icon: Calendar, title: "Sync Up", desc: "Never miss an opportunity to contribute." }
                ].map((feature, idx) => (
                    <GlassCard key={idx} className="p-8">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 text-primary">
                            <feature.icon size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                        <p className="text-gray-400">{feature.desc}</p>
                    </GlassCard>
                ))}
            </section>
        </div>
    );
};

export default Home;
