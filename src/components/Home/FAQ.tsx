import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqSections = [
    {
      category: "General Questions",
      questions: [
        {
          question: "What is the core vision of Yashray Foundation?",
          answer: "Our core vision is 'Youth Empowerment - Viksit Bharat 2047.' We aim to help India's youth learn, build, and lead so they can meaningfully contribute to a developed India by 2047."
        },
        {
          question: "What makes Yashray Foundation's approach unique?",
          answer: "We believe in a multi-faceted approach. Our model is based on multiple on-ramps—Skill Development, Hospitality, Tech & AI, and Financial Literacy—to ensure that no young person is left out and can find a path that aligns with their strengths and aspirations. This diversity is by design, not distraction."
        }
      ]
    },
    {
      category: "Questions about Our Verticals",
      questions: [
        {
          question: "How does the Skill Development vertical, 'Beyond Books,' work?",
          answer: "'Beyond Books' closes the gap between traditional schooling and real-world skills. We offer practical training in communication, problem-solving, values-led leadership, and career readiness for students and early professionals."
        },
        {
          question: "What is 'Divine Yatra'?",
          answer: "Divine Yatra is our hospitality project focused on sustainable tourism. We curate homestays and guided experiences in Uttarakhand to preserve local culture and create economic uplift for local hosts and youth."
        },
        {
          question: "How does 'Scomedia' help?",
          answer: "Scomedia is our Tech & AI vertical that prepares youth and businesses for the future. We provide AI-powered workflows and digital systems for small businesses and offer upskilling opportunities for youth through real-world projects."
        },
        {
          question: "What is the goal of the 'WealthyMinds' project?",
          answer: "WealthyMinds aims to cultivate financial literacy from a young age. We teach personal finance fundamentals, including earning, saving, investing, and risk awareness, to help youth build independent and stable lives."
        }
      ]
    },
    {
      category: "Questions for Volunteers & Collaborators",
      questions: [
        {
          question: "How can I become a volunteer?",
          answer: "You can join our volunteer network, the Home of Hustlers (HOH), by clicking the 'Interested as Volunteer' button on our website. You'll fill out a form, and our team will get in touch to find the best project for your skills and interests."
        },
        {
          question: "Do volunteers get paid?",
          answer: "No, Yashray Foundation is a non-profit organization. Our volunteers are part of the HOH community, and their contributions are driven by a shared mission to create positive change."
        },
        {
          question: "How can I partner with or invest in the foundation?",
          answer: "We welcome collaborators and investors who share our vision. Please click the 'Interested as Investor / Collaborator' button and fill out the form. A member of our core team will review your proposal and contact you to discuss potential partnerships."
        }
      ]
    }
  ];

  return (
    <section id="faq" className="py-24 bg-gradient-to-br from-muted/30 to-background relative overflow-hidden">
      {/* Professional Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float delay-500"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about Yashray Foundation, our projects, 
            and how you can get involved in our mission.
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-12">
          {faqSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground text-center mb-8 pb-4 border-b border-border/50">
                {section.category}
              </h3>
              
               <Accordion type="single" collapsible className="space-y-6">
                {section.questions.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`${sectionIndex}-${index}`}
                    className="group relative overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all duration-700 hover-lift"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--card) / 0.8), hsl(var(--card) / 0.9))',
                      boxShadow: '0 8px 32px -8px hsl(var(--foreground) / 0.1)',
                      transform: 'translateZ(0)',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* 3D Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                    
                    {/* Enhanced 3D Border Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <AccordionTrigger className="relative z-10 text-left hover:no-underline px-8 py-8 text-lg font-semibold text-foreground hover:text-primary transition-all duration-500 group-hover:translate-x-2">
                      <span className="relative">
                        {faq.question}
                        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="relative z-10 px-8 pb-8 text-muted-foreground leading-relaxed text-base transition-all duration-500">
                      <div className="pt-2 border-t border-border/20">
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 pt-12 border-t border-border/50">
          <div className="card-3d bg-gradient-to-br from-primary/8 via-secondary/8 to-accent/8 rounded-2xl p-8 space-y-6 glass-morphism relative overflow-hidden group">
            {/* 3D Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            
            <h3 className="text-2xl font-bold text-foreground relative z-10">
              Still have questions?
            </h3>
            <p className="text-muted-foreground relative z-10">
              We're here to help! Reach out to us and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 relative z-10">
              <a 
                href="mailto:Team@Yashray.in" 
                className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold transition-colors glow-on-hover"
              >
                Contact Us
              </a>
              <button 
                onClick={() => {
                  const element = document.querySelector("#get-involved");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="inline-flex items-center px-6 py-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full font-semibold transition-colors glow-on-hover"
              >
                Get Involved
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;