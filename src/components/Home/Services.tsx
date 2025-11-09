import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCursorMagnetic } from "@/hooks/use-cursor-magnetic";
import { useTiltEffect } from "@/hooks/use-tilt-effect";
import { 
  BookOpen, 
  Home, 
  Brain, 
  TrendingUp,
  MapPin,
  Users,
  Globe,
  Target
} from "lucide-react";

const Services = () => {
  const services = [
    {
      category: "Skill Development Services",
      icon: BookOpen,
      color: "primary",
      services: [
        "Communication Skills Training",
        "Mathematical Proficiency Programs",
        "Life Skills Development",
        "Leadership Training",
        "Career Readiness Workshops",
        "Confidence Building Sessions"
      ]
    },
    {
      category: "Hospitality Services",
      icon: Home,
      color: "secondary",
      services: [
        "Homestay Management (Uttarakhand)",
        "Cultural Tourism Experiences",
        "Yoga & Ayurveda Retreats",
        "Wellness Program Design",
        "Local Community Engagement",
        "Sustainable Tourism Consulting"
      ]
    },
    {
      category: "Tech & AI Solutions",
      icon: Brain,
      color: "accent",
      services: [
        "AI Workflow Automation",
        "Web Platform Development",
        "Digital System Design",
        "Youth Tech Training",
        "SMB Digital Transformation",
        "AI Literacy Programs"
      ]
    },
    {
      category: "Financial Education",
      icon: TrendingUp,
      color: "financial",
      services: [
        "Personal Finance Training",
        "Investment Education",
        "Risk Management Workshops",
        "Goal Planning Sessions",
        "Entrepreneurship Mentoring",
        "Financial Decision Making"
      ]
    }
  ];

  const branches = [
    {
      location: "Haridwar, Uttarakhand",
      type: "Main Operations Hub",
      focus: ["Divine Yatra Homestays", "Vaidikam Wellness", "Regional Coordination"],
      status: "Active"
    },
    {
      location: "Rishikesh, Uttarakhand", 
      type: "Wellness & Retreat Center",
      focus: ["Yoga Programs", "Ayurveda Retreats", "Spiritual Tourism"],
      status: "Active"
    },
    {
      location: "Dehradun, Uttarakhand",
      type: "Training & Development Center",
      focus: ["Beyond Books Programs", "Skill Development", "Youth Training"],
      status: "Active"
    },
    {
      location: "Pan-India Digital",
      type: "Technology Hub",
      focus: ["Scomedia Operations", "WealthyMinds Platform", "AI Solutions"],
      status: "Expanding"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return {
          bg: "bg-primary/10",
          text: "text-primary",
          border: "border-primary/20"
        };
      case "secondary":
        return {
          bg: "bg-secondary/10",
          text: "text-secondary",
          border: "border-secondary/20"
        };
      case "accent":
        return {
          bg: "bg-accent/10",
          text: "text-accent",
          border: "border-accent/20"
        };
      case "financial":
        return {
          bg: "bg-financial/10",
          text: "text-financial",
          border: "border-financial/20"
        };
      default:
        return {
          bg: "bg-primary/10",
          text: "text-primary",
          border: "border-primary/20"
        };
    }
  };

  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services Section */}
        <div className="mb-20">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive solutions across four key verticals designed to empower India's youth 
              and support sustainable development initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const colors = getColorClasses(service.color);
              const IconComponent = service.icon;
              const magneticRef = useCursorMagnetic({ strength: 0.2, distance: 40 });
              const tiltRef = useTiltEffect({ maxTilt: 5, scale: 1.02 });
              
              return (
                <Card 
                  key={index}
                  ref={magneticRef as any}
                  className={`group border-2 ${colors.border} card-3d cursor-pointer glass-morphism hover:bg-gradient-to-br hover:from-${service.color}/5 hover:to-${service.color}/10 overflow-hidden relative`}
                >
                  {/* Hover Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-${service.color}/0 to-${service.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <CardHeader className="pb-4 relative z-10">
                    <div className="flex items-center space-x-4">
                      <div 
                        ref={tiltRef as any}
                        className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center group-hover:scale-125 group-hover:rotate-3 transition-all duration-500 shimmer relative overflow-hidden`}
                      >
                        <IconComponent className={`h-7 w-7 ${colors.text} relative z-10`} />
                        <div className={`absolute inset-0 bg-gradient-to-br from-${service.color}/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{service.category}</h3>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4 relative z-10">
                    <div className="grid grid-cols-1 gap-3">
                      {service.services.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-3 group/item">
                          <div className={`w-2 h-2 ${colors.text.replace('text-', 'bg-')} rounded-full flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300`} />
                          <span className="text-muted-foreground group-hover/item:text-foreground transition-colors duration-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Branches Section */}
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Our Branches
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Strategic locations across India to maximize our impact and reach communities 
              where transformation is most needed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {branches.map((branch, index) => {
              const magneticRef = useCursorMagnetic({ strength: 0.15, distance: 35 });
              const tiltRef = useTiltEffect({ maxTilt: 3, scale: 1.01 });
              
              return (
              <Card 
                key={index} 
                ref={magneticRef as any}
                className="group border border-border/50 card-3d cursor-pointer glass-morphism hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5 relative overflow-hidden"
              >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <div 
                          ref={tiltRef as any}
                          className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-2 transition-all duration-500 shimmer relative overflow-hidden"
                        >
                          <MapPin className="h-6 w-6 text-primary relative z-10" />
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{branch.location}</h3>
                          <p className="text-secondary font-semibold">{branch.type}</p>
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant={branch.status === "Active" ? "default" : "secondary"}
                      className={branch.status === "Active" ? "bg-secondary/20 text-secondary" : ""}
                    >
                      {branch.status}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4 relative z-10">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center">
                      <Target className="h-4 w-4 text-primary mr-2" />
                      Focus Areas:
                    </h4>
                    <div className="space-y-2">
                      {branch.focus.map((area, idx) => (
                        <div key={idx} className="flex items-center space-x-3 group/area">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 group-hover/area:scale-150 transition-transform duration-300" />
                          <span className="text-muted-foreground group-hover/area:text-foreground transition-colors duration-300">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              );
            })}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-12 space-y-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Globe className="h-10 w-10 text-primary" />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-foreground">
                Building Tomorrow's India, Today
              </h3>
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Through our comprehensive services and strategic branch locations, we're creating 
                a network of empowerment that reaches every corner of India. Our mission is simple: 
                ensure that no young person is left behind in the journey toward Viksit Bharat 2047.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-3xl mx-auto pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">4</div>
                <div className="text-sm text-muted-foreground">Service Verticals</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">3+</div>
                <div className="text-sm text-muted-foreground">Active Branches</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">1000+</div>
                <div className="text-sm text-muted-foreground">Youth Reached</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">2047</div>
                <div className="text-sm text-muted-foreground">Our Target</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;