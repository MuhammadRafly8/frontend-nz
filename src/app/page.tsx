// app/page.tsx (atau pages/index.tsx jika menggunakan pages router)
'use client';
import { useArticles } from "@/hooks/api/useArticles"; // Pastikan ini sudah benar
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsListCard from "@/components/NewsListCard";
import CyberBackground from "@/bg/CyberBackground"; 


export default function Home() {
  const { data: articles = [], isLoading } = useArticles();

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
        ) : articles.length === 0 ? ( // Gunakan articles langsung
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
            {articles.map((article: any) => ( // Gunakan articles langsung
              <NewsListCard
                key={article.id}
                id={article.id}
                title={article.title}
                content={article.content}
                date={new Date(article.createdAt).toLocaleDateString()}
                time={new Date(article.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                imageUrl={article.image ? `http://localhost:5000/uploads/${article.image}` : ""} // Sesuaikan URL gambar
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
      {/* ... (style tetap sama) */}
    </div>
  );
}