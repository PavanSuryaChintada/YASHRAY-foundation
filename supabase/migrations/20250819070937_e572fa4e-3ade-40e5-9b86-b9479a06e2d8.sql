-- Add restrictive SELECT policy to book_call_submissions table
-- This ensures that sensitive customer contact information cannot be read by unauthorized users
-- Only users with explicit admin privileges can access this data

CREATE POLICY "Restrict access to book call submissions" 
ON public.book_call_submissions 
FOR SELECT 
USING (false);

-- Alternative: If you want to allow specific admin users in the future, 
-- you can modify this policy or create an admin role system
-- For now, this completely restricts SELECT access via the API while 
-- still allowing dashboard access for business owners