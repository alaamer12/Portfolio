import React, { memo, useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaDownload, FaSpinner } from 'react-icons/fa';
import { SiPython, SiReact, SiDjango, SiDocker, SiPostgresql } from 'react-icons/si';
import Background from '../components/Background/Background';
import SEO from '../components/SEO/SEO';

const ResumeDownloadButton = memo(() => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      window.open('/resume.pdf', '_blank');
    }, 3000);
  }, []);

  return (
    <motion.button
      onClick={handleClick}
      className="inline-flex items-center px-6 py-3 bg-primary dark:bg-primary-light text-white rounded-full text-lg font-semibold"
      aria-label="Download Resume"
      disabled={isLoading}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isLoading ? (
        <FaSpinner className="mr-2 animate-spin" aria-hidden="true" />
      ) : (
        <FaDownload className="mr-2" aria-hidden="true" />
      )}
      {isLoading ? 'Loading...' : 'Download Resume'}
    </motion.button>
  );
});

// Memoize static data
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
    level: 90,
    description: 'Proficient in building scalable web applications using Django and Django REST Framework.',
    url: 'https://www.djangoproject.com/'
  },
  {
    Icon: SiReact,
    name: 'React',
    level: 85,
    description: 'Strong frontend development skills with React, including modern hooks and state management.',
    url: 'https://reactjs.org/'
  },
  {
    Icon: SiDocker,
    name: 'Docker',
    level: 80,
    description: 'Experienced in containerization and orchestration using Docker and Docker Compose.',
    url: 'https://www.docker.com/'
  },
  {
    Icon: SiPostgresql,
    name: 'PostgreSQL',
    level: 85,
    description: 'Expert in database design, optimization, and management with PostgreSQL.',
    url: 'https://www.postgresql.org/'
  }
];

// Memoize static components
const SkillCard = memo(({ Icon, name, level, description, url }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05 }}
    className="bg-[#e6e6e6]/10 cursor-pointer dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-xl"
  >
    <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4">
      <Icon className="w-8 h-8 text-primary dark:text-primary-light" />
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          <span className="hover:underline">
            {name}
          </span>
        </h3>
        <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-primary dark:bg-primary-light h-2 rounded-full transition-all duration-500"
            style={{ width: `${level}%` }}
          />
        </div>
      </div>
    </a>
    <p className="mt-4 text-gray-600 dark:text-gray-300">{description}</p>
  </motion.div>
));

const ExperienceCard = memo(({ title, company, period, description, technologies }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="relative pl-8 pb-8 border-l-2 border-primary dark:border-primary-light"
  >
    <div className="absolute w-4 h-4 bg-primary dark:bg-primary-light rounded-full -left-[9px] top-0" />
    <div className="bg-[#e6e6e6]/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-xl">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
      <div className="mt-2 text-primary dark:text-primary-light font-semibold">{company}</div>
      <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">{period}</div>
      <p className="mt-4 text-gray-700 dark:text-gray-300">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 text-sm bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
));

const EXPERIENCE_DATA = [
  {
    title: 'Senior Backend Developer',
    company: 'Tech Solutions Inc.',
    period: '2021 - Present',
    description: 'Leading the backend development team in building scalable microservices architecture. Implemented CI/CD pipelines and improved system performance by 40%.',
    technologies: ['Python', 'Django', 'Docker', 'AWS', 'PostgreSQL', 'Redis']
  },
  {
    title: 'Full Stack Developer',
    company: 'Innovation Labs',
    period: '2019 - 2021',
    description: 'Developed and maintained multiple web applications. Reduced server response time by 60% through optimization and caching strategies.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'GraphQL']
  },
  {
    title: 'Software Engineer',
    company: 'StartUp Vision',
    period: '2018 - 2019',
    description: 'Built RESTful APIs and implemented real-time features using WebSockets. Mentored junior developers and conducted code reviews.',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'WebSockets']
  }
];

const About = () => {
  // Memoize sections to prevent unnecessary re-renders
  const renderSkillsSection = useMemo(() => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {SKILLS_DATA.map((skill, index) => (
        <SkillCard key={index} {...skill} />
      ))}
    </div>
  ), []);

  const renderExperienceSection = useMemo(() => (
    <div className="space-y-6">
      {EXPERIENCE_DATA.map((exp, index) => (
        <ExperienceCard key={index} {...exp} />
      ))}
    </div>
  ), []);

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
              "https://linkedin.com/in/alaamer12"
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
        <Background />
        <div className="relative z-10 w-full pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <header className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  About Me
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Enthusiastic developer with a passion for open-source projects and a growing portfolio of 
                  contributions. I've been fortunate to work on various personal and collaborative projects, 
                  while also managing my own small business. Always eager to learn and improve my skills.
                </p>
              </motion.div>
            </header>

            {/* Contact Information */}
            <section aria-label="Contact Information" className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-6"
              >
                <a
                  href="mailto:amrmuhamed86@example.com"
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  <FaEnvelope className="w-5 h-5" />
                  <span>amrmuhamed86@example.com</span>
                </a>
                <a
                  href="https://github.com/alaamer12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  <FaGithub className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/alaamer12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  <FaLinkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <FaMapMarkerAlt className="w-5 h-5" />
                  <span>Cairo, Egypt</span>
                </div>
              </motion.div>
            </section>

            {/* Download Resume Button */}
            <section aria-label="Resume Download" className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <ResumeDownloadButton />
              </motion.div>
            </section>

            {/* Skills Section */}
            <section aria-label="Skills and Expertise" className="mb-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Skills & Expertise
                </h2>
                {renderSkillsSection}
              </motion.div>
            </section>

            {/* Experience Section */}
            <section aria-label="Professional Experience" className="mb-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Professional Experience
                </h2>
                {renderExperienceSection}
              </motion.div>
            </section>

            {/* Education Section */}
            <section aria-label="Education" className="mt-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                  Education
                </h2>
                <div className="bg-[#e6e6e6]/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-6 shadow-xl">
                  <a href='https://fci.bu.edu.eg/' target="_blank" rel="noopener noreferrer" > 
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Bachelor of Computer Science
                    </h3>
                    <a href='https://fci.bu.edu.eg/' target="_blank" rel="noopener noreferrer"  className="mt-2 text-primary dark:text-primary-light font-semibold">
                      BFCAI
                    </a>
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      2023 - 2026
                    </div>
                    <p className="mt-4 text-gray-700 dark:text-gray-300">
                      Graduated with honors. Specialized in Software Engineering and Artificial Intelligence.
                      Completed multiple research projects in machine learning and data analysis.
                    </p>
                  </a>
                </div>
              </motion.div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(About);
