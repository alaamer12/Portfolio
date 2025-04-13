import {memo, useState, useEffect, useRef} from 'react';
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

const TechnicalSkillCard = memo(({Icon, name, level, url}) => {
    const isMobile = useDeviceDetect();
    const prefersReducedMotion = useReducedMotion();

    return (
        <AnimatedCard isMobile={isMobile}>
            <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4">
                <SkillIcon Icon={Icon} />
                <div className="flex-1">
                    <SkillName name={name} />
                    <SkillProgressBar level={level} isMobile={isMobile} prefersReducedMotion={prefersReducedMotion} />
                </div>
            </a>
        </AnimatedCard>
    );
});

const RegularSkillCard = memo(({title, description}) => {
    const isMobile = useDeviceDetect();

    return (
        <AnimatedCard isMobile={isMobile}>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">{description}</p>
        </AnimatedCard>
    );
});

const AnimatedCard = memo(({children, isMobile}) => (
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
        {children}
    </motion.div>
));

const SkillIcon = memo(({Icon}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
        setIsLoaded(true);
    }, []);
    
    return (
        <div className="relative w-6 h-6 md:w-8 md:h-8">
            {!isLoaded && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full" />
            )}
            {isLoaded && (
                <Icon className="w-full h-full text-primary dark:text-primary-light" />
            )}
        </div>
    );
});

const SkillName = memo(({name}) => (
    <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
));

const SkillProgressBar = memo(({level, isMobile, prefersReducedMotion}) => {
    const [isInView, setIsInView] = useState(false);
    const progressRef = useRef(null);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        
        observer.observe(progressRef.current);
        return () => observer.disconnect();
    }, []);
    
    return (
        <div ref={progressRef} className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 md:h-2">
            <motion.div
                className="bg-primary dark:bg-primary-light rounded-full h-full"
                initial={{ width: 0 }}
                animate={isInView && !prefersReducedMotion ? { width: `${level}%` } : { width: 0 }}
                transition={{
                    duration: isMobile ? 0.5 : 1,
                    ease: "easeOut",
                    useTransform: !isMobile
                }}
            />
        </div>
    );
});

const SkillCards = memo(({ skills }) => {
    const [visibleCards, setVisibleCards] = useState(new Set());
    const containerRef = useRef(null);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setVisibleCards(prev => new Set([...prev, entry.target.dataset.index]));
                    }
                });
            },
            { threshold: 0.1 }
        );
        
        const elements = containerRef.current.children;
        Array.from(elements).forEach((el, index) => {
            el.dataset.index = index;
            observer.observe(el);
        });
        
        return () => observer.disconnect();
    }, []);
    
    return (
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
            {skills.map((skill, index) => (
                <div key={skill.title} className="min-h-[150px] sm:min-h-[175px] md:min-h-[200px]">
                    {visibleCards.has(index.toString()) && (
                        <TechnicalSkillCard {...skill} />
                    )}
                </div>
            ))}
        </div>
    );
});

const SkillCard = memo(({Icon, name, level, title, description, url}) => {
    if (Icon && level !== undefined) {
        return <TechnicalSkillCard Icon={Icon} name={name} level={level} url={url} />;
    }
    return <RegularSkillCard title={title} description={description} />;
});

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
    return (
        <section id="skills" className="py-16 md:py-24">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold leading-tight md:text-4xl text-gray-900 dark:text-white">
                        My Skills & Expertise
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        A comprehensive breakdown of my technical capabilities
                    </p>
                </div>

                <OptimizedBlock>
                    <div className="mb-12 md:mb-16">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Skills Distribution</h3>
                        <div className="rounded-xl p-6 shadow-lg ">
                            {skills.map((skill, index) => (
                                <SkillBar key={`skill-bar-${index}`} skill={skill} />
                            ))}
                        </div>
                    </div>
                </OptimizedBlock>

                <OptimizedBlock>
                    <div className="mb-12 md:mb-16">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Main Technologies</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mainSkills.map((skill, index) => (
                                <SkillCard key={`main-skill-${index}`} {...skill} />
                            ))}
                        </div>
                    </div>
                </OptimizedBlock>

                <OptimizedBlock>
                    <div className="mb-12 md:mb-16">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Specialized Skills</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {skillsData.map((skill, index) => (
                                <SkillCard key={`specialized-skill-${index}`} {...skill} />
                            ))}
                        </div>
                    </div>
                </OptimizedBlock>

                <OptimizedBlock>
                    <div className="relative">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Other Technologies</h3>
                        <div className="flex flex-wrap gap-3">
                            {otherSkills.map((skill, index) => (
                                <SkillChip key={`other-skill-${index}`} skill={skill.name} url={skill.url} />
                            ))}
                        </div>
                    </div>
                </OptimizedBlock>
            </div>
        </section>
    );
};

export default Skills;
