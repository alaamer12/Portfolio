import {motion} from 'framer-motion';
import {useDeviceDetect} from '../../hooks/useDeviceDetect';

const Loading = () => {
    const isMobile = useDeviceDetect();
    
    return (
        <div className="fixed inset-0 bg-background flex items-center justify-center">
            <motion.div
                className={`border-4 border-primary rounded-full border-t-accent ${isMobile ? 'w-12 h-12' : 'w-16 h-16'}`}
                animate={{
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
        </div>
    );
};

export default Loading;
