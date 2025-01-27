import {lazy, memo, Suspense, useCallback, useEffect, useState, useRef} from "react";
import {AnimatePresence, motion, useReducedMotion} from 'framer-motion';
import Loading from '../components/Loading/Loading';
import Background from '../components/Background/Background';
import SEO from '../components/SEO/SEO';
import {OptimizedBlock} from '../components/OptimizedMillion';
import usePerformanceOptimizations from '../hooks/usePerformanceOptimizations';
import useOptimizedAnimation from '../hooks/useOptimizedAnimation';
import { useWindowSize, useMeasure } from 'react-use';

import PerformanceMonitor from '../components/PerformanceMonitor/PerformanceMonitor';

// Lazy load components with dynamic imports and prefetch
const Hero = lazy(() => {
    const component = import('../components/Hero/Hero');
    // Prefetch other components after Hero loads
    component.then(() => {
        import('../components/Skills/Skills');
        import('../components/Projects/Projects');
    });
    return component;
}, { priority: true });

const Skills = lazy(() => import('../components/Skills/Skills'));
const Projects = lazy(() => import('../components/Projects/Projects'));
const OpenSource = lazy(() => import('../components/OpenSource/OpenSource'));

// Enhanced scroll button with optimized animations
const ScrollToTopButton = memo(({isVisible, onClick, isLowEndDevice}) => {
    const prefersReducedMotion = useReducedMotion();
    const { ref, inView } = useOptimizedAnimation({
        threshold: 0.5,
        triggerOnce: false
    });
    
    const buttonVariants = {
        initial: { opacity: 0, scale: 0.8, y: 20 },
        animate: { 
            opacity: isVisible ? 1 : 0, 
            scale: isVisible ? 1 : 0.8,
            y: isVisible ? 0 : 20
        },
        exit: { opacity: 0, scale: 0.8, y: 20 },
        transition: {
            duration: prefersReducedMotion ? 0.1 : 0.2,
            ease: 'easeOut'
        }
    };

    return (
        <motion.button
            ref={ref}
            {...(isLowEndDevice ? {} : buttonVariants)}
            onClick={onClick}
            className="fixed bottom-8 right-8 p-4 bg-primary hover:bg-primary-light dark:bg-surface dark:hover:bg-primary rounded-full shadow-lg transition-colors z-50 touch-manipulation"
            style={{
                WebkitTapHighlightColor: 'transparent',
                willChange: 'transform',
                transform: isLowEndDevice && !inView ? 'scale(0)' : 'scale(1)',
                opacity: isLowEndDevice && !inView ? 0 : 1,
                backfaceVisibility: 'hidden'
            }}
        >
            <svg
                className="w-6 h-6 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
            >
                <path d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
        </motion.button>
    );
});

const LandingPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const scrolling = useRef(false);
    const [containerRef, { height: containerHeight }] = useMeasure();
    const { width: windowWidth } = useWindowSize();
    
    // Performance optimizations
    const { ref, metrics, isLowEndDevice } = usePerformanceOptimizations();
    
    // Optimized intersection observer for scroll button
    const { ref: heroRef, inView } = useOptimizedAnimation({
        threshold: 0,
        rootMargin: '-300px 0px 0px 0px',
        triggerOnce: false
    });

    useEffect(() => {
        setIsVisible(!inView);
    }, [inView]);

    const scrollToTop = useCallback(() => {
        if (scrolling.current) return;
        scrolling.current = true;

        const duration = isLowEndDevice ? 300 : 500;
        const start = window.pageYOffset;
        const startTime = performance.now();

        // Optimized easing function with reduced calculations
        const easeOutQuart = t => {
            const t2 = t - 1;
            return 1 - t2 * t2 * t2 * t2;
        };

        const animateScroll = currentTime => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            window.scrollTo(0, start * (1 - easeOutQuart(progress)));

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else {
                scrolling.current = false;
                // Reset will-change after animation
                document.body.style.willChange = 'auto';
            }
        };

        // Set will-change before animation
        document.body.style.willChange = 'scroll-position';
        requestAnimationFrame(animateScroll);
    }, [isLowEndDevice]);

    // Preload images based on viewport
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const preloadImages = () => {
            const images = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            if (img.dataset.src) {
                                const preloadLink = document.createElement('link');
                                preloadLink.rel = 'preload';
                                preloadLink.as = 'image';
                                preloadLink.href = img.dataset.src;
                                document.head.appendChild(preloadLink);

                                img.src = img.dataset.src;
                                img.removeAttribute('data-src');
                                imageObserver.unobserve(img);
                            }
                        }
                    });
                },
                { rootMargin: '50px 0px' }
            );

            images.forEach(img => imageObserver.observe(img));
            return () => images.forEach(img => imageObserver.unobserve(img));
        };

        return preloadImages();
    }, [containerHeight, windowWidth]);

    return (
        <>
            <SEO
                title="Amr Muhamed | Full Stack Developer Portfolio"
                description="Welcome to my portfolio! I'm Amr Muhamed, a Full Stack Developer specializing in Python, React, and modern web technologies. Explore my projects and expertise in web development."
                type="website"
                image="/home-og.png"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "url": "https://amrmuhamed.com",
                    "name": "Amr Muhamed - Full Stack Developer Portfolio",
                    "description": "Portfolio website of Amr Muhamed, showcasing expertise in full-stack development, projects, and professional experience.",
                    "author": {
                        "@type": "Person",
                        "name": "Amr Muhamed",
                        "jobTitle": "Full Stack Developer",
                        "url": "https://amrmuhamed.com",
                        "sameAs": [
                            "https://github.com/alaamer12",
                            "https://www.linkedin.com/in/al-aamer-0b0709265/"
                        ]
                    }
                }}
            />
            <div ref={containerRef} className="relative min-h-screen w-screen overflow-x-hidden">
                <Background />
                <div className="relative z-10 w-full pt-24 pb-16">
                    <Suspense fallback={<Loading />}>
                        <OptimizedBlock id="hero-section">
                            <div ref={heroRef}>
                                <Hero />
                            </div>
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
                    <AnimatePresence mode="wait">
                        {isVisible && (
                            <ScrollToTopButton 
                                isVisible={isVisible} 
                                onClick={scrollToTop}
                                isLowEndDevice={isLowEndDevice}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>
            {/* <PerformanceMonitor /> */}
        </>
    );
};

export default memo(LandingPage);
