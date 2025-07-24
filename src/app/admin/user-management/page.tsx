"use client";

import { useState } from "react";
import Card from "@/components/Card";
import Title from "@/components/Title";
import Text from "@/components/Text";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "user";
  avatar?: string;
}

const dummyUsers: User[] = [
  { id: "1", name: "Admin Satu", email: "admin1@email.com", role: "admin" },
  { id: "2", name: "Editor Dua", email: "editor2@email.com", role: "editor" },
  { id: "3", name: "User Tiga", email: "user3@email.com", role: "user" },
];

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<User | null>(null);
  const [deleteData, setDeleteData] = useState<User | null>(null);
  const [form, setForm] = useState<User>({ id: '', name: '', email: '', role: 'user' });

  const openForm = (user?: User | null) => {
    if (user) {
      setForm(user);
      setEditData(user);
    } else {
      setForm({ id: '', name: '', email: '', role: 'user' });
      setEditData(null);
    }
    setFormOpen(true);
  };

  const handleSubmit = (data: User) => {
    if (data.id) {
      setUsers((prev) => prev.map((u) => (u.id === data.id ? data : u)));
    } else {
      setUsers((prev) => [...prev, { ...data, id: String(Date.now()) }]);
    }
    setFormOpen(false);
  };

  const handleDelete = () => {
    if (deleteData) {
      setUsers((prev) => prev.filter((u) => u.id !== deleteData.id));
      setDeleteData(null);
    }
  };

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
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:scale-105 transition"
        >
          + Tambah User
        </button>
      </div>

      {/* Tabel User */}
      <div className="overflow-x-auto rounded-xl shadow-lg bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-md">
        <table className="min-w-full text-sm text-gray-200">
          <thead>
            <tr className="bg-gradient-to-r from-blue-700 to-purple-700 text-white">
              <th className="px-6 py-3 text-left">Nama</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-700/40 transition">
                <td className="px-6 py-4 font-semibold">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.role === "admin" ? "bg-green-600/80 text-white" : user.role === "editor" ? "bg-blue-500/80 text-white" : "bg-yellow-500/80 text-gray-900"}`}>{user.role}</span>
                </td>
                <td className="px-6 py-4 flex gap-2 justify-center">
                  <button onClick={() => openForm(user)} className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow transition">Edit</button>
                  <button onClick={() => setDeleteData(user)} className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold shadow transition">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form Tambah/Edit User */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 p-8 rounded-2xl shadow-2xl w-full max-w-lg relative">
            <button onClick={() => setFormOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">&times;</button>
            <h2 className="text-2xl font-bold mb-6 text-white">{editData ? "Edit User" : "Tambah User"}</h2>
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSubmit(form);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-gray-300 mb-1">Nama</label>
                <input
                  className="w-full px-4 py-2 rounded-lg bg-gray-700/80 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700/80 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Role</label>
                <select
                  className="w-full px-4 py-2 rounded-lg bg-gray-700/80 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.role}
                  onChange={e => setForm(f => ({ ...f, role: e.target.value as User["role"] }))}
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setFormOpen(false)} className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-bold">Batal</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow">{editData ? "Simpan" : "Tambah"}</button>
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
            <p className="text-gray-300 mb-6">Yakin ingin menghapus user "{deleteData.name}"?</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setDeleteData(null)} className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-bold">Batal</button>
              <button onClick={handleDelete} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold shadow">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 