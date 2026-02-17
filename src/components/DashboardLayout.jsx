import React from 'react';
import Sidebar from './Sidebar';

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto relative w-full">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
