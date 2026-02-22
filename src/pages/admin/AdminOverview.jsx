import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line
} from 'recharts';
import {
    AlertTriangle,
    CheckCircle,
    Clock,
    FileText,
    TrendingUp,
    Users
} from 'lucide-react';

// Import local images for urgency alerts
import event1 from '../../assets/images/event-1.jpg';
import event2 from '../../assets/images/event-2.jpg';
import event3 from '../../assets/images/event-3.jpg';

const AdminOverview = () => {
    // Mock Data
    const kpiData = [
        { label: 'Total Reports', value: 1250, change: '+12%', icon: FileText, color: 'blue' },
        { label: 'Pending', value: 45, change: '-5%', icon: Clock, color: 'yellow' },
        { label: 'Resolved', value: 980, change: '+8%', icon: CheckCircle, color: 'green' },
        { label: 'Resolution Rate', value: '78%', change: '+2%', icon: TrendingUp, color: 'purple' },
    ];

    const categoryData = [
        { name: 'Garbage', value: 400 },
        { name: 'Pollution', value: 300 },
        { name: 'Deforestation', value: 200 },
        { name: 'Noise', value: 100 },
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const timelineData = [
        { name: 'Jan', reports: 65, solved: 40 },
        { name: 'Feb', reports: 59, solved: 45 },
        { name: 'Mar', reports: 80, solved: 70 },
        { name: 'Apr', reports: 81, solved: 60 },
        { name: 'May', reports: 56, solved: 50 },
        { name: 'Jun', reports: 55, solved: 48 },
        { name: 'Jul', reports: 40, solved: 35 },
    ];

    // Urgency Data with photos
    const urgencyAlerts = [
        { id: '#URG-1001', issue: 'Chemical Spill', location: 'Sector 4', time: '3h 30m', image: event1, type: 'Chemical' },
        { id: '#URG-1002', issue: 'Sewage Overflow', location: 'Sector 5', time: '5h 30m', image: event2, type: 'Water' },
        { id: '#URG-1003', issue: 'Illegal Dumping', location: 'Sector 6', time: '7h 30m', image: event3, type: 'Garbage' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiData.map((kpi, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{kpi.label}</p>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{kpi.value}</h3>
                            </div>
                            <div className={`p-2 rounded-lg bg-${kpi.color}-100 dark:bg-${kpi.color}-900/30 text-${kpi.color}-600 dark:text-${kpi.color}-400`}>
                                <kpi.icon className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className={kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                                {kpi.change}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400 ml-2">vs last month</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Resolution Timeline */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Report vs Resolution Timeline</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={timelineData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB' }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="reports" stroke="#3B82F6" strokeWidth={2} activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="solved" stroke="#10B981" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Categories Pie Chart */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Reports by Category</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* High Urgency Alerts */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-6">
                    <AlertTriangle className="text-red-500 w-5 h-5" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">High Urgency Alerts</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Open</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {urgencyAlerts.map((alert, i) => (
                                <tr key={i}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="h-12 w-16 overflow-hidden rounded-lg shadow-sm">
                                            <img src={alert.image} alt={alert.type} className="w-full h-full object-cover" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-mono">{alert.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-semibold">{alert.issue}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{alert.location}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-bold">{alert.time}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-primary-600 hover:text-primary-900 px-3 py-1 rounded-md hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">View Details</button>
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

export default AdminOverview;
