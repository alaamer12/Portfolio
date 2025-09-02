import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import Loading from './Loading/Loading';

const RenderTimeTracker = memo(({threshold, onRender, id}) => {
    useEffect(() => {
        const start = performance.now();
        return () => {
            const time = performance.now() - start;
            onRender?.({renderTime: time, isSlowRender: time > threshold, component: id || 'OptimizedBlock'});
            if (process.env.NODE_ENV === 'development' && time > threshold) {
                console.warn(`Slow render detected (${time.toFixed(2)}ms) in OptimizedBlock${id ? ` [${id}]` : ''}`);
            }
        };
    }, [threshold, onRender, id]);

    return null;
});

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError() {
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        console.error('OptimizedBlock Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || <div className="error-boundary">Component Error</div>;
        }

        return this.props.children;
    }
}

const OptimizedBlock = memo(({
                                 children,
                                 className = '',
                                 enableCache = true,
                                 onRender,
                                 fallback = null,
                                 threshold = 16,
                                 ...props
                             }) => (
    <ErrorBoundary fallback={fallback}>
        <div className={className} {...props}>
            <RenderTimeTracker threshold={threshold} onRender={onRender} id={props.id}/>
            {children}
        </div>
    </ErrorBoundary>
));
OptimizedBlock.displayName = 'OptimizedBlock';


const useVirtualizedItems = ({items, virtualizeOptions, visibleRange}) => {
    return useMemo(() => {
        if (!virtualizeOptions.enabled) return items;
        const {overscan = 3} = virtualizeOptions;
        const start = Math.max(0, visibleRange.start - overscan);
        const end = Math.min(items.length, visibleRange.end + overscan);
        return items.slice(start, end);
    }, [items, virtualizeOptions, visibleRange]);
};

const useScrollHandler = ({virtualizeOptions, onScroll}) => {
    return useCallback((e) => {
        if (!virtualizeOptions.enabled) return;
        const container = e.target;
        const {itemHeight} = virtualizeOptions;
        const scrollTop = container.scrollTop;
        const start = Math.floor(scrollTop / itemHeight);
        const visibleItems = Math.ceil(container.clientHeight / itemHeight);
        onScroll({start, end: start + visibleItems});
    }, [virtualizeOptions, onScroll]);
};

const ItemRenderer = memo(({item, index, keyExtractor, renderItem, virtualizeOptions, visibleRange}) => (
    <OptimizedBlock
        key={keyExtractor(item, index)}
        style={virtualizeOptions.enabled ? {
            position: 'absolute',
            top: (visibleRange.start + index) * virtualizeOptions.itemHeight,
            height: virtualizeOptions.itemHeight
        } : undefined}
    >
        {renderItem(item, index)}
    </OptimizedBlock>
));

const LoadMoreButton = memo(({isLoading, onLoadMore, loadingComponent}) => (
    <div className="w-full flex items-center justify-center py-16">
        {isLoading ? (
            <div
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#e6e6e6]/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl shadow-xl">
                {loadingComponent}
            </div>
        ) : (
            <button
                onClick={onLoadMore}
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
));

const VirtualizedItems = memo(({items, virtualizeOptions, visibleRange, keyExtractor, renderItem}) => (
    <>
        {items.map((item, index) => {
            const itemKey = keyExtractor(item, index);
            return (
                <ItemRenderer
                    key={`virtualized-${itemKey}`}
                    item={item}
                    index={index}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    virtualizeOptions={virtualizeOptions}
                    visibleRange={visibleRange}
                />
            );
        })}
    </>
));

const PaginatedItems = memo(({items, page, pageSize, keyExtractor, renderItem}) => (
    <>
        {items.slice(0, page * pageSize).map((item, index) => {
            const itemKey = keyExtractor(item, index);
            return (
                <ItemRenderer
                    key={`paginated-${itemKey}`}
                    item={item}
                    index={index}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    virtualizeOptions={{enabled: false}}
                />
            );
        })}
    </>
));

const PerformanceTracker = memo(({items, threshold, onRender}) => {
    useEffect(() => {
        const start = performance.now();
        return () => {
            const time = performance.now() - start;
            onRender?.({renderTime: time, isSlowRender: time > threshold, itemCount: items.length});
            if (process.env.NODE_ENV === 'development' && time > threshold) {
                console.warn(`Slow render detected (${time.toFixed(2)}ms) in OptimizedLoop with ${items.length} items`);
            }
        };
    }, [items, threshold, onRender]);

    return null;
});

const OptimizedLoop = memo(({
                                items = [],
                                renderItem,
                                pageSize = 10,
                                virtualizeOptions = {
                                    enabled: false,
                                    itemHeight: 50,
                                    overscan: 3,
                                    scrollContainer: null
                                },
                                onRender,
                                className = '',
                                loadingComponent = <Loading/>,
                                emptyComponent = null,
                                threshold = 16,
                                keyExtractor = (item, index) => item?.id || index,
                            }) => {
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [visibleRange, setVisibleRange] = useState({start: 0, end: pageSize});

    const virtualizedItems = useVirtualizedItems({items, virtualizeOptions, visibleRange});
    const handleScroll = useScrollHandler({virtualizeOptions, onScroll: setVisibleRange});

    const loadMore = useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setPage(prev => prev + 1);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    if (!items.length) {
        return emptyComponent || <div className="empty-state">No items to display</div>;
    }

    return (
        <div>
            <PerformanceTracker items={items} threshold={threshold} onRender={onRender}/>
            <div className={`optimized-loop ${className}`} onScroll={handleScroll}>
                {virtualizeOptions.enabled ? (
                    <VirtualizedItems
                        items={virtualizedItems}
                        virtualizeOptions={virtualizeOptions}
                        visibleRange={visibleRange}
                        keyExtractor={keyExtractor}
                        renderItem={renderItem}
                    />
                ) : (
                    <PaginatedItems
                        items={items}
                        page={page}
                        pageSize={pageSize}
                        keyExtractor={keyExtractor}
                        renderItem={renderItem}
                    />
                )}
            </div>
            {!virtualizeOptions.enabled && items.length > page * pageSize && (
                <LoadMoreButton
                    isLoading={isLoading}
                    onLoadMore={loadMore}
                    loadingComponent={loadingComponent}
                />
            )}
        </div>
    );
});

export {OptimizedBlock, OptimizedLoop};