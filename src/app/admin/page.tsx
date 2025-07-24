'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function AdminHome() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Jika sudah login, langsung redirect ke dashboard
    if (isAuthenticated) {
      router.replace('/admin/dashboard')
    } else {
      router.replace('/admin/login')
    }
  }, [isAuthenticated, router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500">Mengalihkan ke halaman admin...</p>
    </div>
  )
}