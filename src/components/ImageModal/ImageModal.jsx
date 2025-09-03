import {memo, useCallback, useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Download, 
  Play, 
  Pause, 
  Maximize, 
  Minimize, 
  Info,
  Grid3X3
} from 'lucide-react';

const ImageModal = memo(({isOpen, onClose, images, initialIndex = 0, title}) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isPaused, setIsPaused] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [showInfo, setShowInfo] = useState(false);
    const [showThumbnails, setShowThumbnails] = useState(false);
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

    const imageRef = useRef(null);
    const containerRef = useRef(null);
    const controlsTimeoutRef = useRef(null);

    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex]);

    // Auto-hide controls
    useEffect(() => {
        if (showControls) {
            clearTimeout(controlsTimeoutRef.current);
            controlsTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
            }, 3000);
        }

        return () => clearTimeout(controlsTimeoutRef.current);
    }, [showControls]);

    // Utility functions
    const isGif = useCallback((url) => {
        return url && (url.toLowerCase().includes('.gif') || url.toLowerCase().includes('gif'));
    }, []);

    const isVideo = useCallback((url) => {
        return url && (url.toLowerCase().includes('.mp4') || url.toLowerCase().includes('.webm') || url.toLowerCase().includes('.mov'));
    }, []);

    const getCurrentMediaType = useCallback(() => {
        const currentImage = images[currentIndex];
        if (isVideo(currentImage)) return 'video';
        if (isGif(currentImage)) return 'gif';
        return 'image';
    }, [images, currentIndex, isVideo, isGif]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;

            switch (e.key) {
                case 'Escape':
                    if (isFullscreen) {
                        exitFullscreen();
                    } else {
                        onClose();
                    }
                    break;
                case 'ArrowLeft':
                    goToPrevious();
                    break;
                case 'ArrowRight':
                    goToNext();
                    break;
                case 'f':
                case 'F':
                    toggleFullscreen();
                    break;
                case ' ':
                    e.preventDefault();
                    if (getCurrentMediaType() === 'gif' || getCurrentMediaType() === 'video') {
                        togglePlayPause();
                    }
                    break;
                case 'i':
                case 'I':
                    setShowInfo(!showInfo);
                    break;
                case 'g':
                case 'G':
                    setShowThumbnails(!showThumbnails);
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, isFullscreen, getCurrentMediaType, showInfo, showThumbnails]);

    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Navigation functions
    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        resetZoom();
        setIsLoading(true);
        setLoadError(false);
    }, [images.length]);

    const goToPrevious = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        resetZoom();
        setIsLoading(true);
        setLoadError(false);
    }, [images.length]);

    const goToSlide = useCallback((index) => {
        setCurrentIndex(index);
        resetZoom();
        setIsLoading(true);
        setLoadError(false);
        setShowThumbnails(false);
    }, []);

    // Fullscreen functions
    const toggleFullscreen = useCallback(async () => {
        if (!document.fullscreenElement) {
            try {
                await containerRef.current?.requestFullscreen?.();
                setIsFullscreen(true);
            } catch (err) {
                console.log('Fullscreen not supported');
            }
        } else {
            await document.exitFullscreen?.();
            setIsFullscreen(false);
        }
    }, []);

    const exitFullscreen = useCallback(async () => {
        if (document.fullscreenElement) {
            await document.exitFullscreen?.();
        }
        setIsFullscreen(false);
    }, []);

    // Media control functions
    const togglePlayPause = useCallback(() => {
        if (imageRef.current) {
            if (getCurrentMediaType() === 'video') {
                if (isPaused) {
                    imageRef.current.play();
                } else {
                    imageRef.current.pause();
                }
                setIsPaused(!isPaused);
            }
        }
    }, [isPaused, getCurrentMediaType]);

    // Zoom functions with better implementation
    const zoomIn = useCallback(() => {
        setZoomLevel(prev => Math.min(prev * 1.3, 5));
    }, []);

    const zoomOut = useCallback(() => {
        setZoomLevel(prev => Math.max(prev / 1.3, 0.3));
    }, []);

    const resetZoom = useCallback(() => {
        setZoomLevel(1);
        setDragPosition({ x: 0, y: 0 });
    }, []);

    // Mouse drag for zoomed images
    const handleMouseDown = useCallback((e) => {
        if (zoomLevel > 1) {
            setIsDragging(true);
            setLastMousePos({ x: e.clientX, y: e.clientY });
        }
    }, [zoomLevel]);

    const handleMouseMove = useCallback((e) => {
        setShowControls(true);

        if (isDragging && zoomLevel > 1) {
            const deltaX = e.clientX - lastMousePos.x;
            const deltaY = e.clientY - lastMousePos.y;

            setDragPosition(prev => ({
                x: prev.x + deltaX,
                y: prev.y + deltaY
            }));

            setLastMousePos({ x: e.clientX, y: e.clientY });
        }
    }, [isDragging, lastMousePos, zoomLevel]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    // Download function
    const downloadImage = useCallback(async () => {
        try {
            const response = await fetch(images[currentIndex]);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${title || 'image'}-${currentIndex + 1}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
        }
    }, [images, currentIndex, title]);

    // Image load handlers
    const handleImageLoad = useCallback(() => {
        setIsLoading(false);
        setLoadError(false);
    }, []);

    const handleImageError = useCallback(() => {
        setIsLoading(false);
        setLoadError(true);
    }, []);

    if (!isOpen || !images || images.length === 0) return null;

    const currentMediaType = getCurrentMediaType();

    return (
        <AnimatePresence>
            <motion.div
                ref={containerRef}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className={`fixed inset-0 z-[9999] bg-black select-none ${isFullscreen ? '' : 'backdrop-blur-sm'}`}
                onClick={onClose}
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                style={{ cursor: isDragging ? 'grabbing' : zoomLevel > 1 ? 'grab' : 'default' }}
            >
                {/* Top Controls Bar */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{
                        opacity: showControls ? 1 : 0,
                        y: showControls ? 0 : -20
                    }}
                    className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 via-black/40 to-transparent p-4"
                >
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="bg-black/60 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
                                <span className="text-white text-sm font-medium">
                                    {currentMediaType.toUpperCase()} • {currentIndex + 1} / {images.length}
                                </span>
                            </div>
                            {title && (
                                <div className="bg-black/60 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
                                    <span className="text-white text-sm font-medium truncate max-w-xs">
                                        {title}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            {/* Info Toggle */}
                            <button
                                onClick={(e) => { e.stopPropagation(); setShowInfo(!showInfo); }}
                                className={`p-3 rounded-full transition-all duration-200 border border-white/20 ${
                                    showInfo 
                                        ? 'bg-white/20 text-white' 
                                        : 'bg-black/60 hover:bg-white/10 text-white/80 hover:text-white'
                                }`}
                                title="Toggle Info (I)"
                            >
                                <Info size={18}/>
                            </button>

                            {/* Thumbnail Grid Toggle */}
                            {images.length > 1 && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); setShowThumbnails(!showThumbnails); }}
                                    className={`p-3 rounded-full transition-all duration-200 border border-white/20 ${
                                        showThumbnails 
                                            ? 'bg-white/20 text-white' 
                                            : 'bg-black/60 hover:bg-white/10 text-white/80 hover:text-white'
                                    }`}
                                    title="Toggle Grid (G)"
                                >
                                    <Grid3X3 size={18}/>
                                </button>
                            )}

                            {/* Download Button */}
                            <button
                                onClick={(e) => { e.stopPropagation(); downloadImage(); }}
                                className="p-3 bg-black/60 hover:bg-white/10 text-white/80 hover:text-white rounded-full transition-all duration-200 border border-white/20"
                                title="Download"
                            >
                                <Download size={18}/>
                            </button>

                            {/* Play/Pause for Videos */}
                            {currentMediaType === 'video' && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); togglePlayPause(); }}
                                    className="p-3 bg-black/60 hover:bg-white/10 text-white/80 hover:text-white rounded-full transition-all duration-200 border border-white/20"
                                    title={isPaused ? 'Play (Space)' : 'Pause (Space)'}
                                >
                                    {isPaused ? <Play size={18}/> : <Pause size={18}/>}
                                </button>
                            )}

                            {/* Fullscreen Toggle */}
                            <button
                                onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                                className="p-3 bg-black/60 hover:bg-white/10 text-white/80 hover:text-white rounded-full transition-all duration-200 border border-white/20"
                                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen (F)'}
                            >
                                {isFullscreen ? <Minimize size={18}/> : <Maximize size={18}/>}
                            </button>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="p-3 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-all duration-200 border border-red-500/50"
                                title="Close (Esc)"
                            >
                                <X size={18}/>
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Navigation Buttons */}
                {images.length > 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: showControls ? 1 : 0
                        }}
                        className="absolute left-4 right-4 top-1/2 -translate-y-1/2 z-40 flex justify-between pointer-events-none"
                    >
                        <button
                            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                            className="p-4 bg-black/60 hover:bg-black/80 text-white rounded-full transition-all duration-200 border border-white/20 pointer-events-auto backdrop-blur-md"
                            title="Previous (←)"
                        >
                            <ChevronLeft size={24}/>
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); goToNext(); }}
                            className="p-4 bg-black/60 hover:bg-black/80 text-white rounded-full transition-all duration-200 border border-white/20 pointer-events-auto backdrop-blur-md"
                            title="Next (→)"
                        >
                            <ChevronRight size={24}/>
                        </button>
                    </motion.div>
                )}

                {/* Main Content Container */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                    <motion.div
                        initial={{scale: 0.9, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        exit={{scale: 0.9, opacity: 0}}
                        className="relative max-w-full max-h-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Loading Spinner */}
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center z-30">
                                <div className="w-12 h-12 border-3 border-white/30 border-t-white rounded-full animate-spin"/>
                            </div>
                        )}

                        {/* Error State */}
                        {loadError && (
                            <div className="flex flex-col items-center justify-center text-white p-12 bg-black/60 rounded-2xl backdrop-blur-md">
                                <div className="text-6xl mb-4">⚠️</div>
                                <h3 className="text-xl font-semibold mb-2">Failed to load media</h3>
                                <p className="text-white/70 text-center">
                                    The file might be corrupted or unavailable.
                                </p>
                            </div>
                        )}

                        {/* Media Element */}
                        {!loadError && (
                            <div className="relative overflow-hidden rounded-lg">
                                {currentMediaType === 'video' ? (
                                    <motion.video
                                        key={currentIndex}
                                        ref={imageRef}
                                        initial={{opacity: 0, scale: 0.95}}
                                        animate={{
                                            opacity: isLoading ? 0 : 1,
                                            scale: 1
                                        }}
                                        src={images[currentIndex]}
                                        controls={false}
                                        autoPlay
                                        loop
                                        className="max-w-[90vw] max-h-[90vh] object-contain"
                                        onLoadStart={() => setIsLoading(true)}
                                        onLoadedData={handleImageLoad}
                                        onError={handleImageError}
                                        style={{
                                            transform: `scale(${zoomLevel}) translate(${dragPosition.x}px, ${dragPosition.y}px)`,
                                            transformOrigin: 'center'
                                        }}
                                    />
                                ) : (
                                    <motion.img
                                        key={currentIndex}
                                        ref={imageRef}
                                        initial={{opacity: 0, scale: 0.95}}
                                        animate={{
                                            opacity: isLoading ? 0 : 1,
                                            scale: 1
                                        }}
                                        src={images[currentIndex]}
                                        alt={`${title} - ${currentMediaType} ${currentIndex + 1}`}
                                        className="max-w-[90vw] max-h-[90vh] object-contain select-none"
                                        onLoad={handleImageLoad}
                                        onError={handleImageError}
                                        style={{
                                            transform: `scale(${zoomLevel}) translate(${dragPosition.x}px, ${dragPosition.y}px)`,
                                            transformOrigin: 'center'
                                        }}
                                        draggable={false}
                                    />
                                )}
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Bottom Controls Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: showControls ? 1 : 0,
                        y: showControls ? 0 : 20
                    }}
                    className="absolute bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4"
                >
                    <div className="flex justify-between items-center">
                        {/* Zoom Controls */}
                        <div className="flex items-center space-x-2">
                        </div>

                        {/* Media Type Info */}
                        <div className="bg-black/60 backdrop-blur-md rounded-lg px-4 py-2 border border-white/10">
                            <span className="text-white/80 text-sm">
                                {currentMediaType === 'gif' ? 'Animated GIF' :
                                 currentMediaType === 'video' ? 'Video' : 'Image'}
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Info Panel */}
                <AnimatePresence>
                    {showInfo && (
                        <motion.div
                            initial={{ opacity: 0, x: 300 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 300 }}
                            className="absolute top-20 right-4 bottom-20 w-80 bg-black/80 backdrop-blur-md rounded-2xl border border-white/20 p-6 z-40 overflow-y-auto"
                        >
                            <h3 className="text-white text-lg font-semibold mb-4">Image Information</h3>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <span className="text-white/60">Type:</span>
                                    <span className="text-white ml-2">{currentMediaType.toUpperCase()}</span>
                                </div>
                                <div>
                                    <span className="text-white/60">Position:</span>
                                    <span className="text-white ml-2">{currentIndex + 1} of {images.length}</span>
                                </div>
                                {title && (
                                    <div>
                                        <span className="text-white/60">Title:</span>
                                        <span className="text-white ml-2">{title}</span>
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/20">
                                <h4 className="text-white font-medium mb-3">Keyboard Shortcuts</h4>
                                <div className="space-y-2 text-xs text-white/70">
                                    <div className="flex justify-between">
                                        <span>Navigate</span>
                                        <span>← →</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Fullscreen</span>
                                        <span>F</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Play/Pause</span>
                                        <span>Space</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Toggle Info</span>
                                        <span>I</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Toggle Grid</span>
                                        <span>G</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Close</span>
                                        <span>Esc</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Thumbnail Grid */}
                <AnimatePresence>
                    {showThumbnails && images.length > 1 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="absolute inset-4 bg-black/90 backdrop-blur-md rounded-2xl border border-white/20 z-40 p-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-white text-lg font-semibold">All Images ({images.length})</h3>
                                <button
                                    onClick={() => setShowThumbnails(false)}
                                    className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                                >
                                    <X size={20}/>
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-h-[70vh] overflow-y-auto">
                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                                            index === currentIndex
                                                ? 'border-white ring-2 ring-white/50 scale-105'
                                                : 'border-white/30 hover:border-white/70 hover:scale-105'
                                        }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                            <span className="text-white text-xs font-medium bg-black/60 px-2 py-1 rounded">
                                                {index + 1}
                                            </span>
                                        </div>
                                        {isGif(image) && (
                                            <div className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1 rounded">
                                                GIF
                                            </div>
                                        )}
                                        {isVideo(image) && (
                                            <div className="absolute top-1 right-1 bg-blue-500 text-white text-xs px-1 rounded">
                                                VID
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    );
});

ImageModal.displayName = 'ImageModal';

export default ImageModal;