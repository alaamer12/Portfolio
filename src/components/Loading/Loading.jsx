import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <motion.div
        className="w-16 h-16 border-4 border-primary rounded-full border-t-accent"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default Loading;
