import React from 'react';
import dynamic from 'next/dynamic';

const Footer3D = dynamic(() => import('./ThreeFooter'), { ssr: false });

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 text-center">
      <span> Portal SMKN 8 JEMBER</span>
    </footer>
  );
};

export default Footer;