import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTiltEffect } from "@/hooks/use-tilt-effect";
import { useCursorMagnetic } from "@/hooks/use-cursor-magnetic";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Users, Handshake, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const volunteerFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  hearAboutUs: z.string().min(1, "Please select how you heard about us"),
  interests: z.array(z.string()).min(1, "Please select at least one area of interest"),
  skills: z.string().min(10, "Please provide more details about your skills"),
  socialMediaLink: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  availability: z.enum(["yes", "no"], {
    required_error: "Please select your availability",
  }),
});

const investorFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  organization: z.string().min(2, "Organization name must be at least 2 characters"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  role: z.string().min(2, "Role/Title must be at least 2 characters"),
  natureOfInterest: z.string().min(1, "Please select the nature of your interest"),
  verticals: z.array(z.string()).min(1, "Please select at least one vertical"),
  proposal: z.string().min(20, "Please provide more details about your proposal"),
  contactMethod: z.string().min(5, "Please specify the best way to contact you"),
});

const GetInvolved = () => {
  const { toast } = useToast();
  const [volunteerDialogOpen, setVolunteerDialogOpen] = useState(false);
  const [investorDialogOpen, setInvestorDialogOpen] = useState(false);

  const volunteerForm = useForm<z.infer<typeof volunteerFormSchema>>({
    resolver: zodResolver(volunteerFormSchema),
    defaultValues: {
      interests: [],
    },
  });

  const investorForm = useForm<z.infer<typeof investorFormSchema>>({
    resolver: zodResolver(investorFormSchema),
    defaultValues: {
      verticals: [],
    },
  });

  const onVolunteerSubmit = async (values: z.infer<typeof volunteerFormSchema>) => {
    try {
      // Store in Supabase
      const { error: dbError } = await supabase
        .from('volunteer_submissions')
        .insert({
          full_name: values.fullName,
          email: values.email,
          phone: values.phone,
          hear_about_us: values.hearAboutUs,
          interests: values.interests,
          skills: values.skills,
          social_media_link: values.socialMediaLink || null,
          availability: values.availability,
        });

      if (dbError) throw dbError;

      // Send email
      const { error: emailError } = await supabase.functions.invoke('send-form-email', {
        body: {
          type: 'volunteer',
          data: {
            full_name: values.fullName,
            email: values.email,
            phone: values.phone,
            hear_about_us: values.hearAboutUs,
            interests: values.interests,
            skills: values.skills,
            social_media_link: values.socialMediaLink,
            availability: values.availability,
          }
        }
      });

      if (emailError) console.warn('Email sending failed:', emailError);
      
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest in volunteering. We'll contact you soon.",
      });
      
      volunteerForm.reset();
      setVolunteerDialogOpen(false);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  };

  const onInvestorSubmit = async (values: z.infer<typeof investorFormSchema>) => {
    try {
      // Store in Supabase
      const { error: dbError } = await supabase
        .from('investor_submissions')
        .insert({
          full_name: values.fullName,
          email: values.email,
          organization: values.organization,
          website: values.website || null,
          role: values.role,
          nature_of_interest: values.natureOfInterest,
          verticals: values.verticals,
          proposal: values.proposal,
          contact_method: values.contactMethod,
        });

      if (dbError) throw dbError;

      // Send email
      const { error: emailError } = await supabase.functions.invoke('send-form-email', {
        body: {
          type: 'investor',
          data: {
            full_name: values.fullName,
            email: values.email,
            organization: values.organization,
            website: values.website,
            role: values.role,
            nature_of_interest: values.natureOfInterest,
            verticals: values.verticals,
            proposal: values.proposal,
            contact_method: values.contactMethod,
          }
        }
      });

      if (emailError) console.warn('Email sending failed:', emailError);
      
      toast({
        title: "Proposal Submitted!",
        description: "Thank you for your interest. Our team will review your proposal and contact you shortly.",
      });
      
      investorForm.reset();
      setInvestorDialogOpen(false);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your proposal. Please try again.",
        variant: "destructive",
      });
    }
  };

  const interestOptions = [
    "Skill Development (Beyond Books)",
    "Hospitality (Divine Yatra, Vaidikam)",
    "Tech & AI (Scomedia)",
    "Financial Literacy (WealthyMinds)",
    "Community & Operations (HOH)",
    "General Support"
  ];

  const verticalOptions = [
    "Skill Development",
    "Hospitality",
    "Tech & AI",
    "Financial Literacy",
    "All Verticals"
  ];

  return (
    <section id="get-involved" className="py-24 bg-gradient-to-br from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Join Our Mission
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Be part of India's transformation. Whether you're looking to volunteer your time and skills 
            or invest in our vision, there's a place for you in our community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Volunteer Card */}
          <div className="group relative h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className={`relative bg-card border border-border/50 rounded-2xl p-8 space-y-6 hover:shadow-2xl transition-all duration-300 hover-lift glass-morphism glow-on-hover h-full flex flex-col justify-between`}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-primary" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Become a Volunteer</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Join our Home of Hustlers community and contribute your skills to empower India's youth. 
                  Be part of meaningful projects that create lasting impact.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  Flexible time commitment
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-3" />
                  Skill development opportunities
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                  Community of changemakers
                </div>
              </div>

              <Dialog open={volunteerDialogOpen} onOpenChange={setVolunteerDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group">
                    Apply as Volunteer
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center text-primary">
                      Volunteer Application
                    </DialogTitle>
                  </DialogHeader>
                  
                  <Form {...volunteerForm}>
                    <form onSubmit={volunteerForm.handleSubmit(onVolunteerSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={volunteerForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={volunteerForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="Enter your phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={volunteerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter your email address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={volunteerForm.control}
                        name="hearAboutUs"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>How did you hear about us?</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="social-media">Social Media</SelectItem>
                                <SelectItem value="friend-referral">Friend/Referral</SelectItem>
                                <SelectItem value="online-search">Online Search</SelectItem>
                                <SelectItem value="article-news">Article/News</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={volunteerForm.control}
                        name="interests"
                        render={() => (
                          <FormItem>
                            <FormLabel>Which areas are you most interested in contributing to?</FormLabel>
                            <div className="grid grid-cols-1 gap-3">
                              {interestOptions.map((option) => (
                                <FormField
                                  key={option}
                                  control={volunteerForm.control}
                                  name="interests"
                                  render={({ field }) => {
                                    return (
                                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(option)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, option])
                                                : field.onChange(
                                                    field.value?.filter((value) => value !== option)
                                                  );
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal leading-5">
                                          {option}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={volunteerForm.control}
                        name="skills"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tell us about your skills or what you hope to gain from volunteering with us</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your skills, experience, and motivation..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={volunteerForm.control}
                        name="socialMediaLink"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Link to any of your social media (Optional)</FormLabel>
                            <FormControl>
                              <Input type="url" placeholder="https://linkedin.com/in/yourprofile or other social media" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={volunteerForm.control}
                        name="availability"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Are you available to contribute a minimum of 7 hours per week?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-row space-x-6"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="yes" id="yes" />
                                  <Label htmlFor="yes">Yes</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="no" id="no" />
                                  <Label htmlFor="no">No</Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                        Submit Application
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Investor Card */}
          <div className="group relative h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className={`relative bg-card border border-border/50 rounded-2xl p-8 space-y-6 hover:shadow-2xl transition-all duration-300 hover-lift glass-morphism glow-on-hover h-full flex flex-col justify-between`}>
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                <Handshake className="h-8 w-8 text-secondary" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Partner with Us</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Join us as an investor or collaborator to scale our impact. Together, we can create 
                  sustainable solutions for India's youth empowerment.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  Strategic partnerships
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-3" />
                  Measurable impact
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3" />
                  Scalable solutions
                </div>
              </div>

              <Dialog open={investorDialogOpen} onOpenChange={setInvestorDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground group">
                    Partner with Us
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center text-secondary">
                      Partnership Proposal
                    </DialogTitle>
                  </DialogHeader>
                  
                  <Form {...investorForm}>
                    <form onSubmit={investorForm.handleSubmit(onInvestorSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={investorForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={investorForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="Enter your email address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={investorForm.control}
                          name="organization"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Organization / Company Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter organization name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={investorForm.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website</FormLabel>
                              <FormControl>
                                <Input type="url" placeholder="https://your-website.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={investorForm.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role / Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your role or title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={investorForm.control}
                        name="natureOfInterest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nature of your interest</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="financial-investment">Financial Investment</SelectItem>
                                <SelectItem value="corporate-partnership">Corporate Partnership</SelectItem>
                                <SelectItem value="project-collaboration">Project Collaboration</SelectItem>
                                <SelectItem value="expertise-mentorship">Expertise/Mentorship</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={investorForm.control}
                        name="verticals"
                        render={() => (
                          <FormItem>
                            <FormLabel>Which vertical(s) are you interested in discussing?</FormLabel>
                            <div className="grid grid-cols-1 gap-3">
                              {verticalOptions.map((option) => (
                                <FormField
                                  key={option}
                                  control={investorForm.control}
                                  name="verticals"
                                  render={({ field }) => {
                                    return (
                                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(option)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, option])
                                                : field.onChange(
                                                    field.value?.filter((value) => value !== option)
                                                  );
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal leading-5">
                                          {option}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={investorForm.control}
                        name="proposal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Please provide a brief summary of your proposal or how you would like to collaborate</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your proposal, investment interest, or collaboration ideas..."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={investorForm.control}
                        name="contactMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>What is the best way to contact you?</FormLabel>
                            <FormControl>
                              <Input placeholder="Email, phone, LinkedIn, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90">
                        Submit Proposal
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;