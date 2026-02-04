import { motion, useScroll, useTransform } from 'framer-motion';
import { Scissors, Wind, Sparkles } from 'lucide-react';

export const FloatingSalonIcons = () => {
  const { scrollY } = useScroll();
  
  // Transform scroll position to movement
  const x = useTransform(scrollY, [0, 500, 1000, 1500], [0, 50, -30, 20]);
  const y = useTransform(scrollY, [0, 500, 1000, 1500], [0, 30, -20, 50]);
  const rotate = useTransform(scrollY, [0, 500, 1000, 1500], [0, -5, 8, -3]);
  const opacity = useTransform(scrollY, [0, 200, 800, 1200], [1, 1, 0.8, 0.6]);

  const icons = [
    { Icon: Scissors, color: 'from-amber-400 to-yellow-500', delay: 0, rotation: -15 },
    { Icon: Wind, color: 'from-pink-400 to-rose-500', delay: 0.2, rotation: 10 },
    { Icon: Sparkles, color: 'from-violet-400 to-purple-500', delay: 0.4, rotation: -5 },
  ];

  return (
    <motion.div
      className="fixed top-28 left-4 z-30 pointer-events-none sm:left-8 md:left-12 hidden sm:block"
      style={{ x, y, rotate, opacity }}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.8, type: 'spring', stiffness: 80 }}
    >
      <motion.div
        className="relative flex gap-3 md:gap-4"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {icons.map(({ Icon, color, delay, rotation }, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: rotation,
              y: [0, -8, 0]
            }}
            transition={{ 
              opacity: { delay: 0.8 + delay, duration: 0.5 },
              scale: { delay: 0.8 + delay, duration: 0.5, type: 'spring' },
              rotate: { delay: 0.8 + delay, duration: 0.3 },
              y: { duration: 3 + index * 0.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }
            }}
          >
            {/* Glass morphism icon container */}
            <div className={`
              relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
              bg-gradient-to-br ${color}
              rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.4)]
              flex items-center justify-center
              before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/30 before:to-transparent before:pointer-events-none
            `}>
              <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white drop-shadow-md" strokeWidth={2.5} />
              
              {/* Shine effect */}
              <div className="absolute top-1 left-1 w-3 h-3 sm:w-4 sm:h-4 bg-white/40 rounded-full blur-sm" />
            </div>
            
            {/* Floating sparkle */}
            <motion.div
              className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full shadow-lg"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.3,
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default FloatingSalonIcons;
