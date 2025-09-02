/**
 * Send contact form email using the Vercel serverless API endpoint
 * @param {Object} formData - The form data containing name, email, and message
 * @returns {Promise<Object>} - Response from the API
 */
export const sendContactEmail = async (formData) => {
    try {
        // Check if we're in development and API endpoint is not available
        const isDevelopment = import.meta.env.DEV;

        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        // If response is 404, it means API route is not available (likely in Vite dev mode)
        if (response.status === 404 && isDevelopment) {
            throw new Error('API_NOT_AVAILABLE');
        }

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to send email');
        }

        return {
            success: true,
            data: result,
            message: result.message || 'Email sent successfully!'
        };

    } catch (error) {
        console.error('Email sending failed:', error);

        // Special handling for development mode
        if (error.message === 'API_NOT_AVAILABLE') {
            return {
                success: false,
                error: 'DEV_MODE',
                message: 'API not available in Vite dev mode. Use "npx vercel dev" instead of "npm run dev" to test the contact form.'
            };
        }

        return {
            success: false,
            error: error.message,
            message: error.message || 'Failed to send email. Please try again.'
        };
    }
};