-- Create enum for NGO verification status
CREATE TYPE public.ngo_status AS ENUM ('pending', 'verified', 'rejected');

-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'ngo_admin', 'ngo_staff');

-- Create user roles table (for admin access)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Create NGOs table
CREATE TABLE public.ngos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  registration_number TEXT,
  description TEXT,
  logo_url TEXT,
  status ngo_status NOT NULL DEFAULT 'pending',
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create NGO members table (links users to NGOs)
CREATE TABLE public.ngo_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ngo_id UUID NOT NULL REFERENCES public.ngos(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'ngo_staff',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (ngo_id, user_id)
);

-- Create children profiles table
CREATE TABLE public.children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ngo_id UUID NOT NULL REFERENCES public.ngos(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT,
  gender TEXT,
  approximate_age INTEGER,
  rebirth_date DATE,
  story TEXT,
  photo_url TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create certificates table
CREATE TABLE public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  ngo_id UUID NOT NULL REFERENCES public.ngos(id) ON DELETE CASCADE,
  certificate_number TEXT NOT NULL UNIQUE,
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  qr_code_data TEXT,
  pdf_url TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create celebrations table
CREATE TABLE public.celebrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  ngo_id UUID NOT NULL REFERENCES public.ngos(id) ON DELETE CASCADE,
  celebration_date DATE NOT NULL,
  location TEXT,
  description TEXT,
  photos JSONB DEFAULT '[]'::jsonb,
  attendee_count INTEGER,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create donations table
CREATE TABLE public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name TEXT,
  donor_email TEXT,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  tier TEXT,
  child_id UUID REFERENCES public.children(id) ON DELETE SET NULL,
  ngo_id UUID REFERENCES public.ngos(id) ON DELETE SET NULL,
  stripe_payment_id TEXT,
  stripe_session_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  receipt_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table for additional user info
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ngos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ngo_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.celebrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Function to check if user is member of an NGO
CREATE OR REPLACE FUNCTION public.is_ngo_member(_user_id UUID, _ngo_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.ngo_members
    WHERE user_id = _user_id AND ngo_id = _ngo_id
  )
$$;

-- Function to get user's NGO ID
CREATE OR REPLACE FUNCTION public.get_user_ngo_id(_user_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT ngo_id FROM public.ngo_members
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for NGOs
CREATE POLICY "Anyone can view verified NGOs" ON public.ngos
  FOR SELECT USING (status = 'verified' OR public.is_ngo_member(auth.uid(), id) OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "NGO members can update their NGO" ON public.ngos
  FOR UPDATE USING (public.is_ngo_member(auth.uid(), id) OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated users can register NGO" ON public.ngos
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can delete NGOs" ON public.ngos
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for ngo_members
CREATE POLICY "NGO members can view their membership" ON public.ngo_members
  FOR SELECT USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "NGO admins can manage members" ON public.ngo_members
  FOR ALL USING (
    public.is_ngo_member(auth.uid(), ngo_id) OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Users can create initial membership" ON public.ngo_members
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- RLS Policies for children
CREATE POLICY "NGO members can view their children" ON public.children
  FOR SELECT USING (public.is_ngo_member(auth.uid(), ngo_id) OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "NGO members can create children" ON public.children
  FOR INSERT WITH CHECK (public.is_ngo_member(auth.uid(), ngo_id));

CREATE POLICY "NGO members can update their children" ON public.children
  FOR UPDATE USING (public.is_ngo_member(auth.uid(), ngo_id));

CREATE POLICY "NGO members can delete their children" ON public.children
  FOR DELETE USING (public.is_ngo_member(auth.uid(), ngo_id) OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for certificates
CREATE POLICY "NGO members can view their certificates" ON public.certificates
  FOR SELECT USING (public.is_ngo_member(auth.uid(), ngo_id) OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "NGO members can create certificates" ON public.certificates
  FOR INSERT WITH CHECK (public.is_ngo_member(auth.uid(), ngo_id));

-- RLS Policies for celebrations
CREATE POLICY "NGO members can view their celebrations" ON public.celebrations
  FOR SELECT USING (public.is_ngo_member(auth.uid(), ngo_id) OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "NGO members can manage celebrations" ON public.celebrations
  FOR ALL USING (public.is_ngo_member(auth.uid(), ngo_id));

-- RLS Policies for donations (public can create, only admins/recipients can view)
CREATE POLICY "Anyone can create donations" ON public.donations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins and NGOs can view donations" ON public.donations
  FOR SELECT USING (
    public.has_role(auth.uid(), 'admin') OR 
    (ngo_id IS NOT NULL AND public.is_ngo_member(auth.uid(), ngo_id))
  );

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger to update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_ngos_updated_at
  BEFORE UPDATE ON public.ngos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_children_updated_at
  BEFORE UPDATE ON public.children
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_celebrations_updated_at
  BEFORE UPDATE ON public.celebrations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Generate unique certificate number function
CREATE OR REPLACE FUNCTION public.generate_certificate_number()
RETURNS TEXT
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  year_part TEXT;
  seq_num INTEGER;
  cert_number TEXT;
BEGIN
  year_part := to_char(CURRENT_DATE, 'YYYY');
  SELECT COUNT(*) + 1 INTO seq_num FROM public.certificates 
  WHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE);
  cert_number := 'RB-' || year_part || '-' || LPAD(seq_num::TEXT, 6, '0');
  RETURN cert_number;
END;
$$;