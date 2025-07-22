import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { useNotifications } from '../components/NotificationProvider';

const Login: React.FC = () => {
  const { login, loading, error } = useAuth();
  const { showSuccess, showError } = useNotifications();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (loginError) setLoginError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError(null);

    // Basic validation
    if (!formData.email || !formData.password) {
      const errorMsg = 'Please fill in all fields';
      setLoginError(errorMsg);
      showError(errorMsg);
      setIsSubmitting(false);
      return;
    }

    if (!formData.email.includes('@')) {
      const errorMsg = 'Please enter a valid email address';
      setLoginError(errorMsg);
      showError(errorMsg);
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await login(formData);
      
      if (!result.success) {
        const errorMsg = result.error || 'Login failed';
        setLoginError(errorMsg);
        showError(errorMsg);
      } else {
        // Show success notification
        showSuccess('¡Login exitoso! Bienvenido de vuelta.', 2000);
        // If successful, the AuthProvider will handle the redirect
      }
    } catch (err: any) {
      const errorMsg = err.message || 'An unexpected error occurred';
      setLoginError(errorMsg);
      showError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.email && formData.password;

  return (
    <div className="login-page">
      <div className="container" style={{ maxWidth: '400px', margin: '0 auto', paddingTop: '40px' }}>
        <div className="card">
          <div className="card-header text-center">
            <h1>Welcome Back</h1>
            <p className="card-text">Sign in to your Eventos account</p>
          </div>
          
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {/* Email Field */}
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
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  disabled={isSubmitting || loading}
                />
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
                    className="form-control"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
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
              </div>

              {/* Error Message */}
              {(loginError || error) && (
                <div style={{
                  backgroundColor: '#ffeaa7',
                  border: '1px solid #fdcb6e',
                  color: '#2d3436',
                  padding: '12px',
                  borderRadius: '6px',
                  marginBottom: '16px',
                  fontSize: '14px'
                }}>
                  {loginError || error}
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
                    Signing In...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Forgot Password Link */}
              <div className="text-center mt-16">
                <Link to="/forgot-password" style={{ fontSize: '14px', color: '#0d6efd' }}>
                  Forgot your password?
                </Link>
              </div>
            </form>
          </div>

          {/* Register Link */}
          <div className="card-body" style={{ borderTop: '1px solid #e9ecef', textAlign: 'center' }}>
            <p style={{ margin: '0', fontSize: '14px', color: '#6c757d' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#0d6efd', fontWeight: '500' }}>
                Sign up here
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
