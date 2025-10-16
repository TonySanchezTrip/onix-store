## Tarea: Implementar la página de experiencia del souvenir NFC

**Objetivo:** Crear una página dinámica que muestre información pública de un souvenir y una sección privada de recuerdos digitales para el usuario autenticado, obteniendo todos los datos de Supabase.

**Supuestos:**
* Existen dos tablas en Supabase: `souvenirs` (con columnas `id`, `name`, `description`, `public_url`) y `digital_memories` (con `id`, `user_id`, `souvenir_id`, `file_url`, `file_type`).
* Supabase Storage tiene un bucket llamado `memories-bucket` para guardar los archivos.

**Pasos a seguir:**

1.  **Crear la Ruta y la Página Dinámica del Souvenir:**
    * Crea una nueva ruta dinámica en `src/app/souvenir/[id]/page.tsx`.
    * Esta página principal debe ser un **Server Component** de Next.js.
    * Debe extraer el `id` del souvenir de los parámetros de la URL.
    * Usando el `id`, debe hacer una consulta al servidor para obtener los datos del souvenir correspondiente desde la tabla `souvenirs` en Supabase.
    * Si el souvenir no se encuentra, debe mostrar una página de "No encontrado".

2.  **Mostrar la Información Pública del Souvenir:**
    * En la parte superior de la página, renderiza los datos públicos obtenidos en el paso anterior:
        * Muestra el `name` del souvenir como título principal.
        * Muestra la `description` en un párrafo.
        * Incrusta un `iframe` cuya fuente (`src`) sea la `public_url` del souvenir.

3.  **Crear el Componente Interactivo de Recuerdos:**
    * Crea un nuevo componente de cliente en `src/components/MemoriesSection.tsx`. Debe tener la directiva `"use client"` al inicio.
    * Este componente debe aceptar el `souvenir_id` como una prop.
    * La página principal (`/souvenir/[id]/page.tsx`) debe importar y renderizar este componente debajo de la información pública, pasándole el `id` del souvenir.

4.  **Implementar la Lógica Condicional en `MemoriesSection.tsx`:**
    * Dentro de este componente, utiliza los helpers de autenticación de Supabase para verificar si hay un usuario con sesión activa.
    * **Si NO hay usuario logueado:** Muestra el componente de inicio de sesión que ya creaste en la Fase 2, invitando al usuario a acceder.
    * **Si SÍ hay un usuario logueado:** Procede a mostrar la sección de recuerdos privados.

5.  **Implementar la Sección de Recuerdos Privados (para usuarios logueados):**
    * **Obtener y Mostrar Recuerdos:**
        * Realiza una consulta a la tabla `digital_memories` para obtener todos los registros que coincidan con el `user_id` del usuario actual Y con el `souvenir_id` recibido por las props.
        * Mapea los resultados y muéstralos en una cuadrícula (grid). Cada item de la cuadrícula debe mostrar el archivo (imagen o video) usando la `file_url`.
    * **Implementar el Formulario de Carga:**
        * Añade un formulario que permita al usuario subir nuevos recuerdos. Debe contener un `input` de tipo `file` y un botón de "Subir Recuerdo".
        * Al enviar el formulario, ejecuta la siguiente lógica:
            1.  Sube el archivo seleccionado al `memories-bucket` en Supabase Storage.
            2.  Una vez subido, obtén la URL pública del archivo.
            3.  Inserta una nueva fila en la tabla `digital_memories` con el `user_id` actual, el `souvenir_id`, la `file_url` recién obtenida y el tipo de archivo.
            4.  Refresca la lista de recuerdos para que el nuevo archivo aparezca inmediatamente sin necesidad de recargar la página.

**Acción final:** Un usuario que visite `http://localhost:3000/souvenir/un-id-real` verá la información del souvenir y, si inicia sesión, podrá ver y añadir sus propios recuerdos digitales asociados a ese souvenir específico.