// noinspection t

import {lazy} from "react";
import {SiJupyter, SiMongodb, SiPandas, SiPython, SiStreamlit, SiTensorflow} from "react-icons/si";
import {USER_CONFIG} from "./user.js";

// Import the centralized projects data
export {
    getProjectsData,
    getProjectsDataByCategories,
    getSortedCategories,
    getProjectsByCategory,
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
        description: 'Expert in Python for data engineering, ETL pipelines, machine learning, and automation with extensive experience in data processing frameworks.',
        url: 'https://www.python.org/'
    },
    {
        Icon: SiPandas,
        name: 'Pandas & NumPy',
        description: 'Advanced data manipulation, cleaning, and transformation using Pandas and NumPy for large-scale data processing workflows.',
        url: 'https://pandas.pydata.org/'
    },
    {
        Icon: SiTensorflow,
        name: 'Machine Learning',
        description: 'Proficient in building ML models with TensorFlow, PyTorch, and scikit-learn for data analytics and AI applications.',
        url: 'https://www.tensorflow.org/'
    },
    {
        Icon: SiStreamlit,
        name: 'Data Visualization',
        description: 'Creating interactive dashboards and visualizations using Streamlit, Plotly, and Chart.js for data insights.',
        url: 'https://streamlit.io/'
    },
    {
        Icon: SiMongodb,
        name: 'Database Systems',
        description: 'Expert in database design and optimization with MongoDB, Supabase, and SQL databases for data storage solutions.',
        url: 'https://www.mongodb.com/'
    },
    {
        Icon: SiJupyter,
        name: 'Data Analysis',
        description: 'Advanced data analysis and research using Jupyter notebooks, statistical analysis, and data science methodologies.',
        url: 'https://jupyter.org/'
    }
];

export const EXPERIENCE_DATA = [
    {
        title: 'Full Stack Developer',
        company: 'Kab',
        period: 'January 2025 - Present',
        description: 'Design and maintain data-driven full-stack applications, integrating Python-based ETL pipelines for efficient data processing. Develop responsive dashboards using Next.js, enabling real-time data insights.',
        technologies: ['Python', 'Next.js', 'ETL Pipelines', 'Data Processing', 'Dashboard Development', 'Real-time Analytics']
    },
    {
        title: 'Open Source Contributor',
        company: 'Multiple Organizations',
        period: '2023 - Present',
        description: 'Published 5+ PyPI packages enhancing data engineering workflows. Contributed to JsonAlchemy, T2FLabs, Tealim, and truefamily organizations with tools for dataset generation and processing.',
        technologies: ['Python', 'PyPI Publishing', 'Data Engineering Tools', 'Dataset Generation', 'Open Source Development']
    }
];

export const EDUCATION_DATA = [
    {
        title: 'DEPI Program Participant',
        company: 'Government Data Engineering Track',
        period: 'June 2025 - Present',
        description: 'Advanced Python programming with focus on data engineering methodologies and pipeline construction. Database design, management, and optimization for large-scale data processing applications.',
        technologies: ['Python', 'Data Engineering', 'ETL Processes', 'Database Design', 'Pipeline Construction', 'Data Optimization']
    },
    {
        title: 'Academic Intern',
        company: 'Benha University',
        period: 'June 2024 - July 2024',
        description: 'Built Python-based data applications with database integration, focusing on data aggregation and processing. Led ChitChat project team, developing data-driven chat applications with socket programming and MVC architecture.',
        technologies: ['Python', 'Database Integration', 'Data Aggregation', 'Socket Programming', 'MVC Architecture', 'Team Leadership']
    }
]; // Route configurations
export const ROUTES = {
    HOME: {
        path: '/',
        title: `${USER_CONFIG.personal.fullName} | ${USER_CONFIG.personal.profession}`,
        description: USER_CONFIG.personal.bio,
        Component: lazy(() => import('../pages/LandingPage.jsx')),
    },
    PROJECTS: {
        path: '/projects',
        title: `Data Engineering Projects | ${USER_CONFIG.personal.fullName}`,
        description: `Explore my portfolio of data engineering projects, featuring ${USER_CONFIG.skills.primary.slice(0, 3).join(', ')} and other cutting-edge technologies.`,
        Component: lazy(() => import('../pages/Projects.jsx')),
    },
    NOT_FOUND: {
        path: '*',
        title: `404 - Page Not Found | ${USER_CONFIG.personal.fullName}`,
        description: 'The page you are looking for could not be found.',
        Component: lazy(() => import('../pages/NotFound.jsx')),
    },
};
