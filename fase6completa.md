## Tarea: Crear un Panel de Administración completo para Tienda y Souvenirs

**Objetivo:** Implementar una sección privada en la web (`/admin`) donde el administrador pueda gestionar tanto los productos de la tienda (`products`) como la información de la experiencia NFC (`souvenirs`).

**Supuesto:**
* Existe una columna `role` en la tabla de perfiles de usuario. El usuario administrador tiene el rol "admin".

**Pasos a seguir:**

1.  **Crear el Layout del Panel de Administración:**
    * Crea una ruta de grupo en `src/app/admin/`.
    * Dentro, crea un `layout.tsx` que proteja todas las rutas hijas. Este layout debe:
        * Verificar si el `role` del usuario es "admin". Si no lo es, redirigirlo a la página de inicio (`/`).
        * Mostrar un menú de navegación lateral simple con dos enlaces:
            * **Gestionar Productos** (que lleve a `/admin/products`)
            * **Gestionar Souvenirs** (que lleve a `/admin/souvenirs`)

2.  **Módulo de Gestión de Productos (`/admin/products`):**
    * Crea la página en `src/app/admin/products/page.tsx`.
    * Debe mostrar una tabla con todos los registros de la tabla `products`.
    * La tabla debe incluir botones para **Editar** y **Eliminar** cada producto.
    * Añade un botón "Crear Nuevo Producto" para añadir nuevas entradas.
    * Implementa los formularios y la lógica CRUD (Crear, Leer, Actualizar, Eliminar) para la tabla `products`. *(Esta parte es igual al plan anterior)*.

3.  **Módulo de Gestión de Souvenirs (`/admin/souvenirs`):**
    * Crea la página en `src/app/admin/souvenirs/page.tsx`.
    * Debe mostrar una tabla con todos los registros de la tabla `souvenirs`.
    * La tabla debe mostrar columnas clave como `Nombre`, `Descripción`, y la `URL Pública`.
    * En cada fila, incluye un botón de **"Editar"**. (Normalmente no se eliminan souvenirs, solo se editan).

4.  **Implementar la Edición de Souvenirs:**
    * Crea una página de edición dinámica en `src/app/admin/souvenirs/[id]/page.tsx`.
    * Esta página mostrará un formulario con los datos del souvenir seleccionado.
    * Los campos editables del formulario deben ser:
        * `name` (Nombre)
        * `description` (Descripción)
        * `public_url` (La URL del iframe)
    * Al enviar el formulario, se debe ejecutar una función `update` en Supabase para guardar los cambios en la fila correspondiente de la tabla `souvenirs`.

**Acción final:** Al iniciar sesión como administrador, podrás navegar a `/admin` y tener un control total tanto sobre los productos que vendes en la tienda como sobre la información específica que se muestra cuando un cliente escanea su souvenir NFC.