CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL CHECK (char_length(email) <= 255),
  message TEXT NOT NULL CHECK (char_length(message) BETWEEN 1 AND 4000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_submissions TO anon;
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors can submit contact messages"
  ON public.contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (
    char_length(trim(email)) BETWEEN 3 AND 255
    AND position('@' IN email) > 1
    AND char_length(trim(message)) BETWEEN 1 AND 4000
  );