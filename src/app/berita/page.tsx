'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useArticles } from '@/hooks/api/useArticles';
import { getImageUrl } from '@/lib/utils/imageUrl';
import Image from 'next/image';

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  image?: string; 
  published: boolean;
  featured: boolean;
  viewCount: number;
  publishedAt?: string;
  createdAt: string;
  author?: {
    id: string;
    name: string;
    avatar?: string;
  };
  category?: {
    id: string;
    name: string;
    slug: string;
  };
}

export default function BeritaPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data: articlesData, isLoading, error } = useArticles({
    page: currentPage,
    limit: 12,
    search: searchTerm || undefined,
    category: selectedCategory || undefined,
    published: true
  });

  const articles = articlesData?.data || [];
  const totalPages = articlesData?.totalPages || 1;

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
        </div>
        <Navbar />
        <main className="flex-1 w-full max-w-6xl mx-auto pt-32 pb-16 px-4 relative z-10">
          <div className="text-center text-red-400 py-16">
            Terjadi kesalahan saat memuat berita.
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-pink-100 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none"></div>
      <Navbar />
      <main className="flex-1 w-full max-w-6xl mx-auto pt-32 pb-16 px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold font-orbitron text-pink-700 mb-4 neon-glow">
            BERITA TERKINI SMKN 8 JEMBER
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Dapatkan informasi tentang Jurusan yang ada di SMKN 8 JEMBER
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Cari berita..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-pink-300 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-white border border-pink-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="">Semua Kategori</option>
            <option value="teknologi">Teknologi</option>
            <option value="pendidikan">Pendidikan</option>
            <option value="berita">Berita</option>
          </select>
        </div>

        {/* Articles Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-pink-200 p-6 shadow-md animate-pulse">
                <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center text-gray-400 py-16">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-xl font-semibold mb-2">Tidak ada berita ditemukan</h3>
            <p>Coba ubah kata kunci pencarian atau filter kategori</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/berita/${article.slug}`}
                  className="group bg-white rounded-2xl border border-pink-200 p-6 shadow-md hover:shadow-lg hover:border-pink-400 transition-all duration-300 hover:scale-105"
                >
                  <div className="aspect-video bg-gradient-to-br from-pink-200 to-pink-400 rounded-xl mb-4 overflow-hidden relative">
                    {article.image ? (
                      <Image
                        src={getImageUrl(article.image) || '/placeholder-image.jpg'}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={(e) => {
                          console.warn('Failed to load image:', article.image);
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-4xl">📰</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    {article.category && (
                      <span className="inline-block px-3 py-1 bg-pink-100 text-pink-600 text-xs font-semibold rounded-full">
                        {article.category.name}
                      </span>
                    )}
                    
                    <h3 className="text-lg font-bold text-pink-700 group-hover:text-pink-500 transition-colors duration-200 line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {truncateContent(article.content)}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{formatDate(article.publishedAt || article.createdAt)}</span>
                      <span>👁️ {article.viewCount} views</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-pink-300 rounded-lg text-pink-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-200 transition-colors"
                >
                  Sebelumnya
                </button>
                
                <span className="px-4 py-2 text-pink-700">
                  Halaman {currentPage} dari {totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border border-pink-300 rounded-lg text-pink-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-200 transition-colors"
                >
                  Selanjutnya
                </button>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
      <style jsx global>{`
        .font-orbitron {
          font-family: 'Orbitron', 'Audiowide', 'sans-serif';
        }
        .neon-glow {
          text-shadow: 0 0 8px #ffb6d5, 0 0 16px #ffb6d5, 0 0 32px #ffb6d5;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}