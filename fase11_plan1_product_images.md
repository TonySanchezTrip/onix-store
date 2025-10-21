## Tarea: Implementar carga de múltiples imágenes para Productos desde el Panel de Admin

**Objetivo:** Modificar la tabla `products` y el panel de admin para permitir la carga directa de múltiples imágenes a Supabase Storage, en lugar de usar un solo link. Esto habilitará el carrusel en el catálogo.

**Pasos a seguir:**

1.  **Modificar Tabla `products` (SQL):**
    * Genera un script SQL `ALTER TABLE` para la tabla `products`.
    * **Añade una nueva columna** llamada `image_urls` de tipo `text[]` (un array de texto).
    * (Opcional, pero recomendado) Elimina la antigua columna `image_url` si ya no se necesita, o mantenla como la imagen "principal". Por ahora, nos enfocaremos en `image_urls`.

2.  **Modificar Panel de Admin de Productos (Frontend):**
    * Localiza los formularios para crear y editar productos (ej. `src/app/admin/products/new/page.tsx` y `src/app/admin/products/edit/[id]/page.tsx`).
    * **Reemplaza el campo de texto** `image_url` con un componente de carga de archivos múltiples: `<input type="file" multiple />`.
    * **Implementa la lógica de subida:**
        * En la función que maneja el envío del formulario, toma la lista de archivos seleccionados.
        * Itera sobre cada archivo y súbelo a Supabase Storage al bucket `products-bucket` (que ya creamos). Usa una ruta única, por ejemplo: `public/producto_id/imagen_1.jpg`.
        * Recolecta todas las URLs públicas que Supabase te devuelve por cada imagen subida.
        * Guarda este **array de URLs** en la nueva columna `image_urls` de la tabla `products`.

**Acción final:** El administrador ahora podrá subir múltiples fotos para un solo producto directamente desde el formulario del panel de admin.