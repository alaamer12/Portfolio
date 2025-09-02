import {memo, useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {SiJupyter, SiNumpy, SiPandas, SiPython, SiStreamlit, SiTensorflow} from 'react-icons/si';
import {OptimizedBlock} from '../OptimizedMillion';
import {useDeviceDetect} from '../../hooks/useDeviceDetect';

const TechnicalSkillCard = memo(({Icon, name, url}) => {
    const isMobile = useDeviceDetect();

    return (
        <AnimatedCard isMobile={isMobile}>
            <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4">
                <SkillIcon Icon={Icon}/>
                <div className="flex-1">
                    <SkillName name={name}/>
                </div>
            </a>
        </AnimatedCard>
    );
});

const RegularSkillCard = memo(({title, description}) => {
    const isMobile = useDeviceDetect();

    return (
        <AnimatedCard isMobile={isMobile}>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">{description}</p>
        </AnimatedCard>
    );
});

const AnimatedCard = memo(({children, isMobile}) => (
    <motion.div
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        whileHover={isMobile ? {} : {scale: 1.05}}
        transition={{
            duration: isMobile ? 0.3 : 0.5,
            useTransform: !isMobile
        }}
        className="bg-[#f6f6f6] dark:bg-gray-800 backdrop-blur-md rounded-xl p-4 md:p-6 shadow-lg border border-gray-200 dark:border-gray-700"
    >
        {children}
    </motion.div>
));

const SkillIcon = memo(({Icon}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div className="relative w-6 h-6 md:w-8 md:h-8">
            {!isLoaded && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full"/>
            )}
            {isLoaded && (
                <Icon className="w-full h-full text-primary dark:text-primary-light"/>
            )}
        </div>
    );
});

const SkillName = memo(({name}) => (
    <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
));

const SkillCard = memo(({Icon, name, title, description, url}) => {
    if (Icon && name) {
        return <TechnicalSkillCard Icon={Icon} name={name} url={url}/>;
    }
    return <RegularSkillCard title={title} description={description}/>;
});

const SkillChip = ({skill, url}) => (
    <motion.div
        initial={{opacity: 0, scale: 0.9}}
        whileInView={{opacity: 1, scale: 1}}
        whileHover={{scale: 1.05}}
        className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600"
    >
        <a href={url} target="_blank" rel="noopener noreferrer"
           className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {skill}
        </a>
    </motion.div>
);

const skillsData = [
    {
        title: "Data Engineering",
        description: "Expert in building scalable ETL/ELT pipelines with Python, Pandas, and NumPy for large-scale data processing"
    },
    {
        title: "Machine Learning",
        description: "Specialized in ML model development and deployment using PyTorch, TensorFlow, and scikit-learn"
    },
    {
        title: "Data Visualization",
        description: "Creating interactive dashboards and rich-terminal visualizations with Plotly, Chart.js, and Streamlit"
    }
];

const mainSkills = [
    {Icon: SiPython, name: 'Python', url: 'https://www.python.org/'},
    {Icon: SiPandas, name: 'Pandas', url: 'https://pandas.pydata.org/'},
    {Icon: SiNumpy, name: 'NumPy', url: 'https://numpy.org/'},
    {Icon: SiTensorflow, name: 'TensorFlow', url: 'https://www.tensorflow.org/'},
    {Icon: SiStreamlit, name: 'Streamlit', url: 'https://streamlit.io/'},
    {Icon: SiJupyter, name: 'Jupyter', url: 'https://jupyter.org/'},
];

const otherSkills = [
    {name: 'PyTorch', url: 'https://pytorch.org/'},
    {name: 'scikit-learn', url: 'https://scikit-learn.org/'},
    {name: 'Plotly', url: 'https://plotly.com/'},
    {name: 'Chart.js', url: 'https://www.chartjs.org/'},
    {name: 'MongoDB', url: 'https://www.mongodb.com/'},
    {name: 'Supabase', url: 'https://supabase.com/'},
    {name: 'PostgreSQL', url: 'https://www.postgresql.org/'},
    {name: 'Redis', url: 'https://redis.io/'},
    {name: 'Docker', url: 'https://www.docker.com/'},
    {name: 'Git', url: 'https://git-scm.com/'},
    {name: 'REST APIs', url: 'https://restfulapi.net/'},
    {name: 'Web Scraping', url: 'https://en.wikipedia.org/wiki/Web_scraping'},
    {name: 'ETL Pipelines', url: 'https://en.wikipedia.org/wiki/Extract,_transform,_load'},
    {name: 'Data Warehousing', url: 'https://en.wikipedia.org/wiki/Data_warehouse'},
    {name: 'Statistical Analysis', url: 'https://en.wikipedia.org/wiki/Statistics'},
    {name: 'Data Mining', url: 'https://en.wikipedia.org/wiki/Data_mining'},
    {name: 'Big Data', url: 'https://en.wikipedia.org/wiki/Big_data'},
];

const Skills = () => {
    return (
        <section id="skills" className="py-32 md:py-48">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold leading-tight md:text-4xl text-gray-900 dark:text-white">
                        My Skills & Expertise
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        Hard, verifiable technical skills and expertise areas
                    </p>
                </div>

                <OptimizedBlock>
                    <div className="mb-20 md:mb-24">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Core Technologies</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {mainSkills.map((skill, index) => (
                                <SkillCard key={`main-skill-${index}`} {...skill} />
                            ))}
                        </div>
                    </div>
                </OptimizedBlock>

                <OptimizedBlock>
                    <div className="mb-20 md:mb-24">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Specialized Areas</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {skillsData.map((skill, index) => (
                                <SkillCard key={`specialized-skill-${index}`} {...skill} />
                            ))}
                        </div>
                    </div>
                </OptimizedBlock>

                <OptimizedBlock>
                    <div className="relative">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Additional
                            Technologies</h3>
                        <div className="flex flex-wrap gap-4">
                            {otherSkills.map((skill, index) => (
                                <SkillChip key={`other-skill-${index}`} skill={skill.name} url={skill.url}/>
                            ))}
                        </div>
                    </div>
                </OptimizedBlock>
            </div>
        </section>
    );
};

export default Skills;
