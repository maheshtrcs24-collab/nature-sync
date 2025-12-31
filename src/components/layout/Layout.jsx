import React from 'react';
import { Outlet } from 'react-router-dom';
import Background from './Background';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div className="flex min-h-screen text-white relative">
            <Background />

            {/* Sidebar - hidden on mobile initially, visible on desktop */}
            <div className="hidden md:block h-screen sticky top-0">
                <Navbar />
            </div>

            {/* Mobile Navbar Drawer Logic is handled inside Navbar, but for layout structure: */}
            {/* We need the Navbar to handle its own mobile state. 
          The Navbar component I wrote previously tries to be both. 
          Let's adjust usage.
      */}
            <div className="md:hidden absolute z-50">
                <Navbar />
            </div>

            {/* Main Content Area */}
            <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-x-hidden">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
