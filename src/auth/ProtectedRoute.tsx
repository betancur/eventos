import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { UserRole, hasPermission } from './types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole = 'attendee',
  requireAuth = true 
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="container text-center" style={{ paddingTop: '40px' }}>
        <div className="spinner" style={{ width: '40px', height: '40px', margin: '0 auto' }}></div>
        <p style={{ marginTop: '16px' }}>Loading...</p>
      </div>
    );
  }

  // If authentication is required but user is not logged in
  if (requireAuth && !user) {
    // Save the attempted location for redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is logged in but doesn't have required role
  if (user && requiredRole && !hasPermission(user.role, requiredRole)) {
    return (
      <div className="container text-center" style={{ paddingTop: '40px' }}>
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div className="card-body">
            <h1 style={{ color: '#dc3545', marginBottom: '16px' }}>Access Denied</h1>
            <p className="card-text">
              You don't have permission to access this page. 
              This area requires {requiredRole} level access or higher.
            </p>
            <p className="card-text">
              Your current role: <strong>{user.role}</strong>
            </p>
            <button 
              onClick={() => window.history.back()} 
              className="btn btn-secondary mt-16"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If all checks pass, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
