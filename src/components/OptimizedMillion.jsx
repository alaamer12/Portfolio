import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import Loading from './Loading/Loading';

// Enhanced OptimizedBlock with automatic performance tracking and error boundaries
const OptimizedBlock = memo(({
                                 children,
                                 className = '',
                                 enableCache = true,
                                 onRender,
                                 fallback = null,
                                 threshold = 16, // ms
                                 ...props
                             }) => {
    const [renderTime, setRenderTime] = useState(0);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const start = performance.now();
        return () => {
            const end = performance.now();
            const time = end - start;
            setRenderTime(time);

            if (typeof onRender === 'function') {
                onRender({
                    renderTime: time,
                    isSlowRender: time > threshold,
                    component: props.id || 'OptimizedBlock'
                });
            }

            // Log slow renders in development
            if (process.env.NODE_ENV === 'development' && time > threshold) {
                console.warn(`Slow render detected (${time.toFixed(2)}ms) in OptimizedBlock${props.id ? ` [${props.id}]` : ''}`);
            }
        };
    }, [threshold, onRender, props.id]);

    if (hasError) {
        console.error('OptimizedBlock Error:', error);
        return fallback || <div className="error-boundary">Component Error</div>;
    }

    return (
        <div className={`${className}`} {...props}>
            {children}
        </div>
    );
});

// For TypeScript support (optional)
OptimizedBlock.displayName = 'OptimizedBlock';

export {OptimizedBlock};

// Enhanced OptimizedLoop with virtualization, pagination, and performance optimizations
export const OptimizedLoop = memo(({
                                       items = [],
                                       renderItem,
                                       pageSize = 10,
                                       virtualizeOptions = {
                                           enabled: false,
                                           itemHeight: 50,
                                           overscan: 3,
                                           scrollContainer: null
                                       },
                                       enableCache = true,
                                       onRender,
                                       className = '',
                                       loadingComponent = <Loading/>,
                                       emptyComponent = null,
                                       threshold = 16, // ms
                                       keyExtractor = (item, index) => item?.id || index,
                                   }) => {
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [visibleRange, setVisibleRange] = useState({start: 0, end: pageSize});

    // Memoize virtualization calculations
    const virtualizedItems = useMemo(() => {
        if (!virtualizeOptions.enabled) return items;

        const start = Math.max(0, visibleRange.start - overscan);
        const end = Math.min(items.length, visibleRange.end + overscan);

        return items.slice(start, end);
    }, [items, virtualizeOptions, visibleRange]);

    // Handle scroll for virtualization
    const handleScroll = useCallback((e) => {
        if (!virtualizeOptions.enabled) return;

        const container = e.target;
        const {itemHeight} = virtualizeOptions;
        const scrollTop = container.scrollTop;

        const start = Math.floor(scrollTop / itemHeight);
        const visibleItems = Math.ceil(container.clientHeight / itemHeight);

        setVisibleRange({
            start,
            end: start + visibleItems
        });
    }, [virtualizeOptions]);

    // Handle pagination
    const loadMore = useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            // Simulate async loading - replace with actual data fetching if needed
            await new Promise(resolve => setTimeout(resolve, 1000));
            setPage(prev => prev + 1);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    // Performance monitoring
    useEffect(() => {
        const start = performance.now();
        return () => {
            const end = performance.now();
            const time = end - start;

            if (onRender) {
                onRender({
                    renderTime: time,
                    isSlowRender: time > threshold,
                    itemCount: items.length
                });
            }

            // Log slow renders in development
            if (process.env.NODE_ENV === 'development' && time > threshold) {
                console.warn(`Slow render detected (${time.toFixed(2)}ms) in OptimizedLoop with ${items.length} items`);
            }
        };
    }, [items, threshold, onRender]);

    // Empty state
    if (!items.length) {
        return emptyComponent || <div className="empty-state">No items to display</div>;
    }

    const displayItems = virtualizeOptions.enabled ? virtualizedItems : items.slice(0, page * pageSize);

    return (
        <div>
            <div className={`optimized-loop ${className}`}>
                {displayItems.map((item, index) => (
                    <OptimizedBlock
                        key={keyExtractor(item, index)}
                        style={virtualizeOptions.enabled ? {
                            position: 'absolute',
                            top: (visibleRange.start + index) * virtualizeOptions.itemHeight,
                            height: virtualizeOptions.itemHeight
                        } : undefined}
                        enableCache={enableCache}
                    >
                        {renderItem(item, index)}
                    </OptimizedBlock>
                ))}
            </div>

            {/* Load More button outside the grid */}
            {!virtualizeOptions.enabled && items.length > displayItems.length && (
                <div className="w-full flex items-center justify-center py-16">
                    {isLoading ? (
                        <div
                            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#e6e6e6]/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl shadow-xl"
                            >
                            {loadingComponent}
                        </div>
                    ) : (
                        <button
                            onClick={loadMore}
                            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#b6b6b6]/50 dark:bg-gray-800/50 backdrop-blur-md rounded-xl text-gray-900 dark:text-white hover:bg-[#e6e6e6]/20 dark:hover:bg-gray-700/50 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg font-semibold"
                        >
                            <span>Load More</span>
                            <svg
                                className="w-5 h-5 transition-transform duration-300 transform group-hover:translate-y-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                />
                            </svg>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
});

OptimizedLoop.displayName = 'OptimizedLoop';
