import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button';
import DashboardLayout from '../components/DashboardLayout';
import {
    Calendar,
    MapPin,
    Clock,
    CheckCircle,
    User,
    Trophy,
    ArrowRight,
    Mail,
    Phone,
    Award
} from 'lucide-react';

const VolunteerDashboard = () => {
    const { user } = useAuth();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const path = location.pathname;
        if (path.includes('/tasks')) setActiveTab('tasks');
        else if (path.includes('/shifts')) setActiveTab('shifts');
        else if (path.includes('/profile')) setActiveTab('profile');
        else setActiveTab('overview');
    }, [location]);

    const renderOverview = () => (
        <div className="space-y-8 animate-fade-in p-6">
            {/* Welcome Banner */}
            <div className="relative bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl overflow-hidden shadow-lg">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=1600"
                        alt="Volunteers"
                        className="w-full h-full object-cover opacity-20 mix-blend-overlay"
                    />
                </div>
                <div className="relative p-8 md:p-10 text-white">
                    <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name || 'Volunteer'}!</h1>
                    <p className="text-amber-50 text-lg max-w-xl">
                        Thank you for your dedication. You have 3 upcoming shifts this week.
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Hours Volunteer', value: '24', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800' },
                    { label: 'Tasks Completed', value: '8', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800' },
                    { label: 'Upcoming Shifts', value: '3', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800' },
                    { label: 'Impact Points', value: '350', icon: Trophy, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-800' },
                ].map((stat, index) => (
                    <div key={index} className={`p-6 rounded-xl border ${stat.border} ${stat.bg} transition-transform hover:scale-105`}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</h3>
                            <stat.icon className={`${stat.color} w-6 h-6`} />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Upcoming Shifts Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Upcoming Shifts</h2>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab('shifts')}>View All</Button>
                </div>
                <div className="space-y-4">
                    {[
                        { title: 'Beach Cleanup', date: 'Sat, Aug 24', time: '09:00 AM - 12:00 PM', location: 'Sunny Beach', role: 'Team Lead' },
                        { title: 'Food Drive', date: 'Sun, Aug 25', time: '10:00 AM - 02:00 PM', location: 'Community Center', role: 'Distributor' },
                        { title: 'Tree Planting', date: 'Sat, Aug 31', time: '08:00 AM - 01:00 PM', location: 'City Park', role: 'Planter' },
                    ].map((shift, i) => (
                        <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
                                    <Calendar size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white">{shift.title}</h3>
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="flex items-center gap-1"><Clock size={14} /> {shift.date} • {shift.time}</span>
                                        <span className="flex items-center gap-1"><MapPin size={14} /> {shift.location}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 md:mt-0 flex items-center gap-3">
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-xs font-medium">
                                    {shift.role}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderTaskBoard = () => (
        <div className="p-6 animate-fade-in max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Available Volunteer Opportunities</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                        <div className="relative h-48">
                            <img
                                src={`https://images.unsplash.com/photo-${1550000000000 + i}?auto=format&fit=crop&q=80&w=400`}
                                alt="Task"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 right-4 bg-white dark:bg-gray-900 px-2 py-1 rounded-full text-xs font-bold text-emerald-600 shadow-sm">
                                5 Spots Left
                            </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs rounded-full font-medium">Open</span>
                                <span className="text-xs text-gray-500">2 days left</span>
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Park Cleanup Helper {i}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                We need volunteers to help clear debris from the north section of Central Park after the storm. Join us to make a difference!
                            </p>
                            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                    <Clock size={14} />
                                    <span>4 hrs</span>
                                </div>
                                <Button size="sm">Sign Up</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderMyShifts = () => (
        <div className="p-6 animate-fade-in max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Scheduled Shifts</h1>
            <div className="space-y-6">
                {[
                    { title: 'Beach Cleanup', date: 'Sat, Aug 24', time: '09:00 AM - 12:00 PM', location: 'Sunny Beach', role: 'Team Lead', status: 'Confirmed' },
                    { title: 'Food Drive', date: 'Sun, Aug 25', time: '10:00 AM - 02:00 PM', location: 'Community Center', role: 'Distributor', status: 'Confirmed' },
                    { title: 'Tree Planting', date: 'Sat, Aug 31', time: '08:00 AM - 01:00 PM', location: 'City Park', role: 'Planter', status: 'Pending' },
                ].map((shift, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-100 dark:border-emerald-800">
                            <span className="text-xs uppercase">{shift.date.split(',')[0]}</span>
                            <span className="text-xl">{shift.date.split(' ')[2]}</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{shift.title}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mt-1">{shift.role}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${shift.status === 'Confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                    }`}>
                                    {shift.status}
                                </span>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
                                <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-gray-400" />
                                    <span>{shift.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} className="text-gray-400" />
                                    <span>{shift.location}</span>
                                </div>
                            </div>
                            <div className="mt-6 flex gap-3">
                                <Button size="sm" variant="outline">View Details</Button>
                                {shift.status === 'Confirmed' && (
                                    <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50 hover:border-red-200">Cancel Shift</Button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderProfile = () => (
        <div className="p-6 animate-fade-in max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Volunteer Profile</h1>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                        <div className="flex items-end gap-4">
                            <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg">
                                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-400">
                                    <User size={40} />
                                </div>
                            </div>
                            <div className="mb-1">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
                                <p className="text-gray-500 dark:text-gray-400">Volunteer • Joined Jan 2024</p>
                            </div>
                        </div>
                        <Button>Edit Profile</Button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-8">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 mb-1">
                                            <Mail size={16} />
                                            <span className="text-sm">Email</span>
                                        </div>
                                        <p className="font-medium text-gray-900 dark:text-white">{user?.email}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 mb-1">
                                            <Phone size={16} />
                                            <span className="text-sm">Phone</span>
                                        </div>
                                        <p className="font-medium text-gray-900 dark:text-white">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Badges & Certifications</h3>
                                <div className="flex flex-wrap gap-4">
                                    {[
                                        { name: 'Eco Starter', color: 'bg-emerald-100 text-emerald-700' },
                                        { name: 'Team Player', color: 'bg-blue-100 text-blue-700' },
                                        { name: 'Early Bird', color: 'bg-amber-100 text-amber-700' }
                                    ].map((badge, i) => (
                                        <div key={i} className={`flex items-center gap-2 px-4 py-2 rounded-full ${badge.color}`}>
                                            <Award size={16} />
                                            <span className="font-medium text-sm">{badge.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Skills & Interests</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Gardening', 'Teaching', 'Event Planning', 'First Aid'].map((skill) => (
                                        <span key={skill} className="px-3 py-1 bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-lg text-sm text-gray-700 dark:text-gray-200">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <DashboardLayout>
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'tasks' && renderTaskBoard()}
            {activeTab === 'shifts' && renderMyShifts()}
            {activeTab === 'profile' && renderProfile()}
        </DashboardLayout>
    );
};

export default VolunteerDashboard;
