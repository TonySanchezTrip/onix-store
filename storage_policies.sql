-- POLÍTICAS PARA EL BUCKET 'memories-bucket'

-- 1. Política para que los usuarios puedan VER sus propios archivos.
CREATE POLICY "Users can view their own files."
ON storage.objects FOR SELECT
TO authenticated
USING ( bucket_id = 'memories-bucket' AND auth.uid() = (storage.foldername(name))[1]::uuid );

-- 2. Política para que los usuarios puedan SUBIR archivos a su propia carpeta.
CREATE POLICY "Users can upload to their own folder."
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'memories-bucket' AND auth.uid() = (storage.foldername(name))[1]::uuid );

-- 3. Política para que los usuarios puedan BORRAR sus propios archivos.
CREATE POLICY "Users can delete their own files."
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'memories-bucket' AND auth.uid() = (storage.foldername(name))[1]::uuid );
