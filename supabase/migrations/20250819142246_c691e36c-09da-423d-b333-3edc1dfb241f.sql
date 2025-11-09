-- Add restrictive SELECT policy to volunteer_submissions table
-- This ensures that sensitive volunteer personal information cannot be read by unauthorized users
-- Protects volunteer names, emails, phone numbers, and other personal data from unauthorized access

CREATE POLICY "Restrict access to volunteer submissions" 
ON public.volunteer_submissions 
FOR SELECT 
USING (false);

-- This completely blocks SELECT access via the API while preserving volunteer application functionality
-- Volunteer submissions will still work, but the data cannot be read by unauthorized users