import { useTheme } from '../../context/ThemeContext';
import { memo, useEffect, useRef, useState } from 'react';
import styles from './Background.module.css';

const PATTERNS = [
    { type: 'dots', size: 20 },
    { type: 'cross', size: 25 },
    { type: 'circle', size: 30 },
    { type: 'square', size: 22 },
];

const Pattern = memo(({ type, style }) => {
    return <div className={`${styles.pattern} ${styles[`pattern-${type}`]}`} style={style} />;
});

const PatternGrid = memo(() => {
    return (
        <div className={styles.patternGrid}>
            {Array.from({ length: 40 }).map((_, i) => {
                const pattern = PATTERNS[i % PATTERNS.length];
                return (
                    <Pattern
                        key={i}
                        {...pattern}
                        style={{
                            animationDelay: `${Math.random() * 5}s`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            transform: `scale(${0.5 + Math.random() * 0.5})`
                        }}
                    />
                );
            })}
        </div>
    );
});

const GradientBlobs = memo(() => {
    return (
        <div className={styles.blobContainer}>
            <div className={`${styles.blob} ${styles.blob1}`} />
            <div className={`${styles.blob} ${styles.blob2}`} />
            <div className={`${styles.blob} ${styles.blob3}`} />
        </div>
    );
});

const ParticleField = memo(() => {
    const canvasRef = useRef(null);
    const { isDark } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width || 
                    this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = isDark 
                    ? `rgba(255, 255, 255, ${this.opacity * 0.5})`
                    : `rgba(0, 0, 0, ${this.opacity * 0.2})`;
                ctx.fill();
            }
        }

        const init = () => {
            particles = Array.from({ length: 50 }, () => new Particle());
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        resize();
        init();
        animate();

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isDark]);

    return <canvas ref={canvasRef} className={styles.particleCanvas} />;
});

export default memo(function Background() {
    const { isDark } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    return (
        <div className={`${styles.background} ${isDark ? styles.dark : ''} ${mounted ? styles.mounted : ''}`}>
            <GradientBlobs />
            <ParticleField />
            <PatternGrid />
            <div className={styles.overlay} />
        </div>
    );
});
