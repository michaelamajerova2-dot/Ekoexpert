import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, ChefHat, Calendar, Shuffle } from 'lucide-react';
import { ThemeSwitcher } from '../Common/ThemeSwitcher';
import { RandomRecipeModal } from '../Common/RandomRecipeModal';
import { useRecipes } from '../../hooks/useRecipes';

interface NavbarProps {
  onSearchChange?: (search: string) => void;
}

export const Navbar = ({ onSearchChange }: NavbarProps) => {
  const [showRandomRecipeModal, setShowRandomRecipeModal] = useState(false);
  const { recipes } = useRecipes({});

  return (
    <nav className="sticky top-0 z-50" style={{ backgroundColor: 'var(--color-card-bg)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ChefHat className="w-8 h-8" style={{ color: 'var(--color-primary)' }} />
            <span className="text-xl font-bold font-heading" style={{ color: 'var(--color-text)' }}>Šmakociny</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Hľadaj recepty, ingrediencie..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <button
              onClick={() => setShowRandomRecipeModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium border"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
              }}
              title="Náhodný recept"
            >
              <Shuffle className="w-5 h-5" />
              <span className="hidden lg:inline">Náhodný</span>
            </button>
            <Link
              to="/meal-plan"
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium border"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
              }}
              title="Týždenný plán jedál"
            >
              <Calendar className="w-5 h-5" />
              <span className="hidden lg:inline">Plán jedál</span>
            </Link>
            <Link
              to="/create"
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Nový recept</span>
            </Link>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Hľadaj recepty..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Random Recipe Modal */}
      <RandomRecipeModal
        isOpen={showRandomRecipeModal}
        onClose={() => setShowRandomRecipeModal(false)}
        recipes={recipes}
      />
    </nav>
  );
};
