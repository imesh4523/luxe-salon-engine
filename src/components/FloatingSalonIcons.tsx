import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';

// Full Professional Scissors CSS Component
const Scissors3D = ({ scale }: { scale: number }) => (
  <motion.div 
    className="relative"
    style={{ scale }}
  >
    <svg viewBox="0 0 100 60" className="w-20 h-12 sm:w-24 sm:h-14 md:w-28 md:h-16 drop-shadow-2xl">
      <defs>
        <linearGradient id="goldBlade" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE55C" />
          <stop offset="25%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFC125" />
          <stop offset="75%" stopColor="#DAA520" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        <linearGradient id="goldHandle" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFE55C" />
          <stop offset="30%" stopColor="#FFD700" />
          <stop offset="70%" stopColor="#DAA520" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        <linearGradient id="bladeShine" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFACD" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <filter id="metalShadow">
          <feDropShadow dx="2" dy="3" stdDeviation="2" floodOpacity="0.35"/>
        </filter>
        <filter id="innerGlow">
          <feGaussianBlur stdDeviation="1" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>
      
      {/* Bottom Blade */}
      <motion.g
        animate={{ rotate: [0, 8, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '55px 32px' }}
      >
        {/* Blade body */}
        <path 
          d="M8 28 L50 26 Q55 26 56 30 L56 34 Q55 38 50 38 L8 36 Q4 34 4 32 Q4 30 8 28 Z" 
          fill="url(#goldBlade)" 
          filter="url(#metalShadow)"
        />
        {/* Blade edge highlight */}
        <path 
          d="M10 29 L48 27.5" 
          stroke="url(#bladeShine)" 
          strokeWidth="2" 
          strokeLinecap="round"
          opacity="0.7"
        />
        {/* Blade teeth (thinning scissors style) */}
        <g opacity="0.8">
          {[...Array(8)].map((_, i) => (
            <rect key={i} x={12 + i * 4} y="34" width="1.5" height="3" rx="0.5" fill="#B8860B"/>
          ))}
        </g>
        {/* Handle ring */}
        <ellipse cx="70" cy="44" rx="14" ry="11" fill="none" stroke="url(#goldHandle)" strokeWidth="5" filter="url(#metalShadow)"/>
        <ellipse cx="70" cy="44" rx="9" ry="6" fill="none" stroke="#FFE55C" strokeWidth="1" opacity="0.5"/>
        {/* Handle connector */}
        <path d="M56 32 Q60 38 62 44 Q58 40 56 36 Z" fill="url(#goldHandle)"/>
      </motion.g>
      
      {/* Top Blade */}
      <motion.g
        animate={{ rotate: [0, -8, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '55px 28px' }}
      >
        {/* Blade body */}
        <path 
          d="M8 24 L50 22 Q55 22 56 26 L56 30 Q55 34 50 34 L8 32 Q4 30 4 28 Q4 26 8 24 Z" 
          fill="url(#goldBlade)" 
          filter="url(#metalShadow)"
        />
        {/* Blade shine */}
        <path 
          d="M10 25 L48 23.5" 
          stroke="url(#bladeShine)" 
          strokeWidth="2.5" 
          strokeLinecap="round"
          opacity="0.8"
        />
        {/* Sharp edge */}
        <path d="M4 28 L50 22" stroke="#FFFACD" strokeWidth="0.5" opacity="0.6"/>
        {/* Handle ring */}
        <ellipse cx="70" cy="14" rx="14" ry="11" fill="none" stroke="url(#goldHandle)" strokeWidth="5" filter="url(#metalShadow)"/>
        <ellipse cx="70" cy="14" rx="9" ry="6" fill="none" stroke="#FFE55C" strokeWidth="1" opacity="0.5"/>
        {/* Handle connector */}
        <path d="M56 28 Q60 22 62 14 Q58 20 56 24 Z" fill="url(#goldHandle)"/>
        {/* Finger rest */}
        <path d="M76 8 Q82 4 86 8 Q84 12 78 10 Z" fill="url(#goldHandle)" filter="url(#metalShadow)"/>
      </motion.g>
      
      {/* Center screw/pivot */}
      <circle cx="55" cy="30" r="5" fill="url(#goldHandle)" stroke="#B8860B" strokeWidth="1" filter="url(#metalShadow)"/>
      <circle cx="55" cy="30" r="3" fill="#DAA520"/>
      <circle cx="54" cy="29" r="1.5" fill="#FFE55C" opacity="0.9"/>
      <circle cx="55" cy="30" r="1" fill="#B8860B"/>
    </svg>
  </motion.div>
);

// CSS-based 3D Hair Dryer Component
const HairDryer3D = ({ scale }: { scale: number }) => (
  <motion.div 
    className="relative"
    style={{ scale }}
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
      
      <ellipse cx="45" cy="28" rx="22" ry="16" fill="url(#pinkShine)" filter="url(#dryerShadow)"/>
      <ellipse cx="40" cy="22" rx="12" ry="6" fill="#FFB6C1" opacity="0.5"/>
      <rect x="2" y="22" width="22" height="12" rx="2" fill="url(#nozzleGradient)" filter="url(#dryerShadow)"/>
      <rect x="4" y="24" width="4" height="8" rx="1" fill="#5A5A5A"/>
      
      <motion.g animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 0.5, repeat: Infinity }}>
        <line x1="6" y1="26" x2="1" y2="26" stroke="#87CEEB" strokeWidth="1.5" opacity="0.6"/>
        <line x1="6" y1="28" x2="-1" y2="28" stroke="#87CEEB" strokeWidth="2" opacity="0.8"/>
        <line x1="6" y1="30" x2="1" y2="30" stroke="#87CEEB" strokeWidth="1.5" opacity="0.6"/>
      </motion.g>
      
      <path d="M50 38 Q55 50 50 58 L42 58 Q47 50 42 38 Z" fill="url(#pinkGradient)" filter="url(#dryerShadow)"/>
      <path d="M48 40 Q50 48 48 54" stroke="#FFB6C1" strokeWidth="2" fill="none" opacity="0.6"/>
      <circle cx="52" cy="28" r="3" fill="#C71585"/>
      <circle cx="51" cy="27" r="1" fill="#FFB6C1" opacity="0.7"/>
    </svg>
  </motion.div>
);

// CSS-based 3D Comb Component
const Comb3D = ({ scale }: { scale: number }) => (
  <motion.div className="relative" style={{ scale }}>
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
      
      <rect x="4" y="4" width="56" height="8" rx="3" fill="url(#roseGoldShine)" filter="url(#combShadow)"/>
      <rect x="8" y="5" width="48" height="3" rx="1.5" fill="#FFE4E1" opacity="0.6"/>
      
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
  <motion.div className="relative" style={{ scale }}>
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
      
      <path d="M6 22 Q4 24 4 28 L4 48 Q4 52 8 52 L24 52 Q28 52 28 48 L28 28 Q28 24 26 22 Z" fill="url(#polishGradient)" filter="url(#polishShadow)"/>
      <path d="M8 26 Q7 28 7 32 L7 46 Q7 48 9 48" stroke="url(#glassGradient)" strokeWidth="3" fill="none" opacity="0.7"/>
      <rect x="11" y="14" width="10" height="10" fill="url(#polishGradient)"/>
      <rect x="9" y="4" width="14" height="12" rx="2" fill="url(#capGradient)" filter="url(#polishShadow)"/>
      <rect x="11" y="5" width="4" height="8" rx="1" fill="#4A4A4A" opacity="0.5"/>
      <motion.ellipse cx="16" cy="38" rx="8" ry="4" fill="#FF8FB3" opacity="0.4" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity }}/>
    </svg>
  </motion.div>
);

interface FloatingItemProps {
  children: React.ReactNode;
  scrollY: any;
  xRange: number[];
  yRange: number[];
  rotateRange: number[];
  initialPos: { x: number; y: number };
  delay: number;
}

const FloatingItem = ({ children, scrollY, xRange, yRange, rotateRange, initialPos, delay }: FloatingItemProps) => {
  const [itemScale, setItemScale] = useState(1);
  
  // Random scroll-based movement
  const x = useTransform(scrollY, [0, 400, 800, 1200, 1600, 2000], xRange);
  const y = useTransform(scrollY, [0, 400, 800, 1200, 1600, 2000], yRange);
  const rotate = useTransform(scrollY, [0, 500, 1000, 1500, 2000], rotateRange);

  return (
    <motion.div
      className="absolute cursor-grab active:cursor-grabbing touch-none"
      style={{ 
        left: initialPos.x, 
        top: initialPos.y,
        x,
        y,
        rotate,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: itemScale,
      }}
      transition={{ delay, duration: 0.6, type: 'spring', stiffness: 150 }}
      drag
      dragConstraints={{ left: -120, right: 120, top: -120, bottom: 120 }}
      dragElastic={0.12}
      whileHover={{ scale: itemScale * 1.15 }}
      whileTap={{ scale: itemScale * 0.9 }}
      onDoubleClick={() => setItemScale(s => Math.min(s + 0.25, 2.2))}
      onContextMenu={(e) => {
        e.preventDefault();
        setItemScale(s => Math.max(s - 0.25, 0.5));
      }}
    >
      {/* Floating animation */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.5 }}
      >
        {children}
      </motion.div>
      
      {/* Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-radial from-white/20 to-transparent rounded-full blur-xl scale-150" />
    </motion.div>
  );
};

export const FloatingSalonIcons = () => {
  const { scrollY } = useScroll();

  // Each item has unique random movement patterns
  const items = [
    {
      component: <Scissors3D scale={1} />,
      initialPos: { x: 5, y: 40 },
      xRange: [0, 60, -30, 80, -20, 40],      // Random left-right
      yRange: [0, -25, 15, -40, 30, -10],     // Random up-down
      rotateRange: [0, 15, -10, 20, -15],
      delay: 0.5,
    },
    {
      component: <HairDryer3D scale={1} />,
      initialPos: { x: 90, y: 5 },
      xRange: [0, -40, 50, -60, 30, -20],     // Different pattern
      yRange: [0, 20, -30, 10, -20, 35],
      rotateRange: [0, -12, 8, -18, 12],
      delay: 0.7,
    },
    {
      component: <Comb3D scale={1} />,
      initialPos: { x: 40, y: 85 },
      xRange: [0, 45, -55, 35, -45, 25],
      yRange: [0, -35, 25, -15, 40, -25],
      rotateRange: [-15, 10, -20, 15, -8],
      delay: 0.9,
    },
    {
      component: <NailPolish3D scale={1} />,
      initialPos: { x: 150, y: 55 },
      xRange: [0, -50, 40, -70, 55, -35],
      yRange: [0, 30, -20, 45, -35, 20],
      rotateRange: [5, -15, 12, -8, 18],
      delay: 1.1,
    },
  ];

  return (
    <motion.div
      className="fixed top-24 left-1 z-30 sm:left-3 md:left-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Container */}
      <div className="relative w-48 h-40 sm:w-60 sm:h-48 md:w-72 md:h-56">
        {items.map((item, index) => (
          <FloatingItem
            key={index}
            scrollY={scrollY}
            xRange={item.xRange}
            yRange={item.yRange}
            rotateRange={item.rotateRange}
            initialPos={item.initialPos}
            delay={item.delay}
          >
            {item.component}
          </FloatingItem>
        ))}
        
        {/* Sparkle particles */}
        <motion.div
          className="absolute top-0 right-4 w-2 h-2 rounded-full bg-gradient-to-br from-amber-300 to-yellow-400"
          animate={{ y: [0, -25, 0], opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-10 left-1/4 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-pink-400 to-rose-500"
          animate={{ y: [0, -18, 0], x: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        />
        <motion.div
          className="absolute top-1/2 right-0 w-1 h-1 rounded-full bg-gradient-to-br from-violet-400 to-purple-500"
          animate={{ y: [0, -12, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        />
      </div>
    </motion.div>
  );
};

export default FloatingSalonIcons;
