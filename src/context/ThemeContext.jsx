import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';

const THEME_KEY = 'portfolio-theme';

const defaultContextValue = {
  isDark: true,
  toggleTheme: () => {},
};

export const ThemeContext = createContext(defaultContextValue);

/**
 * Returns the initial theme value from local storage.
 * If no value is found, defaults to dark theme.
 */
const getInitialTheme = () => {
  if (typeof window === 'undefined') return true;
  const savedTheme = localStorage.getItem(THEME_KEY);
  return savedTheme ? savedTheme === 'dark' : true;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(getInitialTheme);

  // Memoize theme change handler
  const handleThemeChange = useCallback((dark) => {
    if (typeof window === 'undefined') return;
    
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(THEME_KEY, 'light');
    }
  }, []);

  // Apply theme changes
  useEffect(() => {
    handleThemeChange(isDark);

    // Set initial dark theme class if not set
    if (!localStorage.getItem(THEME_KEY)) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (!localStorage.getItem(THEME_KEY)) {
        setIsDark(true);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [isDark, handleThemeChange]);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  // Memoize context value
  const value = useMemo(() => ({
    isDark,
    toggleTheme
  }), [isDark, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
