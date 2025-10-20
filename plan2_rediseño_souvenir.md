## Tarea: Rediseñar la página pública del souvenir con las nuevas secciones

**Objetivo:** Reemplazar el `iframe` existente con la nueva galería de imágenes representativas y el menú interactivo de "Lugares Importantes".

**Pasos a seguir:**

1.  **Localiza el archivo:** Abre el archivo de la página pública del souvenir, `src/app/souvenir/[id]/page.tsx`.

2.  **Modificar la Carga de Datos:**
    * La función que obtiene los datos de Supabase ahora también debe traer `representative_image_urls` de la tabla `souvenirs`.
    * La página también debe hacer una segunda consulta para traer **todos** los registros de la tabla `important_locations`.

3.  **Eliminar el iFrame:**
    * Borra el componente `<iframe>` que usaba la columna `public_url`.

4.  **Crear Carrusel de Imágenes Representativas:**
    * En lugar del iframe, implementa un carrusel de imágenes moderno que muestre las fotos de `representative_image_urls`.
    * Utiliza un componente de carrusel (como Swiper.js, Embla Carousel, o uno simple hecho con Tailwind CSS) que cambie las imágenes automáticamente.
    * Aplica la estética Tlaxcala (bordes sutiles dorados, etc.).

5.  **Crear Menú Interactivo de "Lugares que debes visitar":**
    * Debajo de la descripción del souvenir, crea una nueva sección.
    * Mapea los datos obtenidos de la tabla `important_locations`.
    * Muestra cada lugar como una "tarjeta" o un "acordeón" interactivo que al hacer clic muestre:
        * `name` (Nombre del lugar)
        * `description` (Descripción)
        * `address` (Dirección)
    * Añade un botón con el texto "Ver en Google Maps" por cada lugar.
    * Este botón debe ser un enlace (`<a>`) que abra `Maps_url` en una nueva pestaña (`target="_blank"`).
    * Estiliza el botón con los colores vino y dorado.

**Acción final:** La página del souvenir ya no mostrará el iframe, sino un carrusel de imágenes del lugar y una lista interactiva de lugares recomendados con enlaces directos a Google Maps.