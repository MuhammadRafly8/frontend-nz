import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-gradient-to-r from-blue-900/80 to-purple-900/80 shadow-lg">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-2xl font-extrabold tracking-widest text-white neon-glow font-orbitron select-none">
          MyTECHPORTAL
        </span>
        <div className="flex gap-4">
          <a href="/admin/dashboard" className="px-4 py-2 rounded-lg bg-blue-700/80 text-white font-bold hover:bg-blue-800/90 transition">Dashboard</a>
        </div>
      </div>
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