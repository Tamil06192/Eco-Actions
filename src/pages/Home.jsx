import { Link } from 'react-router-dom';
import { ArrowRight, Camera, MapPin, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import About from './About';
import Service from './Service';
import AnimatedBackground from '../components/AnimatedBackground';
import { mockReports } from '../data/mockData';

import homeHero from '../assets/images/home-hero.jpg';
import homeFeature from '../assets/images/new2.jpg';
import profile1 from '../assets/images/profile1.jpg';
import profile2 from '../assets/images/profile2.jpg';
import profile3 from '../assets/images/profile3.jpg';
import profile4 from '../assets/images/profile4.jpg';

const Home = () => {
    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-primary-50 dark:bg-gray-900 pt-16 pb-32 space-y-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left animate-slide-up">
                            <h1>
                                <span className="block text-base text-primary-600 font-semibold tracking-wide uppercase">
                                    EcoAction
                                </span>
                                <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl text-gray-900 dark:text-white">
                                    <span className="block text-glow dark:text-glow">Report Local</span>
                                    <span className="block text-primary-600 text-glow-primary">Environmental Issues</span>
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
                        <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center animate-fade-in-up stagger-2">
                            <div className="relative mx-auto w-full rounded-2xl shadow-2xl lg:max-w-md overflow-hidden hover-lift transition-all duration-500">
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
                <AnimatedBackground />
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center animate-slide-up">
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
                                delay: 'stagger-1'
                            },
                            {
                                icon: <MapPin className="h-10 w-10 text-primary-600" />,
                                title: 'Report Location',
                                description: 'Geo-tag the incident so authorities know exactly where to go.',
                                delay: 'stagger-2'
                            },
                            {
                                icon: <CheckCircle className="h-10 w-10 text-primary-600" />,
                                title: 'Track Resolution',
                                description: 'Follow the status of your report from submission to solution.',
                                delay: 'stagger-3'
                            },
                        ].map((feature, index) => (
                            <Card key={index} className="flex flex-col items-center text-center p-8 border-none bg-gray-50 dark:bg-gray-700 hover:shadow-xl transition-all" delay={feature.delay}>
                                <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-primary-100 dark:bg-primary-900/30 mb-6 transition-transform group-hover:rotate-6 duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                                <p className="mt-4 text-base text-gray-500 dark:text-gray-300">{feature.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section className="py-20 bg-primary-50 dark:bg-gray-900 overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2 animate-slide-up">
                            <img
                                src={homeFeature}
                                alt="Community Cleanup"
                                className="rounded-3xl shadow-2xl w-full h-96 object-cover hover-lift transition-all duration-500"
                            />
                        </div>
                        <div className="md:w-1/2 space-y-6 animate-slide-up stagger-2">
                            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">Upcoming Community Event</h2>
                            <h3 className="text-2xl text-primary-600 font-bold">City-Wide River Cleanup Drive</h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                Join us this weekend for our biggest cleanup event of the year! We're targeting the city riverbanks to remove plastic waste and restore the natural habitat. Gloves and bags provided.
                            </p>
                            <div className="flex flex-col space-y-3">
                                <div className="flex items-center text-gray-700 dark:text-gray-300 font-medium">
                                    <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg mr-4">
                                        <MapPin className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <span>Central City Park, Riverside Entrance</span>
                                </div>
                                <div className="flex items-center text-gray-700 dark:text-gray-300 font-medium">
                                    <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg mr-4">
                                        <CheckCircle className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <span>Saturday, October 15th @ 9:00 AM</span>
                                </div>
                            </div>
                            <Button size="lg" className="px-10">Join the Event</Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Activity Section */}
            <section className="py-24 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-slide-up">
                        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">Recent Community Reports</h2>
                        <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">Real-time updates from your fellow citizens making an impact.</p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {mockReports.slice(0, 6).map((report, index) => (
                            <Card key={report.id} className="flex flex-col h-full border-none" delay={`stagger-${(index % 4) + 1}`}>
                                <div className="h-56 bg-gray-200 dark:bg-gray-700 overflow-hidden relative group">
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10"></div>
                                    <img
                                        src={report.image}
                                        alt={report.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 right-4 z-20">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-md ${report.status === 'Solved' ? 'bg-green-500/90 text-white' :
                                            report.status === 'In Progress' ? 'bg-yellow-500/90 text-white' :
                                                'bg-red-500/90 text-white'
                                            }`}>
                                            {report.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2 line-clamp-1">{report.title}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                                        {report.description}
                                    </p>
                                    <div className="mt-auto flex items-center justify-between text-xs font-medium text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <div className="flex items-center">
                                            <MapPin className="w-4 h-4 mr-2 text-primary-500" />
                                            <span>{report.location}</span>
                                        </div>
                                        <span>{report.date}</span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Impact Stats Section */}
            <section className="py-24 bg-primary-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
                </div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        {[
                            { label: 'Reports Solved', value: '1,200+' },
                            { label: 'Active Volunteers', value: '450+' },
                            { label: 'Partner NGOs', value: '25' },
                            { label: 'Cities Covered', value: '12' },
                        ].map((stat, i) => (
                            <div key={i} className="text-white animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                                <div className="text-5xl font-extrabold mb-2">{stat.value}</div>
                                <div className="text-primary-100 font-medium text-lg">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 animate-slide-up">
                        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">What Citizens Say</h2>
                        <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">Join thousands of others making their city better, one report at a time.</p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            {
                                quote: "EcoAction has completely transformed how our neighborhood deals with waste. It's so easy to use and the response time is incredible.",
                                name: "Sarah Johnson",
                                role: "Community Leader",
                                image: profile1,
                                delay: 'stagger-1'
                            },
                            {
                                quote: "I reported an illegal dump site on Monday, and by Wednesday it was cleared! Seeing the impact of my report was so satisfying.",
                                name: "Michael Chen",
                                role: "Local Resident",
                                image: profile2,
                                delay: 'stagger-2'
                            },
                            {
                                quote: "As a volunteer, I've met amazing people through the cleanup events. This platform makes it easy to find where help is needed most.",
                                name: "Emily Rodriguez",
                                role: "Environmental Activist",
                                image: profile3,
                                delay: 'stagger-3'
                            }
                        ].map((testimonial, i) => (
                            <Card key={i} className="p-10 relative border-none bg-gray-50 dark:bg-gray-700/50" delay={testimonial.delay} glass={true}>
                                <div className="absolute top-4 left-6 text-8xl text-primary-500/10 font-serif leading-none">"</div>
                                <p className="text-gray-600 dark:text-gray-300 italic mb-8 relative z-10 text-lg leading-relaxed">
                                    {testimonial.quote}
                                </p>
                                <div className="flex items-center">
                                    <div className="relative">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-primary-500 p-0.5 shadow-md"
                                        />
                                        <div className="absolute -bottom-1 right-3 bg-primary-500 rounded-full p-1 text-white">
                                            <CheckCircle size={12} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900 dark:text-white text-lg">{testimonial.name}</div>
                                        <div className="text-sm font-medium text-primary-600 dark:text-primary-400">{testimonial.role}</div>
                                    </div>
                                </div>
                            </Card>
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
