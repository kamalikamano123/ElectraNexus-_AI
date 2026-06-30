import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('mockUser');
    if (saved) return JSON.parse(saved);
    return null;
  });

  const login = (userData) => {
    const formattedUser = {
      ...userData,
      name: userData.name || userData.email.split('@')[0], 
      role: 'System Administrator',
      clearance: 'Level 5 (Sigma)',
      loginTime: new Date().toLocaleTimeString()
    };
    setUser(formattedUser);
    localStorage.setItem('mockUser', JSON.stringify(formattedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mockUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
