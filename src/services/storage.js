import { mockReports, MOCK_DATA_VERSION } from '../data/mockData';

const STORAGE_KEY = 'eco_action_reports';
const VERSION_KEY = 'eco_action_data_version';

export const StorageService = {
    getReports: () => {
        const storedReports = localStorage.getItem(STORAGE_KEY);
        const storedVersion = localStorage.getItem(VERSION_KEY);

        if (!storedReports || storedVersion !== MOCK_DATA_VERSION) {
            // Initialize or update with new mock data
            localStorage.setItem(STORAGE_KEY, JSON.stringify(mockReports));
            localStorage.setItem(VERSION_KEY, MOCK_DATA_VERSION);
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
