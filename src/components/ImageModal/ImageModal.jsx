import {memo, useCallback, useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {FaChevronLeft, FaChevronRight, FaExpand, FaCompress, FaTimes, FaDownload, FaPlay, FaPause} from 'react-icons/fa';

const ImageModal = memo(({isOpen, onClose, images, initialIndex = 0, title}) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isPaused, setIsPaused] = useState(false);
    const imageRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex]);

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

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;

            switch (e.key) {
                case 'Escape':
                    if (isFullscreen) {
                        setIsFullscreen(false);
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
                case '+':
                case '=':
                    zoomIn();
                    break;
                case '-':
                    zoomOut();
                    break;
                case '0':
                    resetZoom();
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, isFullscreen, getCurrentMediaType]);

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
    }, []);

    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen?.();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen?.();
            setIsFullscreen(false);
        }
    }, []);

    const togglePlayPause = useCallback(() => {
        if (imageRef.current) {
            if (getCurrentMediaType() === 'video') {
                if (isPaused) {
                    imageRef.current.play();
                } else {
                    imageRef.current.pause();
                }
                setIsPaused(!isPaused);
            } else if (getCurrentMediaType() === 'gif') {
                // For GIFs, we can toggle by changing the src
                if (isPaused) {
                    imageRef.current.src = images[currentIndex];
                } else {
                    // Create a static version by drawing to canvas
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = imageRef.current.naturalWidth;
                    canvas.height = imageRef.current.naturalHeight;
                    ctx.drawImage(imageRef.current, 0, 0);
                    imageRef.current.src = canvas.toDataURL();
                }
                setIsPaused(!isPaused);
            }
        }
    }, [isPaused, getCurrentMediaType, images, currentIndex]);

    const zoomIn = useCallback(() => {
        setZoomLevel(prev => Math.min(prev * 1.2, 5));
        setIsZoomed(true);
    }, []);

    const zoomOut = useCallback(() => {
        setZoomLevel(prev => Math.max(prev / 1.2, 0.5));
        if (zoomLevel <= 1) setIsZoomed(false);
    }, [zoomLevel]);

    const resetZoom = useCallback(() => {
        setZoomLevel(1);
        setIsZoomed(false);
    }, []);

    const downloadImage = useCallback(() => {
        const link = document.createElement('a');
        link.href = images[currentIndex];
        link.download = `${title || 'image'}-${currentIndex + 1}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [images, currentIndex, title]);

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
                className={`fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm ${isFullscreen ? 'bg-black' : ''}`}
                onClick={onClose}
            >
                <motion.div
                    initial={{scale: 0.8, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    exit={{scale: 0.8, opacity: 0}}
                    className={`relative w-full h-full ${isFullscreen ? 'max-w-full max-h-full' : 'max-w-[95vw] max-h-[95vh]'} mx-4 flex items-center justify-center`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Top Controls Bar */}
                    <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                                <span className="text-white text-sm font-medium">
                                    {currentMediaType.toUpperCase()} • {currentIndex + 1} of {images.length}
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            {/* Download Button */}
                            <button
                                onClick={downloadImage}
                                className="p-2 bg-black/70 hover:bg-black/90 text-white rounded-lg transition-colors"
                                title="Download"
                            >
                                <FaDownload className="w-4 h-4"/>
                            </button>

                            {/* Play/Pause for GIFs and Videos */}
                            {(currentMediaType === 'gif' || currentMediaType === 'video') && (
                                <button
                                    onClick={togglePlayPause}
                                    className="p-2 bg-black/70 hover:bg-black/90 text-white rounded-lg transition-colors"
                                    title={isPaused ? 'Play' : 'Pause'}
                                >
                                    {isPaused ? <FaPlay className="w-4 h-4"/> : <FaPause className="w-4 h-4"/>}
                                </button>
                            )}

                            {/* Fullscreen Toggle */}
                            <button
                                onClick={toggleFullscreen}
                                className="p-2 bg-black/70 hover:bg-black/90 text-white rounded-lg transition-colors"
                                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                            >
                                {isFullscreen ? <FaCompress className="w-4 h-4"/> : <FaExpand className="w-4 h-4"/>}
                            </button>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="p-2 bg-black/70 hover:bg-black/90 text-white rounded-lg transition-colors"
                                title="Close"
                            >
                                <FaTimes className="w-4 h-4"/>
                            </button>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={goToPrevious}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/70 hover:bg-black/90 text-white rounded-full transition-colors"
                                title="Previous (←)"
                            >
                                <FaChevronLeft className="w-5 h-5"/>
                            </button>
                            <button
                                onClick={goToNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/70 hover:bg-black/90 text-white rounded-full transition-colors"
                                title="Next (→)"
                            >
                                <FaChevronRight className="w-5 h-5"/>
                            </button>
                        </>
                    )}

                    {/* Media Container */}
                    <div className={`relative w-full h-full ${isFullscreen ? 'max-w-full max-h-full' : 'max-w-[90vw] max-h-[80vh]'} bg-transparent rounded-lg overflow-auto`}>
                        <div className="flex items-center justify-center min-h-full p-4">
                            {/* Loading Spinner */}
                            {isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                                </div>
                            )}

                            {/* Error State */}
                            {loadError && (
                                <div className="flex flex-col items-center justify-center text-white p-8">
                                    <div className="text-6xl mb-4">⚠️</div>
                                    <h3 className="text-xl font-semibold mb-2">Failed to load media</h3>
                                    <p className="text-gray-300 text-center">
                                        The file might be corrupted or unavailable.
                                    </p>
                                </div>
                            )}

                            {/* Media Element */}
                            {!loadError && (
                                <>
                                    {currentMediaType === 'video' ? (
                                        <motion.video
                                            key={currentIndex}
                                            ref={imageRef}
                                            initial={{opacity: 0, scale: 0.95}}
                                            animate={{opacity: isLoading ? 0 : 1, scale: zoomLevel}}
                                            exit={{opacity: 0, scale: 0.95}}
                                            src={images[currentIndex]}
                                            controls
                                            autoPlay
                                            loop
                                            className="max-w-full max-h-full object-contain rounded-lg"
                                            onLoadStart={() => setIsLoading(true)}
                                            onLoadedData={handleImageLoad}
                                            onError={handleImageError}
                                            style={{
                                                transform: `scale(${zoomLevel})`,
                                                transformOrigin: 'center',
                                                cursor: isZoomed ? 'zoom-out' : 'zoom-in'
                                            }}
                                            onClick={() => isZoomed ? resetZoom() : zoomIn()}
                                        />
                                    ) : (
                                        <motion.img
                                            key={currentIndex}
                                            ref={imageRef}
                                            initial={{opacity: 0, scale: 0.95}}
                                            animate={{opacity: isLoading ? 0 : 1, scale: 1}}
                                            exit={{opacity: 0, scale: 0.95}}
                                            src={images[currentIndex]}
                                            alt={`${title} - ${currentMediaType} ${currentIndex + 1}`}
                                            className="max-w-full max-h-full object-contain rounded-lg"
                                            onLoad={handleImageLoad}
                                            onError={handleImageError}
                                            style={{
                                                transform: `scale(${zoomLevel})`,
                                                transformOrigin: 'center',
                                                cursor: isZoomed ? 'zoom-out' : 'zoom-in'
                                            }}
                                            onClick={() => isZoomed ? resetZoom() : zoomIn()}
                                            draggable={false}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Bottom Info Bar */}
                    <div className="absolute bottom-4 left-4 right-4 z-20">
                        <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-white text-lg font-semibold">{title}</h3>
                                    <div className="flex items-center space-x-4 mt-1">
                                        <span className="text-white/80 text-sm">
                                            {currentMediaType === 'gif' ? 'Animated GIF' : 
                                             currentMediaType === 'video' ? 'Video' : 'Image'}
                                        </span>
                                        {zoomLevel !== 1 && (
                                            <span className="text-white/60 text-sm">
                                                Zoom: {Math.round(zoomLevel * 100)}%
                                            </span>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Zoom Controls */}
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={zoomOut}
                                        className="px-2 py-1 bg-white/20 hover:bg-white/30 text-white rounded text-sm transition-colors"
                                        disabled={zoomLevel <= 0.5}
                                        title="Zoom Out (-)"
                                    >
                                        -
                                    </button>
                                    <button
                                        onClick={resetZoom}
                                        className="px-2 py-1 bg-white/20 hover:bg-white/30 text-white rounded text-sm transition-colors"
                                        title="Reset Zoom (0)"
                                    >
                                        {Math.round(zoomLevel * 100)}%
                                    </button>
                                    <button
                                        onClick={zoomIn}
                                        className="px-2 py-1 bg-white/20 hover:bg-white/30 text-white rounded text-sm transition-colors"
                                        disabled={zoomLevel >= 5}
                                        title="Zoom In (+)"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            
                            {/* Keyboard Shortcuts Info */}
                            <div className="mt-2 text-white/60 text-xs">
                                <span>Shortcuts: </span>
                                <span className="mr-3">← → Navigate</span>
                                <span className="mr-3">F Fullscreen</span>
                                <span className="mr-3">Space Play/Pause</span>
                                <span className="mr-3">+/- Zoom</span>
                                <span>Esc Close</span>
                            </div>
                        </div>
                    </div>

                    {/* Thumbnail Navigation */}
                    {images.length > 1 && !isFullscreen && (
                        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                            <div className="flex justify-center space-x-2 bg-black/70 backdrop-blur-sm rounded-full px-4 py-2 max-w-md overflow-x-auto">
                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${
                                            index === currentIndex
                                                ? 'border-white scale-110'
                                                : 'border-gray-400 hover:border-white/70'
                                        }`}
                                        title={`Go to ${isGif(image) ? 'GIF' : isVideo(image) ? 'Video' : 'Image'} ${index + 1}`}
                                    >
                                        <img
                                            src={image}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
});

ImageModal.displayName = 'ImageModal';

export default ImageModal;