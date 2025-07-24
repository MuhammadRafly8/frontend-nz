import { useQuery } from '@tanstack/react-query';

export function useUsers() {
  // Dummy data, ganti dengan fetch API jika endpoint sudah ada
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => [
      { id: '1', name: 'Admin Satu', role: 'admin' },
      { id: '2', name: 'Writer Dua', role: 'writer' },
      { id: '3', name: 'Writer Tiga', role: 'writer' },
    ],
  });
} 