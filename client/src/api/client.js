import axios from 'axios';

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const baseURL = configuredApiUrl || 'http://localhost:5000/api';
const AUTH_TOKEN_KEY = 'projectdesk_auth_token';

const api = axios.create({
  baseURL,
  withCredentials: true,
});

// Some mobile browsers block cross-site cookies by default. The API also
// accepts bearer authentication, so attach the token returned at sign-in as a
// reliable fallback while continuing to use the httpOnly cookie where allowed.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const saveAuthToken = (token) => {
  if (token) localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const clearAuthToken = () => localStorage.removeItem(AUTH_TOKEN_KEY);

export default api;
