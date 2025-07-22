import React, { useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { USER_ROLES } from '../auth/types';

const Profile: React.FC = () => {
  const { user, updateProfile, logout, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear messages when user starts typing
    if (updateMessage) setUpdateMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const result = await updateProfile({
        name: formData.name.trim()
      });

      if (result.success) {
        setUpdateMessage({ type: 'success', text: 'Profile updated successfully!' });
        setIsEditing(false);
      } else {
        setUpdateMessage({ type: 'error', text: result.error || 'Failed to update profile' });
      }
    } catch (error: any) {
      setUpdateMessage({ type: 'error', text: error.message || 'An unexpected error occurred' });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || ''
    });
    setIsEditing(false);
    setUpdateMessage(null);
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      await logout();
    }
  };

  if (!user) {
    return (
      <div className="container text-center" style={{ paddingTop: '40px' }}>
        <h1>Please log in to view your profile</h1>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="profile-page">
      <div className="container" style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '20px' }}>
        {/* Profile Header */}
        <div className="card mb-24">
          <div className="card-body text-center">
            {/* Avatar */}
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#0d6efd',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontWeight: 'bold',
              margin: '0 auto 16px'
            }}>
              {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
            </div>
            
            <h1 style={{ marginBottom: '8px' }}>{user.name || 'User'}</h1>
            <p className="card-text" style={{ marginBottom: '8px' }}>{user.email}</p>
            <span style={{
              backgroundColor: '#e3f2fd',
              color: '#1976d2',
              padding: '4px 12px',
              borderRadius: '16px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              {USER_ROLES[user.role]}
            </span>
          </div>
        </div>

        {/* Profile Details */}
        <div className="card mb-24">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Profile Information</h2>
            {!isEditing && (
              <button 
                className="btn btn-outline"
                onClick={() => setIsEditing(true)}
                disabled={loading}
              >
                Edit
              </button>
            )}
          </div>
          
          <div className="card-body">
            {updateMessage && (
              <div style={{
                backgroundColor: updateMessage.type === 'success' ? '#d4edda' : '#ffeaa7',
                border: `1px solid ${updateMessage.type === 'success' ? '#c3e6cb' : '#fdcb6e'}`,
                color: updateMessage.type === 'success' ? '#155724' : '#2d3436',
                padding: '12px',
                borderRadius: '6px',
                marginBottom: '16px',
                fontSize: '14px'
              }}>
                {updateMessage.text}
              </div>
            )}

            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isUpdating}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    disabled
                    style={{ backgroundColor: '#f8f9fa', color: '#6c757d' }}
                  />
                  <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '4px' }}>
                    Email cannot be changed. Contact support if needed.
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-secondary btn-block"
                      onClick={handleCancel}
                      disabled={isUpdating}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      disabled={isUpdating || !formData.name.trim()}
                    >
                      {isUpdating ? (
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                          <div className="spinner" style={{ width: '16px', height: '16px' }}></div>
                          Saving...
                        </span>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div>
                <div className="row mb-16">
                  <div className="col-4">
                    <strong>Name:</strong>
                  </div>
                  <div className="col-8">
                    {user.name || 'Not set'}
                  </div>
                </div>
                
                <div className="row mb-16">
                  <div className="col-4">
                    <strong>Email:</strong>
                  </div>
                  <div className="col-8">
                    {user.email}
                  </div>
                </div>
                
                <div className="row mb-16">
                  <div className="col-4">
                    <strong>Role:</strong>
                  </div>
                  <div className="col-8">
                    {USER_ROLES[user.role]}
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-4">
                    <strong>Member since:</strong>
                  </div>
                  <div className="col-8">
                    {formatDate(user.created_at)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Account Actions */}
        <div className="card">
          <div className="card-header">
            <h3>Account Actions</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12 col-md-6 mb-16">
                <button className="btn btn-outline btn-block">
                  Change Password
                </button>
              </div>
              <div className="col-12 col-md-6 mb-16">
                <button 
                  className="btn btn-secondary btn-block"
                  onClick={handleLogout}
                  disabled={loading}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
