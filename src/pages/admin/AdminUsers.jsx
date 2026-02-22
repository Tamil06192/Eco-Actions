import React, { useState } from 'react';
import { Search, UserCheck, UserX, Shield, Award } from 'lucide-react';
import Button from '../../components/Button';

import profile1 from '../../assets/images/profile1.jpg';
import profile2 from '../../assets/images/profile2.jpg';
import profile3 from '../../assets/images/profile3.jpg';
import profile4 from '../../assets/images/profile4.jpg';

const AdminUsers = () => {
    // Mock user data
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Citizen', status: 'Active', points: 150, image: profile1 },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Volunteer', status: 'Active', points: 340, image: profile2 },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Citizen', status: 'Suspended', points: 20, image: profile3 },
        { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Admin', status: 'Active', points: 0, image: profile4 },
        { id: 5, name: 'David Lee', email: 'david@example.com', role: 'Volunteer', status: 'Pending', points: 0, image: profile1 },
    ]);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleStatus = (id) => {
        setUsers(users.map(user => {
            if (user.id === id) {
                return { ...user, status: user.status === 'Active' ? 'Suspended' : 'Active' };
            }
            return user;
        }));
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
                <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eco Points</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {user.image ? (
                                                <img src={user.image} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 font-bold">
                                                    {user.name.charAt(0)}
                                                </div>
                                            )}
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-900 dark:text-white">
                                            {user.role === 'Admin' && <Shield className="w-4 h-4 mr-1 text-blue-500" />}
                                            {user.role}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-900 dark:text-white">
                                            <Award className="w-4 h-4 mr-1 text-yellow-500" />
                                            {user.points}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-800' :
                                            user.status === 'Suspended' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => toggleStatus(user.id)}
                                            className={`text-sm ${user.status === 'Active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                                        >
                                            {user.status === 'Active' ? <UserX className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
