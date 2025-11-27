export enum RecipeCategory {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
  SNACK = 'snack',
  DESSERT = 'dessert'
}

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  note?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  image?: string;
  category: string | string[]; // Support both single (legacy) and multiple categories
  tags: string[];
  ingredients: string | Ingredient[]; // Support both string (new) and array (legacy) formats
  instructions: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  difficulty?: Difficulty;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecipeFilters {
  category?: string;
  tags?: string[];
  search?: string;
}
