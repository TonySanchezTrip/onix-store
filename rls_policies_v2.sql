-- Drop existing policies
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON public.souvenirs;
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON public.souvenir_locations;

-- Policies for souvenirs table
CREATE POLICY "Authenticated users can insert souvenirs" ON public.souvenirs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update their own souvenirs" ON public.souvenirs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Authenticated users can delete their own souvenirs" ON public.souvenirs FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Souvenirs are visible to everyone" ON public.souvenirs FOR SELECT USING (true);

-- Policies for souvenir_locations table
CREATE POLICY "Authenticated users can insert souvenir_locations" ON public.souvenir_locations FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update their own souvenir_locations" ON public.souvenir_locations FOR UPDATE USING (auth.uid() IN (SELECT user_id FROM souvenirs WHERE id = souvenir_id));
CREATE POLICY "Authenticated users can delete their own souvenir_locations" ON public.souvenir_locations FOR DELETE USING (auth.uid() IN (SELECT user_id FROM souvenirs WHERE id = souvenir_id));
CREATE POLICY "Souvenir_locations are visible to everyone" ON public.souvenir_locations FOR SELECT USING (true);
