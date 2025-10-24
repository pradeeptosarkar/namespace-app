import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isForcedLightMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const FORCED_LIGHT_MODE_ROUTES = [
  '/privacy-policy',
  '/terms-of-use',
  '/branding',
  '/team',
  '/about-us',
];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [userTheme, setUserTheme] = useState<Theme>('dark');
  
  const isForcedLightMode = FORCED_LIGHT_MODE_ROUTES.includes(location.pathname);
  
  const effectiveTheme = isForcedLightMode ? 'light' : userTheme;

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setUserTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setUserTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (!isForcedLightMode) {
      localStorage.setItem('theme', userTheme);
    }
    
    if (effectiveTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [effectiveTheme, userTheme, isForcedLightMode]);

  const toggleTheme = () => {
    if (!isForcedLightMode) {
      setUserTheme(prev => prev === 'light' ? 'dark' : 'light');
    }
  };

  return (
    <ThemeContext.Provider value={{ 
      theme: effectiveTheme, 
      setTheme: (newTheme: Theme) => {
        if (!isForcedLightMode) {
          setUserTheme(newTheme);
        }
      }, 
      toggleTheme,
      isForcedLightMode
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
