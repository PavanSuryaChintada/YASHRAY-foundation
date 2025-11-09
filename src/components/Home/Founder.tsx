import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LinkedinIcon, Quote } from "lucide-react";
import { useTiltEffect } from "@/hooks/use-tilt-effect";

const Founder = () => {
  const founderRef = useTiltEffect() as any;

  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground animate-fade-in">
            Meet Our Founder
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in delay-200">
            Visionary leadership driving transformation across India's youth empowerment landscape
          </p>
        </div>

        <div className="flex justify-center">
          <div className="max-w-4xl">
            <Card 
              ref={founderRef}
              className="relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-2xl transition-all duration-500 hover-lift animate-fade-in delay-500"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
              
              <div className="relative p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  {/* Founder Photo */}
                  <div className="lg:col-span-1 flex justify-center">
                    <div className="relative">
                      <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
                        <img 
                          src="https://res.cloudinary.com/dsqeawg67/image/upload/v1755507984/shreyansh_um9xyp.jpg"
                          alt="Founder" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Decorative rings */}
                      <div className="absolute -inset-4 rounded-full border-2 border-primary/10 animate-pulse-slow" />
                      <div className="absolute -inset-8 rounded-full border border-secondary/10 animate-pulse-slow" style={{ animationDelay: '1s' }} />
                    </div>
                  </div>

                  {/* Founder Info */}
                  <div className="lg:col-span-2 space-y-6 text-center lg:text-left">
                    <div>
                      <h3 className="text-3xl font-bold text-foreground mb-2">
                        Shreyansh Vashistha
                      </h3>
                      <p className="text-lg text-primary font-medium mb-4">
                        Founder, Yashray Foundation
                      </p>
                      
                      <div className="flex justify-center lg:justify-start mb-6">
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-primary hover:text-primary-foreground transition-colors"
                          onClick={() => window.open('https://www.linkedin.com/in/shreyvashistha/', '_blank')}
                        >
                          <LinkedinIcon className="h-4 w-4 mr-2" />
                          Connect on LinkedIn
                        </Button>
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-4 h-8 w-8 text-primary/30" />
                      <blockquote className="text-lg italic text-muted-foreground leading-relaxed pl-6">
                        Growing up, I often faced the same struggles many young people do  lack of the right guidance, 
                        confusion about opportunities, and the pressure of making the “right” choices. 
                        Through my own journey of learning, failing, and achieving, I realized that what truly changes lives is not just talent, but the right direction and support.

                        With Yashray Foundation, I want to turn those lessons into action  building a platform where 
                        youth can find clarity, confidence, and a strong belief system to achieve more than they ever thought possible
                      </blockquote>
                    </div>

                    {/* Key achievements */}
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/50">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">5+</div>
                        <div className="text-sm text-muted-foreground">Years Experience</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary">500+</div>
                        <div className="text-sm text-muted-foreground">Lives Impacted</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;