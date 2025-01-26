import {motion} from 'framer-motion';

const ShimmerEffect = () => {
    // Custom easing function for fast-slow-fast effect
    const customEase = [0.22, 1, 0.36, 1];

    return (
        <motion.div
            className="absolute inset-0 w-full h-full overflow-hidden rounded-3xl"
            initial="hidden"
            whileHover="visible"
        >
            <motion.div
                variants={{
                    hidden: {
                        x: "-100%",
                        opacity: 0,
                        skewX: "-70deg"
                    },
                    visible: {
                        x: "200%",
                        opacity: [0, 0.85, 0],
                        skewX: "-70deg",
                        transition: {
                            duration: 1.15,
                            ease: customEase,
                            times: [0, 0.5, 1]
                        }
                    }
                }}
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
        </motion.div>
    );
};

export default ShimmerEffect;
