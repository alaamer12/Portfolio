import {useEffect} from 'react';
import {useMeasure, useWindowScroll, useWindowSize} from 'react-use';
import {getCLS, getFID, getLCP} from 'web-vitals';

const useWebVitals = () => {
    useEffect(() => {
        [getCLS, getFID, getLCP].forEach(metric => metric(console.log));
    }, []);
};

const useLazyLoadImages = () => {
    useEffect(() => {
        const imageObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            },
            {rootMargin: '50px 0px'}
        );

        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));

        return () => imageObserver.disconnect();
    }, []);
};

const usePreloadResources = () => {
    useEffect(() => {
        const resources = [
            {type: 'style', href: '/styles/critical.css'},
            {type: 'font', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'}
        ];

        resources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = resource.type === 'font' ? 'preload' : 'prefetch';
            link.as = resource.type;
            link.href = resource.href;
            if (resource.type === 'font') link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }, []);
};

const useOptimizedScroll = () => {
    useEffect(() => {
        let ticking = false;
        const optimizeScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    document.body.style.setProperty('--scroll-y', `${window.scrollY}px`);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', optimizeScroll, {passive: true});
        return () => window.removeEventListener('scroll', optimizeScroll);
    }, []);
};

const useDeviceOptimizations = () => {
    useEffect(() => {
        const isLowEndDevice = !matchMedia('(min-device-memory: 4gb)').matches ||
            !matchMedia('(min-width: 768px)').matches ||
            navigator.hardwareConcurrency < 4;

        if (isLowEndDevice) {
            document.body.classList.add('reduce-motion');
        }
    }, []);
};

const usePerformanceOptimizations = () => {
    const {y: scrollY} = useWindowScroll();
    const {width} = useWindowSize();
    const [ref, {height}] = useMeasure();

    useWebVitals();
    useLazyLoadImages();
    usePreloadResources();
    useOptimizedScroll();
    useDeviceOptimizations();

    return {
        ref,
        metrics: {
            scrollY,
            viewportWidth: width,
            contentHeight: height
        },
        isLowEndDevice: !matchMedia('(min-device-memory: 4gb)').matches
    };
};

export default usePerformanceOptimizations;
