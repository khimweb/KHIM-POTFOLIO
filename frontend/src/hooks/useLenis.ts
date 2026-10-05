import { useEffect } from 'react';
import Lenis from 'lenis';
import { setScrollDirection } from './useScrollDirection';

let activeLenis: Lenis | null = null;

export const scrollToSection = (targetId: string, duration = 1.3) => {
  const id = targetId.startsWith('#') ? targetId : `#${targetId}`;
  const element = document.querySelector(id);
  if (!element) return;

  if (activeLenis) {
    activeLenis.scrollTo(element as HTMLElement, {
      offset: -80,
      duration,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  if (window.history.pushState) {
    window.history.pushState(null, '', id);
  }
};

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    activeLenis = lenis;
    (window as any).__lenis = lenis;

    lenis.on('scroll', (e: any) => {
      if (e.direction === 1) {
        setScrollDirection('down');
      } else if (e.direction === -1) {
        setScrollDirection('up');
      }
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
      activeLenis = null;
      delete (window as any).__lenis;
    };
  }, []);
};
