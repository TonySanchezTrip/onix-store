## Tarea: Corregir error de tipos (TypeScript) en la página de edición de productos

**Problema:** El despliegue en Vercel falla con un error de tipos en `src/app/admin/products/edit/[id]/page.tsx`. La definición del tipo para las propiedades de la página (`PageProps`) es incompatible, específicamente en la propiedad `params`.

**Solución:** Modificar la definición del tipo `EditProductPageProps` para que la propiedad `params` refleje correctamente la estructura que Next.js le pasa a las páginas de rutas dinámicas, que es un objeto con una propiedad `id` de tipo `string`.

**Pasos a seguir:**

1.  **Localiza el archivo:** Abre el archivo `src/app/admin/products/edit/[id]/page.tsx`.
2.  **Encuentra la definición del tipo:** Busca la declaración `type EditProductPageProps = { ... }` o similar.
3.  **Corrige la propiedad `params`:** Dentro de esa definición, cambia la línea de `params`.

    * **Línea incorrecta:** `params: Promise<any>;` (o un tipo similar incorrecto)
    * **Línea correcta:** `params: { id: string };`

**Acción final:** Guarda el archivo con la corrección y sube los cambios a GitHub. El error de tipos se resolverá y el despliegue en Vercel debería completarse con éxito.