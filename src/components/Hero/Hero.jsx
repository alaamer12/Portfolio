// noinspection JSValidateTypes

import { memo, useState, useEffect, useMemo, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedin, FaDownload, FaSpinner } from "react-icons/fa";
import { OptimizedBlock } from "../OptimizedMillion";
import { useDeviceDetect } from "../../hooks/useDeviceDetect";
import { USER_CONFIG, getDisplayedSocialLinks } from "../../data/user";



// Preload hero image
const heroImage = new URL(USER_CONFIG.personal.profileImage, import.meta.url).href;
if (typeof window !== "undefined") {
    const preloadLink = document.createElement("link");
    preloadLink.rel = "preload";
    preloadLink.as = "image";
    preloadLink.href = heroImage;
    document.head.appendChild(preloadLink);
}

// Memoized StatBox component with optimized animations
const AnimatedContainer = memo(({ children, animation }) => (
    <motion.div {...animation} className="text-center group">
        {children}
    </motion.div>
));

const StatNumber = memo(({ number, color, hoverColor }) => (
    <div
        className={`text-3xl sm:text-3xl md:text-4xl font-bold transition-colors ${color} group-hover:${hoverColor}`}
    >
        {number}
    </div>
));

const StatText = memo(({ text, hoverColor }) => (
    <div
        className={`text-sm sm:text-sm text-gray-700 dark:text-gray-300 transition-colors group-hover:${hoverColor}`}
    >
        {text}
    </div>
));

const useStatAnimation = (prefersReducedMotion, isMobile, delay) => {
    if (prefersReducedMotion) return false;

    return {
        initial: isMobile ? { opacity: 0 } : { opacity: 0, scale: 0.5 },
        animate: isMobile ? { opacity: 1 } : { opacity: 1, scale: 1 },
        transition: { duration: isMobile ? 0.2 : 0.3, delay },
        ...(isMobile
            ? {}
            : {
                  whileHover: { scale: 1.1 },
                  whileTap: { scale: 0.95 },
              }),
    };
};

const StatBox = memo(({ number, text, delay, color, hoverColor }) => {
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

StatBox.displayName = "StatBox";

// Memoized social link component with conditional animations
const SocialLink = memo(({ href, icon: Icon }) => {
    const prefersReducedMotion = useReducedMotion();
    const isMobile = useDeviceDetect();

    const animation = prefersReducedMotion
        ? false
        : {
              whileHover: isMobile ? undefined : { scale: 1.1 },
              whileTap: isMobile ? undefined : { scale: 0.9 },
          };

    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
            {...animation}
        >
            <Icon />
        </motion.a>
    );
});

SocialLink.displayName = "SocialLink";

// Resume Download Button Component
const ResumeDownloadButton = memo(() => {
    const [isLoading, setIsLoading] = useState(false);
    const prefersReducedMotion = useReducedMotion();
    
    const handleClick = useCallback(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);
    
    const animation = prefersReducedMotion ? false : {
        whileHover: { scale: 1.02, y: -2 },
        whileTap: { scale: 0.98 }
    };
    
    return (
        <motion.a
            href={USER_CONFIG.professional.resumeUrl}
            download="resume.pdf"
            onClick={handleClick}
            className="inline-flex items-center px-5 py-2.5 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 text-gray-800 dark:text-white rounded-full text-base font-medium hover:bg-white/20 dark:hover:bg-white/10 hover:border-white/30 dark:hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
            aria-label="Download Resume"
            style={{ textDecoration: "none" }}
            {...animation}
        >
            {isLoading ? (
                <FaSpinner className="mr-2 w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
                <FaDownload className="mr-2 w-4 h-4" aria-hidden="true" />
            )}
            {isLoading ? "Loading..." : "Download CV"}
        </motion.a>
    );
});

ResumeDownloadButton.displayName = "ResumeDownloadButton";

// Scroll to section function
const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
};

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
    return useMemo(
        () => [
            {
                number: USER_CONFIG.stats.githubRepos.count,
                text: USER_CONFIG.stats.githubRepos.label,
                delay: isMobile ? 0.1 : 0.2,
                color: USER_CONFIG.stats.githubRepos.color,
                hoverColor: USER_CONFIG.stats.githubRepos.hoverColor,
            },
            {
                number: USER_CONFIG.stats.pythonProjects.count,
                text: USER_CONFIG.stats.pythonProjects.label,
                delay: isMobile ? 0.15 : 0.3,
                color: USER_CONFIG.stats.pythonProjects.color,
                hoverColor: USER_CONFIG.stats.pythonProjects.hoverColor,
            },
            {
                number: USER_CONFIG.stats.pypiPackages.count,
                text: USER_CONFIG.stats.pypiPackages.label,
                delay: isMobile ? 0.2 : 0.4,
                color: USER_CONFIG.stats.pypiPackages.color,
                hoverColor: USER_CONFIG.stats.pypiPackages.hoverColor,
            },
        ],
        [isMobile],
    ); // Only recompute when device type changes
};

const HeroText = memo(({ textAnimation }) => {
    const imageLoaded = useHeroImage();

    return (
        <motion.div
            {...textAnimation}
            className={`space-y-8 text-center lg:text-left transition-opacity duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
            }`}
        >
            <h1 className="lg:text-7xl md:text-7xl font-bold relative">
                <span className="inline-block bg-gradient-to-r from-primary to-primary-light dark:from-primary-light dark:to-primary bg-clip-text text-transparent">
                    {USER_CONFIG.personal.firstName}{" "}
                    <span className="inline-block bg-gradient-to-r from-accent to-strawberry dark:from-accent-light dark:to-strawberry-light bg-clip-text text-transparent">
                        {USER_CONFIG.personal.lastName}
                    </span>
                </span>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 dark:text-gray-300 font-light">
                {USER_CONFIG.personal.jobTitle}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto lg:mx-0">
                Building scalable data pipelines and ML solutions with cutting-edge technologies
            </p>
        </motion.div>
    );
});

const StatsSection = memo(({ stats }) => (
    <div className="flex justify-center lg:justify-start space-x-8 sm:space-x-12 md:space-x-16 cursor-default">
        {stats.map((stat) => (
            <OptimizedBlock
                key={stat.text}
                enableCache={true}
                threshold={20}
                className="mr-5 sm:mr-5 md:mr-5 z-20"
            >
                <StatBox {...stat} />
            </OptimizedBlock>
        ))}
    </div>
));



const HeroImage = memo(({ imageAnimation }) => (
    <motion.div {...imageAnimation} className="relative mt-8 lg:mt-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary-light/10 filter blur-xl opacity-50" />
        <div
            className="relative group cursor-pointer transition-all duration-300 hover:shadow-2xl"
            onClick={() => scrollToSection('about')}
        >
            <div className="relative w-3/4 sm:w-2/3 md:w-1/2 lg:w-full mx-auto">
                <div className="relative aspect-square overflow-hidden rounded-3xl">
                    <img
                        src={heroImage}
                        alt={USER_CONFIG.personal.profileImageAlt}
                        className="absolute inset-0 w-full h-full object-cover object-top transform transition-transform duration-300 group-hover:scale-105 shadow-xl"
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                    />
                </div>
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
                    <HeroText
                        textAnimation={useTextAnimation(
                            prefersReducedMotion,
                            isMobile,
                        )}
                    />
                    <StatsSection stats={useOptimizedStats(isMobile)} />
                    <ActionButtonsAndSocial />
                </LeftColumn>
                <RightColumn>
                    <HeroImage
                        imageAnimation={useImageAnimation(
                            prefersReducedMotion,
                            isMobile,
                        )}
                    />
                </RightColumn>
            </HeroContent>
        </HeroSection>
    );
});

const HeroSection = ({ children }) => (
    <section className="w-full min-h-screen flex items-center justify-center py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    </section>
);

const HeroContent = ({ children }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {children}
    </div>
);

const LeftColumn = ({ children }) => (
    <div className="space-y-6">{children}</div>
);

const ActionButtonsAndSocial = memo(() => {
    const socialLinks = getDisplayedSocialLinks();
    
    const getIconForPlatform = (platform) => {
        switch (platform) {
            case 'github':
                return FaGithub;
            case 'linkedin':
                return FaLinkedin;
            default:
                return FaGithub;
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center lg:items-start">
            <ResumeDownloadButton />
            <div className="flex space-x-4">
                {socialLinks.map(({ platform, url }) => (
                    <SocialLink 
                        key={platform}
                        href={url} 
                        icon={getIconForPlatform(platform)} 
                    />
                ))}
            </div>
        </div>
    );
});

ActionButtonsAndSocial.displayName = "ActionButtonsAndSocial";

const RightColumn = ({ children }) => children;

const useTextAnimation = (prefersReducedMotion, isMobile) =>
    prefersReducedMotion
        ? false
        : {
              initial: isMobile ? { opacity: 0 } : { opacity: 0, y: 20 },
              animate: isMobile ? { opacity: 1 } : { opacity: 1, y: 0 },
              transition: { duration: isMobile ? 0.2 : 0.5 },
          };

const useImageAnimation = (prefersReducedMotion, isMobile) =>
    prefersReducedMotion
        ? false
        : {
              initial: isMobile ? { opacity: 0 } : { opacity: 0, scale: 0.8 },
              animate: isMobile ? { opacity: 1 } : { opacity: 1, scale: 1 },
              transition: { duration: isMobile ? 0.2 : 0.5 },
          };

Hero.displayName = "Hero";

export default Hero;
