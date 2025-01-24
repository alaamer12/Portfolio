import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-gray-600 dark:text-gray-300">
            © {currentYear} Amr Muhamed. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            <motion.a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
            >
              <FaGithub className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
            >
              <FaLinkedin className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="mailto:your.email@example.com"
              whileHover={{ scale: 1.1 }}
              className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
            >
              <FaEnvelope className="w-6 h-6" />
            </motion.a>
          </div>

          {/* Quick Links */}
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <a href="/privacy" className="hover:text-primary dark:hover:text-primary-light transition-colors">Privacy Policy</a>
            <span className="mx-2">·</span>
            <a href="/terms" className="hover:text-primary dark:hover:text-primary-light transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
