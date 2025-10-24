import React, { useState } from 'react';
import axios from 'axios';

const SecureLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Call secure backend login endpoint
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        username: username,
        password: password
      });

      // Store JWT token
      localStorage.setItem('authToken', response.data.token);
      
      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      // Call parent component with user data
      onLogin(response.data.user);
      
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Secure PowerBI Dashboard</h2>
        <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>
          Import Export Analytics - Secure RLS
        </p>
        
        {error && <div className="error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              disabled={loading}
            />
          </div>
          
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>

        <div style={{ marginTop: '20px', padding: '15px', background: '#e8f5e8', borderRadius: '6px', border: '1px solid #4caf50' }}>
          <p style={{ fontSize: '12px', color: '#2e7d32', marginBottom: '10px' }}>
            <strong>🔒 Secure Authentication:</strong>
          </p>
          <p style={{ fontSize: '11px', color: '#2e7d32', marginBottom: '8px' }}>
            • JWT token-based authentication
          </p>
          <p style={{ fontSize: '11px', color: '#2e7d32', marginBottom: '8px' }}>
            • Server-side permission validation
          </p>
          <p style={{ fontSize: '11px', color: '#2e7d32', marginBottom: '8px' }}>
            • Cannot bypass RLS by modifying URLs
          </p>
        </div>

        <div style={{ marginTop: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '6px' }}>
          <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}><strong>Demo Credentials (Secure RLS):</strong></p>
          
          <div style={{ marginBottom: '10px' }}>
            <p style={{ fontSize: '11px', color: '#333', fontWeight: 'bold', marginBottom: '3px' }}>👑 Administrator:</p>
            <p style={{ fontSize: '10px', color: '#888' }}>admin / admin123</p>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <p style={{ fontSize: '11px', color: '#333', fontWeight: 'bold', marginBottom: '3px' }}>🎯 Décideurs Stratégiques:</p>
            <p style={{ fontSize: '10px', color: '#888' }}>direction_commerciale / commercial123</p>
            <p style={{ fontSize: '10px', color: '#888' }}>responsable_logistique / logistique123</p>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <p style={{ fontSize: '11px', color: '#333', fontWeight: 'bold', marginBottom: '3px' }}>⚙️ Décideurs Opérationnels:</p>
            <p style={{ fontSize: '10px', color: '#888' }}>gestionnaire_commande / commande123</p>
            <p style={{ fontSize: '10px', color: '#888' }}>manager_produit / produit123</p>
          </div>
          
          <div>
            <p style={{ fontSize: '11px', color: '#333', fontWeight: 'bold', marginBottom: '3px' }}>👁️ Viewer:</p>
            <p style={{ fontSize: '10px', color: '#888' }}>viewer / viewer123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecureLogin;
