import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { StorageService } from '../../services/storage';

const AdminGeo = () => {
    const reports = StorageService.getReports();
    // Centered roughly on the reports or a default location
    const center = [45.128, -93.461];

    return (
        <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Geo Monitoring</h1>
                <div className="flex gap-2">
                    <button className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm text-sm font-medium border border-gray-200 dark:border-gray-700">Heatmap Mode</button>
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium">Export GeoJSON</button>
                </div>
            </div>

            <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden relative z-0">
                <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {reports.map((report) => {
                        // Very rough parsing of location string "lat, lng"
                        // Assuming format "45.123, -93.456" from mockData
                        const [lat, lng] = report.location.split(',').map(coord => parseFloat(coord.trim()));
                        if (isNaN(lat) || isNaN(lng)) return null;

                        return (
                            <Marker key={report.id} position={[lat, lng]}>
                                <Popup>
                                    <div className="p-1">
                                        <strong className="block text-sm font-bold">{report.title}</strong>
                                        <span className="text-xs text-gray-500">{report.category} - {report.status}</span>
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </div>
        </div>
    );
};

export default AdminGeo;
