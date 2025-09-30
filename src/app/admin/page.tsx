'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function AdminPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/admin/login')
    } else {
      router.replace('/admin/dashboard')
    }
  }, [isAuthenticated, router])

  return null
}