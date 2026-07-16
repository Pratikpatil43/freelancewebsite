import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const { data } = await api.get('/auth/me');
      setUser(data.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const login = async (payload) => {
    const { data } = await api.post('/auth/login', payload);
    setUser(data.data.user);
    return data;
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    setUser(data.data.user);
    return data;
  };

  const googleAuth = async (token) => {
    const { data } = await api.post('/auth/google', { token });
    setUser(data.data.user);
    return data;
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, login, register, googleAuth, logout, refreshUser: fetchCurrentUser }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
