import { useParams } from 'react-router-dom';
import { MainLayout } from '../components/Layout/MainLayout';
import { RecipeForm } from '../components/Recipe/RecipeForm';
import { useRecipe } from '../hooks/useRecipes';

export const EditRecipe = () => {
  const { id } = useParams<{ id: string }>();
  const { recipe, loading, error } = useRecipe(id!);

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-8" />
            <div className="h-96 bg-gray-200 rounded-xl mb-6" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !recipe) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error || 'Recept nebol nájdený'}
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8 font-heading" style={{ color: 'var(--color-text)' }}>
          Upraviť recept
        </h1>
        <RecipeForm initialRecipe={recipe} isEdit={true} />
      </div>
    </MainLayout>
  );
};
