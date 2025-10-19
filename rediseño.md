## Tarea: Definir y aplicar la nueva paleta de colores y tipografía global (Estilo Tlaxcala)

**Objetivo:** Modificar los estilos globales de la aplicación para incorporar una paleta de colores y tipografías que evoquen la artesanía y cultura del estado de Tlaxcala, usando una combinación de blanco, vino y dorado.

**Paleta de Colores Deseada:**
* **Base (Fondo principal):** Blanco (#FFFFFF) o un blanco roto muy claro (#F8F8F8).
* **Acento Principal (Vino):** Un tono de vino tinto o burdeos (ej. #800020, #A20025, #721C2F). Usar para botones primarios, texto destacado, o elementos importantes.
* **Acento Secundario (Dorado):** Un tono dorado metálico o mostaza oscuro (ej. #D4AF37, #CBB680, #A1887F para un toque más terroso/cerámica). Usar para iconos, bordes sutiles, detalles o resaltados especiales.
* **Texto Principal:** Negro (#000000) o gris muy oscuro (#333333) para asegurar legibilidad.

**Tipografía Deseada:**
* **Para Títulos y Elementos Destacados:** Buscar una fuente con un toque artesanal o serif que evoque tradición, pero que siga siendo legible. Sugerencias: `Lora`, `Merriweather`, `Playfair Display`, o similar.
* **Para Texto General (Cuerpo):** Una fuente sans-serif limpia y legible. Sugerencias: `Montserrat`, `Roboto`, `Open Sans`, o similar, que complemente la fuente de título.

**Pasos a seguir:**

1.  **Modificar `tailwind.config.ts`:**
    * Extender el tema de Tailwind CSS para incluir la nueva paleta de colores bajo nombres semánticos (ej. `primary-wine`, `secondary-gold`, `bg-light`, `text-dark`).
    * Configurar las nuevas fuentes para que Tailwind las reconozca (ej. `font-heading`, `font-body`).

2.  **Modificar `src/app/globals.css`:**
    * Asegurar que las fuentes seleccionadas se importen (desde Google Fonts, por ejemplo) y se apliquen como variables CSS globales.
    * Aplicar la fuente del cuerpo al `body` por defecto.

3.  **Aplicar Estilos Base en `src/app/layout.tsx`:**
    * Asegurar que la etiqueta `<body>` utilice las clases de Tailwind definidas para aplicar el fondo principal (`bg-light`) y la fuente del cuerpo (`font-body`).

4.  **Revisar Componentes Comunes (`src/components/`) y Páginas Principales (`src/app/`)**
    * Donde sea apropiado, aplicar las nuevas clases de color y fuente de Tailwind (ej. `text-primary-wine`, `text-secondary-gold`, `font-heading`) a botones, títulos, enlaces y otros elementos visuales para reflejar la nueva estética. No es necesario rediseñar cada componente a fondo, sino aplicar la nueva paleta.

**Acción final:** La aplicación debe reflejar la nueva paleta de colores y tipografía de Tlaxcala en sus elementos básicos, como fondos, textos y botones.