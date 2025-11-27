import { useState, useEffect } from 'react';
import { Recipe, RecipeFilters } from '../types/recipe.types';
import { recipeApi } from '../services/api';

export const useRecipes = (filters?: RecipeFilters) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const data = await recipeApi.getAll(filters);
        setRecipes(data);
        setError(null);
      } catch (err) {
        setError('Nepodarilo sa načítať recepty');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [
    Array.isArray(filters?.category) ? filters?.category.join(',') : filters?.category,
    filters?.tags?.join(','),
    filters?.search
  ]);

  return { recipes, loading, error };
};

export const useRecipe = (id: string) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const data = await recipeApi.getById(id);
        setRecipe(data);
        setError(null);
      } catch (err) {
        setError('Nepodarilo sa načítať recept');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  return { recipe, loading, error };
};
