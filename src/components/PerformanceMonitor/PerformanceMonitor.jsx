import {memo, useEffect, useState} from 'react';
import {getCLS, getFCP, getFID, getLCP, getTTFB} from 'web-vitals';

const MetricDisplay = memo(({name, value, threshold, unit = 'ms'}) => {
    const getColor = () => {
        if (value === null) return 'text-gray-400';
        if (value <= threshold.good) return 'text-green-500';
        if (value <= threshold.needsImprovement) return 'text-yellow-500';
        return 'text-red-500';
    };

    return (
        <div className="flex items-center justify-between px-4 py-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
            <span className={`text-sm font-bold ${getColor()}`}>
                {value === null ? 'Loading...' : `${value.toFixed(1)}${unit}`}
            </span>
        </div>
    );
});

const PerformanceMonitor = memo(() => {
    const [metrics, setMetrics] = useState({
        CLS: null,
        FID: null,
        LCP: null,
        TTFB: null,
        FCP: null
    });

    useEffect(() => {
        // Collect performance metrics
        getCLS(({value}) => setMetrics(m => ({...m, CLS: value})));
        getFID(({value}) => setMetrics(m => ({...m, FID: value})));
        getLCP(({value}) => setMetrics(m => ({...m, LCP: value})));
        getTTFB(({value}) => setMetrics(m => ({...m, TTFB: value})));
        getFCP(({value}) => setMetrics(m => ({...m, FCP: value})));

        // Monitor memory usage if available
        if (performance.memory) {
            const checkMemory = () => {
                const {usedJSHeapSize, jsHeapSizeLimit} = performance.memory;
                const usagePercent = (usedJSHeapSize / jsHeapSizeLimit) * 100;
                if (usagePercent > 90) {
                    console.warn('High memory usage detected:', usagePercent.toFixed(1) + '%');
                }
            };
            const memoryInterval = setInterval(checkMemory, 5000);
            return () => clearInterval(memoryInterval);
        }
    }, []);

    const thresholds = {
        CLS: {good: 0.1, needsImprovement: 0.25},
        FID: {good: 100, needsImprovement: 300},
        LCP: {good: 2500, needsImprovement: 4000},
        TTFB: {good: 800, needsImprovement: 1800},
        FCP: {good: 1800, needsImprovement: 3000}
    };

    if (process.env.NODE_ENV === 'production') return null;

    return (
        <div
            className="fixed bottom-4 left-4 z-50 bg-white dark:bg-surface p-4 rounded-lg shadow-lg max-w-xs opacity-75 hover:opacity-100 transition-opacity">
            <h3 className="text-sm font-bold mb-2 text-gray-800 dark:text-white">Performance Metrics</h3>
            <MetricDisplay name="CLS" value={metrics.CLS} threshold={thresholds.CLS} unit=""/>
            <MetricDisplay name="FID" value={metrics.FID} threshold={thresholds.FID}/>
            <MetricDisplay name="LCP" value={metrics.LCP} threshold={thresholds.LCP}/>
            <MetricDisplay name="TTFB" value={metrics.TTFB} threshold={thresholds.TTFB}/>
            <MetricDisplay name="FCP" value={metrics.FCP} threshold={thresholds.FCP}/>
        </div>
    );
});

export default PerformanceMonitor;
