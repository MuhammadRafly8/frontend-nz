import React, { useState, useEffect } from 'react';
import { useUsers } from '@/hooks/api/useUsers';
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
  writerId?: string;
}

interface NewsFormProps {
  open: boolean;
  initialData?: ArticleForm;
  onClose: () => void;
  onSubmit: (data: ArticleForm) => void;
}

const NewsForm: React.FC<NewsFormProps> = ({ open, initialData, onClose, onSubmit }) => {
  const [form, setForm] = useState<ArticleForm>({
    title: '',
    content: '',
    published: false,
    image: null,
    writerId: '',
  });
  const { data: users = [] } = useUsers();
  const { user } = useAuth();
  const authUser = (user && typeof user === 'object' && 'id' in user && 'role' in user) ? user as AuthUser : null;

  useEffect(() => {
    if (initialData) setForm({ ...initialData, image: null });
    else if (authUser && authUser.role === 'writer') setForm({ title: '', content: '', published: false, image: null, writerId: authUser.id });
    else setForm({ title: '', content: '', published: false, image: null, writerId: '' });
  }, [initialData, open, authUser]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 p-8 rounded-2xl shadow-2xl w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">&times;</button>
        <h2 className="text-2xl font-bold mb-6 text-white">{form.id ? 'Edit Berita' : 'Tambah Berita'}</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSubmit(form);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-gray-300 mb-1">Judul</label>
            <input
              className="w-full px-4 py-2 rounded-lg bg-gray-700/80 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Konten</label>
            <textarea
              className="w-full px-4 py-2 rounded-lg bg-gray-700/80 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              value={form.content}
              onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Foto (opsional)</label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-white"
              onChange={e => setForm(f => ({ ...f, image: e.target.files && e.target.files[0] ? e.target.files[0] : null }))}
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Penulis (Writer)</label>
            <select
              className="w-full px-4 py-2 rounded-lg bg-gray-700/80 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.writerId}
              onChange={e => setForm(f => ({ ...f, writerId: e.target.value }))}
              required
              disabled={!!authUser && authUser.role === 'writer'}
            >
              <option value="">Pilih Writer</option>
              {users.filter((u: any) => u.role === 'writer' || u.role === 'admin').map((u: any) => (
                <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.published}
              onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
              id="published"
            />
            <label htmlFor="published" className="text-gray-300">Publikasi</label>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-bold">Batal</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow">{form.id ? 'Simpan' : 'Tambah'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsForm; 