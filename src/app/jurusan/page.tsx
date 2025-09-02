'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CyberBackground from '@/bg/CyberBackground';

const departments = [
  {
    id: 1,
    name: 'Rekayasa Perangkat Lunak (RPL)',
    description: 'Jurusan yang mempelajari pengembangan software dan aplikasi',
    icon: '💻',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 2,
    name: 'Teknik Komputer dan Jaringan (TKJ)',
    description: 'Jurusan yang fokus pada jaringan komputer dan sistem',
    icon: '🌐',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 3,
    name: 'Multimedia (MM)',
    description: 'Jurusan yang mempelajari desain grafis dan multimedia',
    icon: '🎨',
    color: 'from-purple-500 to-pink-600'
  }
];

export default function JurusanPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CyberBackground />
      </div>
      <Navbar />
      
      <main className="flex-1 w-full max-w-6xl mx-auto pt-32 pb-16 px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold font-orbitron text-white mb-4 neon-glow">
            JURUSAN KAMI
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Pilih jurusan yang sesuai dengan passion dan minat Anda
          </p>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className="group bg-white/10 backdrop-blur-xl rounded-2xl border border-blue-400/30 p-8 hover:bg-white/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${dept.color} rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {dept.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-200">
                {dept.name}
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                {dept.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-blue-400/30 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ingin tahu lebih detail?
            </h2>
            <p className="text-gray-300 mb-6">
              Hubungi kami untuk informasi lebih lanjut tentang jurusan yang tersedia
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:scale-105 transition-transform duration-200">
              Hubungi Kami
            </button>
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
