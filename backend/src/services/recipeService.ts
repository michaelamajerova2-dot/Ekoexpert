import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Recipe, RecipeFilters } from '../types/recipe.types';

const DATA_FILE = path.join(__dirname, '../data/recipes.json');

export class RecipeService {
  private async readRecipes(): Promise<Recipe[]> {
    try {
      const data = await fs.readFile(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // Ak súbor neexistuje, vytvor prázdny array
      return [];
    }
  }

  private async writeRecipes(recipes: Recipe[]): Promise<void> {
    await fs.writeFile(DATA_FILE, JSON.stringify(recipes, null, 2));
  }

  async getAllRecipes(filters?: RecipeFilters): Promise<Recipe[]> {
    let recipes = await this.readRecipes();

    if (filters?.category) {
      recipes = recipes.filter(r => {
        // Support both single category (legacy) and array of categories (new)
        if (Array.isArray(r.category)) {
          return r.category.includes(filters.category!);
        }
        return r.category === filters.category;
      });
    }

    if (filters?.tags && filters.tags.length > 0) {
      recipes = recipes.filter(r =>
        filters.tags!.some(tag => r.tags.includes(tag))
      );
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      recipes = recipes.filter(r => {
        const titleMatch = r.title.toLowerCase().includes(searchLower);
        const descMatch = r.description?.toLowerCase().includes(searchLower);

        // Support both string (new) and array (legacy) ingredient formats
        let ingredientMatch = false;
        if (typeof r.ingredients === 'string') {
          ingredientMatch = r.ingredients.toLowerCase().includes(searchLower);
        } else {
          ingredientMatch = r.ingredients.some(i => i.name.toLowerCase().includes(searchLower));
        }

        return titleMatch || descMatch || ingredientMatch;
      });
    }

    return recipes;
  }

  async getRecipeById(id: string): Promise<Recipe | null> {
    const recipes = await this.readRecipes();
    return recipes.find(r => r.id === id) || null;
  }

  async createRecipe(recipeData: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>): Promise<Recipe> {
    const recipes = await this.readRecipes();
    const newRecipe: Recipe = {
      ...recipeData,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    recipes.push(newRecipe);
    await this.writeRecipes(recipes);
    return newRecipe;
  }

  async updateRecipe(id: string, recipeData: Partial<Recipe>): Promise<Recipe | null> {
    const recipes = await this.readRecipes();
    const index = recipes.findIndex(r => r.id === id);

    if (index === -1) {
      return null;
    }

    recipes[index] = {
      ...recipes[index],
      ...recipeData,
      id,
      updatedAt: new Date()
    };

    await this.writeRecipes(recipes);
    return recipes[index];
  }

  async deleteRecipe(id: string): Promise<boolean> {
    const recipes = await this.readRecipes();
    const index = recipes.findIndex(r => r.id === id);

    if (index === -1) {
      return false;
    }

    recipes.splice(index, 1);
    await this.writeRecipes(recipes);
    return true;
  }
}
