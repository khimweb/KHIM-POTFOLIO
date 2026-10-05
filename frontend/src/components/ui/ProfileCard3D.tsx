import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Briefcase, Swords, RotateCw, Sparkles, Flame } from 'lucide-react';

interface Ripple {
  id: number;
  x: number;
  y: number;
  color: string;
}

export const ProfileCard3D: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isNinjaFace, setIsNinjaFace] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  // 3D Motion Values
  const baseRotationY = useMotionValue(0);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  // Springs for buttery smooth physics
  const springConfig = { damping: 22, stiffness: 220, mass: 0.6 };
  const smoothBaseRotY = useSpring(baseRotationY, { damping: 20, stiffness: 140, mass: 0.7 });
  const smoothTiltX = useSpring(tiltX, springConfig);
  const smoothTiltY = useSpring(tiltY, springConfig);

  // Total 3D transformation values
  const rotateX = useTransform(smoothTiltY, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(
    [smoothBaseRotY, smoothTiltX],
    ([base, tilt]: number[]) => base + tilt * 24
  );

  // Trigger tactile glowing ripple
  const triggerRipple = (e: React.MouseEvent<HTMLElement>, color = '#00D4FF') => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();

    setRipples((prev) => [...prev.slice(-3), { id, x, y, color }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 700);
  };

  // Perform full 360-degree power spin
  const handleSpin360 = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    triggerRipple(e, isNinjaFace ? '#EF4444' : '#00D4FF');
    baseRotationY.set(baseRotationY.get() + 360);
  };

  // Flip between Engineer and Ninja face (180 deg)
  const handleFlip180 = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const newTarget = baseRotationY.get() + 180;
    triggerRipple(e, !isNinjaFace ? '#EF4444' : '#00D4FF');
    baseRotationY.set(newTarget);
    setIsNinjaFace((prev) => !prev);
  };

  // Mouse tilt tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

    tiltX.set(mouseX);
    tiltY.set(mouseY);

    setGlarePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  // Drag to rotate horizontally in 3D 360 degrees
  const dragStartXRef = useRef(0);
  const dragBaseRotRef = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    dragBaseRotRef.current = baseRotationY.get();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartXRef.current;
    baseRotationY.set(dragBaseRotRef.current + deltaX * 0.9);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Snap to nearest 180 degrees for clean display, or free float
    const current = baseRotationY.get();
    const normalized = Math.round(current / 180) * 180;
    baseRotationY.set(normalized);
    const mod = Math.abs(normalized / 180) % 2;
    setIsNinjaFace(mod === 1);
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md perspective-[1200px] select-none relative group" ref={cardRef}>
      {/* 3D Floating Action Pill Bar above card */}
      <div className="flex items-center justify-between gap-2 mb-3 px-1">
        <motion.button
          onClick={handleFlip180}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 border shadow-md cursor-pointer ${
            isNinjaFace
              ? 'bg-red-950/70 border-red-500/60 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.4)]'
              : 'glass-purple border-primary/40 text-cyan-300 shadow-[0_0_15px_rgba(0,212,255,0.3)]'
          }`}
        >
          {isNinjaFace ? <Swords size={13} className="text-red-400" /> : <Briefcase size={13} className="text-primary" />}
          <span>{isNinjaFace ? 'Ninja Persona' : 'Engineer Persona'}</span>
        </motion.button>

        <motion.button
          onClick={handleSpin360}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          title="Click to perform full 360° spin"
          className="px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 glass border border-white/20 text-white hover:border-primary/50 hover:text-primary transition-all shadow-md cursor-pointer"
        >
          <RotateCw size={13} className="group-hover:rotate-180 transition-transform duration-500" />
          <span>360° Spin</span>
        </motion.button>
      </div>

      {/* Main 3D Card Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={(e) => {
          if (!isDragging) handleSpin360(e);
        }}
        className={`relative w-full aspect-[3/4.2] rounded-3xl p-3 border transition-all duration-300 cursor-grab active:cursor-grabbing ${
          isNinjaFace
            ? 'border-red-500/60 bg-red-950/20 shadow-[0_0_60px_rgba(239,68,68,0.55),0_0_20px_rgba(220,38,38,0.3)_inset]'
            : 'border-primary/40 bg-purple-950/20 shadow-[0_0_55px_rgba(0,212,255,0.35),0_0_20px_rgba(168,85,247,0.2)_inset]'
        } backdrop-blur-xl`}
      >
        {/* 3D Depth Inner Frame */}
        <div
          className="w-full h-full rounded-2xl relative overflow-hidden bg-dark border border-white/10 flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* ══════════════════════════════════════════
              SIDE 1: Professional Engineer Face (0 deg)
          ══════════════════════════════════════════ */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <img
              src="/images/sokkhim.jpg"
              alt="Phorn Sokkhim - Software Engineer"
              className="w-full h-full object-cover object-top filter brightness-105 contrast-105"
            />

            {/* Gradient Dark Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />

            {/* Top Indicator Badge */}
            <div
              className="absolute top-3.5 inset-x-3.5 flex justify-between items-center z-20 pointer-events-none"
              style={{ transform: 'translateZ(24px)' }}
            >
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-cyan-300 border border-primary/40 flex items-center gap-1.5 shadow-sm">
                <Sparkles size={11} className="text-primary animate-pulse" />
                <span>Software Engineer</span>
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_#00D4FF] animate-ping" />
            </div>

            {/* Bottom 3D Popout Identity Badge */}
            <div
              className="absolute bottom-4 inset-x-4 z-20 p-4 rounded-2xl glass-purple border border-primary/40 backdrop-blur-xl shadow-[0_0_25px_rgba(0,212,255,0.35)]"
              style={{ transform: 'translateZ(35px)' }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-bold font-space text-base tracking-wide">
                      Phorn Sokkhim
                    </h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-primary border border-primary/40 uppercase tracking-wider">
                      Year 3 S2
                    </span>
                  </div>
                  <p className="text-xs text-primary font-medium mt-0.5">
                    BELTEI International University
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/50 text-primary flex items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.5)]">
                  <Briefcase size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════
              SIDE 2: Red & Black Cyber Ninja Face (180 deg)
          ══════════════════════════════════════════ */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <img
              src="/images/ninja.jpg"
              alt="Red & Black Cyber Ninja Mode"
              className="w-full h-full object-cover object-center filter brightness-110 contrast-125"
            />

            {/* Red Cyber Scanline Grid */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen"
              style={{
                background: 'repeating-linear-gradient(0deg, rgba(255,0,0,0.2) 0px, transparent 2px, transparent 4px)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-red-950/30 to-transparent" />

            {/* Top Indicator Badge */}
            <div
              className="absolute top-3.5 inset-x-3.5 flex justify-between items-center z-20 pointer-events-none"
              style={{ transform: 'translateZ(24px)' }}
            >
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-950/90 text-white border border-red-500/70 flex items-center gap-1.5 shadow-[0_0_15px_rgba(239,68,68,0.7)]">
                <Flame size={12} className="text-red-400 animate-bounce" />
                <span>Red &amp; Black Ninja</span>
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_#EF4444] animate-ping" />
            </div>

            {/* Bottom 3D Popout Identity Badge */}
            <div
              className="absolute bottom-4 inset-x-4 z-20 p-4 rounded-2xl bg-red-950/80 border border-red-500/60 backdrop-blur-xl shadow-[0_0_30px_rgba(239,68,68,0.5)]"
              style={{ transform: 'translateZ(35px)' }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-bold font-space text-base tracking-wide">
                      SHADOW CODER
                    </h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white uppercase tracking-wider animate-pulse">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-red-400 font-medium mt-0.5">
                    Full-Stack Blade · 0.2s Execution
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-red-600/30 border border-red-500 text-red-400 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.8)]">
                  <Swords size={17} className="animate-bounce" />
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Specular Glare (3D light sheen) */}
          <div
            className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.opacity}) 0%, transparent 60%)`,
            }}
          />

          {/* Drag instruction overlay hint */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ transform: 'translateZ(30px)' }}
          >
            <span className="px-3 py-1.5 rounded-full text-[11px] font-bold text-white bg-black/75 backdrop-blur-md border border-white/20 shadow-xl whitespace-nowrap flex items-center gap-1.5">
              <RotateCw size={12} className="animate-spin text-primary" />
              <span>Click or Drag to Rotate 360°</span>
            </span>
          </div>
        </div>
      </motion.div>

      {/* Click Shockwave Ripples */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.9 }}
          animate={{ scale: 4.5, opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed rounded-full pointer-events-none blur-sm -z-10"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 24,
            height: 24,
            background: `radial-gradient(circle, ${ripple.color} 0%, rgba(168,85,247,0.4) 60%, transparent 100%)`,
          }}
        />
      ))}
    </div>
  );
};

