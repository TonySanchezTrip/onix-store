## Tarea: Aplicar animaciones a botones y rediseñar formulario de recuerdos con estilo artesanal

**Objetivo:** Mejorar la interactividad de la UI con animaciones en los botones y aplicar la paleta de colores (vino, dorado, blanco) al formulario de subida de recuerdos.

**Pasos a seguir:**

1.  **Animación Global de Botones:**
    * Localiza los componentes de botón principales o las clases de botón en `src/app/globals.css`.
    * Añade clases de utilidad de Tailwind para transiciones y efectos "hover" a todos los botones interactivos.
    * **Clases a añadir:** `transition-all`, `duration-300`, `ease-in-out`, `hover:scale-105`.
    * Para botones primarios (color vino): `hover:bg-opacity-90`, `hover:shadow-lg`.
    * Para botones secundarios (color dorado): `hover:bg-opacity-90`.

2.  **Rediseño de Formulario de Recuerdos (Estilo Artesanal):**
    * Localiza el componente del formulario de subida de recuerdos (ej. `src/components/MemoriesSection.tsx`).
    * Aplica la nueva paleta de colores:
        * **Fondo del formulario:** `bg-white` con `shadow-md` y `rounded-lg`.
        * **Bordes:** Añade un borde sutil, ej. `border-2 border-primary-wine` o `border-secondary-gold`.
        * **Títulos:** Usa la fuente de títulos (si se definió) y el color `text-primary-wine`.
    * **Estilizar el Input de Archivo:**
        * Oculta el `<input type="file">` por defecto.
        * Usa la etiqueta `<label>` para estilizarla como un botón.
        * **Clases para el label:** `cursor-pointer`, `bg-secondary-gold`, `text-black`, `p-2`, `rounded-md`, `hover:scale-105`, `transition-all`.
    * **Botón de "Subir":** Asegúrate de que use el estilo primario `bg-primary-wine`.

**Acción final:** Todos los botones de la app tendrán una animación al pasar el ratón y el formulario de subida de recuerdos tendrá un look "artesanal" acorde al nuevo diseño.