import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Shield, Users } from 'lucide-react';
import Button from '../components/Button';
import volunteerHero from '../assets/images/volunteer-hero.jpg';

const VolunteerSignup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        interest: '',
        availability: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        // In a real app, you would handle registration here.
        console.log('Volunteer signup data:', formData);
        // For now, redirect to login with volunteer role
        navigate('/login?role=volunteer');
    };

    return (
        <div className="min-h-screen flex">
            <div className="absolute top-4 left-4 z-10">
                <Link
                    to="/home"
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Home
                </Link>
            </div>

            {/* Left Side - Form */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white dark:bg-gray-900 w-full lg:w-1/2 overflow-y-auto">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                Volunteer Program
                            </span>
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                            Join the movement
                        </h2>
                    </div>

                    <div className="mt-8">
                        <form onSubmit={handleSignup} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Full Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm dark:bg-gray-800 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm dark:bg-gray-800 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm dark:bg-gray-800 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="interest" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Area of Interest
                                </label>
                                <select
                                    id="interest"
                                    name="interest"
                                    value={formData.interest}
                                    onChange={handleChange}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md dark:bg-gray-800 dark:text-white"
                                >
                                    <option value="">Select an area</option>
                                    <option value="waste">Waste Management</option>
                                    <option value="water">Water Conservation</option>
                                    <option value="community">Community Outreach</option>
                                    <option value="reporting">Area Monitoring</option>
                                </select>
                            </div>

                            <div className="pt-2">
                                <Button type="submit" className="w-full justify-center bg-amber-600 hover:bg-amber-700 border-amber-600">
                                    Register as Volunteer
                                </Button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-4">
                        <div className="flex items-start space-x-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                            <Heart className="w-5 h-5 text-amber-600 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200">Community Impact</h4>
                                <p className="text-xs text-amber-800 dark:text-amber-300">Help transform your local environment through direct action.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-bold text-blue-900 dark:text-blue-200">Verified Badge</h4>
                                <p className="text-xs text-blue-800 dark:text-blue-300">Get recognized as a verified community environmental lead.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden lg:block relative w-0 flex-1">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src={volunteerHero}
                    alt="Volunteers working together"
                />
                <div className="absolute inset-0 bg-amber-900/40 mix-blend-multiply" />
                <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
                    <blockquote className="relative">
                        <div className="flex items-center space-x-2 mb-4">
                            <Users className="w-8 h-8 text-amber-400" />
                            <span className="text-2xl font-bold">1,200+ Volunteers</span>
                        </div>
                        <p className="text-xl font-medium leading-relaxed italic">
                            "Being an EcoAction volunteer has given me a chance to actually solve the problems I see every day. It's rewarding to see the immediate change in our neighborhoods."
                        </p>
                        <footer className="mt-4">
                            <p className="text-base font-semibold">Marcus Rivera</p>
                            <p className="text-base text-amber-200">Volunteer Coordinator</p>
                        </footer>
                    </blockquote>
                </div>
            </div>
        </div>
    );
};

export default VolunteerSignup;
