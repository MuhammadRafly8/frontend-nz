'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CyberBackground from '@/bg/CyberBackground';

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    alert('Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CyberBackground />
      </div>
      <Navbar />
      
      <main className="flex-1 w-full max-w-4xl mx-auto pt-32 pb-16 px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold font-orbitron text-white mb-4 neon-glow">
            HUBUNGI KAMI
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ada pertanyaan? Silakan hubungi kami melalui form di bawah ini
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-blue-400/30 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Kirim Pesan</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-semibold mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-blue-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-blue-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Masukkan email"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-white font-semibold mb-2">
                  Subjek
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-blue-400/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">Pilih subjek</option>
                  <option value="informasi">Informasi Umum</option>
                  <option value="teknisi">Dukungan Teknis</option>
                  <option value="kerjasama">Kerjasama</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white font-semibold mb-2">
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-xl border border-blue-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                  placeholder="Tulis pesan Anda di sini..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:scale-105 transition-transform duration-200"
              >
                Kirim Pesan
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-blue-400/30 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Informasi Kontak</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                    📧
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Email</h3>
                    <p className="text-gray-300">info@mytechportal.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    📱
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">WhatsApp</h3>
                    <p className="text-gray-300">+62 812-3456-7890</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    📍
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Alamat</h3>
                    <p className="text-gray-300">Jl. Teknologi No. 123, Jakarta</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-blue-400/30 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Jam Operasional</h2>
              
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Senin - Jumat</span>
                  <span>08:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sabtu</span>
                  <span>09:00 - 15:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Minggu</span>
                  <span>Tutup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <style jsx global>{`
        .font-orbitron {
          font-family: 'Orbitron', 'Audiowide', 'sans-serif';
        }
        .neon-glow {
          text-shadow: 0 0 8px #00eaff, 0 0 16px #00eaff, 0 0 32px #00eaff;
        }
      `}</style>
    </div>
  );
}
