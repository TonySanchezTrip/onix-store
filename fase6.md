## Tarea: Crear un Panel de Administración completo para Tienda y Souvenirs

**Objetivo:** Implementar una sección privada en la web (`/admin`) donde el administrador pueda gestionar tanto los productos de la tienda (`products`) como la información de la experiencia NFC (`souvenirs`).

**Supuesto:**
* Existe una tabla `profiles` con una columna `role`. El usuario administrador tiene el rol "admin".

**Pasos a seguir:**

1.  **Crear el Layout del Panel de Administración:**
    * Crea una nueva ruta de grupo en `src/app/admin/`.
    * Dentro, crea un `layout.tsx` que proteja todas las rutas hijas. Este layout debe:
        * Verificar la sesión del usuario en el servidor y obtener su perfil de la tabla `profiles`.
        * Comprobar si el `role` del usuario es "admin".
        * Si el usuario no es admin o no ha iniciado sesión, **redirigirlo inmediatamente** a la página de inicio (`/`).
        * Si es admin, mostrar un menú de navegación lateral simple con dos enlaces:
            * **Gestionar Productos** (que lleve a `/admin/products`)
            * **Gestionar Souvenirs** (que lleve a `/admin/souvenirs`)
        * A la derecha del menú, debe mostrar el contenido de la página (el `children`).

2.  **Módulo de Gestión de Productos (`/admin/products`):**
    * Crea la página en `src/app/admin/products/page.tsx`.
    * Debe obtener y mostrar todos los registros de la tabla `products` en una tabla HTML.
    * La tabla debe incluir botones para **Editar** y **Eliminar** en cada fila.
    * Añade un botón "Crear Nuevo Producto" que lleve a una página de formulario para añadir nuevas entradas.
    * Implementa los formularios y la lógica CRUD (Crear, Leer, Actualizar, Eliminar) para la tabla `products`.

3.  **Módulo de Gestión de Souvenirs (`/admin/souvenirs`):**
    * Crea la página en `src/app/admin/souvenirs/page.tsx`.
    * Debe obtener y mostrar todos los registros de la tabla `souvenirs` en una tabla HTML.
    * La tabla debe mostrar columnas clave como `Nombre`, `Descripción`, y la `URL Pública`.
    * En cada fila, incluye un botón de **"Editar"**.
    * Implementa el formulario de edición para que el administrador pueda cambiar el `name`, `description`, y `public_url` de cada souvenir.

**Acción final:** Después de generar el código, al iniciar sesión con tu cuenta de admin, deberías poder acceder a `http://localhost:3000/admin` y ver el panel, mientras que cualquier otro usuario sería redirigido.