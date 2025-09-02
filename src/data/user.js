
/**
 * Centralized user configuration
 * Update this file to change user information across the entire application
 */

export const USER_CONFIG = {
  // Personal Information
  personal: {
    firstName: 'Amr',
    lastName: 'Muhamed',
    fullName: 'Amr Muhamed',
    alternateName: 'Al-Aamer',
    displayName: 'Amr Muhamed',
    jobTitle: 'Data Engineer & AI Specialist',
    profession: 'Data Engineer',
    bio: 'Passionate Data Engineer and AI Specialist with 3+ years of experience building scalable data pipelines, machine learning systems, and full-stack applications. I specialize in developing robust ETL/ELT systems using Python, creating advanced data hubs that aggregate datasets from multiple sources, and implementing AI-powered tools for automation and analytics. My expertise spans from low-level systems programming in C/C++ and Rust to modern web development with React and TypeScript. I have published 5+ PyPI packages, contributed to multiple open-source organizations, and led teams through complex technical projects. Currently pursuing a Bachelor\'s in Computer Science and AI at Benha University while working as a Full Stack Developer, I combine academic knowledge with practical industry experience to deliver innovative solutions that drive business value and technical excellence.',
    nationality: 'Egyptian',
    gender: 'Male',
    profileImage: '/images/hero.avif',
    profileImageAlt: 'Amr Muhamed - Data Engineer'
  },

  // Contact Information
  contact: {
    email: 'amrmuhamed86@gmail.com',
    location: {
      city: 'Cairo',
      country: 'Egypt',
      countryCode: 'EG'
    },
    website: 'https://amrmuhamed.com',
    timezone: 'Africa/Cairo'
  },

  // Social Media Links
  social: {
    github: {
      url: 'https://github.com/alaamer12',
      username: 'alaamer12',
      display: true
    },
    linkedin: {
      url: 'https://www.linkedin.com/in/al-aamer-0b0709265/',
      username: 'al-aamer-0b0709265',
      display: true
    },
    twitter: {
      url: '',
      username: '',
      display: false
    },
    facebook: {
      url: '',
      username: '',
      display: false
    },
    instagram: {
      url: '',
      username: '',
      display: false
    },
    youtube: {
      url: '',
      username: '',
      display: false
    },
    discord: {
      url: '',
      username: '',
      display: false
    }
  },

  // Education
  education: {
    institution: 'BFCAI',
    institutionUrl: 'https://fci.bu.edu.eg/',
    degree: 'Bachelor of Computer Science and Artificial Intelligence',
    fieldOfStudy: 'Computer Science and Artificial Intelligence',
    startYear: '2023',
    endYear: '2026',
    status: 'current', // current, completed, dropped
    gpa: '',
    honors: ['Honor student at BFCAI']
  },

  // Professional Information
  professional: {
    currentStatus: 'Available for data engineering and AI consulting',
    experience: '3+ years',
    specialization: ['Data Engineering', 'Machine Learning', 'ETL/ELT Pipelines', 'Data Analytics'],
    availability: 'Open to opportunities',
    workType: ['Remote', 'Freelance', 'Contract'],
    hourlyRate: '', // Optional
    resumeUrl: '/resume.pdf'
  },

  // Skills & Technologies
  skills: {
    primary: ['Python', 'JavaScript/TypeScript', 'React', 'Data Engineering', 'Machine Learning', 'ETL/ELT Pipelines'],
    secondary: ['C/C++', 'Rust', 'C#', 'Pandas', 'NumPy', 'PyTorch', 'TensorFlow', 'MongoDB', 'PostgreSQL', 'Supabase', 'Streamlit', 'Plotly', 'Three.js', 'OpenGL', 'Unity', 'Godot'],
    languages: [
      {
        name: 'Arabic',
        code: 'ar',
        level: 'Native',
        description: 'Native language'
      },
      {
        name: 'English',
        code: 'en',
        level: 'Professional',
        description: 'Professional working proficiency'
      }
    ]
  },

  // Statistics (for Hero section)
  stats: {
    githubRepos: {
      count: '55+',
      label: 'Data Projects',
      color: 'text-gray-800 dark:text-white',
      hoverColor: 'text-primary dark:text-primary-light'
    },
    pythonProjects: {
      count: '30+',
      label: 'Python Tools',
      color: 'text-gray-800 dark:text-white',
      hoverColor: 'text-strawberry dark:text-strawberry-light'
    },
    pypiPackages: {
      count: '5+',
      label: 'PyPI Packages',
      color: 'text-gray-800 dark:text-white',
      hoverColor: 'text-cherry-pie dark:text-cherry-pie-light'
    }
  },

  // SEO & Meta Information
  seo: {
    siteName: 'Amr Muhamed Portfolio',
    siteDescription: 'Data Engineer Portfolio showcasing expertise in ETL pipelines, machine learning, data visualization, and scalable data processing systems.',
    keywords: ['Data Engineer', 'Machine Learning', 'ETL Pipeline', 'Data Analytics', 'Python Developer', 'AI Specialist'],
    author: 'Amr Muhamed',
    canonicalUrl: 'https://amrmuhamed.com',
    ogImage: '/og-image.png',
    twitterCard: 'summary_large_image',
    language: 'en-US',
    robots: 'index, follow'
  },

  // Brand Colors & Theme
  brand: {
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    accentColor: '#F59E0B',
    logoUrl: '/favicon.svg',
    logoAlt: 'Amr Muhamed Logo'
  },

  // Awards & Achievements
  achievements: [
    'Published 5+ PyPI packages enhancing data engineering workflows',
    'Contributed to multiple open-source organizations (JsonAlchemy, T2F-Labs, TrueFam, Symphony AI)',
    '55+ GitHub repositories spanning multiple programming languages and domains',
    'Led successful academic and professional teams through complex technical projects',
    'Completed government DEPI Data Engineering track with informal instructor assistant role',
    'Built production-ready applications serving real users and solving practical problems',
    'Honor student at Benha Faculty of Computer Science and Artificial Intelligence',
    'Expertise across 8+ programming languages and 20+ frameworks/technologies'
  ],

  // Interests & Hobbies
  interests: [
    'Open Source Development',
    'Machine Learning',
    'Web Technologies',
    'Software Architecture',
    'Technology Innovation'
  ],

  // About Me Highlights/Bullet Points
  aboutHighlights: [
    'Built comprehensive data engineering solutions including MedData hub aggregating datasets from HuggingFace, Kaggle, Medium, and Dev.to with automated ETL pipelines',
    'Developed AI-powered tools like c4f for intelligent Git automation and Fragma for NLP sentence fragment detection using modern LLM integration',
    'Created high-performance systems including CascadeSearch multi-language file utility (Rust/C/Python) and jsdfile binary JSON parser with C integration',
    'Published 5+ PyPI packages and contributed to multiple open-source organizations (JsonAlchemy, T2F-Labs, TrueFam, Symphony AI)',
    'Led cross-functional teams through complex projects, managing 3-7 members with structured communication, documentation, and agile methodologies',
    'Expertise spans full-stack development with React/TypeScript, 3D graphics with OpenGL/WebGL, game development in Unity/Godot, and VR experiences',
    'Advanced skills in machine learning frameworks (PyTorch, TensorFlow), data visualization (Plotly, Chart.js, Streamlit), and modern web technologies',
    'Strong foundation in computer science fundamentals including data structures, algorithms, design patterns, and performance optimization techniques'
  ]
};

// Helper functions to get specific user data
export const getUserName = () => USER_CONFIG.personal.fullName;
export const getUserEmail = () => USER_CONFIG.contact.email;
export const getUserWebsite = () => USER_CONFIG.contact.website;
export const getUserJobTitle = () => USER_CONFIG.personal.jobTitle;
export const getUserLocation = () => `${USER_CONFIG.contact.location.city}, ${USER_CONFIG.contact.location.country}`;

// Get only displayed social links
export const getDisplayedSocialLinks = () => {
  return Object.entries(USER_CONFIG.social)
    .filter(([_, config]) => config.display && config.url)
    .map(([platform, config]) => ({
      platform,
      url: config.url,
      username: config.username
    }));
};

// Get primary skills as array
export const getPrimarySkills = () => USER_CONFIG.skills.primary;

// Get contact information formatted
export const getContactInfo = () => ({
  email: USER_CONFIG.contact.email,
  location: getUserLocation(),
  website: USER_CONFIG.contact.website,
  social: getDisplayedSocialLinks()
});

// Get SEO metadata
export const getSEOData = () => ({
  title: `${USER_CONFIG.personal.fullName} | ${USER_CONFIG.personal.profession}`,
  description: USER_CONFIG.personal.bio,
  keywords: USER_CONFIG.seo.keywords.join(', '),
  author: USER_CONFIG.seo.author,
  ogImage: USER_CONFIG.seo.ogImage,
  canonicalUrl: USER_CONFIG.seo.canonicalUrl
});
