import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, LogIn, User, Calendar } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-2">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="bg-primary-500 p-2 rounded-lg">
                                <Leaf className="text-white w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold text-slate-900 tracking-tight">NatureSync</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                        <Link to="/events" className="hover:text-primary-600 transition-colors">Events</Link>
                        <Link to="/about" className="hover:text-primary-600 transition-colors">About</Link>
                        <Link to="/impact" className="hover:text-primary-600 transition-colors">Our Impact</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/login" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary-600 px-3 py-2">
                            <LogIn className="w-4 h-4" />
                            Login
                        </Link>
                        <Link to="/register" className="bg-primary-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-primary-700 transition-all shadow-sm">
                            Join Us
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
