import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SiPython, SiReact, SiDjango, SiDocker, SiPostgresql } from 'react-icons/si';

const SkillBar = ({ skill }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-lg font-medium text-gray-900 dark:text-white">{skill.name}</span>
        <span className="text-lg font-medium text-primary dark:text-primary-light">{skill.percentage}%</span>
      </div>
      <div
        ref={ref}
        className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
      >
        <motion.div
          className={`h-full ${skill.color}`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.percentage}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const SkillCard = ({ Icon, name, level, title, description }) => {
  if (Icon && level !== undefined) {
    // Technical skill card with icon and progress bar
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05 }}
        className="bg-white dark:bg-gray-800 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center space-x-4">
          <Icon className="w-8 h-8 text-primary dark:text-primary-light" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
            <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-primary dark:bg-primary-light h-2 rounded-full transition-all duration-500"
                style={{ width: `${level}%` }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Description card for general skills
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-gray-800 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

const SkillChip = ({ skill }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.05 }}
    className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600"
  >
    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
      {skill}
    </span>
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
  { name: 'Python', percentage: 85, color: 'bg-blue-500' },
  { name: 'React & React Native', percentage: 10, color: 'bg-cyan-500' },
  { name: 'Other Technologies', percentage: 5, color: 'bg-purple-500' },
];

const mainSkills = [
  { Icon: SiPython, name: 'Python', level: 90 },
  { Icon: SiReact, name: 'React', level: 85 },
  { Icon: SiDjango, name: 'Django', level: 88 },
  { Icon: SiDocker, name: 'Docker', level: 80 },
  { Icon: SiPostgresql, name: 'PostgreSQL', level: 85 }
];

const otherSkills = [
  'JavaScript', 'TypeScript', 'Node.js', 'Express', 'MongoDB',
  'Git', 'AWS', 'REST APIs', 'GraphQL', 'TailwindCSS'
];

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="py-20" id="skills">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
          Technical Expertise
        </h2>
        
        {/* Skill Bars */}
        <div className="space-y-8">
          {skills.map((skill, index) => (
            <SkillBar key={index} skill={skill} />
          ))}
        </div>
        
        {/* Skill Areas */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillsData.map((skill, index) => (
            <SkillCard key={index} title={skill.title} description={skill.description} />
          ))}
        </div>

        {/* Main Skills */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Core Technologies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {mainSkills.map((skill, index) => (
              <SkillCard key={index} {...skill} />
            ))}
          </div>
        </div>

        {/* Other Skills */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-8">
            Other Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {otherSkills.map((skill, index) => (
              <SkillChip key={index} skill={skill} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
