import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import tealimImage from '../../../assets/tealim.png';
import trueCoreLight from '../../../assets/light_true_core_icon.png';
import trueCoreDark from '../../../assets/dark_true_core_icon.png';
import { useTheme } from '../../context/ThemeContext';

const ProjectCard = ({ title, description, image, darkImage, tags, github, demo, delay }) => {
  const { isDark } = useTheme();
  const displayImage = darkImage && isDark ? darkImage : image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-surface dark:bg-surface-dark rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-none group"
    >
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Left side - Image */}
        <div className="flex-shrink-0 flex justify-center sm:justify-start">
          <motion.div 
            className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img
              src={displayImage}
              alt={title}
              className="w-auto h-auto max-w-[80%] max-h-[80%] object-contain"
            />
          </motion.div>
        </div>

        {/* Right side - Content */}
        <div className="flex-grow text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-bold mb-2 text-text dark:text-text-light group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
            {title}
          </h3>

          <p className="text-sm sm:text-base text-text/70 dark:text-text-light/70 mb-4 group-hover:text-text/90 dark:group-hover:text-text-light/90 transition-colors">
            {description}
          </p>

          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm rounded-full bg-primary/5 dark:bg-primary-light/5 text-primary/80 dark:text-primary-light/80 group-hover:bg-primary/10 dark:group-hover:bg-primary-light/10 group-hover:text-primary dark:group-hover:text-primary-light transition-all"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex justify-center sm:justify-start space-x-4">
            {github && (
              <motion.a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text/70 dark:text-text-light/70 hover:text-primary dark:hover:text-primary-light transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub className="text-xl" />
              </motion.a>
            )}
            {demo && (
              <motion.a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text/70 dark:text-text-light/70 hover:text-primary dark:hover:text-primary-light transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaExternalLinkAlt className="text-xl" />
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
      description: 'An innovative educational platform designed to enhance the learning experience through interactive content and personalized feedback.',
      image: tealimImage,
      tags: ['React', 'Node.js', 'MongoDB', 'Express'],
      github: 'https://github.com/yourusername/tealim',
      demo: 'https://tealim.com',
      delay: 0.2,
    },
    {
      title: 'True Core',
      description: 'A powerful core library that provides essential utilities and tools for modern web development projects.',
      image: trueCoreLight,
      darkImage: trueCoreDark,
      tags: ['TypeScript', 'Webpack', 'Jest', 'CI/CD'],
      github: 'https://github.com/yourusername/true-core',
      delay: 0.4,
    },
  ];

  return (
    <section className="py-20" id="projects">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12 group cursor-none"
        >
          <motion.h2 
            className="text-4xl font-bold text-text dark:text-text-light mb-4 inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="bg-gradient-to-r from-primary via-strawberry to-cherry-pie dark:from-primary-light dark:via-strawberry-light dark:to-cherry-pie-light bg-clip-text text-transparent">
              Featured Projects
            </span>
          </motion.h2>
          <motion.p 
            className="text-text/70 dark:text-text-light/70 max-w-2xl mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Here are some of my notable projects that showcase my skills and experience in web development.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;