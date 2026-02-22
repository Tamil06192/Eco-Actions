import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Lock, User, Users, Eye, EyeOff } from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import adminLoginImg from '../assets/images/admin-login.jpg';

const AdminLogin = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            if (email === 'admin' && password === 'admin') {
                login({ name: 'System Administrator', email: 'admin@ecoaction.com', role: 'admin' });
                navigate('/dashboard/admin');
            } else {
                setError('Invalid administrator credentials. Access denied.');
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
            <div className="absolute top-4 left-4 z-10">
                <Link
                    to="/home"
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Website
                </Link>
            </div>

            {/* Left Side - Image Background */}
            <div className="hidden lg:block relative w-1/2">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src={adminLoginImg}
                    alt="EcoAction Administrative Headquarters"
                />
                <div className="absolute inset-0 bg-blue-900/80 mix-blend-multiply" />
                <div className="absolute inset-0 flex flex-col justify-center p-12 text-white">
                    <div className="max-w-md">
                        <ShieldCheck className="w-16 h-16 text-blue-400 mb-6" />
                        <h1 className="text-4xl font-bold mb-4">Command Center</h1>
                        <p className="text-xl text-blue-100 leading-relaxed">
                            Welcome to the EcoAction Administrative Portal. Manage community reports, monitor regional progress, and coordinate environmental responses from one central location.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
                            <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Admin Login</h2>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Authorized personnel only. Please sign in to continue.
                        </p>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                                Sign up here
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8">
                        <form onSubmit={handleLogin} className="space-y-6">
                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg text-sm border border-red-100 dark:border-red-900/30 animate-shake">
                                    <div className="flex items-center">
                                        <ShieldCheck className="w-4 h-4 mr-2" />
                                        {error}
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Admin Username
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        type="text"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:text-white transition-all"
                                        placeholder="admin"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-800 dark:text-white transition-all"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400 hover:text-blue-500 font-medium" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400 hover:text-blue-500 font-medium" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                                        Trust this device
                                    </label>
                                </div>
                                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 font-medium">
                                    Forgot security key?
                                </a>
                            </div>

                            <Button
                                type="submit"
                                className="w-full justify-center py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center space-x-2"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <ShieldCheck className="w-5 h-5" />
                                        <span>Secure Login</span>
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>

                    <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800">
                        <div className="text-center space-y-4">
                            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Switch Login Portal</p>
                            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
                                <Link to="/login?role=citizen" className="text-sm font-bold text-emerald-600 hover:text-emerald-500 flex items-center">
                                    <User className="w-4 h-4 mr-1" />
                                    Citizen Portal
                                </Link>
                                <Link to="/login?role=volunteer" className="text-sm font-bold text-amber-600 hover:text-amber-500 flex items-center">
                                    <Users className="w-4 h-4 mr-1" />
                                    Volunteer Portal
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
                        <p className="text-center text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-semibold">
                            EcoAction Security Protocol v2.4
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
