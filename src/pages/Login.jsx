import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { User, ShieldCheck, ArrowLeft } from 'lucide-react'; // Import icons
import adminLoginImg from '../assets/images/admin-login.jpg';
import volunteerLoginImg from '../assets/images/volunteer-hero.jpg';
import citizenLoginImg from '../assets/images/citizen-login.jpg';

const Login = () => {
    const { login, user } = useAuth(); // Get login function and user from context
    const navigate = useNavigate();
    const location = useLocation();

    // Get role from query parameter
    const searchParams = new URLSearchParams(location.search);
    const roleParam = searchParams.get('role');

    // Set initial login type based on param, or default to null/user if not present
    // We'll treat 'citizen' as 'user' for internal logic if needed, or keep as 'citizen' string
    const [loginType, setLoginType] = useState(roleParam === 'citizen' ? 'user' : roleParam || null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Update loginType if URL changes
    React.useEffect(() => {
        const role = searchParams.get('role');
        if (role) {
            setLoginType(role === 'citizen' ? 'user' : role);
        }
    }, [location.search]);

    // Redirect if user is already logged in or logs in successfully
    React.useEffect(() => {
        if (user) {
            console.log('User authenticated, redirecting...', user);
            // Default destinations based on role
            const defaultRedirect = user.role === 'admin' ? '/dashboard/admin' :
                user.role === 'volunteer' ? '/dashboard/volunteer' :
                    '/dashboard/user';

            // Prefer the 'from' state if available (e.g. redirected from a protected route), otherwise default
            const from = location.state?.from?.pathname || defaultRedirect;

            navigate(from, { replace: true });
        }
    }, [user, navigate, location]);

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        console.log('Login attempt:', { loginType, email, password });

        if (loginType === 'admin') {
            // Hardcoded admin check
            if (email === 'sample' && password === 'sample') {
                console.log('Admin login success');
                login({ name: 'Admin User', email, role: 'admin' });
            } else {
                setError('Invalid admin credentials. Try sample / sample');
            }
        } else if (loginType === 'volunteer') {
            // Mock volunteer login
            if (email && password) {
                console.log('Volunteer login success');
                login({ name: 'Volunteer Name', email, role: 'volunteer' }); // You might need to handle 'volunteer' role in your App/Auth context if specific logic exists
            } else {
                setError('Please fill in all fields');
            }
        } else {
            // Mock user (citizen) login
            if (email && password) {
                console.log('User login success');
                login({ name: 'John Doe', email, role: 'user' });
            } else {
                setError('Please fill in all fields');
            }
        }
    };

    const getTitle = () => {
        switch (loginType) {
            case 'admin': return 'Admin Portal Login';
            case 'volunteer': return 'Volunteer Login';
            case 'user': default: return 'Citizen Sign In';
        }
    };

    // If no specific role is selected (e.g. direct access to /login), show selection or default to Citizen
    // For now, if no format selected, we can show the selection cards, BUT the navbar dropdown sends specific roles.
    // If we want to support /login access without param, we keep the card selection.

    if (!loginType) {
        // ... existing card selection code ...
        // For brevity in this replace, assuming we might still want the cards if someone goes straight to /login
        // BUT the user request implies navigation from dropdown. 
        // Let's keep the card selection for fallback but update it to include Volunteer if needed, 
        // or just auto-redirect to citizen if that's preferred. 
        // The original code had cards for User and Admin. Let's keep existing structure for no-param access.
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
                <div className="max-w-4xl w-full space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                            Welcome to EcoAction
                        </h2>
                        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                            Please select your login type to continue.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                        {/* User Login Card */}
                        <div onClick={() => { setLoginType('user'); navigate('/login?role=citizen'); }} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-primary-500 group">
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="p-4 bg-primary-100 dark:bg-primary-900/50 rounded-full">
                                    <User className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Citizen</h3>
                                <Button className="w-full mt-2">Login</Button>
                            </div>
                        </div>

                        {/* Volunteer Login Card */}
                        <div onClick={() => { setLoginType('volunteer'); navigate('/login?role=volunteer'); }} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-amber-500 group">
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="p-4 bg-amber-100 dark:bg-amber-900/50 rounded-full">
                                    <User className="w-10 h-10 text-amber-600 dark:text-amber-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Volunteer</h3>
                                <Button className="w-full mt-2 bg-amber-600 hover:bg-amber-700">Login</Button>
                            </div>
                        </div>

                        {/* Admin Login Card */}
                        <div onClick={() => { setLoginType('admin'); navigate('/login?role=admin'); }} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-blue-500 group">
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="p-4 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                                    <ShieldCheck className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Admin</h3>
                                <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700">Login</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex">
            <div className="absolute top-4 left-4 z-10">
                <Link
                    to="/home"
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Home
                </Link>
            </div>

            {/* Left Side - Form */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-white dark:bg-gray-900 w-full lg:w-1/2">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
                            {getTitle()}
                        </h2>
                        {loginType === 'user' && (
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Or{' '}
                                <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-500">
                                    create a new account
                                </Link>
                            </p>
                        )}
                    </div>

                    <div className="mt-8">
                        <form onSubmit={handleLogin} className="space-y-6">
                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
                                    {error}
                                </div>
                            )}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email or Username
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        autoComplete="username"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-800 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-800 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <Button type="submit" className="w-full justify-center">
                                    Sign in
                                </Button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-8">
                        <div className={`p-4 rounded-lg ${loginType === 'admin' ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-green-50 dark:bg-green-900/20'}`}>
                            <p className={`text-sm ${loginType === 'admin' ? 'text-blue-800 dark:text-blue-200' : 'text-green-800 dark:text-green-200'}`}>
                                {loginType === 'admin' ? (
                                    <span><strong>Secure Access:</strong> This area is restricted to authorized personnel only.</span>
                                ) : (
                                    <span><strong>Safety Tip:</strong> Report emergencies to local authorities immediately (911).</span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden lg:block relative w-0 flex-1">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src={(() => {
                        switch (loginType) {
                            case 'admin':
                                return adminLoginImg;
                            case 'volunteer':
                                return volunteerLoginImg; // Volunteering/Group
                            case 'user':
                            default:
                                return citizenLoginImg; // Nature/Park
                        }
                    })()}
                    alt="Background"
                />
                <div className={`absolute inset-0 ${loginType === 'admin' ? 'bg-blue-900/60' :
                    loginType === 'volunteer' ? 'bg-amber-900/60' :
                        'bg-primary-900/40'
                    } mix-blend-multiply`} />
                <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
                    <blockquote className="relative">
                        <p className="text-xl font-medium leading-relaxed">
                            {(() => {
                                switch (loginType) {
                                    case 'admin':
                                        return "\"Efficient management of environmental resources is key to a sustainable future. Your work here makes a difference.\"";
                                    case 'volunteer':
                                        return "\"Volunteering is the ultimate exercise in democracy. You vote in elections once a year, but when you volunteer, you vote every day about the kind of community you want to live in.\"";
                                    case 'user':
                                    default:
                                        return "\"The platform is incredibly easy to use. I was able to report an illegal dump site near my home, and it was cleared within a week!\"";
                                }
                            })()}
                        </p>
                        <footer className="mt-4">
                            <p className="text-base font-semibold">
                                {(() => {
                                    switch (loginType) {
                                        case 'admin': return 'EcoAction Admin Team';
                                        case 'volunteer': return 'Community Volunteers';
                                        case 'user': default: return 'Sarah Jenkins';
                                    }
                                })()}
                            </p>
                            <p className="text-base text-primary-200">
                                {(() => {
                                    switch (loginType) {
                                        case 'admin': return 'System Message';
                                        case 'volunteer': return 'Join the Movement';
                                        case 'user': default: return 'Community Activist';
                                    }
                                })()}
                            </p>
                        </footer>
                    </blockquote>
                </div>
            </div>
        </div>
    );
};

export default Login;
