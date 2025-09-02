import useOptimizedAnimation from "./useOptimizedAnimation.js";

const useScrollButtonAnimation = (isVisible) => {
    const {settings: {shouldAnimate, duration, ease, scale}} = useOptimizedAnimation({
        threshold: 0.5,
        triggerOnce: false
    });

    if (!shouldAnimate) return {};

    const baseAnimation = {opacity: 0, scale: 0.8, y: 20};
    const visibleAnimation = {opacity: 1, scale: 1, y: 0};

    return {
        initial: baseAnimation,
        animate: isVisible ? visibleAnimation : baseAnimation,
        exit: baseAnimation,
        transition: {duration, ease},
        whileHover: {scale},
        whileTap: {scale: 0.95}
    };
};

export default useScrollButtonAnimation;