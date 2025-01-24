import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const THEME_KEY = 'portfolio-theme';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY);
  // If there's a saved theme, use it
  if (savedTheme) {
    return savedTheme === 'dark';
  }
  // Otherwise, default to dark theme
  return true;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(getInitialTheme);

  // Memoize theme change handler
  const handleThemeChange = useCallback((dark) => {
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

    // Set initial dark theme class
    if (!localStorage.getItem(THEME_KEY)) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        setIsDark(true); // Default to dark theme even on system change
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [isDark, handleThemeChange]);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  // Memoize context value
  const contextValue = useMemo(() => ({
    isDark,
    toggleTheme
  }), [isDark, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
