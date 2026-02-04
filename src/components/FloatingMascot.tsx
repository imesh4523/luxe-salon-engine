import { motion, useScroll, useTransform } from 'framer-motion';

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
        {/* CSS-based Cute Mascot Character */}
        <motion.div
          className="relative w-20 h-24 sm:w-28 sm:h-32 md:w-32 md:h-36 cursor-grab active:cursor-grabbing"
          whileHover={{ scale: 1.1, rotate: 5 }}
          drag
          dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
          dragElastic={0.1}
          style={{ pointerEvents: 'auto' }}
        >
          {/* Body - main oval shape */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 bg-gradient-to-b from-white via-white to-gray-50 rounded-[50%] shadow-[0_10px_40px_rgba(0,0,0,0.15),inset_0_-5px_20px_rgba(0,0,0,0.05),inset_0_5px_15px_rgba(255,255,255,0.9)]">
            {/* Face */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
              {/* Eyes */}
              <div className="flex gap-3 sm:gap-4 mb-1">
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gray-800 rounded-full shadow-inner relative">
                  <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full opacity-80" />
                </div>
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gray-800 rounded-full shadow-inner relative">
                  <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full opacity-80" />
                </div>
              </div>
              
              {/* Blush cheeks */}
              <div className="flex gap-6 sm:gap-8 -mt-0.5">
                <div className="w-3 h-2 sm:w-4 sm:h-2.5 bg-pink-300/60 rounded-full blur-[1px]" />
                <div className="w-3 h-2 sm:w-4 sm:h-2.5 bg-pink-300/60 rounded-full blur-[1px]" />
              </div>
              
              {/* Smile */}
              <div className="w-3 h-1.5 sm:w-4 sm:h-2 border-b-2 border-gray-600 rounded-b-full mt-0.5" />
            </div>
          </div>
          
          {/* Arms */}
          <motion.div 
            className="absolute top-8 -left-2 sm:top-10 sm:-left-3 w-4 h-6 sm:w-5 sm:h-8 bg-gradient-to-b from-white to-gray-50 rounded-full shadow-md origin-right"
            animate={{ rotate: [0, -15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div 
            className="absolute top-8 -right-2 sm:top-10 sm:-right-3 w-4 h-6 sm:w-5 sm:h-8 bg-gradient-to-b from-white to-gray-50 rounded-full shadow-md origin-left"
            animate={{ rotate: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          />
          
          {/* Legs */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
            <div className="w-3 h-4 sm:w-4 sm:h-5 bg-gradient-to-b from-white to-gray-100 rounded-full shadow-md" />
            <div className="w-3 h-4 sm:w-4 sm:h-5 bg-gradient-to-b from-white to-gray-100 rounded-full shadow-md" />
          </div>
        </motion.div>

        {/* Sparkle effects */}
        <motion.div
          className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-accent to-primary rounded-full shadow-lg"
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
          className="absolute -bottom-1 -left-2 w-3 h-3 bg-gradient-to-br from-pink-400 to-violet-400 rounded-full shadow-lg"
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
