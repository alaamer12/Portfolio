import {motion} from 'framer-motion';
import {FaGithub, FaLinkedin} from 'react-icons/fa';
import heroImage from '/images/hero.png';
import ShimmerEffect from './ShimmerEffect';
import {OptimizedBlock} from '../OptimizedMillion';

const StatBox = ({number, text, delay, color, hoverColor}) => (
    <motion.div
        initial={{opacity: 0, scale: 0.5}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 0.5, delay}}
        className="text-center group"
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.95}}
    >
        <motion.div
            className={`text-4xl font-bold transition-colors ${color} group-hover:${hoverColor}`}
            whileHover={{y: -2}}
        >
            {number}
        </motion.div>
        <motion.div
            className={`text-sm text-gray-700 dark:text-gray-300 transition-colors group-hover:${hoverColor}`}
            whileHover={{y: 2}}
        >
            {text}
        </motion.div>
    </motion.div>
);

const Hero = () => {
    const stats = [
        {
            number: "150+",
            text: "GitHub Repositories",
            delay: 0.1,
            color: "text-gray-800 dark:text-white",
            hoverColor: "text-primary dark:text-primary-light"
        },
        {
            number: "86%",
            text: "Python Projects",
            delay: 0.25,
            color: "text-gray-800 dark:text-white",
            hoverColor: "text-strawberry dark:text-strawberry-light"
        },
        {
            number: "10+",
            text: "PyPI Packages",
            delay: 0.4,
            color: "text-gray-800 dark:text-white",
            hoverColor: "text-cherry-pie dark:text-cherry-pie-light"
        }
    ];

    return (
        <section className="w-full min-h-screen flex items-center justify-center py-20">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Text content */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8}}
                        className="space-y-8 text-center lg:text-left"
                    >
                        <h1 className="text-6xl md:text-7xl font-bold relative">
              <span
                  className="inline-block animate-gradient-flow bg-gradient-to-r from-primary via-strawberry to-cherry-pie dark:from-primary-light dark:via-strawberry-light dark:to-cherry-pie-light bg-clip-text text-transparent">
                Amr{' '}
                  <span
                      className="inline-block animate-gradient-flow bg-gradient-to-r from-cherry-pie via-accent to-strawberry dark:from-cherry-pie-light dark:via-accent-light dark:to-strawberry-light bg-clip-text text-transparent">
                  Muhamed
                </span>
              </span>
                        </h1>
                        <h2 className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 font-light">
                            Python and Backend Expert
                        </h2>

                        <div className="flex justify-center lg:justify-start space-x-16 cursor-default">
                            {stats.map((stat) => (
                                <OptimizedBlock key={stat.text} enableCache={true} threshold={20} className="mr-5 z-20">
                                    <StatBox
                                        number={stat.number}
                                        text={stat.text}
                                        delay={stat.delay}
                                        color={stat.color}
                                        hoverColor={stat.hoverColor}
                                    />
                                </OptimizedBlock>
                            ))}
                        </div>

                        <div className="flex justify-center lg:justify-start space-x-4">
                            <motion.a
                                href="https://github.com/alaamer12"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-3xl text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                                whileHover={{scale: 1.1}}
                                whileTap={{scale: 0.9}}
                            >
                                <FaGithub/>
                            </motion.a>
                            <motion.a
                                href="https://www.linkedin.com/in/al-aamer-0b0709265/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-3xl text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                                whileHover={{scale: 1.1}}
                                whileTap={{scale: 0.9}}
                            >
                                <FaLinkedin/>
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Right side - Hero Image */}
                    <motion.div
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 0.8, delay: 0.2}}
                        className="relative mt-8 lg:mt-0"
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-strawberry/20 to-cherry-pie/20 dark:from-strawberry-dark/20 dark:to-cherry-pie-dark/20 rounded-3xl filter blur-xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 0.8, 0.5],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            className="relative group cursor-pointer"
                            whileHover={{scale: 1.02}}
                            transition={{duration: 0.3}}
                            onClick={() => window.location.href = '/about'}
                        >
                            <div
                                className="relative w-3/4 sm:w-2/3 md:w-1/2 lg:w-full mx-auto overflow-hidden rounded-3xl">
                                <img
                                    src={heroImage}
                                    alt="Amr Muhamed"
                                    className="w-full h-auto rounded-3xl shadow-xl"
                                />
                                <motion.div
                                    className="absolute inset-0"
                                    initial="hidden"
                                    whileHover="visible"
                                >
                                    <ShimmerEffect/>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
