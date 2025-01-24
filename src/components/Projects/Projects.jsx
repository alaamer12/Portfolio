import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const ProjectCard = ({ title, description, image, darkImage, tags, github, demo, delay }) => {
  const { isDark } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
      className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden shadow-xl"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={isDark && darkImage ? darkImage : image}
          alt={title}
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light rounded-full"
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
              whileHover={{ scale: 1.1 }}
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light"
            >
              <FaGithub className="w-6 h-6" />
            </motion.a>
          )}
          {demo && (
            <motion.a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light"
            >
              <FaExternalLinkAlt className="w-5 h-5" />
            </motion.a>
          )}
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
      tags: ['React', 'Node.js', 'MongoDB', 'Express'],
      github: 'https://github.com/yourusername/tealim',
      demo: 'https://tealim.com',
      delay: 0.2,
    },
    {
      title: 'True Core',
      description: 'A powerful game engine built with C++ and OpenGL.',
      image: '/images/light_true_core_icon.png',
      darkImage: '/images/dark_true_core_icon.png',
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
          className="text-center mb-12 group"
        >
          <motion.h2 
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4 inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="bg-gradient-to-r from-primary via-strawberry to-cherry-pie dark:from-primary-light dark:via-strawberry-light dark:to-cherry-pie-light bg-clip-text text-transparent">
              Featured Projects
            </span>
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300"
            whileHover={{ scale: 1.05, color: '#ffffff' }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Here are some of my notable projects that showcase my skills and experience in web development.
          </motion.p>
        </motion.div>

        <div className="grid cursor-pointer grid-cols-1 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
