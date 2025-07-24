import React from 'react';

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ open, title, description, onCancel, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 p-8 rounded-2xl shadow-2xl w-full max-w-sm relative">
        <h3 className="text-xl font-bold text-white mb-2">{title || 'Konfirmasi'}</h3>
        <p className="text-gray-300 mb-6">{description || 'Apakah Anda yakin ingin menghapus item ini?'}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-bold">Batal</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold shadow">Hapus</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog; 