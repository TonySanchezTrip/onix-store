## Tarea: Corregir el flujo de pago obsoleto de Stripe

**Problema:** La función `stripe.redirectToCheckout` está obsoleta y causa un error en la página de checkout.

**Solución:** Reemplazarla con el flujo moderno de Stripe Checkout Sessions, que utiliza un endpoint en el backend para crear una sesión de pago segura.

**Pasos a seguir:**

1.  **Crear el Endpoint de API en el Backend:**
    * Crea un nuevo archivo de ruta de API en `src/app/api/create-checkout-session/route.ts`.
    * Este archivo debe exportar una función `POST` asíncrona.
    * Dentro de la función:
        * Instala y requiere la librería `stripe`.
        * Inicializa Stripe con tu clave secreta obtenida de las variables de entorno (`process.env.STRIPE_SECRET_KEY`).
        * Lee los productos del carrito que vienen en el cuerpo (`body`) de la petición.
        * Crea una sesión de pago usando `stripe.checkout.sessions.create`.
        * En la configuración de la sesión, formatea los `line_items` con el nombre, cantidad y precio (convertido a centavos) de cada producto.
        * Establece `mode: 'payment'`.
        * Define una `success_url` (ej. `/pago-exitoso`) y una `cancel_url` (ej. `/checkout`).
        * Responde a la petición con un JSON que contenga la `url` de la sesión creada (ej. `{ url: session.url }`).

2.  **Actualizar la Lógica del Frontend:**
    * Ve al componente de la página de checkout (probablemente en `src/app/checkout/page.tsx`).
    * Localiza la función que se ejecuta al hacer clic en el botón de "Pagar".
    * **Elimina por completo la llamada a `stripe.redirectToCheckout`**.
    * En su lugar, la función debe hacer lo siguiente:
        * Realizar una petición `fetch` de tipo `POST` a nuestro nuevo endpoint `/api/create-checkout-session`.
        * Enviar los datos del carrito de compras en el `body` de la petición, convertidos a formato JSON.
        * Cuando reciba la respuesta del servidor, extraer la `url` del JSON.
        * Redirigir al usuario a esa URL usando `window.location.href = url`.

**Acción final:** Asegúrate de que toda la lógica anterior que usaba `redirectToCheckout` sea eliminada y reemplazada por este nuevo flujo.