import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useScrollDirection } from '../../hooks/useScrollDirection';

export type RevealSide = 'left' | 'right' | 'center';

interface ScrollRevealProps {
  children: React.ReactNode;
  side?: RevealSide;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  side = 'center',
  className = '',
  delay = 0,
  duration = 0.8,
  distance = 80,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollDir = useScrollDirection();
  const [fromTop, setFromTop] = useState(false);

  // Responsive trigger with margin to avoid edge flickering
  const isInView = useInView(ref, {
    once: false,
    margin: '-30px 0px -30px 0px',
    amount: 0.08,
  });

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setFromTop(rect.top < window.innerHeight * 0.45);
    }
  }, [isInView, scrollDir]);

  const variants = {
    hidden: (custom: { dir: 'down' | 'up'; fromTop: boolean }) => {
      let x = 0;
      let y = 0;

      if (side === 'left') {
        if (custom.dir === 'down') {
          // Scroll down: slides inward from outer left
          x = -distance;
        } else {
          // Scroll up: moves from center outward to left
          // If entering from top: starts near center (+offset) -> slides to left (0)
          // If exiting to bottom: slides from center (0) -> to left (-distance)
          x = custom.fromTop ? distance * 0.65 : -distance;
        }
      } else if (side === 'right') {
        if (custom.dir === 'down') {
          // Scroll down: slides inward from outer right
          x = distance;
        } else {
          // Scroll up: moves from center outward to right
          // If entering from top: starts near center (-offset) -> slides to right (0)
          // If exiting to bottom: slides from center (0) -> to right (+distance)
          x = custom.fromTop ? -distance * 0.65 : distance;
        }
      } else {
        // Center elements: smooth vertical float
        y = custom.dir === 'down' ? 35 : -35;
      }

      return {
        opacity: 0,
        x,
        y,
        scale: side === 'center' ? 0.94 : 0.98,
        transition: {
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        },
      };
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      custom={{ dir: scrollDir, fromTop }}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
};
