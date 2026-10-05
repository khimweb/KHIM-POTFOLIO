import { useState, useEffect } from 'react';

export type ScrollDirection = 'down' | 'up';

let currentDirection: ScrollDirection = 'down';
const subscribers = new Set<(dir: ScrollDirection) => void>();

export const getScrollDirection = (): ScrollDirection => currentDirection;

export const setScrollDirection = (dir: ScrollDirection) => {
  if (currentDirection !== dir) {
    currentDirection = dir;
    subscribers.forEach((callback) => callback(dir));
  }
};

export const useScrollDirection = (): ScrollDirection => {
  const [direction, setDirection] = useState<ScrollDirection>(currentDirection);

  useEffect(() => {
    setDirection(currentDirection);

    const onDirChange = (newDir: ScrollDirection) => {
      setDirection(newDir);
    };

    subscribers.add(onDirChange);

    // Fallback window scroll listener with passive flag
    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.pageYOffset || document.documentElement.scrollTop;
          const diff = scrollY - lastScrollY;
          if (Math.abs(diff) > 2) {
            setScrollDirection(diff > 0 ? 'down' : 'up');
            lastScrollY = scrollY;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      subscribers.delete(onDirChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return direction;
};
