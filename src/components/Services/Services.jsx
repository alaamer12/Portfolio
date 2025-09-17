import { memo, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaClock, FaCalendarAlt } from 'react-icons/fa';
import { 
    SERVICE_CATEGORIES, 
    SERVICES_DATA, 
    getFeaturedServices, 
    getServicesByCategory,
    getCategoryById 
} from '../../data/services';
import useOptimizedAnimation from '../../hooks/useOptimizedAnimation';

// Service Card with fixed positioning and images
const ServiceCard = memo(({ service, index }) => {
    const { settings } = useOptimizedAnimation();
    const category = getCategoryById(service.category);
    const [selectedPlatform, setSelectedPlatform] = useState(Object.keys(service.platforms)[0]);
    const [imageError, setImageError] = useState(false);
    
    const platformData = service.platforms[selectedPlatform];
    const platformKeys = Object.keys(service.platforms);

    return (
        <motion.div
            initial={settings.shouldAnimate ? { opacity: 0, y: 50 } : {}}
            whileInView={settings.shouldAnimate ? { opacity: 1, y: 0 } : {}}
            viewport={{ once: true, margin: "50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={settings.shouldAnimate ? { scale: 1.02 } : {}}
            className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl border border-white/10 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
        >
            {/* Service Image */}
            <div className="relative h-48 overflow-hidden rounded-t-xl">
                {!imageError ? (
                    <img 
                        src={service.thumbnail} 
                        alt={service.title}
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary-light/20 flex items-center justify-center">
                        <span className="text-6xl">{category?.icon}</span>
                    </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm text-white rounded-full">
                        {category?.title}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed flex-grow">
                    {service.description}
                </p>

                {/* Platform Selector */}
                {platformKeys.length > 1 && (
                    <div className="flex gap-2 mb-4">
                        {platformKeys.map((platformKey) => (
                            <button
                                key={platformKey}
                                onClick={() => setSelectedPlatform(platformKey)}
                                className={`px-3 py-1 text-xs rounded-full border transition-all ${
                                    selectedPlatform === platformKey
                                        ? 'bg-primary text-white border-primary'
                                        : 'bg-white/10 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-primary'
                                }`}
                            >
                                {service.platforms[platformKey].name}
                            </button>
                        ))}
                    </div>
                )}

                {/* Platform Details */}
                <div className="mb-4 text-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {platformData.deliveryTime ? (
                                <>
                                    <FaClock className="w-3 h-3 text-primary" />
                                    <span className="text-gray-600 dark:text-gray-300">{platformData.deliveryTime}</span>
                                </>
                            ) : platformData.creationTime ? (
                                <>
                                    <FaCalendarAlt className="w-3 h-3 text-primary" />
                                    <span className="text-gray-600 dark:text-gray-300">Since {platformData.creationTime}</span>
                                </>
                            ) : null}
                        </div>
                        <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                            {platformData.currency}
                        </span>
                    </div>
                </div>

                {/* Contact Button - Fixed at bottom */}
                <motion.a
                    href={platformData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={settings.shouldAnimate ? { scale: 1.05 } : {}}
                    whileTap={settings.shouldAnimate ? { scale: 0.95 } : {}}
                    className="w-full px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-lg transition-colors duration-200 font-medium text-center inline-flex items-center justify-center gap-2 mt-auto"
                >
                    <span>Get Quote</span>
                    <FaExternalLinkAlt className="w-3 h-3" />
                </motion.a>
            </div>
        </motion.div>
    );
});

// Main Services Component
const Services = () => {
    const { settings } = useOptimizedAnimation();
    const [activeCategory, setActiveCategory] = useState('all');
    
    const categories = useMemo(() => Object.values(SERVICE_CATEGORIES), []);
    
    const filteredServices = useMemo(() => {
        if (activeCategory === 'all') {
            return Object.values(SERVICES_DATA);
        }
        return getServicesByCategory(activeCategory);
    }, [activeCategory]);

    return (
        <section id="services" className="py-20 relative">
            <div className="container mx-auto px-4 relative z-10">
                {/* Header - Special styling like Featured Projects */}
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
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Professional freelancing services across multiple platforms. From data engineering to web development, 
                        I deliver high-quality solutions tailored to your needs.
                    </p>
                </motion.div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                            activeCategory === 'all'
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white/10 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-primary'
                        }`}
                    >
                        All Services
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                                activeCategory === category.id
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-white/10 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-primary'
                            }`}
                        >
                            {category.icon} {category.title}
                        </button>
                    ))}
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {filteredServices.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={settings.shouldAnimate ? { opacity: 0, y: 30 } : {}}
                    whileInView={settings.shouldAnimate ? { opacity: 1, y: 0 } : {}}
                    viewport={{ once: true }}
                    className="text-center p-8 bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl border border-white/10 dark:border-gray-700/50"
                >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Need a Custom Solution?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                        Don't see exactly what you're looking for? Let's discuss your project and create something amazing together.
                    </p>
                    <motion.button
                        whileHover={settings.shouldAnimate ? { scale: 1.05 } : {}}
                        whileTap={settings.shouldAnimate ? { scale: 0.95 } : {}}
                        className="px-8 py-3 bg-primary hover:bg-primary-light text-white rounded-lg transition-colors duration-200 font-medium"
                        onClick={() => {
                            const element = document.getElementById('contact');
                            element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Get Custom Quote
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

Services.displayName = 'Services';
ServiceCard.displayName = 'ServiceCard';

export default memo(Services);