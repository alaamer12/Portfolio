
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
    jobTitle: 'Python and Backend Expert',
    profession: 'Full Stack Developer',
    bio: 'From building scalable web applications to architecting complex backend systems, I\'ve spent the last 5+ years mastering the art of Python development and system design. My journey began with a curiosity about how things work under the hood, which led me to specialize in backend technologies, API design, and database optimization. I believe in writing clean, maintainable code that not only solves today\'s problems but scales for tomorrow\'s challenges.',
    nationality: 'Egyptian',
    gender: 'Male',
    profileImage: '/images/hero.avif',
    profileImageAlt: 'Amr Muhamed - Full Stack Developer'
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
    currentStatus: 'Available for freelance and consulting',
    experience: '2+ years',
    specialization: ['Full Stack Development', 'Backend Development', 'API Development'],
    availability: 'Open to opportunities',
    workType: ['Remote', 'Freelance', 'Contract'],
    hourlyRate: '', // Optional
    resumeUrl: '/resume.pdf'
  },

  // Skills & Technologies
  skills: {
    primary: ['Python', 'React', 'FastAPI', 'Django', 'JavaScript', 'PostgreSQL'],
    secondary: ['React Native', 'TailwindCSS', 'Docker', 'Git', 'RESTful APIs'],
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
      count: '50+',
      label: 'GitHub Repositories',
      color: 'text-gray-800 dark:text-white',
      hoverColor: 'text-primary dark:text-primary-light'
    },
    pythonProjects: {
      count: '86%',
      label: 'Python Projects',
      color: 'text-gray-800 dark:text-white',
      hoverColor: 'text-strawberry dark:text-strawberry-light'
    },
    pypiPackages: {
      count: '10+',
      label: 'PyPI Packages',
      color: 'text-gray-800 dark:text-white',
      hoverColor: 'text-cherry-pie dark:text-cherry-pie-light'
    }
  },

  // SEO & Meta Information
  seo: {
    siteName: 'Amr Muhamed Portfolio',
    siteDescription: 'Full Stack Developer Portfolio showcasing expertise in React, Django, FastAPI, and modern web technologies.',
    keywords: ['Full Stack Developer', 'React Developer', 'Django Developer', 'FastAPI', 'Python Developer', 'Web Developer'],
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
    'Honor student at BFCAI',
    'Open Source Contributor',
    '10+ PyPI Packages Published',
    '150+ GitHub Repositories'
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
    'Expert in Python, Django, FastAPI, and Flask',
    'Experienced with cloud platforms (AWS, GCP, Azure)',
    'Strong background in database design and optimization',
    'Passionate about clean code and system architecture'
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
