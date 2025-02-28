// noinspection JSValidateTypes

import {lazy, memo, Suspense, useState, useEffect, useMemo} from 'react';
import {motion, useReducedMotion} from 'framer-motion';
import {FaGithub, FaLinkedin} from 'react-icons/fa';
import {OptimizedBlock} from '../OptimizedMillion';
import {useDeviceDetect} from '../../hooks/useDeviceDetect';

// Lazy load ShimmerEffect
const ShimmerEffect = lazy(() => import('./ShimmerEffect'));

// Preload hero image
const heroImage = new URL('/images/hero.avif', import.meta.url).href;
if (typeof window !== 'undefined') {
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = heroImage;
    document.head.appendChild(preloadLink);
}

// Memoized StatBox component with optimized animations
const AnimatedContainer = memo(({children, animation}) => (
    <motion.div {...animation} className="text-center group">
        {children}
    </motion.div>
));

const StatNumber = memo(({number, color, hoverColor}) => (
    <div className={`text-3xl sm:text-3xl md:text-4xl font-bold transition-colors ${color} group-hover:${hoverColor}`}>
        {number}
    </div>
));

const StatText = memo(({text, hoverColor}) => (
    <div className={`text-sm sm:text-sm text-gray-700 dark:text-gray-300 transition-colors group-hover:${hoverColor}`}>
        {text}
    </div>
));

const useStatAnimation = (prefersReducedMotion, isMobile, delay) => {
    if (prefersReducedMotion) return false;

    return {
        initial: isMobile ? { opacity: 0 } : { opacity: 0, scale: 0.5 },
        animate: isMobile ? { opacity: 1 } : { opacity: 1, scale: 1 },
        transition: { duration: isMobile ? 0.2 : 0.3, delay },
        ...(isMobile ? {} : {
            whileHover: { scale: 1.1 },
            whileTap: { scale: 0.95 }
        })
    };
};

const StatBox = memo(({number, text, delay, color, hoverColor}) => {
    const prefersReducedMotion = useReducedMotion();
    const isMobile = useDeviceDetect();
    const animation = useStatAnimation(prefersReducedMotion, isMobile, delay);

    return (
        <AnimatedContainer animation={animation}>
            <StatNumber number={number} color={color} hoverColor={hoverColor} />
            <StatText text={text} hoverColor={hoverColor} />
        </AnimatedContainer>
    );
});

StatBox.displayName = 'StatBox';

// Memoized social link component with conditional animations
const SocialLink = memo(({href, icon: Icon}) => {
    const prefersReducedMotion = useReducedMotion();
    const isMobile = useDeviceDetect();

    const animation = prefersReducedMotion ? false : {
        whileHover: isMobile ? undefined : {scale: 1.1},
        whileTap: isMobile ? undefined : {scale: 0.9}
    };

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
            {...animation}
        >
            <Icon/>
        </motion.a>
    );
});

SocialLink.displayName = 'SocialLink';

// Optimize hero image loading
const useHeroImage = () => {
    const [imageLoaded, setImageLoaded] = useState(false);
    
    useEffect(() => {
        const img = new Image();
        img.src = heroImage;
        img.onload = () => setImageLoaded(true);
    }, []);
    
    return imageLoaded;
};

// Optimize stats rendering
const useOptimizedStats = (isMobile) => {
    return useMemo(() => [
        {
            number: "150+",
            text: "GitHub Repositories",
            delay: isMobile ? 0.1 : 0.2,
            color: "text-gray-800 dark:text-white",
            hoverColor: "text-primary dark:text-primary-light"
        },
        {
            number: "86%",
            text: "Python Projects",
            delay: isMobile ? 0.15 : 0.3,
            color: "text-gray-800 dark:text-white",
            hoverColor: "text-strawberry dark:text-strawberry-light"
        },
        {
            number: "10+",
            text: "PyPI Packages",
            delay: isMobile ? 0.2 : 0.4,
            color: "text-gray-800 dark:text-white",
            hoverColor: "text-cherry-pie dark:text-cherry-pie-light"
        }
    ], [isMobile]); // Only recompute when device type changes
};

const HeroText = memo(({ textAnimation }) => {
    const imageLoaded = useHeroImage();
    
    return (
        <motion.div 
            {...textAnimation} 
            className={`space-y-8 text-center lg:text-left transition-opacity duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <h1 className="lg:text-7xl md:text-7xl font-bold relative">
                <span className="inline-block bg-gradient-to-r from-primary via-strawberry to-cherry-pie dark:from-primary-light dark:via-strawberry-light dark:to-cherry-pie-light bg-clip-text text-transparent">
                    Amr{' '}
                    <span className="inline-block bg-gradient-to-r from-cherry-pie via-accent to-strawberry dark:from-cherry-pie-light dark:via-accent-light dark:to-strawberry-light bg-clip-text text-transparent">
                        Muhamed
                    </span>
                </span>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 dark:text-gray-300 font-light">
                Python and Backend Expert
            </h2>
        </motion.div>
    );
});

const StatsSection = memo(({ stats }) => (
    <div className="flex justify-center lg:justify-start space-x-8 sm:space-x-12 md:space-x-16 cursor-default">
        {stats.map((stat) => (
            <OptimizedBlock key={stat.text} enableCache={true} threshold={20} className="mr-5 sm:mr-5 md:mr-5 z-20">
                <StatBox {...stat} />
            </OptimizedBlock>
        ))}
    </div>
));

const SocialLinks = memo(() => (
    <div className="flex justify-center lg:justify-start space-x-4">
        <SocialLink href="https://github.com/alaamer12" icon={FaGithub}/>
        <SocialLink href="https://www.linkedin.com/in/al-aamer-0b0709265/" icon={FaLinkedin}/>
    </div>
));

const HeroImage = memo(({ imageAnimation, isMobile }) => (
    <motion.div {...imageAnimation} className="relative mt-8 lg:mt-0">
        <div className="absolute inset-0 bg-gradient-to-r from-strawberry/20 to-cherry-pie/20 dark:from-strawberry-dark/20 dark:to-cherry-pie-dark/20 rounded-3xl filter blur-xl opacity-50"/>
        <div className="relative group cursor-pointer transition-all duration-300 hover:shadow-2xl" onClick={() => window.location.href = '/about'}>
            <div className="relative w-3/4 sm:w-2/3 md:w-1/2 lg:w-full mx-auto overflow-hidden rounded-3xl">
                <img
                    src={heroImage}
                    alt="Amr Muhamed"
                    className="w-full h-auto rounded-3xl shadow-xl transform transition-transform duration-300 group-hover:scale-105"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                />
                {!isMobile && (
                    <Suspense fallback={null}>
                        <ShimmerEffect/>
                    </Suspense>
                )}
            </div>
        </div>
    </motion.div>
));

const Hero = memo(() => {
    const prefersReducedMotion = useReducedMotion();
    const isMobile = useDeviceDetect();

    return (
        <HeroSection>
            <HeroContent>
                <LeftColumn>
                    <HeroText textAnimation={useTextAnimation(prefersReducedMotion, isMobile)} />
                    <StatsSection stats={useOptimizedStats(isMobile)} />
                    <SocialLinks />
                </LeftColumn>
                <RightColumn>
                    <HeroImage 
                        imageAnimation={useImageAnimation(prefersReducedMotion, isMobile)} 
                        isMobile={isMobile} 
                    />
                </RightColumn>
            </HeroContent>
        </HeroSection>
    );
});

const HeroSection = ({children}) => (
    <section className="w-full min-h-screen flex items-center justify-center py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    </section>
);

const HeroContent = ({children}) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {children}
    </div>
);

const LeftColumn = ({children}) => (
    <div className="space-y-8">
        {children}
    </div>
);

const RightColumn = ({children}) => children;

const useTextAnimation = (prefersReducedMotion, isMobile) => 
    prefersReducedMotion ? false : {
        initial: isMobile ? {opacity: 0} : {opacity: 0, y: 20},
        animate: isMobile ? {opacity: 1} : {opacity: 1, y: 0},
        transition: {duration: isMobile ? 0.2 : 0.5}
    };

const useImageAnimation = (prefersReducedMotion, isMobile) => 
    prefersReducedMotion ? false : {
        initial: isMobile ? {opacity: 0} : {opacity: 0, scale: 0.8},
        animate: isMobile ? {opacity: 1} : {opacity: 1, scale: 1},
        transition: {duration: isMobile ? 0.2 : 0.5}
    };

Hero.displayName = 'Hero';

export default Hero;
