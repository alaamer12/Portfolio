import {  useState, useEffect, lazy, Suspense, useCallback, memo  } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '../components/Loading/Loading';
import Background from '../components/Background/Background';
import SEO from '../components/SEO/SEO';
import { OptimizedBlock } from '../components/OptimizedMillion';

// Lazy load components
const Hero = lazy(() => import('../components/Hero/Hero'));
const Skills = lazy(() => import('../components/Skills/Skills'));
const Projects = lazy(() => import('../components/Projects/Projects'));
const OpenSource = lazy(() => import('../components/OpenSource/OpenSource'));

// Memoize scroll button for better performance
const ScrollToTopButton = memo(({ isVisible, onClick }) => (
  <motion.button
    initial={{ opacity: 0 }}
    animate={{ opacity: isVisible ? 1 : 0 }}
    transition={{ duration: 0.2 }}
    onClick={onClick}
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
));

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const toggleVisibility = useCallback(() => {
    const shouldBeVisible = window.pageYOffset > 300;
    if (shouldBeVisible !== isVisible) {
      setIsVisible(shouldBeVisible);
    }
  }, [isVisible]);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [toggleVisibility]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <SEO
        title="Home"
        description="Welcome to my portfolio! I'm Amr Muhamed, a Full Stack Developer specializing in creating modern web applications with React and Django. Explore my work and experience."
        type="website"
        image="/home-og.png"
      />
      <div className="relative min-h-screen w-screen overflow-x-hidden">
        <Background />
        <div className="relative z-10 w-full pt-24 pb-16">
          <AnimatePresence mode='wait'>
            <Suspense fallback={<Loading />}>
              <OptimizedBlock id="hero-section">
                <Hero />
              </OptimizedBlock>
              <OptimizedBlock id="skills-section">
                <Skills />
              </OptimizedBlock>
              <OptimizedBlock id="projects-section">
                <Projects />
              </OptimizedBlock>
              <OptimizedBlock id="opensource-section">
                <OpenSource />
              </OptimizedBlock>
            </Suspense>
            <ScrollToTopButton isVisible={isVisible} onClick={scrollToTop} />
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default memo(LandingPage);
