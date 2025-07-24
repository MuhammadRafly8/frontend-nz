import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

function TechCube() {
  const mesh = useRef<any>(null);
  return (
    <mesh ref={mesh} rotation={[0.5, 0.5, 0]}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial color="#00eaff" metalness={0.7} roughness={0.2} emissive="#00eaff" emissiveIntensity={0.5} />
    </mesh>
  );
}

const glitchText = (text: string) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  return text.split('').map((c) => (c === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)])).join('');
};

const ThreeCard: React.FC<{ title: string; content: string; date: string; }> = ({ title, content, date }) => {
  const [hover, setHover] = useState(false);
  const [glitch, setGlitch] = useState(title);

  React.useEffect(() => {
    if (!hover) {
      const interval = setInterval(() => setGlitch(glitchText(title)), 80);
      return () => clearInterval(interval);
    } else {
      setGlitch(title);
    }
  }, [hover, title]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-2xl bg-white/20 backdrop-blur-xl border border-blue-400/30 group transition-transform hover:scale-105 animate-rotateCard"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ minHeight: 220 }}
    >
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 3] }}>
          <ambientLight intensity={0.7} />
          <pointLight position={[5, 5, 5]} intensity={1.2} />
          <TechCube />
          <Stars radius={6} depth={20} count={40} factor={0.7} fade speed={2} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
        </Canvas>
      </div>
      <div className="relative z-10 p-6 flex flex-col justify-between h-full">
        <h2 className={`text-2xl font-extrabold mb-2 font-orbitron transition-all duration-200 group-hover:scale-105 group-hover:neon-glow group-hover:text-blue-300`}>{title}</h2>
        <div className="text-gray-800 mb-2 line-clamp-3 font-medium drop-shadow-lg">{content}</div>
        <div className="text-xs text-gray-500 mt-2">Dipublikasikan: {date}</div>
      </div>
      <style jsx global>{`
        .font-orbitron {
          font-family: 'Orbitron', 'Audiowide', 'sans-serif';
        }
        .neon-glow {
          text-shadow: 0 0 8px #00eaff, 0 0 16px #00eaff, 0 0 32px #00eaff;
        }
        @keyframes rotateCard {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        .animate-rotateCard {
          animation: rotateCard 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ThreeCard; 