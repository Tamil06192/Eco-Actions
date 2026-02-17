import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
    LayoutDashboard,
    PlusCircle,
    FileText,
    Map,
    Users,
    User,
    LogOut,
    Menu,
    X,
    Leaf,
    Calendar
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();

    const toggleSidebar = () => setIsOpen(!isOpen);

    const navItems = [
        // Common / User Items
        ...(user?.role === 'user' ? [
            { icon: LayoutDashboard, label: 'Overview', path: '/dashboard/user' },
            { icon: PlusCircle, label: 'New Report', path: '/dashboard/user/new-report' },
            { icon: FileText, label: 'My Reports', path: '/dashboard/user/my-reports' },
            { icon: Map, label: 'Map View', path: '/dashboard/user/map' },
            { icon: Users, label: 'Community', path: '/dashboard/user/community' },
            { icon: User, label: 'Profile', path: '/dashboard/user/profile' },
        ] : []),

        // Volunteer Items
        ...(user?.role === 'volunteer' ? [
            { icon: LayoutDashboard, label: 'Overview', path: '/dashboard/volunteer' },
            { icon: FileText, label: 'Task Board', path: '/dashboard/volunteer/tasks' },
            { icon: Calendar, label: 'My Shifts', path: '/dashboard/volunteer/shifts' },
            { icon: User, label: 'Profile', path: '/dashboard/volunteer/profile' },
        ] : []),

        // Admin Items
        ...(user?.role === 'admin' ? [
            { icon: LayoutDashboard, label: 'Overview', path: '/dashboard/admin' },
            // ... admin items usually defined in AdminDashboard sidebar or here if shared
            // Assuming AdminDashboard might have its own sidebar or we share this one. 
            // Existing code implies AdminDashboard might use a similar layout. 
            // For now, focusing on User/Volunteer separation.
        ] : []),
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={toggleSidebar}
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-emerald-600 text-white shadow-lg"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <div className={`
                fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 md:static md:h-screen
            `}>
                <div className="flex flex-col h-full">
                    {/* Logo Area */}
                    <div className="flex items-center justify-center h-20 border-b border-gray-200 dark:border-gray-800">
                        <Link to="/home" className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:opacity-80 transition-opacity">
                            <Leaf className="w-8 h-8" />
                            <span className="text-xl font-bold">EcoAction</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-4">
                        <ul className="space-y-1 px-2">
                            {navItems.map((item) => (
                                <li key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        end={item.path === '/dashboard/user'} // Only exact match for root dashboard
                                        className={({ isActive }) => `
                                            flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                                            ${isActive
                                                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                                            }
                                        `}
                                        onClick={() => setIsOpen(false)} // Close mobile menu on click
                                    >
                                        <item.icon size={20} />
                                        <span className="font-medium">{item.label}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* User Profile / Logout */}
                    <div className="border-t border-gray-200 dark:border-gray-800 p-4">
                        <div className="flex items-center gap-3 mb-4 px-2">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                                {user?.name ? user.name.substring(0, 2).toUpperCase() : 'US'}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.name || 'User'}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate capitalize">{user?.role || 'Guest'}</p>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm font-medium"
                        >
                            <LogOut size={20} />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
