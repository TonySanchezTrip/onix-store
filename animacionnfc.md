## Tarea: Implementar animación visual en el botón NFC del catálogo

**Objetivo:** Añadir una animación sutil pero atractiva al botón que activa la funcionalidad NFC en la página del catálogo de productos, para mejorar su visibilidad y sugerir interacción.

**Contexto:** El botón NFC está presente en la página del catálogo (`src/app/products/page.tsx` o un componente relacionado que muestre productos individuales).

**Tipo de Animación Deseada:**
* Una animación que sugiera "interacción" o "escaneo", sin ser demasiado intrusiva.
* Puede ser un pulso suave, un cambio de color al pasar el ratón más pronunciado, o un pequeño rebote.
* Integrar los colores de la nueva paleta (vino y dorado) en la animación.

**Pasos a seguir:**

1.  **Localizar el Botón NFC:**
    * Identificar la página o componente donde se encuentra el botón que inicia la interacción NFC (por ejemplo, `src/app/products/page.tsx` o un componente dentro de `src/components/` como `ProductCard.tsx` si los productos se muestran en tarjetas).

2.  **Implementar la Animación:**
    * Utilizar clases de Tailwind CSS para la animación, como `animate-pulse`, `hover:scale-105`, `transition-all`, junto con las nuevas clases de color.
    * Considerar añadir un icono sutil que cambie de color o brille con el dorado para reforzar el efecto.
    * Si se requiere una animación más compleja (como un efecto de "onda NFC"), se puede considerar usar un componente de React con CSS keyframes o una librería de animación ligera (si es estrictamente necesario, pero preferir Tailwind).

**Acción final:** El botón NFC en el catálogo debe tener una animación visual que lo haga más atractivo e interactivo, utilizando la nueva paleta de colores.