import {Toaster} from 'react-hot-toast';

const ToastProvider = () => {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
                // Define default options
                className: '',
                duration: 4000,
                style: {
                    background: 'rgba(255, 255, 255, 0.95)',
                    color: '#1f2937',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    fontSize: '14px',
                    fontWeight: '500',
                    padding: '12px 16px',
                },
                // Default options for specific types
                success: {
                    duration: 4000,
                    style: {
                        background: 'rgba(16, 185, 129, 0.1)',
                        color: '#065f46',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                    },
                    iconTheme: {
                        primary: '#10b981',
                        secondary: '#ffffff',
                    },
                },
                error: {
                    duration: 5000,
                    style: {
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: '#7f1d1d',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                    },
                    iconTheme: {
                        primary: '#ef4444',
                        secondary: '#ffffff',
                    },
                },
                loading: {
                    style: {
                        background: 'rgba(59, 130, 246, 0.1)',
                        color: '#1e3a8a',
                        border: '1px solid rgba(59, 130, 246, 0.3)',
                    },
                    iconTheme: {
                        primary: '#3b82f6',
                        secondary: '#ffffff',
                    },
                },
            }}
        />
    );
};

export default ToastProvider;