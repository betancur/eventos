import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';

const Header: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isActive = (path: string) => {
    if (path === '/events') {
      return location.pathname === '/events' || location.pathname === '/' || location.pathname.startsWith('/events/');
    }
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
            Eventos
          </Link>
          
          {/* Desktop navigation - hidden on mobile */}
          <nav className="header-nav">
            <Link 
              to="/events" 
              className={isActive('/events') || isActive('/') ? 'active' : ''}
            >
              Events
            </Link>
          </nav>
          
          {/* User menu */}
          <div className="user-menu">
            {user ? (
              <div style={{ position: 'relative' }}>
                <button 
                  className="btn btn-outline"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: '#0d6efd',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ display: 'none' }} className="user-name-desktop">
                    {user.name || 'User'}
                  </span>
                </button>
                
                {/* Dropdown menu */}
                {showUserMenu && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: '0',
                    backgroundColor: 'white',
                    border: '1px solid #e9ecef',
                    borderRadius: '6px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    marginTop: '8px',
                    minWidth: '200px',
                    zIndex: 1000
                  }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid #e9ecef' }}>
                      <div style={{ fontWeight: '500' }}>{user.name || 'User'}</div>
                      <div style={{ fontSize: '12px', color: '#6c757d' }}>{user.email}</div>
                      <div style={{ fontSize: '11px', color: '#6c757d', textTransform: 'capitalize' }}>
                        {user.role}
                      </div>
                    </div>
                    <div style={{ padding: '8px 0' }}>
                      <Link 
                        to="/profile" 
                        style={{
                          display: 'block',
                          padding: '8px 16px',
                          textDecoration: 'none',
                          color: '#212529',
                          fontSize: '14px'
                        }}
                        onClick={() => setShowUserMenu(false)}
                      >
                        Profile
                      </Link>
                      {user.role === 'organizer' || user.role === 'admin' ? (
                        <Link 
                          to="/dashboard" 
                          style={{
                            display: 'block',
                            padding: '8px 16px',
                            textDecoration: 'none',
                            color: '#212529',
                            fontSize: '14px'
                          }}
                          onClick={() => setShowUserMenu(false)}
                        >
                          Dashboard
                        </Link>
                      ) : null}
                      <button
                        onClick={handleLogout}
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '8px 16px',
                          border: 'none',
                          background: 'none',
                          textAlign: 'left',
                          color: '#dc3545',
                          fontSize: '14px',
                          cursor: 'pointer'
                        }}
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link to="/login" className="btn btn-outline">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary register-btn-desktop" style={{ display: 'none' }}>
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Click outside to close menu */}
      {showUserMenu && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;
