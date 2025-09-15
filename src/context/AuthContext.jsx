import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, isAuthenticated: false });

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setAuth({ token, isAuthenticated: true });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('jwt', token);
    setAuth({ token, isAuthenticated: true });
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    setAuth({ token: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
