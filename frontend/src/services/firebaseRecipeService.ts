import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Recipe, RecipeFilters } from '../types/recipe.types';

const COLLECTION_NAME = 'recipes';
const recipesCollection = collection(db, COLLECTION_NAME);

// Helper to convert Firestore document to Recipe
const docToRecipe = (doc: any): Recipe => {
  const data = doc.data();
  return {
    ...data,
    id: doc.id,
    createdAt: data.createdAt?.toDate?.() || data.createdAt,
    updatedAt: data.updatedAt?.toDate?.() || data.updatedAt,
  };
};

export const firebaseRecipeApi = {
  getAll: async (filters?: RecipeFilters): Promise<Recipe[]> => {
    let recipes: Recipe[] = [];

    // Get all recipes first
    const snapshot = await getDocs(recipesCollection);
    recipes = snapshot.docs.map(docToRecipe);

    // Apply filters client-side (Firestore has limitations on complex queries)
    if (filters?.category) {
      const categoryFilter = filters.category;
      recipes = recipes.filter(r => {
        if (Array.isArray(r.category)) {
          if (Array.isArray(categoryFilter)) {
            return categoryFilter.some(cat => r.category.includes(cat));
          }
          return r.category.includes(categoryFilter);
        }
        if (Array.isArray(categoryFilter)) {
          return categoryFilter.includes(r.category as string);
        }
        return r.category === categoryFilter;
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

        let ingredientMatch = false;
        if (typeof r.ingredients === 'string') {
          ingredientMatch = r.ingredients.toLowerCase().includes(searchLower);
        } else if (Array.isArray(r.ingredients)) {
          ingredientMatch = r.ingredients.some(i => i.name.toLowerCase().includes(searchLower));
        }

        return titleMatch || descMatch || ingredientMatch;
      });
    }

    // Sort recipes
    const sortBy = filters?.sortBy || 'newest';
    recipes.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      switch (sortBy) {
        case 'newest':
          return dateB - dateA;
        case 'oldest':
          return dateA - dateB;
        case 'a-z':
          return a.title.localeCompare(b.title, 'sk');
        case 'z-a':
          return b.title.localeCompare(a.title, 'sk');
        default:
          return 0;
      }
    });

    return recipes;
  },

  getById: async (id: string): Promise<Recipe> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Recipe not found');
    }

    return docToRecipe(docSnap);
  },

  create: async (recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>): Promise<Recipe> => {
    const now = Timestamp.now();

    // Remove imageFile as Firebase doesn't support File objects
    const { imageFile, ...recipeWithoutFile } = recipe as any;

    const recipeData = {
      ...recipeWithoutFile,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await addDoc(recipesCollection, recipeData);

    return {
      ...recipe,
      id: docRef.id,
      createdAt: now.toDate(),
      updatedAt: now.toDate(),
    };
  },

  update: async (id: string, recipe: Partial<Recipe>): Promise<Recipe> => {
    const docRef = doc(db, COLLECTION_NAME, id);

    // Remove imageFile as Firebase doesn't support File objects
    const { imageFile, ...recipeWithoutFile } = recipe as any;

    const updateData = {
      ...recipeWithoutFile,
      updatedAt: Timestamp.now(),
    };

    // Remove id from update data if present
    delete (updateData as any).id;

    await updateDoc(docRef, updateData);

    // Fetch and return updated recipe
    const updated = await getDoc(docRef);
    return docToRecipe(updated);
  },

  delete: async (id: string): Promise<void> => {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  },
};
