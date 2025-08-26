// lib/axios.ts
import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from '@/lib/api';

// Buat instance axios dengan baseURL
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menambahkan token
apiClient.interceptors.request.use(
  (config) => {
    // Cek di browser environment
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;