import {  useState  } from "react";
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
        isActive
          ? 'text-primary dark:text-primary-light'
          : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light'
      }`}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="navbar-indicator"
          className="absolute inset-0 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-sm shadow-lg -z-10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  );
};
const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Glass Background */}
      <div className="absolute inset-0 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border-b border-white/10 dark:border-gray-800/50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl font-bold bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent hover:opacity-80 transition-all duration-300"
          >
            Amr Muhamed
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/about">About</NavLink>
            <motion.button
              onClick={toggleTheme}
              className="ml-4 p-2 rounded-full
                bg-white/10 dark:bg-gray-800/50
                hover:bg-primary/10 dark:hover:bg-primary/20
                backdrop-blur-sm
                transition-all duration-300
                shadow-lg shadow-black/5 dark:shadow-white/5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDark ? (
                <FaSun className="w-5 h-5 text-primary-light" />
              ) : (
                <FaMoon className="w-5 h-5 text-primary" />
              )}
            </motion.button>
          </div>
          {/* Mobile Menu Button */}
          <motion.button
            onClick={toggleMenu}
            className="p-2 rounded-full md:hidden
              bg-white/10 dark:bg-gray-800/50
              hover:bg-primary/10 dark:hover:bg-primary/20
              backdrop-blur-sm
              transition-all duration-300
              shadow-lg shadow-black/5 dark:shadow-white/5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? (
              <FaTimes className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <FaBars className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            )}
          </motion.button>
        </div>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="relative md:hidden"
          >
            {/* Glass Background for Mobile Menu */}
            <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-white/10 dark:border-gray-800/50" />
            <div className="relative px-4 py-4 space-y-3">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/projects">Projects</NavLink>
              <NavLink to="/about">About</NavLink>
              <motion.button
                onClick={toggleTheme}
                className="w-full mt-4 p-2 rounded-full
                  bg-white/10 dark:bg-gray-800/50
                  hover:bg-primary/10 dark:hover:bg-primary/20
                  backdrop-blur-sm
                  transition-all duration-300
                  shadow-lg shadow-black/5 dark:shadow-white/5
                  flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isDark ? (
                  <>
                    <FaSun className="w-5 h-5 text-primary-light mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">Light Mode</span>
                  </>
                ) : (
                  <>
                    <FaMoon className="w-5 h-5 text-primary mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">Dark Mode</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
export default Navbar;
