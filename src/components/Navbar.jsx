import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Leaf, LogOut, User as UserIcon } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Button from './Button';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { user, logout } = useAuth(); // Get auth state

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsOpen(false);
    };

    // Login Dropdown state
    const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsLoginDropdownOpen(false);
            }
        };

        if (isLoginDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isLoginDropdownOpen]);

    // Filter nav links based on role
    const getNavLinks = () => {
        const links = [
            { name: 'Home', path: '/home' },
            { name: 'About', path: '/home#about', isScroll: true },
            { name: 'Service', path: '/home#service', isScroll: true },
        ];

        if (user) {
            if (user.role === 'user') {
                links.push({ name: 'My Dashboard', path: '/dashboard/user' });
                // Add New Report action link
                links.push({ name: 'New Report', path: '/dashboard/user?newReport=true', isAction: true });
            } else if (user.role === 'admin') {
                links.push({ name: 'Admin Portal', path: '/dashboard/admin' });
            } else if (user.role === 'volunteer') {
                links.push({ name: 'Volunteer Dashboard', path: '/dashboard/volunteer' });
            }
        }

        return links;
    };

    const navLinks = getNavLinks();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center relative">
                    {/* Logo - Absolute Left */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/home" className="flex items-center space-x-2">
                            <div className="bg-primary-500 p-2 rounded-lg">
                                <Leaf className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">EcoAction</span>
                        </Link>
                    </div>

                    {/* Centered Navigation Links */}
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8">
                        {navLinks.map((link) => (
                            !link.isAction && (
                                link.isScroll ? (
                                    <a
                                        key={link.name}
                                        href={link.path}
                                        className="text-sm font-medium text-gray-600 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400 transition-colors duration-200"
                                    >
                                        {link.name}
                                    </a>
                                ) : (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className={`text-sm font-medium transition-colors duration-200 ${isActive(link.path)
                                            ? 'text-primary-600 dark:text-primary-400'
                                            : 'text-gray-600 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                )
                            )
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Action Buttons from Nav Links (New Report etc) */}
                        {navLinks.filter(l => l.isAction).map(link => (
                            <Link key={link.name} to={link.path}>
                                <Button variant="primary" size="sm">
                                    {link.name}
                                </Button>
                            </Link>
                        ))}

                        <ThemeToggle />

                        {user ? (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                                    <div className="bg-gray-100 dark:bg-gray-800 p-1.5 rounded-full">
                                        <UserIcon className="w-4 h-4" />
                                    </div>
                                    <span>{user.name}</span>
                                </div>
                                <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center space-x-1">
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </Button>
                            </div>
                        ) : (
                            <div className="relative" ref={dropdownRef}>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)}
                                    className="flex items-center space-x-1"
                                >
                                    <span>Login</span>
                                    <UserIcon className="w-4 h-4 ml-1" />
                                </Button>

                                {isLoginDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-700 ring-1 ring-black ring-opacity-5 animate-fade-in-down z-50">
                                        {[
                                            { label: 'Citizen Login', path: '/login?role=citizen' },
                                            { label: 'Volunteer Login', path: '/login?role=volunteer' },
                                            { label: 'Admin Login', path: '/admin/login' }
                                        ].map((option) => (
                                            <Link
                                                key={option.label}
                                                to={option.path}
                                                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-0"
                                                onClick={() => setIsLoginDropdownOpen(false)}
                                            >
                                                {option.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <ThemeToggle />
                        <button
                            onClick={toggleMenu}
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 absolute w-full z-40">
                    <div className="px-4 pt-2 pb-4 space-y-1 shadow-lg">
                        {navLinks.map((link) => (
                            link.isScroll ? (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                >
                                    {link.name}
                                </a>
                            ) : (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.path)
                                        ? 'bg-primary-50 text-primary-600 dark:bg-gray-800 dark:text-primary-400'
                                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            )
                        ))}
                        <div className="pt-4 flex flex-col space-y-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                            {user ? (
                                <>
                                    <div className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Signed in as {user.name}
                                    </div>
                                    <Button variant="outline" className="w-full justify-center" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <div className="space-y-2 px-2">
                                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Login As</p>
                                    <Link to="/login?role=citizen" onClick={() => setIsOpen(false)}>
                                        <Button variant="outline" className="w-full justify-center mb-2">Citizen Login</Button>
                                    </Link>
                                    <Link to="/login?role=volunteer" onClick={() => setIsOpen(false)}>
                                        <Button variant="outline" className="w-full justify-center mb-2">Volunteer Login</Button>
                                    </Link>
                                    <Link to="/admin/login" onClick={() => setIsOpen(false)}>
                                        <Button variant="primary" className="w-full justify-center bg-blue-600 hover:bg-blue-700 border-blue-600">Admin Login</Button>
                                    </Link>
                                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <Link to="/signup" onClick={() => setIsOpen(false)}>
                                            <p className="text-center text-sm text-primary-600 font-medium">Create New Account</p>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
