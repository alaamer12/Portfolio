import {memo, useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {FaChevronLeft, FaChevronRight, FaTimes} from 'react-icons/fa';

const ImageModal = memo(({isOpen, onClose, images, initialIndex = 0, title}) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;

            switch (e.key) {
                case 'Escape':
                    onClose();
                    break;
                case 'ArrowLeft':
                    goToPrevious();
                    break;
                case 'ArrowRight':
                    goToNext();
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

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

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    if (!isOpen || !images || images.length === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{scale: 0.8, opacity: 0}}
                    animate={{scale: 1, opacity: 1}}
                    exit={{scale: 0.8, opacity: 0}}
                    className="relative w-full h-full max-w-[95vw] max-h-[95vh] mx-4 flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                    >
                        <FaTimes className="w-5 h-5"/>
                    </button>

                    {/* Navigation Buttons */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={goToPrevious}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                            >
                                <FaChevronLeft className="w-5 h-5"/>
                            </button>
                            <button
                                onClick={goToNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                            >
                                <FaChevronRight className="w-5 h-5"/>
                            </button>
                        </>
                    )}

                    {/* Scrollable Image Container */}
                    <div
                        className="relative w-full h-full max-w-[95vw] max-h-[90vh] bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-auto">
                        <div className="p-4">
                            <motion.img
                                key={currentIndex}
                                initial={{opacity: 0, scale: 0.95}}
                                animate={{opacity: 1, scale: 1}}
                                exit={{opacity: 0, scale: 0.95}}
                                src={images[currentIndex]}
                                alt={`${title} - Image ${currentIndex + 1}`}
                                className="w-full h-auto object-contain rounded-lg"
                                style={{
                                    minWidth: '100%',
                                    height: 'auto'
                                }}
                            />
                        </div>

                        {/* Fixed Image Info */}
                        <div
                            className="sticky bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4">
                            <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                                <h3 className="text-white text-lg font-semibold mb-1">{title}</h3>
                                {images.length > 1 && (
                                    <p className="text-white/80 text-sm">
                                        {currentIndex + 1} of {images.length}
                                    </p>
                                )}
                                <p className="text-white/60 text-xs mt-1">
                                    Scroll to view full image
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Thumbnail Navigation */}
                    {images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                            <div
                                className="flex justify-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${index === currentIndex
                                            ? 'border-white scale-110'
                                            : 'border-gray-400 hover:border-white/70'
                                        }`}
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