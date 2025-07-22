import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { UserRole, USER_ROLES } from './types';

const Register: React.FC = () => {
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'attendee' as UserRole
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
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
      const result = await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role
      });
      
      if (result.success) {
        setRegistrationSuccess(true);
      } else {
        setErrors({ general: result.error || 'Registration failed' });
      }
    } catch (err: any) {
      setErrors({ general: err.message || 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (registrationSuccess) {
    return (
      <div className="container" style={{ maxWidth: '400px', margin: '0 auto', paddingTop: '40px' }}>
        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
            <h1 style={{ marginBottom: '16px' }}>Registration Successful!</h1>
            <p className="card-text mb-24">
              Your account has been created successfully. Please check your email for a verification link.
            </p>
            <Link to="/login" className="btn btn-primary btn-block">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isFormValid = formData.name && formData.email && formData.password && 
                     formData.confirmPassword && Object.keys(errors).length === 0;

  return (
    <div className="register-page">
      <div className="container" style={{ maxWidth: '400px', margin: '0 auto', paddingTop: '40px' }}>
        <div className="card">
          <div className="card-header text-center">
            <h1>Create Account</h1>
            <p className="card-text">Join the Eventos community</p>
          </div>
          
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`form-control ${errors.name ? 'error' : ''}`}
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  autoComplete="name"
                  disabled={isSubmitting || loading}
                />
                {errors.name && (
                  <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${errors.email ? 'error' : ''}`}
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  disabled={isSubmitting || loading}
                />
                {errors.email && (
                  <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Role Selection */}
              <div className="form-group">
                <label htmlFor="role" className="form-label">
                  Account Type
                </label>
                <select
                  id="role"
                  name="role"
                  className="form-control"
                  value={formData.role}
                  onChange={handleInputChange}
                  disabled={isSubmitting || loading}
                >
                  {Object.entries(USER_ROLES).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
                <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '4px' }}>
                  Choose "Organizer" if you plan to create events
                </div>
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className={`form-control ${errors.password ? 'error' : ''}`}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a password"
                    required
                    autoComplete="new-password"
                    disabled={isSubmitting || loading}
                    style={{ paddingRight: '50px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
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
                    disabled={isSubmitting || loading}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.password && (
                  <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`form-control ${errors.confirmPassword ? 'error' : ''}`}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    required
                    autoComplete="new-password"
                    disabled={isSubmitting || loading}
                    style={{ paddingRight: '50px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                    disabled={isSubmitting || loading}
                  >
                    {showConfirmPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              {/* General Error Message */}
              {errors.general && (
                <div style={{
                  backgroundColor: '#ffeaa7',
                  border: '1px solid #fdcb6e',
                  color: '#2d3436',
                  padding: '12px',
                  borderRadius: '6px',
                  marginBottom: '16px',
                  fontSize: '14px'
                }}>
                  {errors.general}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className={`btn btn-primary btn-block ${(!isFormValid || isSubmitting || loading) ? 'disabled' : ''}`}
                disabled={!isFormValid || isSubmitting || loading}
              >
                {isSubmitting || loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <div className="spinner" style={{ width: '16px', height: '16px' }}></div>
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          </div>

          {/* Login Link */}
          <div className="card-body" style={{ borderTop: '1px solid #e9ecef', textAlign: 'center' }}>
            <p style={{ margin: '0', fontSize: '14px', color: '#6c757d' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#0d6efd', fontWeight: '500' }}>
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
