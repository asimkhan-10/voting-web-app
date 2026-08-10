import { createContext, useState, useEffect, useCallback } from 'react';
import { loginUser, signupUser, getUserProfile } from '../api/authApi';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch fresh profile from DB on app startup/refresh if token exists
  const fetchProfile = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const data = await getUserProfile();
      // Line 21 Fix: Check data.data first, then data.user, then fallback to data
      setUser(data.data || data.user || data);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Login Handler
  const login = async (credentials) => {
    const data = await loginUser(credentials);
    if (data.token) {
      localStorage.setItem('token', data.token);
      await fetchProfile();
    }
    return data;
  };

  // Signup Handler
  const signup = async (userData) => {
    const data = await signupUser(userData);
    if (data.token) {
      localStorage.setItem('token', data.token);
      await fetchProfile();
    }
    return data;
  };

  // Logout Handler
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        signup,
        logout,
        refetchProfile: fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};