import { useEffect, useRef } from 'react';

interface MagneticOptions {
  strength?: number;
  distance?: number;
}

export const useCursorMagnetic = (options: MagneticOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);
  const { strength = 0.3, distance = 50 } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distanceFromCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distanceFromCenter < distance) {
        const normalizedX = (deltaX / distance) * strength * 20;
        const normalizedY = (deltaY / distance) * strength * 20;
        
        element.style.transform = `translate(${normalizedX}px, ${normalizedY}px) scale(1.05)`;
      } else {
        element.style.transform = 'translate(0px, 0px) scale(1)';
      }
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0px, 0px) scale(1)';
    };

    document.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, distance]);

  return elementRef;
};