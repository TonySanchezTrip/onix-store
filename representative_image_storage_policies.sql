-- POLÍTICAS PARA EL BUCKET 'representative-images'

-- Permitir que todos vean las imágenes
CREATE POLICY "Allow public access to representative images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'representative-images' );

-- Permitir que los usuarios autenticados suban imágenes
CREATE POLICY "Authenticated users can upload representative images"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'representative-images' AND auth.role() = 'authenticated' );

-- Permitir que los usuarios autenticados actualicen sus propias imágenes
CREATE POLICY "Authenticated users can update their own representative images"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'representative-images' AND auth.uid() = (storage.foldername(name))[1]::uuid )
WITH CHECK ( bucket_id = 'representative-images' AND auth.uid() = (storage.foldername(name))[1]::uuid );

-- Permitir que los usuarios autenticados eliminen sus propias imágenes
CREATE POLICY "Authenticated users can delete their own representative images"
ON storage.objects FOR DELETE
USING ( bucket_id = 'representative-images' AND auth.uid() = (storage.foldername(name))[1]::uuid );
