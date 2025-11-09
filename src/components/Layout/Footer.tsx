import { Facebook, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {

  const navigation = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#founder" },
    { name: "What We Do", href: "#what-we-do" },
    { name: "Services", href: "#services" },
    { name: "Community", href: "#core-team" },
    { name: "Get Involved", href: "#get-involved" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-card via-muted/50 to-background border-t border-border/50 overflow-hidden">
      {/* Professional Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/3 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/3 rounded-full blur-3xl"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(hsl(var(--foreground)) 0.5px, transparent 0.5px),
              linear-gradient(90deg, hsl(var(--foreground)) 0.5px, transparent 0.5px)
            `,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Top Border Gradient */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Mission */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg p-1 border border-primary/20">
                <img 
                  src="/lovable-uploads/2800e3bc-4eaa-4b0c-8183-86de55d352da.png" 
                  alt="Yashray Foundation" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-foreground">
                Yashray Foundation
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering India's youth to learn, build, and lead for Viksit Bharat 2047. 
              Building pathways through skills, technology, culture, and opportunity.
            </p>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>Building Tomorrow's India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full mr-3"></div>
              Contact
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 group">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <a 
                  href="mailto:Team@Yashray.in"
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm pt-1"
                >
                  Team@Yashray.in
                </a>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <MapPin className="h-4 w-4 text-secondary" />
                </div>
                <p className="text-muted-foreground text-sm pt-1">
                  Haridwar, Uttarakhand, India
                </p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-secondary to-accent rounded-full mr-3"></div>
              Follow Us
            </h3>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="h-9 w-9 bg-primary/10 hover:bg-primary/20 border border-primary/20 group glow-on-hover">
                <Facebook className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 bg-secondary/10 hover:bg-secondary/20 border border-secondary/20 group glow-on-hover">
                <svg className="h-4 w-4 text-secondary group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 bg-accent/10 hover:bg-accent/20 border border-accent/20 group glow-on-hover">
                <Instagram className="h-4 w-4 text-accent group-hover:scale-110 transition-transform" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 bg-primary/10 hover:bg-primary/20 border border-primary/20 group glow-on-hover">
                <Linkedin className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              Join our community of changemakers
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30 mt-8 pt-8 flex flex-col sm:flex-row justify-center items-center bg-gradient-to-r from-transparent via-muted/20 to-transparent rounded-lg p-6">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <p className="text-muted-foreground text-sm">
              © 2025Yashray Foundation. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>•</span>
              <span>Youth Empowerment - Viksit Bharat 2047</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;