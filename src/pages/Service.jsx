import React from 'react';
import Card from '../components/Card';
import { ShieldCheck, Zap, Globe, BarChart3, Users, Leaf } from 'lucide-react';

const Service = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20 animate-slide-up">
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">
                        Our <span className="text-emerald-500">Services</span>
                    </h1>
                    <p className="max-w-2xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                        We connect citizens, volunteers, and authorities with cutting-edge tools to create a cleaner, more sustainable environment.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            title: 'Smart Reporting',
                            desc: 'Easily report environmental hazards in your area with precise GPS location and photo evidence.',
                            icon: Zap,
                            color: 'emerald'
                        },
                        {
                            title: 'Real-time Tracking',
                            desc: 'Monitor the status of your reports in real-time as authorities and volunteers respond to the issue.',
                            icon: BarChart3,
                            color: 'blue'
                        },
                        {
                            title: 'Volunteer Network',
                            desc: 'Join local cleanup drives, track your impact, and earn Eco Points for your community service.',
                            icon: Users,
                            color: 'indigo'
                        },
                        {
                            title: 'Regional Monitoring',
                            desc: 'Interactive maps showing environmental health status across different regions and cities.',
                            icon: Globe,
                            color: 'teal'
                        },
                        {
                            title: 'Authority Dashboard',
                            desc: 'Powerful tools for environmental organizations to manage reports and coordinate responses efficiently.',
                            icon: ShieldCheck,
                            color: 'purple'
                        },
                        {
                            title: 'Eco Analytics',
                            desc: 'Detailed insights and impact reports showing how community actions are improving our planet.',
                            icon: Leaf,
                            color: 'emerald'
                        }
                    ].map((service, idx) => (
                        <Card key={idx} className="p-10 border-none group hover:shadow-2xl transition-all" delay={`stagger-${(idx % 4) + 1}`}>
                            <div className={`w-14 h-14 bg-${service.color}-50 dark:bg-${service.color}-900/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                <service.icon className={`w-7 h-7 text-${service.color}-600 dark:text-${service.color}-400`} />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-emerald-500 transition-colors">{service.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{service.desc}</p>
                        </Card>
                    ))}
                </div>

                <div className="mt-32 p-12 bg-gray-900 rounded-[40px] text-center relative overflow-hidden group animate-slide-up stagger-4">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,#fff,transparent)] group-hover:scale-150 transition-transform duration-1000"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Ready to make a difference?</h2>
                        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium">Join thousands of citizens who are already helping to protect our local environment.</p>
                        <button className="px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl hover:shadow-emerald-500/20 translate-y-0 hover:-translate-y-1 transition-all">
                            Get Started Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Service;
