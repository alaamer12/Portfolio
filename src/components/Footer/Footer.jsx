import {FaEnvelope, FaGithub, FaLinkedin} from 'react-icons/fa';
import {motion} from 'framer-motion';
import {OptimizedLoop} from '../OptimizedMillion';
import {useCallback} from 'react';
import {Link} from 'react-router-dom';

const socialLinks = [
    {
        Icon: FaGithub,
        href: 'https://github.com/alaamer12',
        label: 'GitHub'
    },
    {
        Icon: FaLinkedin,
        href: 'https://www.linkedin.com/in/al-aamer-0b0709265/',
        label: 'LinkedIn'
    },
    {
        Icon: FaEnvelope,
        href: 'mailto:amrmuhamed86@gmail.com',
        label: 'Email'
    }
];

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const renderSocialLink = useCallback(({Icon, href}) => (
        <motion.a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{scale: 1.1}}
            className="text-gray-600 mx-8 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
        >
            <Icon className="w-6 h-6"/>
        </motion.a>
    ), []);

    return (
        <footer
            className="bg-white/10  dark:bg-gray-800/50 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col items-center space-y-6">
                    {/* Copyright */}
                    <div className="text-gray-600 dark:text-gray-300">
                        {currentYear} Amr Muhamed. All rights reserved.
                    </div>

                    {/* Social Links */}
                    <div className="flex py-0">
                        <OptimizedLoop
                            items={socialLinks}
                            renderItem={renderSocialLink}
                            className="flex "
                        />
                    </div>

                    {/* Quick Links */}
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                        <Link to="/about"
                           className="hover:text-primary dark:hover:text-primary-light transition-colors">About</Link>
                        <span className="mx-2">·</span>
                        <Link to="/projects"
                           className="hover:text-primary dark:hover:text-primary-light transition-colors">Projects</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
