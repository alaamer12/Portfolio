import {lazy, memo, Suspense, useCallback, useEffect, useRef, useState, useLayoutEffect, useMemo} from "react";
import {motion, useReducedMotion} from 'framer-motion';
import Loading from '../components/Loading/Loading';
import Background from '../components/Background/Background';
import SEO from '../components/SEO/SEO';
import {OptimizedBlock} from '../components/OptimizedMillion';
import useOptimizedAnimation from '../hooks/useOptimizedAnimation';
import useScrollButtonAnimation from "../hooks/useScrollButtonAnimation.js";


// Lazy load components with dynamic imports and prefetch
const Hero = lazy(() => {
    const component = import('../components/Hero/Hero');
    component.then(() => {
        import('../components/Skills/Skills');
        import('../components/Projects/Projects');
    });
    return component;
});

const Skills = lazy(() => import('../components/Skills/Skills'));
const Projects = lazy(() => import('../components/Projects/Projects'));
const OpenSource = lazy(() => import('../components/OpenSource/OpenSource'));

// Scroll button icon component
const ScrollButtonIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18"/>
    </svg>
);


// Enhanced scroll button with optimized animations
const ScrollToTopButton = memo(({isVisible, onClick}) => {
    const {ref} = useOptimizedAnimation({threshold: 0.5, triggerOnce: false});
    const animationProps = useScrollButtonAnimation(isVisible);

    // noinspection JSValidateTypes
    return (
        <motion.button
            ref={ref}
            onClick={onClick}
            className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary dark:bg-primary-light text-white shadow-lg hover:shadow-xl transition-shadow"
            {...animationProps}
        >
            <ScrollButtonIcon/>
        </motion.button>
    );
});

ScrollToTopButton.displayName = 'ScrollToTopButton';

const LandingPageSEO = () => (
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
);

const HeroSection = memo(() => {
    const {ref,} = useOptimizedAnimation({
        threshold: 0,
        rootMargin: '-300px 0px 0px 0px',
        triggerOnce: false
    });

    return (
        <OptimizedBlock id="hero-section" threshold={8}>
            <div ref={ref}>
                <Hero/>
            </div>
        </OptimizedBlock>
    );
});

const ContentSections = memo(() => {
    const {ref, inView} = useOptimizedAnimation({
        threshold: 0.1,
        triggerOnce: false,
        rootMargin: '100px'
    });

    const sectionStyles = useMemo(() => ({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
    }), [inView]);

    return (
        <motion.div ref={ref} style={sectionStyles}>
            <OptimizedBlock id="skills-section" threshold={8}>
                <Skills/>
            </OptimizedBlock>
            <OptimizedBlock id="projects-section" threshold={8}>
                <Projects/>
            </OptimizedBlock>
            <OptimizedBlock id="opensource-section" threshold={8}>
                <OpenSource/>
            </OptimizedBlock>
        </motion.div>
    );
});

const LandingPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const loadingTimerRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();
    const [imagesLoaded, setImagesLoaded] = useState(false);
    
    useLayoutEffect(() => {
        if (prefersReducedMotion) {
            setIsLoading(false);
            return;
        }
        
        loadingTimerRef.current = setTimeout(() => {
            if (imagesLoaded) {
                setIsLoading(false);
            }
        }, 200);
        
        return () => {
            if (loadingTimerRef.current) {
                clearTimeout(loadingTimerRef.current);
            }
        };
    }, [prefersReducedMotion, imagesLoaded]);

    // Preload critical resources
    useEffect(() => {
        const preloadResources = async () => {
            try {
                const imagesToPreload = ['/images/home-og.png'];
                await Promise.all(
                    imagesToPreload.map(src => {
                        return new Promise((resolve) => {
                            const img = new Image();
                            img.src = src;
                            img.onload = () => resolve();
                            img.onerror = () => {
                                console.warn(`Failed to load image: ${src}`);
                                resolve(); // Resolve anyway to not block loading
                            };
                        });
                    })
                );
                setImagesLoaded(true);
            } catch (error) {
                console.error('Error preloading resources:', error);
                setImagesLoaded(true); // Set loaded anyway to not block the UI
            }
        };
        
        if (!prefersReducedMotion) {
            preloadResources();
        } else {
            setImagesLoaded(true);
        }
    }, [prefersReducedMotion]);

    return (
        <>
            <LandingPageSEO/>
            <Background/>
            <div className="relative z-10 w-full pt-24 pb-16">
                <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center">
                        <Loading/>
                    </div>
                }>
                    {isLoading ? (
                        <div className="min-h-screen flex items-center justify-center">
                            <Loading/>
                        </div>
                    ) : (
                        <>
                            <HeroSection/>
                            <ContentSections/>
                        </>
                    )}
                </Suspense>
            </div>
        </>
    );
};

export default memo(LandingPage);
