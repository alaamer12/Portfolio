import {motion} from 'framer-motion';
import {FaExternalLinkAlt, FaGithub} from 'react-icons/fa';
import {useTheme} from '../../context/ThemeContext';
import {OptimizedBlock} from '../OptimizedMillion';

const ProjectCard = ({title, description, image, darkImage, tags, github, demo, delay}) => {
    const {isDark} = useTheme();
    const displayImage = darkImage && isDark ? darkImage : image;

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay}}
            viewport={{once: true}}
            className="bg-[#e6e6e6] dark:bg-surface dark:bg-surface-dark rounded-xl p-4 sm:p-6 shadow-md dark:shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-none group"
        >
            {/* Mobile Layout */}
            <div className="block sm:hidden">
                <div className="flex items-center gap-3 mb-3">
                    <motion.div
                        className="relative w-12 h-12 flex-shrink-0"
                        whileHover={{scale: 1.05}}
                        transition={{type: "spring", stiffness: 400, damping: 10}}
                    >
                        <img
                            src={displayImage}
                            alt={title}
                            className="w-full h-full object-contain"
                        />
                    </motion.div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-text-light group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                        {title}
                    </h3>
                </div>

                <div className="space-y-3">
                    <p className="text-sm text-gray-600 dark:text-text-light/70 group-hover:text-gray-800 dark:group-hover:text-text-light/90 transition-colors">
                        {description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-0.5 text-xs rounded-full bg-gray-50 dark:bg-primary/10 text-gray-600 dark:text-text-light/70"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex space-x-4 pt-2">
                        {github && (
                            <motion.a
                                href={github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 dark:text-text-light/70 hover:text-primary dark:hover:text-primary-light transition-colors"
                                whileHover={{scale: 1.1}}
                                whileTap={{scale: 0.9}}
                            >
                                <FaGithub className="text-lg"/>
                            </motion.a>
                        )}
                        {demo && (
                            <motion.a
                                href={demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 dark:text-text-light/70 hover:text-primary dark:hover:text-primary-light transition-colors"
                                whileHover={{scale: 1.1}}
                                whileTap={{scale: 0.9}}
                            >
                                <FaExternalLinkAlt className="text-lg"/>
                            </motion.a>
                        )}
                    </div>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:flex flex-row gap-6">
                <div className="flex-shrink-0 flex justify-start">
                    <motion.div
                        className="relative w-24 h-24 flex items-center justify-center"
                        whileHover={{scale: 1.05}}
                        transition={{type: "spring", stiffness: 400, damping: 10}}
                    >
                        <img
                            src={displayImage}
                            alt={title}
                            className="w-auto h-auto max-w-[90%] max-h-[90%] object-contain"
                        />
                    </motion.div>
                </div>

                <div className="flex-grow space-y-3">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-text-light group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                        {title}
                    </h3>

                    <p className="text-base text-gray-600 dark:text-text-light/70 group-hover:text-gray-800 dark:group-hover:text-text-light/90 transition-colors">
                        {description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 text-sm rounded-full bg-gray-50 dark:bg-primary/10 text-gray-600 dark:text-text-light/70"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex space-x-4">
                        {github && (
                            <motion.a
                                href={github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 dark:text-text-light/70 hover:text-primary dark:hover:text-primary-light transition-colors"
                                whileHover={{scale: 1.1}}
                                whileTap={{scale: 0.9}}
                            >
                                <FaGithub className="text-xl"/>
                            </motion.a>
                        )}
                        {demo && (
                            <motion.a
                                href={demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 dark:text-text-light/70 hover:text-primary dark:hover:text-primary-light transition-colors"
                                whileHover={{scale: 1.1}}
                                whileTap={{scale: 0.9}}
                            >
                                <FaExternalLinkAlt className="text-xl"/>
                            </motion.a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const projects = [
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
    ];

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
                        <span
                            className="bg-gradient-to-r from-primary via-strawberry to-cherry-pie dark:from-primary-light dark:via-strawberry-light dark:to-cherry-pie-light bg-clip-text text-transparent">
                            Featured Projects
                        </span>
                    </motion.h2>
                    <motion.p
                        className="text-sm sm:text-base text-text/70 dark:text-text-light/70 max-w-2xl mx-auto transition-colors duration-300 px-4"
                        whileHover={{scale: 1.05, color: '#ffffff'}}
                        transition={{type: "spring", stiffness: 400, damping: 10}}
                    >
                        Here are some of my notable projects that showcase my skills and experience in web development.
                    </motion.p>
                </motion.div>

                <div className="grid cursor-pointer grid-cols-1 gap-6">
                    {projects.map((project, index) => (
                        <OptimizedBlock key={project.title} enableCache={true} threshold={20}>
                            <ProjectCard key={index} {...project} />
                        </OptimizedBlock>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
