import { useEffect, useState } from 'react';

export const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-8">
        {/* Animated Logo */}
        <div className="relative">
          <div className="w-24 h-24 border-4 border-primary/20 rounded-full animate-pulse">
            <div className="absolute inset-2 bg-primary/10 rounded-full flex items-center justify-center">
              <img 
                src="/lovable-uploads/2800e3bc-4eaa-4b0c-8183-86de55d352da.png" 
                alt="Yashray Foundation" 
                className="w-12 h-12 animate-pulse"
              />
            </div>
          </div>
          
          {/* Rotating Ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
          
          {/* Outer Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-full blur-xl animate-pulse"></div>
        </div>

        {/* Text Animation */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground animate-fade-in">
            Yashray Foundation
          </h2>
          <p className="text-muted-foreground animate-fade-in delay-500">
            Empowering India's Youth
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary via-secondary to-accent animate-[loading-progress_2s_ease-in-out_forwards]"></div>
        </div>
      </div>
    </div>
  );
};

/* Add to your CSS */
const styles = `
@keyframes loading-progress {
  0% { width: 0%; }
  100% { width: 100%; }
}
`;

export default LoadingScreen;