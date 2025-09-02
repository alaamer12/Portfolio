import {memo, useMemo, useState} from 'react';
import {motion} from 'framer-motion';
import {FaExternalLinkAlt, FaGithub, FaImages} from 'react-icons/fa';
import {useTheme} from '../../context/ThemeContext';
import useOptimizedAnimation from '../../hooks/useOptimizedAnimation';
import {OptimizedBlock} from '../OptimizedMillion';
import {getFeaturedProjectsData} from '../../data/projects';
import ImageModal from '../ImageModal/ImageModal.jsx';

const ProjectLinks = memo(({github, demo, screenshots, onScreenshotsClick}) => {
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
            {screenshots && screenshots.length > 0 && (
                <motion.button
                    onClick={onScreenshotsClick}
                    className="bg-[#e6e6e6] dark:bg-gray-800 hover:scale-105 transition-transform rounded-md p-2"
                    whileHover={settings.shouldAnimate ? {scale: settings.scale} : {}}
                    whileTap={settings.shouldAnimate ? {scale: 0.95} : {}}
                    title="View Screenshots"
                >
                    <FaImages
                        className="text-lg sm:text-xl text-black dark:text-white/40 hover:text-primary dark:hover:text-primary-light transition-colors"/>
                </motion.button>
            )}
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

    // Generate fallback based on project title
    const fallbackContent = useMemo(() => {
        const initials = title
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('')
            .slice(0, 2);

        // Generate a consistent color based on title
        const colors = [
            'bg-gradient-to-br from-blue-500 to-blue-600',
            'bg-gradient-to-br from-green-500 to-green-600',
            'bg-gradient-to-br from-purple-500 to-purple-600',
            'bg-gradient-to-br from-red-500 to-red-600',
            'bg-gradient-to-br from-yellow-500 to-yellow-600',
            'bg-gradient-to-br from-indigo-500 to-indigo-600',
            'bg-gradient-to-br from-pink-500 to-pink-600',
            'bg-gradient-to-br from-teal-500 to-teal-600'
        ];

        const colorIndex = title.length % colors.length;
        const bgColor = colors[colorIndex];

        return {initials, bgColor};
    }, [title]);

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
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md"/>
            )}

            {!isError && (
                <img
                    src={displayImage}
                    alt={title}
                    className="w-full h-full sm:w-auto sm:h-auto sm:max-w-[90%] sm:max-h-[90%] object-contain rounded-md"
                    loading="lazy"
                    style={imageStyle}
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setIsError(true)}
                />
            )}

            {isError && (
                <div
                    className="absolute inset-0 flex items-center justify-center bg-transparent border-2 border-gray-300 dark:border-gray-600 rounded-md">
                    <span className="text-gray-600 dark:text-gray-400 font-bold text-lg sm:text-2xl">
                        {fallbackContent.initials}
                    </span>
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

const ProjectTags = memo(({tags, organization}) => {
    const {settings} = useOptimizedAnimation();
    const [hoveredTag, setHoveredTag] = useState(null);

    const renderedTags = useMemo(() => (
        tags.map((tag, index) => {
            const isHovered = hoveredTag === index;
            return (
                <motion.span
                    key={index}
                    className="px-3 cursor-pointer py-1 text-xs font-semibold rounded-full bg-gray-50 dark:bg-primary/10 text-gray-700 dark:text-white/70 border border-gray-200 dark:border-primary/20 hover:border-gray-300 dark:hover:border-primary/40 hover:text-gray-800 dark:hover:text-primary-light transition-all duration-300"
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
            {organization && (
                <OrganizationBadge organizationId={organization}/>
            )}
            {renderedTags}
        </div>
    );
});

ProjectTags.displayName = 'ProjectTags';

const ProjectCard = memo(({project, delay}) => {
    const {settings} = useOptimizedAnimation();
    const {isDark} = useTheme();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const displayImage = useMemo(() =>
            project.darkImage && isDark ? project.darkImage : project.image
        , [project.darkImage, isDark, project.image]);

    const handleScreenshotsClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

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
                        <ProjectTags tags={project.tags} organization={project.organization}/>
                        <ProjectLinks
                            github={project.github}
                            demo={project.demo}
                            screenshots={project.screenshots}
                            onScreenshotsClick={handleScreenshotsClick}
                        />
                    </div>
                </div>
            </motion.div>

            {isModalOpen && project.screenshots && project.screenshots.length > 0 && (
                <ImageModal
                    images={project.screenshots}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    title={`${project.title} Screenshots`}
                />
            )}
        </OptimizedBlock>
    );
});

ProjectCard.displayName = 'ProjectCard';

const ProjectsHeader = memo(() => {
    const {settings} = useOptimizedAnimation();

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
            <HeaderTitle settings={settings}/>
            <HeaderDescription settings={settings}/>
        </motion.div>
    );
});

const HeaderTitle = memo(({settings}) => (
    <motion.h2
        className="text-3xl sm:text-4xl font-bold text-text dark:text-text-light mb-3 sm:mb-4 inline-block"
        whileHover={settings.shouldAnimate ? {scale: settings.scale} : {}}
        transition={{
            type: "spring",
            stiffness: settings.isMobile ? 300 : 400,
            damping: settings.isMobile ? 15 : 10
        }}
    >
        <span
            className="bg-gradient-to-r from-primary via-strawberry to-cherry-pie dark:from-primary-light dark:via-strawberry-light dark:to-cherry-pie-light bg-clip-text text-transparent">
            Featured Projects
        </span>
    </motion.h2>
));

const HeaderDescription = memo(({settings}) => (
    <motion.p
        className="text-sm sm:text-base text-gray-600 dark:text-white/50 max-w-2xl mx-auto transition-colors duration-300 px-4"
        whileHover={settings.shouldAnimate ? {scale: settings.scale} : {}}
        transition={{
            type: "spring",
            stiffness: settings.isMobile ? 300 : 400,
            damping: settings.isMobile ? 15 : 10
        }}
    >
        Explore my portfolio of data engineering projects, showcasing expertise in ETL pipelines, machine learning, data
        visualization, and scalable data processing systems.
    </motion.p>
));

const ProjectList = memo(({projects}) => (
    <div className="space-y-6">
        {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} delay={project.delay || index * 0.2}/>
        ))}
    </div>
));

const ViewAllProjectsButton = memo(() => {
    const {settings} = useOptimizedAnimation();

    return (
        <motion.div
            className="flex justify-center mt-12"
            initial={settings.shouldAnimate ? {opacity: 0, y: settings.distance} : {}}
            whileInView={settings.shouldAnimate ? {opacity: 1, y: 0} : {}}
            viewport={{once: true}}
            transition={{
                duration: settings.duration,
                delay: 0.3,
                ease: settings.ease,
            }}
        >
            <motion.a
                href="/projects"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-light dark:bg-surface dark:hover:bg-primary text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-semibold"
                whileHover={settings.shouldAnimate ? {scale: settings.scale} : {}}
                whileTap={settings.shouldAnimate ? {scale: 0.95} : {}}
            >
                <span>View All Projects</span>
                <svg
                    className="w-5 h-5 transition-transform duration-300 transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                </svg>
            </motion.a>
        </motion.div>
    );
});

ViewAllProjectsButton.displayName = 'ViewAllProjectsButton';

const Projects = memo(() => {
    const projects = useMemo(() => getFeaturedProjectsData(), []);

    return (
        <section className="py-32 md:py-48" id="projects">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <ProjectsHeader/>
                <ProjectList projects={projects}/>
                <ViewAllProjectsButton/>
            </div>
        </section>
    );
});

Projects.displayName = 'Projects';

export default Projects;
