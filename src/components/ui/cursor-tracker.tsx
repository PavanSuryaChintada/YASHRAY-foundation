import { useEffect, useState } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

export const CursorTracker = () => {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor trail */}
      <div
        className="cursor-trail"
        style={{
          left: cursorPosition.x - 10,
          top: cursorPosition.y - 10,
        }}
      />
      
      {/* Secondary trail elements */}
      <div
        className="cursor-trail"
        style={{
          left: cursorPosition.x - 5,
          top: cursorPosition.y - 5,
          width: 10,
          height: 10,
          background: `radial-gradient(circle, hsl(var(--secondary)) 0%, transparent 70%)`,
          transitionDelay: '0.05s',
        }}
      />
      
      <div
        className="cursor-trail"
        style={{
          left: cursorPosition.x - 3,
          top: cursorPosition.y - 3,
          width: 6,
          height: 6,
          background: `radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)`,
          transitionDelay: '0.1s',
        }}
      />
    </>
  );
};