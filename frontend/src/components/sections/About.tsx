import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { GraduationCap, Award, Mail, Phone, Send, Github, Sparkles, ExternalLink, Check, Zap } from 'lucide-react';
import { ProfileCard3D } from '../ui/ProfileCard3D';
import { ScrollReveal } from '../ui/ScrollReveal';

interface Ripple {
  id: number;
  x: number;
  y: number;
  color: string;
}

export const About: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);
  const [activeSkillHover, setActiveSkillHover] = useState<number | null>(null);

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

  const stats = [
    { label: "University Level", value: "Year 3 S2", highlight: "Academic Excellence" },
    { label: "Client Platforms", value: "2+ Live", highlight: "Production Deployed" },
    { label: "Software Skill", value: "Advanced", highlight: "Full-Stack + 3D" },
  ];

  const coreSkills = [
    { name: "Full Stack (React, TypeScript, Spring Boot)", percentage: 95, icon: "⚡" },
    { name: "Database Engineering (SQLite, PostgreSQL, MySQL)", percentage: 90, icon: "🗄️" },
    { name: "Modern 3D & Animations (Three.js, GSAP, Framer)", percentage: 88, icon: "🌌" },
    { name: "Cloud Deployment & RESTful Architecture", percentage: 85, icon: "☁️" },
  ];

  return (
    <section id="about" className="py-28 relative z-10 overflow-hidden" ref={ref}>
      {/* Background ambient lighting */}
      <div
        className="absolute left-[-10%] top-[20%] w-[500px] h-[500px] pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(140,40,255,0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Big subtle outline text in background */}
        <div
          className="absolute -top-16 right-0 text-[8rem] md:text-[14rem] font-black font-space select-none pointer-events-none opacity-5 tracking-widest text-right leading-none"
          style={{
            WebkitTextStroke: '2px rgba(168,85,247,0.4)',
            color: 'transparent',
          }}
        >
          ABOUT
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ══════════════════════════════════
              LEFT SIDE — 3D 360° Rotatable Card
          ══════════════════════════════════ */}
          <ScrollReveal side="left" distance={90} className="lg:col-span-5 flex justify-center">
            <ProfileCard3D />
          </ScrollReveal>

          {/* ══════════════════════════════════
              RIGHT SIDE — Text content & Competencies
          ══════════════════════════════════ */}
          <ScrollReveal side="right" distance={90} delay={0.1} className="lg:col-span-7 flex flex-col justify-center">
            {/* Tag */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider mb-4 w-fit shadow-[0_0_15px_rgba(0,212,255,0.2)]"
            >
              <Sparkles size={14} className="text-primary animate-pulse" />
              <span>Who I Am &amp; Client Solutions</span>
            </motion.div>

            {/* University label */}
            <p className="text-xs md:text-sm font-medium tracking-[0.25em] uppercase text-purple-300 mb-2 flex items-center gap-2">
              <GraduationCap size={16} className="text-primary" />
              BELTEI International University
            </p>

            {/* Smooth Writing Typewriter Heading */}
            <div className="min-h-[85px] md:min-h-[105px] mb-4 flex items-center">
              <TypeAnimation
                sequence={[
                  'Delivering advanced software engineering solutions tailored to client needs.',
                  2500,
                  'Engineering full-stack architectures with modern 3D and responsive interfaces.',
                  2500,
                  'Building production-grade client platforms with speed, security, and precision.',
                  2500,
                ]}
                wrapper="h3"
                speed={50}
                className="text-2xl md:text-3xl lg:text-4xl font-bold font-space text-white leading-snug"
                repeat={Infinity}
              />
            </div>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
              I am <strong className="text-white font-semibold">Phorn Sokkhim</strong>, a Year 3 Semester 2 Software Engineering student at BELTEI International University with an advanced focus on full-stack web architectures, 3D interaction design, and robust backend APIs.
            </p>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
              I have engineered and deployed active production client projects including{' '}
              <a
                href="https://cv-builder.store/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline font-semibold transition-colors"
              >
                cv-builder.store
                <ExternalLink size={12} />
              </a>{' '}
              and the{' '}
              <a
                href="https://kiro-helpdesk.onrender.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-secondary hover:underline font-semibold transition-colors"
              >
                Kiro Helpdesk System
                <ExternalLink size={12} />
              </a>.
            </p>

            {/* Quick Contact Interactive Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mb-6 relative">
              <motion.a
                href="https://t.me/phornsokkhim"
                target="_blank"
                rel="noreferrer"
                onClick={(e) => triggerRipple(e, '#00D4FF')}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2.5 p-3 rounded-xl glass border border-white/10 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all text-xs font-medium text-gray-300 hover:text-primary group cursor-pointer overflow-hidden relative"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
                  <Send size={15} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase">Telegram</span>
                  <span className="font-semibold text-white group-hover:text-primary">@phornsokkhim</span>
                </div>
              </motion.a>

              <motion.button
                onClick={(e) => handleCopy('0966660019', 'Phone Number', e, '#A855F7')}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2.5 p-3 rounded-xl glass border border-white/10 hover:border-secondary/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all text-xs font-medium text-gray-300 hover:text-purple-300 group cursor-pointer text-left overflow-hidden relative"
              >
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform shadow-sm">
                  <Phone size={15} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase">Phone (Click to Copy)</span>
                  <span className="font-semibold text-white group-hover:text-purple-300">096 666 0019</span>
                </div>
              </motion.button>

              <motion.button
                onClick={(e) => handleCopy('sokkhim519@gmail.com', 'Email Address', e, '#38BDF8')}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2.5 p-3 rounded-xl glass border border-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all text-xs font-medium text-gray-300 hover:text-cyan-300 group cursor-pointer text-left overflow-hidden relative"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
                  <Mail size={15} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase">Email (Click to Copy)</span>
                  <span className="truncate max-w-[130px] block font-semibold text-white group-hover:text-cyan-300">
                    sokkhim519@gmail.com
                  </span>
                </div>
              </motion.button>

              <motion.a
                href="https://github.com/khimweb"
                target="_blank"
                rel="noreferrer"
                onClick={(e) => triggerRipple(e, '#FFFFFF')}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2.5 p-3 rounded-xl glass border border-white/10 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all text-xs font-medium text-gray-300 hover:text-white group cursor-pointer overflow-hidden relative"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-sm">
                  <Github size={15} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase">GitHub</span>
                  <span className="font-semibold text-white">github.com/khimweb</span>
                </div>
              </motion.a>
            </div>

            {/* Copied Feedback Notification Banner */}
            <AnimatePresence>
              {copiedLabel && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  className="mb-4 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-medium shadow-[0_0_15px_rgba(16,185,129,0.3)] w-fit"
                >
                  <Check size={13} className="text-emerald-400" />
                  <span>{copiedLabel} copied to clipboard!</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Interactive Stats Cards */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => triggerRipple(e, '#00D4FF')}
                  className="glass p-3.5 rounded-xl text-center border border-white/10 hover:border-primary/40 hover:shadow-[0_0_25px_rgba(0,212,255,0.25)] transition-all duration-300 cursor-pointer group"
                >
                  <div className="text-xl md:text-2xl font-bold gradient-text mb-0.5 group-hover:scale-105 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-gray-400 font-medium mb-1">
                    {stat.label}
                  </div>
                  <div className="text-[9px] text-primary/80 font-mono tracking-tighter uppercase opacity-80 group-hover:opacity-100">
                    {stat.highlight}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Core Skills Progress Bars with Hover Light & Ripple */}
            <div className="space-y-3.5">
              <h4 className="text-sm font-semibold text-white mb-2 flex items-center justify-between uppercase tracking-wider">
                <span className="flex items-center gap-2">
                  <Award size={16} className="text-primary" /> Advanced Competencies
                </span>
                <span className="text-xs text-primary/80 font-mono flex items-center gap-1">
                  <Zap size={12} className="fill-primary" /> Production Rated
                </span>
              </h4>

              {coreSkills.map((skill, index) => {
                const isHovered = activeSkillHover === index;

                return (
                  <motion.div
                    key={index}
                    onMouseEnter={() => setActiveSkillHover(index)}
                    onMouseLeave={() => setActiveSkillHover(null)}
                    whileHover={{ scale: 1.01 }}
                    className={`p-2.5 rounded-xl transition-all duration-300 ${
                      isHovered ? 'bg-white/[0.04] border border-primary/30 shadow-[0_0_20px_rgba(0,212,255,0.15)]' : 'border border-transparent'
                    }`}
                  >
                    <div className="flex justify-between mb-1.5 text-xs">
                      <span className="text-gray-200 font-medium flex items-center gap-1.5">
                        <span>{skill.icon}</span>
                        <span>{skill.name}</span>
                      </span>
                      <span className="text-primary font-space font-bold">
                        {skill.percentage}%
                      </span>
                    </div>

                    <div className="h-2 w-full bg-dark/80 rounded-full overflow-hidden border border-white/10 p-0.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.percentage}%` } : { width: 0 }}
                        transition={{ duration: 1.1, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                        className={`h-full rounded-full transition-all duration-300 ${
                          isHovered
                            ? 'bg-gradient-to-r from-cyan-400 via-primary to-purple-400 shadow-[0_0_15px_#00D4FF]'
                            : 'bg-gradient-to-r from-primary via-purple-500 to-secondary shadow-[0_0_8px_rgba(0,212,255,0.4)]'
                        }`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </ScrollReveal>
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
    </section>
  );
};

