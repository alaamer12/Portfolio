import { useTheme } from '../../context/ThemeContext';
import { memo, useEffect, useRef, useState, useCallback } from 'react';
import styles from './Background.module.css';

const CodeSnippet = memo(() => {
    const snippets = [
        'def optimize(data: List[Dict]) -> Generator:',
        '    return (process(item) for item in data)',
        'class FastAPIService(BaseModel):',
        '    async def handle_request(self) -> Response:',
        '@pytest.mark.asyncio',
        'async def test_endpoint():',
        'from typing import Optional, Union',
        'result: Dict[str, Any] = {}',
    ];

    return (
        <div className={styles.codeContainer}>
            {snippets.map((snippet, i) => (
                <div key={i} className={styles.codeLine}>
                    <span className={styles.lineNumber}>{i + 1}</span>
                    <code>{snippet}</code>
                </div>
            ))}
        </div>
    );
});

const PythonLogo = memo(() => (
    <div className={styles.logoContainer}>
        <svg className={styles.pythonLogo} viewBox="0 0 256 255" preserveAspectRatio="xMinYMin meet">
            <defs>
                <linearGradient id="pythonLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#306998', stopOpacity: 0.2 }} />
                    <stop offset="100%" style={{ stopColor: '#FFD43B', stopOpacity: 0.2 }} />
                </linearGradient>
            </defs>
            <path d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z" fill="url(#pythonLogoGradient)"/>
            <path d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z" fill="url(#pythonLogoGradient)"/>
        </svg>
    </div>
));

const DataStructure = memo(() => {
    const structures = [
        ['[', ']'],
        ['{', '}'],
        ['(', ')'],
        ['def', 'return'],
        ['try:', 'except:'],
        ['async', 'await'],
    ];

    return (
        <div className={styles.structuresContainer}>
            {structures.map(([open, close], i) => (
                <div key={i} className={styles.structure}>
                    <span className={styles.open}>{open}</span>
                    <span className={styles.close}>{close}</span>
                </div>
            ))}
        </div>
    );
});

const ImportStatements = memo(() => {
    const imports = [
        'from fastapi import FastAPI',
        'from django.db import models',
        'import numpy as np',
        'import pandas as pd',
        'from typing import List',
        'import asyncio',
    ];

    return (
        <div className={styles.importsContainer}>
            {imports.map((imp, i) => (
                <div key={i} className={styles.importLine}>{imp}</div>
            ))}
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
            <div className={styles.overlay} />
            <PythonLogo />
            <CodeSnippet />
            <DataStructure />
            <ImportStatements />
            <div className={styles.gradientLayer} />
        </div>
    );
});
