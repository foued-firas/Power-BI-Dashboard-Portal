import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [activeDashboard, setActiveDashboard] = useState(0);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  if (!user) {
    navigate('/');
    return null;
  }

  const hasMultipleDashboards = user.dashboards && user.dashboards.length > 1;

  // ✅ Only show prediction button for this specific user
  const isSeifeddine = user.email === 'seifeddinechargui@esprit.tn';

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>📊 Tableau de Bord</h1>
        </div>

        <div style={styles.headerRight}>
          <span style={styles.userEmail}>{user.email}</span>

          {/* 🔹 Button to go to localhost:8888 */}
          <button
            style={styles.navButton}
            onClick={() => window.open('http://localhost:8888', '_blank')}
          >
            Aide prise de décision
          </button>

          {/* 🔹 Prediction button (only for Seifeddine) */}
          {isSeifeddine && (
            <button
              style={{ ...styles.navButton, background: '#764ba2' }}
              onClick={() => navigate('/prediction')}
            >
              🔮 Prediction
            </button>
          )}

          {/* Logout */}
          <button onClick={handleLogout} style={styles.logoutButton}>
            🚪 Déconnexion
          </button>
        </div>
      </div>

      {/* DASHBOARD TABS */}
      {hasMultipleDashboards && (
        <div style={styles.tabsContainer}>
          <div style={styles.tabs}>
            {user.dashboards.map((dashboard, index) => (
              <button
                key={index}
                onClick={() => setActiveDashboard(index)}
                style={{
                  ...styles.tab,
                  ...(activeDashboard === index ? styles.activeTab : {}),
                }}
              >
                {dashboard.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* IFRAME DISPLAY */}
      <div style={styles.iframeContainer}>
        <iframe
          src={
            user.dashboards
              ? user.dashboards[activeDashboard].url
              : user.embedUrl
          }
          style={styles.iframe}
          title="Power BI Dashboard"
          allowFullScreen
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    background: '#f5f5f5',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 30px',
    background: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    zIndex: 10,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
    margin: 0,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  userEmail: {
    fontSize: '14px',
    color: '#666',
    fontWeight: '500',
  },
  logoutButton: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    background: '#f44336',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  navButton: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    background: '#667eea',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s, transform 0.2s',
  },
  tabsContainer: {
    background: 'white',
    padding: '15px 30px',
    borderBottom: '1px solid #e0e0e0',
  },
  tabs: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  tab: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: '2px solid #e0e0e0',
    background: '#f5f5f5',
    color: '#666',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  activeTab: {
    background: '#667eea',
    color: 'white',
    borderColor: '#667eea',
  },
  iframeContainer: {
    flex: 1,
    padding: '20px',
    display: 'flex',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
    borderRadius: '10px',
    background: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
};

export default Dashboard;
