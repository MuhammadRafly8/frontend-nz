'use client';

import { useState } from 'react';
import { useArticles, useCreateArticle, useUpdateArticle, useDeleteArticle } from '@/hooks/api/useArticles';
import { useCategories } from '@/hooks/api/useCategories';
import NewsTable from './NewsTable';
import NewsForm from './NewsForm';
import ConfirmDialog from './ConfirmDialog';
import Card from '@/components/Card';
import Title from '@/components/Title';
import Text from '@/components/Text';
import Link from 'next/link';

interface Article {
  id: string;
  title: string;
  content: string;
  published: boolean;
  viewCount: number;
  createdAt: string;
  categoryId?: string;
}

interface ArticleForm {
  id?: string;
  title: string;
  content: string;
  published: boolean;
  image?: File | null;
}

export default function DashboardPage() {
  const { data: articles = [], isLoading } = useArticles();
  const { data: categories = [] } = useCategories();
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();
  const deleteArticle = useDeleteArticle();

  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<ArticleForm | null>(null);
  const [deleteData, setDeleteData] = useState<Article | null>(null);

  // Handle submit form (create or update)
  const handleSubmit = (data: ArticleForm) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('published', data.published ? 'true' : 'false');
    if (data.image) formData.append('image', data.image);
    if (data.id) {
      updateArticle.mutate({ id: data.id, article: formData }, { onSuccess: () => setFormOpen(false) });
    } else {
      createArticle.mutate(formData, { onSuccess: () => setFormOpen(false) });
    }
  };

  // Handle delete
  const handleDelete = () => {
    if (deleteData) {
      deleteArticle.mutate(deleteData.id, { onSuccess: () => setDeleteData(null) });
    }
  };

  // Dummy data jika tidak ada artikel dari API
  const dummyArticles: Article[] = [
    {
      id: '1',
      title: 'Jurusan RPL: Masa Depan Digital',
      content: 'Rekayasa Perangkat Lunak (RPL) adalah jurusan yang mempelajari pengembangan aplikasi, algoritma, dan arsitektur perangkat lunak. Siswa akan dibekali dengan kemampuan coding, software engineering, dan pengembangan aplikasi web maupun mobile.',
      published: true,
      viewCount: 120,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Keunggulan Jurusan RPL di Era Industri 4.0',
      content: 'Jurusan RPL sangat relevan di era digital saat ini. Lulusan RPL dibutuhkan di berbagai industri untuk membangun sistem informasi, aplikasi mobile, dan solusi digital lainnya.',
      published: false,
      viewCount: 45,
      createdAt: new Date().toISOString(),
    },
  ];
  const displayArticles = articles.length === 0 ? dummyArticles : articles;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-end mb-4">
        <Link
          href="/admin/user-management"
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold shadow-lg hover:scale-105 transition"
        >
          Manajemen User
        </Link>
      </div>
      {/* Statistik Card */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <Title>Total Artikel</Title>
          <Text className="mt-2 text-3xl font-bold">{articles.length}</Text>
        </Card>
        <Card>
          <Title>Artikel Publik</Title>
          <Text className="mt-2 text-3xl font-bold">{articles.filter((a: Article) => a.published).length}</Text>
        </Card>
        <Card>
          <Title>Draft</Title>
          <Text className="mt-2 text-3xl font-bold">{articles.filter((a: Article) => !a.published).length}</Text>
        </Card>
        <Card>
          <Title>Average Views</Title>
          <Text className="mt-2 text-3xl font-bold">
            {articles.length ? Math.floor(articles.reduce((sum: number, a: Article) => sum + (a.viewCount || 0), 0) / articles.length) : 0}
          </Text>
        </Card>
      </div>

      {/* Tombol Tambah Berita */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => { setEditData(null); setFormOpen(true); }}
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:scale-105 transition"
        >
          + Tambah Berita
        </button>
      </div>

      {/* Tabel Berita */}
      <NewsTable
        articles={displayArticles.map((a: Article) => ({
          id: a.id,
          title: a.title,
          published: a.published,
          views: a.viewCount,
          createdAt: a.createdAt,
        }))}
        onEdit={(article) => {
          const full = displayArticles.find((a: Article) => String(a.id) === String(article.id));
          if (!full) return;
          setEditData({
            id: full.id,
            title: full.title,
            content: full.content,
            published: full.published,
            // categoryId: full.categoryId, // dihapus karena tidak dipakai
          });
          setFormOpen(true);
        }}
        onDelete={(article) => {
          const full = displayArticles.find((a: Article) => String(a.id) === String(article.id));
          if (full) setDeleteData(full);
        }}
      />

      {/* Form Tambah/Edit */}
      <NewsForm
        open={formOpen}
        initialData={editData || undefined}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
      />

      {/* Konfirmasi Hapus */}
      <ConfirmDialog
        open={!!deleteData}
        title="Hapus Berita"
        description={`Yakin ingin menghapus berita \"${deleteData?.title}\"?`}
        onCancel={() => setDeleteData(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}