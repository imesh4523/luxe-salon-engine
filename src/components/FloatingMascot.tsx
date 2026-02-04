import { motion, useScroll, useTransform } from 'framer-motion';
import mascotCharacter from '@/assets/mascot-character.png';

export const FloatingMascot = () => {
  const { scrollY } = useScroll();
  
  // Transform scroll position to horizontal movement
  const x = useTransform(scrollY, [0, 500, 1000, 1500, 2000], [0, 100, -50, 150, 0]);
  const y = useTransform(scrollY, [0, 500, 1000, 1500, 2000], [0, -20, 30, -40, 20]);
  const rotate = useTransform(scrollY, [0, 500, 1000, 1500, 2000], [0, 10, -5, 15, -10]);
  const scale = useTransform(scrollY, [0, 300, 600], [1, 1.1, 0.9]);

  return (
    <motion.div
      className="fixed top-20 right-8 z-40 pointer-events-none sm:right-12 md:right-20"
      style={{ x, y, rotate, scale }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5, type: 'spring', stiffness: 100 }}
    >
      <motion.div
        className="relative"
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Glow effect behind mascot */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-300/40 to-pink-300/40 rounded-full blur-2xl scale-150" />
        
        {/* Main mascot image */}
        <motion.img
          src={mascotCharacter}
          alt="Glamour Mascot"
          className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 drop-shadow-2xl"
          whileHover={{ scale: 1.1, rotate: 5 }}
          drag
          dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
          dragElastic={0.1}
          style={{ pointerEvents: 'auto' }}
        />

        {/* Sparkle effects */}
        <motion.div
          className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-1 -left-2 w-3 h-3 bg-gradient-to-br from-pink-300 to-violet-300 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default FloatingMascot;
