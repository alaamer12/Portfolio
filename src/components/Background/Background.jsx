import { useTheme } from '../../context/ThemeContext';
import { memo, useEffect, useRef, useState } from 'react';
import styles from './Background.module.css';

const HexGrid = memo(() => {
    const gridRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const rect = gridRef.current?.getBoundingClientRect();
            if (!rect) return;
            
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={gridRef} className={styles.hexGrid}>
            {Array.from({ length: 150 }).map((_, i) => (
                <div
                    key={i}
                    className={styles.hexCell}
                    style={{
                        '--mouse-x': mousePosition.x,
                        '--mouse-y': mousePosition.y,
                        '--index': i,
                    }}
                />
            ))}
        </div>
    );
});

const GlowingLines = memo(() => {
    return (
        <div className={styles.glowingLines}>
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    className={styles.line}
                    style={{ '--index': i }}
                />
            ))}
        </div>
    );
});

const ParticleField = memo(() => {
    return (
        <div className={styles.particleField}>
            {Array.from({ length: 50 }).map((_, i) => (
                <div
                    key={i}
                    className={styles.particle}
                    style={{
                        '--delay': `${Math.random() * 5}s`,
                        '--duration': `${10 + Math.random() * 20}s`
                    }}
                />
            ))}
        </div>
    );
});

export default memo(function Background() {
    const { isDark } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    return (
        <div 
            className={`${styles.background} ${isDark ? styles.dark : ''} ${mounted ? styles.mounted : ''}`}
            style={{ '--theme-transition': '0.3s ease-in-out' }}
        >
            <div className={styles.backgroundGradient} />
            <HexGrid />
            <GlowingLines />
            <ParticleField />
            <div className={styles.overlay} />
        </div>
    );
});
