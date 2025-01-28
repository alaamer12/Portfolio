import {memo, useCallback, useState, useMemo} from "react";
import {motion} from 'framer-motion';
import {FaDownload, FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaSpinner} from 'react-icons/fa';
import {SiDjango, SiFastapi, SiPostgresql, SiPython, SiReact, SiTailwindcss} from 'react-icons/si';
import Background from '../components/Background/Background';
import SEO from '../components/SEO/SEO';
import {OptimizedBlock, OptimizedLoop} from '../components/OptimizedMillion';
import useOptimizedAnimation from '../hooks/useOptimizedAnimation';

const ResumeDownloadButton = memo(() => {
    const [isLoading, setIsLoading] = useState(false);
    const handleClick = useCallback(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);
    return (
        <motion.a
            href="/resume.pdf"
            download="resume.pdf"
            onClick={handleClick}
            className="inline-flex items-center px-6 py-3 bg-primary dark:bg-primary-light text-white rounded-full text-lg font-semibold"
            aria-label="Download Resume"
            style={{textDecoration: 'none'}}
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
        >
            {isLoading ? (
                <FaSpinner className="mr-2 animate-spin" aria-hidden="true"/>
            ) : (
                <FaDownload className="mr-2" aria-hidden="true"/>
            )}
            {isLoading ? 'Loading...' : 'Download Resume'}
        </motion.a>
    );
});

const SkillCard = memo(({Icon, name, level, description, url}) => {
    const {settings} = useOptimizedAnimation();
    
    return (
        <motion.div
            initial={settings.shouldAnimate ? {opacity: 0, y: settings.distance} : {}}
            whileInView={settings.shouldAnimate ? {opacity: 1, y: 0} : {}}
            viewport={{once: true, margin: "50px"}}
            whileHover={settings.shouldAnimate ? {scale: settings.scale} : {}}
            className="bg-[#e6e6e6]/10 cursor-pointer dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-xl"
        >
            <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4">
                <Icon className="w-8 h-8 text-primary dark:text-primary-light"/>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        <span className="hover:underline">{name}</span>
                    </h3>
                    <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                            initial={{width: 0}}
                            whileInView={{width: `${level}%`}}
                            viewport={{once: true}}
                            transition={{duration: 1, ease: "easeOut"}}
                            className="bg-primary dark:bg-primary-light h-2 rounded-full"
                        />
                    </div>
                </div>
            </a>
            <p className="mt-4 text-gray-600 dark:text-gray-300">{description}</p>
        </motion.div>
    );
});

const ExperienceCard = memo(({title, company, period, description, technologies}) => {
    const {settings} = useOptimizedAnimation();
    
    return (
        <motion.div
            initial={settings.shouldAnimate ? {opacity: 0, x: settings.distance * -1} : {}}
            whileInView={settings.shouldAnimate ? {opacity: 1, x: 0} : {}}
            viewport={{once: true, margin: "50px"}}
            className="relative pl-8 pb-8 border-l-2 border-primary dark:border-primary-light"
        >
            <motion.div 
                className="absolute w-4 h-4 bg-primary dark:bg-primary-light rounded-full -left-[9px] top-0"
                initial={settings.shouldAnimate ? {scale: 0} : {}}
                whileInView={settings.shouldAnimate ? {scale: 1} : {}}
                viewport={{once: true}}
            />
            <div className="bg-[#e6e6e6]/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
                <div className="mt-2 text-primary dark:text-primary-light font-semibold">{company}</div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{period}</div>
                <p className="mt-4 text-gray-700 dark:text-gray-300">{description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                        <motion.span
                            key={index}
                            initial={settings.shouldAnimate ? {opacity: 0, scale: 0.8} : {}}
                            whileInView={settings.shouldAnimate ? {opacity: 1, scale: 1} : {}}
                            viewport={{once: true}}
                            transition={{delay: index * 0.1}}
                            className="px-3 py-1 text-sm bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light rounded-full"
                        >
                            {tech}
                        </motion.span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
});

const EXPERIENCE_DATA = [
    {
        title: 'Cross-platform Developer',
        company: 'MobileTech Solutions',
        period: '2022 - Present',
        description: 'Led the development of cross-platform mobile applications using React Native. Implemented shared codebase strategy, reducing development time by 40%.',
        technologies: ['React Native', 'Zustand', 'Jest', 'Subpase', 'Expo', 'Reanimated']
    },
    {
        title: 'Junior Backend Developer',
        company: 'Tech Solutions Inc.',
        period: '2023 - Present',
        description: 'Contributing to the backend development team in building scalable microservices. Learning and implementing CI/CD practices while assisting in performance optimization efforts.',
        technologies: ['Python', 'Django', 'Docker', 'FastAPI', 'PostgreSQL', 'Pytest']
    },
    {
        title: 'Full Stack Developer',
        company: 'Innovation Labs',
        period: '2023 - Present',
        description: 'Developed and maintained multiple web applications. Reduced server response time by 60% through optimization and caching strategies.',
        technologies: ['React', 'React Native', 'FastAPI', 'PostgreSQL', 'TailwindCSS', 'Styled-components']
    },
    {
        title: 'Founder & Lead Developer',
        company: 'Personal Startup Projects',
        period: '2025 - Present',
        description: 'Initiated and developed multiple startup projects, focusing on innovative web applications. Led the entire development lifecycle from concept to deployment.',
        technologies: ['React', 'Django', 'FastAPI', 'PostgreSQL', 'Docker', 'Authkit', 'Supabase']
    }
];

const About = () => {
    const SKILLS_DATA = [
        {
            Icon: SiPython,
            name: 'Python',
            level: 95,
            description: 'Expert in Python development with extensive experience in automation, data processing, and backend development.',
            url: 'https://www.python.org/'
        },
        {
            Icon: SiDjango,
            name: 'Django',
            level: 70,
            description: 'Proficient in building scalable web applications using Django and Django REST Framework.',
            url: 'https://www.djangoproject.com/'
        },
        {
            Icon: SiFastapi,
            name: 'FastAPI',
            level: 95,
            description: 'Proficient in building high-performance APIs with FastAPI and its extensions.',
            url: 'https://fastapi.tiangolo.com/'
        },
        {
            Icon: SiReact,
            name: 'React and React Native',
            level: 85,
            description: 'Strong frontend development skills with React, including modern hooks and state management.',
            url: 'https://reactjs.org/'
        },
        {
            Icon: SiPostgresql,
            name: 'PostgreSQL',
            level: 75,
            description: 'Expert in database design, optimization, and management with PostgreSQL.',
            url: 'https://www.postgresql.org/'
        },
        {
            Icon: SiTailwindcss,
            name: 'TailwindCSS',
            level: 80,
            description: 'Proficient in creating responsive and visually stunning web interfaces with TailwindCSS.',
            url: 'https://tailwindcss.com/'
        }
    ];

    // Memoize sections to prevent unnecessary re-renders
    const renderSkillsSection = useMemo(() => (
        <OptimizedLoop
            items={SKILLS_DATA}
            renderItem={(skill, index) => (
                <SkillCard key={index} {...skill} />
            )}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            enableCache={true}
        />
    ), [SKILLS_DATA]);

    const renderExperienceSection = useMemo(() => (
        <OptimizedLoop
            items={EXPERIENCE_DATA}
            renderItem={(exp, index) => (
                <ExperienceCard key={index} {...exp} />
            )}
            className="space-y-6"
            enableCache={true}
        />
    ), [EXPERIENCE_DATA]);

    return (
        <>
            <SEO
                title="About Me | Amr Muhamed - Full Stack Developer"
                description="Learn about Amr Muhamed, a Full Stack Developer with expertise in React, Django, and modern web technologies. Discover my professional journey, skills, and experiences in software development."
                type="profile"
                image="/about-og.png"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "ProfilePage",
                    "mainEntity": {
                        "@type": "Person",
                        "name": "Amr Muhamed",
                        "jobTitle": "Full Stack Developer",
                        "description": "Experienced Full Stack Developer specializing in React, Django, and modern web technologies.",
                        "image": "/profile.jpg",
                        "url": "https://amrmuhamed.com/about",
                        "sameAs": [
                            "https://github.com/alaamer12",
                            "https://www.linkedin.com/in/al-aamer-0b0709265/"
                        ],
                        "knowsAbout": [
                            "React",
                            "Django",
                            "Python",
                            "JavaScript",
                            "Full Stack Development",
                            "Web Development"
                        ],
                        "hasCredential": [
                            {
                                "@type": "EducationalOccupationalCredential",
                                "credentialCategory": "degree",
                                "name": "Bachelor of Computer Science",
                                "educationalLevel": "Bachelor's Degree",
                                "recognizedBy": {
                                    "@type": "Organization",
                                    "name": "BFCAI"
                                }
                            }
                        ],
                        "alumniOf": {
                            "@type": "CollegeOrUniversity",
                            "name": "BFCAI",
                            "url": "https://fci.bu.edu.eg/"
                        }
                    }
                }}
            />
            <div className="relative min-h-screen w-screen overflow-x-hidden">
                <Background/>
                <div className="relative z-10 w-full pt-24 pb-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <OptimizedBlock className="mb-16" id="header-section">
                            <header className="text-center">
                                <motion.div
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                >
                                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                        About Me
                                    </h1>
                                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                        Enthusiastic developer with a passion for open-source projects and a growing
                                        portfolio of
                                        contributions. I've been fortunate to work on various personal and collaborative
                                        projects,
                                        while also managing my own small business. Always eager to learn and improve my
                                        skills.
                                    </p>
                                </motion.div>
                            </header>
                        </OptimizedBlock>
                        <OptimizedBlock className="mb-16" id="contact-section">
                            <section aria-label="Contact Information" className="mb-16">
                                <motion.div
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.2}}
                                    className="flex flex-wrap justify-center gap-6"
                                >
                                    <a
                                        href="mailto:amrmuhamed86@gmail.com"
                                        className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                                    >
                                        <FaEnvelope className="w-5 h-5"/>
                                        <span>amrmuhamed86@gmail.com</span>
                                    </a>
                                    <a
                                        href="https://github.com/alaamer12"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                                    >
                                        <FaGithub className="w-5 h-5"/>
                                        <span>GitHub</span>
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/al-aamer-0b0709265/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                                    >
                                        <FaLinkedin className="w-5 h-5"/>
                                        <span>LinkedIn</span>
                                    </a>
                                    <a
                                        href="https://www.google.com/maps?q=Cairo,Egypt"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                                    >
                                        <FaMapMarkerAlt className="w-5 h-5"/>
                                        <span>Cairo, Egypt</span>
                                    </a>
                                </motion.div>
                            </section>
                        </OptimizedBlock>
                        <OptimizedBlock className="mb-16" id="resume-section">
                            <section aria-label="Resume Download" className="text-center mb-16">
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 0.3}}
                                >
                                    <ResumeDownloadButton/>
                                </motion.div>
                            </section>
                        </OptimizedBlock>
                        <OptimizedBlock className="mb-16" id="skills-section">
                            <section aria-label="Skills and Expertise" className="mb-16">
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 0.4}}
                                >
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                                        Skills & Expertise
                                    </h2>
                                    {renderSkillsSection}
                                </motion.div>
                            </section>
                        </OptimizedBlock>
                        <OptimizedBlock className="mb-16" id="experience-section">
                            <section aria-label="Professional Experience" className="mb-16">
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 0.5}}
                                >
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                                        Professional Experience
                                    </h2>
                                    {renderExperienceSection}
                                </motion.div>
                            </section>
                        </OptimizedBlock>
                        <OptimizedBlock className="mt-16" id="education-section">
                            <section aria-label="Education" className="mt-16">
                                <motion.div
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 0.6}}
                                >
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                                        Education
                                    </h2>
                                    <div
                                        className="bg-[#e6e6e6]/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-xl">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                                Bachelor of Computer Science
                                            </h3>
                                            <a href='https://fci.bu.edu.eg/' target="_blank" rel="noopener noreferrer"
                                               className="mt-2 text-primary dark:text-primary-light font-semibold hover:underline">
                                                BFCAI
                                            </a>
                                            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                2023 - 2026
                                            </div>
                                            <p className="mt-4 text-gray-700 dark:text-gray-300">
                                                Graduated with honors. Specialized in Software Engineering and
                                                Artificial Intelligence.
                                                Completed multiple research projects in machine learning and data
                                                analysis.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </section>
                        </OptimizedBlock>
                    </div>
                </div>
            </div>
        </>
    );
};
export default memo(About);
