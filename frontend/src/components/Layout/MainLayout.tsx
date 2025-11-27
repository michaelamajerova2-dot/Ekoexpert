import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { useTheme } from '../../contexts/ThemeContext';

interface MainLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  onSearchChange?: (search: string) => void;
}

export const MainLayout = ({ children, sidebar, onSearchChange }: MainLayoutProps) => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen ${theme.hasPattern ? 'paper-pattern' : ''}`}
      style={{ backgroundColor: theme.hasPattern ? undefined : 'var(--color-background)' }}
    >
      <Navbar onSearchChange={onSearchChange} />
      <div className="flex">
        {sidebar && (
          <div className="hidden lg:block sticky top-16 h-[calc(100vh-4rem)]">
            {sidebar}
          </div>
        )}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};
