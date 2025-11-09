import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLoadingState } from '@/hooks/use-loading-state';

export const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const isLoading = useLoadingState();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      
      setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible || isLoading) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 group">
      <Button
        onClick={scrollToTop}
        size="icon"
        className="relative w-16 h-16 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 glass-morphism"
      >
        {/* Progress Circle */}
        <svg className="absolute inset-0 w-16 h-16 -rotate-90" viewBox="0 0 64 64">
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="hsl(var(--muted))"
            strokeWidth="2"
            fill="none"
            opacity="0.2"
          />
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="url(#progress-gradient)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 28}`}
            strokeDashoffset={`${2 * Math.PI * 28 * (1 - scrollProgress / 100)}`}
            className="transition-all duration-200 ease-out"
          />
          <defs>
            <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="50%" stopColor="hsl(var(--secondary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Arrow Icon */}
        <ChevronUp className="h-6 w-6 text-foreground relative z-10" />
        
        {/* Progress Percentage */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {Math.round(scrollProgress)}%
        </div>
      </Button>
    </div>
  );
};