-- Create tables for storing form submissions

-- Table for book call submissions
CREATE TABLE public.book_call_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  contact_number TEXT NOT NULL,
  available_time TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for volunteer form submissions
CREATE TABLE public.volunteer_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  hear_about_us TEXT NOT NULL,
  interests TEXT[] NOT NULL,
  skills TEXT NOT NULL,
  availability TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for partner/investor form submissions
CREATE TABLE public.investor_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT NOT NULL,
  website TEXT,
  role TEXT NOT NULL,
  nature_of_interest TEXT NOT NULL,
  verticals TEXT[] NOT NULL,
  proposal TEXT NOT NULL,
  contact_method TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE public.book_call_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investor_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies to allow anonymous insertions (for form submissions)
CREATE POLICY "Allow anonymous insertions for book call submissions" 
ON public.book_call_submissions 
FOR INSERT 
TO anon
WITH CHECK (true);

CREATE POLICY "Allow anonymous insertions for volunteer submissions" 
ON public.volunteer_submissions 
FOR INSERT 
TO anon
WITH CHECK (true);

CREATE POLICY "Allow anonymous insertions for investor submissions" 
ON public.investor_submissions 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_book_call_submissions_updated_at
  BEFORE UPDATE ON public.book_call_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_volunteer_submissions_updated_at
  BEFORE UPDATE ON public.volunteer_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_investor_submissions_updated_at
  BEFORE UPDATE ON public.investor_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Table for cookie consent tracking
CREATE TABLE public.cookie_consent (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  consent_given BOOLEAN NOT NULL DEFAULT false,
  consent_types JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.cookie_consent ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous cookie consent operations" 
ON public.cookie_consent 
FOR ALL 
TO anon
USING (true)
WITH CHECK (true);

CREATE TRIGGER update_cookie_consent_updated_at
  BEFORE UPDATE ON public.cookie_consent
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();