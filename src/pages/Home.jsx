import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import About from './About';
import Service from './Service';
import homeHero from '../assets/images/home-hero.jpg';
import homeFeature from '../assets/images/home-feature.jpg';
import eventImage from '../assets/images/event-1.jpg';

const Home = () => {
    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-primary-50 dark:bg-gray-900 pt-16 pb-32 space-y-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                            <h1>
                                <span className="block text-base text-primary-600 font-semibold tracking-wide uppercase">
                                    EcoAction
                                </span>
                                <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl text-gray-900 dark:text-white">
                                    <span className="block">Report Local</span>
                                    <span className="block text-primary-600">Environmental Issues</span>
                                </span>
                            </h1>
                            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl dark:text-gray-300">
                                Empowering citizens to report illegal dumping, pollution, and other environmental concerns directly to local authorities. Track progress and assist in resolving issues for a cleaner community.
                            </p>
                            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                                <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
                                    <Link to="/signup">
                                        <Button size="lg" className="w-full sm:w-auto">
                                            Get Started
                                            <ArrowRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    </Link>
                                    <a href="#about">
                                        <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                            Learn More
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                                <div className="relative block w-full bg-white rounded-lg overflow-hidden group">
                                    <div className="absolute inset-0 bg-primary-500/10 group-hover:bg-primary-500/0 transition-colors duration-300"></div>
                                    <img
                                        src={homeHero}
                                        alt="Eco-friendly city"
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                            How It Works
                        </h2>
                        <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
                            Three simple steps to make a difference in your community.
                        </p>
                    </div>
                    <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                        {[
                            {
                                icon: <Camera className="h-10 w-10 text-primary-600" />,
                                title: 'Snap a Photo',
                                description: 'Capture evidence of the environmental issue using your smartphone.',
                            },
                            {
                                icon: <MapPin className="h-10 w-10 text-primary-600" />,
                                title: 'Report Location',
                                description: 'Geo-tag the incident so authorities know exactly where to go.',
                            },
                            {
                                icon: <CheckCircle className="h-10 w-10 text-primary-600" />,
                                title: 'Track Resolution',
                                description: 'Follow the status of your report from submission to solution.',
                            },
                        ].map((feature, index) => (
                            <div key={index} className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900 mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">{feature.title}</h3>
                                <p className="mt-4 text-base text-gray-500 dark:text-gray-300">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section className="py-20 bg-primary-50 dark:bg-gray-900 overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <img
                                src={homeFeature}
                                alt="Community Cleanup"
                                className="rounded-2xl shadow-xl w-full h-80 object-cover"
                            />
                        </div>
                        <div className="md:w-1/2 space-y-6">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Upcoming Community Event</h2>
                            <h3 className="text-xl text-primary-600 font-semibold">City-Wide River Cleanup Drive</h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Join us this weekend for our biggest cleanup event of the year! We're targeting the city riverbanks to remove plastic waste and restore the natural habitat. Gloves and bags provided.
                            </p>
                            <div className="flex flex-col space-y-2">
                                <div className="flex items-center text-gray-700 dark:text-gray-300">
                                    <MapPin className="w-5 h-5 mr-3 text-primary-500" />
                                    <span>Central City Park, Riverside Entrance</span>
                                </div>
                                <div className="flex items-center text-gray-700 dark:text-gray-300">
                                    <CheckCircle className="w-5 h-5 mr-3 text-primary-500" />
                                    <span>Saturday, October 15th @ 9:00 AM</span>
                                </div>
                            </div>
                            <Button size="lg">Join the Event</Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Activity Section (Scrollable) */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Recent Community Reports</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[...Array(9)].map((_, i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 flex items-center justify-center">
                                    <Camera className="text-gray-400 w-12 h-12" />
                                </div>
                                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Community Report #{i + 1}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                    Citizens actively reporting issues in their local neighborhoods to foster a cleaner environment.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact Stats Section */}
            <section className="py-20 bg-primary-600">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { label: 'Reports Solved', value: '1,200+' },
                            { label: 'Active Volunteers', value: '450+' },
                            { label: 'Partner NGOs', value: '25' },
                            { label: 'Cities Covered', value: '12' },
                        ].map((stat, i) => (
                            <div key={i} className="text-white">
                                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                                <div className="text-primary-100">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">What People Say</h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl relative">
                                <div className="absolute top-0 left-0 transform -translate-x-2 -translate-y-4 text-6xl text-primary-200 dark:text-gray-600 opacity-50">"</div>
                                <p className="text-gray-600 dark:text-gray-300 italic mb-6">
                                    "EcoAction has completely transformed how our neighborhood deals with waste. It's so easy to use and the response time is incredible."
                                </p>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                                    <div>
                                        <div className="font-semibold text-gray-900 dark:text-white">Jane Doe {i}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Community Leader</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* About Section */}
            <section id="about">
                <About />
            </section>

            {/* Service Section */}
            <section id="service">
                <Service />
            </section>
        </div>
    );
};

export default Home;
