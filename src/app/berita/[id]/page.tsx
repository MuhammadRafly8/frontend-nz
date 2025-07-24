'use client';

import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CyberBackground from '@/bg/CyberBackground';

// Dummy data (ganti dengan fetch API jika sudah ada backend)
const dummyArticles = [
  {
    id: '1',
    title: 'Jurusan RPL: Masa Depan Digital',
    content: 'Rekayasa Perangkat Lunak (RPL) adalah jurusan ...',
    createdAt: new Date().toISOString(),
    imageUrl: '',
  },
  {
    id: '2',
    title: 'Keunggulan Jurusan RPL di Era Industri 4.0',
    content: 'Jurusan RPL sangat relevan di era digital ...',
    createdAt: new Date().toISOString(),
    imageUrl: '',
  },
];

// Low-poly city 3D background (simple version)
function LowPolyCity() {
  return (
    <Canvas camera={{ position: [0, 5, 16] }} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 10]} intensity={1.2} />
      {/* Ground */}
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[30, 1, 30]} />
        <meshStandardMaterial color="#232946" />
      </mesh>
      {/* Buildings */}
      {[...Array(18)].map((_, i) => (
        <mesh key={i} position={[-8 + (i % 6) * 3, 0, -8 + Math.floor(i / 6) * 8]}>
          <boxGeometry args={[1.2, 2 + Math.random() * 4, 1.2]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#00eaff' : '#1e90ff'} flatShading />
        </mesh>
      ))}
    </Canvas>
  );
}

function Dummy3D() {
  return (
    <Canvas camera={{ position: [0, 0, 3] }} style={{ width: '100%', height: 320 }}>
      <ambientLight intensity={0.7} />
      <pointLight position={[5, 5, 5]} intensity={1.2} />
      <mesh rotation={[0.5, 0.5, 0]}>
        <boxGeometry args={[1.8, 1.8, 1.8]} />
        <meshStandardMaterial color="#00eaff" metalness={0.7} roughness={0.2} emissive="#00eaff" emissiveIntensity={0.5} />
      </mesh>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
    </Canvas>
  );
}

export default function BeritaDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const article = dummyArticles.find((a) => a.id === id);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CyberBackground />
      </div>
      <Navbar />
      <main className="flex-1 w-full max-w-3xl mx-auto pt-32 pb-16 px-4 relative z-10">
        {!article ? (
          <div className="text-center text-gray-400 py-16">Berita tidak ditemukan.</div>
        ) : (
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-400/30 p-8">
            <div className="w-full flex justify-center mb-8">
              {article.imageUrl ? (
                <img src={article.imageUrl} alt={article.title} className="object-cover rounded-xl max-h-80 w-full" />
              ) : (
                <Dummy3D />
              )}
            </div>
            <h1 className="text-4xl font-extrabold font-orbitron text-blue-900 mb-4 neon-glow">{article.title}</h1>
            <div className="text-gray-800 text-lg mb-6 font-medium drop-shadow-lg whitespace-pre-line">{article.content}</div>
            <div className="text-xs text-gray-500 mt-2">Dipublikasikan: {new Date(article.createdAt).toLocaleDateString()}</div>
          </div>
        )}
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
