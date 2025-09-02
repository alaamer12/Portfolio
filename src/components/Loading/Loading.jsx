import {memo, useEffect, useState} from 'react';
import {motion, useReducedMotion} from 'framer-motion';
import {useDeviceDetect} from '../../hooks/useDeviceDetect';

const Loading = memo(() => {
    const isMobile = useDeviceDetect();
    const prefersReducedMotion = useReducedMotion();
    const [mountDelay, setMountDelay] = useState(true);

    useEffect(() => {
        // Only show loading after a brief delay to prevent flash
        const timer = setTimeout(() => setMountDelay(false), 150);
        return () => clearTimeout(timer);
    }, []);

    if (mountDelay) return null;

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            className="fixed inset-0 bg-background flex items-center justify-center"
        >
            <motion.div
                className={`border-4 border-primary rounded-full border-t-accent ${isMobile ? 'w-12 h-12' : 'w-16 h-16'}`}
                animate={prefersReducedMotion ? {} : {
                    rotate: 360
                }}
                transition={{
                    duration: isMobile ? 0.8 : 1,
                    repeat: Infinity,
                    ease: "linear",
                    // Reduce CPU usage on mobile
                    useTransform: !isMobile
                }}
            />
        </motion.div>
    );
});

Loading.displayName = 'Loading';

export default Loading;
