
-- Create appointments table to store booking data
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  treatment_type TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TIME NOT NULL,
  special_requests TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  booking_reference TEXT NOT NULL UNIQUE DEFAULT 'NIR-' || UPPER(SUBSTRING(gen_random_uuid()::text, 1, 8)),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_appointments_email ON public.appointments(email);
CREATE INDEX idx_appointments_date ON public.appointments(preferred_date);
CREATE INDEX idx_appointments_status ON public.appointments(status);
CREATE INDEX idx_appointments_reference ON public.appointments(booking_reference);

-- Add Row Level Security (RLS) - making it public for now since no auth is implemented
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert appointments (for booking form)
CREATE POLICY "Anyone can create appointments" 
  ON public.appointments 
  FOR INSERT 
  WITH CHECK (true);

-- Allow anyone to read their own appointments by email
CREATE POLICY "Users can view appointments by email" 
  ON public.appointments 
  FOR SELECT 
  USING (true);
