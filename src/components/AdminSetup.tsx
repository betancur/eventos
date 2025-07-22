import React, { useState } from 'react';
import { createAdminUser } from '../utils/createAdmin';

const AdminSetup: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCreateAdmin = async () => {
    setIsCreating(true);
    try {
      const adminResult = await createAdminUser();
      setResult(adminResult);
    } catch (error) {
      setResult({ success: false, error: 'Failed to create admin' });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', margin: '0 auto', paddingTop: '40px' }}>
      <div className="card">
        <div className="card-header text-center">
          <h1>Admin Setup</h1>
          <p>Create the first admin user</p>
        </div>
        
        <div className="card-body">
          {!result ? (
            <div>
              <p>This will create an admin user with the following credentials:</p>
              <ul>
                <li><strong>Email:</strong> admin@eventos.com</li>
                <li><strong>Password:</strong> admin123456</li>
                <li><strong>Role:</strong> Admin</li>
              </ul>
              
              <button
                className={`btn btn-primary btn-block ${isCreating ? 'disabled' : ''}`}
                onClick={handleCreateAdmin}
                disabled={isCreating}
              >
                {isCreating ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <div className="spinner" style={{ width: '16px', height: '16px' }}></div>
                    Creating Admin...
                  </span>
                ) : (
                  'Create Admin User'
                )}
              </button>
            </div>
          ) : (
            <div>
              {result.success ? (
                <div>
                  <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '16px' }}>✅</div>
                  <h3 style={{ textAlign: 'center', color: 'green' }}>Admin Created Successfully!</h3>
                  <p><strong>Email:</strong> {result.credentials.email}</p>
                  <p><strong>Password:</strong> {result.credentials.password}</p>
                  <p><strong>Role:</strong> Admin</p>
                  <div className="row" style={{ marginTop: '24px' }}>
                    <div className="col-12">
                      <a href="/login" className="btn btn-primary btn-block">
                        Go to Login
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '16px' }}>❌</div>
                  <h3 style={{ textAlign: 'center', color: 'red' }}>Failed to Create Admin</h3>
                  <p style={{ color: '#dc3545' }}>{result.error}</p>
                  <button 
                    className="btn btn-secondary btn-block"
                    onClick={() => setResult(null)}
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSetup;
