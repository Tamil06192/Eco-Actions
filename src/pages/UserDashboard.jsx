import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useAuth } from '../context/AuthContext';
import { StorageService } from '../services/storage';
import Button from '../components/Button';
import DashboardLayout from '../components/DashboardLayout';
import {
    Upload,
    MapPin,
    Camera,
    CheckCircle,
    Clock,
    Trophy,
    PlusCircle,
    AlertTriangle,
    Leaf,
    Users,
    Calendar,
    ArrowRight,
    User,
    Mail,
    Phone,
    Award
} from 'lucide-react';
import dashboardBg from '../assets/images/dashboard-bg.jpg';
import dashboardCard from '../assets/images/dashboard-card.jpg';

const UserDashboard = () => {
    const { user } = useAuth();
    const [reports, setReports] = useState([]);
    const [activeTab, setActiveTab] = useState('overview'); // overview, new-report, map, community
    const location = useLocation();

    useEffect(() => {
        const allReports = StorageService.getReports();
        setReports(allReports.filter(r => r.reporter === 'user1'));
    }, []);

    // Sync route with active tab (simple implementation for now)
    useEffect(() => {
        const path = location.pathname;
        if (path.includes('new-report')) setActiveTab('new-report');
        else if (path.includes('map')) setActiveTab('map');
        else if (path.includes('community')) setActiveTab('community');
        else if (path.includes('profile')) setActiveTab('profile');
        else if (path.includes('my-reports')) setActiveTab('my-reports');
        else setActiveTab('overview');
    }, [location]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newReport = {
            id: reports.length + 10,
            title: e.target.title.value,
            description: e.target.description.value,
            location: e.target.location.value,
            status: 'Open',
            date: new Date().toISOString().split('T')[0],
            image: dashboardCard,
            category: e.target.category.value,
            reporter: 'user1'
        };

        // Save to local storage
        StorageService.saveReport(newReport);

        // Update local state
        setReports([newReport, ...reports]);
        setActiveTab('overview');
    };

    const renderOverview = () => (
        <div className="space-y-8 animate-fade-in p-6">
            {/* Welcome Banner */}
            <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl overflow-hidden shadow-lg">
                <div className="absolute inset-0">
                    <img
                        src={dashboardBg}
                        alt="Nature pattern"
                        className="w-full h-full object-cover opacity-10 mix-blend-overlay"
                    />
                </div>
                <div className="relative p-8 md:p-10 text-white">
                    <h1 className="text-3xl font-bold mb-2">Welcome back, EcoWarrior!</h1>
                    <p className="text-emerald-50 text-lg max-w-xl">
                        Your contributions are making a real difference. You've helped save 12 trees this month!
                    </p>
                </div>
            </div>

            {/* Impact Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Issues Solved', value: '12', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800' },
                    { label: 'Pending Review', value: '3', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800' },
                    { label: 'Eco Points', value: '450', icon: Trophy, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-800' },
                    { label: 'Community Rank', value: '#5', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800' },
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

            {/* Recent Activity & Eco Tips */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Reports List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
                        <button className="text-emerald-600 dark:text-emerald-400 text-sm font-medium hover:underline">View All</button>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        {reports.slice(0, 3).map((report) => (
                            <div key={report.id} className="p-4 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex gap-4">
                                <img src={report.image} alt={report.title} className="w-16 h-16 rounded-lg object-cover" />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">{report.title}</h3>
                                        <span className={`px-2 py-0.5 text-xs rounded-full ${report.status === 'Solved' ? 'bg-emerald-100 text-emerald-700' :
                                            report.status === 'In Progress' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {report.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">{report.description}</p>
                                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                                        <MapPin size={12} />
                                        <span>{report.location}</span>
                                        <span>•</span>
                                        <span>{report.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Did You Know Widget */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Eco Awareness</h2>
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border border-emerald-100 dark:border-emerald-800">
                        <div className="flex items-start gap-4">
                            <Leaf className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">Did You Know?</h3>
                                <p className="text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed">
                                    Recycling one aluminum can saves enough energy to run a TV for three hours. Small actions create big impact!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Upcoming Events</h3>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex flex-col items-center justify-center text-blue-600 dark:text-blue-400">
                                    <span className="text-xs font-bold">FEB</span>
                                    <span className="text-lg font-bold">24</span>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white">City Park Cleanup</h4>
                                    <p className="text-xs text-gray-500">10:00 AM - Central Park</p>
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-4 py-2 text-sm text-emerald-600 font-medium hover:bg-emerald-50 rounded-lg transition-colors">
                            View All Events
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderNewReport = () => (
        <div className="max-w-3xl mx-auto p-6 animate-fade-in">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Submit New Report</h1>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Issue Category</label>
                                <select name="category" className="w-full rounded-xl border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-3 border">
                                    <option>Garbage Dump</option>
                                    <option>Sewage Leak</option>
                                    <option>Air Pollution</option>
                                    <option>Noise Pollution</option>
                                    <option>Illegal Logging</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                                <input name="title" required placeholder="Brief summary of the issue" className="w-full rounded-xl border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-3 border" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                        <input name="location" required placeholder="Address or coordinates" className="w-full rounded-xl border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 pl-10 p-3 border dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                    </div>
                                    <button type="button" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-xl text-gray-700 dark:text-gray-300 transition-colors">
                                        <MapPin size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Photo Evidence</label>
                            <label className="flex flex-col items-center justify-center w-full h-full min-h-[200px] border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 transition-colors group">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <div className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                                        <Upload className="w-8 h-8 text-emerald-500" />
                                    </div>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold text-emerald-600">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 10MB)</p>
                                </div>
                                <input type="file" className="hidden" />
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <textarea name="description" rows={4} required placeholder="Describe the issue in detail..." className="w-full rounded-xl border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-3 border" />
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                            Submit Report
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );

    const renderMapView = () => {
        const center = [45.128, -93.461];

        return (
            <div className="h-full relative p-6 animate-fade-in flex flex-col">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Community Map</h1>
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden relative border border-gray-300 dark:border-gray-700 z-0">
                    <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {reports.map((report) => {
                            const [lat, lng] = report.location.split(',').map(coord => parseFloat(coord.trim()));
                            if (isNaN(lat) || isNaN(lng)) return null;

                            return (
                                <Marker key={report.id} position={[lat, lng]}>
                                    <Popup>
                                        <div className="p-1">
                                            <strong className="block text-sm font-bold">{report.title}</strong>
                                            <span className="text-xs text-gray-500">{report.category} - {report.status}</span>
                                        </div>
                                    </Popup>
                                </Marker>
                            );
                        })}
                    </MapContainer>
                </div>
            </div>
        );
    };

    const renderCommunity = () => (
        <div className="p-6 animate-fade-in max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Community Hub</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Leaderboard</h2>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => {
                                const userName = `EcoWarrior_${100 + i}`;
                                const initials = "EW";
                                const colors = ['bg-emerald-500', 'bg-blue-500', 'bg-amber-500', 'bg-purple-500', 'bg-red-500'];
                                return (
                                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <span className={`w-6 text-center font-bold ${i === 1 ? 'text-yellow-500' : 'text-gray-500'}`}>{i}</span>
                                            <div className={`w-10 h-10 rounded-full ${colors[i - 1]} flex items-center justify-center text-white font-bold text-xs`}>
                                                {initials}
                                            </div>
                                            <span className="font-medium text-gray-700 dark:text-gray-200">{userName}</span>
                                        </div>
                                        <span className="font-bold text-emerald-600">{1000 - (i * 50)} pts</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-xl font-bold mb-2">Weekend Beach Cleanup</h2>
                                <p className="text-indigo-100 mb-4">Join 50+ volunteers this Saturday at Sunny Beach.</p>
                                <div className="flex gap-4 text-sm font-medium mb-6">
                                    <span className="flex items-center gap-1"><Calendar size={16} /> Sat, Aug 24</span>
                                    <span className="flex items-center gap-1"><Clock size={16} /> 09:00 AM</span>
                                </div>
                                <button className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors">
                                    RSVP Now
                                </button>
                            </div>
                            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                <Users size={32} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Discussion Forum</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                            Join the conversation about local environmental issues.
                            <br />
                            <button className="mt-4 text-emerald-600 font-medium hover:underline flex items-center justify-center gap-2 mx-auto">
                                Go to Forums <ArrowRight size={16} />
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderProfile = () => (
        <div className="p-6 animate-fade-in max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Eco-Warrior Profile</h1>
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
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name || 'Eco Warrior'}</h2>
                                <p className="text-gray-500 dark:text-gray-400">Citizen Contributor • Joined Jan 2024</p>
                            </div>
                        </div>
                        <Button>Edit Profile</Button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-8">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 mb-1">
                                            <Mail size={16} />
                                            <span className="text-sm">Email</span>
                                        </div>
                                        <p className="font-medium text-gray-900 dark:text-white">{user?.email || 'not-available@eco.com'}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 mb-1">
                                            <Phone size={16} />
                                            <span className="text-sm">Phone</span>
                                        </div>
                                        <p className="font-medium text-gray-900 dark:text-white">+1 (555) 987-6543</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Achievements</h3>
                                <div className="flex flex-wrap gap-4">
                                    {[
                                        { name: 'First Report', color: 'bg-emerald-100 text-emerald-700' },
                                        { name: 'Clean Streets', color: 'bg-blue-100 text-blue-700' },
                                        { name: 'Active Citizen', color: 'bg-amber-100 text-amber-700' }
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
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Impact Summary</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 text-sm">Reports Submitted</span>
                                        <span className="font-bold text-emerald-600">{reports.length}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 text-sm">Resolved Issues</span>
                                        <span className="font-bold text-emerald-600">8</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500 text-sm">Eco Points</span>
                                        <span className="font-bold text-purple-600">450</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderMyReports = () => (
        <div className="p-6 animate-fade-in max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Submitted Reports</h1>
                <Button onClick={() => setActiveTab('new-report')} className="flex items-center gap-2">
                    <PlusCircle size={18} />
                    New Report
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.length > 0 ? (
                    reports.map((report) => (
                        <div key={report.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="relative h-48">
                                <img src={report.image} alt={report.title} className="w-full h-full object-cover" />
                                <div className="absolute top-4 right-4">
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-sm ${report.status === 'Solved' ? 'bg-emerald-500 text-white' :
                                        report.status === 'In Progress' ? 'bg-amber-500 text-white' : 'bg-red-500 text-white'
                                        }`}>
                                        {report.status}
                                    </span>
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase mb-2">
                                    <Leaf size={14} />
                                    {report.category}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{report.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{report.description}</p>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-700">
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <MapPin size={14} />
                                        <span>{report.location}</span>
                                    </div>
                                    <span className="text-xs text-gray-400">{report.date}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                        <AlertTriangle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No reports found</h3>
                        <p className="text-gray-500">You haven't submitted any environmental reports yet.</p>
                        <Button onClick={() => setActiveTab('new-report')} variant="outline" className="mt-6">
                            Submit Your First Report
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <DashboardLayout>
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'new-report' && renderNewReport()}
            {activeTab === 'map' && renderMapView()}
            {activeTab === 'community' && renderCommunity()}
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'my-reports' && renderMyReports()}
        </DashboardLayout>
    );
};

export default UserDashboard;
