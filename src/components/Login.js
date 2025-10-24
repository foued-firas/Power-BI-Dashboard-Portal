import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Configuration des utilisateurs avec support multi-dashboards
  const userReports = {
    'nancydavolio@gmail.com': {
      password: 'mdp1',
      dashboards: [
        {
          name: 'Performance Commerciale Individuelle',
          url: 'https://app.powerbi.com/reportEmbed?reportId=b3f43e26-ca78-41eb-909c-1ea757ddd645&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730',
        },
      ],
    },
    'andrewfuller@gmail.com': {
      password: 'mdp2',
      dashboards: [
        {
          name: 'Performance Commerciale',
          url: 'https://app.powerbi.com/reportEmbed?reportId=c821fb0b-76f7-409f-b1de-6016d649318f&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730',
        },
      ],
    },
    'janetleverling@gmail.com': {
      password: 'mdp3',
      dashboards: [
        {
          name: 'Performance Logistique',
          url: 'https://app.powerbi.com/reportEmbed?reportId=9a519960-6c1b-40f8-8462-1b7d4e70c45a&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730',
        },
      ],
    },
    'margaretpeacock@gmail.com': {
      password: 'mdp4',
      dashboards: [
        {
          name: 'Dashboard 4',
          url: 'https://app.powerbi.com/reportEmbed?reportId=0a5d6e8e-e659-42e9-83d6-dc185ad981de&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730',
        },
      ],
    },
    'stevenbuchanan@gmail.com': {
      password: 'mdp5',
      dashboards: [
        {
          name: 'Rentabilité Produit et Catégorie',
          url: 'https://app.powerbi.com/reportEmbed?reportId=aab27760-302a-4f47-ab8a-6838df225a93&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730',
        },
      ],
    },
    'michaelsuyama@gmail.com': {
      password: 'mdp6',
      dashboards: [
        {
          name: 'Map',
          url: 'https://app.powerbi.com/reportEmbed?reportId=39349382-44f3-4405-a21c-75ef03657208&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730',
        },
      ],
    },
    'robertking@gmail.com': {
      password: 'mdp7',
      dashboards: [
        {
          name: 'Dashboard 7',
          url: 'https://app.powerbi.com/reportEmbed?reportId=c94334ce-c2c3-4a41-bab9-a78515afc4d8&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730',
        },
      ],
    },
    'lauracallahan@gmail.com': {
      password: 'mdp8',
      dashboards: [
        {
          name: 'Performance Commerciale',
          url: 'https://app.powerbi.com/reportEmbed?reportId=c821fb0b-76f7-409f-b1de-6016d649318f&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730',
        },
        {
          name: 'Performance Logistique',
          url: 'https://app.powerbi.com/reportEmbed?reportId=9a519960-6c1b-40f8-8462-1b7d4e70c45a&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730',
        },
      ],
    },
    'anneuddsworth@gmail.com': {
      password: 'mdp9',
      dashboards: [
        {
          name: 'Performance Commerciale Individuelle',
          url: 'https://app.powerbi.com/reportEmbed?reportId=b3f43e26-ca78-41eb-909c-1ea757ddd645&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730',
        },
        {
          name: 'Rentabilité Produit et Catégorie',
          url: 'https://app.powerbi.com/reportEmbed?reportId=aab27760-302a-4f47-ab8a-6838df225a93&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730',
        },
      ],
    },
    'add Your email': {
      password: '0000',
      dashboards: [
        {
          name: 'Performance Commerciale Individuelle',
          url: 'https://app.powerbi.com/reportEmbed?reportId=b3f43e26-ca78-41eb-909c-1ea757ddd645&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730',
        },
        {
          name: 'Performance Commerciale',
          url: 'https://app.powerbi.com/reportEmbed?reportId=c821fb0b-76f7-409f-b1de-6016d649318f&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730',
        },
        {
          name: 'Map',
          url: 'https://app.powerbi.com/reportEmbed?reportId=39349382-44f3-4405-a21c-75ef03657208&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730',
        },
      ],
    },
    'add your email': {
      password: '0000',
      dashboards: [
        {
          name: 'Performance Logistique',
          url: 'https://app.powerbi.com/reportEmbed?reportId=9a519960-6c1b-40f8-8462-1b7d4e70c45a&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730',
        },
        {
          name: 'Rentabilité par company ',
          url: 'https://app.powerbi.com/reportEmbed?reportId=0a5d6e8e-e659-42e9-83d6-dc185ad981de&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730',
        },
        {
          name: 'Rentabilité Produit et Catégorie',
          url: 'https://app.powerbi.com/reportEmbed?reportId=aab27760-302a-4f47-ab8a-6838df225a93&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730',
        },
        
      ],
    },
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const userData = userReports[email.trim().toLowerCase()];

    if (!userData) {
      setError('Email non reconnu');
      return;
    }

    if (userData.password !== password) {
      setError('Mot de passe incorrect');
      return;
    }

    setUser({
      email,
      role: `user_${email}`,
      dashboards: userData.dashboards,
      embedUrl: userData.dashboards[0].url,
    });

    navigate('/dashboard');
  };

  return (
    <div style={styles.container}>
      <div style={styles.logoSection}>
        <h1 style={styles.logo}>📊 Tableau de Bord</h1>
        <p style={styles.subtitle}>Accédez à vos rapports Power BI</p>
      </div>

      <form onSubmit={handleLogin} style={styles.form}>
        {error && <div style={styles.errorMessage}>❌ {error}</div>}

        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Mot de passe</label>
          <input
            type="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <button type="submit" style={styles.button}>
          Se connecter
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
  },
  logoSection: {
    textAlign: 'center',
    marginBottom: '30px',
    color: 'white',
  },
  logo: {
    fontSize: '32px',
    fontWeight: '600',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '16px',
    opacity: '0.9',
  },
  form: {
    background: 'white',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
    maxWidth: '420px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
  },
  input: {
    padding: '12px 15px',
    borderRadius: '10px',
    border: '2px solid #e0e0e0',
    fontSize: '14px',
    transition: 'border-color 0.3s',
    outline: 'none',
  },
  button: {
    padding: '14px',
    borderRadius: '10px',
    border: 'none',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    marginTop: '10px',
  },
  errorMessage: {
    background: '#fee',
    color: '#c33',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
    textAlign: 'center',
  },
};

export default Login;
