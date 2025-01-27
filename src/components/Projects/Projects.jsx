import {memo, useMemo} from 'react';
import {motion} from 'framer-motion';
import {FaExternalLinkAlt, FaGithub} from 'react-icons/fa';
import {useTheme} from '../../context/ThemeContext';

const ProjectLinks = memo(({github, demo}) => {
    const links = useMemo(() => [
        { url: github, Icon: FaGithub },
        { url: demo, Icon: FaExternalLinkAlt }
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
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.9}}
                >
                    <Icon className="text-lg sm:text-xl"/>
                </motion.a>
            ))}
        </div>
    );
});

ProjectLinks.displayName = 'ProjectLinks';

const ProjectImage = memo(({displayImage, title}) => (
    <motion.div
        className="relative w-12 h-12 sm:w-24 sm:h-24 flex-shrink-0 flex items-center justify-center"
        whileHover={{scale: 1.05}}
        transition={{type: "spring", stiffness: 400, damping: 10}}
    >
        <img
            src={displayImage}
            alt={title}
            className="w-full h-full sm:w-auto sm:h-auto sm:max-w-[90%] sm:max-h-[90%] object-contain"
            loading="lazy"
        />
    </motion.div>
));

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
    const renderedTags = useMemo(() => (
        tags.map((tag, index) => (
            <span
                key={index}
                className="px-2 cursor-pointer py-0.5 text-xs rounded-full bg-gray-50 dark:bg-primary/10 text-gray-600 dark:text-white/50 hover:dark:text-primary-light transition-colors"
            >
                {tag}
            </span>
        ))
    ), [tags]);

    return (
        <div className="flex flex-wrap gap-1.5">
            {renderedTags}
        </div>
    );
});

ProjectTags.displayName = 'ProjectTags';

const cardAnimation = {
    initial: {opacity: 0, y: 20},
    animate: {opacity: 1, y: 0},
    transition: {duration: 0.5}
};

const ProjectCard = memo(({title, description, image, darkImage, tags, github, demo, delay}) => {
    const {isDark} = useTheme();
    const displayImage = useMemo(() => 
        darkImage && isDark ? darkImage : image
    , [darkImage, isDark, image]);

    return (
        <motion.div
            {...cardAnimation}
            transition={{...cardAnimation.transition, delay}}
            viewport={{once: true}}
            className="bg-[#e6e6e6] dark:bg-surface dark:bg-surface-dark rounded-xl p-4 sm:p-6 shadow-md dark:shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-none group"
        >
            <div className="flex flex-col sm:flex-row sm:gap-6">
                <div className="flex items-center gap-3 mb-3 sm:mb-0">
                    <ProjectImage displayImage={displayImage} title={title} />
                </div>

                <div className="flex-grow space-y-3">
                    <ProjectCaption title={title} description={description} />
                    <ProjectTags tags={tags} />
                    <ProjectLinks github={github} demo={demo} />
                </div>
            </div>
        </motion.div>
    );
});

ProjectCard.displayName = 'ProjectCard';

const Projects = memo(() => {
    const projects = useMemo(() => [
        {
            title: 'Tealim',
            description: 'A comprehensive e-learning platform built with React and Node.js.',
            image: '/images/tealim.png',
            tags: ['React Native', 'Node.js', 'PostgreSQL', 'Fastapi',],
            github: 'https://github.com/alaamer12/tealim',
            demo: 'https://tealim.com',
            delay: 0.2,
        },
        {
            title: 'True Core',
            description: 'A boilerplate utility package, The core of `true` family packages.',
            image: '/images/light_true_core_icon.png',
            darkImage: '/images/dark_true_core_icon.png',
            tags: ['Python', 'Pypi', 'Boilerplate', 'Utility'],
            github: 'https://github.com/alaamer12/true-core',
            delay: 0.4,
        },
    ], []);

    return (
        <section className="py-20" id="projects">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.5}}
                    viewport={{once: true}}
                    className="text-center mb-8 sm:mb-12 group"
                >
                    <motion.h2
                        className="text-3xl sm:text-4xl font-bold text-text dark:text-text-light mb-3 sm:mb-4 inline-block"
                        whileHover={{scale: 1.05}}
                        transition={{type: "spring", stiffness: 400, damping: 10}}
                    >
                        <span className="bg-gradient-to-r from-primary via-strawberry to-cherry-pie dark:from-primary-light dark:via-strawberry-light dark:to-cherry-pie-light bg-clip-text text-transparent">
                            Featured Projects
                        </span>
                    </motion.h2>
                    <motion.p
                        className="text-sm sm:text-base text-text/70 dark:text-white/50 max-w-2xl mx-auto transition-colors duration-300 px-4"
                        whileHover={{scale: 1.05, color: '#ffffff'}}
                        transition={{type: "spring", stiffness: 400, damping: 10}}
                    >
                        Here are some of my notable projects that showcase my skills and experience in web development.
                    </motion.p>
                </motion.div>

                <div className="space-y-6">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.title} {...project} />
                    ))}
                </div>
            </div>
        </section>
    );
});

Projects.displayName = 'Projects';

export default Projects;
