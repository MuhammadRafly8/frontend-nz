import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [,setIsScrolled] = useState(false);
  const [] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-pink-400 via-pink-500 to-purple-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white tracking-widest font-orbitron">
          Portal Berita 
        </Link>
        {/* Right: Login & Dashboard */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/login"
            className="px-4 py-2 rounded-full bg-white/20 text-white font-semibold hover:bg-pink-300 hover:text-pink-900 transition"
          >
            Login
          </Link>
          <Link
            href="/admin"
            className="px-4 py-2 rounded-full bg-white/20 text-white font-semibold hover:bg-purple-300 hover:text-purple-900 transition"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;