import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Splash from './pages/Splash';

import Home from './pages/Home';
import Profile from './pages/Profile';
import LiveDashboard from './pages/LiveDashboard';
import Dispatch from './pages/Dispatch';
import DataLogs from './pages/DataLogs';
import Map from './pages/Map';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';

function AppContent() {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    // Show splash screen for 2.5 seconds before loading the actual app
    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isBooting) {
    return <Splash />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<LiveDashboard />} />
                <Route path="/dispatch" element={<Dispatch />} />
                <Route path="/logs" element={<DataLogs />} />
                <Route path="/map" element={<Map />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
