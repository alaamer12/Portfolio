import {lazy, memo, Suspense, useCallback, useEffect, useState} from "react";
import {AnimatePresence, motion} from 'framer-motion';
import Loading from '../components/Loading/Loading';
import Background from '../components/Background/Background';
import SEO from '../components/SEO/SEO';
import {OptimizedBlock} from '../components/OptimizedMillion';

// Lazy load components
const Hero = lazy(() => import('../components/Hero/Hero'));
const Skills = lazy(() => import('../components/Skills/Skills'));
const Projects = lazy(() => import('../components/Projects/Projects'));
const OpenSource = lazy(() => import('../components/OpenSource/OpenSource'));

// Memoize scroll button for better performance
const ScrollToTopButton = memo(({isVisible, onClick}) => (
    <motion.button
        initial={{opacity: 0}}
        animate={{opacity: isVisible ? 1 : 0}}
        transition={{duration: 0.2}}
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
            <div className="relative min-h-screen w-screen overflow-x-hidden">
                <Background/>
                <div className="relative z-10 w-full pt-24 pb-16">
                    <Suspense fallback={<Loading/>}>
                        <OptimizedBlock id="hero-section">
                            <Hero/>
                        </OptimizedBlock>
                        <OptimizedBlock id="skills-section">
                            <Skills/>
                        </OptimizedBlock>
                        <OptimizedBlock id="projects-section">
                            <Projects/>
                        </OptimizedBlock>
                        <OptimizedBlock id="opensource-section">
                            <OpenSource/>
                        </OptimizedBlock>
                    </Suspense>
                    <AnimatePresence>
                        {isVisible && <ScrollToTopButton isVisible={isVisible} onClick={scrollToTop}/>}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
};

export default memo(LandingPage);
