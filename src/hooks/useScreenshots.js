import { useState, useEffect } from 'react';
import { initializeScreenshots } from '../data/projects';

/**
 * Hook to initialize and manage screenshots loading
 * @returns {Object} { screenshotsLoaded, initializeScreenshots }
 */
export const useScreenshots = () => {
    const [screenshotsLoaded, setScreenshotsLoaded] = useState(false);
    const [loading, setLoading] = useState(false);

    const loadScreenshots = async () => {
        if (screenshotsLoaded || loading) return;
        
        setLoading(true);
        try {
            await initializeScreenshots();
            setScreenshotsLoaded(true);
        } catch (error) {
            console.error('Failed to load screenshots:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadScreenshots();
    }, []);

    return {
        screenshotsLoaded,
        loading,
        loadScreenshots
    };
};

export default useScreenshots;