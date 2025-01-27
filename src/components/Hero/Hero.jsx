import {memo, lazy, Suspense} from 'react';
import {motion, useReducedMotion} from 'framer-motion';
import {FaGithub, FaLinkedin} from 'react-icons/fa';
import {OptimizedBlock} from '../OptimizedMillion';

// Lazy load ShimmerEffect
const ShimmerEffect = lazy(() => import('./ShimmerEffect'));

// Preload hero image
const heroImage = new URL('/images/hero.png', import.meta.url).href;
if (typeof window !== 'undefined') {
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = heroImage;
    document.head.appendChild(preloadLink);
}

// Memoized StatBox component
const StatBox = memo(({number, text, delay, color, hoverColor}) => {
    const prefersReducedMotion = useReducedMotion();
    
    return (
        <motion.div
            initial={prefersReducedMotion ? false : {opacity: 0, scale: 0.5}}
            animate={prefersReducedMotion ? false : {opacity: 1, scale: 1}}
            transition={{duration: 0.3, delay}}
            className="text-center group"
            whileHover={prefersReducedMotion ? false : {scale: 1.1}}
            whileTap={prefersReducedMotion ? false : {scale: 0.95}}
        >
            <div
                className={`text-4xl font-bold transition-colors ${color} group-hover:${hoverColor}`}
            >
                {number}
            </div>
            <div
                className={`text-sm text-gray-700 dark:text-gray-300 transition-colors group-hover:${hoverColor}`}
            >
                {text}
            </div>
        </motion.div>
    );
});

StatBox.displayName = 'StatBox';

// Memoized social link component
const SocialLink = memo(({href, icon: Icon}) => {
    const prefersReducedMotion = useReducedMotion();
    
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
            whileHover={prefersReducedMotion ? false : {scale: 1.1}}
            whileTap={prefersReducedMotion ? false : {scale: 0.9}}
        >
            <Icon />
        </motion.a>
    );
});

SocialLink.displayName = 'SocialLink';

// Main Hero component
const Hero = memo(() => {
    const prefersReducedMotion = useReducedMotion();
    
    const stats = [
        {
            number: "150+",
            text: "GitHub Repositories",
            delay: 0.1,
            color: "text-gray-800 dark:text-white",
            hoverColor: "text-primary dark:text-primary-light"
        },
        {
            number: "86%",
            text: "Python Projects",
            delay: 0.15,
            color: "text-gray-800 dark:text-white",
            hoverColor: "text-strawberry dark:text-strawberry-light"
        },
        {
            number: "10+",
            text: "PyPI Packages",
            delay: 0.2,
            color: "text-gray-800 dark:text-white",
            hoverColor: "text-cherry-pie dark:text-cherry-pie-light"
        }
    ];

    return (
        <section className="w-full min-h-screen flex items-center justify-center py-20">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Text content */}
                    <motion.div
                        initial={prefersReducedMotion ? false : {opacity: 0, y: 20}}
                        animate={prefersReducedMotion ? false : {opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                        className="space-y-8 text-center lg:text-left"
                    >
                        <h1 className="text-6xl md:text-7xl font-bold relative">
                            <span className="inline-block bg-gradient-to-r from-primary via-strawberry to-cherry-pie dark:from-primary-light dark:via-strawberry-light dark:to-cherry-pie-light bg-clip-text text-transparent">
                                Amr{' '}
                                <span className="inline-block bg-gradient-to-r from-cherry-pie via-accent to-strawberry dark:from-cherry-pie-light dark:via-accent-light dark:to-strawberry-light bg-clip-text text-transparent">
                                    Muhamed
                                </span>
                            </span>
                        </h1>
                        <h2 className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 font-light">
                            Python and Backend Expert
                        </h2>

                        <div className="flex justify-center lg:justify-start space-x-16 cursor-default">
                            {stats.map((stat) => (
                                <OptimizedBlock key={stat.text} enableCache={true} threshold={20} className="mr-5 z-20">
                                    <StatBox {...stat} />
                                </OptimizedBlock>
                            ))}
                        </div>

                        <div className="flex justify-center lg:justify-start space-x-4">
                            <SocialLink href="https://github.com/alaamer12" icon={FaGithub} />
                            <SocialLink href="https://www.linkedin.com/in/al-aamer-0b0709265/" icon={FaLinkedin} />
                        </div>
                    </motion.div>

                    {/* Right side - Hero Image */}
                    <motion.div
                        initial={prefersReducedMotion ? false : {opacity: 0, scale: 0.8}}
                        animate={prefersReducedMotion ? false : {opacity: 1, scale: 1}}
                        transition={{duration: 0.5}}
                        className="relative mt-8 lg:mt-0"
                    >
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-strawberry/20 to-cherry-pie/20 dark:from-strawberry-dark/20 dark:to-cherry-pie-dark/20 rounded-3xl filter blur-xl opacity-50"
                        />
                        <div
                            className="relative group cursor-pointer"
                            onClick={() => window.location.href = '/about'}
                        >
                            <div className="relative w-3/4 sm:w-2/3 md:w-1/2 lg:w-full mx-auto overflow-hidden rounded-3xl">
                                <img
                                    src={heroImage}
                                    alt="Amr Muhamed"
                                    className="w-full h-auto rounded-3xl shadow-xl"
                                    loading="eager"
                                    decoding="async"
                                    fetchpriority="high"
                                />
                                <Suspense fallback={null}>
                                    <ShimmerEffect />
                                </Suspense>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
});

Hero.displayName = 'Hero';

export default Hero;
