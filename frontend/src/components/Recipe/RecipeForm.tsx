import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Upload, FileText, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { recipeFormSchema, RecipeFormData } from '../../schemas/recipeSchema';
import { CATEGORY_LABELS, DEFAULT_TAGS, Recipe } from '../../types/recipe.types';
import { recipeApi } from '../../services/api';
import { parseRecipeFromText } from '../../utils/recipeParser';

interface RecipeFormProps {
  initialRecipe?: Recipe;
  isEdit?: boolean;
}

export const RecipeForm = ({ initialRecipe, isEdit = false }: RecipeFormProps) => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string>(initialRecipe?.image || '');
  const [newCategory, setNewCategory] = useState('');
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [showPasteSection, setShowPasteSection] = useState(false);
  const [pasteText, setPasteText] = useState('');

  // Helper to convert legacy ingredients array to string
  const convertLegacyIngredients = (ingredients: string | any[]): string => {
    if (typeof ingredients === 'string') {
      return ingredients;
    }
    // Legacy format: array of objects
    return ingredients.map(ing => {
      const parts = [];
      if (ing.amount && ing.unit) parts.push(`${ing.amount} ${ing.unit}`);
      parts.push(ing.name);
      if (ing.note) parts.push(`(${ing.note})`);
      return `• ${parts.join(' ')}`;
    }).join('\n');
  };

  // Helper to convert legacy category string to array
  const convertLegacyCategory = (category: string | string[] | undefined): string[] => {
    if (!category) return [];
    if (typeof category === 'string') return category ? [category] : [];
    return category;
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: {
      title: initialRecipe?.title || '',
      description: initialRecipe?.description || '',
      image: initialRecipe?.image || '',
      category: convertLegacyCategory(initialRecipe?.category),
      tags: initialRecipe?.tags || [],
      ingredients: initialRecipe?.ingredients ? convertLegacyIngredients(initialRecipe.ingredients) : '',
      instructions: initialRecipe?.instructions || '',
    },
  });

  const selectedTags = watch('tags') || [];
  const selectedCategories = watch('category') || [];

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setValue('category', selectedCategories.filter(c => c !== category));
    } else {
      setValue('category', [...selectedCategories, category]);
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setValue('tags', selectedTags.filter(t => t !== tag));
    } else {
      setValue('tags', [...selectedTags, tag]);
    }
  };

  const addCustomCategory = () => {
    if (newCategory.trim() && !customCategories.includes(newCategory.trim())) {
      const trimmedCategory = newCategory.trim();
      setCustomCategories([...customCategories, trimmedCategory]);
      setValue('category', [...selectedCategories, trimmedCategory]);
      setNewCategory('');
    }
  };

  const addCustomTag = () => {
    if (newTag.trim() && !customTags.includes(newTag.trim()) && !DEFAULT_TAGS.includes(newTag.trim())) {
      setCustomTags([...customTags, newTag.trim()]);
      setValue('tags', [...selectedTags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Store file for upload
      setValue('imageFile', file);
    }
  };

  const handleImageUrlChange = (url: string) => {
    setValue('image', url);
    setImagePreview(url);
  };

  const onSubmit = async (data: RecipeFormData) => {
    try {
      // Convert dashes to bullets in ingredients
      let processedIngredients = data.ingredients;
      if (processedIngredients) {
        // Replace dashes at the start of lines with bullets
        processedIngredients = processedIngredients
          .split('\n')
          .map(line => {
            // Replace dash at the beginning of line (with optional whitespace) with bullet
            return line.replace(/^\s*-\s*/, '• ');
          })
          .join('\n');
      }

      // For now, if there's imageFile, convert to base64 or handle upload
      // Simplest approach: use image URL if provided
      const recipeData = {
        ...data,
        ingredients: processedIngredients || '',
        instructions: data.instructions || '',
        image: data.image || imagePreview,
      };

      if (isEdit && initialRecipe) {
        await recipeApi.update(initialRecipe.id, recipeData);
        toast.success('Recept bol úspešne aktualizovaný!');
        navigate(`/recipe/${initialRecipe.id}`);
      } else {
        await recipeApi.create(recipeData);
        toast.success('Recept bol úspešne pridaný!');
        navigate('/');
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
      toast.error(isEdit ? 'Nepodarilo sa aktualizovať recept. Skús to znova.' : 'Nepodarilo sa pridať recept. Skús to znova.');
    }
  };

  const handlePasteRecipe = () => {
    if (!pasteText.trim()) {
      toast.error('Vlož text receptu!');
      return;
    }

    try {
      const parsed = parseRecipeFromText(pasteText);

      // Set title
      if (parsed.title) {
        setValue('title', parsed.title);
      }

      // Set description
      if (parsed.description) {
        setValue('description', parsed.description);
      }

      // Set ingredients
      if (parsed.ingredients) {
        setValue('ingredients', parsed.ingredients);
      }

      // Set instructions
      if (parsed.instructions) {
        setValue('instructions', parsed.instructions);
      }

      toast.success('Recept bol úspešne načítaný! Skontroluj údaje a uprav ak treba.');
      setShowPasteSection(false);
      setPasteText('');
    } catch (error) {
      console.error('Error parsing recipe:', error);
      toast.error('Nepodarilo sa načítať recept. Skús upraviť formát textu.');
    }
  };

  const allCategories = [
    ...Object.entries(CATEGORY_LABELS).map(([key, label]) => ({ key, label })),
    ...customCategories.map(cat => ({ key: cat, label: cat }))
  ];

  const allTags = [...DEFAULT_TAGS, ...customTags];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Smart Paste Section */}
      {!isEdit && (
        <section
          className="rounded-xl shadow-sm p-6 border-2 border-dashed"
          style={{
            backgroundColor: 'var(--color-card-bg)',
            borderColor: 'var(--color-primary-light)'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
              <h2 className="text-xl font-bold font-heading" style={{ color: 'var(--color-text)' }}>
                Rýchle pridanie receptu
              </h2>
            </div>
            {!showPasteSection && (
              <button
                type="button"
                onClick={() => setShowPasteSection(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'white'
                }}
              >
                <FileText className="w-4 h-4" />
                Vložiť text receptu
              </button>
            )}
          </div>

          {showPasteSection && (
            <div>
              <div className="mb-3">
                <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                  Skopíruj celý text receptu z ľubovoľnej webstránky a vlož ho sem. Systém automaticky:
                </p>
                <ul className="text-sm space-y-1 ml-4" style={{ color: 'var(--color-text-secondary)' }}>
                  <li>• Odstráni webové prvky (tlačidlá, dátumy, autor...)</li>
                  <li>• Rozpozná názov, ingrediencie a postup</li>
                  <li>• Naplní formulár - stačí už len skontrolovať a uložiť!</li>
                </ul>
                <p className="text-xs mt-2 italic" style={{ color: 'var(--color-text-secondary)' }}>
                  Tip: Funguje aj pre anglické recepty z kuchárskych stránok ako AllRecipes, BBC Good Food atď.
                </p>
              </div>
              <textarea
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                rows={12}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 mb-3 font-mono text-sm"
                style={{
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)'
                }}
                placeholder="Vlož sem skopírovaný text z webu (aj so všetkými webovými prvkami)...

Alebo jednoduchý formát:
Palacinky

Ingrediencie:
- 2 hrnčeky múky
- 3 vajcia
- 500ml mlieka
- špetuošku soli

Postup:
1. Zmiešaj múku s vajíčkami
2. Pridaj mlieko a soľ
3. Upečiem na panvici"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handlePasteRecipe}
                  className="flex-1 px-4 py-2 rounded-lg font-medium transition-colors"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'white'
                  }}
                >
                  Načítať recept
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasteSection(false);
                    setPasteText('');
                  }}
                  className="px-4 py-2 border rounded-lg font-medium transition-colors"
                  style={{
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-secondary)'
                  }}
                >
                  Zrušiť
                </button>
              </div>
            </div>
          )}

          {!showPasteSection && (
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Máš recept na webe? Jednoducho ho skopíruj a vlož sem. Alebo vyplň formulár ručne nižšie.
            </p>
          )}
        </section>
      )}

      {/* Základné informácie */}
      <section
        className="rounded-xl shadow-sm p-6"
        style={{ backgroundColor: 'var(--color-card-bg)' }}
      >
        <h2 className="text-xl font-bold mb-4 font-heading" style={{ color: 'var(--color-text)' }}>
          Základné informácie
        </h2>

        {/* Názov receptu */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
            Názov receptu *
          </label>
          <input
            id="title"
            type="text"
            {...register('title')}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{
              borderColor: errors.title ? '#EF4444' : 'var(--color-border)',
              color: 'var(--color-text)'
            }}
            placeholder="Napr. Bratislavský rožok"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Popis */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
            Popis
          </label>
          <textarea
            id="description"
            {...register('description')}
            rows={3}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-text)'
            }}
            placeholder="Krátky popis receptu..."
          />
        </div>

        {/* Obrázok */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
            Obrázok
          </label>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mb-3 relative">
              <img
                src={imagePreview}
                alt="Náhľad"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  setImagePreview('');
                  setValue('image', '');
                  setValue('imageFile', undefined);
                }}
                className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Upload button */}
          <div className="flex gap-3">
            <label className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:bg-opacity-50 transition-colors"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-text-secondary)'
              }}
            >
              <Upload className="w-5 h-5" />
              <span>Nahrať obrázok</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* OR */}
          <div className="flex items-center gap-3 my-3">
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>ALEBO</span>
            <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
          </div>

          {/* URL input */}
          <input
            type="text"
            {...register('image')}
            onChange={(e) => handleImageUrlChange(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-text)'
            }}
            placeholder="Vlož URL adresu obrázka"
          />
        </div>
      </section>

      {/* Kategória */}
      <section
        className="rounded-xl shadow-sm p-6"
        style={{ backgroundColor: 'var(--color-card-bg)' }}
      >
        <h2 className="text-xl font-bold mb-4 font-heading" style={{ color: 'var(--color-text)' }}>
          Kategórie
        </h2>

        <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>
          Môžeš vybrať viacero kategórií (napr. obed + večera)
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          {allCategories.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => toggleCategory(key)}
              className="px-4 py-2 rounded-lg font-medium transition-colors"
              style={{
                backgroundColor: selectedCategories.includes(key) ? 'var(--color-primary)' : 'var(--color-primary-light)',
                color: selectedCategories.includes(key) ? 'white' : 'var(--color-primary)',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Add custom category */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomCategory())}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-text)'
            }}
            placeholder="Vytvor vlastnú kategóriu"
          />
          <button
            type="button"
            onClick={addCustomCategory}
            className="px-4 py-2 rounded-lg font-medium transition-colors"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'white'
            }}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Tagy */}
      <section
        className="rounded-xl shadow-sm p-6"
        style={{ backgroundColor: 'var(--color-card-bg)' }}
      >
        <h2 className="text-xl font-bold mb-4 font-heading" style={{ color: 'var(--color-text)' }}>
          Tagy
        </h2>

        <div className="flex flex-wrap gap-2 mb-3">
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className="px-3 py-1 rounded-full text-sm font-medium transition-colors"
              style={{
                backgroundColor: selectedTags.includes(tag) ? 'var(--color-primary)' : 'var(--color-primary-light)',
                color: selectedTags.includes(tag) ? 'white' : 'var(--color-primary)',
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Add custom tag */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTag())}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-text)'
            }}
            placeholder="Vytvor vlastný tag"
          />
          <button
            type="button"
            onClick={addCustomTag}
            className="px-4 py-2 rounded-lg font-medium transition-colors"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'white'
            }}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Ingrediencie */}
      <section
        className="rounded-xl shadow-sm p-6"
        style={{ backgroundColor: 'var(--color-card-bg)' }}
      >
        <h2 className="text-xl font-bold mb-4 font-heading" style={{ color: 'var(--color-text)' }}>
          Ingrediencie
        </h2>

        <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)' }}>
          Zadaj každú ingredienciu na nový riadok. Môžeš použiť pomlčky (-), ktoré sa automaticky premenia na odrážky (•).
        </p>

        <textarea
          {...register('ingredients')}
          rows={8}
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
          style={{
            borderColor: errors.ingredients ? '#EF4444' : 'var(--color-border)',
            color: 'var(--color-text)'
          }}
          placeholder="- 2 hrnčeky múky
- 3 vajcia
- 500ml mlieka
- špetuošku soli
- 1 lyžičku cukru"
        />
        {errors.ingredients && (
          <p className="mt-1 text-sm text-red-600">{errors.ingredients.message}</p>
        )}
      </section>

      {/* Postup prípravy */}
      <section
        className="rounded-xl shadow-sm p-6"
        style={{ backgroundColor: 'var(--color-card-bg)' }}
      >
        <h2 className="text-xl font-bold mb-4 font-heading" style={{ color: 'var(--color-text)' }}>
          Postup prípravy
        </h2>

        <textarea
          {...register('instructions')}
          rows={8}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
          style={{
            borderColor: 'var(--color-border)',
            color: 'var(--color-text)'
          }}
          placeholder="Popíš postup prípravy..."
        />
      </section>

      {/* Submit tlačidlá */}
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="px-6 py-3 border rounded-lg font-medium transition-colors"
          style={{
            borderColor: 'var(--color-border)',
            color: 'var(--color-text-secondary)'
          }}
        >
          Zrušiť
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'white'
          }}
        >
          {isSubmitting ? 'Ukladám...' : (isEdit ? 'Uložiť zmeny' : 'Vytvoriť recept')}
        </button>
      </div>
    </form>
  );
};
