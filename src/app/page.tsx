"use client";

import { useArticles } from "@/hooks/api/useArticles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsListCard from "@/components/NewsListCard";
import { useEffect, useState } from "react";
// Cyber Futurism background component
function CyberBackground() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Dark cyber gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-950 to-purple-900" />
      {/* Animated grid overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,234,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,234,255,0.12) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          animation: "gridMove 20s linear infinite"
        }}
      />
      {/* Floating cyber particles - only render on client */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(18)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60 blur-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `floaty ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(48px, 48px); }
        }
        @keyframes floaty {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-24px) scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  const { data: articles = [], isLoading } = useArticles();

  // Dummy data jika tidak ada artikel dari API
  const dummyArticles = [
    {
      id: "1",
      title: "Jurusan RPL: Masa Depan Digital",
      content:
        "Rekayasa Perangkat Lunak (RPL) adalah jurusan yang mempelajari pengembangan aplikasi, algoritma, dan arsitektur perangkat lunak. Siswa akan dibekali dengan kemampuan coding, software engineering, dan pengembangan aplikasi web maupun mobile.",
      published: true,
      viewCount: 120,
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Keunggulan Jurusan RPL di Era Industri 4.0",
      content:
        "Jurusan RPL sangat relevan di era digital saat ini. Lulusan RPL dibutuhkan di berbagai industri untuk membangun sistem informasi, aplikasi mobile, dan solusi digital lainnya.",
      published: false,
      viewCount: 45,
      createdAt: new Date().toISOString(),
    },
  ];
  const displayArticles = articles.length === 0 ? dummyArticles : articles;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <CyberBackground />
      <Navbar />
      <main className="flex-1 w-full max-w-4xl mx-auto pt-32 pb-16 px-4 relative z-10">
        {isLoading ? (
          <div className="text-center text-cyan-400 py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
            <p className="mt-4 text-lg">Memuat berita...</p>
          </div>
        ) : displayArticles.length === 0 ? (
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold text-white mb-4 font-orbitron neon-glow">
              Belum Ada Berita
            </h1>
            <p className="text-lg text-cyan-300">
              Berita akan muncul di sini setelah admin mengupload melalui dashboard.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {displayArticles.map((article: any) => (
              <NewsListCard
                key={article.id}
                id={article.id}
                title={article.title}
                content={article.content}
                date={new Date(article.createdAt).toLocaleDateString()}
                time={new Date(article.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                imageUrl={article.imageUrl || ""}
              />
            ))}
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