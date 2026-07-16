import axios from 'axios';

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const isLocalApiUrl = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(?:\/|$)/i.test(configuredApiUrl || '');
const baseURL = import.meta.env.PROD && isLocalApiUrl ? '/api' : configuredApiUrl || '/api';

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
