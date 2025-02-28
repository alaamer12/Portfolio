import {memo, useMemo} from "react";
import {motion} from 'framer-motion';
import {useTheme} from '../context/ThemeContext';
import Background from '../components/Background/Background';
import SEO from '../components/SEO/SEO';
import {getBadgeContent, getProjectsData, sortProjects} from '../data/config.js';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {OptimizedBlock, OptimizedLoop} from '../components/OptimizedMillion';
import useOptimizedAnimation from '../hooks/useOptimizedAnimation';


const ProjectBadge = memo(({badge, settings}) => {
    const badgeContent = useMemo(() => getBadgeContent(badge), [badge]);
    return badgeContent && (
        <motion.div
            initial={settings.shouldAnimate ? {scale: 0.8, opacity: 0} : {}}
            animate={settings.shouldAnimate ? {scale: 1, opacity: 1} : {}}
            transition={{duration: settings.duration, ease: settings.ease}}
            className={`absolute top-2 sm:top-4 right-2 sm:right-4 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[0.65rem] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5 shadow-lg text-white ${badgeContent.className} hover:scale-105 transition-transform duration-200 backdrop-blur-sm`}
        >
            <span className="text-[0.65rem] sm:text-sm">{badgeContent.icon}</span>
            <span className="tracking-wide uppercase">{badgeContent.text}</span>
        </motion.div>
    )
});

const ProjectBanner = memo(({banner}) => (
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
    )
));

const ProjectHeader = memo(({icon, title}) => (
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
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
    </div>
));

const ProjectTags = memo(({tags}) => (
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

const ProjectDetails = memo(({details}) => (
    <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
        {details.map((detail, index) => (
            <div key={index} className="flex items-start">
                <span className="text-primary dark:text-primary-light mr-2">•</span>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{detail}</p>
            </div>
        ))}
    </div>
));

const ProjectButton = memo(({href, className, children, settings}) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`px-4 py-2 text-sm sm:text-base rounded-full transition-colors text-center ${className}`}
        whileHover={settings.shouldAnimate ? {scale: settings.scale} : {}}
        whileTap={settings.shouldAnimate ? {scale: 0.95} : {}}
    >
        {children}
    </motion.a>
));

const DisabledButton = memo(({className, children}) => (
    <button
        disabled
        className={`px-4 py-2 text-sm sm:text-base rounded-full cursor-not-allowed opacity-60 text-center ${className}`}
    >
        {children}
    </button>
));

const ActiveButtons = memo(({github, demo, settings}) => (
    <>
        <ProjectButton
            href={github}
            className="bg-primary hover:bg-primary-light dark:bg-surface dark:hover:bg-primary text-white"
            settings={settings}
        >
            View on GitHub
        </ProjectButton>
        <ProjectButton
            href={demo}
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
            settings={settings}
        >
            Live Demo
        </ProjectButton>
    </>
));

const InactiveButtons = memo(() => (
    <>
        <DisabledButton className="bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
            View on GitHub
        </DisabledButton>
        <DisabledButton className="bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            Live Demo
        </DisabledButton>
    </>
));

const ProjectButtons = memo(({badge, github, demo, settings}) => (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        {(badge === 'hot' || badge === 'new') ? (
            <ActiveButtons github={github} demo={demo} settings={settings}/>
        ) : (
            <InactiveButtons/>
        )}
    </div>
));

const ProjectCard = ({project, settings}) => {
    return (
        <motion.div
            initial={settings.shouldAnimate ? {opacity: 0, y: settings.distance} : {}}
            animate={settings.shouldAnimate ? {opacity: 1, y: 0} : {}}
            transition={{duration: settings.duration, ease: settings.ease, useTransform: settings.useTransform}}
            className={`bg-[#f5f4f4] dark:bg-surface p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group ${!project.available ? 'opacity-75' : ''}`}
        >
            <ProjectBadge badge={project.badge} settings={settings}/>
            <ProjectBanner banner={project.banner}/>
            <div className="relative z-10">
                <ProjectHeader icon={project.icon} title={project.title}/>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">{project.description}</p>
                <ProjectTags tags={project.tags}/>
                <ProjectDetails details={project.details}/>
                <ProjectButtons badge={project.badge} github={project.github} demo={project.demo} settings={settings}/>
            </div>
        </motion.div>
    );
}

const ProjectsSEO = () => (
    <SEO
        title="Projects"
        description="Explore my portfolio of web development projects, including full-stack applications, APIs, and open-source contributions."
        type="website"
        schema={{
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Projects - Amr Muhamed",
            "description": "Collection of web development projects and applications built by Amr Muhamed",
            "author": {
                "@type": "Person",
                "name": "Amr Muhamed",
                "jobTitle": "Full Stack Developer",
                "url": "https://amrmuhamed.com"
            },
            "about": {
                "@type": "Thing",
                "name": "Web Development Projects",
                "description": "A showcase of full-stack development projects including web applications, APIs, and open-source contributions"
            }
        }}
    />
);


const ProjectSection = memo(({title, projects, renderProjectCard}) => (
    <OptimizedBlock className="mb-16" threshold={8}>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{title}</h2>
        <OptimizedLoop items={projects} renderItem={renderProjectCard} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 auto-rows-fr" enableCache={true} />
    </OptimizedBlock>
));

const ProjectsHeader = memo(({settings}) => (
    <OptimizedBlock className="mb-12" threshold={8}>
        <motion.h1 className="text-4xl font-bold text-gray-900 dark:text-white" {...settings.shouldAnimate && {initial: {opacity: 0, y: settings.distance}, animate: {opacity: 1, y: 0}, transition: {duration: settings.duration, ease: settings.ease}}}>All Projects</motion.h1>
    </OptimizedBlock>
));

const GitHubLink = memo(({settings}) => (
    <motion.div className="mt-12 sm:mt-16 flex justify-center" {...settings.shouldAnimate && {initial: {opacity: 0, y: settings.distance}, animate: {opacity: 1, y: 0}, transition: {duration: settings.duration, delay: 0.2, ease: settings.ease}}}>
        <motion.a href="https://github.com/alaamer12" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary-light dark:bg-surface dark:hover:bg-primary text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-base sm:text-lg font-semibold" {...settings.shouldAnimate && {whileHover: {scale: settings.scale}, whileTap: {scale: 0.95}}}>
            <span>View More Projects on GitHub</span>
            <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </motion.a>
    </motion.div>
));

const renderProjectCard = (project, settings, index) => (
    <motion.div key={index} {...settings.shouldAnimate && {initial: {opacity: 0, y: settings.distance}, animate: {opacity: 1, y: 0}, transition: {duration: settings.duration, delay: index * (settings.isMobile ? 0.05 : 0.1), ease: settings.ease, useTransform: settings.useTransform}}}>
        <ProjectCard project={project} settings={settings}/>
    </motion.div>
);

const Projects = () => {
    const {isDark} = useTheme();
    const {settings} = useOptimizedAnimation();
    const baseUrl = '';

    const {trueFamilyProjects, utilityProjects, businessProjects} = useMemo(() => {
        const {trueFamilyProjects: unsortedTrueFamilyProjects, utilityProjects: unsortedUtilityProjects, businessProjects: unsortedBusinessProjects} = getProjectsData(baseUrl, isDark);
        return {trueFamilyProjects: sortProjects(unsortedTrueFamilyProjects), utilityProjects: sortProjects(unsortedUtilityProjects), businessProjects: sortProjects(unsortedBusinessProjects)};
    }, [baseUrl, isDark]);

    return (
        <div className="relative min-h-screen w-screen overflow-x-hidden">
            <ProjectsSEO/>
            <Background/>
            <div className="relative z-10 w-full py-16">
                <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
                    <ProjectsHeader settings={settings}/>
                    <motion.div className="space-y-8 sm:space-y-12 md:space-y-16" {...settings.shouldAnimate && {initial: {opacity: 0, y: settings.distance}, animate: {opacity: 1, y: 0}, transition: {duration: settings.duration, ease: settings.ease, staggerChildren: settings.staggerChildren}}}>
                        {[{title: "Business Projects", projects: businessProjects}, {title: "True Family Projects", projects: trueFamilyProjects}, {title: "Utility Projects", projects: utilityProjects}].map(({title, projects}) => (
                            <ProjectSection key={title} title={title} projects={projects} renderProjectCard={renderProjectCard} />
                        ))}
                    </motion.div>
                    <GitHubLink settings={settings}/>
                </div>
            </div>
        </div>
    );
};

export default memo(Projects);
