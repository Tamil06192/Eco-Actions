import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useAuth } from '../context/AuthContext';
import { StorageService } from '../services/storage';
import Button from '../components/Button';
import Card from '../components/Card';
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
import dashboardBg from '../assets/images/new4.jpg';
import dashboardCard from '../assets/images/new5.jpg';

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
                    { label: 'Issues Solved', value: '12', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800', delay: 'stagger-1' },
                    { label: 'Pending Review', value: '3', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800', delay: 'stagger-2' },
                    { label: 'Eco Points', value: '450', icon: Trophy, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-800', delay: 'stagger-3' },
                    { label: 'Community Rank', value: '#5', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800', delay: 'stagger-4' },
                ].map((stat, index) => (
                    <Card key={index} className={`p-6 border ${stat.border} ${stat.bg}`} delay={stat.delay}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</h3>
                            <stat.icon className={`${stat.color} w-6 h-6`} />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    </Card>
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
                    <Card className="border-none" delay="stagger-1">
                        {reports.slice(0, 3).map((report, idx) => (
                            <div key={report.id} className="p-5 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex gap-5">
                                <div className="relative group overflow-hidden rounded-xl shrink-0">
                                    <img src={report.image} alt={report.title} className="w-20 h-20 rounded-xl object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">{report.title}</h3>
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${report.status === 'Solved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40' :
                                            report.status === 'In Progress' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40' : 'bg-red-100 text-red-700 dark:bg-red-900/40'
                                            }`}>
                                            {report.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">{report.description}</p>
                                    <div className="flex items-center gap-4 mt-3 text-xs font-medium text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={14} className="text-emerald-500" />
                                            <span>{report.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            <span>{report.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Card>
                </div>

                {/* Awareness & Events */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Eco Awareness</h2>
                    <Card className="p-6 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800" delay="stagger-2">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white dark:bg-emerald-800 rounded-xl shadow-sm shrink-0">
                                <Leaf className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-emerald-900 dark:text-emerald-100 mb-2">Did You Know?</h3>
                                <p className="text-sm text-emerald-800 dark:text-emerald-200 leading-relaxed font-medium">
                                    Recycling one aluminum can saves enough energy to run a TV for three hours. Small actions create big impact!
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6" delay="stagger-3">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-5">Upcoming Events</h3>
                        <div className="space-y-4">
                            <div className="flex gap-4 items-center group cursor-pointer p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex flex-col items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 border border-blue-200 dark:border-blue-800">
                                    <span className="text-xs font-black">FEB</span>
                                    <span className="text-xl font-black">24</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">City Park Cleanup</h4>
                                    <p className="text-xs font-medium text-gray-500">10:00 AM • Central Park</p>
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-6 py-2.5 text-sm text-emerald-600 dark:text-emerald-400 font-bold hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-xl transition-all border border-emerald-100 dark:border-emerald-800">
                            View All Events
                        </button>
                    </Card>
                </div>
            </div>
        </div>
    );

    const renderNewReport = () => (
        <div className="max-w-4xl mx-auto p-6 animate-fade-in">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Submit New Report</h1>
            <Card className="p-8 border-none" delay="stagger-1">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">Issue Category</label>
                                <select name="category" className="w-full rounded-xl border-gray-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-3.5 border transition-all">
                                    <option>Garbage Dump</option>
                                    <option>Sewage Leak</option>
                                    <option>Air Pollution</option>
                                    <option>Noise Pollution</option>
                                    <option>Illegal Logging</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">Title</label>
                                <input name="title" required placeholder="Brief summary of the issue" className="w-full rounded-xl border-gray-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-3.5 border transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">Location</label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <MapPin className="absolute left-4 top-4 h-5 w-5 text-emerald-500" />
                                        <input name="location" required placeholder="Address or coordinates" className="w-full rounded-xl border-gray-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 pl-11 p-3.5 border dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all" />
                                    </div>
                                    <button type="button" className="px-4 py-2 bg-gray-50 hover:bg-emerald-50 dark:bg-gray-700 dark:hover:bg-emerald-900/30 rounded-xl text-gray-700 dark:text-gray-300 transition-all border border-gray-200 dark:border-gray-600 hover:border-emerald-200">
                                        <MapPin size={20} className="text-emerald-500" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">Photo Evidence</label>
                            <label className="flex flex-col items-center justify-center w-full h-full min-h-[250px] border-2 border-gray-200 border-dashed rounded-2xl cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-emerald-50/50 dark:border-gray-600 dark:hover:border-emerald-500/50 transition-all group">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                        <Upload className="w-10 h-10 text-emerald-500" />
                                    </div>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-bold text-emerald-600">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs font-medium text-gray-400 dark:text-gray-500">SVG, PNG, JPG or GIF (MAX. 10MB)</p>
                                </div>
                                <input type="file" className="hidden" />
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">Description</label>
                        <textarea name="description" rows={4} required placeholder="Describe the issue in detail..." className="w-full rounded-xl border-gray-200 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-4 border transition-all" />
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" size="lg" className="px-10 py-4 shadow-xl hover:shadow-2xl translate-y-0 hover:-translate-y-1 transition-all">
                            Submit Report
                        </Button>
                    </div>
                </form>
            </Card>
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
                    <Card className="p-8 border-none" delay="stagger-1">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Leaderboard</h2>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => {
                                const userName = `EcoWarrior_${100 + i}`;
                                const initials = "EW";
                                const colors = ['bg-emerald-500', 'bg-blue-500', 'bg-amber-500', 'bg-purple-500', 'bg-red-500'];
                                return (
                                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-2xl transition-all hover:bg-white dark:hover:bg-gray-700 hover:shadow-md border border-transparent hover:border-emerald-100 dark:hover:border-emerald-900/40">
                                        <div className="flex items-center gap-4">
                                            <span className={`w-8 text-center font-black text-lg ${i === 1 ? 'text-yellow-500' : 'text-gray-400'}`}>{i}</span>
                                            <div className={`w-12 h-12 rounded-full ${colors[i - 1]} flex items-center justify-center text-white font-black text-sm shadow-inner`}>
                                                {initials}
                                            </div>
                                            <span className="font-bold text-gray-800 dark:text-gray-200">{userName}</span>
                                        </div>
                                        <span className="font-black text-emerald-600 dark:text-emerald-400">{1000 - (i * 50)} pts</span>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-700 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group animate-slide-up stagger-2">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-12 -translate-y-12 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-black mb-2">Weekend Beach Cleanup</h2>
                                    <p className="text-indigo-100 font-medium">Join 50+ volunteers this Saturday at Sunny Beach.</p>
                                </div>
                                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md">
                                    <Users size={32} />
                                </div>
                            </div>
                            <div className="flex gap-6 text-sm font-bold mb-8">
                                <span className="flex items-center gap-2 bg-black/10 px-3 py-1.5 rounded-lg"><Calendar size={18} /> Aug 24</span>
                                <span className="flex items-center gap-2 bg-black/10 px-3 py-1.5 rounded-lg"><Clock size={18} /> 09:00 AM</span>
                            </div>
                            <button className="w-full sm:w-auto px-10 py-3.5 bg-white text-indigo-700 rounded-xl font-black text-sm hover:bg-indigo-50 transition-all shadow-lg hover:shadow-2xl">
                                RSVP Now
                            </button>
                        </div>
                    </div>

                    <Card className="p-8 border-none" delay="stagger-3">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Discussion Forum</h2>
                        <div className="py-8 text-center">
                            <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                <Users size={32} className="text-emerald-600" />
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 font-medium mb-6">
                                Join the conversation about local environmental issues and share your ideas.
                            </p>
                            <button className="text-emerald-600 dark:text-emerald-400 font-black hover:bg-emerald-50 dark:hover:bg-emerald-900/20 px-6 py-2 rounded-xl transition-all flex items-center justify-center gap-2 mx-auto">
                                Go to Forums <ArrowRight size={18} />
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );

    const renderProfile = () => (
        <div className="p-6 animate-fade-in max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Eco-Warrior Profile</h1>
            <Card className="border-none overflow-hidden" delay="stagger-1">
                <div className="h-40 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 relative">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,#fff,transparent)] animate-pulse"></div>
                </div>
                <div className="px-10 pb-10">
                    <div className="relative flex justify-between items-end -mt-16 mb-8">
                        <div className="flex items-end gap-6">
                            <div className="w-32 h-32 bg-white dark:bg-gray-800 rounded-3xl p-1 shadow-2xl transition-transform hover:scale-105 duration-500">
                                <div className="w-full h-full bg-gray-100 dark:bg-gray-700 rounded-[22px] flex items-center justify-center text-gray-400 overflow-hidden">
                                    <User size={60} />
                                </div>
                            </div>
                            <div className="mb-2">
                                <h2 className="text-3xl font-black text-gray-900 dark:text-white">{user?.name || 'Eco Warrior'}</h2>
                                <p className="text-gray-500 dark:text-gray-400 font-bold flex items-center gap-2">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                                    Citizen Contributor • Joined Jan 2024
                                </p>
                            </div>
                        </div>
                        <Button size="lg" className="shadow-lg">Edit Profile</Button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="md:col-span-2 space-y-10">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                                    <Mail className="text-emerald-500" /> Account Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="p-5 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 transition-colors cursor-default">
                                        <div className="flex items-center gap-3 text-gray-400 mb-2">
                                            <Mail size={16} />
                                            <span className="text-xs font-black uppercase">Email</span>
                                        </div>
                                        <p className="font-bold text-gray-900 dark:text-white">{user?.email || 'not-available@eco.com'}</p>
                                    </div>
                                    <div className="p-5 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 transition-colors cursor-default">
                                        <div className="flex items-center gap-3 text-gray-400 mb-2">
                                            <Phone size={16} />
                                            <span className="text-xs font-black uppercase">Phone</span>
                                        </div>
                                        <p className="font-bold text-gray-900 dark:text-white">+1 (555) 987-6543</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                                    <Award className="text-emerald-500" /> Achievements
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    {[
                                        { name: 'First Report', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40' },
                                        { name: 'Clean Streets', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40' },
                                        { name: 'Active Citizen', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40' }
                                    ].map((badge, i) => (
                                        <div key={i} className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl ${badge.color} font-black text-sm shadow-sm hover:shadow-md transition-all truncate hover:-translate-y-1`}>
                                            <Award size={18} />
                                            <span>{badge.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-gray-50 dark:bg-gray-700/30 p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-inner">
                                <h3 className="font-black text-gray-900 dark:text-white mb-6 text-lg">Impact Summary</h3>
                                <div className="space-y-5">
                                    <div className="flex justify-between items-center bg-white dark:bg-gray-700 p-3 rounded-xl shadow-sm">
                                        <span className="text-gray-500 font-bold text-sm">Reports</span>
                                        <span className="font-black text-xl text-emerald-600">{reports.length}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white dark:bg-gray-700 p-3 rounded-xl shadow-sm">
                                        <span className="text-gray-500 font-bold text-sm">Resolved</span>
                                        <span className="font-black text-xl text-emerald-600">8</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white dark:bg-gray-700 p-3 rounded-xl shadow-sm border-l-4 border-purple-500">
                                        <span className="text-gray-500 font-bold text-sm">Eco Points</span>
                                        <span className="font-black text-xl text-purple-600 font-mono">450</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );

    const renderMyReports = () => (
        <div className="p-6 animate-fade-in max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white">My Environmental Reports</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-bold mt-1">Track and manage your community contributions.</p>
                </div>
                <Button onClick={() => setActiveTab('new-report')} size="lg" className="flex items-center gap-3 shadow-xl hover:shadow-emerald-500/20">
                    <PlusCircle size={22} strokeWidth={2.5} />
                    New Report
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reports.length > 0 ? (
                    reports.map((report, idx) => (
                        <Card key={report.id} className="flex flex-col h-full border-none group" delay={`stagger-${(idx % 4) + 1}`}>
                            <div className="relative h-60 overflow-hidden">
                                <img src={report.image} alt={report.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute top-4 right-4 z-20">
                                    <span className={`px-4 py-1.5 text-xs font-black rounded-full shadow-2xl backdrop-blur-md ${report.status === 'Solved' ? 'bg-emerald-500 text-white' :
                                        report.status === 'In Progress' ? 'bg-amber-500 text-white' : 'bg-red-500 text-white'
                                        }`}>
                                        {report.status}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 text-[10px] text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-[0.2em] mb-3">
                                    <Leaf size={14} strokeWidth={3} />
                                    {report.category}
                                </div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 transition-colors duration-300">{report.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 font-medium line-clamp-2 mb-6 leading-relaxed">{report.description}</p>
                                <div className="mt-auto flex items-center justify-between pt-5 border-t border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                                        <MapPin size={16} className="text-emerald-500" />
                                        <span>{report.location}</span>
                                    </div>
                                    <span className="text-xs font-black text-gray-300">{report.date}</span>
                                </div>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full py-24 text-center bg-gray-50/50 dark:bg-gray-800/20 rounded-3xl border-4 border-dashed border-gray-100 dark:border-gray-800 animate-pulse">
                        <AlertTriangle className="w-20 h-20 text-gray-200 dark:text-gray-700 mx-auto mb-6" />
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">No reports found</h3>
                        <p className="text-gray-500 dark:text-gray-400 font-bold max-w-sm mx-auto">You haven't submitted any environmental reports yet. Start making a difference today!</p>
                        <Button onClick={() => setActiveTab('new-report')} variant="outline" size="lg" className="mt-10 px-8 py-3 border-emerald-500 text-emerald-600 hover:bg-emerald-50">
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
