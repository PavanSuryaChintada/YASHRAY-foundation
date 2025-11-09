import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useCursorMagnetic } from "@/hooks/use-cursor-magnetic";
import { useTiltEffect } from "@/hooks/use-tilt-effect";

const Hero = () => {
  const magneticRef1 = useCursorMagnetic({ strength: 0.4, distance: 80 });
  const magneticRef2 = useCursorMagnetic({ strength: 0.3, distance: 60 });
  const tiltRef = useTiltEffect({ maxTilt: 10, scale: 1.02 });
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Youth Empowerment
                <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Viksit Bharat 2047
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                We exist to help India's youth learn, build, and lead—so they can meaningfully 
                contribute to a developed India by 2047. Building pathways through values, skills, 
                technology, culture, and opportunity.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                ref={magneticRef1 as any}
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-full group glow-on-hover relative overflow-hidden"
                onClick={() => scrollToSection("#get-involved")}
              >
                <span className="relative z-10">Get Involved</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
              </Button>
              <Button 
                ref={magneticRef2 as any}
                variant="outline" 
                size="lg"
                className="px-8 py-6 text-lg font-semibold rounded-full group border-2 glow-on-hover relative overflow-hidden"
                onClick={() => scrollToSection("#what-we-do")}
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform relative z-10" />
                <span className="relative z-10">Learn More</span>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4</div>
                <div className="text-sm text-muted-foreground">Key Verticals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">2047</div>
                <div className="text-sm text-muted-foreground">Viksit Bharat</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">∞</div>
                <div className="text-sm text-muted-foreground">Impact Potential</div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative animate-fade-in delay-200">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Logo as central element */}
              <div 
                ref={tiltRef as any}
                className="relative z-10 bg-background/80 backdrop-blur-sm rounded-full p-8 shadow-2xl border border-border/50 glass-morphism transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]"
              >
                <img 
                  src="/lovable-uploads/2800e3bc-4eaa-4b0c-8183-86de55d352da.png" 
                  alt="Yashray Foundation" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Floating elements with enhanced animations */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center animate-float shimmer">
                <div className="w-12 h-12 bg-primary rounded-full animate-pulse"></div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center animate-float delay-1000 shimmer">
                <div className="w-10 h-10 bg-secondary rounded-full animate-pulse"></div>
              </div>
              <div className="absolute top-1/2 -right-8 w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center animate-float delay-500 shimmer">
                <div className="w-8 h-8 bg-accent rounded-full animate-pulse"></div>
              </div>
              
              {/* Orbital rings */}
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-spin" style={{ animationDuration: '20s' }}></div>
              <div className="absolute inset-4 rounded-full border border-secondary/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Creative Professional Scroll Indicator */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group" onClick={() => scrollToSection("#what-we-do")}>
        <div className="flex flex-col items-center space-y-6">
          {/* Interactive Mission Text */}
          <div className="text-center space-y-4 magnetic-text">
            <div className="relative">
              <p className="text-sm text-muted-foreground font-medium tracking-wider uppercase text-reveal group-hover:text-primary transition-all duration-1000 group-hover:drop-shadow-[0_0_8px_hsl(var(--primary))]">
                Scroll to Explore
              </p>
              {/* Animated Underline */}
              <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1200 origin-center"></div>
              
              {/* Cursor Interaction Particles */}
              <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 left-1/4 w-1 h-1 bg-primary rounded-full animate-ping"></div>
                <div className="absolute bottom-0 right-1/4 w-1 h-1 bg-secondary rounded-full animate-ping delay-200"></div>
                <div className="absolute top-1/2 left-0 w-1 h-1 bg-accent rounded-full animate-ping delay-500"></div>
                <div className="absolute top-1/2 right-0 w-1 h-1 bg-primary rounded-full animate-ping delay-700"></div>
              </div>
            </div>
            
            {/* DISCOVER OUR MISSION Text */}
            <div className="relative">
              <div className="text-center">
                <p className="text-lg font-bold tracking-[0.2em] text-foreground uppercase group-hover:text-primary transition-all duration-1200 text-reveal animate-fade-in group-hover:drop-shadow-[0_0_12px_hsl(var(--primary))]">
                  DISCOVER OUR MISSION
                </p>
                {/* Animated Underline */}
                <div className="w-20 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mt-2 opacity-60 group-hover:opacity-100 group-hover:w-32 transition-all duration-1500 group-hover:drop-shadow-[0_0_6px_hsl(var(--primary))]"></div>
              </div>
              
              {/* Floating Energy Orbs */}
              <div className="absolute -top-2 left-1/4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-float"></div>
              </div>
              <div className="absolute -bottom-2 right-1/4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                <div className="w-1.5 h-1.5 bg-accent/50 rounded-full animate-float"></div>
              </div>
            </div>
          </div>
          
          {/* Interactive Floating Constellation */}
          <div className="relative">
            <div className="flex space-x-8 items-center">
              <div className="w-3 h-3 bg-primary/30 rounded-full animate-float border border-primary/50 glass-morphism group-hover:scale-125 group-hover:bg-primary/60 transition-all duration-500">
                <div className="w-1 h-1 bg-primary rounded-full mx-auto mt-1 animate-pulse"></div>
              </div>
              <div className="w-4 h-4 bg-secondary/30 rounded-full animate-float delay-300 border border-secondary/50 glass-morphism group-hover:scale-150 group-hover:bg-secondary/60 transition-all duration-500">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full mx-auto mt-1 animate-pulse"></div>
              </div>
              <div className="w-2.5 h-2.5 bg-accent/30 rounded-full animate-float delay-600 border border-accent/50 glass-morphism group-hover:scale-125 group-hover:bg-accent/60 transition-all duration-500">
                <div className="w-1 h-1 bg-accent rounded-full mx-auto mt-0.5 animate-pulse"></div>
              </div>
            </div>
            
            {/* Connection Lines that appear on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
              <svg className="w-full h-full" viewBox="0 0 120 20">
                <line x1="12" y1="10" x2="48" y2="10" stroke="url(#connection-gradient)" strokeWidth="0.5" className="animate-pulse">
                  <animate attributeName="stroke-dasharray" values="0,50;20,30;50,0" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1="52" y1="10" x2="88" y2="10" stroke="url(#connection-gradient)" strokeWidth="0.5" className="animate-pulse delay-500">
                  <animate attributeName="stroke-dasharray" values="0,50;20,30;50,0" dur="2s" repeatCount="indefinite" />
                </line>
                <defs>
                  <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--secondary))" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;