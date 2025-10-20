## Tarea: Implementar botón de "Compra Directa" y enlaces a Redes Sociales

**Objetivo:** Añadir un botón de compra directa en la página de producto que omita el carrito y añadir iconos de redes sociales (incluyendo WhatsApp).

**Pasos a seguir:**

1.  **Localiza el archivo:** Abre la página de detalle del producto, `src/app/product/[id]/page.tsx`.

2.  **Crear Botón de "Compra Directa":**
    * Cerca del botón "Agregar al Carrito", añade un nuevo botón llamado "Comprar Ahora".
    * Estiliza este botón de forma prominente, quizás con el color `primary-wine`.

3.  **Implementar Lógica de Compra Directa:**
    * Crea una nueva función `handleDirectBuy()`.
    * Esta función debe hacer una petición `POST` a tu API de Stripe (`/api/create-checkout-session`), similar a como lo hace el carrito.
    * **Diferencia clave:** En lugar de enviar la lista de items del carrito, debe enviar un array que contenga **únicamente el producto actual** con cantidad 1.
    * Al recibir la URL de la sesión de Stripe, debe redirigir al usuario al checkout (`window.location.href = url`).

4.  **Añadir Iconos de Redes Sociales:**
    * Cerca de los botones de compra, añade una pequeña sección con iconos.
    * Utiliza una librería como `react-icons` (importa `FaWhatsapp`, `FaInstagram`, `FaFacebook`, etc.).
    * El icono de WhatsApp debe ser un enlace `<a>` que apunte a la API de WhatsApp (ej. `href="https://wa.me/TUNUMERODEWHATSAPP?text=Hola, me interesa el souvenir Kuali-tlax..."`).
    * Los otros iconos deben enlazar a tus perfiles de redes sociales.
    * Estiliza los iconos con los colores de la paleta (dorado o vino).

**Acción final:** La página del producto ahora tendrá dos opciones de compra (Carrito y Directa) y enlaces visibles a WhatsApp y otras redes sociales.