import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { MainLayout } from '../components/Layout/MainLayout';
import { RecipeForm } from '../components/Recipe/RecipeForm';

export const CreateRecipe = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Späť
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Nový recept</h1>
          <p className="text-gray-600 mt-2">Pridaj svoj nový recept do zbierky</p>
        </div>

        <RecipeForm />
      </div>
    </MainLayout>
  );
};
