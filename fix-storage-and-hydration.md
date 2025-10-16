## Tarea: Solucionar error de seguridad en Supabase Storage y error de hidratación

**Objetivo:** Arreglar dos problemas críticos:
1.  Un error de `new row violates row-level security policy` que impide a los usuarios subir archivos al Storage.
2.  Un error de hidratación causado por una discrepancia en el atributo `lang` del HTML.

---

### **Parte 1: Solucionar el Error de Seguridad del Almacenamiento**

**Problema:** No existen políticas de seguridad (RLS) para el bucket `memories-bucket` en Supabase Storage, por lo que se rechazan todas las subidas de archivos.

**Solución:**
1.  Crear las políticas de seguridad necesarias en Supabase para permitir a los usuarios gestionar archivos únicamente dentro de una carpeta personal.
2.  Modificar el código del frontend para que suba los archivos a esa carpeta personal.

**Pasos a seguir:**

1.  **Crear Políticas de Storage:**
    * Genera un nuevo archivo SQL llamado `storage_policies.sql`.
    * Pega el siguiente código en ese archivo para definir las reglas de seguridad. Este script permite a los usuarios autenticados subir, ver y eliminar archivos solo si están en una carpeta con su propio ID de usuario.
    ```sql
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
    ```

2.  **Modificar el Código de Subida de Archivos:**
    * Localiza el componente del frontend responsable de subir los recuerdos (probablemente en `src/components/MemoriesSection.tsx` o similar).
    * Busca la función que contiene la llamada a `supabase.storage.from('memories-bucket').upload(...)`.
    * Modifica esa función para que construya la ruta del archivo usando el ID del usuario actual. El path final debe ser `ID_DEL_USUARIO/nombre_del_archivo`.

    **Ejemplo de la modificación:**
    ```typescript
    // Obtén el ID del usuario (ej. de la sesión actual)
    const userId = session.user.id;

    // Construye la nueva ruta del archivo
    const filePath = `${userId}/${file.name}`;

    // Llama a la función de subida con la ruta correcta
    const { data, error } = await supabase
      .storage
      .from('memories-bucket')
      .upload(filePath, file);
    ```

---

### **Parte 2: Solucionar el Error de Hidratación**

**Problema:** El HTML renderizado en el servidor tiene `<html lang="en">` mientras que el cliente espera `<html lang="es">`.

**Solución:** Estandarizar el idioma a "es" en el layout principal.

**Pasos a seguir:**

1.  **Abre el archivo** `src/app/layout.tsx`.
2.  **Cambia la línea** `<html lang="en">` por `<html lang="es">`.

---

**Acción final:** Después de aplicar estos cambios, los usuarios autenticados podrán subir sus recuerdos a una carpeta segura y personal, y el error de hidratación desaparecerá de la aplicación.