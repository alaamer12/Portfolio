import {memo} from 'react'

import {motion} from 'framer-motion';
import {FaGithub, FaPython} from 'react-icons/fa';
import {OptimizedBlock} from '../OptimizedMillion';
import useOptimizedAnimation from '../../hooks/useOptimizedAnimation';

const packages = [
    {
        name: 'true-core',
        description: 'Core foundation for the true ecosystem of Python packages',
        pypi: 'https://pypi.org/project/true-core/',
        github: 'https://github.com/alaamer12',
    },
    {
        name: 'true-storage',
        description: 'Storage management solution in the true ecosystem',
        pypi: 'https://pypi.org/project/true-storage/',
        github: 'https://github.com/alaamer12',
    },
    {
        name: 'true-logging',
        description: 'Advanced logging solution in the true ecosystem',
        pypi: 'https://pypi.org/project/true-logging/',
        github: 'https://github.com/alaamer12',
    },
    {
        name: 'fastapi-utilities',
        description: 'Extended functionality for FastAPI framework',
        pypi: 'https://pypi.org/project/fastapi-utilities/',
        github: 'https://github.com/alaamer12',
    },
];

const PackageIcon = memo(({Icon, className}) => (
    <Icon className={`text-accent text-xl md:text-2xl mr-2 ${className}`}/>
));

const PackageTitle = memo(({name}) => (
    <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
));

const PackageDescription = memo(({description}) => (
    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4">{description}</p>
));

const PackageLink = memo(({href, Icon, settings}) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
        whileHover={settings.shouldAnimate ? {scale: settings.scale} : {}}
        whileTap={settings.shouldAnimate ? {scale: 0.95} : {}}
    >
        <Icon className="text-lg md:text-xl"/>
    </motion.a>
));

const PackageLinks = memo(({github, pypi, settings}) => (
    <div className="flex space-x-4">
        <PackageLink href={github} Icon={FaGithub} settings={settings}/>
        <PackageLink href={pypi} Icon={FaPython} settings={settings}/>
    </div>
));

const PackageCard = memo(({pkg, index}) => {
    const {settings, ref, inView} = useOptimizedAnimation({
        threshold: 0.1,
        triggerOnce: true
    });

    const cardAnimation = {
        initial: settings.shouldAnimate ? {
            opacity: 0,
            x: index % 2 === 0 ? -settings.distance : settings.distance
        } : {},
        animate: inView && settings.shouldAnimate ? {
            opacity: 1,
            x: 0
        } : {},
        transition: {
            duration: settings.duration,
            delay: index * (settings.isMobile ? 0.05 : 0.1),
            ease: settings.ease,
            useTransform: settings.useTransform
        }
    };

    return (
        <OptimizedBlock threshold={12}>
            <motion.div
                ref={ref}
                {...cardAnimation}
                className="bg-surface-light dark:bg-surface rounded-lg p-4 md:p-6 shadow-light-lg dark:shadow-dark-lg hover:shadow-light-xl dark:hover:shadow-dark-xl transition-all"
            >
                <div className="flex items-center mb-4">
                    <PackageIcon Icon={FaPython}/>
                    <PackageTitle name={pkg.name}/>
                </div>
                <PackageDescription description={pkg.description}/>
                <PackageLinks github={pkg.github} pypi={pkg.pypi} settings={settings}/>
            </motion.div>
        </OptimizedBlock>
    );
});

const OpenSource = () => {
    const {settings} = useOptimizedAnimation();

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
                className="space-y-12"
                initial={settings.shouldAnimate ? {opacity: 0} : {}}
                whileInView={settings.shouldAnimate ? {opacity: 1} : {}}
                viewport={{once: true}}
                transition={{
                    duration: settings.duration,
                    staggerChildren: settings.staggerChildren
                }}
            >
                <motion.h2
                    className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
                    initial={settings.shouldAnimate ? {opacity: 0, y: settings.distance} : {}}
                    whileInView={settings.shouldAnimate ? {opacity: 1, y: 0} : {}}
                    viewport={{once: true}}
                >
                    Open Source Contributions
                </motion.h2>

                <div className="grid gap-6 md:grid-cols-2">
                    {packages.map((pkg, index) => (
                        <PackageCard key={pkg.name} pkg={pkg} index={index}/>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default OpenSource;
