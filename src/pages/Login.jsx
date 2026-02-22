import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { User, Users, ShieldCheck, ArrowLeft } from 'lucide-react'; // Import icons
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

    // Set initial login type based on param, or default to 'user' if not present
    const [loginType, setLoginType] = useState(roleParam === 'citizen' ? 'user' : roleParam || 'user');

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
            // Admin check using simplified credentials if through the generic portal
            if (email === 'admin' && password === 'admin') {
                console.log('Admin login success');
                login({ name: 'Admin User', email, role: 'admin' });
            } else {
                setError('Invalid admin credentials. Try admin / admin');
            }
        } else if (loginType === 'volunteer') {
            // Mock volunteer login
            if (email && password) {
                console.log('Volunteer login success');
                login({ name: 'Volunteer Name', email, role: 'volunteer' });
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
                        {loginType === 'volunteer' && (
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Don't have an account?{' '}
                                <Link to="/signup/volunteer" className="font-medium text-amber-600 hover:text-amber-500">
                                    Sign up here
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

                    <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800">
                        <div className="text-center space-y-4">
                            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Switch Login Portal</p>
                            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                                {loginType !== 'user' && (
                                    <Link to="/login?role=citizen" onClick={() => setLoginType('user')} className="text-sm font-bold text-emerald-600 hover:text-emerald-500 flex items-center">
                                        <User className="w-4 h-4 mr-1" />
                                        Citizen
                                    </Link>
                                )}
                                {loginType !== 'volunteer' && (
                                    <Link to="/login?role=volunteer" onClick={() => setLoginType('volunteer')} className="text-sm font-bold text-amber-600 hover:text-amber-500 flex items-center">
                                        <Users className="w-4 h-4 mr-1" />
                                        Volunteer
                                    </Link>
                                )}
                                {loginType !== 'admin' && (
                                    <Link to="/admin/login" className="text-sm font-bold text-blue-600 hover:text-blue-500 flex items-center">
                                        <ShieldCheck className="w-4 h-4 mr-1" />
                                        Admin
                                    </Link>
                                )}
                            </div>
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
