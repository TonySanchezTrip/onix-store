## Tarea: Corregir el error de renderizado dinámico en la página de inicio

**Problema:** La aplicación falla al iniciar con el error `Error: cookies() should be awaited before using its value` en la ruta principal (`/`). Esto ocurre porque el componente de la página principal (`src/app/page.tsx`) intenta leer cookies de forma síncrona en un Server Component, lo cual no está permitido.

**Solución:** Convertir el componente de la página principal en una función asíncrona (`async`) para permitir el acceso correcto a funciones dinámicas como `cookies()`.

**Pasos a seguir:**

1.  **Localiza el archivo:** Abre el archivo de la página principal, ubicado en `src/app/page.tsx`.

2.  **Identifica la función del componente:** Busca la línea que define la función principal del componente. Generalmente se ve así:
    ```javascript
    export default function HomePage() {
    ```

3.  **Modifica la función:** Añade la palabra clave `async` a la definición de la función para convertirla en asíncrona. La línea modificada debe quedar de la siguiente manera:
    ```javascript
    export default async function HomePage() {
    ```

**Acción final:** Guarda el archivo `src/app/page.tsx` después de la modificación. El error debería resolverse y la página de inicio debería cargar correctamente al ejecutar `npm run dev`.