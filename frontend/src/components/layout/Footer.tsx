import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Github, Mail, Phone, Send, ArrowUp, Check } from 'lucide-react';
import { scrollToSection } from '../../hooks/useLenis';

interface Ripple {
  id: number;
  x: number;
  y: number;
  color: string;
}

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export const Footer: React.FC = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);
  const [heartCount, setHeartCount] = useState(0);

  // Trigger tactile glowing click ripple
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

  const handleCopy = (text: string, label: string, e: React.MouseEvent<HTMLElement>, color: string) => {
    triggerRipple(e, color);
    navigator.clipboard.writeText(text);
    setCopiedLabel(label);
    setTimeout(() => {
      setCopiedLabel(null);
    }, 2000);
  };

  const socialLinks = [
    {
      icon: <Github size={19} />,
      href: 'https://github.com/khimweb',
      label: 'GitHub',
      color: '#FFFFFF',
      glow: 'shadow-[0_0_20px_rgba(255,255,255,0.45)]',
      borderHover: 'hover:border-white/60 text-gray-300 hover:text-white',
      isExternal: true,
    },
    {
      icon: <Send size={19} />,
      href: 'https://t.me/phornsokkhim',
      label: 'Telegram',
      color: '#00D4FF',
      glow: 'shadow-[0_0_22px_rgba(0,212,255,0.55)]',
      borderHover: 'hover:border-primary text-gray-300 hover:text-primary',
      isExternal: true,
    },
    {
      icon: <Phone size={19} />,
      href: 'tel:0966660019',
      label: 'Phone: 096 666 0019',
      copyValue: '0966660019',
      color: '#A855F7',
      glow: 'shadow-[0_0_22px_rgba(168,85,247,0.55)]',
      borderHover: 'hover:border-secondary text-gray-300 hover:text-purple-300',
      isExternal: false,
    },
    {
      icon: <Mail size={19} />,
      href: 'mailto:sokkhim519@gmail.com',
      label: 'Email: sokkhim519@gmail.com',
      copyValue: 'sokkhim519@gmail.com',
      color: '#38BDF8',
      glow: 'shadow-[0_0_22px_rgba(56,189,248,0.55)]',
      borderHover: 'hover:border-cyan-400 text-gray-300 hover:text-cyan-300',
      isExternal: false,
    },
  ];

  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-dark/85 backdrop-blur-2xl py-14 overflow-hidden">
      {/* Top glowing ambient accent beam */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/60 to-transparent pointer-events-none" />

      {/* Subtle ambient background glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-10">
          {/* Left Column: Brand & Bio */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start max-w-md">
            {/* Interactive Logo */}
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                triggerRipple(e, '#00D4FF');
                scrollToSection('#home', 1.5);
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 group relative cursor-pointer select-none mb-3"
            >
              <div className="relative w-10 h-10 rounded-full p-[2px] overflow-hidden bg-gradient-to-tr from-primary via-secondary to-primary group-hover:shadow-[0_0_20px_rgba(0,212,255,0.6)] transition-all duration-300">
                <div className="w-full h-full rounded-full overflow-hidden bg-dark/90 p-0.5">
                  <img
                    src="/images/logo.png"
                    alt="KHIM-DEVELOPER Logo"
                    className="w-full h-full object-cover rounded-full group-hover:rotate-12 transition-transform duration-500"
                  />
                </div>
              </div>
              <span className="text-xl font-space font-extrabold tracking-tight text-white group-hover:text-primary transition-colors duration-300">
                KHIM<span className="gradient-text font-black">-DEVELOPER</span>
              </span>
            </motion.a>

            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Phorn Sokkhim · Software Engineering student at BELTEI International University (Year 3 S2). Crafting advanced 3D web systems and client digital platforms.
            </p>

            {/* Live Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for new opportunities</span>
            </div>
          </div>

          {/* Middle Column: Quick Nav Links */}
          <div className="flex flex-col items-center">
            <h4 className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-4">
              Quick Navigation
            </h4>
            <div className="flex flex-wrap justify-center gap-2 max-w-xs">
              {quickLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    triggerRipple(e, '#00D4FF');
                    scrollToSection(link.href, 1.4);
                  }}
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  className="px-3 py-1 rounded-lg text-xs font-medium text-gray-400 hover:text-white bg-white/[0.02] hover:bg-white/[0.08] border border-white/[0.06] hover:border-primary/40 transition-all duration-200 cursor-pointer shadow-sm"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Column: Social Controls & Back To Top */}
          <div className="flex flex-col items-center lg:items-end">
            <h4 className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-4">
              Connect With Me
            </h4>

            {/* 4 Social Action Buttons with Ripples and Tooltips */}
            <div className="flex items-center gap-3.5 mb-6 relative">
              {socialLinks.map((s) => (
                <div key={s.label} className="relative group">
                  <motion.a
                    href={s.href}
                    target={s.isExternal ? '_blank' : undefined}
                    rel={s.isExternal ? 'noreferrer' : undefined}
                    onClick={(e) => {
                      if (s.copyValue) {
                        e.preventDefault();
                        handleCopy(s.copyValue, s.label.split(':')[0], e, s.color);
                      } else {
                        triggerRipple(e, s.color);
                      }
                    }}
                    whileHover={{ scale: 1.15, y: -4 }}
                    whileTap={{ scale: 0.88, rotate: [0, -6, 6, 0] }}
                    transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                    aria-label={s.label}
                    className={`relative w-11 h-11 rounded-full glass border border-white/10 flex items-center justify-center transition-all duration-300 hover:${s.glow} ${s.borderHover} cursor-pointer overflow-hidden`}
                  >
                    {/* Inner glowing hover radial */}
                    <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />

                    <span className="relative z-10">{s.icon}</span>
                  </motion.a>

                  {/* Micro Tooltip */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 text-[11px] whitespace-nowrap bg-black/90 text-gray-200 px-2.5 py-0.5 rounded-md border border-white/10 shadow-lg">
                    {s.label}
                  </div>
                </div>
              ))}

              {/* Back to Top Power Button */}
              <motion.button
                onClick={(e) => {
                  triggerRipple(e, '#00D4FF');
                  scrollToSection('#home', 1.6);
                }}
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.88 }}
                transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                title="Scroll back to top"
                className="relative w-11 h-11 rounded-full p-[1.5px] overflow-hidden group focus:outline-none cursor-pointer shadow-[0_0_15px_rgba(0,212,255,0.25)] hover:shadow-[0_0_25px_rgba(0,212,255,0.65)] transition-all duration-300"
              >
                {/* Rotating Conic Ring */}
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00D4FF_0%,#A855F7_50%,#00D4FF_100%)] opacity-70 group-hover:opacity-100 transition-opacity" />
                <span className="relative w-full h-full rounded-full bg-dark/95 flex items-center justify-center text-primary group-hover:text-white transition-colors duration-200">
                  <ArrowUp size={18} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
                </span>
              </motion.button>
            </div>

            {/* Copied Feedback Notification Banner */}
            <AnimatePresence>
              {copiedLabel && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-medium shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  <Check size={13} className="text-emerald-400" />
                  <span>{copiedLabel} copied to clipboard!</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Copyright & Interactive Heart */}
            <div className="flex items-center text-xs text-gray-400 tracking-wide select-none">
              <span>Designed &amp; Engineered with</span>
              <motion.button
                onClick={(e) => {
                  triggerRipple(e, '#EF4444');
                  setHeartCount((c) => c + 1);
                }}
                whileHover={{ scale: 1.35 }}
                whileTap={{ scale: 0.8 }}
                className="mx-1.5 p-1 rounded-full text-red-500 hover:text-red-400 focus:outline-none transition-colors cursor-pointer relative"
                title="Click for heart love!"
              >
                <motion.div
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Heart size={14} className="fill-current" />
                </motion.div>

                {/* Floating Heart Particle on Click */}
                {heartCount > 0 && (
                  <motion.span
                    key={heartCount}
                    initial={{ y: 0, opacity: 1, scale: 1 }}
                    animate={{ y: -24, opacity: 0, scale: 1.4 }}
                    transition={{ duration: 0.6 }}
                    className="absolute -top-1 left-1/2 -translate-x-1/2 text-[10px] text-pink-400 font-bold pointer-events-none"
                  >
                    +1
                  </motion.span>
                )}
              </motion.button>
              <span>
                by <strong className="text-white hover:text-primary transition-colors cursor-default">Phorn Sokkhim</strong> &copy; {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Click Shockwave Ripples */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.85 }}
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
    </footer>
  );
};

