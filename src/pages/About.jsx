import {memo, useCallback, useState} from "react";
import {motion} from 'framer-motion';
import {FaDownload, FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaSpinner} from 'react-icons/fa';
import Background from '../components/Background/Background';
import SEO from '../components/SEO/SEO';
import {OptimizedBlock, OptimizedLoop} from '../components/OptimizedMillion';
import useOptimizedAnimation from '../hooks/useOptimizedAnimation';
import {EXPERIENCE_DATA, SKILLS_DATA} from "../data/config.js";
import { getAboutPageSchema } from "../data/schema.js";

const ResumeDownloadButton = memo(() => {
    const [isLoading, setIsLoading] = useState(false);
    const handleClick = useCallback(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
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

const SkillIcon = memo(({Icon}) => (
    <Icon className="w-8 h-8 text-primary dark:text-primary-light"/>
));

const SkillName = memo(({name}) => (
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        <span className="hover:underline">{name}</span>
    </h3>
));

const SkillLevel = memo(({level}) => (
    <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <motion.div
            initial={{width: 0}}
            whileInView={{width: `${level}%`}}
            viewport={{once: true}}
            transition={{duration: 1, ease: "easeOut"}}
            className="bg-primary dark:bg-primary-light h-2 rounded-full"
        />
    </div>
));

const SkillDescription = memo(({description}) => (
    <p className="mt-4 text-gray-600 dark:text-gray-300">{description}</p>
));

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
                <SkillIcon Icon={Icon} />
                <div>
                    <SkillName name={name} />
                    <SkillLevel level={level} settings={settings} />
                </div>
            </a>
            <SkillDescription description={description} />
        </motion.div>
    );
});

const ExperienceCard = memo(({title, company, period, description, technologies}) => {
    const {settings} = useOptimizedAnimation();

    return (
        <CardWrapper settings={settings}>
            <TimelineDot settings={settings} />
            <CardContent>
                <CardHeader title={title} company={company} period={period} />
                <CardDescription description={description} />
                <TechnologiesList technologies={technologies} settings={settings} />
            </CardContent>
        </CardWrapper>
    );
});

const CardWrapper = memo(({settings, children}) => (
    <motion.div
        initial={settings.shouldAnimate ? {opacity: 0, x: settings.distance * -1} : {}}
        whileInView={settings.shouldAnimate ? {opacity: 1, x: 0} : {}}
        viewport={{once: true, margin: "50px"}}
        className="relative pl-8 pb-8 border-l-2 border-primary dark:border-primary-light"
    >
        {children}
    </motion.div>
));

const TimelineDot = memo(({settings}) => (
    <motion.div
        className="absolute w-4 h-4 bg-primary dark:bg-primary-light rounded-full -left-[9px] top-0"
        initial={settings.shouldAnimate ? {scale: 0} : {}}
        whileInView={settings.shouldAnimate ? {scale: 1} : {}}
        viewport={{once: true}}
    />
));

const CardContent = memo(({children}) => (
    <div className="bg-[#e6e6e6]/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-xl">
        {children}
    </div>
));

const CardHeader = memo(({title, company, period}) => (
    <>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
        <div className="mt-2 text-primary dark:text-primary-light font-semibold">{company}</div>
        <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{period}</div>
    </>
));

const CardDescription = memo(({description}) => (
    <p className="mt-4 text-gray-700 dark:text-gray-300">{description}</p>
));

const TechnologiesList = memo(({technologies, settings}) => (
    <div className="mt-4 flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
            <TechnologyTag key={index} tech={tech} index={index} settings={settings} />
        ))}
    </div>
));

const TechnologyTag = memo(({tech, index, settings}) => (
    <motion.span
        initial={settings.shouldAnimate ? {opacity: 0, scale: 0.8} : {}}
        whileInView={settings.shouldAnimate ? {opacity: 1, scale: 1} : {}}
        viewport={{once: true}}
        transition={{delay: index * 0.1}}
        className="px-3 py-1 text-sm bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light rounded-full"
    >
        {tech}
    </motion.span>
));

const AboutSeo = () => {
    return (
        <SEO
            title="About Me | Amr Muhamed - Full Stack Developer"
            description="Learn about Amr Muhamed, a Full Stack Developer with expertise in React, Django, and modern web technologies. Discover my professional journey, skills, and experiences in software development."
            type="profile"
            image="/about-og.png"
            keywords="full stack developer, react developer, django developer, fastapi developer, web development, javascript, python, about amr muhamed, developer portfolio, software engineer, cairo, egypt"
            schema={getAboutPageSchema()}
        />
    );
};

const About = () => {
    return (
        <>
            <AboutSeo/>
            <div className="relative min-h-screen w-screen overflow-x-hidden">
                <Background/>
                <MainContent/>
            </div>
        </>
    );
};

const MainContent = () => (
    <div className="relative z-10 w-full pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Header/>
            <ContactSection/>
            <ResumeSection/>
            <SkillsSection/>
            <ExperienceSection/>
            <EducationSection/>
        </div>
    </div>
);

const Header = () => (
    <OptimizedBlock className="mb-16" id="header-section">
        <header className="text-center">
            <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About Me</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Enthusiastic developer with a passion for open-source projects and a growing portfolio of
                    contributions. I've been fortunate to work on various personal and collaborative projects,
                    while also managing my own small business. Always eager to learn and improve my skills.
                </p>
            </motion.div>
        </header>
    </OptimizedBlock>
);

const ContactSection = () => (
    <OptimizedBlock className="mb-16" id="contact-section">
        <section aria-label="Contact Information" className="mb-16">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.2}}
                className="flex flex-wrap justify-center gap-6"
            >
                <ContactLink href="mailto:amrmuhamed86@gmail.com" icon={FaEnvelope} text="amrmuhamed86@gmail.com"/>
                <ContactLink href="https://github.com/alaamer12" icon={FaGithub} text="GitHub"/>
                <ContactLink href="https://www.linkedin.com/in/al-aamer-0b0709265/" icon={FaLinkedin} text="LinkedIn"/>
                <ContactLink href="https://www.google.com/maps?q=Cairo,Egypt" icon={FaMapMarkerAlt}
                             text="Cairo, Egypt"/>
            </motion.div>
        </section>
    </OptimizedBlock>
);

const ContactLink = ({href, icon: Icon, text}) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
    >
        <Icon className="w-5 h-5"/>
        <span>{text}</span>
    </a>
);

const ResumeSection = () => (
    <OptimizedBlock className="mb-16" id="resume-section">
        <section aria-label="Resume Download" className="text-center mb-16">
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.3}}>
                <ResumeDownloadButton/>
            </motion.div>
        </section>
    </OptimizedBlock>
);

const SkillsSection = () => (

    <OptimizedBlock className="mb-16" id="skills-section">
        <section aria-label="Skills and Expertise" className="mb-16">
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.4}}>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    Skills & Expertise
                </h2>
                <OptimizedLoop
                    items={SKILLS_DATA}
                    renderItem={(skill, index) => (
                        <SkillCard key={index} {...skill} />
                    )}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    enableCache={true}
                />
            </motion.div>
        </section>
    </OptimizedBlock>
);

const ExperienceSection = () => (


    <OptimizedBlock className="mb-16" id="experience-section">
        <section aria-label="Professional Experience" className="mb-16">
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.5}}>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    Professional Experience
                </h2>
                <OptimizedLoop
                    items={EXPERIENCE_DATA}
                    renderItem={(exp, index) => (
                        <ExperienceCard key={index} {...exp} />
                    )}
                    className="space-y-6"
                    enableCache={true}
                />
            </motion.div>
        </section>
    </OptimizedBlock>
);

const EducationSection = () => (
    <OptimizedBlock className="mt-16" id="education-section">
        <section aria-label="Education" className="mt-16">
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.6}}>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    Education
                </h2>
                <EducationCard
                    degree="Bachelor of Computer Science"
                    institution="BFCAI"
                    institutionUrl="https://fci.bu.edu.eg/"
                    period="2023 - 2026"
                    description="Graduated with honors. Specialized in Software Engineering and Artificial Intelligence. Completed multiple research projects in machine learning and data analysis."
                />
            </motion.div>
        </section>
    </OptimizedBlock>
);

const EducationCard = ({degree, institution, institutionUrl, period, description}) => (
    <div className="bg-[#e6e6e6]/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{degree}</h3>
        <a href={institutionUrl} target="_blank" rel="noopener noreferrer"
           className="mt-2 text-primary dark:text-primary-light font-semibold hover:underline">
            {institution}
        </a>
        <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{period}</div>
        <p className="mt-4 text-gray-700 dark:text-gray-300">{description}</p>
    </div>
);
export default memo(About);
