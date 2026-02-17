import React from 'react';
import { Download, FileText, Share2 } from 'lucide-react';
import Button from '../../components/Button';

const AdminReports = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
                <Button>
                    <Download className="w-4 h-4 mr-2" />
                    Export All Data
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: 'Monthly Activity Report', date: 'Oct 2023', size: '2.4 MB' },
                    { title: 'NGO Performance Review', date: 'Q3 2023', size: '1.1 MB' },
                    { title: 'Environmental Impact Assessment', date: 'Year 2023', size: '5.8 MB' },
                    { title: 'User Engagement Stats', date: 'Sep 2023', size: '900 KB' },
                    { title: 'Category Breakdown', date: 'Oct 2023', size: '1.2 MB' },
                    { title: 'Platform Audit Log', date: 'Last 30 Days', size: '8.5 MB' },
                ].map((report, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between">
                        <div>
                            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg w-fit mb-4">
                                <FileText className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{report.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Generated: {report.date}</p>
                        </div>

                        <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                            <span className="text-xs font-mono text-gray-400">{report.size}</span>
                            <div className="flex gap-2">
                                <button className="p-2 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                    <Share2 className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminReports;
