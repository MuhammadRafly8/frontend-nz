// hooks/api/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Definisi tipe data user berdasarkan struktur dari backend
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'user';
  avatar: string | null;
  createdAt: string; // ISO string
}

// Tipe untuk response API getAllUsers
interface UsersApiResponse {
  success: boolean;
  data: User[];
}

// Tipe untuk payload create/update user
interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'editor' | 'user';
}

interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string; // Kosongkan jika tidak ingin diubah
  role?: 'admin' | 'editor' | 'user';
}


// --- Fungsi API ---

const API_BASE_URL = 'http://localhost:5000/api';

// 1. GET /users - Ambil semua user
const fetchUsers = async (): Promise<UsersApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Gagal mengambil data users');
  }
  return response.json();
};

// 2. POST /users - Buat user baru
const createUser = async (userData: CreateUserPayload): Promise<{ success: boolean; data: User }> => {
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

// 3. PUT /users/:id - Update user
const updateUser = async ({ id, userData }: { id: string; userData: UpdateUserPayload }): Promise<{ success: boolean; data: User }> => {
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

// 4. DELETE /users/:id - Hapus user
const deleteUser = async (id: string): Promise<{ success: boolean; message: string }> => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Gagal menghapus user');
  }
  return response.json();
};


// --- Hook React Query ---

// 1. useUsers - Mengambil semua user
export function useUsers() {
  return useQuery<UsersApiResponse, Error, User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    select: (data) => data.data, // Hanya ambil array `data` dari response
  });
}

// 2. useCreateUser - Membuat user baru
export function useCreateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

// 3. useUpdateUser - Memperbarui user
export function useUpdateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

// 4. useDeleteUser - Menghapus user
export function useDeleteUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

// Export tipe User untuk digunakan di komponen
export type { User };