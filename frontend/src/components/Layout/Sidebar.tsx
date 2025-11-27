import { CATEGORY_LABELS } from '../../types/recipe.types';

interface SidebarProps {
  selectedCategory?: string;
  selectedTags: string[];
  onCategoryChange: (category?: string) => void;
  onTagToggle: (tag: string) => void;
  recipeCounts?: Record<string, number>;
  availableCategories?: string[];
  availableTags?: string[];
}

export const Sidebar = ({
  selectedCategory,
  selectedTags,
  onCategoryChange,
  onTagToggle,
  recipeCounts = {},
  availableCategories = [],
  availableTags = []
}: SidebarProps) => {

  return (
    <aside className="w-64 p-6 overflow-y-auto" style={{ backgroundColor: 'var(--color-card-bg)', borderRight: '1px solid var(--color-border)' }}>
      {/* Kategórie */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
          Kategórie
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange(undefined)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              !selectedCategory
                ? 'font-medium'
                : ''
            }`}
            style={{
              backgroundColor: !selectedCategory ? 'var(--color-primary-light)' : 'transparent',
              color: !selectedCategory ? 'var(--color-primary)' : 'var(--color-text-secondary)'
            }}
          >
            Všetky {recipeCounts.total ? `(${recipeCounts.total})` : ''}
          </button>
          {availableCategories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'font-medium'
                  : ''
              }`}
              style={{
                backgroundColor: selectedCategory === category ? 'var(--color-primary-light)' : 'transparent',
                color: selectedCategory === category ? 'var(--color-primary)' : 'var(--color-text-secondary)'
              }}
            >
              {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] || category} {recipeCounts[category] ? `(${recipeCounts[category]})` : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Tagy */}
      <div>
        <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
          Tagy
        </h3>
        <div className="flex flex-wrap gap-2">
          {availableTags.length > 0 ? (
            availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? ''
                    : 'border'
                }`}
                style={{
                  backgroundColor: selectedTags.includes(tag) ? 'var(--color-primary)' : 'var(--color-card-bg)',
                  color: selectedTags.includes(tag) ? 'white' : 'var(--color-text-secondary)',
                  borderColor: selectedTags.includes(tag) ? 'transparent' : 'var(--color-border)'
                }}
              >
                {tag}
              </button>
            ))
          ) : (
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Zatiaľ žiadne tagy
            </p>
          )}
        </div>
      </div>

      {/* Clear Filters */}
      {(selectedCategory || selectedTags.length > 0) && (
        <div className="mt-8">
          <button
            onClick={() => {
              onCategoryChange(undefined);
              selectedTags.forEach(tag => onTagToggle(tag));
            }}
            className="w-full px-4 py-2 text-sm rounded-lg transition-colors border"
            style={{
              color: 'var(--color-text-secondary)',
              borderColor: 'var(--color-border)',
              backgroundColor: 'transparent'
            }}
          >
            Vyčistiť filtre
          </button>
        </div>
      )}
    </aside>
  );
};
