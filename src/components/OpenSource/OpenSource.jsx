
import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaPython } from 'react-icons/fa';
import { OptimizedBlock } from '../OptimizedMillion';
import useOptimizedAnimation from '../../hooks/useOptimizedAnimation';
import { getProjectsByCategory, PROJECT_CATEGORIES } from '../../data/projects';

const PackageIcon = memo(({ Icon, className }) => (
    <Icon className={`text-accent text-xl md:text-2xl mr-2 ${className}`} />
));

const PackageTitle = memo(({ name }) => (
    <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
));

const PackageDescription = memo(({ description }) => (
    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4">{description}</p>
));

const PackageLink = memo(({ href, Icon, settings }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
        whileHover={settings.shouldAnimate ? { scale: settings.scale } : {}}
        whileTap={settings.shouldAnimate ? { scale: 0.95 } : {}}
    >
        <Icon className="text-lg md:text-xl" />
    </motion.a>
));

const PackageLinks = memo(({ github, pypi, settings }) => (
    <div className="flex space-x-4">
        {github && <PackageLink href={github} Icon={FaGithub} settings={settings} />}
        {pypi && <PackageLink href={pypi} Icon={FaPython} settings={settings} />}
    </div>
));

const PackageCard = memo(({ project, settings }) => (
    <motion.div
        className="bg-white dark:bg-surface p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
        initial={settings.shouldAnimate ? { opacity: 0, y: settings.distance } : {}}
        whileInView={settings.shouldAnimate ? { opacity: 1, y: 0 } : {}}
        viewport={{ once: true }}
        transition={{
            duration: settings.duration,
            ease: settings.ease,
            useTransform: settings.useTransform
        }}
    >
        <div className="flex items-start">
            <PackageIcon Icon={FaPython} className="text-accent" />
            <div className="flex-1">
                <PackageTitle name={project.title} />
                <PackageDescription description={project.description} />
                <PackageLinks 
                    github={project.links.github} 
                    pypi={project.links.pypi} 
                    settings={settings} 
                />
            </div>
        </div>
    </motion.div>
));

const OpenSourceHeader = memo(({ settings }) => (
    <motion.div
        className="text-center mb-8 md:mb-12"
        initial={settings.shouldAnimate ? { opacity: 0, y: settings.distance } : {}}
        whileInView={settings.shouldAnimate ? { opacity: 1, y: 0 } : {}}
        viewport={{ once: true }}
        transition={{
            duration: settings.duration,
            ease: settings.ease,
        }}
    >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Open Source Contributions
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
            Discover my published Python packages and libraries that contribute to the open-source ecosystem, helping developers build better applications.
        </p>
    </motion.div>
));

const OpenSource = memo(() => {
    const { settings } = useOptimizedAnimation();
    
    const packages = useMemo(() => {
        // Get True Family projects as they are the main open source contributions
        const trueFamilyProjects = getProjectsByCategory(PROJECT_CATEGORIES.TRUE_FAMILY.id);
        const utilityProjects = getProjectsByCategory(PROJECT_CATEGORIES.UTILITY.id);
        
        // Combine and filter for packages with PyPI links
        return [...trueFamilyProjects, ...utilityProjects]
            .filter(project => project.links.pypi)
            .slice(0, 4); // Show top 4 packages
    }, []);

    if (packages.length === 0) {
        return null;
    }

    return (
        <OptimizedBlock threshold={12}>
            <section className="py-32 md:py-48">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <OpenSourceHeader settings={settings} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {packages.map((project, index) => (
                            <PackageCard 
                                key={project.id} 
                                project={project} 
                                settings={settings} 
                            />
                        ))}
                    </div>
                </div>
            </section>
        </OptimizedBlock>
    );
});

OpenSource.displayName = 'OpenSource';

export default OpenSource;
