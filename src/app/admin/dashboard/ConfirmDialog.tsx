import React from 'react';

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ open, description, onCancel, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-200 max-w-sm w-full">
        <h2 className="text-xl font-bold text-pink-700 mb-4">Konfirmasi</h2>
        <p className="mb-6">{description || 'Apakah Anda yakin ingin menghapus item ini?'}</p>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg border border-pink-300 hover:bg-pink-200"
            onClick={onCancel}
          >
            Batal
          </button>
          <button
            className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
            onClick={onConfirm}
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;