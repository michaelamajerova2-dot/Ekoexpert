import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type ThemeType = 'modern' | 'cozy' | 'elegant' | 'editorial' | 'paper';

interface Theme {
  name: string;
  colors: {
    primary: string;
    primaryHover: string;
    primaryLight: string;
    background: string;
    cardBg: string;
    text: string;
    textSecondary: string;
    border: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  borderRadius: string;
  hasPattern?: boolean;
}

export const themes: Record<ThemeType, Theme> = {
  modern: {
    name: 'Moderný & Čistý',
    colors: {
      primary: '#3B82F6',
      primaryHover: '#2563EB',
      primaryLight: '#DBEAFE',
      background: '#F8FAFC',
      cardBg: '#FFFFFF',
      text: '#1E293B',
      textSecondary: '#64748B',
      border: '#E2E8F0',
      accent: '#3B82F6',
    },
    fonts: {
      heading: "'Inter', sans-serif",
      body: "'Inter', sans-serif",
    },
    borderRadius: '12px',
  },
  cozy: {
    name: 'Teplý & Domácky',
    colors: {
      primary: '#EA580C',
      primaryHover: '#C2410C',
      primaryLight: '#FFEDD5',
      background: '#FFF9F5',
      cardBg: '#FFFFFF',
      text: '#292524',
      textSecondary: '#78716C',
      border: '#F5F5F4',
      accent: '#D97706',
    },
    fonts: {
      heading: "'Playfair Display', serif",
      body: "'Plus Jakarta Sans', sans-serif",
    },
    borderRadius: '16px',
  },
  elegant: {
    name: 'Elegantný & Sofistikovaný',
    colors: {
      primary: '#059669',
      primaryHover: '#047857',
      primaryLight: '#D1FAE5',
      background: '#FAF9F6',
      cardBg: '#FFFFFF',
      text: '#1F2937',
      textSecondary: '#6B7280',
      border: '#E5E7EB',
      accent: '#10B981',
    },
    fonts: {
      heading: "'Cormorant Garamond', serif",
      body: "'Outfit', sans-serif",
    },
    borderRadius: '10px',
  },
  editorial: {
    name: 'Klasický & Časopis',
    colors: {
      primary: '#111827',
      primaryHover: '#1F2937',
      primaryLight: '#F3F4F6',
      background: '#FEFEFE',
      cardBg: '#FFFFFF',
      text: '#111827',
      textSecondary: '#6B7280',
      border: '#E5E7EB',
      accent: '#F59E0B',
    },
    fonts: {
      heading: "'Fraunces', serif",
      body: "'Source Sans Pro', sans-serif",
    },
    borderRadius: '8px',
  },
  paper: {
    name: 'Papierový & Prírodný',
    colors: {
      primary: '#8B6F47',
      primaryHover: '#6F5636',
      primaryLight: '#F5EFE7',
      background: '#FAF8F3',
      cardBg: '#FFFDFB',
      text: '#3E2723',
      textSecondary: '#6D4C41',
      border: '#E8DFD0',
      accent: '#A0826D',
    },
    fonts: {
      heading: "'Montserrat', sans-serif",
      body: "'Montserrat', sans-serif",
    },
    borderRadius: '8px',
    hasPattern: true,
  },
};

interface ThemeContextType {
  currentTheme: ThemeType;
  theme: Theme;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('modern');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('receptar-theme') as ThemeType;
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const setTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);
    localStorage.setItem('receptar-theme', theme);
  };

  const theme = themes[currentTheme];

  // Apply CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-primary-hover', theme.colors.primaryHover);
    root.style.setProperty('--color-primary-light', theme.colors.primaryLight);
    root.style.setProperty('--color-background', theme.colors.background);
    root.style.setProperty('--color-card-bg', theme.colors.cardBg);
    root.style.setProperty('--color-text', theme.colors.text);
    root.style.setProperty('--color-text-secondary', theme.colors.textSecondary);
    root.style.setProperty('--color-border', theme.colors.border);
    root.style.setProperty('--color-accent', theme.colors.accent);
    root.style.setProperty('--font-heading', theme.fonts.heading);
    root.style.setProperty('--font-body', theme.fonts.body);
    root.style.setProperty('--border-radius', theme.borderRadius);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
