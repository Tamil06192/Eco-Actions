import React from 'react';

const Service = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 pt-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Our Services
                    </h1>
                    <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-400">
                        We connect citizens, volunteers, and authorities to create a cleaner environment.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        { title: 'Report Issues', desc: 'Easily report environmental hazards in your area with location and photos.' },
                        { title: 'Track Progress', desc: 'Monitor the status of your reports in real-time as authorities respond.' },
                        { title: 'Community Action', desc: 'Join local cleanup drives and connect with other eco-conscious citizens.' },
                    ].map((service, idx) => (
                        <div key={idx} className="bg-gray-50 dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{service.title}</h3>
                            <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{service.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Service;
