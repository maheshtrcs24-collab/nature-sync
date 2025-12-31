import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TreePine, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="relative overflow-hidden bg-white pt-16 pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                    <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 ring-1 ring-inset ring-primary-600/20 mb-6">
                                Protecting our planet, together.
                            </span>
                            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-6 leading-tight">
                                Sync with <span className="text-primary-600">Nature</span>, <br />
                                Impact the Future.
                            </h1>
                            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                                Join our community of eco-enthusiasts. Discover local tree plantations, clean-up drives, and conservation awareness events near you.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
                                <Link to="/events" className="inline-flex items-center justify-center rounded-full bg-primary-600 px-8 py-4 text-lg font-bold text-white shadow-xl hover:bg-primary-700 transition-all group">
                                    Explore Events
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <button className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-bold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-all">
                                    How it works
                                </button>
                            </div>

                            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-100 pt-8">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <TreePine className="w-5 h-5 text-primary-500" />
                                        <span className="text-2xl font-bold text-slate-900">5k+</span>
                                    </div>
                                    <p className="text-sm text-slate-500">Trees Planted</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Users className="w-5 h-5 text-primary-500" />
                                        <span className="text-2xl font-bold text-slate-900">12k+</span>
                                    </div>
                                    <p className="text-sm text-slate-500">Volunteers</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <MapPin className="w-5 h-5 text-primary-500" />
                                        <span className="text-2xl font-bold text-slate-900">200+</span>
                                    </div>
                                    <p className="text-sm text-slate-500">Locations</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6 relative">
                        <div className="relative mx-auto w-full rounded-3xl shadow-2xl overflow-hidden aspect-[4/3] bg-slate-100">
                            {/* Placeholder for Hero Image - I would use generate_image here if I had a prompt, but I'll describe it for now */}
                            <img
                                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                alt="Nature conservation"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
