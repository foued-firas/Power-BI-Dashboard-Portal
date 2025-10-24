import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Prediction from './components/Prediction';

function App() {
  const [user, setUser] = React.useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
        <Route path="/prediction" element={<Prediction />} />
      </Routes>
    </Router>
  );
}

export default App;
