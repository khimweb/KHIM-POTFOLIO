import { useEffect } from 'react';
import { useAnimation, useInView } from 'framer-motion';

export const useScrollAnimation = (ref: React.RefObject<Element>, threshold: number = 0.2) => {
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, amount: threshold });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  return controls;
};
