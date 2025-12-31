import React from 'react';
import Sidebar from './Sidebar';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-black text-white font-sans">
            <Sidebar />

            <main className="flex-1 flex flex-col overflow-hidden m-2 ml-0 bg-spotify-dark rounded-lg relative">
                {/* Header */}
                <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-4 bg-transparent backdrop-blur-md">
                    <div className="flex gap-4">
                        <button className="bg-black/40 p-2 rounded-full hover:bg-black/60 transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button className="bg-black/40 p-2 rounded-full hover:bg-black/60 transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="bg-white text-black text-sm font-bold px-4 py-2 rounded-full hover:scale-105 transition-transform">
                            Explore Premium
                        </button>
                        <button className="bg-black/40 p-1.5 rounded-full flex items-center gap-2 hover:bg-spotify-light transition-colors pr-2">
                            <div className="bg-spotify-light p-1 rounded-full">
                                <User className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bold">Nature Enthusiast</span>
                        </button>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden pt-20 custom-scrollbar">
                    {children}
                </div>
            </main>

            {/* Action Bar (Player Placeholder) */}
            <footer className="fixed bottom-0 left-0 right-0 bg-black h-20 px-4 flex items-center justify-between z-50">
                <div className="flex items-center gap-4 w-1/3">
                    <div className="w-14 h-14 bg-spotify-light rounded-md overflow-hidden animate-pulse"></div>
                    <div>
                        <p className="text-sm font-bold hover:underline cursor-pointer">Register for Next Event</p>
                        <p className="text-xs text-spotify-gray hover:underline cursor-pointer">Impact the Planet</p>
                    </div>
                    <Heart className="w-5 h-5 text-spotify-green ml-2" />
                </div>

                <div className="flex flex-col items-center gap-2 w-1/3">
                    <div className="flex items-center gap-6">
                        <button className="text-spotify-gray hover:text-white transition-colors">Skip</button>
                        <button className="bg-white text-black p-2 rounded-full hover:scale-105 transition-transform">
                            <Leaf className="w-5 h-5" />
                        </button>
                        <button className="text-spotify-gray hover:text-white transition-colors">Forward</button>
                    </div>
                    <div className="w-full max-w-md bg-white/10 h-1 rounded-full relative">
                        <div className="absolute left-0 top-0 h-full bg-spotify-green w-1/3 rounded-full group">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-xl"></div>
                        </div>
                    </div>
                </div>

                <div className="w-1/3 flex justify-end gap-4 text-spotify-gray">
                    <PlusSquare className="w-5 h-5 hover:text-white cursor-pointer" />
                    <div className="w-24 bg-white/20 h-1 self-center rounded-full overflow-hidden">
                        <div className="bg-spotify-green w-2/3 h-full"></div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default DashboardLayout;
