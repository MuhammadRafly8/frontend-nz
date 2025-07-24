'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// Schema untuk validasi form
const articleSchema = z.object({
  title: z.string().min(1, 'Judul harus diisi'),
  content: z.string().min(1, 'Konten harus diisi'),
  categoryId: z.string().min(1, 'Kategori harus dipilih'),
  image: z.instanceof(FileList).optional(),
});

type ArticleFormData = z.infer<typeof articleSchema>;

interface ArticleFormProps {
  initialData?: {
    title: string;
    content: string;
    categoryId: string;
    image?: FileList;
  };
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

export default function ArticleForm({
  initialData,
  onSubmit,
  isLoading,
}: ArticleFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: initialData || {
      title: '',
      content: '',
      categoryId: '',
      image: undefined,
    },
  });

  // Inisialisasi editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialData?.content || '',
    onUpdate: ({ editor }) => {
      const htmlContent = editor.getHTML();
      setValue('content', htmlContent); // Update nilai form "content"
    },
  });

  const onSubmitForm = (data: ArticleFormData) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('categoryId', data.categoryId);
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      {/* Judul */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Judul
        </label>
        <input
          type="text"
          id="title"
          {...register('title')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      {/* Konten dengan Tiptap Editor */}
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Konten
        </label>
        <input type="hidden" id="content" {...register('content')} />
        <div className="mt-1 border border-gray-300 rounded-md shadow-sm overflow-hidden">
          <EditorContent editor={editor} />
        </div>
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      {/* Kategori */}
      <div>
        <label
          htmlFor="categoryId"
          className="block text-sm font-medium text-gray-700"
        >
          Kategori
        </label>
        <select
          id="categoryId"
          {...register('categoryId')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Pilih kategori</option>
          <option value="1">Berita</option>
          <option value="2">Artikel</option>
          <option value="3">Tutorial</option>
        </select>
        {errors.categoryId && (
          <p className="mt-1 text-sm text-red-600">{errors.categoryId.message}</p>
        )}
      </div>

      {/* Gambar */}
      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Gambar
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          {...register('image')}
          className="mt-1 block w-full"
        />
      </div>

      {/* Tombol Submit */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70"
        >
          {isLoading ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>
    </form>
  );
}