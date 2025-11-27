import { Recipe } from '../../types/recipe.types';
import { RecipeCard } from './RecipeCard';
import { ChefHat } from 'lucide-react';

interface RecipeListProps {
  recipes: Recipe[];
  loading?: boolean;
}

const RecipeSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
    <div className="h-48 bg-gray-200" />
    <div className="p-4 space-y-3">
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-gray-200 rounded-md" />
        <div className="h-6 w-16 bg-gray-200 rounded-md" />
      </div>
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
    </div>
  </div>
);

const EmptyState = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-16">
    <ChefHat className="w-24 h-24 text-gray-300 mb-4" />
    <h3 className="text-xl font-semibold text-gray-900 mb-2">Žiadne recepty</h3>
    <p className="text-gray-600 mb-6">Skús zmeniť filtre alebo pridaj nový recept</p>
  </div>
);

export const RecipeList = ({ recipes, loading }: RecipeListProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <RecipeSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (recipes.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};
