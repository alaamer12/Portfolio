import { memo, useState } from "react";
import { motion } from "framer-motion";
import {
    FaEnvelope,
    FaGithub,
    FaLinkedin,
    FaMapMarkerAlt,
} from "react-icons/fa";
import { OptimizedBlock, OptimizedLoop } from "../OptimizedMillion";
import useOptimizedAnimation from "../../hooks/useOptimizedAnimation";
import { EXPERIENCE_DATA, EDUCATION_DATA, SKILLS_DATA } from "../../data/config.jsx";
import { USER_CONFIG } from "../../data/user.js";

const SkillIcon = memo(({ Icon }) => (
    <Icon className="w-8 h-8 text-primary dark:text-primary-light" />
));

const SkillName = memo(({ name }) => (
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        <span className="hover:underline">{name}</span>
    </h3>
));

const SkillDescription = memo(({ description }) => (
    <p className="mt-4 text-gray-600 dark:text-gray-300">{description || 'No description available'}</p>
));

const SkillCard = memo(({ Icon, name, description, url }) => {
    const { settings } = useOptimizedAnimation();

    return (
        <motion.div
            initial={
                settings.shouldAnimate
                    ? { opacity: 0, y: settings.distance }
                    : {}
            }
            whileInView={settings.shouldAnimate ? { opacity: 1, y: 0 } : {}}
            viewport={{ once: true, margin: "50px" }}
            whileHover={settings.shouldAnimate ? { scale: settings.scale } : {}}
            className="bg-[#e6e6e6]/10 cursor-pointer dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-xl"
        >
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4"
            >
                <SkillIcon Icon={Icon} />
                <div>
                    <SkillName name={name} />
                </div>
            </a>
            <SkillDescription description={description} />
        </motion.div>
    );
});

const ExperienceCard = memo(
    ({ title, company, period, description, technologies }) => {
        const { settings } = useOptimizedAnimation();

        return (
            <CardWrapper settings={settings}>
                <TimelineDot settings={settings} />
                <CardContent>
                    <CardHeader
                        title={title}
                        company={company}
                        period={period}
                    />
                    <CardDescription description={description} />
                    <TechnologiesList
                        technologies={technologies}
                        settings={settings}
                    />
                </CardContent>
            </CardWrapper>
        );
    },
);

const CardWrapper = memo(({ settings, children }) => (
    <motion.div
        initial={
            settings.shouldAnimate
                ? { opacity: 0, x: settings.distance * -1 }
                : {}
        }
        whileInView={settings.shouldAnimate ? { opacity: 1, x: 0 } : {}}
        viewport={{ once: true, margin: "50px" }}
        className="relative pl-8 pb-8 border-l-2 border-primary dark:border-primary-light"
    >
        {children}
    </motion.div>
));

const TimelineDot = memo(({ settings }) => (
    <motion.div
        className="absolute w-4 h-4 bg-primary dark:bg-primary-light rounded-full -left-[9px] top-0"
        initial={settings.shouldAnimate ? { scale: 0 } : {}}
        whileInView={settings.shouldAnimate ? { scale: 1 } : {}}
        viewport={{ once: true }}
    />
));

const CardContent = memo(({ children }) => (
    <div className="bg-[#e6e6e6]/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-xl">
        {children}
    </div>
));

const CardHeader = memo(({ title, company, period }) => (
    <>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
        </h3>
        <div className="mt-2 text-primary dark:text-primary-light font-semibold">
            {company}
        </div>
        <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {period}
        </div>
    </>
));

const CardDescription = memo(({ description }) => (
    <p className="mt-4 text-gray-700 dark:text-gray-300">{description || 'No description available'}</p>
));

const TechnologiesList = memo(({ technologies, settings }) => (
    <div className="mt-4 flex flex-wrap gap-2">
        {(technologies || []).map((tech, index) => (
            <TechnologyTag
                key={index}
                tech={tech}
                index={index}
                settings={settings}
            />
        ))}
    </div>
));

const TechnologyTag = memo(({ tech, index, settings }) => (
    <motion.span
        initial={settings.shouldAnimate ? { opacity: 0, scale: 0.8 } : {}}
        whileInView={settings.shouldAnimate ? { opacity: 1, scale: 1 } : {}}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="px-3 py-1 text-sm bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light rounded-full"
    >
        {tech}
    </motion.span>
));

const AboutHighlights = memo(() => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-8 max-w-4xl mx-auto"
    >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 auto-cols-fr">
            {USER_CONFIG.aboutHighlights?.map((highlight, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start space-x-3 w-full"
                >
                    <div className="flex-shrink-0 w-2 h-2 bg-primary dark:bg-primary-light rounded-full mt-2"></div>
                    <p className="text-gray-700 dark:text-gray-300 text-left flex-1 leading-relaxed">
                        {highlight}
                    </p>
                </motion.div>
            ))}
        </div>
    </motion.div>
));

const Header = () => (
    <OptimizedBlock className="mb-32 md:mb-48" id="about-header">
        <header className="text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    About Me
                </h2>
                <div className="max-w-4xl mx-auto">
                    <p className="text-xl text-gray-600 dark:text-gray-300 text-left leading-relaxed">
                        {USER_CONFIG.personal.bio}
                    </p>
                </div>
                <AboutHighlights />
            </motion.div>
        </header>
    </OptimizedBlock>
);

const ContactSection = () => (
    <OptimizedBlock className="mb-32 md:mb-48" id="about-contact">
        <section aria-label="Contact Information" className="mb-32 md:mb-48">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
            >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                    Let's Connect
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-8 max-w-2xl mx-auto">
                    Feel free to reach out through any of these channels. I'm always open to discussing new opportunities and interesting projects.
                </p>
                <div className="flex flex-wrap justify-center gap-20 md:gap-26">
                    <ContactLink
                        href={`mailto:${USER_CONFIG.contact.email}`}
                        icon={FaEnvelope}
                        text={USER_CONFIG.contact.email}
                        delay={0.1}
                    />
                    <ContactLink
                        href={USER_CONFIG.social.github.url}
                        icon={FaGithub}
                        text="GitHub"
                        delay={0.2}
                    />
                    <ContactLink
                        href={USER_CONFIG.social.linkedin.url}
                        icon={FaLinkedin}
                        text="LinkedIn"
                        delay={0.3}
                    />
                    <ContactLink
                        href={`https://www.google.com/maps?q=${USER_CONFIG.contact.location.city}, ${USER_CONFIG.contact.location.country}`}
                        icon={FaMapMarkerAlt}
                        text={`${USER_CONFIG.contact.location.city}, ${USER_CONFIG.contact.location.country}`}
                        delay={0.4}
                    />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 text-center"
                >
                    <button
                        onClick={() => {
                            const contactSection = document.getElementById('contact');
                            contactSection?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center px-8 py-3 bg-primary hover:bg-primary/90 dark:bg-primary-light dark:hover:bg-primary-light/90 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        <FaEnvelope className="w-5 h-5 mr-2" />
                        Contact Me
                    </button>
                </motion.div>
            </motion.div>
        </section>
    </OptimizedBlock>
);

const ContactLink = ({ href, icon: Icon, text, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        className="flex flex-col items-center group"
    >
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block mb-3 transition-transform duration-300 hover:scale-105"
        >
            <div className="w-16 h-16 rounded-full border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center bg-white/5 dark:bg-gray-800/20 backdrop-blur-sm group-hover:border-primary dark:group-hover:border-primary-light transition-colors duration-300">
                <Icon className="w-7 h-7 text-gray-600 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300" />
            </div>
        </a>
        <span className="text-sm text-gray-600 dark:text-gray-300 text-center max-w-[120px] leading-tight group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300">
            {text}
        </span>
    </motion.div>
);

const SkillChip = ({ skill, url }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600"
    >
        <a href={url} target="_blank" rel="noopener noreferrer"
            className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {skill}
        </a>
    </motion.div>
);

const RegularSkillCard = ({ title, description }) => {
    const { settings } = useOptimizedAnimation();

    return (
        <motion.div
            initial={
                settings.shouldAnimate
                    ? { opacity: 0, y: settings.distance }
                    : {}
            }
            whileInView={settings.shouldAnimate ? { opacity: 1, y: 0 } : {}}
            viewport={{ once: true, margin: "50px" }}
            whileHover={settings.shouldAnimate ? { scale: settings.scale } : {}}
            className="bg-[#e6e6e6]/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-xl"
        >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </motion.div>
    );
};

const specializedSkills = [
    {
        title: "Data Engineering",
        description: "Expert in building scalable ETL/ELT pipelines and data processing workflows"
    },
    {
        title: "Machine Learning",
        description: "Specialized in ML model development, training, and deployment for analytics applications"
    },
    {
        title: "Data Visualization",
        description: "Creating interactive dashboards and rich-terminal visualizations for data insights"
    }
];

const additionalSkills = [
    { name: 'PyTorch', url: 'https://pytorch.org/' },
    { name: 'TensorFlow', url: 'https://www.tensorflow.org/' },
    { name: 'scikit-learn', url: 'https://scikit-learn.org/' },
    { name: 'Plotly', url: 'https://plotly.com/' },
    { name: 'Chart.js', url: 'https://www.chartjs.org/' },
    { name: 'Streamlit', url: 'https://streamlit.io/' },
    { name: 'Jupyter', url: 'https://jupyter.org/' },
    { name: 'MongoDB', url: 'https://www.mongodb.com/' },
    { name: 'Supabase', url: 'https://supabase.com/' },
    { name: 'PostgreSQL', url: 'https://www.postgresql.org/' },
    { name: 'Redis', url: 'https://redis.io/' },
    { name: 'Docker', url: 'https://www.docker.com/' },
    { name: 'Git', url: 'https://git-scm.com/' },
    { name: 'Web Scraping', url: 'https://en.wikipedia.org/wiki/Web_scraping' },
    { name: 'ETL Pipelines', url: 'https://en.wikipedia.org/wiki/Extract,_transform,_load' },
    { name: 'Data Warehousing', url: 'https://en.wikipedia.org/wiki/Data_warehouse' },
    { name: 'Statistical Analysis', url: 'https://en.wikipedia.org/wiki/Statistics' },
];

const AboutSkillsSection = () => (
    <OptimizedBlock className="mb-32 md:mb-48" id="about-skills">
        <section aria-label="Skills and Expertise" className="mb-32 md:mb-48">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
            >
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                    Skills & Expertise
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-8 max-w-2xl mx-auto">
                    A comprehensive overview of my technical skills, specialized areas, and the technologies I work with to deliver exceptional results.
                </p>

                {/* Core Technologies */}
                <div className="mb-12">
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Core Technologies</h4>
                    <OptimizedLoop
                        items={SKILLS_DATA || []}
                        renderItem={(skill, index) => (
                            <SkillCard key={index} {...skill} />
                        )}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        enableCache={true}
                    />
                </div>

                {/* Specialized Areas */}
                <div className="mb-12">
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Specialized Areas</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {specializedSkills.map((skill, index) => (
                            <RegularSkillCard key={`specialized-${index}`} {...skill} />
                        ))}
                    </div>
                </div>

                {/* Additional Technologies */}
                <div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Additional Technologies</h4>
                    <div className="flex flex-wrap gap-4">
                        {additionalSkills.map((skill, index) => (
                            <SkillChip key={`additional-${index}`} skill={skill.name} url={skill.url} />
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    </OptimizedBlock>
);

const ExperienceSection = () => (
    <OptimizedBlock className="mb-32 md:mb-48" id="about-experience">
        <section aria-label="Professional Experience" className="mb-32 md:mb-48">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
            >
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                    Professional Experience
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-8 max-w-2xl mx-auto">
                    My journey through various roles and projects, showcasing growth, leadership, and technical expertise across different domains.
                </p>
                <OptimizedLoop
                    items={EXPERIENCE_DATA || []}
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

const TrainingSection = () => (
    <OptimizedBlock className="mb-32 md:mb-48" id="about-training">
        <section aria-label="Training" className="mb-32 md:mb-48">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
            >
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                    Training
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-8 max-w-2xl mx-auto">
                    Academic programs, internships, and specialized training that have shaped my technical expertise and professional development.
                </p>
                <OptimizedLoop
                    items={EDUCATION_DATA || []}
                    renderItem={(edu, index) => (
                        <ExperienceCard key={index} {...edu} />
                    )}
                    className="space-y-6"
                    enableCache={true}
                />
            </motion.div>
        </section>
    </OptimizedBlock>
);

const EducationSection = () => (
    <OptimizedBlock className="mt-32 md:mt-48" id="about-education">
        <section aria-label="Education" className="mt-32 md:mt-48">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
            >
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                    Academic Background
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-8 max-w-2xl mx-auto">
                    My academic foundation in computer science and artificial intelligence, providing the theoretical knowledge that supports my practical expertise.
                </p>
                <EducationCard
                    degree={USER_CONFIG.education.degree}
                    institution={USER_CONFIG.education.institution}
                    institutionUrl={USER_CONFIG.education.institutionUrl}
                    period={`${USER_CONFIG.education.startYear} - ${USER_CONFIG.education.endYear}`}
                    description={`${USER_CONFIG.education.fieldOfStudy} program with focus on modern computing technologies and artificial intelligence.`}
                />
            </motion.div>
        </section>
    </OptimizedBlock>
);

const EducationCard = ({
    degree,
    institution,
    institutionUrl,
    period,
    description,
}) => (
    <div className="bg-[#e6e6e6]/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {degree}
        </h3>
        <a
            href={institutionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-primary dark:text-primary-light font-semibold hover:underline"
        >
            {institution}
        </a>
        <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {period}
        </div>
        <p className="mt-4 text-gray-700 dark:text-gray-300">{description}</p>
    </div>
);

const About = () => {
    return (
        <section id="about" className="py-32 md:py-48">
            <div className="container px-4 mx-auto">
                <Header />
                <ContactSection />
                <AboutSkillsSection />
                <ExperienceSection />
                <TrainingSection />
                <EducationSection />
            </div>
        </section>
    );
};

export default memo(About);