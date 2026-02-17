import React from 'react';
import { Leaf } from 'lucide-react';

import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <Link to="/home" className="flex items-center space-x-2 mb-4 md:mb-0 hover:opacity-80 transition-opacity">
                        <div className="bg-primary-500 p-1.5 rounded-lg">
                            <Leaf className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">EcoAction</span>
                    </Link>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        &copy; {new Date().getFullYear()} EcoAction. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
