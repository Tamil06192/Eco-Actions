import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ArrowRight } from 'lucide-react';
import Button from '../components/Button';

const Splash = () => {
    return (
        <div className="min-h-screen bg-primary-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4 transition-colors duration-200">
            <div className="text-center space-y-8 animate-fade-in-up">
                {/* Logo Animation */}
                <Link to="/home" className="relative inline-block hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 bg-primary-200 dark:bg-primary-900 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                    <div className="relative bg-primary-500 p-8 rounded-3xl shadow-xl">
                        <Leaf className="w-24 h-24 text-white" />
                    </div>
                </Link>

                {/* Brand Name & Slogan */}
                <div className="space-y-4">
                    <Link to="/home" className="block hover:opacity-80 transition-opacity">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Eco<span className="text-primary-600 dark:text-primary-400">Action</span>
                        </h1>
                    </Link>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                        Empowering communities to build a cleaner, greener future together.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                    <Link to="/home">
                        <Button size="lg" className="w-full sm:w-auto min-w-[200px] text-lg shadow-lg group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 border-0">
                            Get Started
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Footer / Copyright */}
            <div className="absolute bottom-8 text-gray-400 dark:text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} EcoAction Platform
            </div>
        </div>
    );
};

export default Splash;
