// lib/api/users.ts
import { API_BASE_URL } from '@/lib/api';

// Definisi tipe data user berdasarkan struktur dari backend
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'user'; // Sesuaikan dengan role yang digunakan di backend
  avatar: string | null;
  createdAt: string; // ISO string
}

// Tipe untuk response API getAllUsers
export interface UsersApiResponse {
  success: boolean;
  data: User[];
}

// Tipe untuk response API getUserById, createUser, updateUser
export interface UserApiResponse {
  success: boolean;
  data: User;
}

// Tipe untuk payload create/update user (tanpa id dan createdAt)
export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'editor' | 'user';
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string; // Kosongkan jika tidak ingin diubah
  role?: 'admin' | 'editor' | 'user';
}

// --- Fungsi API ---

// 1. GET /users - Ambil semua user
export const fetchUsers = async (): Promise<UsersApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Gagal mengambil data users');
  }
  return response.json();
};

// 2. GET /users/:id - Ambil user berdasarkan ID
export const fetchUserById = async (id: string): Promise<UserApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Gagal mengambil data user');
  }
  return response.json();
};

// 3. POST /users - Buat user baru
export const createUser = async (userData: CreateUserPayload): Promise<UserApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Gagal membuat user baru');
  }
  return response.json();
};

// 4. PUT /users/:id - Update user
export const updateUser = async (id: string, userData: UpdateUserPayload): Promise<UserApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Gagal memperbarui user');
  }
  return response.json();
};

// 5. DELETE /users/:id - Hapus user
export const deleteUser = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Gagal menghapus user');
  }
  
  // Backend mengembalikan { success: true, message: 'User deleted' }
  return response.json(); 
};