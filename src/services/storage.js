import { mockReports } from '../data/mockData';

const STORAGE_KEY = 'eco_action_reports';

export const StorageService = {
    getReports: () => {
        const storedReports = localStorage.getItem(STORAGE_KEY);
        if (!storedReports) {
            // Initialize with mock data if empty
            localStorage.setItem(STORAGE_KEY, JSON.stringify(mockReports));
            return mockReports;
        }
        return JSON.parse(storedReports);
    },

    saveReport: (report) => {
        const reports = StorageService.getReports();
        const newReports = [report, ...reports];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newReports));
        return newReports;
    },

    updateReport: (id, updates) => {
        const reports = StorageService.getReports();
        const updatedReports = reports.map(report =>
            report.id === id ? { ...report, ...updates } : report
        );
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReports));
        return updatedReports;
    },

    deleteReport: (id) => {
        const reports = StorageService.getReports();
        const filteredReports = reports.filter(report => report.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredReports));
        return filteredReports;
    },

    // Clear storage (useful for testing or reset)
    clear: () => {
        localStorage.removeItem(STORAGE_KEY);
    }
};
