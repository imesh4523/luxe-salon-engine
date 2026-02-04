import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import scissorsImg from '@/assets/salon-scissors.png';
import hairdryerImg from '@/assets/salon-hairdryer.png';
import combImg from '@/assets/salon-comb.png';

interface SalonItemProps {
  src: string;
  alt: string;
  initialX: number;
  initialY: number;
  floatDelay: number;
  rotateRange: [number, number];
  size: string;
  mobileSize: string;
}

const SalonItem = ({ src, alt, initialX, initialY, floatDelay, rotateRange, size, mobileSize }: SalonItemProps) => {
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  // Pinch to zoom handler
  useEffect(() => {
    let initialDistance = 0;
    let initialScale = scale;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        initialDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        initialScale = scale;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        
        const scaleChange = currentDistance / initialDistance;
        const newScale = Math.min(Math.max(initialScale * scaleChange, 0.3), 2.5);
        setScale(newScale);
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [scale]);

  return (
    <motion.div
      className="absolute cursor-grab active:cursor-grabbing touch-none"
      style={{ left: initialX, top: initialY }}
      initial={{ opacity: 0, scale: 0, rotate: rotateRange[0] }}
      animate={{ 
        opacity: 1, 
        scale: scale,
        rotate: [rotateRange[0], rotateRange[1], rotateRange[0]],
        y: [0, -15, 0],
      }}
      transition={{
        opacity: { delay: floatDelay, duration: 0.5 },
        scale: { type: 'spring', stiffness: 200, damping: 15 },
        rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: floatDelay },
        y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: floatDelay },
      }}
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.1}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      whileHover={{ scale: scale * 1.1 }}
      whileTap={{ scale: scale * 0.95 }}
    >
      {/* Green screen removal using CSS */}
      <div className="relative">
        <img
          src={src}
          alt={alt}
          className={`${mobileSize} ${size} object-contain drop-shadow-2xl`}
          style={{
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))',
            mixBlendMode: 'multiply',
          }}
        />
        {/* Overlay the same image with screen blend for better colors */}
        <img
          src={src}
          alt=""
          className={`absolute inset-0 ${mobileSize} ${size} object-contain opacity-90`}
          style={{
            mixBlendMode: 'screen',
            filter: 'saturate(1.2) contrast(1.1)',
          }}
        />
      </div>
      
      {/* Sparkle effect */}
      {!isDragging && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-amber-300 to-yellow-400 rounded-full shadow-lg"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}
    </motion.div>
  );
};

export const FloatingSalonIcons = () => {
  const { scrollY } = useScroll();
  
  const x = useTransform(scrollY, [0, 500, 1000, 1500], [0, 30, -20, 15]);
  const y = useTransform(scrollY, [0, 500, 1000, 1500], [0, 20, -15, 30]);
  const opacity = useTransform(scrollY, [0, 200, 800, 1200], [1, 1, 0.8, 0.6]);

  const salonItems: SalonItemProps[] = [
    {
      src: scissorsImg,
      alt: 'Golden Scissors',
      initialX: 10,
      initialY: 20,
      floatDelay: 0,
      rotateRange: [-15, 15],
      size: 'sm:w-20 sm:h-20 md:w-24 md:h-24',
      mobileSize: 'w-14 h-14',
    },
    {
      src: hairdryerImg,
      alt: 'Pink Hair Dryer',
      initialX: 70,
      initialY: 60,
      floatDelay: 0.3,
      rotateRange: [-10, 10],
      size: 'sm:w-24 sm:h-24 md:w-28 md:h-28',
      mobileSize: 'w-16 h-16',
    },
    {
      src: combImg,
      alt: 'Rose Gold Comb',
      initialX: 140,
      initialY: 10,
      floatDelay: 0.6,
      rotateRange: [-20, 5],
      size: 'sm:w-18 sm:h-18 md:w-22 md:h-22',
      mobileSize: 'w-12 h-12',
    },
  ];

  return (
    <motion.div
      className="fixed top-28 left-2 z-30 sm:left-6 md:left-10"
      style={{ x, y, opacity }}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {/* Container for salon items */}
      <div className="relative w-48 h-32 sm:w-64 sm:h-40 md:w-80 md:h-48">
        {salonItems.map((item, index) => (
          <SalonItem key={index} {...item} />
        ))}
        
        {/* Floating particles */}
        <motion.div
          className="absolute top-0 right-0 w-2 h-2 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full"
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-4 left-1/2 w-1.5 h-1.5 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full"
          animate={{
            y: [0, -25, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute top-1/2 right-4 w-1 h-1 bg-gradient-to-br from-amber-300 to-yellow-400 rounded-full"
          animate={{
            y: [0, -20, 0],
            x: [0, -5, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      {/* Zoom hint for mobile */}
      <motion.div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground/60 whitespace-nowrap sm:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 3, delay: 2, repeat: 2 }}
      >
        👆 Pinch to zoom • Drag to move
      </motion.div>
    </motion.div>
  );
};

export default FloatingSalonIcons;
