import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skills = [
  { name: 'Python', percentage: 85, color: 'bg-blue-500' },
  { name: 'React & React Native', percentage: 10, color: 'bg-cyan-500' },
  { name: 'Other Technologies', percentage: 5, color: 'bg-purple-500' },
];

const SkillBar = ({ skill }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-lg font-medium text-gray-200">{skill.name}</span>
        <span className="text-lg font-medium text-accent">{skill.percentage}%</span>
      </div>
      <div
        ref={ref}
        className="h-4 bg-surface rounded-full overflow-hidden"
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
        className="w-full max-w-4xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Technical Expertise
        </h2>
        <div className="space-y-8">
          {skills.map((skill, index) => (
            <SkillBar key={index} skill={skill} />
          ))}
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="bg-surface-light dark:bg-surface p-6 rounded-lg shadow-light-lg dark:shadow-dark-lg hover:shadow-light-xl dark:hover:shadow-dark-xl transition-all"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-xl font-bold mb-2 text-accent">Backend Development</h3>
            <p className="text-gray-300">Specialized in Python-based backend solutions with FastAPI and Django</p>
          </motion.div>
          
          <motion.div
            className="bg-surface-light dark:bg-surface p-6 rounded-lg shadow-light-lg dark:shadow-dark-lg hover:shadow-light-xl dark:hover:shadow-dark-xl transition-all"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-xl font-bold mb-2 text-accent">Open Source</h3>
            <p className="text-gray-300">Creator of multiple PyPI packages including true-core ecosystem</p>
          </motion.div>
          
          <motion.div
            className="bg-surface-light dark:bg-surface p-6 rounded-lg shadow-light-lg dark:shadow-dark-lg hover:shadow-light-xl dark:hover:shadow-dark-xl transition-all"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-xl font-bold mb-2 text-accent">Leadership</h3>
            <p className="text-gray-300">CEO of Tealim and Snippet, leading technical teams and projects</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
