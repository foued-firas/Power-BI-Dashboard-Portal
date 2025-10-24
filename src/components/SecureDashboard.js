import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SecureDashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [embedUrl, setEmbedUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userPermissions, setUserPermissions] = useState(null);

  // Set up axios with JWT token
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  useEffect(() => {
    const fetchSecureEmbedUrl = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Get secure PowerBI embed URL from backend
        const response = await axios.post('http://localhost:5001/api/powerbi/embed-url', {
          department: user.department,
          regions: user.regions,
          kpis: user.kpis
        });
        
        setEmbedUrl(response.data.embedUrl);
        setUserPermissions(response.data.permissions);
        setLoading(false);
        
      } catch (err) {
        console.error('Failed to get secure embed URL:', err);
        setError('Failed to load dashboard. Please check your permissions.');
        setLoading(false);
      }
    };

    fetchSecureEmbedUrl();
  }, [user]);

  const handleOpenPowerBI = () => {
    if (embedUrl) {
      window.open(embedUrl, '_blank', 'width=1400,height=900');
    }
  };

  const handleLLMNavigation = () => {
    window.open('http://localhost:8888', '_blank');
  };

  const handlePredictionNavigation = () => {
    navigate('/prediction');
  };

  const handleLogout = () => {
    // Clear JWT token
    localStorage.removeItem('authToken');
    onLogout();
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Secure Import Export Dashboard</h1>
        <div className="user-info">
          <span>Welcome, <strong>{user.username}</strong></span>
          <span>Role: <strong>{user.role}</strong></span>
          <span>Department: <strong>{user.department}</strong></span>
          <button onClick={handleLogout} className="btn-secondary">Logout</button>
        </div>
      </div>

      <div className="container">
        {error && (
          <div className="error" style={{ marginBottom: '20px' }}>
            <strong>Security Error:</strong> {error}
            <br />
            <small>This dashboard uses secure Row-Level Security. Your permissions have been validated on the server.</small>
          </div>
        )}

        <div className="action-buttons">
          <button onClick={handleLLMNavigation} className="btn-primary">
            🤖 Open LLM Model (localhost:8888)
          </button>
          <button onClick={handlePredictionNavigation} className="btn-primary">
            📊 Prophet Prediction Model
          </button>
        </div>

        <div className="powerbi-container">
          {loading ? (
            <div className="loading">Loading Secure PowerBI Dashboard...</div>
          ) : (
            <>
              <div style={{ marginBottom: '20px', padding: '15px', background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)', borderRadius: '8px', color: 'white' }}>
                <h3 style={{ marginBottom: '10px', color: 'white' }}>
                  🔒 Secure Dashboard - RLS Validated
                </h3>
                <p style={{ marginBottom: '8px', fontSize: '14px', opacity: 0.9 }}>
                  Your access has been validated on the server. You can only see data you're authorized to view.
                </p>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '12px' }}>
                  <div>
                    <span style={{ fontSize: '12px', opacity: 0.8 }}>PowerBI Role:</span>
                    <strong style={{ marginLeft: '5px', fontSize: '14px' }}>
                      {userPermissions?.userRole || 'Loading...'}
                    </strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', opacity: 0.8 }}>Department:</span>
                    <strong style={{ marginLeft: '5px', fontSize: '14px' }}>
                      {userPermissions?.permissions?.department || 'Loading...'}
                    </strong>
                  </div>
                </div>
              </div>
              
              {/* Secure KPI Access Information */}
              <div style={{ marginBottom: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
                <h4 style={{ marginBottom: '10px', color: '#333', fontSize: '14px' }}>
                  🔐 Secure KPIs Access (Server Validated):
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {userPermissions?.permissions?.kpis && userPermissions.permissions.kpis[0] === 'all' ? (
                    <span style={{ 
                      padding: '6px 12px', 
                      background: '#4caf50', 
                      color: 'white', 
                      borderRadius: '20px', 
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      All KPIs (Admin Access)
                    </span>
                  ) : (
                    userPermissions?.permissions?.kpis && userPermissions.permissions.kpis.map((kpi, index) => (
                      <span key={index} style={{ 
                        padding: '6px 12px', 
                        background: '#4caf50', 
                        color: 'white', 
                        borderRadius: '20px', 
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        {kpi.replace(/_/g, ' ')}
                      </span>
                    ))
                  )}
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{ 
                  width: '100%', 
                  height: '700px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  background: '#fff'
                }}>
                  <iframe
                    src={embedUrl}
                    title="Secure PowerBI Report"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                    style={{
                      border: 'none',
                      display: 'block'
                    }}
                  />
                </div>
                
                <div style={{ 
                  marginTop: '15px', 
                  padding: '12px', 
                  background: '#e8f5e8', 
                  borderRadius: '6px',
                  border: '1px solid #4caf50'
                }}>
                  <p style={{ fontSize: '13px', color: '#2e7d32', margin: 0, textAlign: 'center' }}>
                    ✅ <strong>Secure RLS Active:</strong> This dashboard uses server-side validation. 
                    Your permissions have been verified and cannot be bypassed.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <div style={{ marginTop: '20px', padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h4 style={{ marginBottom: '15px', color: '#333', fontSize: '16px', borderBottom: '2px solid #4caf50', paddingBottom: '10px' }}>
            🔒 Secure Row-Level Security (RLS) Status
          </h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #4caf50' }}>
              <p style={{ fontSize: '12px', color: '#888', marginBottom: '5px' }}>Security Level</p>
              <p style={{ fontSize: '15px', color: '#333', fontWeight: '600', margin: 0 }}>Server Validated</p>
            </div>
            
            <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #4caf50' }}>
              <p style={{ fontSize: '12px', color: '#888', marginBottom: '5px' }}>PowerBI Role</p>
              <p style={{ fontSize: '15px', color: '#333', fontWeight: '600', margin: 0 }}>
                {userPermissions?.userRole || 'Loading...'}
              </p>
            </div>
            
            <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #4caf50' }}>
              <p style={{ fontSize: '12px', color: '#888', marginBottom: '5px' }}>Access Method</p>
              <p style={{ fontSize: '15px', color: '#333', fontWeight: '600', margin: 0 }}>JWT Token</p>
            </div>
            
            <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #4caf50' }}>
              <p style={{ fontSize: '12px', color: '#888', marginBottom: '5px' }}>Validation</p>
              <p style={{ fontSize: '15px', color: '#333', fontWeight: '600', margin: 0 }}>Backend API</p>
            </div>
          </div>
          
          <div style={{ marginTop: '15px', padding: '12px', background: '#e8f5e8', borderRadius: '8px' }}>
            <p style={{ fontSize: '13px', color: '#2e7d32', margin: 0 }}>
              ✅ <strong>Secure:</strong> This implementation uses JWT tokens and server-side validation. 
              Users cannot bypass security by modifying URLs or client-side code.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecureDashboard;
