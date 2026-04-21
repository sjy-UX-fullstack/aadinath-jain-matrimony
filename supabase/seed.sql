-- Supabase schema and dummy data for Adinath Matrimony

-- 1. Create Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  age integer NOT NULL,
  height_cm integer NOT NULL,
  gender text,
  marital_status text,
  sub_sect text,
  sub_sect_branch text,
  current_city text,
  current_state text,
  diet text,
  manglik_status text,
  highest_qualification text,
  occupation text,
  annual_income_range text,
  paternal_gotra text,
  maternal_gotra text,
  family_type text,
  about_me text,
  willing_to_relocate boolean DEFAULT true,
  verification_status text DEFAULT 'pending',
  profile_photo_url text,
  created_at timestamp with time zone DEFAULT now()
);

-- 2. Insert Dummy Profiles
INSERT INTO public.profiles (
  id, full_name, age, height_cm, gender, marital_status, sub_sect, sub_sect_branch,
  current_city, current_state, diet, manglik_status, highest_qualification, occupation,
  annual_income_range, paternal_gotra, maternal_gotra, family_type, about_me,
  willing_to_relocate, verification_status, profile_photo_url
) VALUES 
('11111111-1111-1111-1111-111111111111', 'Arjun Jain', 28, 175, 'male', 'never_married', 'digambar', 'bisapanthi', 
 'Indore', 'Madhya Pradesh', 'strict_jain', 'non_manglik', 'MBA', 'business', 
 '20L - 30L', 'Garg', 'Goyal', 'joint', 'Looking for a supportive partner.', 
 true, 'verified', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80'),

('22222222-2222-2222-2222-222222222222', 'Neha Shah', 26, 162, 'female', 'never_married', 'shwetambar', 'murtipujak', 
 'Mumbai', 'Maharashtra', 'strict_jain', 'non_manglik', 'B.Tech', 'software_engineer', 
 '15L - 20L', 'Shah', 'Mehta', 'nuclear', 'Software dev and nature lover.', 
 false, 'verified', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80'),

('33333333-3333-3333-3333-333333333333', 'Rahul Mehta', 30, 180, 'male', 'never_married', 'digambar', 'terapanthi', 
 'Pune', 'Maharashtra', 'vegetarian', 'manglik', 'MD', 'doctor', 
 '30L+', 'Bansal', 'Jindal', 'nuclear', 'Doctor by profession. Family oriented.', 
 true, 'pending', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80')
ON CONFLICT DO NOTHING;
