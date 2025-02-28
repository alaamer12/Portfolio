import { useTheme } from '../../context/ThemeContext';
import { memo, useEffect, useRef, useState, useCallback } from 'react';
import styles from './Background.module.css';

const Particle = memo(({ index }) => {
    const particleRef = useRef(null);
    const [position, setPosition] = useState({ x: Math.random() * 100, y: Math.random() * 100 });
    
    useEffect(() => {
        const particle = particleRef.current;
        if (!particle) return;

        const randomDelay = Math.random() * 5;
        particle.style.animationDelay = `-${randomDelay}s`;
    }, []);

    return (
        <div
            ref={particleRef}
            className={`${styles.particle} ${styles[`particle-${index % 3}`]}`}
            style={{ left: `${position.x}%`, top: `${position.y}%` }}
        />
    );
});

const GeometricPattern = memo(() => {
    return (
        <div className={styles.geometricContainer}>
            <div className={styles.hexagonGrid}>
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className={styles.hexagon} />
                ))}
            </div>
        </div>
    );
});

const GlowingLines = memo(() => {
    return (
        <div className={styles.linesContainer}>
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className={styles.line} style={{ animationDelay: `${i * 0.5}s` }} />
            ))}
        </div>
    );
});

const CircuitPattern = memo(() => {
    return (
        <div className={styles.circuitContainer}>
            <svg className={styles.circuit} viewBox="0 0 100 100" preserveAspectRatio="none">
                <path className={styles.circuitPath} d="M10,50 L30,50 C35,50 35,30 40,30 L60,30 C65,30 65,70 70,70 L90,70" />
                <path className={styles.circuitPath} d="M0,20 L20,20 C25,20 25,80 30,80 L70,80 C75,80 75,40 80,40 L100,40" />
                <path className={styles.circuitPath} d="M0,80 L40,80 C45,80 45,20 50,20 L90,20" />
            </svg>
        </div>
    );
});

export default memo(function Background() {
    const { isDark } = useTheme();
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const handleMouseMove = useCallback((e) => {
        if (!containerRef.current) return;
        const { clientX, clientY } = e;
        const { width, height } = containerRef.current.getBoundingClientRect();
        const x = (clientX / width - 0.5) * 2;
        const y = (clientY / height - 0.5) * 2;
        
        containerRef.current.style.setProperty('--mouse-x', x);
        containerRef.current.style.setProperty('--mouse-y', y);
    }, []);

    return (
        <div
            ref={containerRef}
            className={`${styles.background} ${isDark ? styles.dark : ''} ${mounted ? styles.mounted : ''}`}
            onMouseMove={handleMouseMove}
        >
            <div className={styles.gradientLayer} />
            <GeometricPattern />
            <CircuitPattern />
            <div className={styles.particleContainer}>
                {Array.from({ length: 50 }).map((_, i) => (
                    <Particle key={i} index={i} />
                ))}
            </div>
            <GlowingLines />
            <div className={styles.overlay} />
        </div>
    );
});
