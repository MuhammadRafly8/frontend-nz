'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function AdminLogin() {
  const router = useRouter()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      await login(formData)
      router.push('/admin/dashboard')
    } catch {
      setError('Login gagal. Periksa email dan password Anda.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-pink-200">
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-6 font-orbitron neon-glow">
          Login Admin
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-center text-sm">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-pink-700 font-semibold mb-2" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 border border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Masukkan email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label className="block text-pink-700 font-semibold mb-2" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 border border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Masukkan password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <style jsx global>{`
        .font-orbitron {
          font-family: 'Orbitron', 'Audiowide', 'sans-serif';
        }
        .neon-glow {
          text-shadow: 0 0 8px #ffb6d5, 0 0 16px #ffb6d5, 0 0 32px #ffb6d5;
        }
      `}</style>
    </div>
  )
}