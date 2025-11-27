import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChefHat, Shuffle } from 'lucide-react';
import { Recipe, CATEGORY_LABELS } from '../../types/recipe.types';

interface RandomRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipes: Recipe[];
}

export const RandomRecipeModal = ({ isOpen, onClose, recipes }: RandomRecipeModalProps) => {
  const navigate = useNavigate();
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);

  const getRandomRecipe = () => {
    if (recipes.length === 0) {
      setCurrentRecipe(null);
      return;
    }

    // Get random recipe different from current one if possible
    let randomRecipe: Recipe;
    if (recipes.length === 1) {
      randomRecipe = recipes[0];
    } else {
      do {
        const randomIndex = Math.floor(Math.random() * recipes.length);
        randomRecipe = recipes[randomIndex];
      } while (currentRecipe && randomRecipe.id === currentRecipe.id && recipes.length > 1);
    }

    setCurrentRecipe(randomRecipe);
  };

  // Get initial random recipe when modal opens
  useEffect(() => {
    if (isOpen && recipes.length > 0) {
      getRandomRecipe();
    }
  }, [isOpen, recipes.length]);

  const handleViewRecipe = () => {
    if (currentRecipe) {
      navigate(`/recipe/${currentRecipe.id}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          style={{ backgroundColor: 'var(--color-card-bg)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="p-6 border-b flex items-center justify-between"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-center gap-3">
              <ChefHat className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
              <h3 className="text-xl font-bold font-heading" style={{ color: 'var(--color-text)' }}>
                Náhodný recept
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
            {currentRecipe ? (
              <div>
                {/* Recipe Image */}
                {currentRecipe.image && (
                  <div className="w-full h-64 overflow-hidden">
                    <img
                      src={currentRecipe.image}
                      alt={currentRecipe.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Recipe Details */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    {/* Display categories */}
                    {currentRecipe.category && (
                      Array.isArray(currentRecipe.category) ? (
                        currentRecipe.category.map((cat) => (
                          <span
                            key={cat}
                            className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full"
                          >
                            {CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS] || cat}
                          </span>
                        ))
                      ) : (
                        <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                          {CATEGORY_LABELS[currentRecipe.category as keyof typeof CATEGORY_LABELS] || currentRecipe.category}
                        </span>
                      )
                    )}
                    {currentRecipe.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2
                    className="text-2xl font-bold mb-3 font-heading"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {currentRecipe.title}
                  </h2>

                  {currentRecipe.description && (
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {currentRecipe.description}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center">
                <ChefHat
                  className="w-16 h-16 mx-auto mb-4 opacity-50"
                  style={{ color: 'var(--color-text-secondary)' }}
                />
                <p
                  className="text-lg"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Zatiaľ nemáš žiadne recepty. Vytvor si nejaké recepty aby som ti mohol vybrať náhodný!
                </p>
              </div>
            )}
          </div>

          {/* Footer with Actions */}
          {currentRecipe && (
            <div
              className="p-6 border-t flex gap-3"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <button
                onClick={getRandomRecipe}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors border"
                style={{
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)',
                }}
              >
                <Shuffle className="w-5 h-5" />
                Ďalší recept
              </button>
              <button
                onClick={handleViewRecipe}
                className="flex-1 px-4 py-3 rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                }}
              >
                Zobraziť recept
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
