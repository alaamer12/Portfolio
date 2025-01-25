import {  useMemo, useCallback  } from "react";
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import Background from '../components/Background/Background';
import SEO from '../components/SEO/SEO';
import { getProjectsData } from '../data/projects';
import { FaFire } from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';
import { BsClock } from 'react-icons/bs';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const Projects = () => {
  const { isDark } = useTheme();
  const baseUrl = '';
  // Memoize the sorted projects to prevent unnecessary re-sorting
  const { trueFamilyProjects, utilityProjects, businessProjects } = useMemo(() => {
    const { trueFamilyProjects: unsortedTrueFamilyProjects, utilityProjects: unsortedUtilityProjects, businessProjects: unsortedBusinessProjects } = getProjectsData(baseUrl, isDark);
    // Badge priority for sorting
    const badgePriority = {
      'hot': 0,
      'new': 1,
      'coming soon': 2,
      'none': 3
    };
    // Sort function for projects
    const sortProjects = (projects) => {
      return [...projects].sort((a, b) => {
        return badgePriority[a.badge || 'none'] - badgePriority[b.badge || 'none'];
      });
    };
    return {
      trueFamilyProjects: sortProjects(unsortedTrueFamilyProjects),
      utilityProjects: sortProjects(unsortedUtilityProjects),
      businessProjects: sortProjects(unsortedBusinessProjects)
    };
  }, [baseUrl, isDark]);
  // Memoize getBadgeContent to prevent unnecessary re-renders
  const getBadgeContent = useCallback((badge) => {
    switch (badge) {
      case 'hot':
        return {
          icon: <FaFire className="mr-1" />,
          text: 'HOT',
          className: 'bg-gradient-to-r from-orange-500 to-red-500 backdrop-blur-md bg-opacity-90'
        };
      case 'new':
        return {
          icon: <IoSparkles className="mr-1" />,
          text: 'NEW',
          className: 'bg-gradient-to-r from-blue-400 to-cyan-400 backdrop-blur-md bg-opacity-90'
        };
      case 'coming soon':
        return {
          icon: <BsClock className="mr-1" />,
          text: 'SOON',
          className: 'bg-gradient-to-r from-violet-400 to-purple-500 backdrop-blur-md bg-opacity-90'
        };
      default:
        return null;
    }
  }, []);
  // Memoize ProjectCard to prevent unnecessary re-renders
  const ProjectCard = useCallback(({ project }) => {
    const badgeContent = getBadgeContent(project.badge);
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`bg-[#f5f4f4] dark:bg-surface p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group ${!project.available ? 'opacity-75' : ''}`}
      >
        {/* Badge */}
        {badgeContent && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`absolute top-2 sm:top-4 right-2 sm:right-4 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[0.65rem] sm:text-xs font-semibold flex items-center gap-1 sm:gap-1.5 shadow-lg text-white ${badgeContent.className} hover:scale-105 transition-transform duration-200 backdrop-blur-sm`}
          >
            <span className="text-[0.65rem] sm:text-sm">{badgeContent.icon}</span>
            <span className="tracking-wide uppercase">{badgeContent.text}</span>
          </motion.div>
        )}
        {/* Banner */}
        {project.banner && (
          <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
            <LazyLoadImage
              src={project.banner}
              alt=""
              effect="blur"
              className="w-full h-full object-cover"
              threshold={300}
              wrapperClassName="w-full h-full"
            />
          </div>
        )}
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            {project.icon && (
              <LazyLoadImage
                src={project.icon}
                alt={`${project.title} icon`}
                effect="blur"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                threshold={300}
                wrapperClassName="w-10 h-10 sm:w-12 sm:h-12"
              />
            )}
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
          </div>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
            {project.details.map((detail, index) => (
              <div key={index} className="flex items-start">
                <span className="text-primary dark:text-primary-light mr-2">•</span>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{detail}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            {(project.badge === 'hot' || project.badge === 'new') ? (
              <>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-primary hover:bg-primary-light dark:bg-surface dark:hover:bg-primary text-white text-sm sm:text-base rounded-full transition-colors text-center"
                >
                  View on GitHub
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-sm sm:text-base rounded-full transition-colors text-center"
                >
                  Live Demo
                </a>
              </>
            ) : (
              <>
                <button
                  disabled
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm sm:text-base rounded-full cursor-not-allowed opacity-60 text-center"
                >
                  View on GitHub
                </button>
                <button
                  disabled
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm sm:text-base rounded-full cursor-not-allowed opacity-60 text-center"
                >
                  Live Demo
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    );
  }, [getBadgeContent]);
  // Memoize ProjectSection to prevent unnecessary re-renders
  const ProjectSection = useCallback(({ title, projects }) => (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 auto-rows-fr">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </div>
  ), [ProjectCard]);
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden">
      <SEO
        title="Projects"
        description="Explore my portfolio of web development projects, featuring React, Django, and modern web technologies. View my latest work and technical achievements."
        type="website"
        image="/projects-og.png"
      />
      <Background />
      <div className="relative z-10 w-full py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">All Projects</h1>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8 sm:space-y-12 md:space-y-16"
          >
            <ProjectSection title="Business Projects" projects={businessProjects} />
            <ProjectSection title="True Family Projects" projects={trueFamilyProjects} />
            <ProjectSection title="Utility Projects" projects={utilityProjects} />
          </motion.div>
          {/* View More Projects Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 sm:mt-16 flex justify-center"
          >
            <a
              href="https://github.com/alaamer12"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary-light dark:bg-surface dark:hover:bg-primary text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-base sm:text-lg font-semibold"
            >
              <span>View More Projects on GitHub</span>
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default Projects;
