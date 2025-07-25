
import {memo, useMemo, useState} from 'react';
import {motion} from 'framer-motion';
import {FaExternalLinkAlt, FaGithub} from 'react-icons/fa';
import {useTheme} from '../../context/ThemeContext';
import useOptimizedAnimation from '../../hooks/useOptimizedAnimation';
import {OptimizedBlock} from '../OptimizedMillion';
import {getFeaturedProjectsData} from '../../data/projects';

const ProjectLinks = memo(({github, demo}) => {
    const {settings} = useOptimizedAnimation();
    const links = useMemo(() => [
        {url: github, Icon: FaGithub},
        {url: demo, Icon: FaExternalLinkAlt}
    ], [github, demo]);

    return (
        <div className="flex space-x-4 pt-2">
            {links.map(({url, Icon}) => url && (
                <motion.a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-white/40 hover:text-primary dark:hover:text-primary-light transition-colors"
                    whileHover={settings.shouldAnimate ? {scale: settings.scale} : {}}
                    whileTap={settings.shouldAnimate ? {scale: 0.95} : {}}
                >
                    <Icon className="text-lg sm:text-xl"/>
                </motion.a>
            ))}
        </div>
    );
});

ProjectLinks.displayName = 'ProjectLinks';

const ProjectImage = memo(({displayImage, title}) => {
    const {settings} = useOptimizedAnimation();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);

    const imageStyle = useMemo(() => ({
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
    }), [isLoaded]);

    return (
        <motion.div
            className="relative w-12 h-12 sm:w-24 sm:h-24 flex-shrink-0 flex items-center justify-center"
            whileHover={settings.shouldAnimate ? {scale: settings.scale} : {}}
            transition={{
                type: "spring",
                stiffness: settings.isMobile ? 300 : 400,
                damping: settings.isMobile ? 15 : 10
            }}
        >
            {!isLoaded && !isError && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md" />
            )}
            <img
                src={displayImage}
                alt={title}
                className="w-full h-full sm:w-auto sm:h-auto sm:max-w-[90%] sm:max-h-[90%] object-contain"
                loading="lazy"
                style={imageStyle}
                onLoad={() => setIsLoaded(true)}
                onError={() => setIsError(true)}
            />
            {isError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                    <span className="text-sm text-gray-500">Failed to load image</span>
                </div>
            )}
        </motion.div>
    );
});

ProjectImage.displayName = 'ProjectImage';

const ProjectCaption = memo(({title, description}) => (
    <>
        <h3 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-[#7d6b9b] group-hover:text-primary dark:group-hover:text-primary-light transition-colors sm:hidden">
            {title}
        </h3>
        <h3 className="hidden sm:block text-2xl font-bold text-gray-900 dark:text-[#7d6b9b] group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
            {title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-[#7d6b9b]/50 group-hover:text-gray-800 dark:group-hover:text-primary/55 transition-colors">
            {description}
        </p>
    </>
));

ProjectCaption.displayName = 'ProjectCaption';

const ProjectTags = memo(({tags}) => {
    const {settings} = useOptimizedAnimation();
    const [hoveredTag, setHoveredTag] = useState(null);

    const renderedTags = useMemo(() => (
        tags.map((tag, index) => {
            const isHovered = hoveredTag === index;
            return (
                <motion.span
                    key={index}
                    className="px-2 cursor-pointer py-0.5 text-xs rounded-full bg-gray-50 dark:bg-primary/10 text-gray-600 dark:text-white/50 hover:dark:text-primary-light transition-colors"
                    onHoverStart={() => setHoveredTag(index)}
                    onHoverEnd={() => setHoveredTag(null)}
                    animate={settings.shouldAnimate && isHovered ? {
                        scale: settings.scale,
                        transition: {
                            type: "spring",
                            stiffness: settings.isMobile ? 300 : 400,
                            damping: settings.isMobile ? 15 : 10
                        }
                    } : {}}
                >
                    {tag}
                </motion.span>
            );
        })
    ), [tags, hoveredTag, settings]);

    return (
        <div className="flex flex-wrap gap-1.5">
            {renderedTags}
        </div>
    );
});

ProjectTags.displayName = 'ProjectTags';

const ProjectCard = memo(({project, delay}) => {
    const {settings} = useOptimizedAnimation();
    const {isDark} = useTheme();
    const displayImage = useMemo(() =>
            project.darkImage && isDark ? project.darkImage : project.image
        , [project.darkImage, isDark, project.image]);

    return (
        <OptimizedBlock threshold={12}>
            <motion.div
                className="bg-[#e6e6e6] my-5 dark:bg-surface dark:bg-surface-dark rounded-xl p-4 sm:p-6 shadow-md dark:shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-none group"
                initial={settings.shouldAnimate ? {opacity: 0, y: settings.distance} : {}}
                whileInView={settings.shouldAnimate ? {opacity: 1, y: 0} : {}}
                viewport={{once: true}}
                transition={{
                    duration: settings.duration,
                    delay: delay * (settings.isMobile ? 0.1 : 0.2),
                    ease: settings.ease,
                    useTransform: settings.useTransform
                }}
            >
                <div className="flex sm:flex-row sm:gap-6">
                    <div className="flex items-center mr-3 gap-3 mb-3 sm:mb-0">
                        <ProjectImage displayImage={displayImage} title={project.title}/>
                    </div>

                    <div className="flex-grow space-y-3">
                        <ProjectCaption title={project.title} description={project.description}/>
                        <ProjectTags tags={project.tags}/>
                        <ProjectLinks github={project.github} demo={project.demo}/>
                    </div>
                </div>
            </motion.div>
        </OptimizedBlock>
    );
});

ProjectCard.displayName = 'ProjectCard';

const ProjectsHeader = memo(() => {
    const { settings } = useOptimizedAnimation();
    
    return (
        <motion.div
            initial={settings.shouldAnimate ? {opacity: 0} : {}}
            whileInView={settings.shouldAnimate ? {opacity: 1} : {}}
            viewport={{once: true}}
            transition={{
                duration: settings.duration,
                staggerChildren: settings.staggerChildren
            }}
            className="text-center mb-8 sm:mb-12 group"
        >
            <HeaderTitle settings={settings} />
            <HeaderDescription settings={settings} />
        </motion.div>
    );
});

const HeaderTitle = memo(({ settings }) => (
    <motion.h2
        className="text-3xl sm:text-4xl font-bold text-text dark:text-text-light mb-3 sm:mb-4 inline-block"
        whileHover={settings.shouldAnimate ? {scale: settings.scale} : {}}
        transition={{
            type: "spring",
            stiffness: settings.isMobile ? 300 : 400,
            damping: settings.isMobile ? 15 : 10
        }}
    >
        <span className="bg-gradient-to-r from-primary via-strawberry to-cherry-pie dark:from-primary-light dark:via-strawberry-light dark:to-cherry-pie-light bg-clip-text text-transparent">
            Featured Projects
        </span>
    </motion.h2>
));

const HeaderDescription = memo(({ settings }) => (
    <motion.p
        className="text-sm sm:text-base text-text/70 dark:text-white/50 max-w-2xl mx-auto transition-colors duration-300 px-4"
        whileHover={settings.shouldAnimate ? {scale: settings.scale} : {}}
        transition={{
            type: "spring",
            stiffness: settings.isMobile ? 300 : 400,
            damping: settings.isMobile ? 15 : 10
        }}
    >
        Here are some of my notable projects that showcase my skills and experience in web development.
    </motion.p>
));

const ProjectList = memo(({ projects }) => (
    <div className="space-y-6">
        {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} delay={project.delay || index * 0.2} />
        ))}
    </div>
));

const Projects = memo(() => {
    const projects = useMemo(() => getFeaturedProjectsData(), []);

    return (
        <section className="py-20" id="projects">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <ProjectsHeader />
                <ProjectList projects={projects} />
            </div>
        </section>
    );
});

Projects.displayName = 'Projects';

export default Projects;
