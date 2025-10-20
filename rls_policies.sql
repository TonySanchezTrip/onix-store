-- Policies for souvenirs table
CREATE POLICY "Allow authenticated users to view all souvenirs" ON public.souvenirs
  FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow owners to insert their own souvenirs" ON public.souvenirs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow owners to update their own souvenirs" ON public.souvenirs
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Allow owners to delete their own souvenirs" ON public.souvenirs
  FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for souvenir_locations table
CREATE POLICY "Allow authenticated users to view all souvenir locations" ON public.souvenir_locations
  FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow owners of associated souvenir to insert souvenir locations" ON public.souvenir_locations
  FOR INSERT
  WITH CHECK ((EXISTS ( SELECT 1
   FROM public.souvenirs
  WHERE (souvenirs.id = souvenir_locations.souvenir_id AND souvenirs.user_id = auth.uid()))));

CREATE POLICY "Allow owners of associated souvenir to update souvenir locations" ON public.souvenir_locations
  FOR UPDATE
  USING ((EXISTS ( SELECT 1
   FROM public.souvenirs
  WHERE (souvenirs.id = souvenir_locations.souvenir_id AND souvenirs.user_id = auth.uid()))));

CREATE POLICY "Allow owners of associated souvenir to delete souvenir locations" ON public.souvenir_locations
  FOR DELETE
  USING ((EXISTS ( SELECT 1
   FROM public.souvenirs
  WHERE (souvenirs.id = souvenir_locations.souvenir_id AND souvenirs.user_id = auth.uid()))));

-- Policies for digital_memories table
CREATE POLICY "Allow owners to manage their own digital memories" ON public.digital_memories
  FOR ALL
  USING (auth.uid() = user_id);