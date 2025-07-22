import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ForgotPassword: React.FC = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (message) setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage({ type: 'error', text: 'Please enter your email address' });
      return;
    }

    if (!email.includes('@')) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await resetPassword(email);
      
      if (result.success) {
        setEmailSent(true);
        setMessage({ 
          type: 'success', 
          text: 'Password reset instructions have been sent to your email' 
        });
      } else {
        setMessage({ 
          type: 'error', 
          text: result.error || 'Failed to send reset email' 
        });
      }
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.message || 'An unexpected error occurred' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (emailSent) {
    return (
      <div className="forgot-password-page">
        <div className="container" style={{ maxWidth: '400px', margin: '0 auto', paddingTop: '40px' }}>
          <div className="card">
            <div className="card-body text-center">
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📧</div>
              <h1 style={{ marginBottom: '16px' }}>Check Your Email</h1>
              <p className="card-text mb-24">
                We've sent password reset instructions to <strong>{email}</strong>. 
                Please check your email and follow the instructions to reset your password.
              </p>
              
              <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
                <p style={{ fontSize: '14px', color: '#6c757d', margin: '0' }}>
                  Didn't receive the email? Check your spam folder or try again with a different email address.
                </p>
              </div>

              <div className="row">
                <div className="col-6">
                  <Link to="/login" className="btn btn-outline btn-block">
                    Back to Login
                  </Link>
                </div>
                <div className="col-6">
                  <button 
                    className="btn btn-primary btn-block"
                    onClick={() => {
                      setEmailSent(false);
                      setEmail('');
                      setMessage(null);
                    }}
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-password-page">
      <div className="container" style={{ maxWidth: '400px', margin: '0 auto', paddingTop: '40px' }}>
        <div className="card">
          <div className="card-header text-center">
            <h1>Reset Password</h1>
            <p className="card-text">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
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
                  value={email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  disabled={isSubmitting}
                />
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

              {/* Submit Button */}
              <button
                type="submit"
                className={`btn btn-primary btn-block ${(!email || isSubmitting) ? 'disabled' : ''}`}
                disabled={!email || isSubmitting}
              >
                {isSubmitting ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <div className="spinner" style={{ width: '16px', height: '16px' }}></div>
                    Sending...
                  </span>
                ) : (
                  'Send Reset Instructions'
                )}
              </button>
            </form>
          </div>

          {/* Back to Login Link */}
          <div className="card-body" style={{ borderTop: '1px solid #e9ecef', textAlign: 'center' }}>
            <p style={{ margin: '0', fontSize: '14px', color: '#6c757d' }}>
              Remember your password?{' '}
              <Link to="/login" style={{ color: '#0d6efd', fontWeight: '500' }}>
                Back to login
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;