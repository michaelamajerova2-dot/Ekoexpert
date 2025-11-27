import axios from 'axios';
import { Recipe, RecipeFilters } from '../types/recipe.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const recipeApi = {
  getAll: async (filters?: RecipeFilters): Promise<Recipe[]> => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.tags) params.append('tags', filters.tags.join(','));
    if (filters?.search) params.append('search', filters.search);

    const response = await api.get<Recipe[]>(`/recipes?${params}`);
    return response.data;
  },

  getById: async (id: string): Promise<Recipe> => {
    const response = await api.get<Recipe>(`/recipes/${id}`);
    return response.data;
  },

  create: async (recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>): Promise<Recipe> => {
    const response = await api.post<Recipe>('/recipes', recipe);
    return response.data;
  },

  update: async (id: string, recipe: Partial<Recipe>): Promise<Recipe> => {
    const response = await api.put<Recipe>(`/recipes/${id}`, recipe);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/recipes/${id}`);
  },
};

export default api;
