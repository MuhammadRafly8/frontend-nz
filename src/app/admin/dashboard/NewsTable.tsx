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
    <div className="overflow-x-auto rounded-xl shadow-lg bg-gradient-to-br from-pink-200 to-pink-400 backdrop-blur-md">
      <table className="min-w-full bg-white rounded-xl shadow border border-pink-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-pink-700">Judul</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Views</th>
            <th className="px-6 py-3 text-left">Tanggal</th>
            <th className="px-6 py-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className="hover:bg-pink-50 transition">
              <td className="px-4 py-2">{article.title}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${article.published ? 'bg-green-600/80 text-white' : 'bg-yellow-500/80 text-gray-900'}`}>{article.published ? 'Publik' : 'Draft'}</span>
              </td>
              <td className="px-6 py-4">{article.views}</td>
              <td className="px-6 py-4">{new Date(article.createdAt).toLocaleDateString()}</td>
              <td className="px-6 py-4 flex gap-2 justify-center">
                <button onClick={() => onEdit(article)} className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded-lg mr-2">Edit</button>
                <button onClick={() => onDelete(article)} className="bg-pink-100 hover:bg-pink-200 text-pink-700 px-3 py-1 rounded-lg border border-pink-300">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewsTable;