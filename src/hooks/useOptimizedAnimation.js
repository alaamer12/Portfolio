import {useCallback, useEffect, useMemo, useRef} from 'react';
import {useWindowSize} from 'react-use';
import {useInView} from 'react-intersection-observer';
import {useReducedMotion} from 'framer-motion';

const useDeviceDetection = (mobileBreakpoint) => {
    const { width } = useWindowSize();
    const isMobile = width <= mobileBreakpoint;
    const isLowEndDevice = useRef(
        typeof window !== 'undefined' &&
        (!window.matchMedia('(min-device-memory: 4gb)').matches ||
            navigator.hardwareConcurrency < 4)
    );
    return { isMobile, isLowEndDevice: isLowEndDevice.current };
};

// noinspection t
const useOptimizationSettings = (isMobile, prefersReducedMotion, disabled) => {
    return useMemo(() => ({
        duration: isMobile ? 0.3 : 0.5,
        useTransform: !isMobile,
        shouldAnimate: !prefersReducedMotion && !disabled,
        delay: isMobile ? 0 : 0.1,
        ease: "easeOut",
        staggerChildren: isMobile ? 0.1 : 0.2,
        scale: isMobile ? 1.02 : 1.05,
        distance: isMobile ? 10 : 20,
        blur: isMobile ? '2px' : '3px'
    }), [isMobile, prefersReducedMotion, disabled]);
};

const useIntersectionObserver = (options) => {
    const { threshold, rootMargin, triggerOnce, disabled, prefersReducedMotion } = options;
    return useInView({
        threshold,
        rootMargin,
        triggerOnce,
        skip: disabled || prefersReducedMotion
    });
};

const useAnimationFrame = () => {
    const frame = useRef(null);
    const cancelFrame = useCallback(() => {
        if (frame.current) cancelAnimationFrame(frame.current);
    }, []);
    return [frame, cancelFrame];
};

const useAnimationProgress = (duration, isLowEndDevice) => {
    const start = useRef(performance.now());
    const getDuration = useCallback(() => isLowEndDevice ? 400 : 800, [isLowEndDevice]);
    
    return useCallback((currentTime) => {
        const elapsed = currentTime - start.current;
        return Math.min(elapsed / getDuration(), 1);
    }, [getDuration]);
};

const applyStyles = (element, progress, settings) => {
    if (settings.useTransform) {
        element.style.transform = `translateY(${(1 - progress) * settings.distance}px)`;
    }
    element.style.opacity = progress;
};

const useAnimationEffect = (inView, elementRef, optimizationSettings, isLowEndDevice) => {
    const [animationFrame, cancelFrame] = useAnimationFrame();
    const getProgress = useAnimationProgress(isLowEndDevice);

    useEffect(() => {
        if (!optimizationSettings.shouldAnimate || !inView) return;
        const element = elementRef.current;
        if (!element) return;

        const animate = () => {
            const step = (currentTime) => {
                const progress = getProgress(currentTime);
                applyStyles(element, progress, optimizationSettings);
                if (progress < 1) {
                    animationFrame.current = requestAnimationFrame(step);
                }
            };
            animationFrame.current = requestAnimationFrame(step);
        };

        animate();
        return cancelFrame;
    }, [inView, cancelFrame, optimizationSettings, isLowEndDevice, elementRef, getProgress]);
};

const useOptimizedAnimation = (options = {}) => {
    const {
        threshold = 0.1,
        rootMargin = '50px',
        disabled = false,
        triggerOnce = true,
        mobileBreakpoint = 768
    } = options;

    const elementRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();

    const { isMobile, isLowEndDevice } = useDeviceDetection(mobileBreakpoint);
    const optimizationSettings = useOptimizationSettings(isMobile, prefersReducedMotion, disabled);
    const [ref, inView] = useIntersectionObserver({ threshold, rootMargin, triggerOnce, disabled, prefersReducedMotion });

    useAnimationEffect(inView, elementRef, optimizationSettings, isLowEndDevice);

    return {
        ref,
        elementRef,
        inView,
        isMobile,
        prefersReducedMotion,
        isLowEndDevice,
        settings: optimizationSettings
    };
};

export default useOptimizedAnimation;

