import {  Component  } from "react";
import { motion } from 'framer-motion';
import Background from '../Background/Background';
import { FaExclamationTriangle, FaHome, FaRedoAlt } from 'react-icons/fa';
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log the error to an error reporting service here
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }
  handleReload = () => {
    window.location.reload();
  };
  handleGoHome = () => {
    window.location.href = '/';
  };
  render() {
    if (this.state.hasError) {
      return (
        <div className="relative min-h-screen w-screen overflow-x-hidden">
          <Background />
          <div className="relative z-10 w-full min-h-screen flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl w-full bg-[#f5f4f4]/80 dark:bg-surface/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
            >
              <div className="flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6"
                >
                  <FaExclamationTriangle className="w-12 h-12 text-red-500 dark:text-red-400" />
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Oops! Something went wrong
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
                  We apologize for the inconvenience. An unexpected error has occurred.
                  Our team has been notified and is working to fix it.
                </p>
                {process.env.NODE_ENV === 'development' && (
                  <div className="w-full mb-8 overflow-hidden">
                    <details className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-4 text-left">
                      <summary className="text-primary dark:text-primary-light font-semibold cursor-pointer">
                        View Error Details
                      </summary>
                      <div className="mt-4">
                        <p className="text-red-600 dark:text-red-400 font-mono text-sm mb-2">
                          {this.state.error && this.state.error.toString()}
                        </p>
                        <pre className="text-gray-700 dark:text-gray-300 font-mono text-xs overflow-auto">
                          {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    </details>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={this.handleReload}
                    className="px-6 py-3 bg-primary hover:bg-primary-light dark:bg-surface dark:hover:bg-primary text-white rounded-full transition-colors flex items-center justify-center gap-2 text-lg font-semibold"
                  >
                    <FaRedoAlt className="w-5 h-5" />
                    Try Again
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={this.handleGoHome}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-full transition-colors flex items-center justify-center gap-2 text-lg font-semibold"
                  >
                    <FaHome className="w-5 h-5" />
                    Go Home
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
