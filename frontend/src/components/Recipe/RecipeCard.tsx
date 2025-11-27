import { Link } from 'react-router-dom';
import { ChefHat } from 'lucide-react';
import { Recipe, CATEGORY_LABELS } from '../../types/recipe.types';

interface RecipeCardProps {
  recipe: Recipe;
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    breakfast: 'bg-breakfast',
    lunch: 'bg-lunch',
    dinner: 'bg-dinner',
    snack: 'bg-snack',
    dessert: 'bg-dessert',
  };
  return colors[category] || 'bg-gray-500';
};

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <Link to={`/recipe/${recipe.id}`}>
      <div
        className="overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer h-full flex flex-col"
        style={{
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: 'var(--border-radius)'
        }}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden" style={{ backgroundColor: 'var(--color-border)' }}>
          {recipe.image ? (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <ChefHat className="w-16 h-16" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-2">
            {recipe.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-md"
                style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
              >
                {tag}
              </span>
            ))}
            {recipe.tags.length > 3 && (
              <span className="px-2 py-1 text-xs rounded-md" style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
                +{recipe.tags.length - 3}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold mb-2 line-clamp-2 font-heading" style={{ color: 'var(--color-text)' }}>
            {recipe.title}
          </h3>

          {/* Description */}
          {recipe.description && (
            <p className="text-sm mb-3 line-clamp-2 flex-1" style={{ color: 'var(--color-text-secondary)' }}>
              {recipe.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
