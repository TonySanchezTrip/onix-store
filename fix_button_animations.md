## Tarea: Re-aplicar las animaciones de transición a los botones

**Problema:** Las animaciones `hover` (al pasar el ratón) no se están aplicando a los botones.

**Solución:** Añadir explícitamente las clases de utilidad de Tailwind para transición y efectos `hover` a los componentes de botón clave.

**Pasos a seguir:**

1.  **Objetivo:** Aplicar un efecto `hover` consistente a los botones. Las clases que usaremos son:
    * `transition-all`
    * `duration-300`
    * `ease-in-out`
    * `hover:scale-105`
    * `hover:opacity-90` (o `hover:brightness-110`)
    * `hover:shadow-lg`

2.  **Modificar el Formulario de Recuerdos (`MemoriesSection.tsx`):**
    * Busca el `<input type="file">` y su `<label>`. Asegúrate de que el `<label>` (que parece un botón) tenga estas clases de transición y hover.
    * Busca el botón de "Subir". Añade todas las clases de transición y hover listadas arriba.

3.  **Modificar la Página de Producto (`product/[id]/page.tsx`):**
    * Busca los botones "Agregar al Carrito" y "Comprar Ahora".
    * Añade todas las clases de transición y hover listadas arriba a ambos botones.

4.  **Modificar el Panel de Admin:**
    * Busca los botones de "Guardar" en las páginas de admin (ej. `admin/souvenirs/[id]/page.tsx`).
    * Añade todas las clases de transición y hover listadas arriba.

**Acción final:** Los botones más importantes de la aplicación ahora tendrán una animación sutil (escala y sombra) al pasar el ratón por encima.