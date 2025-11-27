import { useState, useEffect } from 'react';
import { Plus, X, ShoppingCart, Copy, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { MainLayout } from '../components/Layout/MainLayout';
import { useRecipes } from '../hooks/useRecipes';
import { WeekPlan, DAYS_OF_WEEK, MEAL_LABELS, MealType } from '../types/mealPlan.types';

const STORAGE_KEY = 'smakociny_meal_plan';

const getInitialWeekPlan = (): WeekPlan => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Error parsing saved meal plan:', e);
    }
  }
  return {
    monday: {},
    tuesday: {},
    wednesday: {},
    thursday: {},
    friday: {},
    saturday: {},
    sunday: {},
  };
};

export const MealPlan = () => {
  const [weekPlan, setWeekPlan] = useState<WeekPlan>(getInitialWeekPlan);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<MealType | null>(null);
  const [showRecipeSelector, setShowRecipeSelector] = useState(false);
  const [showShoppingList, setShowShoppingList] = useState(false);
  const { recipes } = useRecipes({});

  // Save to localStorage whenever plan changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(weekPlan));
  }, [weekPlan]);

  const addMealToPlan = (day: string, mealType: MealType, recipeId: string) => {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    setWeekPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof WeekPlan],
        [mealType]: {
          recipeId: recipe.id,
          recipeName: recipe.title,
        },
      },
    }));
    setShowRecipeSelector(false);
    setSelectedDay(null);
    setSelectedMealType(null);
    toast.success(`${recipe.title} pridané do plánu!`);
  };

  const removeMealFromPlan = (day: string, mealType: MealType) => {
    setWeekPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day as keyof WeekPlan],
        [mealType]: undefined,
      },
    }));
    toast.success('Recept odstránený z plánu');
  };

  const clearWeekPlan = () => {
    setWeekPlan({
      monday: {},
      tuesday: {},
      wednesday: {},
      thursday: {},
      friday: {},
      saturday: {},
      sunday: {},
    });
    toast.success('Týždenný plán vymazaný');
  };

  const openRecipeSelector = (day: string, mealType: MealType) => {
    setSelectedDay(day);
    setSelectedMealType(mealType);
    setShowRecipeSelector(true);
  };

  // Generate shopping list
  const generateShoppingList = (): string[] => {
    const allIngredients: string[] = [];

    DAYS_OF_WEEK.forEach(({ key: day }) => {
      const dayPlan = weekPlan[day as keyof WeekPlan];
      (['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).forEach(mealType => {
        const meal = dayPlan[mealType];
        if (meal?.recipeId) {
          const recipe = recipes.find(r => r.id === meal.recipeId);
          if (recipe) {
            if (typeof recipe.ingredients === 'string') {
              // New format - split by newlines
              const ingredientsList = recipe.ingredients
                .split('\n')
                .filter(line => line.trim())
                .map(line => line.replace(/^[•\-*]\s*/, '').trim());
              allIngredients.push(...ingredientsList);
            } else {
              // Legacy format
              recipe.ingredients.forEach(ing => {
                const text = `${ing.amount || ''} ${ing.unit || ''} ${ing.name}`.trim();
                allIngredients.push(text);
              });
            }
          }
        }
      });
    });

    // Remove duplicates and bold headers
    return Array.from(new Set(allIngredients));
  };

  // Export to Notes (copy to clipboard)
  const exportToNotes = () => {
    let text = '📅 TÝŽDENNÝ PLÁN JEDÁL\n\n';

    DAYS_OF_WEEK.forEach(({ key: day, label }) => {
      const dayPlan = weekPlan[day as keyof WeekPlan];
      const hasMeals = dayPlan.breakfast || dayPlan.lunch || dayPlan.dinner || dayPlan.snack;

      if (hasMeals) {
        text += `${label.toUpperCase()}\n`;
        if (dayPlan.breakfast?.recipeName) text += `  🌅 Raňajky: ${dayPlan.breakfast.recipeName}\n`;
        if (dayPlan.lunch?.recipeName) text += `  🍽️ Obed: ${dayPlan.lunch.recipeName}\n`;
        if (dayPlan.dinner?.recipeName) text += `  🌙 Večera: ${dayPlan.dinner.recipeName}\n`;
        if (dayPlan.snack?.recipeName) text += `  🍪 Desiata: ${dayPlan.snack.recipeName}\n`;
        text += '\n';
      }
    });

    const shoppingList = generateShoppingList();
    if (shoppingList.length > 0) {
      text += '\n🛒 NÁKUPNÝ ZOZNAM\n\n';
      shoppingList.forEach(item => {
        text += `☐ ${item}\n`;
      });
    }

    text += '\n---\nVygenerované v Šmakociny';

    navigator.clipboard.writeText(text);
    toast.success('Plán skopírovaný do schránky! Môžeš ho vložiť do Poznámok.');
  };

  const shoppingList = generateShoppingList();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold font-heading" style={{ color: 'var(--color-text)' }}>
              Týždenný plán jedál
            </h1>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Naplánuj si jedlá na celý týždeň
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowShoppingList(!showShoppingList)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white',
              }}
            >
              <ShoppingCart className="w-5 h-5" />
              Nákupný zoznam ({shoppingList.length})
            </button>
            <button
              onClick={exportToNotes}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors border"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
              }}
            >
              <Copy className="w-5 h-5" />
              Export do Poznámok
            </button>
            <button
              onClick={clearWeekPlan}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors border border-red-300 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-5 h-5" />
              Vymazať plán
            </button>
          </div>
        </div>

        {/* Shopping List Sidebar */}
        {showShoppingList && (
          <div
            className="mb-6 rounded-xl p-6 border-2"
            style={{
              backgroundColor: 'var(--color-card-bg)',
              borderColor: 'var(--color-primary-light)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold font-heading" style={{ color: 'var(--color-text)' }}>
                Nákupný zoznam
              </h2>
              <button
                onClick={() => setShowShoppingList(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {shoppingList.length > 0 ? (
              <ul className="space-y-2">
                {shoppingList.map((item, i) => (
                  <li key={i} className="flex items-start gap-2" style={{ color: 'var(--color-text)' }}>
                    <input type="checkbox" className="mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Zatiaľ nemáš žiadne recepty v pláne. Pridaj recepty do jednotlivých dní.
              </p>
            )}
          </div>
        )}

        {/* Week Grid */}
        <div className="grid gap-4">
          {DAYS_OF_WEEK.map(({ key: day, label }) => {
            const dayPlan = weekPlan[day as keyof WeekPlan];

            return (
              <div
                key={day}
                className="rounded-xl p-6"
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <h3 className="text-lg font-bold mb-4 font-heading" style={{ color: 'var(--color-text)' }}>
                  {label}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {(['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map(mealType => {
                    const meal = dayPlan[mealType];

                    return (
                      <div key={mealType}>
                        <div className="text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                          {MEAL_LABELS[mealType]}
                        </div>
                        {meal?.recipeName ? (
                          <div
                            className="p-3 rounded-lg border relative group"
                            style={{
                              backgroundColor: 'var(--color-primary-light)',
                              borderColor: 'var(--color-primary)',
                            }}
                          >
                            <p className="text-sm font-medium pr-6" style={{ color: 'var(--color-text)' }}>
                              {meal.recipeName}
                            </p>
                            <button
                              onClick={() => removeMealFromPlan(day, mealType)}
                              className="absolute top-2 right-2 p-1 rounded hover:bg-red-100 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => openRecipeSelector(day, mealType)}
                            className="w-full p-3 rounded-lg border-2 border-dashed flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                            style={{
                              borderColor: 'var(--color-border)',
                              color: 'var(--color-text-secondary)',
                            }}
                          >
                            <Plus className="w-4 h-4" />
                            <span className="text-sm">Pridať recept</span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Recipe Selector Modal */}
        {showRecipeSelector && selectedDay && selectedMealType && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => {
                setShowRecipeSelector(false);
                setSelectedDay(null);
                setSelectedMealType(null);
              }}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
                style={{ backgroundColor: 'var(--color-card-bg)' }}
              >
                <div className="p-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
                  <h3 className="text-xl font-bold font-heading" style={{ color: 'var(--color-text)' }}>
                    Vyber recept
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    {DAYS_OF_WEEK.find(d => d.key === selectedDay)?.label} - {MEAL_LABELS[selectedMealType]}
                  </p>
                </div>
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                  <div className="grid gap-3">
                    {recipes.length > 0 ? (
                      recipes.map(recipe => (
                        <button
                          key={recipe.id}
                          onClick={() => addMealToPlan(selectedDay, selectedMealType, recipe.id)}
                          className="p-4 rounded-lg border text-left hover:bg-gray-50 transition-colors"
                          style={{
                            borderColor: 'var(--color-border)',
                          }}
                        >
                          <div className="font-medium" style={{ color: 'var(--color-text)' }}>
                            {recipe.title}
                          </div>
                          {recipe.description && (
                            <div className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                              {recipe.description}
                            </div>
                          )}
                        </button>
                      ))
                    ) : (
                      <p style={{ color: 'var(--color-text-secondary)' }}>
                        Zatiaľ nemáš žiadne recepty. Vytvor si nejaké recepty a potom ich môžeš pridať do plánu.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};
