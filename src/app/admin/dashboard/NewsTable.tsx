import React from 'react';

interface Article {
  id: number;
  title: string;
  published: boolean;
  views: number;
  createdAt: string;
}

interface NewsTableProps {
  articles: Article[];
  onEdit: (article: Article) => void;
  onDelete: (article: Article) => void;
}

const NewsTable: React.FC<NewsTableProps> = ({ articles, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-md">
      <table className="min-w-full text-sm text-gray-200">
        <thead>
          <tr className="bg-gradient-to-r from-blue-700 to-purple-700 text-white">
            <th className="px-6 py-3 text-left">Judul</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Views</th>
            <th className="px-6 py-3 text-left">Tanggal</th>
            <th className="px-6 py-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className="hover:bg-gray-700/40 transition">
              <td className="px-6 py-4 font-semibold">{article.title}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${article.published ? 'bg-green-600/80 text-white' : 'bg-yellow-500/80 text-gray-900'}`}>{article.published ? 'Publik' : 'Draft'}</span>
              </td>
              <td className="px-6 py-4">{article.views}</td>
              <td className="px-6 py-4">{new Date(article.createdAt).toLocaleDateString()}</td>
              <td className="px-6 py-4 flex gap-2 justify-center">
                <button onClick={() => onEdit(article)} className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow transition">Edit</button>
                <button onClick={() => onDelete(article)} className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold shadow transition">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewsTable; 