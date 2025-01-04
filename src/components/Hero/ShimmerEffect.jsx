import React from 'react';
import { motion } from 'framer-motion';

const ShimmerEffect = () => {
  const variants = {
    hidden: {
      x: "-100%",
      opacity: 0
    },
    visible: {
      x: "100%",
      opacity: [0, 1, 0],
      transition: {
        duration: 1,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        variants={variants}
        className="w-[120%] h-full absolute top-0 -left-[20%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
      />
    </div>
  );
};

export default ShimmerEffect;
