import React, { useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import UserManagement from './UserManagement';

type AdminTab = 'users' | 'events' | 'gallery' | 'analytics';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('users');

  if (!user || user.role !== 'admin') {
    return (
      <div className="container text-center" style={{ paddingTop: '40px' }}>
        <h1>Access Denied</h1>
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }

  const tabs = [
    { id: 'users', label: 'User Management', icon: '👥' },
    { id: 'events', label: 'Event Management', icon: '📅' },
    { id: 'gallery', label: 'Gallery Moderation', icon: '🖼️' },
    { id: 'analytics', label: 'Analytics', icon: '📊' }
  ] as const;

  return (
    <div className="admin-dashboard">
      <div className="container" style={{ paddingTop: '20px' }}>
        {/* Dashboard Header */}
        <div className="card mb-24">
          <div className="card-body text-center">
            <h1 style={{ marginBottom: '8px' }}>Admin Dashboard</h1>
            <p className="card-text">Welcome back, {user.name}</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="card mb-24">
          <div className="card-header" style={{ padding: '0' }}>
            <div style={{ 
              display: 'flex', 
              borderBottom: '1px solid #e9ecef',
              overflowX: 'auto'
            }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '16px 24px',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    borderBottom: activeTab === tab.id ? '3px solid #0d6efd' : '3px solid transparent',
                    color: activeTab === tab.id ? '#0d6efd' : '#6c757d',
                    fontWeight: activeTab === tab.id ? '600' : 'normal',
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'users' && <UserManagement />}
          
          {activeTab === 'events' && (
            <div className="card">
              <div className="card-body text-center">
                <h3>Event Management</h3>
                <p>Coming soon...</p>
              </div>
            </div>
          )}
          
          {activeTab === 'gallery' && (
            <div className="card">
              <div className="card-body text-center">
                <h3>Gallery Moderation</h3>
                <p>Coming soon...</p>
              </div>
            </div>
          )}
          
          {activeTab === 'analytics' && (
            <div className="card">
              <div className="card-body text-center">
                <h3>Analytics</h3>
                <p>Coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
