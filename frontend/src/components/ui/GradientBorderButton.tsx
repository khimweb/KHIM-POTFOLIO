import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export interface GradientBorderButtonProps {
  children?: React.ReactNode;
  label?: string;
  isActive?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  layoutId?: string;
  color?: string;
  secondaryColor?: string;
  count?: number;
  className?: string;
  icon?: React.ReactNode;
}

export const GradientBorderButton: React.FC<GradientBorderButtonProps> = ({
  children,
  label,
  isActive = false,
  onClick,
  layoutId,
  color = '#00D4FF',
  secondaryColor = '#A855F7',
  count,
  className = '',
  icon,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();

    setRipples((prev) => [...prev.slice(-2), { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 650);

    onClick(e);
  };

  return (
    <motion.button
      type="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 420, damping: 26 }}
      className={`relative group rounded-full p-[1.5px] cursor-pointer select-none focus:outline-none transition-shadow duration-300 ${className}`}
      style={{
        boxShadow: isHovered
          ? `0 0 24px ${color}55, 0 4px 18px rgba(0, 0, 0, 0.6)`
          : isActive
          ? `0 0 20px ${color}40, 0 4px 14px rgba(0, 0, 0, 0.5)`
          : '0 2px 10px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* ── 1. Default Glass Resting Border ── */}
      <div
        className="absolute inset-0 rounded-full border border-white/10 pointer-events-none transition-opacity duration-300"
        style={{ opacity: isHovered || isActive ? 0 : 1 }}
      />

      {/* ── 2. Active Pill Gliding Background (via Framer Motion layoutId) ── */}
      {isActive && layoutId && (
        <motion.div
          layoutId={layoutId}
          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 via-secondary/35 to-primary/30 border border-primary/70 shadow-[0_0_22px_rgba(0,212,255,0.5),inset_0_0_12px_rgba(0,212,255,0.25)] pointer-events-none -z-0"
        >
          {/* Glowing bottom hairline */}
          <div className="absolute inset-x-3 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_8px_#00D4FF]" />
        </motion.div>
      )}

      {/* ── 3. Converging Animated Gradient Border (Left & Right -> Full Center) ── */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none z-10">
        {/* TOP: Left beam shoots toward center */}
        <motion.div
          initial={{ width: '0%', opacity: 0 }}
          animate={
            isHovered
              ? { width: '50.5%', opacity: 1 }
              : { width: '0%', opacity: 0 }
          }
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-0 h-[2px] rounded-l-full"
          style={{
            background: `linear-gradient(90deg, ${color} 0%, #ffffff 85%, ${color} 100%)`,
            boxShadow: `0 0 10px ${color}`,
          }}
        />

        {/* TOP: Right beam shoots toward center */}
        <motion.div
          initial={{ width: '0%', opacity: 0 }}
          animate={
            isHovered
              ? { width: '50.5%', opacity: 1 }
              : { width: '0%', opacity: 0 }
          }
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 right-0 h-[2px] rounded-r-full"
          style={{
            background: `linear-gradient(270deg, ${secondaryColor} 0%, #ffffff 85%, ${secondaryColor} 100%)`,
            boxShadow: `0 0 10px ${secondaryColor}`,
          }}
        />

        {/* BOTTOM: Left beam shoots toward center */}
        <motion.div
          initial={{ width: '0%', opacity: 0 }}
          animate={
            isHovered
              ? { width: '50.5%', opacity: 1 }
              : { width: '0%', opacity: 0 }
          }
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 h-[2px] rounded-l-full"
          style={{
            background: `linear-gradient(90deg, ${color} 0%, #ffffff 85%, ${color} 100%)`,
            boxShadow: `0 0 10px ${color}`,
          }}
        />

        {/* BOTTOM: Right beam shoots toward center */}
        <motion.div
          initial={{ width: '0%', opacity: 0 }}
          animate={
            isHovered
              ? { width: '50.5%', opacity: 1 }
              : { width: '0%', opacity: 0 }
          }
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 right-0 h-[2px] rounded-r-full"
          style={{
            background: `linear-gradient(270deg, ${secondaryColor} 0%, #ffffff 85%, ${secondaryColor} 100%)`,
            boxShadow: `0 0 10px ${secondaryColor}`,
          }}
        />

        {/* LEFT VERTICAL CAP */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={
            isHovered
              ? { scaleY: 1, opacity: 1 }
              : { scaleY: 0, opacity: 0 }
          }
          transition={{ duration: 0.32, ease: 'easeOut' }}
          className="absolute inset-y-0 left-0 w-[2px] rounded-full"
          style={{
            originY: 0.5,
            background: `linear-gradient(180deg, ${color}, ${secondaryColor})`,
            boxShadow: `0 0 8px ${color}`,
          }}
        />

        {/* RIGHT VERTICAL CAP */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={
            isHovered
              ? { scaleY: 1, opacity: 1 }
              : { scaleY: 0, opacity: 0 }
          }
          transition={{ duration: 0.32, ease: 'easeOut' }}
          className="absolute inset-y-0 right-0 w-[2px] rounded-full"
          style={{
            originY: 0.5,
            background: `linear-gradient(180deg, ${secondaryColor}, ${color})`,
            boxShadow: `0 0 8px ${secondaryColor}`,
          }}
        />

        {/* FULL PERIMETER GRADIENT: Locks in when beams collide */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: isHovered ? 0.2 : 0, ease: 'easeOut' }}
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${color} 0%, ${secondaryColor} 50%, ${color} 100%)`,
          }}
        />

        {/* TOP CENTER FLARE */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isHovered
              ? { scale: [0, 1.4, 1], opacity: [0, 1, 0.85] }
              : { scale: 0, opacity: 0 }
          }
          transition={{ duration: 0.38, delay: isHovered ? 0.18 : 0, ease: 'easeOut' }}
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-2.5 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, #ffffff 0%, ${color} 60%, transparent 100%)`,
            filter: 'blur(1.5px)',
          }}
        />

        {/* BOTTOM CENTER FLARE */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isHovered
              ? { scale: [0, 1.4, 1], opacity: [0, 1, 0.85] }
              : { scale: 0, opacity: 0 }
          }
          transition={{ duration: 0.38, delay: isHovered ? 0.18 : 0, ease: 'easeOut' }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-2.5 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, #ffffff 0%, ${secondaryColor} 60%, transparent 100%)`,
            filter: 'blur(1.5px)',
          }}
        />
      </div>

      {/* ── 4. Inner Pill Body ── */}
      <div
        className={`relative z-10 w-full h-full rounded-full px-5 py-2 flex items-center justify-center gap-2 overflow-hidden transition-all duration-300 ${
          isActive
            ? 'bg-transparent text-white font-semibold'
            : 'bg-[#0d091a]/90 text-gray-300 group-hover:text-white group-hover:bg-[#120d24]/90'
        }`}
      >
        {/* Active glowing micro-indicator */}
        {isActive && (
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#00D4FF]"
            animate={{ scale: [1, 1.35, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        {icon && <span className="relative z-10">{icon}</span>}

        <span className="relative z-10 text-sm tracking-wide whitespace-nowrap">
          {label || children}
        </span>

        {count !== undefined && (
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full transition-colors ${
              isActive
                ? 'bg-primary/30 text-cyan-200 font-bold border border-primary/40'
                : 'bg-white/10 text-gray-400 group-hover:text-white'
            }`}
          >
            {count}
          </span>
        )}

        {/* ── 5. Click Shockwave Ripples ── */}
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.85 }}
            animate={{ scale: 4.5, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute rounded-full pointer-events-none -z-10"
            style={{
              left: ripple.x - 12,
              top: ripple.y - 12,
              width: 24,
              height: 24,
              background: `radial-gradient(circle, ${color} 0%, ${secondaryColor} 60%, transparent 100%)`,
            }}
          />
        ))}
      </div>
    </motion.button>
  );
};
