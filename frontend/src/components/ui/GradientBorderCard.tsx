import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface GradientBorderCardProps {
  children: React.ReactNode;
  color?: string;
  secondaryColor?: string;
  className?: string;
}

export const GradientBorderCard: React.FC<GradientBorderCardProps> = ({
  children,
  color = '#00D4FF',
  secondaryColor = '#A855F7',
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-2xl p-[2px] transition-all duration-500 group ${className}`}
      style={{
        boxShadow: isHovered
          ? `0 0 35px ${color}45, 0 15px 40px rgba(0, 0, 0, 0.7)`
          : '0 10px 30px rgba(0, 0, 0, 0.45)',
      }}
    >
      {/* ── 1. Default Resting Glass Border ── */}
      <div
        className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none transition-opacity duration-300"
        style={{ opacity: isHovered ? 0 : 1 }}
      />

      {/* ── 2. Animated Gradient Border Layer (Left & Right -> Full Center) ── */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-10">
        
        {/* TOP BORDER: Left beam shoots toward center */}
        <motion.div
          initial={{ width: '0%', opacity: 0 }}
          animate={
            isHovered
              ? { width: '50.5%', opacity: 1 }
              : { width: '0%', opacity: 0 }
          }
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-0 h-[2.5px] rounded-l-full"
          style={{
            background: `linear-gradient(90deg, ${color} 0%, #ffffff 85%, ${color} 100%)`,
            boxShadow: `0 0 12px ${color}`,
          }}
        />

        {/* TOP BORDER: Right beam shoots toward center */}
        <motion.div
          initial={{ width: '0%', opacity: 0 }}
          animate={
            isHovered
              ? { width: '50.5%', opacity: 1 }
              : { width: '0%', opacity: 0 }
          }
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 right-0 h-[2.5px] rounded-r-full"
          style={{
            background: `linear-gradient(270deg, ${secondaryColor} 0%, #ffffff 85%, ${secondaryColor} 100%)`,
            boxShadow: `0 0 12px ${secondaryColor}`,
          }}
        />

        {/* BOTTOM BORDER: Left beam shoots toward center */}
        <motion.div
          initial={{ width: '0%', opacity: 0 }}
          animate={
            isHovered
              ? { width: '50.5%', opacity: 1 }
              : { width: '0%', opacity: 0 }
          }
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 h-[2.5px] rounded-l-full"
          style={{
            background: `linear-gradient(90deg, ${color} 0%, #ffffff 85%, ${color} 100%)`,
            boxShadow: `0 0 12px ${color}`,
          }}
        />

        {/* BOTTOM BORDER: Right beam shoots toward center */}
        <motion.div
          initial={{ width: '0%', opacity: 0 }}
          animate={
            isHovered
              ? { width: '50.5%', opacity: 1 }
              : { width: '0%', opacity: 0 }
          }
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 right-0 h-[2.5px] rounded-r-full"
          style={{
            background: `linear-gradient(270deg, ${secondaryColor} 0%, #ffffff 85%, ${secondaryColor} 100%)`,
            boxShadow: `0 0 12px ${secondaryColor}`,
          }}
        />

        {/* LEFT VERTICAL BORDER */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={
            isHovered
              ? { scaleY: 1, opacity: 1 }
              : { scaleY: 0, opacity: 0 }
          }
          transition={{ duration: 0.38, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 w-[2.5px] rounded-full"
          style={{
            originY: 0.5,
            background: `linear-gradient(180deg, ${color}, ${secondaryColor})`,
            boxShadow: `0 0 12px ${color}`,
          }}
        />

        {/* RIGHT VERTICAL BORDER */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={
            isHovered
              ? { scaleY: 1, opacity: 1 }
              : { scaleY: 0, opacity: 0 }
          }
          transition={{ duration: 0.38, ease: 'easeOut' }}
          className="absolute inset-y-0 right-0 w-[2.5px] rounded-full"
          style={{
            originY: 0.5,
            background: `linear-gradient(180deg, ${secondaryColor}, ${color})`,
            boxShadow: `0 0 12px ${secondaryColor}`,
          }}
        />

        {/* FULL SEAMLESS GRADIENT PERIMETER: Locks in once beams meet in center */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: 0.35,
            delay: isHovered ? 0.25 : 0,
            ease: 'easeOut',
          }}
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${color} 0%, ${secondaryColor} 50%, ${color} 100%)`,
          }}
        />

        {/* CENTER COLLISION BLOOM / FLARES: Radiates when left & right collide in center */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isHovered
              ? { scale: [0, 1.4, 1], opacity: [0, 1, 0.85] }
              : { scale: 0, opacity: 0 }
          }
          transition={{
            duration: 0.45,
            delay: isHovered ? 0.22 : 0,
            ease: 'easeOut',
          }}
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-3 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, #ffffff 0%, ${color} 60%, transparent 100%)`,
            filter: 'blur(2px)',
          }}
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isHovered
              ? { scale: [0, 1.4, 1], opacity: [0, 1, 0.85] }
              : { scale: 0, opacity: 0 }
          }
          transition={{
            duration: 0.45,
            delay: isHovered ? 0.22 : 0,
            ease: 'easeOut',
          }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-16 h-3 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, #ffffff 0%, ${secondaryColor} 60%, transparent 100%)`,
            filter: 'blur(2px)',
          }}
        />
      </div>

      {/* ── 3. Inner Card Surface ── */}
      <div className="relative z-10 w-full h-full rounded-[14px] bg-[#0c0817]/95 backdrop-blur-xl overflow-hidden flex flex-col justify-between p-6">
        {children}
      </div>
    </div>
  );
};
