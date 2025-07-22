import React, { useState } from 'react';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from './firebase';

interface ChangePasswordProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear general message
    if (message) setMessage(null);
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Current password validation
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    // New password validation
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'New password must be at least 6 characters';
    } else if (formData.newPassword === formData.currentPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        setMessage({ 
          type: 'error', 
          text: 'No user logged in' 
        });
        return;
      }

      // Re-authenticate user with current password
      const credential = EmailAuthProvider.credential(user.email!, formData.currentPassword);
      await reauthenticateWithCredential(user, credential);
      
      // Update password
      await updatePassword(user, formData.newPassword);
      
      setMessage({ 
        type: 'success', 
        text: 'Password changed successfully!' 
      });
      
      // Clear form
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Call success callback after a short delay
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 2000);
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to change password' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.currentPassword && formData.newPassword && 
                     formData.confirmPassword && Object.keys(errors).length === 0;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '16px'
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Change Password</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '4px'
            }}
            disabled={isSubmitting}
          >
            ✕
          </button>
        </div>
        
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Current Password Field */}
            <div className="form-group">
              <label htmlFor="currentPassword" className="form-label">
                Current Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  id="currentPassword"
                  name="currentPassword"
                  className={`form-control ${errors.currentPassword ? 'error' : ''}`}
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  placeholder="Enter current password"
                  required
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  style={{ paddingRight: '50px' }}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('current')}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                  disabled={isSubmitting}
                >
                  {showPasswords.current ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.currentPassword && (
                <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                  {errors.currentPassword}
                </div>
              )}
            </div>

            {/* New Password Field */}
            <div className="form-group">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  className={`form-control ${errors.newPassword ? 'error' : ''}`}
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                  required
                  autoComplete="new-password"
                  disabled={isSubmitting}
                  style={{ paddingRight: '50px' }}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                  disabled={isSubmitting}
                >
                  {showPasswords.new ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.newPassword && (
                <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                  {errors.newPassword}
                </div>
              )}
            </div>

            {/* Confirm New Password Field */}
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm New Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`form-control ${errors.confirmPassword ? 'error' : ''}`}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm new password"
                  required
                  autoComplete="new-password"
                  disabled={isSubmitting}
                  style={{ paddingRight: '50px' }}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                  disabled={isSubmitting}
                >
                  {showPasswords.confirm ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.confirmPassword && (
                <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            {/* Message Display */}
            {message && (
              <div style={{
                backgroundColor: message.type === 'success' ? '#d4edda' : '#ffeaa7',
                border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#fdcb6e'}`,
                color: message.type === 'success' ? '#155724' : '#2d3436',
                padding: '12px',
                borderRadius: '6px',
                marginBottom: '16px',
                fontSize: '14px'
              }}>
                {message.text}
              </div>
            )}

            {/* Form Actions */}
            <div className="row">
              <div className="col-6">
                <button
                  type="button"
                  className="btn btn-secondary btn-block"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>
              <div className="col-6">
                <button
                  type="submit"
                  className={`btn btn-primary btn-block ${(!isFormValid || isSubmitting) ? 'disabled' : ''}`}
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <div className="spinner" style={{ width: '16px', height: '16px' }}></div>
                      Changing...
                    </span>
                  ) : (
                    'Change Password'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ChangePassword;