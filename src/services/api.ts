import axios from "axios";

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 10000,
});

export default api;