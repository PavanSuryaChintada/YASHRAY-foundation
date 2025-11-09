-- Add social_media_link column to volunteer_submissions table
ALTER TABLE public.volunteer_submissions 
ADD COLUMN social_media_link TEXT;

-- Add subject column to book_call_submissions table  
ALTER TABLE public.book_call_submissions 
ADD COLUMN subject TEXT NOT NULL DEFAULT '';