import { useEffect } from 'react';
import Layout from './Layout';

interface LightModeLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

/**
 * Wrapper component that forces light mode for specific pages
 */
export function LightModeLayout({ children, showFooter = true }: LightModeLayoutProps) {
  useEffect(() => {
    // Force light mode
    document.documentElement.classList.remove('dark');
    
    // Cleanup: restore user's theme preference when leaving
    return () => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    };
  }, []);

  return <Layout showFooter={showFooter}>{children}</Layout>;
}
