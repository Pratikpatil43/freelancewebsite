import axios from 'axios';

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const baseURL = configuredApiUrl || 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
