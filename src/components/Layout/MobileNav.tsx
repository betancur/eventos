import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';

const MobileNav: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => {
    if (path === '/events') {
      return location.pathname === '/events' || location.pathname === '/';
    }
    return location.pathname === path;
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
      <Link 
        to="/gallery" 
        className={`mobile-nav-item ${isActive('/gallery') ? 'active' : ''}`}
      >
        <span>📸</span>
        <span>Gallery</span>
      </Link>
      <Link 
        to="/map" 
        className={`mobile-nav-item ${isActive('/map') ? 'active' : ''}`}
      >
        <span>🗺️</span>
        <span>Map</span>
      </Link>
      <Link 
        to="/activities" 
        className={`mobile-nav-item ${isActive('/activities') ? 'active' : ''}`}
      >
        <span>🎯</span>
        <span>Activities</span>
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
