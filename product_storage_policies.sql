-- POLÍTICAS PARA EL BUCKET 'products-bucket'

-- Permitir que todos vean las imágenes
CREATE POLICY "Allow public access to product images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'products-bucket' );

-- Permitir que los usuarios autenticados suban imágenes
CREATE POLICY "Authenticated users can upload product images"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'products-bucket' AND auth.role() = 'authenticated' );

-- Permitir que los usuarios autenticados actualicen sus propias imágenes
CREATE POLICY "Authenticated users can update their own product images"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'products-bucket' AND auth.uid() = (storage.foldername(name))[1]::uuid )
WITH CHECK ( bucket_id = 'products-bucket' AND auth.uid() = (storage.foldername(name))[1]::uuid );

-- Permitir que los usuarios autenticados eliminen sus propias imágenes
CREATE POLICY "Authenticated users can delete their own product images"
ON storage.objects FOR DELETE
USING ( bucket_id = 'products-bucket' AND auth.uid() = (storage.foldername(name))[1]::uuid );
