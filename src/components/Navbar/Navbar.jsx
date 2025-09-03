// noinspection JSValidateTypes

import {memo, useState} from "react";
import {Link, useLocation} from 'react-router-dom';
import {AnimatePresence, motion} from 'framer-motion';
import {FaBars, FaMoon, FaSun, FaTimes} from 'react-icons/fa';
import {useTheme} from '../../context/ThemeContext';

// Scroll to section function
const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
};

const NavLink = ({to, children, isScroll = false}) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    if (isScroll) {
        return (
            <div
                onClick={() => scrollToSection(to)}
                className="relative px-4 py-2 rounded-full transition-all duration-300 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light cursor-pointer"
            >
                {children}
            </div>
        );
    }

    return (
        <Link
            to={to}
            className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
                isActive
                    ? 'text-primary dark:text-primary-light'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light'
            }`}
        >
            {children}
            {isActive && (
                <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-sm shadow-lg -z-10"
                    transition={{type: "spring", bounce: 0.2, duration: 0.6}}
                />
            )}
        </Link>
    );
};


const Logo = () => (
    <Link
        to="/"
        className="text-xl select-none font-bold bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent hover:opacity-80 transition-all duration-300"
    >
        Amr Muhamed
    </Link>
);

const ThemeIcon = memo(({isDark, isMobile}) => (
    isDark ? (
        <FaSun className={`w-5 h-5 text-primary-light ${isMobile ? 'mr-2' : ''}`}/>
    ) : (
        <FaMoon className={`w-5 h-5 text-primary ${isMobile ? 'mr-2' : ''}`}/>
    )
));

const ThemeText = memo(({isDark, isMobile}) => (
    isMobile && (
        <span className="text-gray-600 dark:text-gray-300">
            {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
    )
));

const ThemeToggleButton = memo(({isDark, toggleTheme, isMobile = false}) => (
    <motion.button
        onClick={toggleTheme}
        className={`${isMobile ? 'w-full mt-4' : 'ml-4'} p-2 rounded-full
            bg-white/10 dark:bg-gray-800/50
            hover:bg-primary/10 dark:hover:bg-primary/20
            backdrop-blur-sm transition-all duration-300
            shadow-lg shadow-black/5 dark:shadow-white/5
            ${isMobile ? 'flex items-center justify-center' : ''}`}
        whileHover={{scale: isMobile ? 1.02 : 1.05}}
        whileTap={{scale: isMobile ? 0.98 : 0.95}}
    >
        <ThemeIcon isDark={isDark} isMobile={isMobile}/>
        <ThemeText isDark={isDark} isMobile={isMobile}/>
    </motion.button>
));

const ThemeToggle = ({isDark, toggleTheme, isMobile = false}) => (
    <ThemeToggleButton isDark={isDark} toggleTheme={toggleTheme} isMobile={isMobile}/>
);

const DesktopNav = ({isDark, toggleTheme}) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <div className="hidden select-none md:flex items-center space-x-2">
            <NavLink to="/">Home</NavLink>
            {isHomePage ? (
                <NavLink to="about" isScroll={true}>About</NavLink>
            ) : (
                <NavLink to="/#about">About</NavLink>
            )}
            <NavLink to="/projects">Projects</NavLink>
            {isHomePage ? (
                <NavLink to="contact" isScroll={true}>Contact</NavLink>
            ) : (
                <NavLink to="/#contact">Contact</NavLink>
            )}
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme}/>
        </div>
    );
};

const MobileMenuButton = ({isOpen, toggleMenu}) => (
    <motion.button
        onClick={toggleMenu}
        className="p-2 rounded-full md:hidden
            bg-white/10 select-none dark:bg-gray-800/50
            hover:bg-primary/10 dark:hover:bg-primary/20
            backdrop-blur-sm transition-all duration-300
            shadow-lg shadow-black/5 dark:shadow-white/5"
        whileHover={{scale: 1.05}}
        whileTap={{scale: 0.95}}
    >
        {isOpen ? (
            <FaTimes className="w-6 h-6 text-gray-600 dark:text-gray-300"/>
        ) : (
            <FaBars className="w-6 h-6 text-gray-600 dark:text-gray-300"/>
        )}
    </motion.button>
);

const MobileMenu = ({isOpen, isDark, toggleTheme}) => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{opacity: 0, height: 0}}
                    animate={{opacity: 1, height: "auto"}}
                    exit={{opacity: 0, height: 0}}
                    className="relative md:hidden"
                >
                    <div
                        className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-white/10 dark:border-gray-800/50"/>
                    <div className="relative px-4 py-4 space-y-3">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/projects">Projects</NavLink>
                        {isHomePage ? (
                            <NavLink to="about" isScroll={true}>About</NavLink>
                        ) : (
                            <NavLink to="/about">About</NavLink>
                        )}
                        <NavLink to="contact" isScroll={true}>Contact</NavLink>
                        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} isMobile/>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const Navbar = () => {
    const {isDark, toggleTheme} = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <motion.nav
            initial={{y: -100}}
            animate={{y: 0}}
            className="fixed top-0 left-0 right-0 z-50"
        >
            <div
                className="absolute inset-0 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border-b border-white/10 dark:border-gray-800/50 shadow-2xl shadow-blue-500/5 dark:shadow-blue-400/10"/>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Logo/>
                    <DesktopNav isDark={isDark} toggleTheme={toggleTheme}/>
                    <MobileMenuButton isOpen={isOpen} toggleMenu={toggleMenu}/>
                </div>
            </div>
            <MobileMenu isOpen={isOpen} isDark={isDark} toggleTheme={toggleTheme}/>
        </motion.nav>
    );
};

export default Navbar;

