import { useEffect, useCallback, useRef } from 'react';
import { useWindowSize } from 'react-use';
import { useInView } from 'react-intersection-observer';

const useOptimizedAnimation = (options = {}) => {
    const {
        threshold = 0.1,
        rootMargin = '50px',
        disabled = false,
        triggerOnce = true
    } = options;

    const elementRef = useRef(null);
    const { width } = useWindowSize();
    const animationFrame = useRef(null);
    const isLowEndDevice = useRef(
        typeof window !== 'undefined' && 
        (!window.matchMedia('(min-device-memory: 4gb)').matches || 
         navigator.hardwareConcurrency < 4)
    );

    // Cleanup function for animation frame
    const cleanup = useCallback(() => {
        if (animationFrame.current) {
            cancelAnimationFrame(animationFrame.current);
        }
    }, []);

    // Intersection observer setup using react-intersection-observer
    const [ref, inView] = useInView({
        threshold,
        rootMargin,
        triggerOnce,
        skip: disabled
    });

    // Handle animation based on intersection and device capabilities
    useEffect(() => {
        if (disabled || !inView) return;

        const element = elementRef.current;
        if (!element) return;
        
        // Optimize animation based on device capabilities
        const animate = () => {
            const start = performance.now();
            const duration = isLowEndDevice.current ? 400 : 800;

            const step = (currentTime) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);

                // Use transform for better performance
                const opacity = progress;
                const transform = `translateY(${(1 - progress) * 20}px)`;
                
                element.style.opacity = opacity;
                element.style.transform = transform;

                if (progress < 1) {
                    animationFrame.current = requestAnimationFrame(step);
                } else {
                    element.style.willChange = 'auto';
                }
            };

            // Set will-change before animation
            element.style.willChange = 'transform, opacity';
            animationFrame.current = requestAnimationFrame(step);
        };

        // Initial styles
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';

        // Start animation in next frame
        requestAnimationFrame(animate);

        return cleanup;
    }, [inView, disabled, cleanup]);

    // Cleanup on unmount
    useEffect(() => cleanup, [cleanup]);

    // Handle resize events
    useEffect(() => {
        if (disabled) return;
        
        const element = elementRef.current;
        if (!element) return;

        // Reset will-change on resize for better performance
        let resizeTimeout;
        const handleResize = () => {
            element.style.willChange = 'transform, opacity';
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                element.style.willChange = 'auto';
            }, 100);
        };

        window.addEventListener('resize', handleResize, { passive: true });
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimeout);
        };
    }, [disabled, width]);

    return {
        ref,
        inView,
        isLowEndDevice: isLowEndDevice.current,
        elementRef
    };
};

export default useOptimizedAnimation;
