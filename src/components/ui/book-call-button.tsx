import { useState } from 'react';
import { Phone, Calendar, User, Phone as PhoneIcon } from 'lucide-react';
import { useLoadingState } from '@/hooks/use-loading-state';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  contactNumber: z.string().min(10, 'Contact number must be at least 10 digits'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  availableTime: z.string().min(1, 'Please select an available time'),
});

type FormData = z.infer<typeof formSchema>;

const timeSlots = [
  '9:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 1:00 PM',
  '2:00 PM - 3:00 PM',
  '3:00 PM - 4:00 PM',
  '4:00 PM - 5:00 PM',
  '5:00 PM - 6:00 PM',
];

export const BookCallButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoading = useLoadingState();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      contactNumber: '',
      subject: '',
      availableTime: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Store in Supabase
      const { error: dbError } = await supabase
        .from('book_call_submissions')
        .insert({
          name: data.name,
          contact_number: data.contactNumber,
          subject: data.subject,
          available_time: data.availableTime,
        });

      if (dbError) throw dbError;

      // Send email
      const { error: emailError } = await supabase.functions.invoke('send-form-email', {
        body: {
          type: 'book_call',
          data: {
            name: data.name,
            contact_number: data.contactNumber,
            subject: data.subject,
            available_time: data.availableTime,
          }
        }
      });

      if (emailError) console.warn('Email sending failed:', emailError);

      toast({
        title: "Thank you " + data.name + "!",
        description: "Our team will contact you soon!",
        duration: 5000,
      });
      
      setIsOpen(false);
      form.reset();
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) return null;

  return (
    <>
      {/* Floating Book Call Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-2xl h-16 px-8 shadow-xl bg-gradient-to-br from-primary via-primary/90 to-secondary hover:from-primary/90 hover:to-secondary/90 text-white border border-white/20 backdrop-blur-lg hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden font-medium"
        >
          {/* Modern glass morphism */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-white/10 to-transparent opacity-50" />
          <div className="absolute inset-0.5 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-30" />
          
          {/* Subtle inner glow */}
          <div className="absolute inset-0 rounded-2xl shadow-inner opacity-20" />
          
          <div className="flex items-center relative z-10">
            <div className="p-2 bg-white/20 rounded-xl mr-3 group-hover:bg-white/30 transition-colors duration-300">
              <Phone className="h-5 w-5 group-hover:-rotate-3 transition-transform duration-300" />
            </div>
            <div>
              <span className="block text-base font-semibold">Book a Call</span>
              <span className="block text-xs opacity-90 font-normal">Free Consultation</span>
            </div>
          </div>
          
          {/* Modern glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/50 to-secondary/50 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10" />
          
          {/* Animated accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-white to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
        </Button>
      </div>

      {/* Dialog Form */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-sm border border-border/50">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Book a Call</span>
            </DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Full Name</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2">
                      <PhoneIcon className="h-4 w-4" />
                      <span>Contact Number</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your contact number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2">
                      <span>Subject / Purpose of Call</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Brief description of what you'd like to discuss" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="availableTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Available Time</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your preferred time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 glow-on-hover"
              >
                Submit Request
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};