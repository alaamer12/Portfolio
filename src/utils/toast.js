import toast from 'react-hot-toast';

// Custom toast styles matching the portfolio theme
const toastStyles = {
  success: {
    style: {
      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)',
      color: '#065f46',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      backdropFilter: 'blur(16px)',
      borderRadius: '16px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      fontSize: '14px',
      fontWeight: '600',
      padding: '16px 20px',
      maxWidth: '400px',
    },
    iconTheme: {
      primary: '#10b981',
      secondary: '#ffffff',
    },
    duration: 4000,
  },
  error: {
    style: {
      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)',
      color: '#7f1d1d',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      backdropFilter: 'blur(16px)',
      borderRadius: '16px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      fontSize: '14px',
      fontWeight: '600',
      padding: '16px 20px',
      maxWidth: '400px',
    },
    iconTheme: {
      primary: '#ef4444',
      secondary: '#ffffff',
    },
    duration: 5000,
  },
  loading: {
    style: {
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)',
      color: '#1e3a8a',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      backdropFilter: 'blur(16px)',
      borderRadius: '16px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      fontSize: '14px',
      fontWeight: '600',
      padding: '16px 20px',
      maxWidth: '400px',
    },
    iconTheme: {
      primary: '#3b82f6',
      secondary: '#ffffff',
    },
  },
  info: {
    style: {
      background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%)',
      color: '#581c87',
      border: '1px solid rgba(168, 85, 247, 0.3)',
      backdropFilter: 'blur(16px)',
      borderRadius: '16px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      fontSize: '14px',
      fontWeight: '600',
      padding: '16px 20px',
      maxWidth: '400px',
    },
    iconTheme: {
      primary: '#a855f7',
      secondary: '#ffffff',
    },
    duration: 4000,
  }
};

// Custom toast functions
export const showSuccessToast = (message) => {
  return toast.success(message, toastStyles.success);
};

export const showErrorToast = (message) => {
  return toast.error(message, toastStyles.error);
};

export const showLoadingToast = (message) => {
  return toast.loading(message, toastStyles.loading);
};

export const showInfoToast = (message) => {
  return toast(message, {
    icon: '💡',
    ...toastStyles.info
  });
};

// Dismiss toast
export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};

// Dismiss all toasts
export const dismissAllToasts = () => {
  toast.dismiss();
};