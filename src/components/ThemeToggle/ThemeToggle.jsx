import React from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-3 rounded-full z-50
        bg-surface-light dark:bg-surface
        shadow-light-lg dark:shadow-dark-lg
        hover:shadow-light-xl dark:hover:shadow-dark-xl
        hover:bg-primary-light dark:hover:bg-primary
        transition-all duration-200"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {isDark ? (
        <FaSun className="w-6 h-6 text-accent" />
      ) : (
        <FaMoon className="w-6 h-6 text-primary" />
      )}
    </motion.button>
  );
};

export default ThemeToggle;
