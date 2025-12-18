// Using Firebase instead of backend API for recipes
import { firebaseRecipeApi } from './firebaseRecipeService';
import axios from 'axios';

// Backend API URL for non-Firebase operations (like scraping)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Export Firebase API as recipeApi for backward compatibility
export const recipeApi = firebaseRecipeApi;

// Scrape API - uses backend to fetch recipes from URLs
export interface ScrapedRecipe {
  title?: string;
  description?: string;
  ingredients?: string;
  instructions?: string;
  image?: string;
}

export const scrapeApi = {
  scrapeRecipe: async (url: string): Promise<ScrapedRecipe> => {
    const response = await api.post<ScrapedRecipe>('/scrape-recipe', { url });
    return response.data;
  },
};

export default recipeApi;
