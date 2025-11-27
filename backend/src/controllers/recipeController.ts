import { Request, Response } from 'express';
import { RecipeService } from '../services/recipeService';
import { RecipeCategory } from '../types/recipe.types';

const recipeService = new RecipeService();

export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const { category, tags, search } = req.query;

    const filters = {
      category: category as RecipeCategory,
      tags: tags ? (tags as string).split(',') : undefined,
      search: search as string
    };

    const recipes = await recipeService.getAllRecipes(filters);
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Chyba pri načítaní receptov' });
  }
};

export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const recipe = await recipeService.getRecipeById(id);

    if (!recipe) {
      return res.status(404).json({ error: 'Recept nebol nájdený' });
    }

    res.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'Chyba pri načítaní receptu' });
  }
};

export const createRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await recipeService.createRecipe(req.body);
    res.status(201).json(recipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: 'Chyba pri vytváraní receptu' });
  }
};

export const updateRecipe = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const recipe = await recipeService.updateRecipe(id, req.body);

    if (!recipe) {
      return res.status(404).json({ error: 'Recept nebol nájdený' });
    }

    res.json(recipe);
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ error: 'Chyba pri aktualizácii receptu' });
  }
};

export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = await recipeService.deleteRecipe(id);

    if (!success) {
      return res.status(404).json({ error: 'Recept nebol nájdený' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ error: 'Chyba pri mazaní receptu' });
  }
};
