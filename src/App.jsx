import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero/Hero';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import OpenSource from './components/OpenSource/OpenSource';
import Loading from './components/Loading/Loading';
import Background from './components/Background/Background';
import CustomCursor from './components/CustomCursor/CustomCursor';
import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Show scroll-to-top button when scrolling down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <ThemeProvider>
      <div className="relative min-h-screen w-screen overflow-x-hidden cursor-none">
        <CustomCursor />
        <Background />
        <div className="relative z-10 w-full">
          <AnimatePresence mode='wait'>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <div className="w-full mx-auto">
                  {/* <div className="fixed top-4 right-4 z-50">
                    <ThemeToggle />
                  </div> */}
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Hero />
                    <Skills />
                    <Projects />
                    <OpenSource />
                  </div>
                </div>
                
                {/* Scroll to top button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVisible ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={scrollToTop}
                  className={`fixed bottom-8 right-8 p-4 bg-primary hover:bg-primary-light dark:bg-surface dark:hover:bg-primary rounded-full shadow-lg transition-colors z-50 ${
                    isVisible ? 'block' : 'hidden'
                  }`}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                  </svg>
                </motion.button>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
