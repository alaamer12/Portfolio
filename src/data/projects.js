
import { USER_CONFIG } from "./user";

/**
 * Centralized projects configuration
 * This file contains all project data and configurations
 */

// Project categories configuration
export const PROJECT_CATEGORIES = {
  BUSINESS: {
    id: 'business',
    title: 'Business Projects',
    description: 'Professional business applications and platforms',
    order: 1
  },
  PYTHON: {
    id: 'python',
    title: 'Python Projects',
    description: 'Specialized Python applications and automation tools',
    order: 2
  },
  TRUE_FAMILY: {
    id: 'truefamily',
    title: 'True Family Projects',
    description: 'Ecosystem of Python packages and libraries',
    order: 3
  },
  UTILITY: {
    id: 'utility',
    title: 'Utility Projects',
    description: 'Tools and utilities for developers',
    order: 4
  },
  OPEN_SOURCE: {
    id: 'opensource',
    title: 'Open Source Contributions',
    description: 'Community contributions and open source projects',
    order: 5
  }
};

// Badge configurations
export const PROJECT_BADGES = {
  HOT: {
    id: 'hot',
    text: 'HOT',
    className: 'bg-gradient-to-r from-orange-500 to-red-500 backdrop-blur-md bg-opacity-90',
    priority: 0
  },
  NEW: {
    id: 'new',
    text: 'NEW',
    className: 'bg-gradient-to-r from-blue-400 to-cyan-400 backdrop-blur-md bg-opacity-90',
    priority: 1
  },
  COMING_SOON: {
    id: 'coming_soon',
    text: 'SOON',
    className: 'bg-gradient-to-r from-violet-400 to-purple-500 backdrop-blur-md bg-opacity-90',
    priority: 2
  },
  NONE: {
    id: 'none',
    text: '',
    className: '',
    priority: 3
  }
};

// Project data
export const PROJECTS_DATA = {
  // Business Projects
  tealim: {
    id: 'tealim',
    title: 'Tealim',
    description: 'Revolutionary E-learning cross-platform solution that transforms online education.',
    longDescription: 'A comprehensive e-learning platform built with React Native and FastAPI, featuring interactive content creation, real-time collaboration, and cross-platform compatibility.',
    category: PROJECT_CATEGORIES.BUSINESS.id,
    tags: ['React Native', 'Python', 'FastAPI', 'Mobile', 'Education', 'Cross-platform'],
    technologies: ['React Native', 'Node.js', 'PostgreSQL', 'Fastapi'],
    links: {
      github: 'https://github.com/alaamer12/tealim',
      demo: 'https://tealim.com',
      pypi: null
    },
    images: {
      icon: '/images/tealim.webp',
      banner: '/tealim.svg',
      screenshots: []
    },
    badge: PROJECT_BADGES.COMING_SOON.id,
    available: true,
    featured: true,
    details: [
      'Interactive content creation and real-time collaboration',
      'Cross-platform solution for seamless learning experiences',
      'Built with modern technologies for scalability and performance',
      'A Lead in the E-learning space with cutting-edge features'
    ],
    delay: 0.2
  },

  snippets: {
    id: 'snippets',
    title: 'Snippets',
    description: 'Innovative E-market platform for trading code snippets and ready-to-use solutions.',
    longDescription: 'A marketplace for developers to buy and sell code snippets, featuring automated testing, version control integration, and secure payment processing.',
    category: PROJECT_CATEGORIES.BUSINESS.id,
    tags: ['React', 'PostgreSQL', 'Fastapi', 'E-Trading', 'Fast Access', 'Developer Tools'],
    technologies: ['React', 'PostgreSQL', 'FastAPI'],
    links: {
      github: 'https://github.com/alaamer12/snippets',
      demo: 'https://snippets.com',
      pypi: null
    },
    images: {
      icon: '/images/screens/screenshot.PNG',
      banner: '/tealim.svg',
      screenshots: []
    },
    badge: PROJECT_BADGES.COMING_SOON.id,
    available: false,
    featured: false,
    details: [
      'Automated testing and version control integration',
      'Secure payment processing and monetization tools',
      'Sustainable ecosystem for code reuse and collaboration',
      'Built with modern technologies for scalability and performance'
    ],
    delay: 0.4
  },

  // Python Projects
  dataAnalyzer: {
    id: 'data_analyzer',
    title: 'Data Analyzer Pro',
    description: 'Advanced Python tool for data analysis and visualization with pandas and matplotlib.',
    longDescription: 'A comprehensive data analysis tool built with Python, featuring automated data cleaning, statistical analysis, and interactive visualizations.',
    category: PROJECT_CATEGORIES.PYTHON.id,
    tags: ['Python', 'Data Analysis', 'Pandas', 'Matplotlib', 'Statistics', 'Visualization'],
    technologies: ['Python', 'Pandas', 'Matplotlib', 'NumPy', 'Seaborn'],
    links: {
      github: 'https://github.com/alaamer12/data-analyzer-pro',
      demo: null,
      pypi: 'https://pypi.org/project/data-analyzer-pro'
    },
    images: {
      icon: '/images/python-icon.webp',
      darkIcon: '/images/python-icon-dark.webp',
      banner: '/python-banner.svg',
      screenshots: []
    },
    badge: PROJECT_BADGES.NEW.id,
    available: true,
    featured: true,
    details: [
      'Automated data cleaning and preprocessing',
      'Statistical analysis with comprehensive reporting',
      'Interactive visualizations and charts',
      'Export results in multiple formats (CSV, JSON, PDF)'
    ],
    delay: 0.2
  },

  automationSuite: {
    id: 'automation_suite',
    title: 'Python Automation Suite',
    description: 'Collection of Python scripts for automating daily tasks and workflows.',
    longDescription: 'A comprehensive suite of Python automation tools for file management, web scraping, email automation, and system monitoring.',
    category: PROJECT_CATEGORIES.PYTHON.id,
    tags: ['Python', 'Automation', 'Scripting', 'Web Scraping', 'File Management', 'Scheduling'],
    technologies: ['Python', 'Selenium', 'BeautifulSoup', 'Schedule', 'Requests'],
    links: {
      github: 'https://github.com/alaamer12/python-automation-suite',
      demo: null,
      pypi: null
    },
    images: {
      icon: '/images/automation-icon.webp',
      darkIcon: '/images/automation-icon-dark.webp',
      banner: '/automation-banner.svg',
      screenshots: []
    },
    badge: PROJECT_BADGES.HOT.id,
    available: true,
    featured: false,
    details: [
      'File organization and batch processing',
      'Web scraping with intelligent rate limiting',
      'Email automation with template support',
      'System monitoring and alerting'
    ],
    delay: 0.4
  },

  // True Family Projects
  trueCore: {
    id: 'true_core',
    title: 'true-core',
    description: 'The foundation of the True ecosystem. A comprehensive Python library providing essential utilities, design patterns, and core functionality.',
    longDescription: 'Core foundation library that powers all True family packages with essential utilities, design patterns, and robust functionality.',
    category: PROJECT_CATEGORIES.TRUE_FAMILY.id,
    tags: ['Python', 'Core Library', 'Utilities', 'Foundation'],
    technologies: ['Python', 'Pypi', 'Boilerplate', 'Utility'],
    links: {
      github: 'https://github.com/alaamer12/true-core',
      demo: null,
      pypi: 'https://pypi.org/project/true-core'
    },
    images: {
      icon: '/images/light_true_core_icon.avif',
      darkIcon: '/images/dark_true_core_icon.avif',
      banner: '/tealim.svg',
      screenshots: []
    },
    badge: PROJECT_BADGES.HOT.id,
    available: true,
    featured: true,
    details: [
      'Implements core design patterns and architectural components',
      'Provides extensive utility functions for common programming tasks',
      'Features robust error handling and logging mechanisms',
      'Includes comprehensive type hints and documentation'
    ],
    delay: 0.2
  },

  trueStorage: {
    id: 'true_storage',
    title: 'true-storage',
    description: 'Unified storage interface for multiple storage backends with advanced features like versioning and encryption.',
    longDescription: 'Advanced storage management solution with support for multiple backends, versioning, and encryption capabilities.',
    category: PROJECT_CATEGORIES.TRUE_FAMILY.id,
    tags: ['Python', 'Storage', 'Cloud'],
    technologies: ['Python', 'Storage', 'Cloud'],
    links: {
      github: 'https://github.com/alaamer12/true-storage',
      demo: null,
      pypi: 'https://pypi.org/project/true-storage'
    },
    images: {
      icon: '/images/light_true_core_icon.avif',
      darkIcon: '/images/dark_true_core_icon.avif',
      banner: '/tealim.svg',
      screenshots: []
    },
    badge: PROJECT_BADGES.NEW.id,
    available: true,
    featured: false,
    details: [
      'Unified storage interface for multiple backends',
      'Advanced features like versioning and encryption',
      'Comprehensive storage utilities and tools',
      'Easy integration with popular cloud storage providers'
    ],
    delay: 0.4
  },

  trueLogging: {
    id: 'true_logging',
    title: 'true-logging',
    description: 'Advanced logging system with structured logging, log rotation, and multiple output formats support.',
    longDescription: 'Comprehensive logging solution with structured logging, rotation policies, and multiple output format support.',
    category: PROJECT_CATEGORIES.TRUE_FAMILY.id,
    tags: ['Python', 'Logging', 'Monitoring'],
    technologies: ['Python', 'Logging', 'Monitoring'],
    links: {
      github: 'https://github.com/alaamer12/true-logging',
      demo: null,
      pypi: 'https://pypi.org/project/true-logging'
    },
    images: {
      icon: '/images/light_true_core_icon.avif',
      darkIcon: '/images/dark_true_core_icon.avif',
      banner: '/tealim.svg',
      screenshots: []
    },
    badge: PROJECT_BADGES.COMING_SOON.id,
    available: true,
    featured: false,
    details: [
      'Structured logging with customizable log formats',
      'Log rotation and retention policies',
      'Multiple output formats support including JSON and CSV',
      'Easy integration with popular monitoring tools'
    ],
    delay: 0.6
  },

  // Utility Projects
  fastapiUtilities: {
    id: 'fastapi_utilities',
    title: 'fastapi-utilities',
    description: 'A comprehensive collection of utilities and extensions for FastAPI framework.',
    longDescription: 'Extended functionality and utilities for FastAPI development including middleware, authentication, and performance tools.',
    category: PROJECT_CATEGORIES.UTILITY.id,
    tags: ['Python', 'FastAPI', 'Web Development', 'API', 'Middleware', 'Authentication'],
    technologies: ['Python', 'FastAPI', 'Web Development'],
    links: {
      github: 'https://github.com/alaamer12/fastapi-utilities',
      demo: null,
      pypi: 'https://pypi.org/project/fastapi-utilities'
    },
    images: {
      icon: '/images/light_true_core_icon.avif',
      darkIcon: '/images/dark_true_core_icon.avif',
      banner: '/tealim.svg',
      screenshots: []
    },
    badge: PROJECT_BADGES.COMING_SOON.id,
    available: true,
    featured: false,
    details: [
      'Advanced routing and middleware tools',
      'Authentication and authorization mechanisms',
      'Performance optimization and caching tools',
      'Easy integration with popular FastAPI libraries'
    ],
    delay: 0.2
  }
};

// Helper functions
export const getProjectsByCategory = (categoryId) => {
  return Object.values(PROJECTS_DATA).filter(project => project.category === categoryId);
};

export const getFeaturedProjects = () => {
  return Object.values(PROJECTS_DATA).filter(project => project.featured);
};

export const getProjectById = (id) => {
  return PROJECTS_DATA[id];
};

export const getAllProjects = () => {
  return Object.values(PROJECTS_DATA);
};

export const sortProjectsByBadge = (projects) => {
  return [...projects].sort((a, b) => {
    const aPriority = PROJECT_BADGES[a.badge?.toUpperCase()] || PROJECT_BADGES.NONE;
    const bPriority = PROJECT_BADGES[b.badge?.toUpperCase()] || PROJECT_BADGES.NONE;
    return aPriority.priority - bPriority.priority;
  });
};

export const getProjectsByBadge = (badgeId) => {
  return Object.values(PROJECTS_DATA).filter(project => project.badge === badgeId);
};

export const getBadgeConfig = (badgeId) => {
  return PROJECT_BADGES[badgeId?.toUpperCase()] || PROJECT_BADGES.NONE;
};

export const getCategoryConfig = (categoryId) => {
  return Object.values(PROJECT_CATEGORIES).find(cat => cat.id === categoryId);
};

// Get all categories sorted by order
export const getSortedCategories = () => {
  return Object.values(PROJECT_CATEGORIES).sort((a, b) => a.order - b.order);
};

// Get projects data organized by all categories dynamically
export const getProjectsDataByCategories = (baseUrl = '', isDark = false) => {
  console.log('getProjectsDataByCategories called with:', { baseUrl, isDark });

  const processProject = (project) => ({
    ...project,
    image: project.images?.icon || '',
    darkImage: project.images?.darkIcon || '',
    banner: project.images?.banner || '',
    screenshots: project.images?.screenshots || [],
    github: project.links?.github || null,
    demo: project.links?.demo || null,
    pypi: project.links?.pypi || null
  });

  const categorizedProjects = {};

  try {
    // Get all categories and process them
    const categories = getSortedCategories();

    categories.forEach(category => {
      const categoryProjects = getProjectsByCategory(category.id);
      categorizedProjects[category.id] = categoryProjects.map(processProject);
    });

    return categorizedProjects;
  } catch (error) {
    console.error('Error in getProjectsDataByCategories:', error);
    return {};
  }
};

// Export organized data for backward compatibility
export const getProjectsData = (baseUrl = '', isDark = false) => {
  const processProject = (project) => ({
    ...project,
    image: project.images.icon,
    darkImage: project.images.darkIcon,
    banner: project.images.banner,
    screenshots: project.images.screenshots,
    github: project.links.github,
    demo: project.links.demo,
    pypi: project.links.pypi
  });

  return {
    businessProjects: getProjectsByCategory(PROJECT_CATEGORIES.BUSINESS.id).map(processProject),
    pythonProjects: getProjectsByCategory(PROJECT_CATEGORIES.PYTHON.id).map(processProject),
    trueFamilyProjects: getProjectsByCategory(PROJECT_CATEGORIES.TRUE_FAMILY.id).map(processProject),
    utilityProjects: getProjectsByCategory(PROJECT_CATEGORIES.UTILITY.id).map(processProject),
    openSourceProjects: getProjectsByCategory(PROJECT_CATEGORIES.OPEN_SOURCE.id).map(processProject)
  };
};

// Export for featured projects (used in home page)
export const getFeaturedProjectsData = () => {
  return getFeaturedProjects().map(project => ({
    title: project.title,
    description: project.description,
    image: project.images.icon,
    darkImage: project.images.darkIcon,
    tags: project.technologies,
    github: project.links.github,
    demo: project.links.demo,
    delay: project.delay
  }));
};
