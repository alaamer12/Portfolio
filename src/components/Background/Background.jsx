import { useTheme } from '../../context/ThemeContext';
import { memo, useEffect, useRef, useState } from 'react';
import styles from './Background.module.css';

const HexGrid = memo(() => {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    return (
        <div className={`${styles.hexGrid} ${mounted ? styles.mounted : ''}`}>
            {Array.from({ length: 50 }).map((_, i) => (
                <div 
                    key={i} 
                    className={styles.hexagon}
                    style={{
                        animationDelay: `${Math.random() * 5}s`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                />
            ))}
        </div>
    );
});

const GlowingLines = memo(() => {
    return (
        <div className={styles.linesContainer}>
            {Array.from({ length: 8 }).map((_, i) => (
                <div 
                    key={i}
                    className={styles.line}
                    style={{
                        '--line-index': i,
                        '--total-lines': 8
                    }}
                />
            ))}
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
                this.size = Math.random() * 2 + 0.1;
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
                ctx.fillStyle = `rgba(${isDark ? '255, 255, 255' : '0, 0, 0'}, ${this.opacity})`;
                ctx.fill();
            }
        }

        const init = () => {
            particles = Array.from({ length: 100 }, () => new Particle());
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(${isDark ? '255, 255, 255' : '0, 0, 0'}, ${0.1 * (1 - distance / 100)})`;
                        ctx.stroke();
                    }
                });
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
    
    return (
        <div className={`${styles.background} ${isDark ? styles.dark : ''}`}>
            <ParticleField />
            <GlowingLines />
            <HexGrid />
            <div className={styles.gradientOverlay} />
        </div>
    );
});
