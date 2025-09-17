import { memo, useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaClock, FaCalendarAlt, FaExpand, FaCompress, FaCheck } from 'react-icons/fa';
import { 
    SERVICE_CATEGORIES, 
    SERVICES_DATA, 
    getFeaturedServices, 
    getServicesByCategory,
    getCategoryById 
} from '../../data/services';
import useOptimizedAnimation from '../../hooks/useOptimizedAnimation';

// Service Image Component
const ServiceImage = memo(({ service, category, isExpanded, onToggleExpand }) => {
    const [imageError, setImageError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const hoverTimeoutRef = useRef(null);

    const handleMouseEnter = useCallback(() => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        hoverTimeoutRef.current = setTimeout(() => {
            setIsHovered(false);
        }, 100); // Small debounce to prevent flickering
    }, []);

    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
        };
    }, []);

    return (
        <motion.div 
            className="relative overflow-hidden rounded-t-xl"
            animate={{ height: isExpanded ? 256 : 192 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {!imageError ? (
                <motion.img 
                    src={service.thumbnail} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                    animate={{ 
                        scale: isHovered ? 1.05 : 1 
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary-light/20 flex items-center justify-center">
                    <span className="text-6xl">{category?.icon}</span>
                </div>
            )}
            
            {/* Category Badge */}
            <motion.div 
                className="absolute top-4 left-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
                <span className={`px-3 py-1 text-xs font-medium bg-gradient-to-r ${category?.color || 'from-gray-500 to-gray-600'} text-white rounded-full shadow-lg`}>
                    {category?.title}
                </span>
            </motion.div>

            {/* Expand/Collapse Button */}
            <motion.div 
                className="absolute top-4 right-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
                <motion.button
                    onClick={() => onToggleExpand(service.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-200 shadow-lg"
                    title={isExpanded ? "Collapse" : "Expand"}
                    aria-label={isExpanded ? "Collapse service details" : "Expand service details"}
                >
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isExpanded ? <FaCompress className="w-3 h-3" /> : <FaExpand className="w-3 h-3" />}
                    </motion.div>
                </motion.button>
            </motion.div>
        </motion.div>
    );
});

// Service Title Component
const ServiceTitle = memo(({ service, platformData }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.a
            href={platformData.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-gray-900 dark:text-white mb-3 hover:text-primary dark:hover:text-primary-light transition-colors duration-200 cursor-pointer flex items-center gap-2 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            <span>{service.title}</span>
            <motion.div
                animate={{ 
                    x: isHovered ? 3 : 0,
                    opacity: isHovered ? 1 : 0.6
                }}
                transition={{ duration: 0.2 }}
            >
                <FaExternalLinkAlt className="w-3 h-3" />
            </motion.div>
        </motion.a>
    );
});

// Platform Selector Component
const PlatformSelector = memo(({ service, selectedPlatform, onPlatformChange }) => {
    const platformKeys = Object.keys(service.platforms);
    
    if (platformKeys.length <= 1) return null;

    return (
        <div className="flex gap-2 mb-4 flex-wrap">
            {platformKeys.map((platformKey) => (
                <motion.button
                    key={platformKey}
                    onClick={() => onPlatformChange(platformKey)}
                    className={`px-3 py-1 text-xs rounded-full border transition-all duration-200 ${
                        selectedPlatform === platformKey
                            ? 'bg-primary text-white border-primary shadow-md'
                            : 'bg-white/10 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-primary/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {service.platforms[platformKey].name}
                </motion.button>
            ))}
        </div>
    );
});

// Feature List Component
const FeatureList = memo(({ title, items, icon: Icon = FaCheck, iconColor = "text-green-500" }) => {
    if (!items || items.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                {title}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {items.map((item, idx) => (
                    <motion.div 
                        key={idx} 
                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: idx * 0.05 }}
                    >
                        <Icon className={`w-3 h-3 ${iconColor} flex-shrink-0 mt-1`} />
                        <span>{item}</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
});

// Technology Tags Component
const TechnologyTags = memo(({ technologies }) => {
    if (!technologies || technologies.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
        >
            <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
                {technologies.map((tech, idx) => (
                    <motion.span 
                        key={idx}
                        className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors duration-200"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: idx * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        {tech}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
});

// Platform Details Component
const PlatformDetails = memo(({ platformData }) => {
    return (
        <div className="mb-4 text-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {platformData.deliveryTime ? (
                        <motion.div 
                            className="flex items-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FaClock className="w-3 h-3 text-primary" />
                            <span className="text-gray-600 dark:text-gray-300">{platformData.deliveryTime}</span>
                        </motion.div>
                    ) : platformData.creationTime ? (
                        <motion.div 
                            className="flex items-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FaCalendarAlt className="w-3 h-3 text-primary" />
                            <span className="text-gray-600 dark:text-gray-300">Since {platformData.creationTime}</span>
                        </motion.div>
                    ) : null}
                </div>
                <motion.div 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {platformData.price && (
                        <span className="text-sm font-bold text-primary dark:text-primary-light">
                            {platformData.price}
                        </span>
                    )}
                    <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                        {platformData.currency}
                    </span>
                </motion.div>
            </div>
        </div>
    );
});

// Contact Button Component
const ContactButton = memo(({ platformData }) => {
    const { settings } = useOptimizedAnimation();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.a
            href={platformData.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-4 py-2 bg-primary hover:bg-primary-light text-white hover:text-white rounded-lg transition-all duration-200 font-medium text-center inline-flex items-center justify-center gap-2 mt-auto shadow-md hover:shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={settings.shouldAnimate ? { scale: 1.03, y: -1 } : {}}
            whileTap={settings.shouldAnimate ? { scale: 0.98 } : {}}
            transition={{ duration: 0.2 }}
        >
            <span>Get Quote</span>
            <motion.div
                animate={{ 
                    x: isHovered ? 2 : 0,
                    rotate: isHovered ? 12 : 0
                }}
                transition={{ duration: 0.2 }}
            >
                <FaExternalLinkAlt className="w-3 h-3" />
            </motion.div>
        </motion.a>
    );
});

// Service Card Component
const ServiceCard = memo(({ service, index, isExpanded, onToggleExpand }) => {
    const { settings } = useOptimizedAnimation();
    const category = getCategoryById(service.category);
    const [selectedPlatform, setSelectedPlatform] = useState(() => Object.keys(service.platforms)[0]);
    const [isCardHovered, setIsCardHovered] = useState(false);
    const cardRef = useRef(null);
    
    const platformData = service.platforms[selectedPlatform];

    const handlePlatformChange = useCallback((platformKey) => {
        setSelectedPlatform(platformKey);
    }, []);

    const handleToggleExpand = useCallback(() => {
        onToggleExpand(service.id);
    }, [service.id, onToggleExpand]);

    const handleMouseEnter = useCallback(() => {
        setIsCardHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsCardHovered(false);
    }, []);

    return (
        <motion.div
            ref={cardRef}
            initial={settings.shouldAnimate ? { opacity: 0, y: 50 } : {}}
            whileInView={settings.shouldAnimate ? { opacity: 1, y: 0 } : {}}
            viewport={{ once: true, margin: "50px" }}
            animate={{
                scale: isExpanded ? 1.02 : (isCardHovered ? 1.01 : 1),
                y: isCardHovered && !isExpanded ? -5 : 0
            }}
            transition={{ 
                duration: 0.3, 
                ease: "easeOut",
                scale: { duration: isExpanded ? 0.5 : 0.3 },
                y: { duration: 0.3 }
            }}
            layout
            layoutDependency={isExpanded}
            className={`bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl border border-white/10 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full ${
                isExpanded ? 'col-span-full' : ''
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Service Image */}
            <ServiceImage 
                service={service}
                category={category}
                isExpanded={isExpanded}
                onToggleExpand={handleToggleExpand}
            />

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Title */}
                <ServiceTitle service={service} platformData={platformData} />

                {/* Description */}
                <motion.p 
                    className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed"
                    animate={{ 
                        height: "auto" 
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {isExpanded ? (service.fullDescription || service.description) : service.description}
                </motion.p>

                {/* Expanded Content */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div 
                            className="space-y-6 mb-6 overflow-hidden"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <FeatureList 
                                title="Key Features" 
                                items={service.features} 
                                icon={FaCheck}
                                iconColor="text-green-500"
                            />

                            <TechnologyTags technologies={service.technologies} />

                            <FeatureList 
                                title="What You'll Get" 
                                items={service.deliverables} 
                                icon={FaCheck}
                                iconColor="text-blue-500"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Platform Selector */}
                <PlatformSelector 
                    service={service}
                    selectedPlatform={selectedPlatform}
                    onPlatformChange={handlePlatformChange}
                />

                {/* Platform Details */}
                <PlatformDetails platformData={platformData} />

                {/* Contact Button */}
                <ContactButton platformData={platformData} />
            </div>
        </motion.div>
    );
});

// Category Filter Component
const CategoryFilter = memo(({ categories, activeCategory, onCategoryChange }) => {
    return (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
            <motion.button
                onClick={() => onCategoryChange('all')}
                className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                    activeCategory === 'all'
                        ? 'bg-primary text-white border-primary shadow-md'
                        : 'bg-white/10 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-primary/10'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
            >
                All Services
            </motion.button>
            {categories.map((category) => (
                <motion.button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                        activeCategory === category.id
                            ? 'bg-primary text-white border-primary shadow-md'
                            : 'bg-white/10 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-primary/10'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="mr-2">{category.icon}</span>
                    {category.title}
                </motion.button>
            ))}
        </div>
    );
});

// Header Component
const ServicesHeader = memo(() => {
    const { settings } = useOptimizedAnimation();

    return (
        <motion.div
            initial={settings.shouldAnimate ? { opacity: 0, y: 30 } : {}}
            whileInView={settings.shouldAnimate ? { opacity: 1, y: 0 } : {}}
            viewport={{ once: true }}
            className="text-center mb-16"
        >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-primary">My</span>{' '}
                <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Professional freelancing services across multiple platforms. From data engineering to web development, 
                I deliver high-quality solutions tailored to your needs.
            </p>
        </motion.div>
    );
});

// Custom Solution CTA Component
const CustomSolutionCTA = memo(() => {
    const { settings } = useOptimizedAnimation();

    const handleScrollToContact = useCallback(() => {
        const element = document.getElementById('contact');
        element?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    return (
        <motion.div 
            className="text-center mt-16"
            initial={settings.shouldAnimate ? { opacity: 0, y: 30 } : {}}
            whileInView={settings.shouldAnimate ? { opacity: 1, y: 0 } : {}}
            viewport={{ once: true }}
        >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Need a Custom Solution?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
                Don't see exactly what you're looking for? Let's discuss your project and create something amazing together.
            </p>
            <motion.button
                whileHover={settings.shouldAnimate ? { scale: 1.05, y: -2 } : {}}
                whileTap={settings.shouldAnimate ? { scale: 0.95 } : {}}
                className="px-8 py-3 bg-primary hover:bg-primary-light text-white rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                onClick={handleScrollToContact}
            >
                Get Custom Quote
            </motion.button>
        </motion.div>
    );
});

// Main Services Component
const Services = () => {
    const { settings } = useOptimizedAnimation();
    const [activeCategory, setActiveCategory] = useState('all');
    const [expandedService, setExpandedService] = useState(null);
    
    const categories = useMemo(() => Object.values(SERVICE_CATEGORIES), []);
    
    const filteredServices = useMemo(() => {
        if (activeCategory === 'all') {
            return Object.values(SERVICES_DATA);
        }
        return getServicesByCategory(activeCategory);
    }, [activeCategory]);

    const handleCategoryChange = useCallback((category) => {
        setActiveCategory(category);
        setExpandedService(null); // Collapse any expanded service when changing category
    }, []);

    const handleToggleExpand = useCallback((serviceId) => {
        setExpandedService(prev => prev === serviceId ? null : serviceId);
    }, []);

    return (
        <section id="services" className="py-20 relative">
            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <ServicesHeader />

                {/* Category Filter */}
                <CategoryFilter 
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={handleCategoryChange}
                />

                {/* Services Grid */}
                <motion.div 
                    className="grid gap-8"
                    style={{
                        gridTemplateColumns: expandedService ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))'
                    }}
                    layout
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    <AnimatePresence mode="wait">
                        {filteredServices.map((service, index) => (
                            <ServiceCard 
                                key={`${activeCategory}-${service.id}`} // Force re-mount when category changes
                                service={service} 
                                index={index}
                                isExpanded={expandedService === service.id}
                                onToggleExpand={handleToggleExpand}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Custom Solution CTA */}
                <CustomSolutionCTA />
            </div>
        </section>
    );
};

// Set display names for better debugging
Services.displayName = 'Services';
ServiceCard.displayName = 'ServiceCard';
ServiceImage.displayName = 'ServiceImage';
ServiceTitle.displayName = 'ServiceTitle';
PlatformSelector.displayName = 'PlatformSelector';
FeatureList.displayName = 'FeatureList';
TechnologyTags.displayName = 'TechnologyTags';
PlatformDetails.displayName = 'PlatformDetails';
ContactButton.displayName = 'ContactButton';
CategoryFilter.displayName = 'CategoryFilter';
ServicesHeader.displayName = 'ServicesHeader';
CustomSolutionCTA.displayName = 'CustomSolutionCTA';

export default memo(Services);