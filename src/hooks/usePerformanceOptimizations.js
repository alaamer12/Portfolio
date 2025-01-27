import { useEffect } from 'react';
import { useWindowScroll, useWindowSize, useMeasure } from 'react-use';
import { getCLS, getFID, getLCP } from 'web-vitals';

const usePerformanceOptimizations = () => {
    const { y: scrollY } = useWindowScroll();
    const { width } = useWindowSize();
    const [ref, { height }] = useMeasure();

    useEffect(() => {
        // Report Web Vitals
        getCLS(console.log);
        getFID(console.log);
        getLCP(console.log);

        // Optimize images on viewport
        const images = document.querySelectorAll('img[data-src]');
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
            { rootMargin: '50px 0px' }
        );

        images.forEach(img => imageObserver.observe(img));

        // Preload critical resources
        const preloadCriticalResources = () => {
            const resources = [
                { type: 'style', href: '/styles/critical.css' },
                { type: 'font', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }
            ];

            resources.forEach(resource => {
                const link = document.createElement('link');
                link.rel = resource.type === 'font' ? 'preload' : 'prefetch';
                link.as = resource.type;
                link.href = resource.href;
                if (resource.type === 'font') link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
            });
        };

        // Optimize scroll performance
        let ticking = false;
        const optimizeScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Apply optimizations based on scroll position
                    document.body.style.setProperty('--scroll-y', `${window.scrollY}px`);
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Enable passive scroll listeners
        window.addEventListener('scroll', optimizeScroll, { passive: true });

        // Optimize animations on low-end devices
        const isLowEndDevice = () => {
            return !matchMedia('(min-device-memory: 4gb)').matches ||
                   !matchMedia('(min-width: 768px)').matches ||
                   navigator.hardwareConcurrency < 4;
        };

        if (isLowEndDevice()) {
            document.body.classList.add('reduce-motion');
        }

        // Clean up
        return () => {
            window.removeEventListener('scroll', optimizeScroll);
            images.forEach(img => imageObserver.unobserve(img));
        };
    }, []);

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
