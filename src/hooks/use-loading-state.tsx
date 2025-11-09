import { useState, useEffect } from 'react';

export const useLoadingState = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for initial content load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Also listen for the window load event
    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 500);
    };

    window.addEventListener('load', handleLoad);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return isLoading;
};