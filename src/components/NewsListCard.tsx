import React from 'react';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Dummy3D() {
  return (
    <Canvas camera={{ position: [0, 0, 3] }} style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[5, 5, 5]} intensity={1.2} />
      <mesh rotation={[0.5, 0.5, 0]}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial color="#00eaff" metalness={0.7} roughness={0.2} emissive="#00eaff" emissiveIntensity={0.5} />
      </mesh>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
    </Canvas>
  );
}

const NewsListCard: React.FC<{
  id: string;
  title: string;
  content: string;
  date: string;
  time?: string;
  imageUrl?: string;
}> = ({ id, title, content, date, time, imageUrl }) => {
  return (
    <div
      className="flex flex-col md:flex-row items-stretch bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-cyan-400/60 group hover:scale-[1.02] hover:shadow-cyan-400/40 hover:border-cyan-300/90 transition-transform duration-200 overflow-hidden mb-8 relative"
      style={{ boxShadow: '0 0 24px 0 #00eaff33, 0 0 2px 0 #00eaff55' }}
    >
      <div className="md:w-1/3 w-full h-56 md:h-auto flex items-center justify-center bg-gradient-to-br from-blue-900/60 to-purple-900/60">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="object-cover w-full h-full" />
        ) : (
          <div className="w-full h-full min-h-[180px]">
            <Dummy3D />
          </div>
        )}
      </div>
      <div className="flex-1 p-6 flex flex-col justify-center">
        <Link href={`/berita/${id}`}>
          <span className="block text-3xl font-extrabold font-orbitron text-blue-900 group-hover:text-cyan-400 transition-colors duration-200 mb-2 neon-glow hover:underline cursor-pointer">
            {title}
          </span>
        </Link>
        <div className="text-gray-200 text-lg mb-2 line-clamp-3 font-medium drop-shadow-lg">
          {content}
        </div>
        <div className="text-xs text-cyan-300 mt-2">Dipublikasikan: {date}{time ? `, ${time}` : ''}</div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl group-hover:shadow-[0_0_32px_8px_#00eaff99] transition-all duration-200" />
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
};

export default NewsListCard; 