import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import heroImage from '../../../assets/hero.png';
import ShimmerEffect from './ShimmerEffect';

const StatBox = ({ number, text, delay, color }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className="text-center group cursor-none"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.div 
      className={`text-4xl font-bold ${color} transition-all duration-300 group-hover:text-strawberry dark:group-hover:text-strawberry-light`}
      whileHover={{ y: -2 }}
    >
      {number}
    </motion.div>
    <motion.div 
      className="text-sm text-text dark:text-text-light transition-all duration-300 group-hover:text-cherry-pie dark:group-hover:text-cherry-pie-light"
      whileHover={{ y: 2 }}
    >
      {text}
    </motion.div>
  </motion.div>
);

const Hero = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center py-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left"
          >
            <h1 className="text-6xl md:text-7xl font-bold relative">
              <span className="inline-block animate-gradient-flow bg-gradient-to-r from-primary via-strawberry to-cherry-pie dark:from-primary-light dark:via-strawberry-light dark:to-cherry-pie-light bg-clip-text text-transparent">
                Amr{' '}
                <span className="inline-block animate-gradient-flow bg-gradient-to-r from-cherry-pie via-accent to-strawberry dark:from-cherry-pie-light dark:via-accent-light dark:to-strawberry-light bg-clip-text text-transparent">
                  Muhamed
                </span>
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-text dark:text-text-light font-light">
              Python and Backend Expert
            </h2>
            
            <div className="flex justify-center lg:justify-start space-x-16">
              <StatBox 
                number="200+" 
                text="GitHub Repositories" 
                delay={0.2} 
                color="text-primary"
              />
              <StatBox 
                number="85%" 
                text="Python Projects" 
                delay={0.4} 
                color="text-accent"
              />
              <StatBox 
                number="10+" 
                text="PyPI Packages" 
                delay={0.6} 
                color="text-primary"
              />
            </div>

            <div className="flex justify-center lg:justify-start space-x-4">
              <motion.a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-text dark:text-text-light hover:text-primary dark:hover:text-primary transition-colors cursor-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl text-text dark:text-text-light hover:text-primary dark:hover:text-primary transition-colors cursor-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaLinkedin />
              </motion.a>
            </div>
          </motion.div>

          {/* Right side - Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mt-8 lg:mt-0"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-strawberry/20 to-cherry-pie/20 dark:from-strawberry-dark/20 dark:to-cherry-pie-dark/20 rounded-3xl filter blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src={heroImage}
                  alt="Amr Muhamed"
                  className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-full h-auto mx-auto rounded-3xl shadow-xl"
                />
                <motion.div 
                  className="absolute inset-0"
                  initial="hidden"
                  whileHover="visible"
                >
                  <ShimmerEffect />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;