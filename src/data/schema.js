/**
 * Central source of truth for structured data schemas
 * Used for SEO optimization across all pages
 */

// Base constants
const BASE_URL = 'https://amrmuhamed.com';
const PERSON_NAME = 'Amr Muhamed';
const JOB_TITLE = 'Full Stack Developer';
const DEFAULT_DESCRIPTION = 'Experienced Full Stack Developer specializing in React, Django, and modern web technologies.';
const DEFAULT_LANG = 'en-US';

// Language information
const LANGUAGES = [
  {
    '@type': 'Language',
    'name': 'Arabic',
    'alternateName': 'ar',
    'description': 'Native language'
  },
  {
    '@type': 'Language',
    'name': 'English',
    'alternateName': 'en',
    'description': 'Professional working proficiency'
  }
];

// Publication dates
const PUBLICATION_DATES = {
  website: '2024-12-01',
  about: '2024-12-10',
  projects: '2024-12-15'
};

// Helper to get current date in ISO format
const getCurrentDate = () => new Date().toISOString().split('T')[0];

// Simple memoization helper
const memoize = (fn) => {
  let cached = null;
  let lastUpdateDate = null;
  const currentDate = getCurrentDate();
  
  return () => {
    // Only recalculate if the date has changed or cache is empty
    if (!cached || lastUpdateDate !== currentDate) {
      lastUpdateDate = currentDate;
      cached = fn(currentDate);
    }
    return cached;
  };
};

// Social media profiles
const SOCIAL_PROFILES = [
  'https://github.com/alaamer12',
  'https://www.linkedin.com/in/al-aamer-0b0709265/'
];

// Contact information
const CONTACT_INFO = {
  email: 'amrmuhamed86@gmail.com',
  location: {
    locality: 'Cairo',
    country: 'Egypt'
  }
};

// Skills and expertise
const CORE_SKILLS = [
    'React',
    'Django',
    'FastAPI',
    'Python',
    'JavaScript',
    'Web Development'
];
const EXTENDED_SKILLS = [
  ...CORE_SKILLS,
  'RESTful APIs',
  'Database Design',
  'UI/UX Design',
  'Software Architecture'
];
const DETAILED_SKILLS = 'React, Django, FastAPI, Python, JavaScript, TypeScript, Node.js, HTML, CSS, Tailwind CSS, PostgreSQL, MongoDB, RESTful APIs, Git, GitHub, Docker';

// Education information
const EDUCATION = {
  institution: 'BFCAI',
  url: 'https://fci.bu.edu.eg/',
  degree: 'Bachelor of Computer Science and Artificial Intelligence',
  startDate: '2023',
  endDate: '2026'
};

// Service types
const SERVICE_TYPES = [
    'Web Development',
    'Full Stack Development',
    'Software Engineering',
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Computer Vision',
    'Natural Language Processing',
];

/**
 * Helper functions for creating common schema structures
 */

// Create a standard image object schema
const createImageObject = (path, width, height, caption) => ({
  '@type': 'ImageObject',
  'url': path.startsWith('http') ? path : `${BASE_URL}${path}`,
  'width': width.toString(),
  'height': height.toString(),
  ...(caption && { 'caption': caption })
});

// Create a postal address schema
const createPostalAddress = (locality, country) => ({
  '@type': 'PostalAddress',
  'addressLocality': locality,
  'addressCountry': country
});

// Create a breadcrumb schema
const createBreadcrumbList = (items) => ({
  '@type': 'BreadcrumbList',
  'itemListElement': items.map((item, index) => ({
    '@type': 'ListItem',
    'position': index + 1,
    'name': item.name,
    'item': item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`
  }))
});

// Create a person schema (basic version)
const createBasicPersonSchema = (includeSameAs = true) => ({
  '@type': 'Person',
  'name': PERSON_NAME,
  'jobTitle': JOB_TITLE,
  'url': `${BASE_URL}`,
  'image': `${BASE_URL}/profile.jpg`,
  ...(includeSameAs && { 'sameAs': SOCIAL_PROFILES })
});

// Create a detailed person schema
const createDetailedPersonSchema = () => ({
  '@type': 'Person',
  'name': PERSON_NAME,
  'givenName': 'Amr',
  'familyName': 'Muhamed',
  'alternateName': 'Al-Aamer',
  'gender': 'Male',
  'nationality': 'Egyptian',
  'jobTitle': JOB_TITLE,
  'description': DEFAULT_DESCRIPTION,
  'image': createImageObject('/profile.jpg', '500', '500', `Profile photo of ${PERSON_NAME}`),
  'url': `${BASE_URL}/about`,
  'email': CONTACT_INFO.email,
  'address': createPostalAddress(CONTACT_INFO.location.locality, CONTACT_INFO.location.country),
  'sameAs': SOCIAL_PROFILES,
  'knowsAbout': EXTENDED_SKILLS,
  'knowsLanguage': LANGUAGES,
  'hasCredential': [
    {
      '@type': 'EducationalOccupationalCredential',
      'credentialCategory': 'degree',
      'name': EDUCATION.degree,
      'educationalLevel': 'Bachelor\'s Degree',
      'recognizedBy': {
        '@type': 'Organization',
        'name': EDUCATION.institution
      },
      'dateCreated': '2023-01-01',
      'validFor': 'Lifetime'
    }
  ],
  'alumniOf': {
    '@type': 'CollegeOrUniversity',
    'name': EDUCATION.institution,
    'url': EDUCATION.url,
    'startDate': EDUCATION.startDate,
    'endDate': EDUCATION.endDate
  },
  'workLocation': {
    '@type': 'Place',
    'address': createPostalAddress(CONTACT_INFO.location.locality, CONTACT_INFO.location.country)
  },
  'workExample': [
    {
      '@type': 'CreativeWork',
      'name': 'Portfolio Website',
      'url': BASE_URL
    }
  ],
  'skills': DETAILED_SKILLS,
  'award': [
    'Honor student at BFCAI',
    'Open Source Contributor'
  ],
  'worksFor': {
    '@type': 'Organization',
    'name': 'Independent Developer and Consultant'
  },
  'seeks': 'Freelance opportunities and collaboration on innovative projects'
});

/**
 * Static parts of schemas (won't change between renders)
 */

// Static part of landing page schema
const LANDING_PAGE_SCHEMA_STATIC = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  'url': BASE_URL,
  'name': `${PERSON_NAME} - Full Stack Developer Portfolio`,
  'description': 'Portfolio website of Amr Muhamed, showcasing expertise in full-stack development, projects, and professional experience.',
  'inLanguage': DEFAULT_LANG,
  'availableLanguage': ['en', 'ar'],
  'datePublished': PUBLICATION_DATES.website,
  'image': createImageObject('/home-og.png', '1200', '630', `${PERSON_NAME} - Full Stack Developer`),
  'potentialAction': {
    '@type': 'SearchAction',
    'target': `${BASE_URL}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string'
  },
  'author': {
    ...createBasicPersonSchema(),
    'address': createPostalAddress(CONTACT_INFO.location.locality, CONTACT_INFO.location.country),
    'email': CONTACT_INFO.email,
    'knowsAbout': CORE_SKILLS
  },
  'breadcrumb': createBreadcrumbList([
    { name: 'Home', url: '' }
  ]),
  'mainEntity': {
    '@type': 'ProfessionalService',
    'name': `${PERSON_NAME} - Full Stack Development Services`,
    'description': 'Professional web development services specializing in full-stack solutions, custom applications, and more.',
    'provider': {
      '@type': 'Person',
      'name': PERSON_NAME
    },
    'serviceType': SERVICE_TYPES,
    'areaServed': {
      '@type': 'Country',
      'name': 'Global'
    }
  }
};

// Static part of about page schema
const ABOUT_PAGE_SCHEMA_STATIC = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  'datePublished': PUBLICATION_DATES.about,
  'inLanguage': DEFAULT_LANG,
  'url': `${BASE_URL}/about`,
  'breadcrumb': createBreadcrumbList([
    { name: 'Home', url: '' },
    { name: 'About Me', url: '/about' }
  ]),
  'mainEntity': createDetailedPersonSchema()
};

// Static part of projects page schema
const PROJECTS_PAGE_SCHEMA_STATIC = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  'name': `Projects - ${PERSON_NAME}`,
  'description': `Collection of web development projects and applications built by ${PERSON_NAME}`,
  'inLanguage': DEFAULT_LANG,
  'datePublished': PUBLICATION_DATES.projects,
  'url': `${BASE_URL}/projects`,
  'image': createImageObject('/projects-og.png', '1200', '630'),
  'author': {
    ...createBasicPersonSchema(false),
    'image': `${BASE_URL}/profile.jpg`
  },
  'breadcrumb': createBreadcrumbList([
    { name: 'Home', url: '' },
    { name: 'Projects', url: '/projects' }
  ]),
  'mainEntity': {
    '@type': 'ItemList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Business Projects',
        'url': `${BASE_URL}/projects#business-projects`,
        'item': {
          '@type': 'ItemList',
          'name': 'Business Projects',
          'description': 'Professional applications developed for business use cases'
        }
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'True Family Projects',
        'url': `${BASE_URL}/projects#true-family-projects`,
        'item': {
          '@type': 'ItemList',
          'name': 'True Family Projects',
          'description': 'Collaborative projects developed with a focus on team skills'
        }
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': 'Utility Projects',
        'url': `${BASE_URL}/projects#utility-projects`,
        'item': {
          '@type': 'ItemList',
          'name': 'Utility Projects',
          'description': 'Tools and utilities developed to solve specific problems'
        }
      }
    ]
  },
  'about': {
    '@type': 'Thing',
    'name': 'Web Development Projects',
    'description': 'A showcase of full-stack development projects including web applications, APIs, and open-source contributions'
  },
  'offers': {
    '@type': 'Offer',
    'description': 'Available for freelance and consulting on similar projects',
    'url': `${BASE_URL}/contact`
  }
};

// Not Found page schema is entirely static (doesn't depend on date)
const NOT_FOUND_PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  'name': `404 - Page Not Found | ${PERSON_NAME}`,
  'description': 'The requested page could not be found.',
  'url': `${BASE_URL}/404`,
  'inLanguage': DEFAULT_LANG,
  'breadcrumb': createBreadcrumbList([
    { name: 'Home', url: '' },
    { name: 'Not Found', url: '/404' }
  ])
};

/**
 * Memoized schema functions
 * Only recalculate when the date changes
 */
export const getLandingPageSchema = memoize((currentDate) => ({
  ...LANDING_PAGE_SCHEMA_STATIC,
  'dateModified': currentDate
}));

export const getAboutPageSchema = memoize((currentDate) => ({
  ...ABOUT_PAGE_SCHEMA_STATIC,
  'dateModified': currentDate
}));

export const getProjectsPageSchema = memoize((currentDate) => ({
  ...PROJECTS_PAGE_SCHEMA_STATIC,
  'dateModified': currentDate
}));

// Not Found page doesn't need modification date since it's not indexed
export const getNotFoundPageSchema = () => NOT_FOUND_PAGE_SCHEMA; 