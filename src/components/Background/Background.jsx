import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './Background.module.css';

const Background = () => {
  const { isDark } = useTheme();

  // Define theme-specific colors for shapes
  const shapeColors = {
    '--shape1-color': isDark ? '#ff6b6b80' : '#ff6b6b40',
    '--shape2-color': isDark ? '#4ecdc480' : '#4ecdc440',
    '--shape3-color': isDark ? '#ffe66d80' : '#ffe66d40',
    '--shape4-color': isDark ? '#6c5ce780' : '#6c5ce740',
  };

  return (
    <div className="absolute top-0 left-0 w-screen min-h-screen bg-background-light dark:bg-background transition-colors duration-300">
      {/* Animated Background Shapes */}
      <div className={styles['background-shapes']} style={shapeColors}>
        <div className={`${styles.shape} ${styles['shape-1']}`}></div>
        <div className={`${styles.shape} ${styles['shape-2']}`}></div>
        <div className={`${styles.shape} ${styles['shape-3']}`}></div>
        <div className={`${styles.shape} ${styles['shape-4']}`}></div>
      </div>

      {/* Gradient background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-strawberry/10 via-transparent to-cherry-pie/10 dark:from-strawberry-dark/20 dark:to-cherry-pie-dark/20" />

      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0 h-[40vh] overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-[100vw] h-full"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ minWidth: '100vw' }}
        >
          <path
            className="fill-strawberry/30 dark:fill-cherry-pie/20 transition-colors duration-300"
            d="M0,96L34.3,106.7C68.6,117,137,139,206,154.7C274.3,171,343,181,411,165.3C480,149,549,107,617,90.7C685.7,75,754,85,823,96C891.4,107,960,117,1029,122.7C1097.1,128,1166,128,1234,133.3C1302.9,139,1371,149,1406,154.7L1440,160L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
          />
        </svg>
      </div>

      {/* Middle wave */}
      <div className="absolute top-[60vh] left-0 right-0 h-[45vh] overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-[100vw] h-full transform -scale-x-100"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ minWidth: '100vw' }}
        >
          <path
            className="fill-cherry-pie/40 dark:fill-strawberry-dark/30 transition-colors duration-300"
            d="M0,160L34.3,165.3C68.6,171,137,181,206,165.3C274.3,149,343,107,411,101.3C480,96,549,128,617,154.7C685.7,181,754,203,823,186.7C891.4,171,960,117,1029,101.3C1097.1,85,1166,107,1234,133.3C1302.9,160,1371,192,1406,208L1440,224L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
          />
        </svg>
      </div>

      {/* Bottom wave */}
      <div className="absolute top-[120vh] left-0 right-0 h-[40vh] overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 w-[100vw] h-full"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ minWidth: '100vw' }}
        >
          <path
            className="fill-strawberry-light/30 dark:fill-cherry-pie-dark/20 transition-colors duration-300"
            d="M0,224L34.3,213.3C68.6,203,137,181,206,186.7C274.3,192,343,224,411,224C480,224,549,192,617,181.3C685.7,171,754,181,823,197.3C891.4,213,960,235,1029,229.3C1097.1,224,1166,192,1234,181.3C1302.9,171,1371,181,1406,186.7L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
          />
        </svg>
      </div>

      {/* Floating shapes - strategically placed at different scroll positions */}
      <div className="absolute top-0 left-0 w-screen">
        {/* Hero section shapes */}
        <div className="absolute top-[10vh] -right-24 w-96 h-96 rounded-full bg-strawberry/20 dark:bg-cherry-pie/20 blur-3xl" />
        <div className="absolute top-[80vh] -left-24 w-96 h-96 rounded-full bg-cherry-pie/20 dark:bg-strawberry-dark/20 blur-3xl" />
        
        {/* Skills section shapes */}
        <div className="absolute top-[140vh] left-1/4 w-64 h-64 rounded-full bg-strawberry-light/20 dark:bg-cherry-pie-light/20 blur-2xl animate-float" />
        <div className="absolute top-[180vh] right-1/4 w-48 h-48 rounded-full bg-cherry-pie/20 dark:bg-strawberry/20 blur-2xl animate-float-delayed" />
        
        {/* Projects section shapes */}
        <div className="absolute top-[240vh] left-1/3 w-32 h-32 rounded-full bg-strawberry/30 dark:bg-cherry-pie-dark/20 blur-xl animate-float-slow" />
        <div className="absolute top-[280vh] right-1/3 w-40 h-40 rounded-full bg-cherry-pie-light/20 dark:bg-strawberry-light/20 blur-xl animate-float-delayed-slow" />
      </div>
    </div>
  );
};

export default Background;
