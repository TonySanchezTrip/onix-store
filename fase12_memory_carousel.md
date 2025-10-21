## Tarea: Rediseñar la galería de "Recuerdos Privados" a un carrusel horizontal

**Objetivo:** Cambiar el layout de los recuerdos (actualmente círculos) a un carrusel de scroll horizontal con imágenes cuadradas que tengan un efecto de sombra flotante.

**Pasos a seguir:**

1.  **Localiza el componente:** Abre el archivo `src/components/MemoriesSection.tsx`.
2.  **Busca la sección de la galería:** Encuentra el `div` que renderiza el `.map()` de los recuerdos (debajo del título "Your Private Memories").
3.  **Aplica el layout de Carrusel Horizontal:**
    * Modifica el `div` contenedor del `.map()` para que tenga las siguientes clases de Tailwind:
    * `flex overflow-x-auto space-x-6 p-4 scrollbar-hide`
    * (Nota: `scrollbar-hide` requiere el plugin `tailwind-scrollbar-hide`, si no lo tienes, simplemente omítelo).

4.  **Modifica las Imágenes (dentro del `.map()`):**
    * Busca el `div` o `Image` de cada recuerdo dentro del bucle `.map()`.
    * **Cambiar Forma (Cuadrado):**
        * Elimina la clase `rounded-full`.
        * Añade clases para un tamaño cuadrado y esquinas redondeadas: `w-48 h-48 rounded-lg object-cover` (o `w-52 h-52` si prefieres).
    * **Añadir Sombra Flotante:**
        * Añade clases de sombra de Tailwind: `shadow-xl shadow-black/30` (o `shadow-secondary-gold/30` para usar tu paleta).
    * **Añadir Animación Simple (Hover):**
        * Añade clases de transición para un efecto al pasar el ratón: `transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl`

**Acción final:** La galería de recuerdos ahora será un carrusel de scroll horizontal con imágenes cuadradas, redondeadas y con una sombra pronunciada que da un efecto de "flotación".