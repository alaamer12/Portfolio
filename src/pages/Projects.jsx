import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import Background from '../components/Background/Background';

const Projects = () => {
  const { isDark } = useTheme();
  const baseUrl = '';

  const trueFamilyProjects = [
    {
      title: 'true-core',
      description: 'The foundation of the True ecosystem. A comprehensive Python library providing essential utilities, design patterns, and core functionality that powers all True family packages.',
      tags: ['Python', 'Core Library', 'Utilities', 'Foundation'],
      github: 'https://github.com/yourusername/true-core',
      demo: 'https://pypi.org/project/true-core',
      type: 'npm',
      icon: isDark ? `${baseUrl}/images/dark_true_core_icon.png` : `${baseUrl}/images/light_true_core_icon.png`,
      banner: `${baseUrl}/tealim.svg`,
      details: [
        'Implements core design patterns and architectural components',
        'Provides extensive utility functions for common programming tasks',
        'Features robust error handling and logging mechanisms',
        'Includes comprehensive type hints and documentation',
        'Supports both synchronous and asynchronous operations'
      ]
    },
    {
      title: 'true-blobs',
      description: 'Advanced binary large object (BLOB) handling library with optimized storage, compression, and streaming capabilities.',
      tags: ['Python', 'Binary Data', 'Storage', 'Compression'],
      github: 'https://github.com/yourusername/true-blobs',
      demo: 'https://pypi.org/project/true-blobs',
      type: 'npm',
      icon: isDark ? `${baseUrl}/images/dark_true_core_icon.png` : `${baseUrl}/images/light_true_core_icon.png`,
      banner: `${baseUrl}/tealim.svg`,
      details: [
        'Efficient streaming of large binary objects',
        'Multiple compression algorithm support',
        'Chunked upload and download capabilities',
        'Automatic memory management for large files',
        'Integration with various storage backends'
      ]
    },
    {
      title: 'true-caching',
      description: 'High-performance caching solution with support for multiple backends, intelligent cache invalidation, and distributed caching.',
      tags: ['Python', 'Caching', 'Performance', 'Redis'],
      github: 'https://github.com/yourusername/true-caching',
      demo: 'https://pypi.org/project/true-caching',
      type: 'npm',
      icon: isDark ? `${baseUrl}/images/dark_true_core_icon.png` : `${baseUrl}/images/light_true_core_icon.png`,
      banner: `${baseUrl}/tealim.svg`,
      details: [
        'Supports multiple caching backends, including Redis and Memcached',
        'Intelligent cache invalidation with automatic cache expiration',
        'Distributed caching for high-availability and scalability',
        'Comprehensive cache statistics and monitoring',
        'Easy integration with popular frameworks and libraries'
      ]
    },
    {
      title: 'true-colorspace',
      description: 'Color manipulation and conversion library supporting multiple color spaces, color matching, and palette generation.',
      tags: ['Python', 'Color Processing', 'Image Processing'],
      github: 'https://github.com/yourusername/true-colorspace',
      demo: 'https://pypi.org/project/true-colorspace',
      type: 'npm',
      icon: isDark ? `${baseUrl}/images/dark_true_core_icon.png` : `${baseUrl}/images/light_true_core_icon.png`,
      banner: `${baseUrl}/tealim.svg`,
      details: [
        'Supports multiple color spaces, including RGB, CMYK, and Lab',
        'Color matching and conversion with high accuracy',
        'Palette generation and color palette manipulation',
        'Comprehensive color space conversion and manipulation',
        'Easy integration with popular image processing libraries'
      ]
    },
    {
      title: 'true-compression',
      description: 'Advanced compression algorithms and utilities for efficient data compression and decompression.',
      tags: ['Python', 'Compression', 'Data Processing'],
      github: 'https://github.com/yourusername/true-compression',
      demo: 'https://pypi.org/project/true-compression',
      type: 'npm',
      icon: isDark ? `${baseUrl}/images/dark_true_core_icon.png` : `${baseUrl}/images/light_true_core_icon.png`,
      banner: `${baseUrl}/tealim.svg`,
      details: [
        'Supports multiple compression algorithms, including gzip, zlib, and lzma',
        'Efficient data compression and decompression',
        'Comprehensive compression utilities and tools',
        'Easy integration with popular data processing libraries',
        'High-performance compression and decompression'
      ]
    },
    {
      title: 'true-enumeration',
      description: 'Enhanced enumeration types with additional functionality, type safety, and serialization support.',
      tags: ['Python', 'Type System', 'Enums'],
      github: 'https://github.com/yourusername/true-enumeration',
      demo: 'https://pypi.org/project/true-enumeration',
      type: 'npm',
      icon: isDark ? `${baseUrl}/images/dark_true_core_icon.png` : `${baseUrl}/images/light_true_core_icon.png`,
      banner: `${baseUrl}/tealim.svg`,
      details: [
        'Enhanced enumeration types with additional functionality',
        'Type safety and serialization support',
        'Comprehensive enumeration utilities and tools',
        'Easy integration with popular type checking libraries',
        'High-performance enumeration operations'
      ]
    },
    {
      title: 'true-generating',
      description: 'Code generation toolkit for creating boilerplate code, documentation, and test cases automatically.',
      tags: ['Python', 'Code Generation', 'Automation'],
      github: 'https://github.com/yourusername/true-generating',
      demo: 'https://pypi.org/project/true-generating',
      type: 'npm',
      icon: isDark ? `${baseUrl}/images/dark_true_core_icon.png` : `${baseUrl}/images/light_true_core_icon.png`,
      banner: `${baseUrl}/tealim.svg`,
      details: [
        'Automated code generation for boilerplate code',
        'Documentation generation and formatting',
        'Test case generation and execution',
        'Comprehensive code generation utilities and tools',
        'Easy integration with popular development tools'
      ]
    },
    {
      title: 'true-logging',
      description: 'Advanced logging system with structured logging, log rotation, and multiple output formats support.',
      tags: ['Python', 'Logging', 'Monitoring'],
      github: 'https://github.com/yourusername/true-logging',
      demo: 'https://pypi.org/project/true-logging',
      type: 'npm',
      icon: isDark ? `${baseUrl}/images/dark_true_core_icon.png` : `${baseUrl}/images/light_true_core_icon.png`,
      banner: `${baseUrl}/tealim.svg`,
      details: [
        'Structured logging with customizable log formats',
        'Log rotation and retention policies',
        'Multiple output formats support, including JSON and CSV',
        'Comprehensive logging utilities and tools',
        'Easy integration with popular monitoring tools'
      ]
    },
    {
      title: 'true-monorepo',
      description: 'Monorepo management tools for maintaining multiple packages with shared dependencies and versioning.',
      tags: ['Python', 'Monorepo', 'Package Management'],
      github: 'https://github.com/yourusername/true-monorepo',
      demo: 'https://pypi.org/project/true-monorepo',
      type: 'npm',
      icon: isDark ? `${baseUrl}/images/dark_true_core_icon.png` : `${baseUrl}/images/light_true_core_icon.png`,
      banner: `${baseUrl}/tealim.svg`,
      details: [
        'Monorepo management tools for multiple packages',
        'Shared dependencies and versioning management',
        'Comprehensive monorepo utilities and tools',
        'Easy integration with popular package managers',
        'High-performance monorepo operations'
      ]
    },
    {
      title: 'true-pipelines',
      description: 'Data processing pipeline framework for building efficient and scalable data transformation workflows.',
      tags: ['Python', 'Data Processing', 'ETL'],
      github: 'https://github.com/yourusername/true-pipelines',
      demo: 'https://pypi.org/project/true-pipelines',
      type: 'npm',
      icon: isDark ? `${baseUrl}/images/dark_true_core_icon.png` : `${baseUrl}/images/light_true_core_icon.png`,
      banner: `${baseUrl}/tealim.svg`,
      details: [
        'Data processing pipeline framework for efficient workflows',
        'Scalable data transformation and processing',
        'Comprehensive pipeline utilities and tools',
        'Easy integration with popular data processing libraries',
        'High-performance pipeline operations'
      ]
    },
    {
      title: 'true-profanity',
      description: 'Content moderation and profanity filtering with support for multiple languages and custom dictionaries.',
      tags: ['Python', 'Content Moderation', 'NLP'],
      github: 'https://github.com/yourusername/true-profanity',
      demo: 'https://pypi.org/project/true-profanity',
      type: 'npm',
      icon: isDark ? `${baseUrl}/images/dark_true_core_icon.png` : `${baseUrl}/images/light_true_core_icon.png`,
      banner: `${baseUrl}/tealim.svg`,
      details: [
        'Content moderation and profanity filtering',
        'Support for multiple languages and custom dictionaries',
        'Comprehensive moderation utilities and tools',
        'Easy integration with popular NLP libraries',
        'High-performance moderation operations'
      ]
    },
    {
      title: 'true-session',
      description: 'Session management library with secure session handling, storage backends, and authentication support.',
      tags: ['Python', 'Security', 'Authentication'],
      github: 'https://github.com/yourusername/true-session',
      demo: 'https://pypi.org/project/true-session',
      type: 'npm',
      icon: isDark ? `${baseUrl}/images/dark_true_core_icon.png` : `${baseUrl}/images/light_true_core_icon.png`,
      banner: `${baseUrl}/tealim.svg`,
      details: [
        'Secure session handling and management',
        'Multiple storage backends support, including Redis and Memcached',
        'Authentication support with customizable authentication mechanisms',
        'Comprehensive session utilities and tools',
        'Easy integration with popular security libraries'
      ]
    },
    {
      title: 'true-storage',
      description: 'Unified storage interface for multiple storage backends with advanced features like versioning and encryption.',
      tags: ['Python', 'Storage', 'Cloud'],
      github: 'https://github.com/yourusername/true-storage',
      demo: 'https://pypi.org/project/true-storage',
      type: 'npm',
      icon: isDark ? `${baseUrl}/images/dark_true_core_icon.png` : `${baseUrl}/images/light_true_core_icon.png`,
      banner: `${baseUrl}/tealim.svg`,
      details: [
        'Unified storage interface for multiple backends',
        'Advanced features like versioning and encryption',
        'Comprehensive storage utilities and tools',
        'Easy integration with popular cloud storage providers',
        'High-performance storage operations'
      ]
    },
    {
      title: 'true-svg',
      description: 'SVG manipulation and generation library with support for animations and dynamic content.',
      tags: ['Python', 'SVG', 'Graphics'],
      github: 'https://github.com/yourusername/true-svg',
      demo: 'https://pypi.org/project/true-svg',
      type: 'npm',
      icon: isDark ? `${baseUrl}/images/dark_true_core_icon.png` : `${baseUrl}/images/light_true_core_icon.png`,
      banner: `${baseUrl}/tealim.svg`,
      details: [
        'SVG manipulation and generation',
        'Support for animations and dynamic content',
        'Comprehensive SVG utilities and tools',
        'Easy integration with popular graphics libraries',
        'High-performance SVG operations'
      ]
    },
    {
      title: 'true-translation',
      description: 'Internationalization and localization framework with automatic translation and format handling.',
      tags: ['Python', 'i18n', 'l10n'],
      github: 'https://github.com/yourusername/true-translation',
      demo: 'https://pypi.org/project/true-translation',
      type: 'npm',
      icon: isDark ? `${baseUrl}/images/dark_true_core_icon.png` : `${baseUrl}/images/light_true_core_icon.png`,
      banner: `${baseUrl}/tealim.svg`,
      details: [
        'Internationalization and localization framework',
        'Automatic translation and format handling',
        'Comprehensive translation utilities and tools',
        'Easy integration with popular i18n libraries',
        'High-performance translation operations'
      ]
    },
    {
      title: 'true-types',
      description: 'Enhanced type system with runtime type checking, validation, and serialization capabilities.',
      tags: ['Python', 'Type System', 'Validation'],
      github: 'https://github.com/yourusername/true-types',
      demo: 'https://pypi.org/project/true-types',
      type: 'npm',
      icon: isDark ? `${baseUrl}/images/dark_true_core_icon.png` : `${baseUrl}/images/light_true_core_icon.png`,
      banner: `${baseUrl}/tealim.svg`,
      details: [
        'Enhanced type system with runtime type checking',
        'Validation and serialization capabilities',
        'Comprehensive type utilities and tools',
        'Easy integration with popular type checking libraries',
        'High-performance type operations'
      ]
    }
  ];

  const utilityProjects = [
    {
      title: 'fastapi-utilities',
      description: 'A comprehensive collection of utilities and extensions for FastAPI framework. Includes advanced routing, middleware, authentication, and performance optimization tools.',
      tags: ['Python', 'FastAPI', 'Web Development', 'API', 'Middleware', 'Authentication'],
      github: 'https://github.com/yourusername/fastapi-utilities',
      demo: 'https://pypi.org/project/fastapi-utilities',
      type: 'npm',
      icon: isDark ? `${baseUrl}/images/dark_true_core_icon.png` : `${baseUrl}/images/light_true_core_icon.png`,
      banner: `${baseUrl}/tealim.svg`,
      details: [
        'Advanced routing and middleware tools',
        'Authentication and authorization mechanisms',
        'Performance optimization and caching tools',
        'Comprehensive utilities and tools for FastAPI development',
        'Easy integration with popular FastAPI libraries'
      ]
    }
  ];

  const businessProjects = [
    {
      title: 'Tealim',
      description: 'Revolutionary E-learning cross-platform solution that transforms online education.',
      tags: ['React', 'Python', 'FastAPI', 'Mobile', 'AI', 'Education', 'Cross-platform'],
      github: 'https://github.com/yourusername/tealim',
      demo: 'https://tealim.com',
      type: 'web',
      icon: `${baseUrl}/images/tealim.png`,
      banner: `${baseUrl}/tealim.svg`,
      details: [
        'Interactive content creation and real-time collaboration',
        'AI-powered personalization and comprehensive analytics',
        'Cross-platform solution for seamless learning experiences',
        'Built with modern technologies for scalability and performance',
        'Easy integration with popular e-learning platforms'
      ]
    },
    {
      title: 'Snippets',
      description: 'Innovative E-market platform for trading code snippets and ready-to-use solutions.',
      tags: ['React', 'Node.js', 'TypeScript', 'E-commerce', 'Developer Tools'],
      github: 'https://github.com/yourusername/snippets',
      demo: 'https://snippets.com',
      type: 'web',
      icon: `${baseUrl}/images/tealim.png`,
      banner: `${baseUrl}/tealim.svg`,
      details: [
        'Automated testing and version control integration',
        'Secure payment processing and monetization tools',
        'Sustainable ecosystem for code reuse and collaboration',
        'Built with modern technologies for scalability and performance',
        'Easy integration with popular developer tools'
      ]
    }
  ];

  const ProjectCard = ({ project }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" bg-[#f9f9f9] dark:bg-surface p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group"
    >
      {/* Banner */}
      {project.banner && (
        <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
          <img
            src={project.banner}
            alt=""
            className="w-full h-full object-cover"
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
  );

  const ProjectSection = ({ title, projects }) => (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden">
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
          >
            <ProjectSection title="Business Projects" projects={businessProjects} />
            <ProjectSection title="True Family Projects" projects={trueFamilyProjects} />
            <ProjectSection title="Utility Projects" projects={utilityProjects} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
