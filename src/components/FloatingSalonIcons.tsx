import { motion, useScroll, useTransform } from 'framer-motion';
import salonIcons from '@/assets/salon-3d-icons.png';

export const FloatingSalonIcons = () => {
  const { scrollY } = useScroll();
  
  // Transform scroll position to movement
  const x = useTransform(scrollY, [0, 500, 1000, 1500], [-100, 50, -80, 30]);
  const y = useTransform(scrollY, [0, 500, 1000, 1500], [0, 30, -20, 50]);
  const rotate = useTransform(scrollY, [0, 500, 1000, 1500], [0, -5, 8, -3]);
  const opacity = useTransform(scrollY, [0, 200, 800, 1200], [1, 1, 0.7, 0.5]);

  return (
    <motion.div
      className="fixed top-32 left-4 z-30 pointer-events-none sm:left-8 md:left-16 hidden sm:block"
      style={{ x, y, rotate, opacity }}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.8, type: 'spring', stiffness: 80 }}
    >
      <motion.div
        className="relative"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 2, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Glass morphism glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-400/20 to-pink-400/20 rounded-3xl blur-3xl scale-110" />
        
        {/* Salon icons image */}
        <motion.img
          src={salonIcons}
          alt="Salon Icons"
          className="relative w-48 h-24 sm:w-64 sm:h-32 md:w-80 md:h-40 object-contain drop-shadow-xl"
          style={{ 
            filter: 'drop-shadow(0 20px 40px rgba(139, 92, 246, 0.3))'
          }}
        />

        {/* Floating sparkles */}
        <motion.div
          className="absolute top-0 right-4 w-2 h-2 bg-gradient-to-br from-yellow-200 to-amber-300 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-2 left-8 w-2 h-2 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full"
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default FloatingSalonIcons;
