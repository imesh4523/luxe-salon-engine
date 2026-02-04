import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';

// CSS-based 3D Scissors Component
const Scissors3D = ({ scale }: { scale: number }) => (
  <motion.div 
    className="relative"
    style={{ scale }}
    animate={{ rotate: [-5, 5, -5] }}
    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
  >
    <svg viewBox="0 0 64 64" className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 drop-shadow-xl">
      {/* Scissors blade 1 */}
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFA500" />
          <stop offset="100%" stopColor="#DAA520" />
        </linearGradient>
        <linearGradient id="goldShine" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF8DC" />
          <stop offset="30%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        <filter id="scissorShadow">
          <feDropShadow dx="2" dy="4" stdDeviation="2" floodOpacity="0.3"/>
        </filter>
      </defs>
      
      {/* Handle rings */}
      <ellipse cx="18" cy="48" rx="10" ry="8" fill="none" stroke="url(#goldGradient)" strokeWidth="4" filter="url(#scissorShadow)"/>
      <ellipse cx="46" cy="48" rx="10" ry="8" fill="none" stroke="url(#goldGradient)" strokeWidth="4" filter="url(#scissorShadow)"/>
      
      {/* Blades */}
      <motion.path 
        d="M18 40 L32 20 L36 22 L22 42 Z" 
        fill="url(#goldShine)" 
        filter="url(#scissorShadow)"
        animate={{ rotate: [0, -8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '32px 32px' }}
      />
      <motion.path 
        d="M46 40 L32 20 L28 22 L42 42 Z" 
        fill="url(#goldShine)" 
        filter="url(#scissorShadow)"
        animate={{ rotate: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '32px 32px' }}
      />
      
      {/* Center screw */}
      <circle cx="32" cy="32" r="4" fill="url(#goldGradient)" stroke="#B8860B" strokeWidth="1"/>
      <circle cx="31" cy="31" r="1.5" fill="#FFF8DC" opacity="0.8"/>
    </svg>
  </motion.div>
);

// CSS-based 3D Hair Dryer Component
const HairDryer3D = ({ scale }: { scale: number }) => (
  <motion.div 
    className="relative"
    style={{ scale }}
    animate={{ rotate: [-8, 8, -8], y: [0, -5, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
  >
    <svg viewBox="0 0 80 64" className="w-16 h-12 sm:w-20 sm:h-16 md:w-24 md:h-20 drop-shadow-xl">
      <defs>
        <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF69B4" />
          <stop offset="50%" stopColor="#FF1493" />
          <stop offset="100%" stopColor="#DB7093" />
        </linearGradient>
        <linearGradient id="pinkShine" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFB6C1" />
          <stop offset="40%" stopColor="#FF69B4" />
          <stop offset="100%" stopColor="#C71585" />
        </linearGradient>
        <linearGradient id="nozzleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2C2C2C" />
          <stop offset="50%" stopColor="#4A4A4A" />
          <stop offset="100%" stopColor="#2C2C2C" />
        </linearGradient>
        <filter id="dryerShadow">
          <feDropShadow dx="3" dy="5" stdDeviation="3" floodOpacity="0.25"/>
        </filter>
      </defs>
      
      {/* Main body */}
      <ellipse cx="45" cy="28" rx="22" ry="16" fill="url(#pinkShine)" filter="url(#dryerShadow)"/>
      
      {/* Body highlight */}
      <ellipse cx="40" cy="22" rx="12" ry="6" fill="#FFB6C1" opacity="0.5"/>
      
      {/* Nozzle */}
      <rect x="2" y="22" width="22" height="12" rx="2" fill="url(#nozzleGradient)" filter="url(#dryerShadow)"/>
      <rect x="4" y="24" width="4" height="8" rx="1" fill="#5A5A5A"/>
      
      {/* Air vent lines */}
      <motion.g
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <line x1="6" y1="26" x2="1" y2="26" stroke="#87CEEB" strokeWidth="1.5" opacity="0.6"/>
        <line x1="6" y1="28" x2="-1" y2="28" stroke="#87CEEB" strokeWidth="2" opacity="0.8"/>
        <line x1="6" y1="30" x2="1" y2="30" stroke="#87CEEB" strokeWidth="1.5" opacity="0.6"/>
      </motion.g>
      
      {/* Handle */}
      <path d="M50 38 Q55 50 50 58 L42 58 Q47 50 42 38 Z" fill="url(#pinkGradient)" filter="url(#dryerShadow)"/>
      
      {/* Handle highlight */}
      <path d="M48 40 Q50 48 48 54" stroke="#FFB6C1" strokeWidth="2" fill="none" opacity="0.6"/>
      
      {/* Button */}
      <circle cx="52" cy="28" r="3" fill="#C71585"/>
      <circle cx="51" cy="27" r="1" fill="#FFB6C1" opacity="0.7"/>
    </svg>
  </motion.div>
);

// CSS-based 3D Comb Component
const Comb3D = ({ scale }: { scale: number }) => (
  <motion.div 
    className="relative"
    style={{ scale }}
    animate={{ rotate: [-12, 5, -12], y: [0, -8, 0] }}
    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
  >
    <svg viewBox="0 0 64 40" className="w-14 h-10 sm:w-18 sm:h-12 md:w-20 md:h-14 drop-shadow-xl">
      <defs>
        <linearGradient id="roseGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F4C2C2" />
          <stop offset="50%" stopColor="#E8B4B8" />
          <stop offset="100%" stopColor="#C9A0A0" />
        </linearGradient>
        <linearGradient id="roseGoldShine" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFE4E1" />
          <stop offset="40%" stopColor="#F4C2C2" />
          <stop offset="100%" stopColor="#BC8F8F" />
        </linearGradient>
        <filter id="combShadow">
          <feDropShadow dx="2" dy="3" stdDeviation="2" floodOpacity="0.2"/>
        </filter>
      </defs>
      
      {/* Comb spine */}
      <rect x="4" y="4" width="56" height="8" rx="3" fill="url(#roseGoldShine)" filter="url(#combShadow)"/>
      
      {/* Spine highlight */}
      <rect x="8" y="5" width="48" height="3" rx="1.5" fill="#FFE4E1" opacity="0.6"/>
      
      {/* Teeth */}
      {[...Array(12)].map((_, i) => (
        <motion.rect
          key={i}
          x={8 + i * 4}
          y="11"
          width="2.5"
          height="20"
          rx="1"
          fill="url(#roseGoldGradient)"
          filter="url(#combShadow)"
          animate={{ scaleY: [1, 0.95, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.05 }}
          style={{ transformOrigin: 'center top' }}
        />
      ))}
    </svg>
  </motion.div>
);

// CSS-based 3D Nail Polish Component
const NailPolish3D = ({ scale }: { scale: number }) => (
  <motion.div 
    className="relative"
    style={{ scale }}
    animate={{ rotate: [-5, 10, -5], y: [0, -6, 0] }}
    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
  >
    <svg viewBox="0 0 32 56" className="w-8 h-14 sm:w-10 sm:h-18 md:w-12 md:h-20 drop-shadow-xl">
      <defs>
        <linearGradient id="polishGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B9D" />
          <stop offset="50%" stopColor="#C44569" />
          <stop offset="100%" stopColor="#8B1A4A" />
        </linearGradient>
        <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
        </linearGradient>
        <linearGradient id="capGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2C2C2C" />
          <stop offset="50%" stopColor="#1A1A1A" />
          <stop offset="100%" stopColor="#0D0D0D" />
        </linearGradient>
        <filter id="polishShadow">
          <feDropShadow dx="2" dy="4" stdDeviation="2" floodOpacity="0.3"/>
        </filter>
      </defs>
      
      {/* Bottle */}
      <path d="M6 22 Q4 24 4 28 L4 48 Q4 52 8 52 L24 52 Q28 52 28 48 L28 28 Q28 24 26 22 Z" 
            fill="url(#polishGradient)" 
            filter="url(#polishShadow)"/>
      
      {/* Glass reflection */}
      <path d="M8 26 Q7 28 7 32 L7 46 Q7 48 9 48" 
            stroke="url(#glassGradient)" 
            strokeWidth="3" 
            fill="none" 
            opacity="0.7"/>
      
      {/* Neck */}
      <rect x="11" y="14" width="10" height="10" fill="url(#polishGradient)"/>
      
      {/* Cap */}
      <rect x="9" y="4" width="14" height="12" rx="2" fill="url(#capGradient)" filter="url(#polishShadow)"/>
      
      {/* Cap highlight */}
      <rect x="11" y="5" width="4" height="8" rx="1" fill="#4A4A4A" opacity="0.5"/>
      
      {/* Liquid shine */}
      <motion.ellipse 
        cx="16" cy="38" rx="8" ry="4" 
        fill="#FF8FB3" 
        opacity="0.4"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  </motion.div>
);

interface SalonItemWrapperProps {
  children: React.ReactNode;
  initialX: number;
  initialY: number;
  delay: number;
}

const SalonItemWrapper = ({ children, initialX, initialY, delay }: SalonItemWrapperProps) => {
  const [itemScale, setItemScale] = useState(1);

  return (
    <motion.div
      className="absolute cursor-grab active:cursor-grabbing touch-none"
      style={{ left: initialX, top: initialY }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: itemScale }}
      transition={{ delay, duration: 0.5, type: 'spring' }}
      drag
      dragConstraints={{ left: -80, right: 80, top: -80, bottom: 80 }}
      dragElastic={0.15}
      whileHover={{ scale: itemScale * 1.15 }}
      whileTap={{ scale: itemScale * 0.9 }}
      onDoubleClick={() => setItemScale(s => Math.min(s + 0.3, 2.5))}
      onContextMenu={(e) => {
        e.preventDefault();
        setItemScale(s => Math.max(s - 0.3, 0.4));
      }}
    >
      {children}
      
      {/* Glow effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-radial from-white/30 to-transparent rounded-full blur-xl scale-150" />
    </motion.div>
  );
};

export const FloatingSalonIcons = () => {
  const { scrollY } = useScroll();
  
  const x = useTransform(scrollY, [0, 500, 1000, 1500], [0, 25, -15, 10]);
  const y = useTransform(scrollY, [0, 500, 1000, 1500], [0, 15, -10, 20]);
  const opacity = useTransform(scrollY, [0, 200, 800, 1200], [1, 1, 0.85, 0.7]);

  return (
    <motion.div
      className="fixed top-28 left-2 z-30 sm:left-4 md:left-8"
      style={{ x, y, opacity }}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {/* Container for salon items */}
      <div className="relative w-44 h-36 sm:w-56 sm:h-44 md:w-72 md:h-52">
        
        <SalonItemWrapper initialX={0} initialY={30} delay={0.5}>
          <Scissors3D scale={1} />
        </SalonItemWrapper>
        
        <SalonItemWrapper initialX={60} initialY={0} delay={0.7}>
          <HairDryer3D scale={1} />
        </SalonItemWrapper>
        
        <SalonItemWrapper initialX={50} initialY={70} delay={0.9}>
          <Comb3D scale={1} />
        </SalonItemWrapper>
        
        <SalonItemWrapper initialX={120} initialY={45} delay={1.1}>
          <NailPolish3D scale={1} />
        </SalonItemWrapper>
        
        {/* Floating particles */}
        <motion.div
          className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-yellow-400"
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-8 left-1/3 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-pink-400 to-rose-500"
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        />
      </div>

      {/* Mobile hint */}
      <motion.p
        className="absolute -bottom-5 left-0 text-[9px] text-muted-foreground/50 sm:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0] }}
        transition={{ duration: 4, delay: 3, repeat: 1 }}
      >
        Double-tap: zoom in • Long-press: zoom out
      </motion.p>
    </motion.div>
  );
};

export default FloatingSalonIcons;
