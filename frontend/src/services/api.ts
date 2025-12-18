// Using Firebase instead of backend API
import { firebaseRecipeApi } from './firebaseRecipeService';

// Export Firebase API as recipeApi for backward compatibility
export const recipeApi = firebaseRecipeApi;

export default recipeApi;
