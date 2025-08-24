import { memo } from "react";
import { motion } from "framer-motion";
import {
    FaEnvelope,
    FaGithub,
    FaLinkedin,
    FaMapMarkerAlt,
} from "react-icons/fa";
import { OptimizedBlock, OptimizedLoop } from "../OptimizedMillion";
import useOptimizedAnimation from "../../hooks/useOptimizedAnimation";
import { EXPERIENCE_DATA, SKILLS_DATA } from "../../data/config.jsx";
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

const Header = () => (
    <OptimizedBlock className="mb-16" id="about-header">
        <header className="text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    About Me
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    {USER_CONFIG.personal.bio}
                </p>
            </motion.div>
        </header>
    </OptimizedBlock>
);

const ContactSection = () => (
    <OptimizedBlock className="mb-16" id="about-contact">
        <section aria-label="Contact Information" className="mb-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-6"
            >
                <ContactLink
                    href={`mailto:${USER_CONFIG.contact.email}`}
                    icon={FaEnvelope}
                    text={USER_CONFIG.contact.email}
                />
                <ContactLink
                    href={USER_CONFIG.social.github.url}
                    icon={FaGithub}
                    text="GitHub"
                />
                <ContactLink
                    href={USER_CONFIG.social.linkedin.url}
                    icon={FaLinkedin}
                    text="LinkedIn"
                />
                <ContactLink
                    href={`https://www.google.com/maps?q=${USER_CONFIG.contact.location.city}, ${USER_CONFIG.contact.location.country}`}
                    icon={FaMapMarkerAlt}
                    text={`${USER_CONFIG.contact.location.city}, ${USER_CONFIG.contact.location.country}`}
                />
            </motion.div>
        </section>
    </OptimizedBlock>
);

const ContactLink = ({ href, icon: Icon, text }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
    >
        <Icon className="w-5 h-5" />
        <span>{text}</span>
    </a>
);

const AboutSkillsSection = () => (
    <OptimizedBlock className="mb-16" id="about-skills">
        <section aria-label="Skills and Expertise" className="mb-16">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
            >
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    Skills & Expertise
                </h3>
                <OptimizedLoop
                    items={SKILLS_DATA || []}
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
    <OptimizedBlock className="mb-16" id="about-experience">
        <section aria-label="Professional Experience" className="mb-16">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
            >
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    Professional Experience
                </h3>
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

const EducationSection = () => (
    <OptimizedBlock className="mt-16" id="about-education">
        <section aria-label="Education" className="mt-16">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
            >
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    Education
                </h3>
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
                <EducationSection />
            </div>
        </section>
    );
};

export default memo(About);