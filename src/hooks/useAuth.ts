import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '@/lib/api/axios';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

interface AuthState {
  token: string | null
  user: unknown | null
  login: (credentials: { email: string; password: string }) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  setToken: (token: string) => void
}

export const useAuth = create(
  persist<AuthState>(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: async (credentials) => {
        try {
          const response = await api.post('/auth/login', credentials)
          const { token, user } = response.data
          if (!token) throw new Error('Token tidak ditemukan')
          set({ token, user, isAuthenticated: true })
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          Cookies.set('token', token)
          localStorage.setItem('token', token)
        } catch (error) {
          throw error
        }
      },
      logout: () => {
        set({ token: null, user: null, isAuthenticated: false })
        delete api.defaults.headers.common['Authorization']
        localStorage.removeItem('token')
        Cookies.remove('token')
      },
      setToken: (token) => {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        Cookies.set('token', token);
        localStorage.setItem('token', token);
        set({ token, isAuthenticated: true });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)

// Inisialisasi token ke axios saat app start
export function useAuthInit() {
  useEffect(() => {
    const token = localStorage.getItem('token') || Cookies.get('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);
}