'use client';

import React, { useState, useEffect } from 'react';
import { useCategories } from '@/hooks/api/useCategories';
import { useAuth } from '@/hooks/useAuth';

interface AuthUser {
  id: string;
  name: string;
  role: string;
}

interface ArticleForm {
  id?: string;
  title: string;
  content: string;
  published: boolean;
  image?: File | null;
  categoryId?: string;
}

interface NewsFormProps {
  open: boolean;
  initialData?: ArticleForm;
  onClose: () => void;
  // ✅ Ubah tipe onSubmit: terima FormData, bukan ArticleForm
  onSubmit: (formData: FormData) => void;
}

const NewsForm: React.FC<NewsFormProps> = ({ open, initialData, onClose, onSubmit }) => {
  const [form, setForm] = useState<ArticleForm>({
    title: '',
    content: '',
    published: false,
    image: null,
    categoryId: '',
  });

  interface Category {
    id: string;
    name: string;
  }

  const { data: categories = [] } = useCategories();
  const { user } = useAuth();
  const authUser = (user && typeof user === 'object' && 'id' in user && 'role' in user)
    ? user as AuthUser
    : null;

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        image: null, // Reset image saat edit (biar user bisa ganti)
      });
    } else {
      setForm({
        title: '',
        content: '',
        published: false,
        image: null,
        categoryId: '',
      });
    }
  }, [initialData, open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Buat FormData di sini
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('content', form.content);
    formData.append('published', form.published.toString());
    if (form.categoryId) {
      formData.append('categoryId', form.categoryId);
    }
    if (form.image) {
      formData.append('image', form.image); // File object
    }

    onSubmit(formData); // Kirim FormData ke parent
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 p-8 rounded-2xl shadow-2xl w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-white">
          {form.id ? 'Edit Berita' : 'Tambah Berita'}
        </h2>
        <form
          onSubmit={handleSubmit} // ✅ Gunakan handleSubmit yang buat FormData
          className="bg-white rounded-xl shadow-lg p-6 border border-pink-200"
        >
          <div className="mb-4">
            <label className="block text-pink-700 font-semibold mb-2">Judul</label>
            <input
              className="w-full px-4 py-2 border border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-pink-700 font-semibold mb-2">Konten</label>
            <textarea
              className="w-full px-4 py-2 border border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 min-h-[100px]"
              value={form.content}
              onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-pink-700 font-semibold mb-2">Foto (opsional)</label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-sm text-gray-600"
              onChange={e =>
                setForm(f => ({
                  ...f,
                  image: e.target.files && e.target.files[0] ? e.target.files[0] : null,
                }))
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-pink-700 font-semibold mb-2">Kategori</label>
            <select
              className="w-full px-4 py-2 border border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={form.categoryId || ''}
              onChange={e => setForm(f => ({ ...f, categoryId: e.target.value }))}
              required
            >
              <option value="">Pilih Kategori</option>
              {categories.map((category: Category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={form.published}
              onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
              id="published"
            />
            <label htmlFor="published" className="text-pink-700">
              Publikasi
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-bold"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-xl transition-colors"
            >
              {form.id ? 'Simpan' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsForm;