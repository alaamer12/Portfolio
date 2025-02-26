// noinspection t

import {useCallback} from "react";
import {FaFire} from "react-icons/fa";
import {IoSparkles} from "react-icons/io5";
import {BsClock} from "react-icons/bs";
import {SiDjango, SiFastapi, SiPostgresql, SiPython, SiReact, SiTailwindcss} from "react-icons/si";

export const getProjectsData = (baseUrl, isDark) => ({
    trueFamilyProjects: [
        {
            title: 'true-core',
            description: 'The foundation of the True ecosystem. A comprehensive Python library providing essential utilities, design patterns, and core functionality that powers all True family packages.',
            tags: ['Python', 'Core Library', 'Utilities', 'Foundation'],
            github: 'https://github.com/alaamer12/true-core',
            demo: 'https://pypi.org/project/true-core',
            type: 'pypi',
            icon: isDark ? `${baseUrl}/images/dark_true_core_icon.avif` : `${baseUrl}/images/light_true_core_icon.avif`,
            banner: `${baseUrl}/tealim.svg`,
            badge: 'hot',
            available: true,
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
            github: 'https://github.com/alaamer12/true-blobs',
            demo: 'https://pypi.org/project/true-blobs',
            type: 'pypi',
            icon: isDark ? `${baseUrl}/images/dark_true_core_icon.avif` : `${baseUrl}/images/light_true_core_icon.avif`,
            banner: `${baseUrl}/tealim.svg`,
            badge: 'none',
            available: true,
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
            github: 'https://github.com/alaamer12/true-caching',
            demo: 'https://pypi.org/project/true-caching',
            type: 'pypi',
            icon: isDark ? `${baseUrl}/images/dark_true_core_icon.avif` : `${baseUrl}/images/light_true_core_icon.avif`,
            banner: `${baseUrl}/tealim.svg`,
            badge: 'none',
            available: true,
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
            github: 'https://github.com/alaamer12/true-colorspace',
            demo: 'https://pypi.org/project/true-colorspace',
            type: 'pypi',
            icon: isDark ? `${baseUrl}/images/dark_true_core_icon.avif` : `${baseUrl}/images/light_true_core_icon.avif`,
            banner: `${baseUrl}/tealim.svg`,
            badge: 'none',
            available: false,
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
            github: 'https://github.com/alaamer12/true-compression',
            demo: 'https://pypi.org/project/true-compression',
            type: 'pypi',
            icon: isDark ? `${baseUrl}/images/dark_true_core_icon.avif` : `${baseUrl}/images/light_true_core_icon.avif`,
            banner: `${baseUrl}/tealim.svg`,
            badge: 'none',
            available: true,
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
            github: 'https://github.com/alaamer12/true-enumeration',
            demo: 'https://pypi.org/project/true-enumeration',
            type: 'pypi',
            icon: isDark ? `${baseUrl}/images/dark_true_core_icon.avif` : `${baseUrl}/images/light_true_core_icon.avif`,
            banner: `${baseUrl}/tealim.svg`,
            badge: 'none',
            available: true,
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
            github: 'https://github.com/alaamer12/true-generating',
            demo: 'https://pypi.org/project/true-generating',
            type: 'pypi',
            icon: isDark ? `${baseUrl}/images/dark_true_core_icon.avif` : `${baseUrl}/images/light_true_core_icon.avif`,
            banner: `${baseUrl}/tealim.svg`,
            badge: 'none',
            available: false,
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
            github: 'https://github.com/alaamer12/true-logging',
            demo: 'https://pypi.org/project/true-logging',
            type: 'pypi',
            icon: isDark ? `${baseUrl}/images/dark_true_core_icon.avif` : `${baseUrl}/images/light_true_core_icon.avif`,
            banner: `${baseUrl}/tealim.svg`,
            badge: 'coming soon',
            available: true,
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
            github: 'https://github.com/alaamer12/true-monorepo',
            demo: 'https://pypi.org/project/true-monorepo',
            type: 'pypi',
            icon: isDark ? `${baseUrl}/images/dark_true_core_icon.avif` : `${baseUrl}/images/light_true_core_icon.avif`,
            banner: `${baseUrl}/tealim.svg`,
            badge: 'none',
            available: true,
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
            github: 'https://github.com/alaamer12/true-pipelines',
            demo: 'https://pypi.org/project/true-pipelines',
            type: 'pypi',
            icon: isDark ? `${baseUrl}/images/dark_true_core_icon.avif` : `${baseUrl}/images/light_true_core_icon.avif`,
            banner: `${baseUrl}/tealim.svg`,
            badge: 'none',
            available: true,
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
            github: 'https://github.com/alaamer12/true-profanity',
            demo: 'https://pypi.org/project/true-profanity',
            type: 'pypi',
            icon: isDark ? `${baseUrl}/images/dark_true_core_icon.avif` : `${baseUrl}/images/light_true_core_icon.avif`,
            banner: `${baseUrl}/tealim.svg`,
            badge: 'coming soon',
            available: false,
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
            github: 'https://github.com/alaamer12/true-session',
            demo: 'https://pypi.org/project/true-session',
            type: 'pypi',
            icon: isDark ? `${baseUrl}/images/dark_true_core_icon.avif` : `${baseUrl}/images/light_true_core_icon.avif`,
            banner: `${baseUrl}/tealim.svg`,
            badge: 'none',
            available: true,
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
            github: 'https://github.com/alaamer12/true-storage',
            demo: 'https://pypi.org/project/true-storage',
            type: 'pypi',
            icon: isDark ? `${baseUrl}/images/dark_true_core_icon.avif` : `${baseUrl}/images/light_true_core_icon.avif`,
            banner: `${baseUrl}/tealim.svg`,
            badge: 'new',
            available: true,
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
            github: 'https://github.com/alaamer12/true-svg',
            demo: 'https://pypi.org/project/true-svg',
            type: 'pypi',
            icon: isDark ? `${baseUrl}/images/dark_true_core_icon.avif` : `${baseUrl}/images/light_true_core_icon.avif`,
            banner: `${baseUrl}/tealim.svg`,
            badge: 'none',
            available: true,
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
            github: 'https://github.com/alaamer12/true-translation',
            demo: 'https://pypi.org/project/true-translation',
            type: 'pypi',
            icon: isDark ? `${baseUrl}/images/dark_true_core_icon.avif` : `${baseUrl}/images/light_true_core_icon.avif`,
            banner: `${baseUrl}/tealim.svg`,
            badge: 'coming soon',
            available: false,
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
            github: 'https://github.com/alaamer12/true-types',
            demo: 'https://pypi.org/project/true-types',
            type: 'pypi',
            icon: isDark ? `${baseUrl}/images/dark_true_core_icon.avif` : `${baseUrl}/images/light_true_core_icon.avif`,
            banner: `${baseUrl}/tealim.svg`,
            badge: 'none',
            available: true,
            details: [
                'Enhanced type system with runtime type checking',
                'Validation and serialization capabilities',
                'Comprehensive type utilities and tools',
                'Easy integration with popular type checking libraries',
                'High-performance type operations'
            ]
        }
    ],
    utilityProjects: [
        {
            title: 'fastapi-utilities',
            description: 'A comprehensive collection of utilities and extensions for FastAPI framework.',
            tags: ['Python', 'FastAPI', 'Web Development', 'API', 'Middleware', 'Authentication'],
            github: 'https://github.com/alaamer12/fastapi-utilities',
            demo: 'https://pypi.org/project/fastapi-utilities',
            type: 'pypi',
            icon: isDark ? `${baseUrl}/images/dark_true_core_icon.avif` : `${baseUrl}/images/light_true_core_icon.avif`,
            banner: `${baseUrl}/tealim.svg`,
            badge: 'coming soon',
            available: true,
            details: [
                'Advanced routing and middleware tools',
                'Authentication and authorization mechanisms',
                'Performance optimization and caching tools',
                'Comprehensive utilities and tools for FastAPI development',
                'Easy integration with popular FastAPI libraries'
            ]
        }
    ],
    businessProjects: [
        {
            title: 'Tealim',
            description: 'Revolutionary E-learning cross-platform solution that transforms online education.',
            tags: ['React Native', 'Python', 'FastAPI', 'Mobile', 'Education', 'Cross-platform'],
            github: 'https://github.com/alaamer12/tealim',
            demo: 'https://tealim.com',
            type: 'web',
            icon: `${baseUrl}/images/tealim.webp`,
            banner: `${baseUrl}/tealim.svg`,
            badge: 'coming soon',
            available: true,
            details: [
                'Interactive content creation and real-time collaboration',
                'Cross-platform solution for seamless learning experiences',
                'Built with modern technologies for scalability and performance',
                'A Lead in the E-learning space with cutting-edge'
            ]
        },
        {
            title: 'Snippets',
            description: 'Innovative E-market platform for trading code snippets and ready-to-use solutions.',
            tags: ['React', 'PostgreSQL', 'Fastapi', 'E-Trading', 'Fast Access', 'Developer Tools'],
            github: 'https://github.com/alaamer12/snippets',
            demo: 'https://snippets.com',
            type: 'web',
            icon: `${baseUrl}/images/tealim.webp`,
            banner: `${baseUrl}/tealim.svg`,
            badge: 'coming soon',
            available: false,
            details: [
                'Automated testing and version control integration',
                'Secure payment processing and monetization tools',
                'Sustainable ecosystem for code reuse and collaboration',
                'Built with modern technologies for scalability and performance',
                'Easy integration with popular developer tools'
            ]
        }
    ]
});


// Badge priority for sorting
const badgePriority = {
    'hot': 0,
    'new': 1,
    'coming soon': 2,
    'none': 3
};

// Sort function for projects
export const sortProjects = (projects) => {
    return [...projects].sort((a, b) => {
        return badgePriority[a.badge || 'none'] - badgePriority[b.badge || 'none'];
    });
};
export const getBadgeContent = (badge) => {
    switch (badge) {
        case 'hot':
            return {
                icon: <FaFire className="mr-1"/>,
                text: 'HOT',
                className: 'bg-gradient-to-r from-orange-500 to-red-500 backdrop-blur-md bg-opacity-90'
            };
        case 'new':
            return {
                icon: <IoSparkles className="mr-1"/>,
                text: 'NEW',
                className: 'bg-gradient-to-r from-blue-400 to-cyan-400 backdrop-blur-md bg-opacity-90'
            };
        case 'coming soon':
            return {
                icon: <BsClock className="mr-1"/>,
                text: 'SOON',
                className: 'bg-gradient-to-r from-violet-400 to-purple-500 backdrop-blur-md bg-opacity-90'
            };
        default:
            return null;
    }
};

export const SKILLS_DATA = [
    {
        Icon: SiPython,
        name: 'Python',
        level: 95,
        description: 'Expert in Python development with extensive experience in automation, data processing, and backend development.',
        url: 'https://www.python.org/'
    },
    {
        Icon: SiDjango,
        name: 'Django',
        level: 70,
        description: 'Proficient in building scalable web applications using Django and Django REST Framework.',
        url: 'https://www.djangoproject.com/'
    },
    {
        Icon: SiFastapi,
        name: 'FastAPI',
        level: 95,
        description: 'Proficient in building high-performance APIs with FastAPI and its extensions.',
        url: 'https://fastapi.tiangolo.com/'
    },
    {
        Icon: SiReact,
        name: 'React and React Native',
        level: 85,
        description: 'Strong frontend development skills with React, including modern hooks and state management.',
        url: 'https://reactjs.org/'
    },
    {
        Icon: SiPostgresql,
        name: 'PostgreSQL',
        level: 75,
        description: 'Expert in database design, optimization, and management with PostgreSQL.',
        url: 'https://www.postgresql.org/'
    },
    {
        Icon: SiTailwindcss,
        name: 'TailwindCSS',
        level: 80,
        description: 'Proficient in creating responsive and visually stunning web interfaces with TailwindCSS.',
        url: 'https://tailwindcss.com/'
    }
];

export const EXPERIENCE_DATA = [
    {
        title: 'Cross-platform Developer',
        company: 'MobileTech Solutions',
        period: '2022 - Present',
        description: 'Led the development of cross-platform mobile applications using React Native. Implemented shared codebase strategy, reducing development time by 40%.',
        technologies: ['React Native', 'Zustand', 'Jest', 'Subpase', 'Expo', 'Reanimated']
    },
    {
        title: 'Junior Backend Developer',
        company: 'Tech Solutions Inc.',
        period: '2023 - Present',
        description: 'Contributing to the backend development team in building scalable microservices. Learning and implementing CI/CD practices while assisting in performance optimization efforts.',
        technologies: ['Python', 'Django', 'Docker', 'FastAPI', 'PostgreSQL', 'Pytest']
    },
    {
        title: 'Full Stack Developer',
        company: 'Innovation Labs',
        period: '2023 - Present',
        description: 'Developed and maintained multiple web applications. Reduced server response time by 60% through optimization and caching strategies.',
        technologies: ['React', 'React Native', 'FastAPI', 'PostgreSQL', 'TailwindCSS', 'Styled-components']
    },
    {
        title: 'Founder & Lead Developer',
        company: 'Personal Startup Projects',
        period: '2025 - Present',
        description: 'Initiated and developed multiple startup projects, focusing on innovative web applications. Led the entire development lifecycle from concept to deployment.',
        technologies: ['React', 'Django', 'FastAPI', 'PostgreSQL', 'Docker', 'Authkit', 'Supabase']
    }
]; 