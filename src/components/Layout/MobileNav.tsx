import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';

const MobileNav: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => {
    if (path === '/events') {
      return location.pathname === '/events' || location.pathname === '/' || location.pathname.startsWith('/events/');
    }
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav className="mobile-nav">
      <Link 
        to="/events" 
        className={`mobile-nav-item ${isActive('/events') ? 'active' : ''}`}
      >
        <span>📅</span>
        <span>Events</span>
      </Link>
      {user ? (
        <Link 
          to="/profile" 
          className={`mobile-nav-item ${isActive('/profile') ? 'active' : ''}`}
        >
          <span>👤</span>
          <span>Profile</span>
        </Link>
      ) : (
        <Link 
          to="/login" 
          className={`mobile-nav-item ${isActive('/login') ? 'active' : ''}`}
        >
          <span>🔐</span>
          <span>Login</span>
        </Link>
      )}
    </nav>
  );
};

export default MobileNav;
