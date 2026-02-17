import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
    const location = useLocation();
    const noHeaderFooterRoutes = ['/login', '/signup', '/dashboard/user', '/dashboard/admin', '/dashboard/volunteer'];
    const shouldShowHeaderFooter = !noHeaderFooterRoutes.some(route => location.pathname.startsWith(route));

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 font-sans">
            {shouldShowHeaderFooter && <Navbar />}
            <main className={`flex-grow ${shouldShowHeaderFooter ? 'pt-20' : ''}`}>
                <Outlet />
            </main>
            {shouldShowHeaderFooter && <Footer />}
        </div>
    );
};

export default Layout;
