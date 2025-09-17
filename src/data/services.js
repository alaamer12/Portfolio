// Service categories with random colors
export const SERVICE_CATEGORIES = {
    DATA_ENGINEERING: {
        id: 'data_engineering',
        title: 'Data Engineering',
        icon: '⚙️',
        color: 'from-blue-500 to-cyan-500'
    },
    ML_AI: {
        id: 'ml_ai', 
        title: 'Machine Learning',
        icon: '🤖',
        color: 'from-purple-500 to-pink-500'
    },
    WEB_DEVELOPMENT: {
        id: 'web_development',
        title: 'Web Development',
        icon: '💻',
        color: 'from-green-500 to-emerald-500'
    },
    DATA_ANALYSIS: {
        id: 'data_analysis',
        title: 'Data Analysis',
        icon: '📊',
        color: 'from-orange-500 to-red-500'
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
        fullDescription: 'Design and implement enterprise-grade ETL (Extract, Transform, Load) pipelines that handle large-scale data processing with reliability and efficiency. Using modern tools like Python, Apache Airflow, and cloud platforms (AWS, GCP, Azure), I create automated data workflows that transform raw data into actionable insights. Each pipeline includes comprehensive error handling, data validation, monitoring, and alerting systems to ensure data quality and system reliability.',
        category: SERVICE_CATEGORIES.DATA_ENGINEERING.id,
        thumbnail: '/images/services/etl-pipeline.webp',
        platforms: {
            khamasat: {
                name: 'Khamasat',
                deliveryTime: '5-7 days',
                currency: 'USD',
                price: '$50-150',
                url: 'https://khamsat.com/user/amr-muhamed'
            },
            elharefa: {
                name: 'elharefa',
                creationTime: '2023',
                currency: 'EGP',
                price: '1500-4500 EGP',
                url: 'https://elharefa.com/freelancer/amr-muhamed'
            }
        },
        features: [
            'Custom Python ETL scripts with comprehensive error handling',
            'Apache Airflow orchestration and scheduling',
            'Data validation and quality assurance checks',
            'Cloud deployment on AWS, GCP, or Azure',
            'Real-time monitoring and alerting systems',
            'Comprehensive documentation and knowledge transfer',
            'Performance optimization and scalability planning',
            'Integration with existing data infrastructure'
        ],
        technologies: ['Python', 'Apache Airflow', 'Pandas', 'SQL', 'Docker', 'AWS/GCP/Azure', 'PostgreSQL', 'Redis'],
        deliverables: [
            'Complete ETL pipeline source code',
            'Deployment and configuration scripts',
            'Comprehensive technical documentation',
            'Unit and integration test suites',
            'Monitoring dashboard setup',
            'Performance benchmarking report'
        ],
        featured: true
    },
    ml_model: {
        id: 'ml_model',
        title: 'Machine Learning Solutions',
        description: 'Develop and deploy custom machine learning models tailored to your business needs.',
        fullDescription: 'Create end-to-end machine learning solutions from data preprocessing to model deployment and monitoring. I specialize in building custom ML models for classification, regression, clustering, and recommendation systems using state-of-the-art algorithms and frameworks. Each project includes thorough data analysis, feature engineering, model selection, hyperparameter tuning, and deployment with proper monitoring and maintenance strategies. Whether you need predictive analytics, computer vision, natural language processing, or time series forecasting, I deliver production-ready ML solutions that drive business value.',
        category: SERVICE_CATEGORIES.ML_AI.id,
        thumbnail: '/images/services/ml-model.webp',
        platforms: {
            khamasat: {
                name: 'Khamasat',
                deliveryTime: '7-10 days',
                currency: 'USD',
                price: '$75-200',
                url: 'https://khamsat.com/user/amr-muhamed'
            },
            upwork: {
                name: 'Upwork',
                deliveryTime: 'Project-based',
                currency: 'USD',
                price: '$45-80/hr',
                url: 'https://upwork.com/freelancers/amr-muhamed'
            }
        },
        features: [
            'Custom ML model development and training',
            'Data preprocessing and feature engineering',
            'Model selection and hyperparameter optimization',
            'Cross-validation and performance evaluation',
            'Model deployment with REST API endpoints',
            'Real-time prediction services',
            'Model monitoring and drift detection',
            'Comprehensive documentation and training'
        ],
        technologies: ['Python', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'FastAPI', 'Docker', 'MLflow'],
        deliverables: [
            'Trained and validated ML models',
            'Complete source code and notebooks',
            'REST API for model predictions',
            'Model performance evaluation report',
            'Deployment scripts and documentation',
            'Model monitoring dashboard'
        ],
        featured: true
    },
    web_app: {
        id: 'web_app',
        title: 'Web Applications',
        description: 'Build modern, responsive web applications using React, Next.js, and TypeScript.',
        fullDescription: 'Develop full-stack web applications using cutting-edge technologies and modern development practices. I create responsive, performant, and scalable web solutions that provide exceptional user experiences across all devices. From single-page applications to complex multi-tier systems, I handle everything from UI/UX design implementation to backend API development, database design, authentication, and deployment. Each application is built with clean, maintainable code following industry best practices and includes comprehensive testing, documentation, and deployment strategies.',
        category: SERVICE_CATEGORIES.WEB_DEVELOPMENT.id,
        thumbnail: '/images/services/web-app.webp',
        platforms: {
            elharefa: {
                name: 'elharefa',
                creationTime: '2023',
                currency: 'EGP',
                price: '2500-8000 EGP',
                url: 'https://elharefa.com/freelancer/amr-muhamed'
            },
            upwork: {
                name: 'Upwork',
                deliveryTime: '10-14 days',
                currency: 'USD',
                price: '$40-70/hr',
                url: 'https://upwork.com/freelancers/amr-muhamed'
            }
        },
        features: [
            'Modern React/Next.js frontend development',
            'Responsive design for all device sizes',
            'TypeScript for type-safe development',
            'RESTful API and GraphQL integration',
            'Database design and optimization',
            'User authentication and authorization',
            'Performance optimization and SEO',
            'Deployment and hosting setup'
        ],
        technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Vercel', 'AWS'],
        deliverables: [
            'Complete web application source code',
            'Responsive UI/UX implementation',
            'Backend API with documentation',
            'Database schema and migrations',
            'Deployment configuration',
            'User documentation and guides'
        ],
        featured: true
    },
    data_dashboard: {
        id: 'data_dashboard',
        title: 'Data Dashboards',
        description: 'Create interactive dashboards and visualizations for better data-driven decisions.',
        fullDescription: 'Design and develop interactive data dashboards that transform complex datasets into clear, actionable insights. Using modern visualization libraries and frameworks, I create responsive dashboards that allow stakeholders to explore data through interactive charts, filters, and drill-down capabilities. Each dashboard is tailored to specific business needs with real-time data integration, automated reporting features, and intuitive user interfaces that make data analysis accessible to non-technical users.',
        category: SERVICE_CATEGORIES.DATA_ANALYSIS.id,
        thumbnail: '/images/services/data-dashboard.webp',
        platforms: {
            khamasat: {
                name: 'Khamasat',
                deliveryTime: '5-8 days',
                currency: 'USD',
                price: '$60-120',
                url: 'https://khamsat.com/user/amr-muhamed'
            }
        },
        features: [
            'Interactive charts and visualizations',
            'Real-time data integration and updates',
            'Custom filtering and drill-down capabilities',
            'Mobile-responsive dashboard design',
            'Automated report generation',
            'User access control and permissions',
            'Export functionality (PDF, Excel, CSV)',
            'Performance optimization for large datasets'
        ],
        technologies: ['Plotly', 'D3.js', 'Streamlit', 'Dash', 'Power BI', 'Tableau', 'React', 'Python', 'SQL'],
        deliverables: [
            'Interactive dashboard application',
            'Data connection and ETL scripts',
            'User documentation and training',
            'Deployment and hosting setup',
            'Performance monitoring tools',
            'Maintenance and update procedures'
        ],
        featured: false
    },
    web_scraping: {
        id: 'web_scraping',
        title: 'Web Scraping',
        description: 'Automated data extraction from websites with respect to robots.txt and rate limiting.',
        fullDescription: 'Develop robust web scraping solutions that extract valuable data from websites while respecting ethical guidelines and legal constraints. I create scalable scraping systems that handle dynamic content, JavaScript-rendered pages, and complex authentication flows. Each solution includes proper rate limiting, error handling, data validation, and storage mechanisms. Whether you need product information, market research data, or competitive intelligence, I deliver reliable scraping tools that operate efficiently and responsibly.',
        category: SERVICE_CATEGORIES.DATA_ENGINEERING.id,
        thumbnail: '/images/services/web-scraping.webp',
        platforms: {
            khamasat: {
                name: 'Khamasat',
                deliveryTime: '2-5 days',
                currency: 'USD',
                price: '$25-80',
                url: 'https://khamsat.com/user/amr-muhamed'
            },
            elharefa: {
                name: 'elharefa',
                creationTime: '2023',
                currency: 'EGP',
                price: '800-2500 EGP',
                url: 'https://elharefa.com/freelancer/amr-muhamed'
            }
        },
        features: [
            'Respectful scraping with robots.txt compliance',
            'Dynamic content and JavaScript handling',
            'Anti-bot detection circumvention',
            'Data cleaning and validation',
            'Multiple output formats (JSON, CSV, Database)',
            'Scheduled and automated data collection',
            'Proxy rotation and IP management',
            'Comprehensive error handling and logging'
        ],
        technologies: ['Python', 'Scrapy', 'BeautifulSoup', 'Selenium', 'Requests', 'Pandas', 'MongoDB', 'PostgreSQL'],
        deliverables: [
            'Complete scraping application',
            'Cleaned and structured datasets',
            'Data validation and quality reports',
            'Scheduling and automation setup',
            'Documentation and usage guides',
            'Monitoring and maintenance scripts'
        ],
        featured: false
    },
    data_analysis: {
        id: 'data_analysis',
        title: 'Data Analysis',
        description: 'Comprehensive data analysis with statistical insights and actionable reports.',
        fullDescription: 'Perform in-depth data analysis to uncover hidden patterns, trends, and insights that drive business decisions. I combine statistical analysis, data mining, and visualization techniques to transform raw data into meaningful intelligence. Each analysis includes exploratory data analysis, hypothesis testing, predictive modeling, and comprehensive reporting with actionable recommendations. Whether you need market research analysis, customer behavior insights, or operational performance evaluation, I deliver thorough analysis that supports strategic decision-making.',
        category: SERVICE_CATEGORIES.DATA_ANALYSIS.id,
        thumbnail: '/images/services/data-analysis.webp',
        platforms: {
            khamasat: {
                name: 'Khamasat',
                deliveryTime: '3-5 days',
                currency: 'USD',
                price: '$40-100',
                url: 'https://khamsat.com/user/amr-muhamed'
            },
            elharefa: {
                name: 'elharefa',
                creationTime: '2023',
                currency: 'EGP',
                price: '1200-3000 EGP',
                url: 'https://elharefa.com/freelancer/amr-muhamed'
            }
        },
        features: [
            'Exploratory data analysis and profiling',
            'Statistical hypothesis testing',
            'Trend analysis and forecasting',
            'Customer segmentation and clustering',
            'Correlation and regression analysis',
            'Data visualization and storytelling',
            'Actionable insights and recommendations',
            'Executive summary and detailed reports'
        ],
        technologies: ['Python', 'R', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly', 'Jupyter', 'SQL', 'Excel'],
        deliverables: [
            'Comprehensive analysis report',
            'Interactive data visualizations',
            'Statistical analysis results',
            'Jupyter notebooks with code',
            'Executive summary presentation',
            'Actionable recommendations document'
        ],
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
