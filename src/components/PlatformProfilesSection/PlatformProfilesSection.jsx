import { useState } from 'react';
import { motion } from 'framer-motion';

// Simple Platform Card
const PlatformCard = ({ platform, index, onHover, isHovered }) => {
    return (
        <motion.a
            href={platform.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            onMouseEnter={() => onHover(platform.id)}
            onMouseLeave={() => onHover(null)}
        >
            <motion.div
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                animate={{
                    borderColor: isHovered ? platform.color : undefined,
                    boxShadow: isHovered 
                        ? `0 20px 40px ${platform.color}20` 
                        : undefined
                }}
            >
                {/* Platform Icon */}
                <motion.div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto"
                    style={{
                        background: `linear-gradient(135deg, ${platform.color}, ${platform.color}DD)`
                    }}
                    animate={{
                        scale: isHovered ? 1.1 : 1,
                        rotate: isHovered ? [0, -5, 5, 0] : 0
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {platform.flag}
                </motion.div>

                {/* Platform Name */}
                <h3 className="text-lg font-bold text-center text-gray-900 dark:text-white mb-3">
                    {platform.name}
                </h3>

                {/* Stats */}
                <div className="space-y-2">
                    {Object.entries(platform.stats).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400 capitalize">
                                {key}:
                            </span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                                {value}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Hover indicator */}
                <motion.div
                    className="mt-4 h-1 rounded-full"
                    style={{ backgroundColor: platform.color }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>
        </motion.a>
    );
};

// Central Avatar
const CentralAvatar = () => {
    return (
        <motion.div
            className="relative mx-auto mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="relative w-32 h-32 mx-auto">
                {/* Background rings */}
                <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                
                <motion.div
                    className="absolute inset-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-15"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />

                {/* Avatar image */}
                <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                    <img
                        src="/images/hero.avif"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Pulse effect */}
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-blue-400/40"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
        </motion.div>
    );
};

// Simple connecting lines
const SimpleConnections = ({ platforms, hoveredPlatform }) => {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full">
                {platforms.map((platform, index) => {
                    const isActive = hoveredPlatform === platform.id;
                    const angle = (index * 90) - 45; // Spread evenly
                    const startX = 50; // Center
                    const startY = 30; // Avatar position
                    const endX = 50 + (index % 2 === 0 ? -35 : 35);
                    const endY = 70 + (index < 2 ? -20 : 20);

                    return (
                        <motion.line
                            key={platform.id}
                            x1={`${startX}%`}
                            y1={`${startY}%`}
                            x2={`${endX}%`}
                            y2={`${endY}%`}
                            stroke={platform.color}
                            strokeWidth={isActive ? 3 : 2}
                            opacity={isActive ? 0.8 : 0.3}
                            strokeDasharray="5,5"
                            initial={{ pathLength: 0 }}
                            animate={{ 
                                pathLength: 1,
                                strokeDashoffset: isActive ? [0, -10] : 0
                            }}
                            transition={{
                                pathLength: { duration: 1, delay: index * 0.2 },
                                strokeDashoffset: { 
                                    duration: 1, 
                                    repeat: isActive ? Infinity : 0,
                                    ease: "linear" 
                                }
                            }}
                        />
                    );
                })}
            </svg>
        </div>
    );
};

// Main Component
const PlatformProfilesSection = () => {
    const [hoveredPlatform, setHoveredPlatform] = useState(null);

    // Mock data - replace with your actual data
    const platforms = [
        {
            id: 'khamasat',
            name: 'Khamasat',
            flag: 'SA',
            color: '#10B981',
            profileUrl: '#',
            stats: { rating: '4.9/5', projects: '50+', hours: '1000+' }
        },
        {
            id: 'elharefa',
            name: 'elharefa',
            flag: 'EG',
            color: '#F59E0B',
            profileUrl: '#',
            stats: { rating: '4.8/5', projects: '12', clients: '8' }
        },
        {
            id: 'upwork',
            name: 'Upwork',
            flag: '○',
            color: '#06A663',
            profileUrl: '#',
            stats: { rating: '4.9/5', projects: '500+', earned: '$50K+' }
        },
        {
            id: 'mostaql',
            name: 'Mostaql',
            flag: 'SA',
            color: '#3B82F6',
            profileUrl: '#',
            stats: { rating: '4.7/5', projects: '30+', reviews: '25' }
        }
    ];

    return (
        <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="text-blue-600">Connect</span>{' '}
                        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Across Platforms
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Choose your preferred platform and let's bring your vision to life with{' '}
                        <span className="text-blue-600 font-semibold">world-class expertise</span> and{' '}
                        <span className="text-blue-600 font-semibold">proven results</span>.
                    </p>
                </motion.div>

                {/* Content */}
                <div className="relative">
                    {/* Central Avatar */}
                    <CentralAvatar />

                    {/* Simple connecting lines */}
                    <div className="relative mb-12">
                        <SimpleConnections 
                            platforms={platforms} 
                            hoveredPlatform={hoveredPlatform} 
                        />
                    </div>

                    {/* Platform Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {platforms.map((platform, index) => (
                            <PlatformCard
                                key={platform.id}
                                platform={platform}
                                index={index}
                                onHover={setHoveredPlatform}
                                isHovered={hoveredPlatform === platform.id}
                            />
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <motion.div 
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Ready to get started? Choose any platform above to view my profile and begin our collaboration.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default PlatformProfilesSection;