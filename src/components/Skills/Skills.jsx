import {motion, useReducedMotion} from 'framer-motion';
import {useInView} from 'react-intersection-observer';
import {SiDjango, SiFastapi, SiPostgresql, SiPython, SiReact, SiTailwindcss} from 'react-icons/si';
import {OptimizedBlock} from '../OptimizedMillion';
import {useDeviceDetect} from '../../hooks/useDeviceDetect';

const SkillBar = ({skill}) => {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });
    const isMobile = useDeviceDetect();

    return (
        <div className="mb-6">
            <div className="flex justify-between mb-2">
                <span className="text-base md:text-lg font-medium text-gray-900 dark:text-white">{skill.name}</span>
                <span
                    className="text-base md:text-lg font-medium text-primary dark:text-primary-light">{skill.percentage}%</span>
            </div>
            <div
                ref={ref}
                className="h-3 md:h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
            >
                <motion.div
                    className={`h-full ${skill.color}`}
                    initial={{width: 0}}
                    animate={inView ? {width: `${skill.percentage}%`} : {width: 0}}
                    transition={{
                        duration: isMobile ? 0.5 : 1,
                        ease: "easeOut",
                        useTransform: !isMobile
                    }}
                />
            </div>
        </div>
    );
};

const SkillCard = ({Icon, name, level, title, description, url}) => {
    const isMobile = useDeviceDetect();
    const prefersReducedMotion = useReducedMotion();

    if (Icon && level !== undefined) {
        // Technical skill card with icon and progress bar
        return (
            <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                whileHover={isMobile ? {} : {scale: 1.05}}
                transition={{
                    duration: isMobile ? 0.3 : 0.5,
                    useTransform: !isMobile
                }}
                className="bg-[#f6f6f6] dark:bg-gray-800 backdrop-blur-md rounded-xl p-4 md:p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
                <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4">
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary dark:text-primary-light"/>
                    <div className="flex-1">
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
                        <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 md:h-2">
                            <motion.div
                                initial={{width: 0}}
                                whileInView={{width: `${level}%`}}
                                viewport={{once: true}}
                                transition={{
                                    duration: isMobile ? 0.5 : 1,
                                    ease: "easeOut",
                                    useTransform: !isMobile
                                }}
                                className="bg-primary dark:bg-primary-light h-1.5 md:h-2 rounded-full"
                            />
                        </div>
                    </div>
                </a>
            </motion.div>
        );
    }

    // Regular skill card with title and description
    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            whileHover={isMobile ? {} : {scale: 1.05}}
            transition={{
                duration: isMobile ? 0.3 : 0.5,
                useTransform: !isMobile
            }}
            className="bg-[#f6f6f6] dark:bg-gray-800 backdrop-blur-md rounded-xl p-4 md:p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">{description}</p>
        </motion.div>
    );
};

const SkillChip = ({skill, url}) => (
    <motion.div
        initial={{opacity: 0, scale: 0.9}}
        whileInView={{opacity: 1, scale: 1}}
        whileHover={{scale: 1.05}}
        className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600"
    >
        <a href={url} target="_blank" rel="noopener noreferrer"
           className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {skill}
        </a>
    </motion.div>
);

const skillsData = [
    {
        title: "Backend Development",
        description: "Specialized in Python-based backend solutions with FastAPI and Django"
    },
    {
        title: "Open Source",
        description: "Creator of multiple PyPI packages including true-core ecosystem"
    },
    {
        title: "Leadership",
        description: "CEO of Tealim and Snippet, leading technical teams and projects"
    }
];

const skills = [
    {name: 'Python', percentage: 85, color: 'bg-blue-500'},
    {name: 'React & React Native', percentage: 10, color: 'bg-cyan-500'},
    {name: 'Other Technologies', percentage: 5, color: 'bg-purple-500'},
];

const mainSkills = [
    {Icon: SiPython, name: 'Python', level: 90, url: 'https://www.python.org/'},
    {Icon: SiReact, name: 'React', level: 85, url: 'https://reactjs.org/'},
    {Icon: SiTailwindcss, name: 'TailwindCSS', level: 80, url: 'https://tailwindcss.com/'},
    {Icon: SiDjango, name: 'Django', level: 88, url: 'https://www.djangoproject.com/'},
    {Icon: SiPostgresql, name: 'PostgreSQL', level: 85, url: 'https://www.postgresql.org/'},
    {Icon: SiFastapi, name: 'FastAPI', level: 80, url: 'https://fastapi.tiangolo.com/'},
];

const otherSkills = [
    {name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'},
    {name: 'TypeScript', url: 'https://www.typescriptlang.org/'},
    {name: 'Node.js', url: 'https://nodejs.org/'},
    {name: 'MongoDB', url: 'https://www.mongodb.com/'},
    {name: 'MySQL', url: 'https://www.mysql.com/'},
    {name: 'Git', url: 'https://git-scm.com/'},
    {name: 'REST APIs', url: 'https://restfulapi.net/'},
    {name: 'TailwindCSS', url: 'https://tailwindcss.com/'},
    {name: 'Bootstrap', url: 'https://getbootstrap.com/'},
    {name: 'Docker', url: 'https://www.docker.com/'},
    {name: 'Nginx', url: 'https://nginx.org/'},
    {name: 'Yarn', url: 'https://yarnpkg.com/'},
    {name: 'NPM', url: 'https://www.npmjs.com/'},
    {name: 'Vite', url: 'https://vitejs.dev/'},
    {name: 'Next.js', url: 'https://nextjs.org/'},
    {name: 'System Architecture', url: 'https://en.wikipedia.org/wiki/Architecture_(computing)'},
    {name: 'System Design', url: 'https://en.wikipedia.org/wiki/System_design'},
];

const Skills = () => {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });
    const isMobile = useDeviceDetect();

    const containerVariants = {
        hidden: {opacity: 0, y: 50},
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: isMobile ? 0.5 : 0.8,
                staggerChildren: 0.2,
            },
        },
    };

    return (
        <section className="py-20" id="skills">
            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-[#f1f1f1]">
                    Technical Expertise
                </h2>

                {/* Skill Bars */}
                <div className="space-y-8">
                    {skills.map((skill, index) => (
                        <OptimizedBlock key={skill.name} enableCache={true} threshold={20}>
                            <SkillBar key={index} skill={skill}/>
                        </OptimizedBlock>
                    ))}
                </div>

                {/* Skill Areas */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {skillsData.map((skill, index) => (
                        <OptimizedBlock key={skill.title} enableCache={true} threshold={20}>
                            <SkillCard key={index} title={skill.title} description={skill.description}/>
                        </OptimizedBlock>
                    ))}
                </div>

                {/* Main Skills */}
                <div className="mt-16">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
                        Core Technologies
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {mainSkills.map((skill, index) => (
                            <OptimizedBlock key={index} enableCache={true} threshold={20}>
                                <SkillCard key={index} {...skill} />
                            </OptimizedBlock>
                        ))}
                    </div>
                </div>

                {/* Other Skills */}
                <div className="mt-16">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-8">
                        Other Technologies
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {otherSkills.map((skill, index) => (
                            <OptimizedBlock key={index} enableCache={true} threshold={20}>
                                <SkillChip key={index} skill={skill.name} url={skill.url}/>
                            </OptimizedBlock>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Skills;
