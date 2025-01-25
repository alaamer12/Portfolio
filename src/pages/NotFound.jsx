import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Background from '../components/Background/Background';
import { FaHome, FaSearch } from 'react-icons/fa';
import SEO from '../components/SEO/SEO';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden">
      <SEO
        title="404 - Page Not Found"
        description="Sorry, the page you're looking for doesn't exist. Return to the homepage to explore my portfolio."
        type="website"
        image="/404-og.png"
      />
      <Background />
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full bg-[#f5f4f4]/80 dark:bg-surface/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-24 h-24 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FaSearch className="w-12 h-12 text-primary dark:text-primary-light" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            404
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Page Not Found
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-primary hover:bg-primary-light dark:bg-surface dark:hover:bg-primary text-white rounded-full transition-colors inline-flex items-center justify-center gap-2 text-lg font-semibold"
          >
            <FaHome className="w-5 h-5" />
            Back to Home
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
