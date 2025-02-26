import useOptimizedAnimation from "./useOptimizedAnimation.js";

const useScrollButtonAnimation = (isVisible) => {
    const {settings} = useOptimizedAnimation({threshold: 0.5, triggerOnce: false});
    return {
        initial: settings.shouldAnimate ? {opacity: 0, scale: 0.8, y: 20} : {},
        animate: settings.shouldAnimate ? {
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0.8,
            y: isVisible ? 0 : 20
        } : {},
        exit: settings.shouldAnimate ? {opacity: 0, scale: 0.8, y: 20} : {},
        transition: {duration: settings.duration, ease: settings.ease},
        whileHover: settings.shouldAnimate ? {scale: settings.scale} : {},
        whileTap: settings.shouldAnimate ? {scale: 0.95} : {}
    };
};

export default useScrollButtonAnimation;