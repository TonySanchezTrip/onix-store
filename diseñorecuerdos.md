## Tarea: Rediseñar la página de Recuerdos (`/souvenir/[id]`) con contenido cultural de Tlaxcala

**Objetivo:** Transformar la página de visualización de souvenirs individuales para que presente una experiencia inmersiva y culturalmente rica, incorporando información sobre ubicaciones, imágenes representativas y enlaces a Wikipedia, todo con la nueva estética de Tlaxcala.

**Contexto:** La página se encuentra en `src/app/souvenir/[id]/page.tsx` o un patrón similar.

**Elementos a Incluir y Diseñar:**

1.  **Información del Souvenir (Existente):** Mantener el nombre y descripción del souvenir, pero aplicando los nuevos estilos de tipografía y color.

2.  **Ubicación Sugerida:**
    * Si la tabla `souvenirs` no tiene una columna para "ubicación", añadir una nueva columna `location_name` (TEXT) y `location_coords` (TEXT o punto geográfico si es posible).
    * Mostrar el nombre de la ubicación de manera prominente, con la tipografía de título y color vino.

3.  **Galería de Fotos Representativas:**
    * Si no existe, añadir una columna `image_urls` (TEXT[]) o `representative_image_url` (TEXT) en la tabla `souvenirs` para almacenar URLs de imágenes relacionadas con el lugar o la artesanía de Tlaxcala.
    * Mostrar estas imágenes de forma atractiva, quizás en un carrusel o una pequeña galería. Aplicar bordes dorados sutiles si es posible.
    * Utilizar el componente `<Image>` de Next.js para optimización.

4.  **Enlace a Wikipedia (Información Cultural):**
    * Añadir una nueva columna `wikipedia_url` (TEXT) a la tabla `souvenirs` para almacenar enlaces a páginas de Wikipedia relacionadas con la ubicación o la temática del souvenir.
    * Mostrar un botón o enlace con el texto "Conoce más en Wikipedia" que use el color vino y un sutil borde dorado.

5.  **Colorimetría y Estilo General de la Página:**
    * Asegurar que todos los elementos visuales de la página (fondos, texto, bordes, divisores) utilicen la paleta de colores (blanco, vino, dorado) y las tipografías definidas en el Plan 1.
    * Utilizar un fondo blanco o muy claro, con acentos en vino para títulos y dorado para detalles.
    * Considerar el uso de SVG o patrones sutiles que evoquen arte textil o cerámica de Tlaxcala como fondos o divisores decorativos si es posible (como un toque avanzado).

**Pasos a seguir (implementación):**

1.  **Actualizar la Base de Datos (Si es necesario):**
    * Si las columnas `location_name`, `image_urls` o `wikipedia_url` no existen en `public.souvenirs`, genera los comandos SQL `ALTER TABLE` para añadirlas.
    * (Opcional, pero recomendado) Si es posible, proporciona algunos datos de ejemplo para las nuevas columnas en algunos `souvenirs` existentes, para facilitar la visualización del rediseño.

2.  **Modificar `src/app/souvenir/[id]/page.tsx`:**
    * Ajustar la función de carga de datos para incluir las nuevas columnas de la tabla `souvenirs`.
    * Implementar el renderizado de la ubicación, la galería de imágenes y el enlace a Wikipedia.
    * Aplicar todas las clases de Tailwind CSS con la nueva paleta de colores y tipografías.

**Acción final:** La página de un souvenir individual debe ser una experiencia visual y culturalmente enriquecida, con la estética de Tlaxcala y los nuevos elementos de información.