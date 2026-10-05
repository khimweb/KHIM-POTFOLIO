import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Mail, Phone, Send } from 'lucide-react';
import { FluidBlob } from '../three/FluidBlob';
import { scrollToSection } from '../../hooks/useLenis';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   HERO SECTION
   Layout: text LEFT  |  3D fluid blob RIGHT
   On scroll → blob slides smoothly towards LEFT,
   never hiding or disappearing when scrolling up.
───────────────────────────────────────────── */
export const Hero = () => {
  const sectionRef  = useRef<HTMLElement>(null);
  const blobRef     = useRef<HTMLDivElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);

  // Individual text elements for stagger entrance
  const badgeRef  = useRef<HTMLDivElement>(null);
  const subRef    = useRef<HTMLParagraphElement>(null);
  const nameRef   = useRef<HTMLHeadingElement>(null);
  const majorRef  = useRef<HTMLDivElement>(null);
  const skillRef  = useRef<HTMLDivElement>(null);
  const btnsRef   = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── 1. Staggered text entrance from left ── */
      const tl = gsap.timeline({ delay: 0.15 });

      const textEls = [
        badgeRef.current,
        subRef.current,
        nameRef.current,
        majorRef.current,
        skillRef.current,
        btnsRef.current,
        socialRef.current,
      ].filter(Boolean);

      gsap.set(textEls, { x: -60, opacity: 0 });

      tl.to(textEls, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
      });

      /* ── 2. Entrance: blob scale in smoothly (opacity remains 1 always) ── */
      gsap.fromTo(
        blobRef.current,
        { scale: 0.95 },
        { scale: 1.0, duration: 1.0, ease: 'power2.out' }
      );

      /* ── 3. Scroll: blob glides smoothly to LEFT, NEVER HIDING ── */
      gsap.to(blobRef.current, {
        xPercent: -42,
        yPercent: 18,
        scale: 0.88,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      /* ── 4. Scroll: text subtle parallax ── */
      gsap.to(textWrapRef.current, {
        y: -40,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '65% top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center"
      style={{
        background:
          'radial-gradient(ellipse at 68% 30%, #28094e 0%, #120020 30%, #070012 60%, #000000 100%)',
      }}
    >

      {/* ── Ambient CSS glow blobs ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: '2%',
          top: '5%',
          width: '58%',
          height: '75%',
          background:
            'radial-gradient(ellipse, rgba(140,40,255,0.28) 0%, rgba(80,0,160,0.12) 50%, transparent 80%)',
          filter: 'blur(50px)',
          zIndex: 1,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          left: '-8%',
          bottom: '-5%',
          width: '45%',
          height: '50%',
          background:
            'radial-gradient(ellipse, rgba(110,20,200,0.18) 0%, transparent 70%)',
          filter: 'blur(70px)',
          zIndex: 1,
        }}
      />

      {/* ══════════════════════════════════
          LEFT  —  Text content
      ══════════════════════════════════ */}
      <div
        ref={textWrapRef}
        className="relative flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-24
                   w-full md:w-[52%] min-h-screen pt-24 pb-12"
        style={{ zIndex: 10 }}
      >

        {/* Year / Semester badge */}
        <div ref={badgeRef} className="mb-6">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5
                       text-xs font-semibold tracking-[0.25em] uppercase rounded-full"
            style={{
              border: '1px solid rgba(168,85,247,0.45)',
              background: 'rgba(120,40,220,0.15)',
              color: '#c084fc',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#a855f7' }}
            />
            Year 3 · Semester 2
          </span>
        </div>

        {/* University */}
        <p
          ref={subRef}
          className="text-xs md:text-sm font-medium tracking-[0.35em] uppercase mb-4"
          style={{ color: 'rgba(167,139,250,0.85)' }}
        >
          Beltei International University
        </p>

        {/* Name — large hero text */}
        <h1
          ref={nameRef}
          className="font-black leading-[0.92] tracking-tight mb-5"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(3.2rem, 7.5vw, 6.8rem)',
            background:
              'linear-gradient(130deg, #ffffff 0%, #e9d5ff 35%, #a855f7 65%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          PHORN
          <br />
          SOKHIM
        </h1>

        {/* Major */}
        <div ref={majorRef} className="mb-2">
          <h2
            className="font-bold tracking-[0.18em] uppercase text-gray-200"
            style={{ fontSize: 'clamp(1.05rem, 2.2vw, 1.45rem)' }}
          >
            Software Engineering
          </h2>
        </div>

        {/* Advance Skill with smooth Typewriter animation */}
        <div ref={skillRef} className="mb-8 flex items-center gap-2.5">
          <span className="inline-block w-7 h-[2px] bg-gradient-to-r from-primary to-purple-500" />
          <TypeAnimation
            sequence={[
              'ADVANCE SKILL',
              2200,
              'BELTEI INTERNATIONAL UNIVERSITY',
              2200,
              'YEAR 3 · SEMESTER 2',
              2200,
              'FULL-STACK & 3D SPECIALIST',
              2200,
              'CLIENT PLATFORMS CREATOR',
              2200,
            ]}
            wrapper="span"
            speed={45}
            className="text-xs md:text-sm tracking-[0.25em] uppercase font-bold text-primary font-space"
            repeat={Infinity}
          />
        </div>

        {/* CTA Buttons */}
        <div ref={btnsRef} className="flex gap-4 flex-wrap mb-10">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#projects', 1.4);
            }}
            className="relative px-7 py-3 rounded-full font-semibold text-sm
                       tracking-wider uppercase overflow-hidden group transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              color: '#fff',
              boxShadow: '0 0 25px rgba(124,58,237,0.55)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 50px rgba(168,85,247,0.9), 0 0 20px rgba(168,85,247,0.5) inset';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 25px rgba(124,58,237,0.55)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            View My Work
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contact', 1.4);
            }}
            className="px-7 py-3 rounded-full font-semibold text-sm
                       tracking-wider uppercase transition-all duration-300"
            style={{
              border: '1px solid rgba(168,85,247,0.45)',
              color: '#c084fc',
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(124,58,237,0.2)';
              e.currentTarget.style.borderColor = '#a855f7';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(168,85,247,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(168,85,247,0.45)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Contact Me
          </a>
        </div>

        {/* Social icons */}
        <div ref={socialRef} className="flex gap-4 flex-wrap">
          {[
            { icon: <Github size={17} />, href: 'https://github.com/khimweb', label: 'GitHub' },
            { icon: <Send size={17} />, href: 'https://t.me/phornsokkhim', label: 'Telegram' },
            { icon: <Mail size={17} />, href: 'mailto:sokkhim519@gmail.com', label: 'Email' },
            { icon: <Phone size={17} />, href: 'tel:0966660019', label: 'Phone' },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={s.label}
              className="w-10 h-10 rounded-full flex items-center justify-center
                         transition-all duration-300"
              style={{
                border: '1px solid rgba(168,85,247,0.3)',
                color: '#9f7aea',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(124,58,237,0.35)';
                e.currentTarget.style.borderColor = '#a855f7';
                e.currentTarget.style.color = '#d8b4fe';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 0 16px rgba(168,85,247,0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)';
                e.currentTarget.style.color = '#9f7aea';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════
          RIGHT  —  3D Fluid Blob
          Always opacity 1. Never hides on scroll up!
      ══════════════════════════════════ */}
      <div
        ref={blobRef}
        className="absolute right-0 top-0 w-full md:w-[58%] h-full pointer-events-auto"
        style={{ zIndex: 5, opacity: 1 }}
      >
        {/* Ambient glow behind blob */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(168,85,247,0.12) 0%, transparent 65%)',
          }}
        />
        <FluidBlob />
      </div>

      {/* ── Decorative vertical text RIGHT edge — animated typing ── */}
      <div
        className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex
                   flex-col items-center gap-3 pointer-events-none"
        style={{ zIndex: 20 }}
      >
        <div
          className="h-16 w-[1px]"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(168,85,247,0.6))' }}
        />
        <div
          className="text-[11px] tracking-[0.35em] uppercase font-medium font-space text-purple-300"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
          }}
        >
          <TypeAnimation
            sequence={[
              'SCROLL TO EXPLORE',
              2500,
              'KHIM DEVELOPER',
              2200,
              '3D INTERACTIVE',
              2200,
            ]}
            wrapper="span"
            speed={40}
            className="text-purple-300 font-semibold"
            repeat={Infinity}
          />
        </div>
        <div
          className="h-16 w-[1px]"
          style={{ background: 'linear-gradient(to top, transparent, rgba(168,85,247,0.6))' }}
        />
      </div>

      {/* ── Scroll indicator bottom-center ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 1.0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col
                   items-center gap-2 pointer-events-none"
        style={{ zIndex: 20 }}
      >
        <span
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: 'rgba(167,139,250,0.6)' }}
        >
          Scroll
        </span>

        {/* Mouse icon */}
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full flex justify-center pt-1.5"
          style={{ border: '1px solid rgba(168,85,247,0.45)' }}
        >
          <motion.div
            animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-1 h-1 rounded-full"
            style={{ background: '#a855f7' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
