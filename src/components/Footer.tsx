import React from 'react';
import dynamic from 'next/dynamic';

const Footer3D = dynamic(() => import('./ThreeFooter'), { ssr: false });

const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-gradient-to-r from-blue-900/80 to-purple-900/80 text-white py-8 mt-16 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center z-10 relative">
        <div className="font-orbitron text-lg font-bold mb-2">MyTECHPORTAL</div>
        <div className="text-sm text-gray-300">&copy; {new Date().getFullYear()} MyTECHPORTAL. All rights reserved.</div>
      </div>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Footer3D />
      </div>
      <style jsx global>{`
        .font-orbitron {
          font-family: 'Orbitron', 'Audiowide', 'sans-serif';
        }
      `}</style>
    </footer>
  );
};

export default Footer; 