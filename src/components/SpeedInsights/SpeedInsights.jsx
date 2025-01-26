import { inject } from '@vercel/speed-insights';
import { useEffect } from 'react';

const SpeedInsights = () => {
    useEffect(() => {
        // Initialize Speed Insights
        inject();
    }, []);

    // This component doesn't render anything
    return null;
};

export default SpeedInsights;
