import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, PlusSquare, Heart, Leaf } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: Search, label: 'Search', path: '/search' },
        { icon: Library, label: 'Your Library', path: '/library' },
    ];

    const secondaryItems = [
        { icon: PlusSquare, label: 'Create Event', path: '/create-event' },
        { icon: Heart, label: 'Liked Events', path: '/liked' },
    ];

    return (
        <div className="w-64 bg-black flex flex-col gap-2 p-2 h-screen overflow-hidden">
            <div className="bg-spotify-dark rounded-lg flex flex-col gap-4 p-5">
                <Link to="/" className="flex items-center gap-2 mb-2 px-1">
                    <Leaf className="text-spotify-green w-8 h-8" />
                    <span className="text-xl font-bold tracking-tight text-white">NatureSync</span>
                </Link>
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        to={item.path}
                        className={`flex items-center gap-4 text-sm font-bold transition-colors ${location.pathname === item.path ? 'text-white' : 'text-spotify-gray hover:text-white'
                            }`}
                    >
                        <item.icon className="w-6 h-6" />
                        {item.label}
                    </Link>
                ))}
            </div>

            <div className="bg-spotify-dark rounded-lg flex-1 flex flex-col gap-4 p-5 overflow-y-auto">
                <div className="flex items-center justify-between text-spotify-gray mb-2">
                    <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                        <Library className="w-6 h-6" />
                        <span className="font-bold text-sm">Your Library</span>
                    </div>
                    <PlusSquare className="w-5 h-5 hover:text-white cursor-pointer" />
                </div>

                <div className="flex flex-col gap-4 mt-2">
                    {secondaryItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            className="flex items-center gap-4 text-sm font-bold text-spotify-gray hover:text-white transition-colors"
                        >
                            <div className={`p-1.5 rounded-sm ${item.label === 'Liked Events' ? 'bg-gradient-to-br from-indigo-700 to-blue-300' : 'bg-spotify-gray'}`}>
                                <item.icon className={`w-4 h-4 ${item.label === 'Liked Events' ? 'text-white' : 'text-black'}`} />
                            </div>
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="mt-8 border-t border-white/10 pt-4 flex flex-col gap-3">
                    <p className="text-xs font-bold text-spotify-gray tracking-wider uppercase">Your Playlists</p>
                    {['Tree Plantation 2024', 'Cleanup Volunteers', 'Awareness Program'].map((playlist) => (
                        <div key={playlist} className="text-sm font-medium text-spotify-gray hover:text-white transition-colors cursor-pointer truncate">
                            {playlist}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
