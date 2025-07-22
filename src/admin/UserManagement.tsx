import React, { useState, useEffect } from 'react';
import { User, UserRole, USER_ROLES } from '../auth/types';
import { firebaseUserApi } from '../auth/firebaseAuth';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../auth/firebase';

interface UserFormData {
  name: string;
  email: string;
  role: UserRole;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    role: 'attendee'
  });

  // Load users from Firebase
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const usersQuery = query(collection(db, 'users'), orderBy('created_at', 'desc'));
      const querySnapshot = await getDocs(usersQuery);
      
      const usersData: User[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        usersData.push({
          id: doc.id,
          email: data.email,
          name: data.name,
          role: data.role,
          avatar_url: data.avatar_url,
          created_at: data.created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
          updated_at: data.updated_at?.toDate?.()?.toISOString() || new Date().toISOString()
        });
      });
      
      setUsers(usersData);
      setError(null);
    } catch (err: any) {
      setError('Failed to load users: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name || '',
      email: user.email,
      role: user.role
    });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'attendee' });
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    setIsUpdating(true);
    try {
      const { data, error } = await firebaseUserApi.updateProfile(editingUser.id, {
        name: formData.name.trim(),
        role: formData.role
      });

      if (error) {
        throw new Error(error.message);
      }

      // Update local state
      setUsers(prev => prev.map(user => 
        user.id === editingUser.id 
          ? { ...user, name: formData.name.trim(), role: formData.role, updated_at: data?.updated_at || new Date().toISOString() }
          : user
      ));

      setEditingUser(null);
      setFormData({ name: '', email: '', role: 'attendee' });
    } catch (err: any) {
      setError('Failed to update user: ' + err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return { backgroundColor: '#dc3545', color: 'white' };
      case 'organizer':
        return { backgroundColor: '#fd7e14', color: 'white' };
      case 'attendee':
        return { backgroundColor: '#6c757d', color: 'white' };
      default:
        return { backgroundColor: '#e9ecef', color: '#495057' };
    }
  };

  if (loading) {
    return (
      <div className="card">
        <div className="card-body text-center">
          <div className="spinner" style={{ width: '32px', height: '32px', margin: '0 auto 16px' }}></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-management">
      {/* Header */}
      <div className="card mb-24">
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>User Management</h2>
          <button 
            className="btn btn-primary"
            onClick={loadUsers}
            disabled={loading}
          >
            🔄 Refresh
          </button>
        </div>
        
        {error && (
          <div className="card-body">
            <div style={{
              backgroundColor: '#ffeaa7',
              border: '1px solid #fdcb6e',
              color: '#2d3436',
              padding: '12px',
              borderRadius: '6px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          </div>
        )}
      </div>

      {/* Users Statistics */}
      <div className="row mb-24">
        <div className="col-4">
          <div className="card text-center">
            <div className="card-body">
              <h3 style={{ color: '#0d6efd', marginBottom: '8px' }}>{users.length}</h3>
              <p style={{ margin: '0', fontSize: '14px' }}>Total Users</p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card text-center">
            <div className="card-body">
              <h3 style={{ color: '#fd7e14', marginBottom: '8px' }}>
                {users.filter(u => u.role === 'organizer').length}
              </h3>
              <p style={{ margin: '0', fontSize: '14px' }}>Organizers</p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card text-center">
            <div className="card-body">
              <h3 style={{ color: '#dc3545', marginBottom: '8px' }}>
                {users.filter(u => u.role === 'admin').length}
              </h3>
              <p style={{ margin: '0', fontSize: '14px' }}>Admins</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="card-header">
          <h3>All Users ({users.length})</h3>
        </div>
        <div className="card-body" style={{ padding: '0' }}>
          {users.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <p>No users found.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>User</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>Email</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>Role</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600' }}>Joined</th>
                    <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} style={{ borderBottom: '1px solid #f8f9fa' }}>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#0d6efd',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '16px',
                            fontWeight: 'bold'
                          }}>
                            {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontWeight: '500' }}>{user.name || 'No name'}</div>
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>ID: {user.id.slice(0, 8)}...</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ fontSize: '14px' }}>{user.email}</div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <span style={{
                          ...getRoleBadgeColor(user.role),
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '500',
                          textTransform: 'uppercase'
                        }}>
                          {USER_ROLES[user.role]}
                        </span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ fontSize: '14px' }}>{formatDate(user.created_at)}</div>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <button
                          className="btn btn-outline"
                          onClick={() => handleEditUser(user)}
                          disabled={isUpdating}
                          style={{ fontSize: '12px', padding: '6px 12px' }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{ padding: '24px', borderBottom: '1px solid #e9ecef' }}>
              <h3 style={{ margin: '0' }}>Edit User</h3>
            </div>
            
            <form onSubmit={handleUpdateUser} style={{ padding: '24px' }}>
              <div className="form-group">
                <label htmlFor="edit-name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="edit-name"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isUpdating}
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="edit-email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  disabled
                  style={{ backgroundColor: '#f8f9fa', color: '#6c757d' }}
                />
                <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '4px' }}>
                  Email cannot be changed
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="edit-role" className="form-label">
                  Role
                </label>
                <select
                  id="edit-role"
                  name="role"
                  className="form-control"
                  value={formData.role}
                  onChange={handleInputChange}
                  disabled={isUpdating}
                >
                  {Object.entries(USER_ROLES).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="row" style={{ marginTop: '24px' }}>
                <div className="col-6">
                  <button
                    type="button"
                    className="btn btn-secondary btn-block"
                    onClick={handleCancelEdit}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
