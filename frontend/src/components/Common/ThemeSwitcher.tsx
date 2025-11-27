import { useState, useEffect, useRef } from 'react';
import { Palette } from 'lucide-react';
import { useTheme, themes, ThemeType } from '../../contexts/ThemeContext';

export const ThemeSwitcher = () => {
  const { currentTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleThemeChange = (themeKey: ThemeType) => {
    setTheme(themeKey);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg transition-colors"
        style={{
          color: 'var(--color-text-secondary)',
          backgroundColor: isOpen ? 'var(--color-primary-light)' : 'transparent',
        }}
        onMouseEnter={(e) => {
          if (!isOpen) {
            e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
        aria-label="Zmeniť tému"
        title="Zmeniť tému"
      >
        <Palette className="w-5 h-5" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border py-2 z-50 animate-fadeIn"
          style={{
            borderColor: 'var(--color-border)',
            backgroundColor: 'var(--color-card-bg)',
          }}
        >
          <div
            className="px-4 py-2 text-sm font-medium border-b"
            style={{
              color: 'var(--color-text)',
              borderColor: 'var(--color-border)',
            }}
          >
            Vyber dizajn
          </div>
          <div className="py-1">
            {(Object.keys(themes) as ThemeType[]).map((themeKey) => {
              const theme = themes[themeKey];
              const isActive = currentTheme === themeKey;

              return (
                <button
                  key={themeKey}
                  onClick={() => handleThemeChange(themeKey)}
                  className="w-full px-4 py-3 text-left transition-colors flex items-center justify-between"
                  style={{
                    backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                    color: 'var(--color-text)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
                      e.currentTarget.style.opacity = '0.5';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.opacity = '1';
                    }
                  }}
                >
                  <div>
                    <div className="font-medium text-sm">{theme.name}</div>
                    <div className="text-xs opacity-60 mt-0.5">
                      {theme.fonts.heading.split(',')[0].replace(/'/g, '')}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: theme.colors.accent }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
