import {useCallback, useEffect, useMemo, useRef} from 'react';
import {useWindowSize} from 'react-use';
import {useInView} from 'react-intersection-observer';
import {useReducedMotion} from 'framer-motion';

const useOptimizedAnimation = (options = {}) => {
    const {
        threshold = 0.1,
        rootMargin = '50px',
        disabled = false,
        triggerOnce = true,
        mobileBreakpoint = 768
    } = options;

    const elementRef = useRef(null);
    const {width} = useWindowSize();
    const prefersReducedMotion = useReducedMotion();
    const animationFrame = useRef(null);

    // Device detection
    const isMobile = width <= mobileBreakpoint;
    const isLowEndDevice = useRef(
        typeof window !== 'undefined' &&
        (!window.matchMedia('(min-device-memory: 4gb)').matches ||
            navigator.hardwareConcurrency < 4)
    );

    // Optimization settings based on device and preferences
    const optimizationSettings = useMemo(() => ({
        duration: isMobile ? 0.3 : 0.5,
        useTransform: !isMobile && !isLowEndDevice.current,
        shouldAnimate: !prefersReducedMotion && !disabled,
        delay: isMobile ? 0 : 0.1,
        ease: "easeOut",
        staggerChildren: isMobile ? 0.1 : 0.2,
        // Scale down animations for mobile
        scale: isMobile ? 1.02 : 1.05,
        distance: isMobile ? 10 : 20,
        blur: isMobile ? '2px' : '3px'
    }), [isMobile, prefersReducedMotion, disabled]);

    // Cleanup function for animation frame
    const cleanup = useCallback(() => {
        if (animationFrame.current) {
            cancelAnimationFrame(animationFrame.current);
        }
    }, []);

    // Intersection observer setup
    const [ref, inView] = useInView({
        threshold,
        rootMargin,
        triggerOnce,
        skip: disabled || prefersReducedMotion
    });

    // Handle animation based on intersection and device capabilities
    useEffect(() => {
        if (!optimizationSettings.shouldAnimate || !inView) return;

        const element = elementRef.current;
        if (!element) return;

        const animate = () => {
            const start = performance.now();
            const duration = isLowEndDevice.current ? 400 : 800;

            const step = (currentTime) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);

                // Apply optimized animations
                if (optimizationSettings.useTransform) {
                    element.style.transform = `translateY(${(1 - progress) * optimizationSettings.distance}px)`;
                }
                element.style.opacity = progress;

                if (progress < 1) {
                    animationFrame.current = requestAnimationFrame(step);
                }
            };

            animationFrame.current = requestAnimationFrame(step);
        };

        animate();
        return cleanup;
    }, [inView, cleanup, optimizationSettings]);

    // Return all necessary values for component use
    return {
        ref,
        elementRef,
        inView,
        isMobile,
        prefersReducedMotion,
        isLowEndDevice: isLowEndDevice.current,
        settings: optimizationSettings
    };
};

export default useOptimizedAnimation;
