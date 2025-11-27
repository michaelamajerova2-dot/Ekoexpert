export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface Meal {
  recipeId?: string;
  recipeName?: string;
}

export interface DayPlan {
  breakfast?: Meal;
  lunch?: Meal;
  dinner?: Meal;
  snack?: Meal;
}

export interface WeekPlan {
  monday: DayPlan;
  tuesday: DayPlan;
  wednesday: DayPlan;
  thursday: DayPlan;
  friday: DayPlan;
  saturday: DayPlan;
  sunday: DayPlan;
}

export const DAYS_OF_WEEK = [
  { key: 'monday', label: 'Pondelok' },
  { key: 'tuesday', label: 'Utorok' },
  { key: 'wednesday', label: 'Streda' },
  { key: 'thursday', label: 'Štvrtok' },
  { key: 'friday', label: 'Piatok' },
  { key: 'saturday', label: 'Sobota' },
  { key: 'sunday', label: 'Nedeľa' },
] as const;

export const MEAL_LABELS: Record<MealType, string> = {
  breakfast: 'Raňajky',
  lunch: 'Obed',
  dinner: 'Večera',
  snack: 'Desiata',
};
