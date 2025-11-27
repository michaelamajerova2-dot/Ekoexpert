export enum RecipeCategory {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
  SNACK = 'snack',
  DESSERT = 'dessert'
}

// Legacy ingredient format (for backward compatibility)
export interface LegacyIngredient {
  id: string;
  name: string;
  amount?: number;
  unit?: string;
  note?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  image?: string;
  category: string | string[]; // Support both single (legacy) and multiple categories
  tags: string[];
  ingredients: string | LegacyIngredient[]; // Support both formats
  instructions: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface RecipeFilters {
  category?: string | string[];
  tags?: string[];
  search?: string;
}

export const CATEGORY_LABELS: Record<RecipeCategory, string> = {
  [RecipeCategory.BREAKFAST]: 'Raňajky',
  [RecipeCategory.LUNCH]: 'Obed',
  [RecipeCategory.DINNER]: 'Večera',
  [RecipeCategory.SNACK]: 'Desiata',
  [RecipeCategory.DESSERT]: 'Dezert'
};

export const DEFAULT_TAGS = [
  'vegan',
  'veggie',
  'meat',
  'fish',
  'gluten-free',
  'dairy-free',
  'quick',
  'healthy',
  'traditional',
  'dessert'
];
