
import React from 'react';
import profile1 from '../assets/images/profile1.jpg';
import profile2 from '../assets/images/profile2.jpg';
import profile3 from '../assets/images/profile3.jpg';
import profile4 from '../assets/images/profile4.jpg';

const About = () => {
    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <div className="relative bg-gray-900 text-white py-24 mb-16">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=1600"
                        alt="Volunteers planting trees"
                        className="w-full h-full object-cover opacity-30"
                    />
                </div>
                <div className="relative container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">About EcoAction</h1>
                    <p className="text-xl max-w-2xl mx-auto text-gray-200">
                        Building a sustainable future through community action and transparent governance.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            EcoAction is a community-driven platform designed to bridge the gap between citizens and environmental management organizations.
                            Our mission is to empower individuals to take action against environmental issues in their local area, fostering a cleaner and healthier community for everyone.
                            We believe that small actions, when multiplied by millions of people, can transform the world.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            We envision a world where every citizen feels empowered to protect their environment. A world where transparency and accountability lead to rapid resolution of ecological problems.
                            Through technology and community engagement, we aim to create sustainable cities and preserve nature for future generations.
                        </p>
                    </div>
                </div>

                {/* Our Core Values */}
                <div className="mb-20 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Our Core Values</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: 'Transparency', desc: 'Open data and clear communication in every process.' },
                            { title: 'Community', desc: 'Power to the people to make changes in their locale.' },
                            { title: 'Sustainability', desc: 'Long-term thinking for a greener planet.' },
                            { title: 'Action', desc: 'Moving beyond words to tangible results.' }
                        ].map((val, i) => (
                            <div key={i} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl hover:-translate-y-1 transition-transform duration-300">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{val.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Our Team */}
                <div className="mb-16">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">Meet Our Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { name: 'Sarah Johnson', role: 'Executive Director', image: profile1 },
                            { name: 'David Smith', role: 'Operations Manager', image: profile2 },
                            { name: 'Emily Davis', role: 'Community Outreach', image: profile3 },
                            { name: 'Michael Brown', role: 'Technical Lead', image: profile4 },
                        ].map((member, i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                                />
                                <h3 className="font-medium text-gray-900 dark:text-white">{member.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                            </div>
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
            </div>
        </div>
    );
};

export default About;

