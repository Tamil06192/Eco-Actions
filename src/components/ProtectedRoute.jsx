import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth();
    const location = useLocation();

    console.log('ProtectedRoute Check:', { user, allowedRoles, path: location.pathname });

    if (!user) {
        // Redirect to login page but save the attempted location
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        console.log('Role mismatch, redirecting:', { userRole: user?.role, allowedRoles });
        // User is logged in but doesn't have permission
        // Redirect to their appropriate dashboard or home
        return <Navigate to={
            user.role === 'admin' ? '/dashboard/admin' :
                user.role === 'volunteer' ? '/dashboard/volunteer' :
                    '/dashboard/user'
        } replace />;
    }

    return children;
};

export default ProtectedRoute;
