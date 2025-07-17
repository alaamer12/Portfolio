// noinspection t

import {lazy} from "react";
import {SiDjango, SiFastapi, SiPostgresql, SiPython, SiReact, SiTailwindcss} from "react-icons/si";
import { USER_CONFIG } from "./user.js";

// Import the centralized projects data
export {
    getProjectsData,
    getProjectsDataByCategories,
    getSortedCategories,
    sortProjectsByBadge as sortProjects,
    getBadgeConfig as getBadgeContent,
    PROJECT_BADGES,
    PROJECT_CATEGORIES,
    sortProjectsByBadge,
    getBadgeConfig
} from './projects.js';

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
]; // Route configurations
export const ROUTES = {
    HOME: {
        path: '/',
        title: `${USER_CONFIG.personal.fullName} | ${USER_CONFIG.personal.profession}`,
        description: USER_CONFIG.personal.bio,
        Component: lazy(() => import('../pages/LandingPage.jsx')),
    },
    ABOUT: {
        path: '/about',
        title: `About Me | ${USER_CONFIG.personal.fullName}`,
        description: `Learn about my journey as a ${USER_CONFIG.personal.profession}, my skills, experiences, and what drives me to create innovative web solutions.`,
        Component: lazy(() => import('../pages/About.jsx')),
    },
    PROJECTS: {
        path: '/projects',
        title: `Projects | ${USER_CONFIG.personal.fullName}`,
        description: `Explore my portfolio of web development projects, featuring ${USER_CONFIG.skills.primary.slice(0, 3).join(', ')} and other modern technologies.`,
        Component: lazy(() => import('../pages/Projects.jsx')),
    },
    NOT_FOUND: {
        path: '*',
        title: `404 - Page Not Found | ${USER_CONFIG.personal.fullName}`,
        description: 'The page you are looking for could not be found.',
        Component: lazy(() => import('../pages/NotFound.jsx')),
    },
};
