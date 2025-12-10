import { useState } from 'react';
import { MainLayout } from '../components/Layout/MainLayout';
import { Sidebar } from '../components/Layout/Sidebar';
import { RecipeList } from '../components/Recipe/RecipeList';
import { useRecipes } from '../hooks/useRecipes';
import { RecipeCategory, DEFAULT_TAGS, SortOption, SORT_OPTIONS } from '../types/recipe.types';

export const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Get all recipes (unfiltered) to extract all categories and tags
  const { recipes: allRecipes } = useRecipes({});

  // Get filtered recipes for display
  const { recipes, loading, error } = useRecipes({
    category: selectedCategory,
    tags: selectedTags.length > 0 ? selectedTags : undefined,
    search: searchQuery || undefined,
    sortBy,
  });

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Calculate recipe counts per category from ALL recipes
  const recipeCounts = allRecipes.reduce((acc, recipe) => {
    // Support both single category (legacy) and array of categories (new)
    const categories = Array.isArray(recipe.category) ? recipe.category : [recipe.category];
    categories.forEach(cat => {
      if (cat) {
        acc[cat] = (acc[cat] || 0) + 1;
      }
    });
    acc.total = (acc.total || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get all categories: predefined + custom ones from recipes
  const allRecipeCategories = allRecipes.flatMap(r =>
    Array.isArray(r.category) ? r.category : [r.category]
  ).filter(c => c); // Remove undefined/null

  const customCategories = Array.from(
    new Set(allRecipeCategories.filter(c => !Object.values(RecipeCategory).includes(c as RecipeCategory)))
  );
  const allCategories = [
    ...Object.values(RecipeCategory),
    ...customCategories
  ];

  // Get all tags: default + custom ones from recipes
  const customTags = Array.from(
    new Set(allRecipes.flatMap(r => r.tags).filter(t => !DEFAULT_TAGS.includes(t)))
  );
  const allTags = [...DEFAULT_TAGS, ...customTags];

  return (
    <MainLayout
      onSearchChange={setSearchQuery}
      sidebar={
        <Sidebar
          selectedCategory={selectedCategory}
          selectedTags={selectedTags}
          onCategoryChange={setSelectedCategory}
          onTagToggle={handleTagToggle}
          recipeCounts={recipeCounts}
          availableCategories={allCategories}
          availableTags={allTags}
        />
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedCategory ? `Kategória: ${selectedCategory}` : 'Všetky recepty'}
              </h1>
              <p className="text-gray-600">
                {recipes.length} {recipes.length === 1 ? 'recept' : recipes.length < 5 ? 'recepty' : 'receptov'}
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-gray-600 whitespace-nowrap">
                Zoradiť:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Recipe Grid */}
        <RecipeList recipes={recipes} loading={loading} />
      </div>
    </MainLayout>
  );
};
