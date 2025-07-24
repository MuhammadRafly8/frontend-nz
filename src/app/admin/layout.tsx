'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useAuthInit } from '@/hooks/useAuth'
import Cookies from 'js-cookie';

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, logout, setToken } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  useAuthInit();

  // Inisialisasi ulang token dan user ke zustand jika ada di localStorage/cookie
  useEffect(() => {
    const token = localStorage.getItem('token') || Cookies.get('token');
    if (token && !isAuthenticated) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [isAuthenticated, pathname, router])

  return (
    <div className="min-h-screen bg-gray-100">
      {pathname !== '/admin/login' && (
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-bold">Admin Dashboard</h1>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <a href="/admin/dashboard" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 text-sm font-medium">
                    Dashboard
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => {
                    logout()
                    router.push('/admin/login')
                  }}
                  className="text-gray-500 hover:text-gray-900"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}