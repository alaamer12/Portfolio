import {motion} from 'framer-motion';
import {useInView} from 'react-intersection-observer';
import {FaGithub, FaPython} from 'react-icons/fa';
import {OptimizedBlock} from '../OptimizedMillion';

const packages = [
    {
        name: 'true-core',
        description: 'Core foundation for the true ecosystem of Python packages',
        pypi: 'https://pypi.org/project/true-core/',
        github: 'https://github.com/alaamer12',
    },
    {
        name: 'true-storage',
        description: 'Storage management solution in the true ecosystem',
        pypi: 'https://pypi.org/project/true-storage/',
        github: 'https://github.com/alaamer12',
    },
    {
        name: 'true-logging',
        description: 'Advanced logging solution in the true ecosystem',
        pypi: 'https://pypi.org/project/true-logging/',
        github: 'https://github.com/alaamer12',
    },
    {
        name: 'fastapi-utilities',
        description: 'Extended functionality for FastAPI framework',
        pypi: 'https://pypi.org/project/fastapi-utilities/',
        github: 'https://github.com/alaamer12',
    },
];

const PackageCard = ({pkg, index}) => {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    return (
        <motion.div
            ref={ref}
            initial={{opacity: 0, x: index % 2 === 0 ? -50 : 50}}
            animate={inView ? {opacity: 1, x: 0} : {opacity: 0, x: index % 2 === 0 ? -50 : 50}}
            transition={{duration: 0.5, delay: index * 0.1}}
            className="bg-surface-light dark:bg-surface rounded-lg p-6 shadow-light-lg dark:shadow-dark-lg hover:shadow-light-xl dark:hover:shadow-dark-xl transition-all"
        >
            <div className="flex items-center mb-4">
                <FaPython className="text-accent text-2xl mr-2"/>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{pkg.name}</h3>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-4">{pkg.description}</p>

            <div className="flex space-x-4">
                <a
                    href={pkg.pypi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-light transition-colors"
                >
                    PyPI Package
                </a>
                <a
                    href={pkg.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-light transition-colors flex items-center"
                >
                    <FaGithub className="mr-1"/>
                    GitHub
                </a>
            </div>
        </motion.div>
    );
};

const OpenSource = () => {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    return (
        <section className="py-20" id="opensource">
            <div className="w-full max-w-6xl mx-auto">
                <motion.div
                    ref={ref}
                    initial={{opacity: 0, y: 50}}
                    animate={inView ? {opacity: 1, y: 0} : {opacity: 0, y: 50}}
                    transition={{duration: 0.5}}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-[#f1f1f1]">
                        Open Source Contributions
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {packages.map((pkg, index) => (
                        <OptimizedBlock key={pkg.name} enableCache={true} threshold={20}>
                            <PackageCard key={pkg.name} pkg={pkg} index={index}/>
                        </OptimizedBlock>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OpenSource;
