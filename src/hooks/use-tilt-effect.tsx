import { useEffect, useRef } from 'react';

interface TiltOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
}

export const useTiltEffect = (options: TiltOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);
  const { maxTilt = 15, perspective = 1000, scale = 1.02 } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const rotateX = (mouseY / (rect.height / 2)) * maxTilt * -1;
      const rotateY = (mouseX / (rect.width / 2)) * maxTilt;
      
      element.style.transform = `
        perspective(${perspective}px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        scale(${scale})
      `;
    };

    const handleMouseLeave = () => {
      element.style.transform = `
        perspective(${perspective}px) 
        rotateX(0deg) 
        rotateY(0deg) 
        scale(1)
      `;
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt, perspective, scale]);

  return elementRef;
};