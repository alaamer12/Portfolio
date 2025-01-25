import {  memo  } from "react";
import { motion } from 'framer-motion';
const ProjectCard = memo(({ project }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white dark:bg-surface p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group"
  >
    {/* Banner with lazy loading */}
    {project.banner && (
      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
        <img
          src={project.banner}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    )}
    {/* Content */}
    <div className="relative z-10">
      <div className="flex items-center gap-4 mb-4">
        {project.icon && (
          <img
            src={project.icon}
            alt={`${project.title} icon`}
            className="w-12 h-12 object-contain"
            loading="lazy"
          />
        )}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 text-sm bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="space-y-2 mb-4">
        {project.details.map((detail, index) => (
          <div key={index} className="flex items-start">
            <span className="text-primary dark:text-primary-light mr-2">•</span>
            <p className="text-gray-600 dark:text-gray-300">{detail}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-primary hover:bg-primary-light dark:bg-surface dark:hover:bg-primary text-white rounded-full transition-colors"
        >
          View on GitHub
        </a>
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-full transition-colors"
        >
          Live Demo
        </a>
      </div>
    </div>
  </motion.div>
));
ProjectCard.displayName = 'ProjectCard';
export default ProjectCard;
