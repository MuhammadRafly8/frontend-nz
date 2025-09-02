import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'backdrop-blur-xl bg-gradient-to-r from-blue-900/90 to-purple-900/90 shadow-2xl' 
        : 'backdrop-blur-lg bg-gradient-to-r from-blue-900/80 to-purple-900/80'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="text-2xl font-extrabold tracking-widest text-white neon-glow font-orbitron select-none group-hover:text-cyan-400 transition-colors duration-200">
            MyTECHPORTAL
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-white hover:text-cyan-400 font-semibold transition-colors duration-200">
            Beranda
          </Link>
          <Link href="/berita" className="text-white hover:text-cyan-400 font-semibold transition-colors duration-200">
            Berita
          </Link>
          <Link href="/jurusan" className="text-white hover:text-cyan-400 font-semibold transition-colors duration-200">
            Jurusan
          </Link>
          <Link href="/tentang" className="text-white hover:text-cyan-400 font-semibold transition-colors duration-200">
            Tentang
          </Link>
          <Link href="/kontak" className="text-white hover:text-cyan-400 font-semibold transition-colors duration-200">
            Kontak
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link 
            href="/admin/login" 
            className="px-4 py-2 text-white font-semibold hover:text-cyan-400 transition-colors duration-200"
          >
            Login
          </Link>
          <Link 
            href="/admin/dashboard" 
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-200"
          >
            Dashboard
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-white hover:text-cyan-400 transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-blue-900/95 to-purple-900/95 backdrop-blur-xl border-t border-white/20">
          <div className="px-6 py-4 space-y-4">
            <Link 
              href="/" 
              className="block text-white hover:text-cyan-400 font-semibold transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Beranda
            </Link>
            <Link 
              href="/berita" 
              className="block text-white hover:text-cyan-400 font-semibold transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Berita
            </Link>
            <Link 
              href="/jurusan" 
              className="block text-white hover:text-cyan-400 font-semibold transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Jurusan
            </Link>
            <Link 
              href="/tentang" 
              className="block text-white hover:text-cyan-400 font-semibold transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Tentang
            </Link>
            <Link 
              href="/kontak" 
              className="block text-white hover:text-cyan-400 font-semibold transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Kontak
            </Link>
            <div className="pt-4 border-t border-white/20 space-y-3">
              <Link 
                href="/admin/login" 
                className="block text-white hover:text-cyan-400 font-semibold transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                href="/admin/dashboard" 
                className="block px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-center hover:scale-105 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .neon-glow {
          text-shadow: 0 0 8px #00eaff, 0 0 16px #00eaff, 0 0 32px #00eaff;
        }
        .font-orbitron {
          font-family: 'Orbitron', 'Audiowide', 'sans-serif';
        }
      `}</style>
    </nav>
  );
};

export default Navbar; 