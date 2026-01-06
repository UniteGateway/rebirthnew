-- Create table for date recommendations/votes
CREATE TABLE public.date_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  child_id UUID REFERENCES public.children(id) ON DELETE CASCADE,
  recommended_date DATE NOT NULL,
  voter_name TEXT,
  voter_email TEXT,
  blessing_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.date_recommendations ENABLE ROW LEVEL SECURITY;

-- Anyone can view recommendations (public participation)
CREATE POLICY "Anyone can view date recommendations"
ON public.date_recommendations
FOR SELECT
USING (true);

-- Anyone can submit a recommendation
CREATE POLICY "Anyone can submit date recommendations"
ON public.date_recommendations
FOR INSERT
WITH CHECK (true);

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.date_recommendations;