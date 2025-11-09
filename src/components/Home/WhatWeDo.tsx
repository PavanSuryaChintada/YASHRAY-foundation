import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { 
  BookOpen, 
  Home, 
  Brain, 
  TrendingUp,
  ArrowRight,
  Users,
  MapPin,
  Code,
  DollarSign,
  Target,
  Heart,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useEffect, useRef } from "react";

const WhatWeDo = () => {
  const carouselApiRef = useRef<any>(null);
  const verticals = [
    {
      id: 1,
      title: "Skill Development",
      subtitle: "Beyond Books",
      icon: BookOpen,
      color: "primary",
      description: "Close the gap between schooling and real-world capability through communication, problem-solving, confidence, values, and career readiness.",
      features: [
        "Practical English & communication",
        "Math mastery (concepts + speed + application)",
        "Life skills & productivity systems",
        "Values-led leadership (clarity, discipline, service)"
      ],
      audience: "Students (Class 4–10+), college youth, and early professionals",
      outcome: "Clear communication, exam + real-life confidence, better career choices"
    },
    {
      id: 2,
      title: "Hospitality",
      subtitle: "Divine Yatra & Vaidikam",
      icon: Home,
      color: "secondary",
      description: "Building India-rooted, people-first experiences that create livelihoods and preserve culture.",
      features: [
        "Divine Yatra: Curated homestays in Uttarakhand",
        "Authentic local stays & cultural immersion",
        "Vaidikam: Yoga-Ayurveda retreats",
        "Wellness journeys rooted in Indian wisdom"
      ],
      audience: "Local hosts, seniors, global wellness seekers, spiritual travelers",
      outcome: "Economic uplift for communities, cultural preservation, balanced living"
    },
    {
      id: 3,
      title: "Tech & AI",
      subtitle: "Scomedia",
      icon: Brain,
      color: "accent",
      description: "Preparing youth and businesses for the future of work through practical technology and AI solutions.",
      features: [
        "AI-powered workflows & automation for SMBs",
        "Modern web platforms & digital systems",
        "Youth upskilling through real projects",
        "R&D and collaboration opportunities"
      ],
      audience: "Entrepreneurs, small businesses, creators, tech students",
      outcome: "Efficiency, growth, AI literacy, employable portfolios"
    },
    {
      id: 4,
      title: "Financial Literacy",
      subtitle: "WealthyMinds",
      icon: TrendingUp,
      color: "financial",
      description: "Cultivating money sense early so youth can build independent, stable lives with sound financial decisions.",
      features: [
        "Personal finance fundamentals (earn–save–invest–protect)",
        "Equity & compounding basics with risk awareness",
        "Goal planning and financial discipline",
        "Entrepreneurial mindset and value creation"
      ],
      audience: "Students, first-time earners, young professionals",
      outcome: "Fewer money mistakes, better long-term decisions, financial confidence"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return {
          bg: "bg-primary/5",
          border: "border-primary/20",
          iconBg: "bg-primary/10",
          iconText: "text-primary",
          button: "bg-primary hover:bg-primary/90 text-primary-foreground",
          dot: "bg-primary"
        };
      case "secondary":
        return {
          bg: "bg-secondary/5",
          border: "border-secondary/20",
          iconBg: "bg-secondary/10",
          iconText: "text-secondary",
          button: "bg-secondary hover:bg-secondary/90 text-secondary-foreground",
          dot: "bg-secondary"
        };
      case "accent":
        return {
          bg: "bg-accent/5",
          border: "border-accent/20",
          iconBg: "bg-accent/10",
          iconText: "text-accent",
          button: "bg-accent hover:bg-accent/90 text-accent-foreground",
          dot: "bg-accent"
        };
      case "financial":
        return {
          bg: "bg-financial/5",
          border: "border-financial/20",
          iconBg: "bg-financial/10",
          iconText: "text-financial",
          button: "bg-financial hover:bg-financial/90 text-financial-foreground",
          dot: "bg-financial"
        };
      default:
        return {
          bg: "bg-primary/5",
          border: "border-primary/20",
          iconBg: "bg-primary/10",
          iconText: "text-primary",
          button: "bg-primary hover:bg-primary/90 text-primary-foreground",
          dot: "bg-primary"
        };
    }
  };

  return (
    <section id="what-we-do" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            What We Do
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Our work blends values, skills, technology, culture, and opportunity into practical pathways 
            for young people. We operate across four key verticals to ensure no youth is left behind.
          </p>
        </div>

        {/* Simple 2D Carousel */}
        <div className="relative mb-16">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full max-w-7xl mx-auto"
            setApi={(api) => {
              carouselApiRef.current = api;
            }}
          >
            <CarouselContent className="-ml-4 md:-ml-8">
              {verticals.map((vertical, index) => {
                const colorClasses = getColorClasses(vertical.color);
                
                return (
                  <CarouselItem 
                    key={index} 
                    className="pl-4 md:pl-8 basis-full md:basis-5/6 lg:basis-3/4 xl:basis-3/5"
                  >
                    <div className="carousel-item-wrapper">
                      <VerticalCard vertical={vertical} colorClasses={colorClasses} />
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex justify-center mt-12 space-x-6">
              <CarouselPrevious className="static translate-y-0 bg-primary/20 hover:bg-primary/30 border-primary/30 text-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110" />
              <CarouselNext className="static translate-y-0 bg-primary/20 hover:bg-primary/30 border-primary/30 text-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110" />
            </div>
            
            {/* Mobile Navigation */}
            <div className="flex md:hidden justify-center mt-8 space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => carouselApiRef.current?.scrollPrev()}
                className="bg-primary/20 hover:bg-primary/30 border-primary/30 text-primary"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => carouselApiRef.current?.scrollNext()}
                className="bg-primary/20 hover:bg-primary/30 border-primary/30 text-primary"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </Carousel>
        </div>

        {/* Why Diverse Verticals - Moved Below Carousel */}
        <div className="mb-16 text-center">
          <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl p-8 max-w-4xl mx-auto border border-primary/10 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-foreground mb-4">Why Diverse Verticals?</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              India is diverse—so are its youth and their aspirations. Our model ensures multiple on-ramps 
              for discovery, cross-pollination between sectors, and one mission with many paths. 
              <span className="font-semibold text-foreground"> Diversity isn't distraction; it's design.</span>
            </p>
          </div>
        </div>

        {/* Community Section */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-muted/50 to-background border border-border/50 rounded-2xl p-12 space-y-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Users className="h-10 w-10 text-primary" />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-foreground">
                Community: Home of Hustlers (HOH)
              </h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Our volunteer network and growth engine. Everyone who joins as a volunteer enters HOH—a 
                peer network of doers focused on learning, accountability, and collaboration with 
                peak-performance habits and real ownership on live initiatives.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground">Volunteers</h4>
                <p className="text-sm text-muted-foreground">Contribute skills in productivity, counselling, teaching, tech, and more</p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <h4 className="font-semibold text-foreground">Collaborators</h4>
                <p className="text-sm text-muted-foreground">External experts joining specific missions</p>
              </div>
            </div>

            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg group"
              onClick={() => {
                const element = document.querySelector("#get-involved");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Join HOH Community
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const VerticalCard = ({ vertical, colorClasses }: { vertical: any, colorClasses: any }) => {
  return (
    <Card
      className={`group relative overflow-hidden hover:shadow-2xl transition-all duration-500 h-full ${colorClasses.bg} ${colorClasses.border} backdrop-blur-md`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-6 md:p-8 space-y-6 h-full flex flex-col">
        {/* Icon and Title */}
        <div className="flex items-center space-x-4">
          <div className={`p-3 md:p-4 rounded-2xl ${colorClasses.iconBg} ${colorClasses.iconText} group-hover:scale-110 transition-transform duration-300`}>
            <vertical.icon className="h-6 w-6 md:h-8 md:w-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              {vertical.title}
            </h3>
            <p className="text-base md:text-lg text-muted-foreground font-medium">
              {vertical.subtitle}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed flex-grow">
          {vertical.description}
        </p>

        {/* Features */}
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-accent" />
            Key Features
          </h4>
          <ul className="space-y-2">
            {vertical.features.slice(0, 3).map((feature: string, featureIndex: number) => (
              <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                <div className={`w-2 h-2 rounded-full mr-3 ${colorClasses.dot}`} />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Target Audience */}
        <div className="space-y-2">
          <h4 className="font-semibold text-foreground flex items-center">
            <Target className="h-4 w-4 mr-2 text-primary" />
            For: {vertical.audience}
          </h4>
        </div>

        {/* Outcomes */}
        <div className="space-y-2">
          <h4 className="font-semibold text-foreground flex items-center">
            <Heart className="h-4 w-4 mr-2 text-secondary" />
            Outcome
          </h4>
          <p className="text-sm text-muted-foreground italic">
            {vertical.outcome}
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-4 mt-auto">
          <Button 
            onClick={() => {
              const element = document.querySelector('#get-involved');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={`w-full group/btn ${colorClasses.button} hover:scale-[1.02] transition-all duration-300`}
          >
            Get Involved
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default WhatWeDo;