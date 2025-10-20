## Tarea: Crear backend y panel de admin para "Lugares Importantes" e "Imágenes Representativas"

**Objetivo:** Crear una nueva tabla en Supabase para "Lugares Importantes" y modificar la tabla "Souvenirs" para que pueda almacenar múltiples imágenes representativas. Luego, construir las páginas de administración para gestionar ambos.

**Pasos a seguir:**

1.  **Crear Tabla `important_locations` (SQL):**
    * Genera un script SQL para crear una nueva tabla llamada `important_locations` con las siguientes columnas:
        * `id` (uuid, llave primaria)
        * `name` (text, no nulo)
        * `description` (text)
        * `address` (text)
        * `Maps_url` (text, no nulo)
        * `created_at` (timestampz, con valor por defecto `now()`)

2.  **Modificar Tabla `souvenirs` (SQL):**
    * Genera un script SQL `ALTER TABLE` para añadir una nueva columna a la tabla `souvenirs` llamada `representative_image_urls` de tipo `text[]` (un array de texto). Esta columna almacenará las URLs de las fotos del lugar, separadas de los recuerdos del usuario.

3.  **Crear Página de Admin para "Lugares Importantes" (`/admin/locations`):**
    * Crea una nueva ruta de página en `src/app/admin/locations/page.tsx`.
    * Esta página debe permitir la gestión CRUD (Crear, Leer, Actualizar, Eliminar) completa para la nueva tabla `important_locations`.
    * Debe mostrar una tabla de todos los lugares existentes.
    * Debe tener un botón "Crear Nuevo Lugar" que lleve a un formulario para añadir una nueva entrada (`name`, `description`, `address`, `Maps_url`).
    * Debe tener botones de "Editar" y "Eliminar" para cada lugar.

4.  **Modificar Página de Admin "Editar Souvenir" (`/admin/souvenirs/[id]`):**
    * Modifica la página existente `src/app/admin/souvenirs/[id]/page.tsx` (la de la captura).
    * Debajo del campo "Public URL (iFrame)", añade un nuevo campo de formulario para gestionar la columna `representative_image_urls`.
    * La forma más simple es usar un `<textarea>` donde el administrador pueda pegar una lista de URLs, una por línea. El código deberá convertir este texto en un array de strings antes de guardarlo en Supabase.

**Acción final:** Después de ejecutar el SQL en Supabase y generar el código, el panel de admin tendrá una nueva sección funcional para "Lugares Importantes" y el formulario de "Editar Souvenir" tendrá un nuevo campo para las imágenes del lugar.