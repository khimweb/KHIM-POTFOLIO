import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap, Sparkles } from 'lucide-react';
import { scrollToSection } from '../../hooks/useLenis';

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

interface Ripple {
  id: number;
  x: number;
  y: number;
  color: string;
}

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('#home');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<number | null>(null);

  // Trigger click ripple effect
  const createRipple = (e: React.MouseEvent<HTMLElement>, color = '#00D4FF') => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();

    setRipples((prev) => [...prev.slice(-3), { id, x, y, color }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 700);
  };

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLElement>, href: string, color = '#00D4FF') => {
    e.preventDefault();
    createRipple(e, color);

    setActiveSection(href);
    isClickScrollingRef.current = true;

    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 1200);

    scrollToSection(href, 1.4);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  // ScrollSpy to track active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      if (isClickScrollingRef.current) return;

      const scrollPosition = window.scrollY + 140;

      // Check if at the very top
      if (window.scrollY < 120) {
        setActiveSection('#home');
        return;
      }

      // Check sections from bottom to top
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const link = navLinks[i];
        const element = document.querySelector(link.href) as HTMLElement | null;
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(link.href);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark/80 backdrop-blur-xl border-b border-primary/20 shadow-[0_12px_35px_-10px_rgba(0,0,0,0.8),0_0_25px_rgba(0,212,255,0.08)] py-3.5'
          : 'bg-dark/25 backdrop-blur-md border-b border-white/[0.04] py-5'
      }`}
    >
      {/* Top glowing ambient hairline */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
        {/* Brand / Logo */}
        <motion.a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-3 group relative cursor-pointer select-none"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
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

          <div className="flex flex-col">
            <span className="text-xl font-space font-extrabold tracking-tight text-white flex items-center gap-1 group-hover:text-primary transition-colors duration-300">
              KHIM<span className="gradient-text font-black">-DEVELOPER</span>
            </span>
          </div>
        </motion.a>

        {/* Desktop Navigation Links */}
        <div
          className="hidden md:flex items-center relative rounded-full bg-white/[0.03] border border-white/10 p-1.5 backdrop-blur-lg shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          onMouseLeave={() => setHoveredSection(null)}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            const isHovered = hoveredSection === link.href;

            return (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                onMouseEnter={() => setHoveredSection(link.href)}
                whileTap={{ scale: 0.92 }}
                className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer overflow-hidden select-none ${
                  isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {/* Active Sliding Glowing Pill */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 32,
                    }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/25 via-secondary/30 to-primary/25 border border-primary/50 shadow-[0_0_20px_rgba(0,212,255,0.4),inset_0_0_12px_rgba(0,212,255,0.2)] -z-10"
                  >
                    {/* Glowing bottom line accent */}
                    <div className="absolute inset-x-3 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_10px_#00D4FF]" />
                  </motion.div>
                )}

                {/* Hover Soft Backdrop */}
                {isHovered && !isActive && (
                  <motion.div
                    layoutId="hoverNavPill"
                    transition={{
                      type: 'spring',
                      stiffness: 450,
                      damping: 30,
                    }}
                    className="absolute inset-0 rounded-full bg-white/[0.06] -z-10"
                  />
                )}

                {/* Converging Animated Gradient Border on Hover */}
                {isHovered && !isActive && (
                  <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none -z-0">
                    <motion.div
                      initial={{ width: '0%', opacity: 0 }}
                      animate={{ width: '50.5%', opacity: 1 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-0 left-0 h-[1.5px] rounded-l-full bg-gradient-to-r from-primary via-white to-primary shadow-[0_0_8px_#00D4FF]"
                    />
                    <motion.div
                      initial={{ width: '0%', opacity: 0 }}
                      animate={{ width: '50.5%', opacity: 1 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-0 right-0 h-[1.5px] rounded-r-full bg-gradient-to-l from-secondary via-white to-secondary shadow-[0_0_8px_#A855F7]"
                    />
                    <motion.div
                      initial={{ width: '0%', opacity: 0 }}
                      animate={{ width: '50.5%', opacity: 1 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute bottom-0 left-0 h-[1.5px] rounded-l-full bg-gradient-to-r from-primary via-white to-primary shadow-[0_0_8px_#00D4FF]"
                    />
                    <motion.div
                      initial={{ width: '0%', opacity: 0 }}
                      animate={{ width: '50.5%', opacity: 1 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute bottom-0 right-0 h-[1.5px] rounded-r-full bg-gradient-to-l from-secondary via-white to-secondary shadow-[0_0_8px_#A855F7]"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.22, delay: 0.14 }}
                      className="absolute inset-0 rounded-full border border-primary/40 shadow-[0_0_12px_rgba(0,212,255,0.3)]"
                    />
                  </div>
                )}

                {/* Link label with subtle glowing dot if active */}
                <span className="relative z-10 flex items-center gap-1.5">
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeDot"
                      className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#00D4FF]"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </span>
              </motion.a>
            );
          })}
        </div>

        {/* Powerful "Let's Talk" Button */}
        <div className="hidden md:flex items-center">
          <motion.a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact', '#A855F7')}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.93 }}
            className="relative group p-[2px] rounded-full overflow-hidden focus:outline-none cursor-pointer select-none shadow-[0_0_20px_rgba(0,212,255,0.35)] hover:shadow-[0_0_35px_rgba(0,212,255,0.7),0_0_25px_rgba(168,85,247,0.5)] transition-shadow duration-300"
          >
            {/* Spinning Radiant Conic Border */}
            <span className="absolute inset-[-1000%] animate-[spin_3.5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00D4FF_0%,#A855F7_50%,#00D4FF_100%)] opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Inner Pill Body */}
            <span className="relative inline-flex items-center gap-2 px-6 py-2 rounded-full bg-dark/90 group-hover:bg-dark/70 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300">
              <Zap className="w-3.5 h-3.5 text-primary fill-primary animate-pulse group-hover:scale-125 transition-transform duration-300" />
              <span className="tracking-wide">Let's Talk</span>
              <Sparkles className="w-3.5 h-3.5 text-secondary opacity-70 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-300" />

              {/* Gleam light beam traveling across */}
              <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </span>
            </span>
          </motion.a>
        </div>

        {/* Mobile Toggle Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden relative p-2 rounded-xl glass border border-primary/30 text-primary shadow-[0_0_15px_rgba(0,212,255,0.2)] focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
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

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-dark/95 backdrop-blur-2xl border-t border-white/10 mt-3"
          >
            <div className="flex flex-col px-6 py-5 space-y-2">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.href;

                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-white border border-primary/40 shadow-[0_0_15px_rgba(0,212,255,0.25)]'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#00D4FF]" />
                    )}
                  </motion.a>
                );
              })}

              <motion.a
                href="#contact"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.05 }}
                onClick={(e) => handleNavClick(e, '#contact', '#A855F7')}
                className="mt-3 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-primary via-purple-600 to-primary text-white font-semibold shadow-[0_0_20px_rgba(0,212,255,0.4)]"
              >
                <Zap size={16} className="fill-white" />
                <span>Let's Talk</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

