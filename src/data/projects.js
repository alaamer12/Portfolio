import { USER_CONFIG } from "./user";

/**
 * Centralized projects configuration
 * This file contains all project data and configurations
 */

// Project categories configuration
// Project categories configuration
export const PROJECT_CATEGORIES = {
  DATA_ENGINEERING: {
    id: 'data_engineering',
    title: 'Data Engineering & Analytics',
    description: 'Large-scale data processing systems, analytics platforms, and data pipeline tools',
    order: 1
  },
  ML_AI: {
    id: 'ml_ai',
    title: 'Machine Learning & AI',
    description: 'ML models, NLP applications, neural networks, and AI-powered tools',
    order: 2
  },
  WEB_FRONTEND: {
    id: 'web_frontend',
    title: 'Web & Frontend Development',
    description: 'React applications, web tools, UI components, and frontend frameworks',
    order: 3
  },
  GAME_DEVELOPMENT: {
    id: 'game_development',
    title: 'Game Development & Graphics',
    description: 'Games, 3D graphics, virtual reality, and interactive experiences',
    order: 4
  },
  TRUE_FAMILY: {
    id: 'truefamily',
    title: 'True Family Ecosystem',
    description: 'Enterprise-grade Python packages and data processing libraries',
    order: 5
  },
  DEVELOPER_TOOLS: {
    id: 'developer_tools',
    title: 'Developer Tools & Utilities',
    description: 'CLI tools, development utilities, and productivity enhancers',
    order: 6
  },
  EDUCATIONAL: {
    id: 'educational',
    title: 'Educational & Tutorials',
    description: 'Learning resources, tutorials, and example implementations',
    order: 7
  },
  EXPERIMENTAL: {
    id: 'experimental',
    title: 'Experimental & Research',
    description: 'Experimental projects, research tools, and innovative concepts',
    order: 8
  }
};

/// Badge configurations
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
  PRIVATE: {
    id: 'private',
    text: 'PRIVATE',
    className: 'bg-gradient-to-r from-gray-500 to-gray-600 backdrop-blur-md bg-opacity-90',
    priority: 3
  },
  NONE: {
    id: 'none',
    text: '',
    className: '',
    priority: 4
  }
};

// Project data
export const PROJECTS_DATA = {
  "3d_parallex": {
    "id": "3d_parallex",
    "title": "3d-parallex",
    "description": "An immersive 3D parallax experience with React Three Fiber and Three.js.",
    "longDescription": "Interactive 3D web experience showcasing advanced React Three Fiber capabilities.",
    "category": PROJECT_CATEGORIES.WEB_FRONTEND.id,
    "tags": [
      "React",
      "3D",
      "Open World"
    ],
    "technologies": [
      "React",
      "Three.js",
      "React Three Fiber",
      "WebGL"
    ],
    "links": {
      "github": "https://github.com/alaamer12/3d-parallex",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/3d-parallex-icon.webp",
      "banner": "/3d-parallex-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.2
  },
  "3d_studio": {
    "id": "3d_studio",
    "title": "3d-studio",
    "description": "An interactive 3D studio environment built with React Three Fiber and Three.js for virtual photography setups.",
    "longDescription": "Virtual 3D studio environment for creative photography and scene composition.",
    "category": PROJECT_CATEGORIES.WEB_FRONTEND.id,
    "tags": [
      "React",
      "3D",
      "Virtual Studio"
    ],
    "technologies": [
      "React",
      "Three.js",
      "React Three Fiber",
      "WebGL"
    ],
    "links": {
      "github": "https://github.com/alaamer12/3d-studio",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/3d-studio-icon.webp",
      "banner": "/3d-studio-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NEW.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.4
  },
  "artspace": {
    "id": "artspace",
    "title": "ArtSpace",
    "description": "3D art space/gallery, where a user can navigate in a first-person perspective",
    "longDescription": "Immersive 3D art gallery with first-person navigation and interactive exhibits.",
    "category": PROJECT_CATEGORIES.GAME_DEVELOPMENT.id,
    "tags": [
      "C++",
      "Computer Graphics",
      "OpenGL",
      "Game"
    ],
    "technologies": [
      "C++",
      "OpenGL",
      "Computer Graphics",
      "3D Rendering"
    ],
    "links": {
      "github": "https://github.com/alaamer12/ArtSpace",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/artspace-icon.webp",
      "banner": "/artspace-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.4
  },
  "c4f": {
    "id": "c4f",
    "title": "c4f",
    "description": "🤖 AI-powered Git commit message generator creating meaningful conventional commits from code changes.",
    "longDescription": "Intelligent code change analysis with natural language processing for automated documentation and commit description generation.",
    "category": PROJECT_CATEGORIES.DEVELOPER_TOOLS.id,
    "tags": [
      "Python",
      "CLI",
      "AI",
      "LLM",
      "Git Utility"
    ],
    "technologies": [
      "Python",
      "AI/LLM",
      "Git Integration",
      "CLI"
    ],
    "links": {
      "github": "https://github.com/alaamer12/c4f",
      "demo": null,
      "pypi": "https://pypi.org/project/c4f"
    },
    "images": {
      "icon": "/images/c4f-icon.avif",
      "darkIcon": "/images/c4f-icon-dark.avif",
      "banner": "/c4f-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.HOT.id,
    "available": true,
    "featured": false,
    "details": [
      "AI-powered code change analysis with natural language processing",
      "Seamless CLI interface integrating into existing development workflows",
      "Context-aware analysis understanding code semantics",
      "Customizable commit message templates and conventional commit support"
    ],
    "delay": 0.2
  },
  "calculator_mvc": {
    "id": "calculator_mvc",
    "title": "Calculator-MVC",
    "description": "Basic calculator app with python utilizing MVC.",
    "longDescription": "Educational calculator implementation demonstrating MVC design pattern.",
    "category": PROJECT_CATEGORIES.DEVELOPER_TOOLS.id,
    "tags": [
      "Python",
      "MVC"
    ],
    "technologies": [
      "Python",
      "MVC Pattern",
      "GUI Development"
    ],
    "links": {
      "github": "https://github.com/alaamer12/Calculator-MVC",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/calculator-mvc-icon.webp",
      "banner": "/calculator-mvc-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.4
  },
  "cascadesearch": {
    "id": "cascadesearch",
    "title": "CascadeSearch",
    "description": "A high-performance file search utility that quickly searches for files across your entire partition. Built with multiple backend implementations (Rust, C, and Python) for maximum compatibility and performance.",
    "longDescription": "Multi-backend file search utility optimized for speed and compatibility across different systems.",
    "category": PROJECT_CATEGORIES.DEVELOPER_TOOLS.id,
    "tags": [
      "Rust",
      "C",
      "Python",
      "CLI",
      "Fast"
    ],
    "technologies": [
      "Rust",
      "C",
      "Python",
      "CLI",
      "Performance Optimization"
    ],
    "links": {
      "github": "https://github.com/alaamer12/CascadeSearch",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/cascade-search-icon.webp",
      "banner": "/cascade-search-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.2
  },
  "chakra_ui_template": {
    "id": "chakra_ui_template",
    "title": "Chakra-UI-Template",
    "description": "Created with Builder.io",
    "longDescription": "Ready-to-use Chakra UI template with modern components and styling.",
    "category": PROJECT_CATEGORIES.WEB_FRONTEND.id,
    "tags": [
      "React",
      "UI",
      "Chakra",
      "Template"
    ],
    "technologies": [
      "TypeScript",
      "React",
      "Chakra UI",
      "Template"
    ],
    "links": {
      "github": "https://github.com/alaamer12/Chakra-UI-Template",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/chakra-template-icon.webp",
      "banner": "/chakra-template-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.6
  },
  "chitchat": {
    "id": "chitchat",
    "title": "ChitChat",
    "description": "Real-time chat application with modern messaging features.",
    "longDescription": "Socket-based chat application with MVC architecture and modern messaging capabilities.",
    "category": PROJECT_CATEGORIES.DEVELOPER_TOOLS.id,
    "tags": [
      "Python",
      "GUI",
      "Chat",
      "Socket",
      "MVC"
    ],
    "technologies": [
      "Python",
      "Socket Programming",
      "GUI",
      "MVC Architecture"
    ],
    "links": {
      "github": "https://github.com/alaamer12/ChitChat",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/chitchat-icon.webp",
      "banner": "/chitchat-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.2
  },
  "codelyzer": {
    "id": "codelyzer",
    "title": "CodeLyzer",
    "description": "A feature-rich static code analysis tool to understand, maintain, and improve codebases of any size. Supports multiple programming languages and visualizations to identify quality issues, complexity hotspots, and architectural patterns.",
    "longDescription": "A comprehensive static code analysis platform supporting multiple programming languages with advanced visualization capabilities for code metrics analysis and maintenance insights.",
    "category": PROJECT_CATEGORIES.DATA_ENGINEERING.id,
    "tags": [
      "Python",
      "Data Engineering",
      "Analysis",
      "Dashboard",
      "Aggregator",
      "Rich-terminal"
    ],
    "technologies": [
      "Python",
      "Pandas",
      "NumPy",
      "Plotly",
      "Chart.js",
      "Rich Terminal"
    ],
    "links": {
      "github": "https://github.com/alaamer12/CodeLyzer",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/codelyzer-icon.webp",
      "banner": "/codelyzer-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.HOT.id,
    "available": true,
    "featured": true,
    "details": [
      "Rich-terminal dashboards with advanced visualization capabilities",
      "Aggregation algorithms for processing large-scale repositories",
      "Actionable reporting system for codebase health and technical debt",
      "Support for multiple programming languages and architectural pattern detection"
    ],
    "delay": 0.4
  },
  "colab_print": {
    "id": "colab_print",
    "title": "colab-print",
    "description": "Python library enhancing display in Jupyter/Colab with customizable HTML outputs for text, lists, dicts, tables, and DataFrames.",
    "longDescription": "Enhanced display capabilities for Jupyter and Google Colab environments with rich formatting and extensible rendering system.",
    "category": PROJECT_CATEGORIES.DEVELOPER_TOOLS.id,
    "tags": [
      "Python",
      "IPYNB",
      "Rich-api",
      "Display"
    ],
    "technologies": [
      "Python",
      "Jupyter",
      "Rich API",
      "HTML Rendering"
    ],
    "links": {
      "github": "https://github.com/alaamer12/colab-print",
      "demo": null,
      "pypi": "https://pypi.org/project/colab-print"
    },
    "images": {
      "icon": "/images/colab-print-icon.avif",
      "darkIcon": "/images/colab-print-icon-dark.avif",
      "banner": "/colab-print-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NEW.id,
    "available": true,
    "featured": false,
    "details": [
      "Customizable HTML outputs for text, lists, dictionaries, and DataFrames",
      "API integration with Rich library for advanced terminal-style formatting",
      "Extensible system supporting custom renderers and themes",
      "Optimized for data science workflows in notebook environments"
    ],
    "delay": 0.4
  },
  "company_analysis_ml": {
    "id": "company_analysis_ml",
    "title": "Company-Analysis-ML",
    "description": "Analysis for companies using Kaggle dataset and advanced preprocessing.",
    "longDescription": "Machine learning analysis project for company data using big data processing techniques.",
    "category": PROJECT_CATEGORIES.ML_AI.id,
    "tags": [
      "IPYNB",
      "ML",
      "Big Data"
    ],
    "technologies": [
      "Python",
      "Jupyter Notebook",
      "Pandas",
      "Machine Learning"
    ],
    "links": {
      "github": "https://github.com/alaamer12/Company-Analysis-ML",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/company-analysis-icon.webp",
      "banner": "/company-analysis-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.6
  },
  "copia": {
    "id": "copia",
    "title": "copia",
    "description": "Backup manager that detects and syncs important files to USB drives. Started as `copy_important.py`, now with GUI and intelligent management.",
    "longDescription": "Backup manager that detects and syncs important files to USB drives. Started as `copy_important.py`, now with GUI and intelligent management.",
    "category": PROJECT_CATEGORIES.DEVELOPER_TOOLS.id,
    "tags": [
      "Python",
      "Backup",
      "Smart"
    ],
    "technologies": [
      "Python"
    ],
    "links": {
      "github": "https://github.com/alaamer12/copia",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/copia-icon.webp",
      "banner": "/copia-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.PRIVATE.id,
    "available": false,
    "featured": false,
    "details": [],
    "delay": 0.2
  },
  "cpp_dsa": {
    "id": "cpp_dsa",
    "title": "Cpp-DSA",
    "description": "A comprehensive collection of Data Structures and Algorithms implemented in C++17, covering a wide range of computer science concepts from basic data structures to advanced algorithmic problems.",
    "longDescription": "Educational resource for learning data structures and algorithms with C++ implementations.",
    "category": PROJECT_CATEGORIES.EDUCATIONAL.id,
    "tags": [
      "C++",
      "Data Structures",
      "Algorithms",
      "Tutorial"
    ],
    "technologies": [
      "C++",
      "Data Structures",
      "Algorithms",
      "Educational"
    ],
    "links": {
      "github": "https://github.com/alaamer12/Cpp-DSA",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/cpp-dsa-icon.webp",
      "banner": "/cpp-dsa-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.2
  },
  "data_structures": {
    "id": "data_structures",
    "title": "data_structures",
    "description": "No description available.",
    "longDescription": "No description available.",
    "category": PROJECT_CATEGORIES.EDUCATIONAL.id,
    "tags": [
      "Python"
    ],
    "technologies": [
      "Python"
    ],
    "links": {
      "github": "https://github.com/alaamer12/data_structures",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/data_structures-icon.webp",
      "banner": "/data_structures-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.PRIVATE.id,
    "available": false,
    "featured": false,
    "details": [],
    "delay": 0.2
  },
  "design_patterns": {
    "id": "design_patterns",
    "title": "Design-Patterns",
    "description": "A collection of design pattern implementations in Python, demonstrating principles, architectural patterns, and best practices.",
    "longDescription": "Educational collection of software design patterns with Python implementations.",
    "category": PROJECT_CATEGORIES.EDUCATIONAL.id,
    "tags": [
      "Python",
      "Design Patterns",
      "Tutorial"
    ],
    "technologies": [
      "Python",
      "Design Patterns",
      "Software Architecture"
    ],
    "links": {
      "github": "https://github.com/alaamer12/Design-Patterns",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/design-patterns-icon.webp",
      "banner": "/design-patterns-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.6
  },
  "devcurator": {
    "id": "devcurator",
    "title": "DevCurator",
    "description": "A script that aggregates developer blog posts from platforms including Dev.to and Hashnode.",
    "longDescription": "A script that aggregates developer blog posts from platforms including Dev.to and Hashnode.",
    "category": PROJECT_CATEGORIES.DATA_ENGINEERING.id,
    "tags": [
      "Python",
      "Streamlit",
      "Dashboard",
      "Aggregator",
      "Blogs"
    ],
    "technologies": [
      "Python",
      "Streamlit",
      "Web Scraping",
      "Data Aggregation"
    ],
    "links": {
      "github": "https://github.com/alaamer12/DevCurator",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/dev-curator-icon.webp",
      "banner": "/dev-curator-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.PRIVATE.id,
    "available": false,
    "featured": false,
    "details": [],
    "delay": 0.2
  },
  "devtoharvest": {
    "id": "devtoharvest",
    "title": "DevToHarvest",
    "description": "Python scraper for creating ML-ready datasets from Dev.to articles. Supports parallelism, rate limiting, retries, and Parquet export. Ideal for NLP training and technical corpus creation.",
    "longDescription": "A comprehensive dataset generator for NLP training and technical corpus creation, supporting parallelism, intelligent rate limiting, and retry mechanisms.",
    "category": PROJECT_CATEGORIES.DATA_ENGINEERING.id,
    "tags": [
      "Python",
      "Dataset Devto Generator",
      "Archived"
    ],
    "technologies": [
      "Python",
      "Pandas",
      "Parquet",
      "Streamlit",
      "Parallel Processing"
    ],
    "links": {
      "github": "https://github.com/alaamer12/DevToHarvest",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/devtoharvest-icon.webp",
      "darkIcon": "/images/devtoharvest-icon-dark.webp",
      "banner": "/devtoharvest-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NEW.id,
    "available": true,
    "featured": false,
    "details": [
      "Parallelized ETL pipelines with intelligent rate limiting",
      "Parquet export functionality for efficient storage",
      "Comprehensive metadata extraction for ML applications",
      "Optimized datasets for NLP training pipelines"
    ],
    "delay": 0.2
  },
  "docxify": {
    "id": "docxify",
    "title": "Docxify",
    "description": "Failed to fetch (404/Private)",
    "longDescription": "Failed to fetch (404/Private)",
    "category": PROJECT_CATEGORIES.DEVELOPER_TOOLS.id,
    "tags": [
      "Python",
      "Markdown",
      "Docx",
      "Transform"
    ],
    "technologies": [
      "N/A"
    ],
    "links": {
      "github": "https://github.com/alaamer12/Docxify",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/docxify-icon.webp",
      "banner": "/docxify-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.PRIVATE.id,
    "available": false,
    "featured": false,
    "details": [],
    "delay": 0.2
  },
  "drumverse": {
    "id": "drumverse",
    "title": "DrumVerse",
    "description": "A Virtual Reality music room [DrumVerse] where users can play various instruments, starting with a fully interactive drum kit.",
    "longDescription": "Immersive VR music experience with interactive instruments and realistic physics.",
    "category": PROJECT_CATEGORIES.GAME_DEVELOPMENT.id,
    "tags": [
      "C#",
      "Unity",
      "Game",
      "Virtual Reality"
    ],
    "technologies": [
      "C#",
      "Unity",
      "Virtual Reality",
      "Audio Processing"
    ],
    "links": {
      "github": "https://github.com/alaamer12/DrumVerse",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/drumverse-icon.webp",
      "banner": "/drumverse-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.6
  },
  "easytypeface": {
    "id": "easytypeface",
    "title": "EasyTypeface",
    "description": "Typography management tool for web applications.",
    "longDescription": "Dynamic typography management system for web applications.",
    "category": PROJECT_CATEGORIES.WEB_FRONTEND.id,
    "tags": [
      "JavaScript",
      "Dynamic Input"
    ],
    "technologies": [
      "JavaScript",
      "Typography",
      "Web Development"
    ],
    "links": {
      "github": "https://github.com/alaamer12/EasyTypeface",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/easy-typeface-icon.webp",
      "banner": "/easy-typeface-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.2
  },
  "f_scan": {
    "id": "f_scan",
    "title": "fScan",
    "description": "A file content search tool supporting text and binary formats with regex, fuzzy matching, and semantic search.",
    "longDescription": "Advanced file content search utility with multiple search algorithms and format support.",
    "category": PROJECT_CATEGORIES.DEVELOPER_TOOLS.id,
    "tags": [
      "Python",
      "CLI",
      "Search",
      "Regex",
      "Semantic"
    ],
    "technologies": [
      "Python",
      "Regex",
      "Semantic Search",
      "File Processing"
    ],
    "links": {
      "github": "https://github.com/alaamer12/fScan",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/fscan-icon.webp",
      "banner": "/fscan-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.4
  },
  "fastapiex": {
    "id": "fastapiex",
    "title": "fastapiex",
    "description": "Utilities and extensions to supercharge FastAPI applications.",
    "longDescription": "Extension library providing additional utilities and security features for FastAPI.",
    "category": PROJECT_CATEGORIES.DEVELOPER_TOOLS.id,
    "tags": [
      "Python",
      "Security",
      "FastAPI"
    ],
    "technologies": [
      "Python",
      "FastAPI",
      "Security",
      "Web Development"
    ],
    "links": {
      "github": "https://github.com/alaamer12/fastapiex",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/fastapiex-icon.webp",
      "banner": "/fastapiex-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.4
  },
  "feedback_pages_generator": {
    "id": "feedback_pages_generator",
    "title": "feedback-pages-generator",
    "description": "Feedback form generator built with React + TS, configurable via JSON, exportable as HTML pages.",
    "longDescription": "Dynamic feedback form generator with JSON configuration and HTML export capabilities.",
    "category": PROJECT_CATEGORIES.WEB_FRONTEND.id,
    "tags": [
      "React",
      "Feedback",
      "Template"
    ],
    "technologies": [
      "TypeScript",
      "React",
      "JSON Configuration",
      "HTML Generation"
    ],
    "links": {
      "github": "https://github.com/alaamer12/feedback-pages-generator",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/feedback-generator-icon.webp",
      "banner": "/feedback-generator-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.4
  },
  "flowrithm": {
    "id": "flowrithm",
    "title": "Flowrithm",
    "description": "High-precision text dataset generator with symmetric structure, realism, and unlimited row/feature control.",
    "longDescription": "High-precision text dataset generator with symmetric structure, realism, and unlimited row/feature control.",
    "category": PROJECT_CATEGORIES.EXPERIMENTAL.id,
    "tags": [
      "Python",
      "Algorithm",
      "Generator",
      "AI"
    ],
    "technologies": [
      "N/A"
    ],
    "links": {
      "github": "https://github.com/alaamer12/Flowrithm",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/flowrithm-icon.webp",
      "banner": "/flowrithm-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.PRIVATE.id,
    "available": false,
    "featured": false,
    "details": [],
    "delay": 0.2
  },
  "fragma": {
    "id": "fragma",
    "title": "Fragma",
    "description": "A specialized model designed to detect sentence fragments for optimizing autocomplete systems by identifying and classifying text fragments.",
    "longDescription": "A neural network model designed for text processing and classification with comprehensive training infrastructure and user-friendly GUI interface.",
    "category": PROJECT_CATEGORIES.ML_AI.id,
    "tags": [
      "Python",
      "IPYNB",
      "NLP",
      "Neural Networks",
      "Deep Learning",
      "ML"
    ],
    "technologies": [
      "Python",
      "PyTorch",
      "TensorFlow",
      "Jupyter Notebook",
      "GUI Development"
    ],
    "links": {
      "github": "https://github.com/alaamer12/Fragma",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/fragma-icon.webp",
      "darkIcon": "/images/fragma-icon-dark.webp",
      "banner": "/fragma-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.HOT.id,
    "available": true,
    "featured": false,
    "details": [
      "Specialized neural network model for text fragment detection",
      "Comprehensive text processing pipeline with tokenization",
      "User-friendly GUI interface with real-time processing",
      "Training infrastructure for custom NLP models"
    ],
    "delay": 0.4
  },
  "fragma_gui": {
    "id": "fragma_gui",
    "title": "Fragma-GUI",
    "description": "A GUI built on top of the Fragma model for detecting sentence fragments to improve autocomplete systems. Provides a user-friendly interface.",
    "longDescription": "A desktop GUI application built on top of the Fragma model for detecting sentence fragments.",
    "category": PROJECT_CATEGORIES.ML_AI.id,
    "tags": [
      "Python",
      "GUI",
      "NLP",
      "Neural Networks",
      "Deep Learning",
      "ML"
    ],
    "technologies": [
      "Python",
      "Tkinter",
      "PyQt",
      "Machine Learning"
    ],
    "links": {
      "github": "https://github.com/alaamer12/Fragma-GUI",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/fragma-gui-icon.webp",
      "banner": "/fragma-gui-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.2
  },
  "frontend_design_patterns": {
    "id": "frontend_design_patterns",
    "title": "Frontend-Design-Patterns",
    "description": "Collection of React design patterns and best practices, built with modern React and Vite.",
    "longDescription": "Comprehensive collection of frontend design patterns and architectural solutions.",
    "category": PROJECT_CATEGORIES.WEB_FRONTEND.id,
    "tags": [
      "React",
      "Frontend",
      "Design Patterns"
    ],
    "technologies": [
      "React",
      "Vite",
      "TypeScript",
      "Modern Frontend"
    ],
    "links": {
      "github": "https://github.com/alaamer12/Frontend-Design-Patterns",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/frontend-patterns-icon.webp",
      "banner": "/frontend-patterns-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.6
  },
  "ghrepolens": {
    "id": "ghrepolens",
    "title": "GHRepoLens",
    "description": "A tool for analyzing GitHub repositories, generating insightful reports, and visualizing data with dashboards.",
    "longDescription": "A comprehensive tool for analyzing GitHub repositories with detailed reports, insights, and interactive visualizations, featuring web scraping and GitHub API integration.",
    "category": PROJECT_CATEGORIES.DATA_ENGINEERING.id,
    "tags": [
      "Python",
      "Scraper",
      "CLI",
      "Dashboard",
      "Data Engineering",
      "Analysis"
    ],
    "technologies": [
      "Python",
      "Pandas",
      "GitHub API",
      "JavaScript",
      "Data Visualization"
    ],
    "links": {
      "github": "https://github.com/alaamer12/GHRepoLens",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/ghrepolens-icon.webp",
      "banner": "/ghrepolens-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NEW.id,
    "available": true,
    "featured": true,
    "details": [
      "Web scraping and GitHub API integration for large-scale repository data processing",
      "Configurable dashboard system for repository management and contribution analysis",
      "CLI interface with customizable report generation and export capabilities",
      "Interactive visualizations and trend analysis for development team insights"
    ],
    "delay": 0.6
  },
  "gigamon": {
    "id": "gigamon",
    "title": "Gigamon",
    "description": "Chad-themed card game with unique mechanics and gameplay features.",
    "longDescription": "Interactive card game with unique mechanics and engaging gameplay elements.",
    "category": PROJECT_CATEGORIES.GAME_DEVELOPMENT.id,
    "tags": [
      "Game",
      "Godot",
      "Cards",
      "Multiplayer"
    ],
    "technologies": [
      "Godot",
      "Game Development",
      "Card Mechanics"
    ],
    "links": {
      "github": "https://github.com/alaamer12/Gigamon",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/gigamon-icon.webp",
      "banner": "/gigamon-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.2
  },
  "i_calender": {
    "id": "i_calender",
    "title": "ICalender",
    "description": "Calendar app built with React and FullCalendar, featuring event management and persistent local storage.",
    "longDescription": "Full-featured calendar application with event management capabilities.",
    "category": PROJECT_CATEGORIES.WEB_FRONTEND.id,
    "tags": [
      "React",
      "Interactive",
      "Calendar"
    ],
    "technologies": [
      "React",
      "FullCalendar",
      "Local Storage",
      "Event Management"
    ],
    "links": {
      "github": "https://github.com/alaamer12/ICalender",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/icalender-icon.webp",
      "banner": "/icalender-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.2
  },
  "image_editor": {
    "id": "image_editor",
    "title": "ImageEditor",
    "description": "React-based image editor with interactive features, filters, and modern UI using Fabric.js, styled-components, and Zustand.",
    "longDescription": "Professional image editing application built with React and modern web technologies.",
    "category": PROJECT_CATEGORIES.WEB_FRONTEND.id,
    "tags": [
      "React",
      "Fabric.js",
      "Image Editor"
    ],
    "technologies": [
      "React",
      "Fabric.js",
      "styled-components",
      "Zustand"
    ],
    "links": {
      "github": "https://github.com/alaamer12/ImageEditor",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/image-editor-icon.webp",
      "banner": "/image-editor-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.4
  },
  "improcess": {
    "id": "improcess",
    "title": "Improcess",
    "description": "Image processing app with filters and algorithmic transformations.",
    "longDescription": "Desktop image processing application with advanced filtering and transformation capabilities.",
    "category": PROJECT_CATEGORIES.DEVELOPER_TOOLS.id,
    "tags": [
      "Python",
      "Tkinter",
      "GUI",
      "Image Processing",
      "Theming",
      "Filtering"
    ],
    "technologies": [
      "Python",
      "Tkinter",
      "Image Processing",
      "GUI Development"
    ],
    "links": {
      "github": "https://github.com/alaamer12/Improcess",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/improcess-icon.webp",
      "banner": "/improcess-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.6
  },
  "initpy": {
    "id": "initpy",
    "title": "initpy",
    "description": "Tool to initialize Python projects from prompts/ideas.",
    "longDescription": "Tool to initialize Python projects from prompts/ideas.",
    "category": PROJECT_CATEGORIES.DEVELOPER_TOOLS.id,
    "tags": [
      "Python",
      "Template-generator"
    ],
    "technologies": [
      "Python"
    ],
    "links": {
      "github": "https://github.com/alaamer12/initpy",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/initpy-icon.webp",
      "banner": "/initpy-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.PRIVATE.id,
    "available": false,
    "featured": false,
    "details": [],
    "delay": 0.2
  },
  "isnippet": {
    "id": "isnippet",
    "title": "isnippet",
    "description": "Cloud-based snippet manager for Jupyter notebooks.",
    "longDescription": "Code snippet management system designed for Jupyter notebook workflows.",
    "category": PROJECT_CATEGORIES.DEVELOPER_TOOLS.id,
    "tags": [
      "Python",
      "Snippets",
      "IPYNB"
    ],
    "technologies": [
      "Python",
      "Jupyter",
      "Cloud Storage",
      "Snippet Management"
    ],
    "links": {
      "github": "https://github.com/alaamer12/isnippet",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/isnippet-icon.webp",
      "banner": "/isnippet-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.6
  },
  "js_tutorial": {
    "id": "js_tutorial",
    "title": "Js-tutorial",
    "description": "Simple tutorial files for Javascript.",
    "longDescription": "Simple tutorial files for Javascript.",
    "category": PROJECT_CATEGORIES.EDUCATIONAL.id,
    "tags": [
      "JavaScript",
      "Tutorial",
      "Examples"
    ],
    "technologies": [
      "JavaScript"
    ],
    "links": {
      "github": "https://github.com/alaamer12/Js-tutorial",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/js_tutorial-icon.webp",
      "banner": "/js_tutorial-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.2
  },
  "jsdfile": {
    "id": "jsdfile",
    "title": "jsdfile",
    "description": "Fast, lightweight binary JSON parser with small output size.",
    "longDescription": "High-performance binary JSON parser with compact binary format and seamless Python-C integration for data processing applications.",
    "category": PROJECT_CATEGORIES.DEVELOPER_TOOLS.id,
    "tags": [
      "Python",
      "C",
      "JSON",
      "Binary"
    ],
    "technologies": [
      "Python",
      "C Integration",
      "Binary Processing",
      "JSON"
    ],
    "links": {
      "github": "https://github.com/alaamer12/jsdfile",
      "demo": null,
      "pypi": "https://pypi.org/project/jsdfile"
    },
    "images": {
      "icon": "/images/jsdfile-icon.avif",
      "darkIcon": "/images/jsdfile-icon-dark.avif",
      "banner": "/jsdfile-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NEW.id,
    "available": true,
    "featured": false,
    "details": [
      "Compact binary format with significantly smaller output than standard JSON",
      "Seamless Python-C integration with memory-safe operations",
      "Comprehensive API supporting streaming and validation",
      "Cross-platform compatibility for high-performance applications"
    ],
    "delay": 0.6
  },
  "key_flow": {
    "id": "key_flow",
    "title": "KeyFlow",
    "description": "Customizable typing test app with real-time metrics and detailed stats, built in React + Bun.",
    "longDescription": "Advanced typing test application with performance analytics and customization options.",
    "category": PROJECT_CATEGORIES.WEB_FRONTEND.id,
    "tags": [
      "React",
      "Typing App",
      "Configurable"
    ],
    "technologies": [
      "React",
      "Bun",
      "Performance Analytics",
      "Real-time Processing"
    ],
    "links": {
      "github": "https://github.com/alaamer12/KeyFlow",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/keyflow-icon.webp",
      "banner": "/keyflow-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.6
  },
  "lagen": {
    "id": "lagen",
    "title": "LaGen",
    "description": "Generate professional LaTeX docs programmatically using Python + Jinja2.",
    "longDescription": "LaTeX document generation tool with template-based approach for automated document creation.",
    "category": PROJECT_CATEGORIES.DEVELOPER_TOOLS.id,
    "tags": [
      "Python",
      "LaTeX",
      "Jinja2",
      "Markdown",
      "Pdf"
    ],
    "technologies": [
      "TeX",
      "Python",
      "Jinja2",
      "Document Processing"
    ],
    "links": {
      "github": "https://github.com/alaamer12/LaGen",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/lagen-icon.webp",
      "banner": "/lagen-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.6
  },
  "mark": {
    "id": "mark",
    "title": "mark",
    "description": "Categorize and annotate functions based on attributes like complexity.",
    "longDescription": "Function analysis and annotation tool for code quality assessment.",
    "category": PROJECT_CATEGORIES.DEVELOPER_TOOLS.id,
    "tags": [
      "Python",
      "Test Utility"
    ],
    "technologies": [
      "Python",
      "Code Analysis",
      "Testing Utilities"
    ],
    "links": {
      "github": "https://github.com/alaamer12/mark",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/mark-icon.webp",
      "banner": "/mark-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.2
  },
  "meddata": {
    "id": "meddata",
    "title": "MedData",
    "description": "A data hub providing datasets for ML and data science research (Medium, Dev.to, etc.).",
    "longDescription": "A comprehensive data hub providing datasets for ML and data science research, featuring automated ETL pipelines with Pandas and NumPy for data cleaning and preprocessing across diverse formats.",
    "category": PROJECT_CATEGORIES.DATA_ENGINEERING.id,
    "tags": [
      "Python",
      "Data Engineering",
      "Hub",
      "Huggingface",
      "Kaggle",
      "Medium",
      "Dev.to"
    ],
    "technologies": [
      "Python",
      "Pandas",
      "NumPy",
      "Ruby/Jekyll",
      "HuggingFace",
      "Kaggle API"
    ],
    "links": {
      "github": "https://github.com/alaamer12/MedData",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/meddata-icon.webp",
      "banner": "/meddata-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.HOT.id,
    "available": true,
    "featured": true,
    "details": [
      "Automated ETL pipelines with Pandas and NumPy for data cleaning and preprocessing",
      "Website generation using Ruby/Jekyll alongside Python for dataset accessibility",
      "Scalable architecture for continuous dataset discovery and validation",
      "Multi-source data aggregation from HuggingFace, Kaggle, Medium, and Dev.to"
    ],
    "delay": 0.2
  },
  "netice": {
    "id": "netice",
    "title": "Netice",
    "description": "Novel data structure combining nodes into dynamic nets that aggregate into computational lattices.",
    "longDescription": "Novel data structure combining nodes into dynamic nets that aggregate into computational lattices.",
    "category": PROJECT_CATEGORIES.EXPERIMENTAL.id,
    "tags": [
      "Python",
      "Data Structure"
    ],
    "technologies": [
      "Python"
    ],
    "links": {
      "github": "https://github.com/alaamer12/Netice",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/netice-icon.webp",
      "banner": "/netice-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.2
  },
  "notashare": {
    "id": "notashare",
    "title": "NotaShare",
    "description": "Sleek, modern browser-based note-sharing app with full free access.",
    "longDescription": "Collaborative note-sharing platform with modern UI and real-time synchronization.",
    "category": PROJECT_CATEGORIES.WEB_FRONTEND.id,
    "tags": [
      "React",
      "Notes",
      "Shared Database"
    ],
    "technologies": [
      "TypeScript",
      "React",
      "Database Integration",
      "Real-time Sync"
    ],
    "links": {
      "github": "https://github.com/alaamer12/NotaShare",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/nota-share-icon.webp",
      "banner": "/nota-share-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.2
  },
  "online_ide": {
    "id": "online_ide",
    "title": "Online-ide",
    "description": "A simple lightweight, web-based IDE that allows you to write and execute code in multiple programming languages directly in your browser.",
    "longDescription": "Browser-based integrated development environment with multi-language support.",
    "category": PROJECT_CATEGORIES.WEB_FRONTEND.id,
    "tags": [
      "PHP",
      "JavaScript",
      "IDE",
      "Syntax Highlighting"
    ],
    "technologies": [
      "HTML",
      "PHP",
      "JavaScript",
      "Web IDE"
    ],
    "links": {
      "github": "https://github.com/alaamer12/Online-ide",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/online-ide-icon.webp",
      "banner": "/online-ide-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.4
  },
  "optimizedgallery": {
    "id": "optimizedgallery",
    "title": "OptimizedGallery",
    "description": "High-performance React image gallery with virtualized rendering and smart loading.",
    "longDescription": "Performance-optimized image gallery with advanced rendering techniques.",
    "category": PROJECT_CATEGORIES.WEB_FRONTEND.id,
    "tags": [
      "React",
      "Optimization",
      "Gallery"
    ],
    "technologies": [
      "React",
      "Virtualization",
      "Performance Optimization",
      "Image Processing"
    ],
    "links": {
      "github": "https://github.com/alaamer12/OptimizedGallery",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/optimized-gallery-icon.webp",
      "banner": "/optimized-gallery-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.4
  },
  "pixcrawler": {
    "id": "pixcrawler",
    "title": "PixCrawler",
    "description": "Configurable image dataset builder via web crawling (Google, Bing, etc.) using JSON configs.",
    "longDescription": "A sophisticated image dataset builder using web crawling with concurrent architecture, comprehensive error handling, rate limiting, and automatic retry mechanisms.",
    "category": PROJECT_CATEGORIES.DEVELOPER_TOOLS.id,
    "tags": [
      "Python",
      "CLI",
      "Crawler",
      "Dataset Builder"
    ],
    "technologies": [
      "Python",
      "Pandas",
      "JSON",
      "Web Scraping",
      "Concurrent Processing"
    ],
    "links": {
      "github": "https://github.com/alaamer12/PixCrawler",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/pixcrawler-icon.webp",
      "banner": "/pixcrawler-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NEW.id,
    "available": true,
    "featured": false,
    "details": [
      "Concurrent crawling architecture with comprehensive error handling",
      "Scalable data collection pipeline for large-scale image dataset creation",
      "Flexible configuration system allowing custom search parameters",
      "Metadata extraction and organization with intelligent rate limiting"
    ],
    "delay": 0.4
  },
  "practice_examples": {
    "id": "practice_examples",
    "title": "Practice-Examples",
    "description": "Python projects, examples, and tutorials serving as learning resources and references.",
    "longDescription": "Python projects, examples, and tutorials serving as learning resources and references.",
    "category": PROJECT_CATEGORIES.EDUCATIONAL.id,
    "tags": [
      "Python",
      "Tutorial",
      "Examples"
    ],
    "technologies": [
      "Python"
    ],
    "links": {
      "github": "https://github.com/alaamer12/Practice-Examples",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/practice_examples-icon.webp",
      "banner": "/practice_examples-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.2
  },
  "py_solver": {
    "id": "py_solver",
    "title": "PySolver",
    "description": "Implementations of Ant Colony Optimization, Artificial Bee Colony, and Particle Swarm Optimization in Python.",
    "longDescription": "Collection of metaheuristic optimization algorithms for solving complex computational problems.",
    "category": PROJECT_CATEGORIES.ML_AI.id,
    "tags": [
      "Python",
      "Metaheuristic",
      "PSO",
      "ABC",
      "ACO"
    ],
    "technologies": [
      "Python",
      "Optimization Algorithms",
      "Mathematical Computing"
    ],
    "links": {
      "github": "https://github.com/alaamer12/PySolver",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/pysolver-icon.webp",
      "banner": "/pysolver-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.2
  },
  "python_dsa": {
    "id": "python_dsa",
    "title": "Python-DSA",
    "description": "A collection of data structures and algorithms in Python with explanations and examples.",
    "longDescription": "Comprehensive Python implementation of data structures and algorithms for educational purposes.",
    "category": PROJECT_CATEGORIES.EDUCATIONAL.id,
    "tags": [
      "Python",
      "Data Structures",
      "Algorithms",
      "Tutorial"
    ],
    "technologies": [
      "Python",
      "Data Structures",
      "Algorithms",
      "Educational"
    ],
    "links": {
      "github": "https://github.com/alaamer12/Python-DSA",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/python-dsa-icon.webp",
      "banner": "/python-dsa-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.4
  },
  "react_ui_components": {
    "id": "react_ui_components",
    "title": "React-UI-Components",
    "description": "Created with Builder.io",
    "longDescription": "Comprehensive UI component library for React applications.",
    "category": PROJECT_CATEGORIES.WEB_FRONTEND.id,
    "tags": [
      "React",
      "UI",
      "Template"
    ],
    "technologies": [
      "TypeScript",
      "React",
      "UI Components",
      "Styling"
    ],
    "links": {
      "github": "https://github.com/alaamer12/React-UI-Components",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/react-ui-icon.webp",
      "banner": "/react-ui-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.6
  },
  "safe_vision": {
    "id": "safe_vision",
    "title": "SafeVision",
    "description": "Customizable pipeline for downloading NSFW/SFW datasets, training models, and blocking NSFW content.",
    "longDescription": "Computer vision model for content filtering with dataset generation and training capabilities.",
    "category": PROJECT_CATEGORIES.ML_AI.id,
    "tags": [
      "Python",
      "NSFW/SFW Dataset",
      "IPYNB"
    ],
    "technologies": [
      "Python",
      "Computer Vision",
      "Machine Learning",
      "Dataset Processing"
    ],
    "links": {
      "github": "https://github.com/alaamer12/SafeVision",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/safe-vision-icon.webp",
      "banner": "/safe-vision-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.4
  },
  "symphony": {
    "id": "symphony",
    "title": "Symphony",
    "description": "Failed to fetch (404/Private)",
    "longDescription": "Failed to fetch (404/Private)",
    "category": PROJECT_CATEGORIES.ML_AI.id,
    "tags": [
      "Rust",
      "React",
      "Shadcn",
      "Python",
      "AI",
      "LLM",
      "RL",
      "DL"
    ],
    "technologies": [
      "N/A"
    ],
    "links": {
      "github": "https://github.com/alaamer12/Symphony",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/symphony-icon.webp",
      "banner": "/symphony-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.PRIVATE.id,
    "available": false,
    "featured": false,
    "details": [],
    "delay": 0.2
  },
  "team_up": {
    "id": "team_up",
    "title": "TeamUp",
    "description": "Platform for students to find/join teams or recruit members for projects.",
    "longDescription": "Collaborative platform connecting students for academic and project-based teamwork.",
    "category": PROJECT_CATEGORIES.WEB_FRONTEND.id,
    "tags": [
      "React",
      "Student Affairs",
      "Supabase",
      "Express",
      "MongoDB",
      "Localization"
    ],
    "technologies": [
      "TypeScript",
      "React",
      "Supabase",
      "Express",
      "MongoDB"
    ],
    "links": {
      "github": "https://github.com/alaamer12/TeamUp",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/teamup-icon.webp",
      "banner": "/teamup-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NONE.id,
    "available": true,
    "featured": false,
    "details": [],
    "delay": 0.2
  },
  "true_core": {
    "id": "true_core",
    "title": "true_core",
    "description": "Core library providing essential utilities and components for enterprise apps.",
    "longDescription": "Foundation library powering the True ecosystem with essential utilities, design patterns, and robust functionality for data engineering applications.",
    "category": PROJECT_CATEGORIES.TRUE_FAMILY.id,
    "tags": [
      "Python",
      "Utilities"
    ],
    "technologies": [
      "Python",
      "PyPI",
      "Enterprise Architecture",
      "Data Utilities"
    ],
    "links": {
      "github": "https://github.com/alaamer12/true_core",
      "demo": null,
      "pypi": "https://pypi.org/project/true-core"
    },
    "images": {
      "icon": "/images/light_true_core_icon.avif",
      "darkIcon": "/images/dark_true_core_icon.avif",
      "banner": "/true-core-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.HOT.id,
    "available": true,
    "featured": false,
    "details": [
      "Essential utilities and components for enterprise applications",
      "Modular design supporting configuration management and logging",
      "Extensive documentation and testing frameworks",
      "Enterprise-grade reliability and maintenance support"
    ],
    "delay": 0.2
  },
  "true_logging": {
    "id": "true_logging",
    "title": "true-logging",
    "description": "Advanced logging system with structured logging, log rotation, and multiple output formats support.",
    "longDescription": "Comprehensive logging solution with structured logging, rotation policies, and multiple output format support.",
    "category": PROJECT_CATEGORIES.TRUE_FAMILY.id,
    "tags": [
      "Python",
      "Logging",
      "Monitoring"
    ],
    "technologies": [
      "Python",
      "Logging",
      "Monitoring"
    ],
    "links": {
      "github": "https://github.com/alaamer12/true-logging",
      "demo": null,
      "pypi": "https://pypi.org/project/true-logging"
    },
    "images": {
      "icon": "/images/light_true_core_icon.avif",
      "darkIcon": "/images/dark_true_core_icon.avif",
      "banner": "/tealim.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.COMING_SOON.id,
    "available": true,
    "featured": false,
    "details": [
      "Structured logging with customizable log formats",
      "Log rotation and retention policies",
      "Multiple output formats support including JSON and CSV",
      "Easy integration with popular monitoring tools"
    ],
    "delay": 0.6
  },
  "true_storage": {
    "id": "true_storage",
    "title": "true_storage",
    "description": "Storage abstraction layer supporting multiple backend solutions.",
    "longDescription": "Sophisticated storage abstraction layer with automatic data migration, backup, recovery capabilities, and intelligent data placement algorithms.",
    "category": PROJECT_CATEGORIES.TRUE_FAMILY.id,
    "tags": [
      "Python",
      "Storage",
      "Hot/Cold",
      "Env Manager"
    ],
    "technologies": [
      "Python",
      "Storage Abstraction",
      "Cloud Integration",
      "Data Migration"
    ],
    "links": {
      "github": "https://github.com/alaamer12/true_storage",
      "demo": null,
      "pypi": "https://pypi.org/project/true-storage"
    },
    "images": {
      "icon": "/images/light_true_core_icon.avif",
      "darkIcon": "/images/dark_true_core_icon.avif",
      "banner": "/true-storage-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.NEW.id,
    "available": true,
    "featured": false,
    "details": [
      "Environment management with automatic data migration and recovery",
      "Unified API for diverse storage systems including cloud storage",
      "Performance optimization with caching and compression",
      "Intelligent data placement algorithms for hot/cold storage"
    ],
    "delay": 0.4
  },
  "windsurf_scraper": {
    "id": "windsurf_scraper",
    "title": "windsurf-scraper",
    "description": "Flexible scraping framework with multi-protocol, authentication, and extraction support.",
    "longDescription": "Flexible scraping framework with multi-protocol, authentication, and extraction support.",
    "category": PROJECT_CATEGORIES.DEVELOPER_TOOLS.id,
    "tags": [
      "Python",
      "Scraper",
      "Windsurf"
    ],
    "technologies": [
      "Python"
    ],
    "links": {
      "github": "https://github.com/alaamer12/windsurf-scraper",
      "demo": null,
      "pypi": null
    },
    "images": {
      "icon": "/images/windsurf_scraper-icon.webp",
      "banner": "/windsurf_scraper-banner.svg",
      "screenshots": []
    },
    "badge": PROJECT_BADGES.PRIVATE.id,
    "available": false,
    "featured": false,
    "details": [],
    "delay": 0.2
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
  // Manually specify the featured data engineering projects
  const featuredProjectIds = ['meddata', 'codelyzer', 'ghrepolens'];
  
  return featuredProjectIds.map(id => {
    const project = PROJECTS_DATA[id];
    if (!project) return null;
    
    return {
      title: project.title,
      description: project.description,
      image: project.images.icon,
      darkImage: project.images.darkIcon,
      tags: project.technologies,
      github: project.links.github,
      demo: project.links.demo,
      screenshots: project.images.screenshots || [],
      delay: project.delay
    };
  }).filter(Boolean);
};