import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api/axios';

// Types
export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  image?: string;
  published: boolean;
  featured: boolean;
  viewCount: number;
  publishedAt?: string;
  department?: string;
  metaDescription?: string;
  tags?: string;
  createdAt: string;
  updatedAt: string;
  author?: {
    id: string;
    name: string;
    avatar?: string;
  };
  category?: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface ArticleFilters {
  page?: number;
  limit?: number;
  category?: string;
  department?: string;
  search?: string;
  published?: boolean;
  featured?: boolean;
}

// Get all articles with filters
export function useArticles(filters: ArticleFilters = {}) {
  return useQuery({
    queryKey: ['articles', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
      
      const { data } = await api.get(`/articles?${params.toString()}`);
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get featured articles
export function useFeaturedArticles(limit: number = 6) {
  return useQuery({
    queryKey: ['featured-articles', limit],
    queryFn: async () => {
      const { data } = await api.get(`/articles/featured?limit=${limit}`);
      return data.data;
    },
  });
}

// Get articles by category
export function useArticlesByCategory(categorySlug: string, filters: ArticleFilters = {}) {
  return useQuery({
    queryKey: ['articles-by-category', categorySlug, filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
      
      const { data } = await api.get(`/articles/category/${categorySlug}?${params.toString()}`);
      return data;
    },
    enabled: !!categorySlug,
  });
}

// Get article statistics
export function useArticleStats() {
  return useQuery({
    queryKey: ['article-stats'],
    queryFn: async () => {
      const { data } = await api.get('/articles/stats');
      return data.data;
    },
  });
}

// Create article
export function useCreateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (article: FormData) => {
      const { data } = await api.post('/articles', article);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['featured-articles'] });
      queryClient.invalidateQueries({ queryKey: ['article-stats'] });
    },
  });
}

// Update article
export function useUpdateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, article }: { id: string; article: FormData }) => {
      const { data } = await api.put(`/articles/${id}`, article);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['featured-articles'] });
      queryClient.invalidateQueries({ queryKey: ['article-stats'] });
    },
  });
}

// Delete article
export function useDeleteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/articles/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['featured-articles'] });
      queryClient.invalidateQueries({ queryKey: ['article-stats'] });
    },
  });
}

// Toggle featured status
export function useToggleFeatured() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.patch(`/articles/${id}/featured`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['featured-articles'] });
      queryClient.invalidateQueries({ queryKey: ['article-stats'] });
    },
  });
}