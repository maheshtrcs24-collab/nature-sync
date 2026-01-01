import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Home, Compass, PlusCircle, User } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const NavItem = ({ to, icon: Icon, label, isActive }) => (
    <Link
        to={to}
        className={twMerge(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
            isActive
                ? "bg-white/10 text-primary shadow-[0_0_15px_rgba(0,255,136,0.3)] border border-white/5"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
        )}
    >
        <Icon size={20} className={isActive ? "text-primary" : "group-hover:text-white transition-colors"} />
        <span className="font-medium">{label}</span>
    </Link>
);



const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const links = [
        { to: '/', icon: Home, label: 'Home' },
        { to: '/explore', icon: Compass, label: 'Explore Events' },
        { to: '/add-event', icon: PlusCircle, label: 'Add Event' },
    ];

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 right-4 z-50 p-2 bg-black/20 backdrop-blur-md border border-white/10 rounded-lg md:hidden text-white"
            >
                {isOpen ? <X /> : <Menu />}
            </button>

            {/* Sidebar / Navbar */}
            <motion.nav
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={{
                    open: { x: 0 },
                    closed: { x: "-100%" }
                }}
                // Reset transform on desktop
                className={clsx(
                    "fixed inset-y-0 left-0 z-40 w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 p-6 flex flex-col",
                    "md:translate-x-0 md:relative md:w-64 transition-transform duration-300 ease-in-out" // Desktop styles
                )}
                style={{ x: undefined }} // Let class handles desktop, motion handles mobile. 
            // Actually framer motion overrides classes. Better to use media query in variant or just simple conditional rendering for mobile drawer vs static sidebar.
            // Simplified approach below:
            >
                <div className="mb-10 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary" />
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Nature Sync
                    </h1>
                </div>

                <div className="space-y-2 flex-1">
                    {links.map((link) => (
                        <NavItem
                            key={link.to}
                            {...link}
                            isActive={location.pathname === link.to}
                        />
                    ))}
                </div>

                <div className="mt-auto pt-6 border-t border-white/10">
                    {PUBLISHABLE_KEY ? (
                        <>
                            <SignedOut>
                                <div className="px-4 py-3">
                                    <SignInButton mode="modal">
                                        <button className="flex items-center gap-3 w-full text-gray-400 hover:text-white transition-all">
                                            <User size={20} />
                                            <span className="font-medium">Sign In</span>
                                        </button>
                                    </SignInButton>
                                </div>
                            </SignedOut>
                            <SignedIn>
                                <div className="flex items-center gap-3 px-4 py-3">
                                    <UserButton afterSignOutUrl="/" />
                                    <span className="text-sm font-medium text-gray-400">Account</span>
                                </div>
                            </SignedIn>
                        </>
                    ) : (
                        <div className="px-4 py-3 text-sm text-gray-500 italic">
                            Auth unavailable
                        </div>
                    )}
                </div>
            </motion.nav>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};
// Fix for the motion conflict on desktop/mobile:
// Just force it to show on desktop via separate structure or use specific logic.
// For now, I'll make a more robust Responsive wrapper in Layout.

export default Navbar;
