import {useTheme} from '../../context/ThemeContext';
import {memo, useCallback, useEffect, useRef, useState} from 'react';
import styles from './Background.module.css';
import {OptimizedBlock} from '../OptimizedMillion';

// Optimize SVG wave paths
const WAVE_PATHS = {
    top: "M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,128C672,107,768,85,864,90.7C960,96,1056,128,1152,133.3C1248,139,1344,117,1392,106.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z",
    bottom: "M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,213.3C960,203,1056,181,1152,170.7C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
};

// Optimize wave rendering with WebGL when available
const Wave = memo(({className, path, style}) => {
    const svgRef = useRef(null);
    const [useWebGL, setUseWebGL] = useState(false);

    useEffect(() => {
        const canvas = document.createElement('canvas');
        const hasWebGL = !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
        setUseWebGL(hasWebGL);
    }, []);

    return (
        <OptimizedBlock threshold={8}>
            <svg
                ref={svgRef}
                className="absolute left-0 w-[100vw] h-full"
                viewBox="0 0 1440 320"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                style={{
                    minWidth: '100vw',
                    transform: useWebGL ? 'translateZ(0)' : 'none',
                    ...style
                }}
            >
                <path className={className} d={path}/>
            </svg>
        </OptimizedBlock>
    );
});

// Optimize shape animations with requestAnimationFrame
const AnimatedShape = memo(({number}) => {
    const shapeRef = useRef(null);
    const frameRef = useRef(null);

    const animate = useCallback(() => {
        if (!shapeRef.current) return;
        
        const element = shapeRef.current;
        const computedStyle = window.getComputedStyle(element);
        const transform = new WebKitCSSMatrix(computedStyle.transform);
        
        const newY = transform.m42 + Math.sin(Date.now() / 1000) * 0.5;
        element.style.transform = `translateY(${newY}px)`;
        
        frameRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        frameRef.current = requestAnimationFrame(animate);
        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [animate]);

    return (
        <OptimizedBlock threshold={8}>
            <div 
                ref={shapeRef}
                className={`${styles.shape} ${styles[`shape-${number}`]}`}
                style={{ willChange: 'transform' }}
            />
        </OptimizedBlock>
    );
});

// Optimize background shapes rendering
const BackgroundShapes = memo(({themeColors}) => {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <OptimizedBlock 
            ref={containerRef}
            className={styles['background-shapes']} 
            style={{
                ...themeColors,
                visibility: isVisible ? 'visible' : 'hidden'
            }}
            threshold={12}
        >
            {isVisible && [1, 2, 3, 4].map((num) => (
                <AnimatedShape key={num} number={num}/>
            ))}
        </OptimizedBlock>
    );
});

Wave.displayName = 'Wave';
AnimatedShape.displayName = 'AnimatedShape';
BackgroundShapes.displayName = 'BackgroundShapes';

export default memo(function Background() {
    const {isDark} = useTheme();
    
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <BackgroundShapes
                themeColors={{
                    '--shape-color-1': isDark ? 'rgba(255, 99, 132, 0.1)' : 'rgba(255, 99, 132, 0.05)',
                    '--shape-color-2': isDark ? 'rgba(54, 162, 235, 0.1)' : 'rgba(54, 162, 235, 0.05)',
                    '--shape-color-3': isDark ? 'rgba(255, 206, 86, 0.1)' : 'rgba(255, 206, 86, 0.05)',
                    '--shape-color-4': isDark ? 'rgba(75, 192, 192, 0.1)' : 'rgba(75, 192, 192, 0.05)'
                }}
            />
            <Wave
                className="fill-strawberry/30 dark:fill-cherry-pie/20 transition-colors duration-300"
                path={WAVE_PATHS.top}
                style={{ transform: 'rotate(180deg)' }}
            />
            <Wave
                className="fill-cherry-pie/30 dark:fill-strawberry/20 transition-colors duration-300"
                path={WAVE_PATHS.bottom}
            />
        </div>
    );
});
