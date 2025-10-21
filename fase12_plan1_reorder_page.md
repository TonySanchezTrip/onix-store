## Tarea: Reordenar los componentes en la página del souvenir y cambiar el color del footer

**Objetivo:** Modificar la estructura de la página `/souvenir/[id]` para que los elementos aparezcan en un orden específico y asegurar que el footer tenga un color que contraste con el fondo.

**Pasos a seguir:**

1.  **Localiza el archivo:** Abre el archivo principal de la página del souvenir, `src/app/souvenir/[id]/page.tsx`.
2.  **Reordena los Componentes:** Busca los componentes que renderizan cada sección y muévelos en el JSX para que sigan este orden exacto:
    1.  El **Nombre del Souvenir** (Título, ej. `<h1>{souvenir.name}</h1>`).
    2.  El carrusel de **Imágenes del Lugar** (el que sube el admin, ej. `<RepresentativeImagesCarousel />`).
    3.  La sección de **"Fotos de Recuerdo Digital"** (el componente `<MemoriesSection />`).
    4.  La lista de **"Lugares que debes visitar"** (el componente `<ImportantLocationsList />`).
    5.  El **iFrame** (el que tenía el link de Wikipedia/Gobierno, ej. `<iframe ... />`).

3.  **Localiza el componente del Footer:** Abre el archivo del pie de página, `src/components/Footer.tsx`.
4.  **Cambia el Color del Footer:**
    * El footer actual no se ve. Vamos a darle la paleta de colores de Tlaxcala.
    * Añade las siguientes clases de Tailwind al `div` principal del footer:
    * `bg-primary-wine` (el color vino que definimos).
    * `text-white` (o `text-gray-200`) para que el texto sea legible.
    * `mt-12` (para darle un margen superior y separarlo del contenido).

**Acción final:** La página del souvenir tendrá el orden de secciones correcto y un footer visible y estilizado.