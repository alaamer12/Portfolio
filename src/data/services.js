// Service categories
export const SERVICE_CATEGORIES = {
    DATA_ENGINEERING: {
        id: 'data_engineering',
        title: 'Data Engineering',
        icon: '⚙️'
    },
    ML_AI: {
        id: 'ml_ai', 
        title: 'Machine Learning',
        icon: '🤖'
    },
    WEB_DEVELOPMENT: {
        id: 'web_development',
        title: 'Web Development',
        icon: '💻'
    },
    DATA_ANALYSIS: {
        id: 'data_analysis',
        title: 'Data Analysis',
        icon: '📊'
    }
};

const PLATFORMS = {
    KHAMASAT: {
        id: 'khamasat',
        name: 'Khamasat',
        url: 'https://khamsat.com',
        logo: '/images/platforms/khamasat-logo.svg',
        color: '#1DB584',
        currency: 'USD',
        flag: '🇸🇦'
    },
    ELHAREFA: {
        id: 'elharefa',
        name: 'elharefa',
        url: 'https://elharefa.com',
        logo: '/images/platforms/elharefa-logo.svg', 
        color: '#FF6B35',
        currency: 'EGP',
        flag: '🇪🇬'
    },
    UPWORK: {
        id: 'upwork',
        name: 'Upwork',
        url: 'https://upwork.com',
        logo: '/images/platforms/upwork-logo.svg',
        color: '#14A800',
        currency: 'USD',
        flag: '🌍'
    }
};

// Services data
export const SERVICES_DATA = {
    etl_pipeline: {
        id: 'etl_pipeline',
        title: 'ETL Pipeline Development',
        description: 'Build robust, scalable ETL pipelines using Python, Apache Airflow, and cloud platforms.',
        category: SERVICE_CATEGORIES.DATA_ENGINEERING.id,
        thumbnail: '/images/services/etl-pipeline.webp',
        platforms: {
            khamasat: {
                name: 'Khamasat',
                deliveryTime: '5-7 days',
                currency: 'USD',
                url: 'https://khamsat.com/user/amr-muhamed'
            },
            elharefa: {
                name: 'elharefa',
                creationTime: '2023',
                currency: 'EGP',
                url: 'https://elharefa.com/freelancer/amr-muhamed'
            }
        },
        featured: true
    },
    ml_model: {
        id: 'ml_model',
        title: 'Machine Learning Solutions',
        description: 'Develop and deploy custom machine learning models tailored to your business needs.',
        category: SERVICE_CATEGORIES.ML_AI.id,
        thumbnail: '/images/services/ml-model.webp',
        platforms: {
            khamasat: {
                name: 'Khamasat',
                deliveryTime: '7-10 days',
                currency: 'USD',
                url: 'https://khamsat.com/user/amr-muhamed'
            },
            upwork: {
                name: 'Upwork',
                deliveryTime: 'Project-based',
                currency: 'USD',
                url: 'https://upwork.com/freelancers/amr-muhamed'
            }
        },
        featured: true
    },
    web_app: {
        id: 'web_app',
        title: 'Web Applications',
        description: 'Build modern, responsive web applications using React, Next.js, and TypeScript.',
        category: SERVICE_CATEGORIES.WEB_DEVELOPMENT.id,
        thumbnail: '/images/services/web-app.webp',
        platforms: {
            elharefa: {
                name: 'elharefa',
                creationTime: '2023',
                currency: 'EGP',
                url: 'https://elharefa.com/freelancer/amr-muhamed'
            },
            upwork: {
                name: 'Upwork',
                deliveryTime: '10-14 days',
                currency: 'USD',
                url: 'https://upwork.com/freelancers/amr-muhamed'
            }
        },
        featured: true
    },
    data_dashboard: {
        id: 'data_dashboard',
        title: 'Data Dashboards',
        description: 'Create interactive dashboards and visualizations for better data-driven decisions.',
        category: SERVICE_CATEGORIES.DATA_ANALYSIS.id,
        thumbnail: '/images/services/data-dashboard.webp',
        platforms: {
            khamasat: {
                name: 'Khamasat',
                deliveryTime: '5-8 days',
                currency: 'USD',
                url: 'https://khamsat.com/user/amr-muhamed'
            }
        },
        featured: false
    },
    web_scraping: {
        id: 'web_scraping',
        title: 'Web Scraping',
        description: 'Automated data extraction from websites with respect to robots.txt and rate limiting.',
        category: SERVICE_CATEGORIES.DATA_ENGINEERING.id,
        thumbnail: '/images/services/web-scraping.webp',
        platforms: {
            khamasat: {
                name: 'Khamasat',
                deliveryTime: '2-5 days',
                currency: 'USD',
                url: 'https://khamsat.com/user/amr-muhamed'
            },
            elharefa: {
                name: 'elharefa',
                creationTime: '2023',
                currency: 'EGP',
                url: 'https://elharefa.com/freelancer/amr-muhamed'
            }
        },
        featured: false
    },
    data_analysis: {
        id: 'data_analysis',
        title: 'Data Analysis',
        description: 'Comprehensive data analysis with statistical insights and actionable reports.',
        category: SERVICE_CATEGORIES.DATA_ANALYSIS.id,
        thumbnail: '/images/services/data-analysis.webp',
        platforms: {
            khamasat: {
                name: 'Khamasat',
                deliveryTime: '3-5 days',
                currency: 'USD',
                url: 'https://khamsat.com/user/amr-muhamed'
            },
            elharefa: {
                name: 'elharefa',
                creationTime: '2023',
                currency: 'EGP',
                url: 'https://elharefa.com/freelancer/amr-muhamed'
            }
        },
        featured: false
    }
};

// Utility functions
export const getFeaturedServices = () => {
    return Object.values(SERVICES_DATA).filter(service => service.featured);
};

export const getServicesByCategory = (categoryId) => {
    return Object.values(SERVICES_DATA).filter(service => service.category === categoryId);
};

export const getAllServices = () => {
    return Object.values(SERVICES_DATA);
};

export const getCategoryById = (categoryId) => {
    return Object.values(SERVICE_CATEGORIES).find(cat => cat.id === categoryId);
};
