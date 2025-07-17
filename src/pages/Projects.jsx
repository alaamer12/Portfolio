
import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { FaFire, FaGithub, FaPython } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { BsClock } from "react-icons/bs";
import { useTheme } from "../context/ThemeContext";
import Background from "../components/Background/Background";
import SEO from "../components/SEO/SEO";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { OptimizedBlock, OptimizedLoop } from "../components/OptimizedMillion";
import useOptimizedAnimation from "../hooks/useOptimizedAnimation";
import { getProjectsPageSchema } from "../data/schema.js";
import { 
    getProjectsData, 
    PROJECT_CATEGORIES, 
    PROJECT_BADGES, 
    sortProjectsByBadge, 
    getBadgeConfig 
} from "../data/config.js";

const getBadgeIcon = (badgeId) => {
    switch (badgeId) {
        case PROJECT_BADGES.HOT.id:
            return <FaFire className="mr-1"/>;
        case PROJECT_BADGES.NEW.id:
            return <IoSparkles className="mr-1"/>;
        case PROJECT_BADGES.COMING_SOON.id:
            return <BsClock className="mr-1"/>;
        default:
            return null;
    }
};

const ProjectBadge = memo(({ badge, settings }) => {
    const badgeConfig = getBadgeConfig(badge);
    if (!badgeConfig || badgeConfig.id === PROJECT_BADGES.NONE.id) return null;

    return (
        <motion.div
            initial={settings.shouldAnimate ? { scale: 0.8, opacity: 0 } : {}}
            animate={settings.shouldAnimate ? { scale: 1, opacity: 1 } : {}}
            transition={{
                duration: settings.duration,
                ease: settings.ease,
            }}
            className={`absolute top-2 sm:top-4 right-2 sm:right-4 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[0.65rem] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5 shadow-lg text-white ${badgeConfig.className} hover:scale-105 transition-transform duration-200 backdrop-blur-sm`}
        >
            <span className="text-[0.65rem] sm:text-sm">
                {getBadgeIcon(badge)}
            </span>
            <span className="tracking-wide uppercase">
                {badgeConfig.text}
            </span>
        </motion.div>
    );
});

const ProjectBanner = memo(
    ({ banner }) =>
        banner && (
            <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                <LazyLoadImage
                    src={banner}
                    alt=""
                    effect="blur"
                    className="w-full h-full object-cover"
                    threshold={300}
                    wrapperClassName="w-full h-full"
                />
            </div>
        ),
);

const ProjectHeader = memo(({ icon, title }) => (
    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
        {icon && (
            <LazyLoadImage
                src={icon}
                alt={`${title} icon`}
                effect="blur"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                threshold={300}
                wrapperClassName="w-10 h-10 sm:w-12 sm:h-12"
            />
        )}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            {title}
        </h3>
    </div>
));

const ProjectTags = memo(({ tags }) => (
    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
        {tags.map((tag, index) => (
            <span
                key={index}
                className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light rounded-full"
            >
                {tag}
            </span>
        ))}
    </div>
));

const ProjectDetails = memo(({ details }) => (
    <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
        {details.map((detail, index) => (
            <div key={index} className="flex items-start">
                <span className="text-primary dark:text-primary-light mr-2">
                    •
                </span>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    {detail}
                </p>
            </div>
        ))}
    </div>
));

const ProjectButton = memo(({ href, className, children, settings }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`px-4 py-2 text-sm sm:text-base rounded-full transition-colors text-center ${className}`}
        whileHover={settings.shouldAnimate ? { scale: settings.scale } : {}}
        whileTap={settings.shouldAnimate ? { scale: 0.95 } : {}}
    >
        {children}
    </motion.a>
));

const DisabledButton = memo(({ className, children }) => (
    <button
        disabled
        className={`px-4 py-2 text-sm sm:text-base rounded-full cursor-not-allowed opacity-60 text-center ${className}`}
    >
        {children}
    </button>
));

const ProjectLinks = memo(({ project, settings }) => {
    const { github, demo, pypi } = project;
    const isActive = project.badge === PROJECT_BADGES.HOT.id || project.badge === PROJECT_BADGES.NEW.id;
    
    return (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            {isActive ? (
                <>
                    {github && (
                        <ProjectButton
                            href={github}
                            className="bg-primary hover:bg-primary-light dark:bg-surface dark:hover:bg-primary text-white"
                            settings={settings}
                        >
                            <FaGithub className="inline mr-2" />
                            GitHub
                        </ProjectButton>
                    )}
                    {demo && (
                        <ProjectButton
                            href={demo}
                            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                            settings={settings}
                        >
                            Live Demo
                        </ProjectButton>
                    )}
                    {pypi && (
                        <ProjectButton
                            href={pypi}
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                            settings={settings}
                        >
                            <FaPython className="inline mr-2" />
                            PyPI
                        </ProjectButton>
                    )}
                </>
            ) : (
                <>
                    <DisabledButton className="bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                        <FaGithub className="inline mr-2" />
                        GitHub
                    </DisabledButton>
                    <DisabledButton className="bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                        {pypi ? 'PyPI' : 'Live Demo'}
                    </DisabledButton>
                </>
            )}
        </div>
    );
});

const ProjectCard = ({ project, settings }) => {
    return (
        <motion.div
            initial={settings.shouldAnimate ? { opacity: 0, y: settings.distance } : {}}
            animate={settings.shouldAnimate ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: settings.duration,
                ease: settings.ease,
                useTransform: settings.useTransform,
            }}
            className={`bg-[#f5f4f4] dark:bg-surface p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group ${!project.available ? "opacity-75" : ""}`}
        >
            <ProjectBadge badge={project.badge} settings={settings} />
            <ProjectBanner banner={project.banner} />
            <div className="relative z-10">
                <ProjectHeader icon={project.icon} title={project.title} />
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
                    {project.description}
                </p>
                <ProjectTags tags={project.tags} />
                <ProjectDetails details={project.details} />
                <ProjectLinks project={project} settings={settings} />
            </div>
        </motion.div>
    );
};

const CategoryHeader = memo(({ category, settings }) => (
    <motion.div
        className="mb-8 sm:mb-12"
        initial={settings.shouldAnimate ? { opacity: 0, y: settings.distance } : {}}
        animate={settings.shouldAnimate ? { opacity: 1, y: 0 } : {}}
        transition={{
            duration: settings.duration,
            ease: settings.ease,
        }}
    >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {category.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            {category.description}
        </p>
    </motion.div>
));

const ProjectSection = memo(({ category, projects, renderProjectCard }) => (
    <OptimizedBlock className="mb-16" threshold={8}>
        <CategoryHeader category={category} settings={useOptimizedAnimation().settings} />
        <OptimizedLoop
            items={projects}
            renderItem={renderProjectCard}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 auto-rows-fr"
            enableCache={true}
        />
    </OptimizedBlock>
));

const ProjectsHeader = memo(({ settings }) => (
    <OptimizedBlock className="mb-12" threshold={8}>
        <motion.div
            className="text-center"
            initial={settings.shouldAnimate ? { opacity: 0, y: settings.distance } : {}}
            animate={settings.shouldAnimate ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: settings.duration,
                ease: settings.ease,
            }}
        >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                All Projects
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
                Explore my complete portfolio of projects across different categories, from business applications to open-source contributions.
            </p>
        </motion.div>
    </OptimizedBlock>
));

const GitHubLink = memo(({ settings }) => (
    <motion.div
        className="mt-12 sm:mt-16 flex justify-center"
        initial={settings.shouldAnimate ? { opacity: 0, y: settings.distance } : {}}
        animate={settings.shouldAnimate ? { opacity: 1, y: 0 } : {}}
        transition={{
            duration: settings.duration,
            delay: 0.2,
            ease: settings.ease,
        }}
    >
        <motion.a
            href="https://github.com/alaamer12"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary-light dark:bg-surface dark:hover:bg-primary text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-base sm:text-lg font-semibold"
            whileHover={settings.shouldAnimate ? { scale: settings.scale } : {}}
            whileTap={settings.shouldAnimate ? { scale: 0.95 } : {}}
        >
            <span>View More Projects on GitHub</span>
            <svg
                className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 transform group-hover:translate-x-1"
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
));

const renderProjectCard = (project, settings, index) => (
    <motion.div
        key={project.title}
        initial={settings.shouldAnimate ? { opacity: 0, y: settings.distance } : {}}
        animate={settings.shouldAnimate ? { opacity: 1, y: 0 } : {}}
        transition={{
            duration: settings.duration,
            delay: index * (settings.isMobile ? 0.05 : 0.1),
            ease: settings.ease,
            useTransform: settings.useTransform,
        }}
    >
        <ProjectCard project={project} settings={settings} />
    </motion.div>
);

const Projects = () => {
    const { isDark } = useTheme();
    const { settings } = useOptimizedAnimation();
    const baseUrl = "";

    const projectsData = useMemo(() => {
        const data = getProjectsData(baseUrl, isDark);
        return {
            businessProjects: sortProjectsByBadge(data.businessProjects),
            trueFamilyProjects: sortProjectsByBadge(data.trueFamilyProjects),
            utilityProjects: sortProjectsByBadge(data.utilityProjects),
        };
    }, [baseUrl, isDark]);

    const projectSections = useMemo(() => [
        {
            category: PROJECT_CATEGORIES.BUSINESS,
            projects: projectsData.businessProjects,
        },
        {
            category: PROJECT_CATEGORIES.TRUE_FAMILY,
            projects: projectsData.trueFamilyProjects,
        },
        {
            category: PROJECT_CATEGORIES.UTILITY,
            projects: projectsData.utilityProjects,
        },
    ], [projectsData]);

    return (
        <div className="relative min-h-screen w-screen overflow-x-hidden">
            <ProjectsSEO />
            <Background />
            <div className="relative z-10 w-full py-16">
                <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
                    <ProjectsHeader settings={settings} />
                    <motion.div
                        className="space-y-8 sm:space-y-12 md:space-y-16"
                        initial={settings.shouldAnimate ? { opacity: 0, y: settings.distance } : {}}
                        animate={settings.shouldAnimate ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            duration: settings.duration,
                            ease: settings.ease,
                            staggerChildren: settings.staggerChildren,
                        }}
                    >
                        {projectSections.map(({ category, projects }) => (
                            <ProjectSection
                                key={category.id}
                                category={category}
                                projects={projects}
                                renderProjectCard={(project, index) => renderProjectCard(project, settings, index)}
                            />
                        ))}
                    </motion.div>
                    <GitHubLink settings={settings} />
                </div>
            </div>
        </div>
    );
};

const ProjectsSEO = () => (
    <SEO
        title="Projects | Amr Muhamed - Full Stack Developer"
        description="Explore my portfolio of web development projects, including full-stack applications, APIs, and open-source contributions."
        type="website"
        image="/projects-og.png"
        keywords="web development projects, full stack projects, react projects, django projects, fastapi projects, python projects, javascript projects, github repositories, software engineering, portfolio projects"
        language="en"
        schema={getProjectsPageSchema()}
    />
);

export default memo(Projects);
