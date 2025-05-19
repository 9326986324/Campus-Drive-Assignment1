import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        const decoded = jwt_decode(token);
        if (decoded.exp * 1000 > Date.now()) {
          return { token, user: decoded };
        }
      }
    } catch (e) {}
    return { token: null, user: null };
  });

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null });
  };

  useEffect(() => {
    if (auth.token) {
      const decoded = jwt_decode(auth.token);
      const timeout = decoded.exp * 1000 - Date.now();
      const timer = setTimeout(() => logout(), timeout);
      return () => clearTimeout(timer);
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};