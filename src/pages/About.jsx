import React from 'react';
import Card from '../components/Card';
import profile1 from '../assets/images/profile1.jpg';
import profile2 from '../assets/images/profile2.jpg';
import profile3 from '../assets/images/profile3.jpg';
import profile4 from '../assets/images/profile4.jpg';

const About = () => {
    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <div className="relative bg-gray-900 text-white py-32 mb-16 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=1600"
                        alt="Volunteers planting trees"
                        className="w-full h-full object-cover opacity-40 scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                </div>
                <div className="relative container mx-auto px-4 text-center animate-slide-up">
                    <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">Protecting Our <span className="text-emerald-500">Planet</span></h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300 font-medium leading-relaxed">
                        Building a sustainable future through radical transparency, community action, and next-gen technology.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-12 mb-32">
                    <Card className="p-10 border-none bg-emerald-50 dark:bg-emerald-900/20" delay="stagger-1">
                        <div className="w-16 h-16 bg-white dark:bg-emerald-800 rounded-2xl shadow-xl flex items-center justify-center mb-8 rotate-3 transition-transform hover:rotate-0">
                            <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Our Mission</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg font-medium">
                            EcoAction is a community-driven platform designed to bridge the gap between citizens and environmental management organizations.
                            Our mission is to empower individuals to take action against environmental issues in their local area, fostering a cleaner and healthier community for everyone.
                        </p>
                    </Card>
                    <Card className="p-10 border-none bg-blue-50 dark:bg-blue-900/20" delay="stagger-2">
                        <div className="w-16 h-16 bg-white dark:bg-blue-800 rounded-2xl shadow-xl flex items-center justify-center mb-8 -rotate-3 transition-transform hover:rotate-0">
                            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">Our Vision</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg font-medium">
                            We envision a world where every citizen feels empowered to protect their environment. A world where transparency and accountability lead to rapid resolution of ecological problems.
                            Through technology and community engagement, we aim to create sustainable cities and preserve nature for future generations.
                        </p>
                    </Card>
                </div>

                {/* Our Core Values */}
                <div className="mb-32">
                    <div className="text-center mb-16 animate-slide-up">
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Our Core Values</h2>
                        <p className="text-gray-500 font-bold">The principles that guide everything we do.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: 'Transparency', desc: 'Open data and clear communication in every process.', color: 'emerald' },
                            { title: 'Community', desc: 'Power to the people to make changes in their locale.', color: 'teal' },
                            { title: 'Sustainability', desc: 'Long-term thinking for a greener planet.', color: 'blue' },
                            { title: 'Action', desc: 'Moving beyond words to tangible results.', color: 'indigo' }
                        ].map((val, i) => (
                            <Card key={i} className="p-8 border-none bg-gray-50 dark:bg-gray-800 hover:shadow-2xl transition-all" delay={`stagger-${i + 1}`}>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                    <span className={`w-2 h-8 bg-${val.color}-500 rounded-full`}></span>
                                    {val.title}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{val.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Our Team */}
                <div className="mb-32">
                    <div className="text-center mb-16 animate-slide-up">
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
                        <p className="text-gray-500 font-bold">Dedicated experts working for a better world.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {[
                            { name: 'Sarah Johnson', role: 'Executive Director', image: profile1 },
                            { name: 'David Smith', role: 'Operations Manager', image: profile2 },
                            { name: 'Emily Davis', role: 'Community Outreach', image: profile3 },
                            { name: 'Michael Brown', role: 'Technical Lead', image: profile4 },
                        ].map((member, i) => (
                            <Card key={i} className="p-8 border-none bg-white dark:bg-gray-800 text-center group" delay={`stagger-${(i % 4) + 1}`}>
                                <div className="relative mb-6 inline-block">
                                    <div className="absolute inset-0 bg-emerald-500 rounded-full scale-110 opacity-0 group-hover:opacity-20 transition-all duration-500 blur-md"></div>
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-32 h-32 rounded-full mx-auto relative z-10 object-cover border-4 border-white dark:border-gray-700 shadow-xl group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-emerald-500 transition-colors">{member.name}</h3>
                                <p className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{member.role}</p>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* History/Timeline */}
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">Our Journey</h2>
                    <div className="space-y-8">
                        {[
                            { year: '2024', title: 'Global Expansion', desc: 'Reached 1 million active users across 50 cities.' },
                            { year: '2023', title: 'Mobile App Launch', desc: 'Released iOS and Android apps for on-the-go reporting.' },
                            { year: '2022', title: 'Partnership Program', desc: 'Collaborated with 20+ NGOs to accelerate problem resolution.' },
                            { year: '2021', title: 'Platform Inception', desc: 'EcoAction was founded with a simple goal: make reporting easy.' },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="flex-shrink-0 w-24 text-right font-bold text-primary-600 dark:text-primary-400">{item.year}</div>
                                <div className="flex-grow pb-8 border-l-2 border-primary-200 dark:border-gray-700 pl-8 relative">
                                    <div className="absolute w-3 h-3 bg-primary-500 rounded-full -left-[7px] top-1.5"></div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* History/Timeline */}
                <div className="max-w-4xl mx-auto mb-32">
                    <div className="text-center mb-16 animate-slide-up">
                        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Our Journey</h2>
                        <p className="text-gray-500 font-bold">The milestones that shaped our movement.</p>
                    </div>
                    <div className="space-y-0">
                        {[
                            { year: '2024', title: 'Global Expansion', desc: 'Reached 1 million active users across 50 cities.', icon: '🌍' },
                            { year: '2023', title: 'Mobile App Launch', desc: 'Released iOS and Android apps for on-the-go reporting.', icon: '📱' },
                            { year: '2022', title: 'Partnership Program', desc: 'Collaborated with 20+ NGOs to accelerate problem resolution.', icon: '🤝' },
                            { year: '2021', title: 'Platform Inception', desc: 'EcoAction was founded with a simple goal: make reporting easy.', icon: '🌱' },
                        ].map((item, i) => (
                            <div key={i} className="flex group animate-slide-up" style={{ animationDelay: `${i * 150}ms` }}>
                                <div className="flex-shrink-0 w-24 text-right pt-2 font-black text-emerald-600 dark:text-emerald-400 text-xl">{item.year}</div>
                                <div className="flex-grow pb-12 border-l-4 border-gray-100 dark:border-gray-800 ml-8 pl-12 relative group-last:border-transparent">
                                    <div className="absolute w-6 h-6 bg-white dark:bg-gray-800 border-4 border-emerald-500 rounded-full -left-[14px] top-2 z-10 group-hover:scale-125 transition-transform duration-300"></div>
                                    <div className="p-8 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-transparent hover:border-emerald-100 dark:hover:border-emerald-900/40 hover:bg-white dark:hover:bg-gray-800 transition-all hover:shadow-xl">
                                        <div className="text-3xl mb-4">{item.icon}</div>
                                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{item.title}</h3>
                                        <p className="text-gray-500 dark:text-gray-300 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;

