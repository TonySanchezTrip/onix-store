ALTER TABLE public.souvenirs ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
