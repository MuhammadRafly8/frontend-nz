'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import api from '@/lib/api/axios';
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

export default function BeritaDetailPage() {
  const params = useParams();
  const slug = params.id as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/articles/${slug}`);
        if (response.data.success) {
          setArticle(response.data.data);
        } else {
          setError('Artikel tidak ditemukan');
        }
      } catch (err: any) {
        console.error('Error fetching article:', err);
        setError(err.response?.data?.message || 'Terjadi kesalahan saat memuat artikel');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-pink-100 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none"></div>
        <Navbar />
        <main className="flex-1 w-full max-w-3xl mx-auto pt-32 pb-16 px-4 relative z-10">
          <div className="bg-white rounded-2xl shadow-md border border-pink-200 p-8 animate-pulse">
            <div className="h-80 bg-pink-200 rounded-xl mb-8"></div>
            <div className="h-8 bg-pink-200 rounded mb-4"></div>
            <div className="h-4 bg-pink-200 rounded mb-2"></div>
            <div className="h-4 bg-pink-200 rounded w-3/4"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col bg-pink-100 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none"></div>
        <Navbar />
        <main className="flex-1 w-full max-w-3xl mx-auto pt-32 pb-16 px-4 relative z-10">
          <div className="text-center text-red-400 py-16">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-xl font-semibold mb-2">Artikel tidak ditemukan</h3>
            <p>{error || 'Artikel yang Anda cari tidak tersedia'}</p>
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
      <main className="flex-1 w-full max-w-3xl mx-auto pt-32 pb-16 px-4 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg border border-pink-200 p-8">
          {/* Article Image - menggunakan Next.js Image */}
          <div className="w-full flex justify-center mb-8">
            {article.image && (
              <Image
                src={getImageUrl(article.image) || '/placeholder-image.jpg'}
                alt={article.title}
                width={1000}
                height={600}
                className="object-cover rounded-xl w-full max-h-80"
                onError={(e) => {
                  console.warn('Failed to load image:', article.image);
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
                priority
              />
            )}
          </div>

          {/* Article Header */}
          <div className="mb-6">
            {article.category && (
              <span className="inline-block px-3 py-1 bg-pink-100 text-pink-600 text-sm font-semibold rounded-full mb-4">
                {article.category.name}
              </span>
            )}
            
            <h1 className="text-4xl font-extrabold font-orbitron text-pink-700 mb-4 neon-glow">
              {article.title}
            </h1>
            
            <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
              <div className="flex items-center space-x-4">
                {article.author && (
                  <span>Oleh: {article.author.name}</span>
                )}
                <span>👁️ {article.viewCount} views</span>
              </div>
              <span>
                {formatDate(article.publishedAt || article.createdAt)}
              </span>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-800 text-lg font-medium drop-shadow-sm whitespace-pre-line leading-relaxed">
              {article.content}
            </div>
          </div>

          {/* Article Footer */}
          <div className="mt-8 pt-6 border-t border-pink-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Dipublikasikan: {formatDate(article.publishedAt || article.createdAt)}</span>
              {article.featured && (
                <span className="px-3 py-1 bg-pink-200 text-pink-700 rounded-full font-semibold">
                  ⭐ Featured
                </span>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      <style jsx global>{`
        .font-orbitron {
          font-family: 'Orbitron', 'Audiowide', 'sans-serif';
        }
        .neon-glow {
          text-shadow: 0 0 8px #ffb6d5, 0 0 16px #ffb6d5, 0 0 32px #ffb6d5;
        }
      `}</style>
    </div>
  );
}