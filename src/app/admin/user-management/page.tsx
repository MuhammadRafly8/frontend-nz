'use client';
import { useState } from "react";
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser, type User } from '@/hooks/api/useUsers';
import Card from "@/components/Card";
import Title from "@/components/Title";
import Text from "@/components/Text";

// Tipe untuk form state (tanpa id dan createdAt, tambah password untuk create)
type UserFormState = Omit<User, 'id' | 'createdAt'> & {
  id?: string; // Untuk edit
  password?: string; // Untuk create
};

export default function UserManagementPage() {
  const { data: users = [], isLoading, isError } = useUsers();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<User | null>(null);
  const [deleteData, setDeleteData] = useState<User | null>(null);
  
  // State untuk form
  const [form, setForm] = useState<UserFormState>({ 
    name: '', 
    email: '', 
    role: 'user',
    avatar: null,
    password: '' // Hanya untuk create
  });

  const openForm = (user: User | null = null) => {
    if (user) {
      // Untuk edit, jangan sertakan password
      setForm({ 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role,
        avatar: user.avatar
      });
      setEditData(user);
    } else {
      // Untuk create, reset semua field
      setForm({ 
        name: '', 
        email: '', 
        role: 'user',
        avatar: null,
        password: '' 
      });
      setEditData(null);
    }
    setFormOpen(true);
  };

  const handleSubmit = () => {
    if (editData && form.id) {
      // Update existing user (tanpa password)
      const { id, name, email, role, avatar } = form;
      updateUserMutation.mutate(
        { id, userData: { name, email, role } }, // Avatar biasanya dihandle beda, kita abaikan dulu
        {
          onSuccess: () => {
            setFormOpen(false);
          },
          onError: (error: any) => {
            console.error("Gagal update user:", error);
            alert(`Gagal update user: ${error.message || 'Terjadi kesalahan'}`);
          }
        }
      );
    } else {
      // Create new user
      if (!form.password) {
        alert("Password wajib diisi untuk user baru!");
        return;
      }
      
      const { name, email, password, role } = form;
      if (!password) {
        alert("Password wajib diisi!");
        return;
      }
      
      createUserMutation.mutate(
        { name, email, password, role },
        {
          onSuccess: () => {
            setFormOpen(false);
          },
          onError: (error: any) => {
            console.error("Gagal tambah user:", error);
            alert(`Gagal tambah user: ${error.message || 'Terjadi kesalahan'}`);
          }
        }
      );
    }
  };

  const handleDelete = () => {
    if (deleteData) {
      deleteUserMutation.mutate(deleteData.id, {
        onSuccess: () => {
          setDeleteData(null);
        },
        onError: (error: any) => {
          console.error("Gagal hapus user:", error);
          alert(`Gagal hapus user: ${error.message || 'Terjadi kesalahan'}`);
        }
      });
    }
  };

  // --- Tambahkan penanganan loading dan error ---
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading users...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Gagal memuat data user.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Statistik Card */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <Title>Total User</Title>
          <Text className="mt-2 text-3xl font-bold">{users.length}</Text>
        </Card>
        <Card>
          <Title>Admin</Title>
          <Text className="mt-2 text-3xl font-bold">{users.filter((u) => u.role === "admin").length}</Text>
        </Card>
        <Card>
          <Title>Editor</Title>
          <Text className="mt-2 text-3xl font-bold">{users.filter((u) => u.role === "editor").length}</Text>
        </Card>
        <Card>
          <Title>User Biasa</Title>
          <Text className="mt-2 text-3xl font-bold">{users.filter((u) => u.role === "user").length}</Text>
        </Card>
      </div>
      
      {/* Tombol Tambah User */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => openForm(null)}
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-pink-400 text-white font-bold shadow-lg hover:scale-105 transition"
        >
          + Tambah User
        </button>
      </div>
      
      {/* Tabel User */}
      <div className="overflow-x-auto rounded-xl shadow-lg bg-gradient-to-br from-pink-400/80 to-pink-500/100 backdrop-blur-md">
        <table className="min-w-full text-sm text-gray-200">
          <thead>
            <tr className="bg-gradient-to-r from-pink-400 to-pink-600 text-white">
              <th className="px-6 py-3 text-left">Nama</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-pink-200/40 transition">
                <td className="px-6 py-4 font-semibold">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    user.role === "admin" ? "bg-green-600/80 text-white" : 
                    user.role === "editor" ? "bg-blue-500/80 text-white" : 
                    "bg-yellow-500/80 text-gray-900"
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2 justify-center">
                  <button 
                    onClick={() => openForm(user)} 
                    className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow transition"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => setDeleteData(user)} 
                    className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold shadow transition"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Form Tambah/Edit User */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-pink-400/90 to-pink-400/90 p-8 rounded-2xl shadow-2xl w-full max-w-lg relative">
            <button 
              onClick={() => setFormOpen(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-white">
              {editData ? "Edit User" : "Tambah User"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-gray-300 mb-1">Nama</label>
                <input
                  className="w-full px-4 py-2 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  required
                  disabled={!!editData} // Email tidak bisa diubah saat edit
                />
              </div>
              {/* Field Password hanya untuk user baru */}
              {!editData && (
                <div>
                  <label className="block text-gray-300 mb-1">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={form.password || ''}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    required={!editData}
                  />
                </div>
              )}
              <div>
                <label className="block text-gray-300 mb-1">Role</label>
                <select
                  className="w-full px-4 py-2 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.role}
                  onChange={e => setForm(f => ({ ...f, role: e.target.value as "admin" | "editor" | "user" }))}
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setFormOpen(false)} 
                  className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-bold"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow"
                  disabled={createUserMutation.isPending || updateUserMutation.isPending}
                >
                  {(createUserMutation.isPending || updateUserMutation.isPending) ? 'Menyimpan...' : (editData ? "Simpan" : "Tambah")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Konfirmasi Hapus */}
      {deleteData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 p-8 rounded-2xl shadow-2xl w-full max-w-sm relative">
            <h3 className="text-xl font-bold text-white mb-2">Hapus User</h3>
            <p className="text-gray-300 mb-6">Yakin ingin menghapus user {deleteData.name}?</p>
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setDeleteData(null)} 
                className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-bold"
                disabled={deleteUserMutation.isPending}
              >
                Batal
              </button>
              <button 
                onClick={handleDelete} 
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold shadow"
                disabled={deleteUserMutation.isPending}
              >
                {deleteUserMutation.isPending ? 'Menghapus...' : 'Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}