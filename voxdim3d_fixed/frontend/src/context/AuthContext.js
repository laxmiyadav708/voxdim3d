import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  // ── Restore session from stored token on page load ───────────────────────
  useEffect(() => {
    const token = localStorage.getItem('vox_token');
    if (!token) { setLoading(false); return; }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios.get(`${API}/auth/me`)
      .then(({ data }) => setUser(data.user))
      .catch(() => {
        // Token invalid / expired — clear it
        localStorage.removeItem('vox_token');
        delete axios.defaults.headers.common['Authorization'];
      })
      .finally(() => setLoading(false));
  }, []);

  // ── Helper: persist token and set axios header ───────────────────────────
  function persistToken(token) {
    localStorage.setItem('vox_token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // ── LOGIN ────────────────────────────────────────────────────────────────
  const login = async (email, password) => {
    const { data } = await axios.post(`${API}/auth/login`, { email, password });
    persistToken(data.token);
    setUser(data.user);
    return data.user;
  };

  // ── SIGNUP (register then auto-login) ────────────────────────────────────
  const signup = async (name, email, password) => {
    const { data } = await axios.post(`${API}/auth/register`, { name, email, password });
    persistToken(data.token);
    setUser(data.user);
    return data.user;
  };

  // ── LOGOUT ───────────────────────────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem('vox_token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
