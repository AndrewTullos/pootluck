-- Create guests table for potluck planning
CREATE TABLE IF NOT EXISTS public.guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  item TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;

-- Allow all operations publicly (no auth needed for this simple app)
CREATE POLICY "Allow public read" ON public.guests FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON public.guests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete" ON public.guests FOR DELETE USING (true);
CREATE POLICY "Allow public update" ON public.guests FOR UPDATE USING (true);
