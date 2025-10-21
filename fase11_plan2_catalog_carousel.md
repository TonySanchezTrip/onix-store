## Tarea: Crear un carrusel de imágenes automático en las tarjetas del catálogo

**Objetivo:** Modificar las tarjetas de producto en el catálogo para que, si un producto tiene múltiples imágenes, estas roten automáticamente cada cierto tiempo.

**Pasos a seguir:**

1.  **Localiza el componente:** Abre el componente que renderiza cada producto en el catálogo (ej. `src/components/ProductCard.tsx`).
2.  **Modifica la carga de datos:** Asegúrate de que este componente reciba el array `image_urls` del producto.
3.  **Implementar Lógica de Carrusel (React):**
    * Usa el hook `useState` para guardar el índice de la imagen actual (ej. `currentImageIndex`).
    * Usa el hook `useEffect` para iniciar un `setInterval`.
    * Dentro del intervalo (ej. cada 3 segundos), actualiza el `currentImageIndex` para que pase a la siguiente imagen en el array `image_urls`. Si llega al final, vuelve a 0.
    * Asegúrate de limpiar el intervalo (`clearInterval`) cuando el componente se desmonte.
4.  **Implementar Transición Visual:**
    * Renderiza la imagen usando `image_urls[currentImageIndex]`.
    * Usa clases de Tailwind CSS para añadir una transición suave de opacidad (ej. `transition-opacity duration-500`) entre los cambios de imagen, para que no sea un corte brusco.
    * Añade `overflow-hidden` al contenedor de la imagen para un look limpio.

**Acción final:** Las tarjetas de producto en el catálogo mostrarán un carrusel automático si tienen más de una imagen.