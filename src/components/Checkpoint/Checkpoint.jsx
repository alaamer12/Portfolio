import {useEffect, useMemo, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {FaCheck, FaDownload, FaEnvelope, FaStar} from 'react-icons/fa';

const Checkpoint = () => {
    const [cvDownloaded, setCvDownloaded] = useState(false);
    const [messageSent, setMessageSent] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);

    const motivationalMessages = useMemo(() => [
        "We are going to do great things together! 🚀",
        "Every step starts with a word! 💬",
        "Amazing! Let's build something extraordinary! ✨",
        "Perfect! The journey of collaboration begins! 🌟",
        "Fantastic! Ready to create magic together! 🎯",
        "Excellent! Let's turn ideas into reality! 💡"
    ], []);

    const [currentMessage, setCurrentMessage] = useState('');

    // Check localStorage for existing progress
    useEffect(() => {
        const cvStatus = localStorage.getItem('cvDownloaded') === 'true';
        const messageStatus = localStorage.getItem('messageSent') === 'true';

        setCvDownloaded(cvStatus);
        setMessageSent(messageStatus);

        if (cvStatus && messageStatus && !showCelebration) {
            setShowCelebration(true);
            setCurrentMessage(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]);
        }
    }, [motivationalMessages]);

    // Listen for CV download events
    useEffect(() => {
        const handleCvDownload = () => {
            setCvDownloaded(true);
            localStorage.setItem('cvDownloaded', 'true');
        };

        window.addEventListener('cvDownloaded', handleCvDownload);
        return () => window.removeEventListener('cvDownloaded', handleCvDownload);
    }, []);

    // Listen for message sent events
    useEffect(() => {
        const handleMessageSent = () => {
            setMessageSent(true);
            localStorage.setItem('messageSent', 'true');
        };

        window.addEventListener('messageSent', handleMessageSent);
        return () => window.removeEventListener('messageSent', handleMessageSent);
    }, []);

    // Show celebration when both checkpoints are completed
    useEffect(() => {
        if (cvDownloaded && messageSent && !showCelebration) {
            setShowCelebration(true);
            setCurrentMessage(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]);
        }
    }, [cvDownloaded, messageSent, showCelebration, motivationalMessages]);

    const checkpoints = useMemo(() => [
        {
            id: 'cv',
            icon: FaDownload,
            label: 'Download CV',
            completed: cvDownloaded,
            description: 'Get my resume'
        },
        {
            id: 'message',
            icon: FaEnvelope,
            label: 'Send Message',
            completed: messageSent,
            description: 'Reach out to me'
        }
    ], [cvDownloaded, messageSent]);

    const progressPercentage = cvDownloaded && messageSent ? 100 : cvDownloaded || messageSent ? 50 : 0;

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Mobile Compact Version */}
            <div className="block md:hidden">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    className="bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-800/40 dark:to-gray-900/20 backdrop-blur-xl rounded-xl p-4 border border-white/20 dark:border-gray-700/30 shadow-xl"
                >
                    {/* Compact Header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <FaStar className="w-4 h-4 text-primary dark:text-primary-light"/>
                            <span className="text-sm font-semibold text-primary dark:text-primary-light">
                                Connection Progress
                            </span>
                        </div>
                        <span className="text-sm font-bold text-primary dark:text-primary-light">
                            {progressPercentage}%
                        </span>
                    </div>

                    {/* Compact Progress Bar */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary to-primary-light dark:from-primary-light dark:to-primary rounded-full"
                            initial={{width: '0%'}}
                            animate={{width: `${progressPercentage}%`}}
                            transition={{duration: 1, ease: 'easeOut'}}
                        />
                    </div>

                    {/* Compact Checkpoints */}
                    <div className="flex gap-3">
                        {checkpoints.map((checkpoint, index) => {
                            const Icon = checkpoint.icon;
                            return (
                                <motion.div
                                    key={checkpoint.id}
                                    initial={{opacity: 0, scale: 0.8}}
                                    animate={{opacity: 1, scale: 1}}
                                    transition={{delay: index * 0.1}}
                                    className={`relative flex-1 p-3 rounded-lg border transition-all duration-300 ${checkpoint.completed
                                        ? 'bg-gradient-to-br from-primary/10 to-primary-light/10 border-primary/30 dark:border-primary-light/30'
                                        : 'bg-white/5 dark:bg-gray-800/20 border-gray-300/30 dark:border-gray-600/30'
                                    }`}
                                >
                                    {/* Completion Badge */}
                                    {checkpoint.completed && (
                                        <motion.div
                                            initial={{scale: 0}}
                                            animate={{scale: 1}}
                                            className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center"
                                        >
                                            <FaCheck className="w-2.5 h-2.5 text-white"/>
                                        </motion.div>
                                    )}

                                    {/* Compact Icon */}
                                    <div
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 mx-auto transition-all duration-300 ${checkpoint.completed
                                            ? 'bg-gradient-to-r from-primary to-primary-light text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                                        }`}>
                                        <Icon className="w-4 h-4"/>
                                    </div>

                                    {/* Compact Label */}
                                    <div className="text-center">
                                        <h4 className={`text-xs font-semibold transition-colors ${checkpoint.completed
                                            ? 'text-primary dark:text-primary-light'
                                            : 'text-gray-700 dark:text-gray-300'
                                        }`}>
                                            {checkpoint.label}
                                        </h4>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Compact Celebration */}
                    <AnimatePresence>
                        {showCelebration && (
                            <motion.div
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -10}}
                                className="mt-4 bg-gradient-to-r from-primary/20 to-primary-light/20 dark:from-primary-light/20 dark:to-primary/20 rounded-lg p-3 border border-primary/30 dark:border-primary-light/30"
                            >
                                <div className="text-center">
                                    <span className="text-lg">🎉</span>
                                    <p className="text-xs font-medium text-primary dark:text-primary-light mt-1">
                                        All steps completed!
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Desktop Full Version */}
            <div className="hidden md:block">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    className="bg-gradient-to-br from-white/10 to-white/5 dark:from-gray-800/40 dark:to-gray-900/20 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-gray-700/30 shadow-2xl"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{scale: 0.9}}
                            animate={{scale: 1}}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary-light/10 rounded-full mb-4"
                        >
                            <FaStar className="w-4 h-4 text-primary dark:text-primary-light"/>
                            <span className="text-sm font-semibold text-primary dark:text-primary-light">
                                Connection Progress
                            </span>
                        </motion.div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Let's Start Our Journey
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Complete these steps to begin our collaboration
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Progress
                            </span>
                            <span className="text-sm font-bold text-primary dark:text-primary-light">
                                {progressPercentage}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-primary to-primary-light dark:from-primary-light dark:to-primary rounded-full shadow-lg"
                                initial={{width: '0%'}}
                                animate={{width: `${progressPercentage}%`}}
                                transition={{duration: 1, ease: 'easeOut'}}
                            />
                        </div>
                    </div>

                    {/* Checkpoints */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {checkpoints.map((checkpoint, index) => {
                            const Icon = checkpoint.icon;
                            return (
                                <motion.div
                                    key={checkpoint.id}
                                    initial={{opacity: 0, x: index === 0 ? -20 : 20}}
                                    animate={{opacity: 1, x: 0}}
                                    transition={{delay: index * 0.2}}
                                    className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${checkpoint.completed
                                        ? 'bg-gradient-to-br from-primary/10 to-primary-light/10 border-primary/30 dark:border-primary-light/30'
                                        : 'bg-white/5 dark:bg-gray-800/20 border-gray-300/30 dark:border-gray-600/30'
                                    }`}
                                >
                                    {/* Completion Badge */}
                                    {checkpoint.completed && (
                                        <motion.div
                                            initial={{scale: 0, rotate: -180}}
                                            animate={{scale: 1, rotate: 0}}
                                            className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center shadow-lg"
                                        >
                                            <FaCheck className="w-4 h-4 text-white"/>
                                        </motion.div>
                                    )}

                                    {/* Icon */}
                                    <div
                                        className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${checkpoint.completed
                                            ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                                        }`}>
                                        <Icon className="w-7 h-7"/>
                                    </div>

                                    {/* Content */}
                                    <h4 className={`text-lg font-bold mb-2 transition-colors ${checkpoint.completed
                                        ? 'text-primary dark:text-primary-light'
                                        : 'text-gray-700 dark:text-gray-300'
                                    }`}>
                                        {checkpoint.label}
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {checkpoint.description}
                                    </p>

                                    {/* Status */}
                                    <div
                                        className={`mt-4 text-xs font-semibold uppercase tracking-wide ${checkpoint.completed
                                            ? 'text-primary dark:text-primary-light'
                                            : 'text-gray-500 dark:text-gray-500'
                                        }`}>
                                        {checkpoint.completed ? '✓ Completed' : 'Pending'}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Celebration Message */}
                    <AnimatePresence>
                        {showCelebration && (
                            <motion.div
                                initial={{opacity: 0, y: 20, scale: 0.95}}
                                animate={{opacity: 1, y: 0, scale: 1}}
                                exit={{opacity: 0, y: -20, scale: 0.95}}
                                transition={{duration: 0.5, ease: 'easeOut'}}
                                className="bg-gradient-to-r from-primary/20 to-primary-light/20 dark:from-primary-light/20 dark:to-primary/20 backdrop-blur-sm rounded-xl p-6 border border-primary/30 dark:border-primary-light/30"
                            >
                                <motion.div
                                    initial={{scale: 0}}
                                    animate={{scale: 1}}
                                    transition={{delay: 0.2, duration: 0.4, type: 'spring', stiffness: 200}}
                                    className="text-center"
                                >
                                    <div className="text-4xl mb-3">🎉</div>
                                    <h4 className="text-lg font-bold text-primary dark:text-primary-light mb-2">
                                        Awesome! All Steps Completed
                                    </h4>
                                    <p className="text-primary/80 dark:text-primary-light/80 font-medium">
                                        {currentMessage}
                                    </p>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default Checkpoint;