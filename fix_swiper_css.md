## Tarea: Corregir los estilos rotos del carrusel Swiper.js

**Problema:** El carrusel 3D "Coverflow" en `MemoriesSection.tsx` se ve mal. Las imágenes están squished o fuera de lugar porque los archivos CSS de Swiper no se están importando.

**Solución:** Añadir las declaraciones de importación de CSS necesarias para Swiper y sus módulos (Coverflow, Paginación, Navegación) en el archivo `MemoriesSection.tsx`.

**Pasos a seguir:**

1.  **Localiza el archivo:** Abre el componente `src/components/MemoriesSection.tsx`.
2.  **Ve a la sección de importaciones** en la parte superior del archivo.
3.  **Añade las siguientes 4 líneas** después de las importaciones de los módulos de Swiper:
    ```tsx
    import 'swiper/css';
    import 'swiper/css/effect-coverflow';
    import 'swiper/css/pagination';
    import 'swiper/css/navigation';
    ```

**Acción final:** Guarda el archivo. El servidor de desarrollo se recargará y el carrusel 3D debería renderizarse correctamente con todos sus estilos, sombras y efectos.