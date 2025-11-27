import { z } from 'zod';

// Recipe form schema - simplified
export const recipeFormSchema = z.object({
  title: z.string().min(1, 'Názov receptu je povinný').max(100, 'Názov je príliš dlhý'),
  description: z.string().optional(),
  image: z.string().optional(),
  imageFile: z.instanceof(File).optional(),
  category: z.array(z.string()),
  tags: z.array(z.string()),
  ingredients: z.string().optional(),
  instructions: z.string().optional(),
});

export type RecipeFormData = z.infer<typeof recipeFormSchema>;
