## Tarea: Solucionar el error de hidratación (Hydration Error) en la aplicación

**Problema:** La aplicación muestra un error de hidratación porque el HTML renderizado por el servidor no coincide con el renderizado inicial en el cliente. Específicamente, el atributo `lang` de la etiqueta `<html>` es diferente (`en` en el servidor y `es` en el cliente).

**Solución:** Estandarizar el atributo de idioma en la etiqueta `<html>` a "es" en el archivo de layout principal para asegurar que el servidor y el cliente rendericen el mismo HTML.

**Pasos a seguir:**

1.  **Localiza el archivo de layout principal:** Abre el archivo ubicado en `src/app/layout.tsx`.
2.  **Busca la etiqueta `<html>`:** Encuentra la línea que define la etiqueta HTML principal. Actualmente se ve así:
    ```html
    <html lang="en">
    ```
3.  **Modifica el atributo `lang`:** Cambia el valor del atributo `lang` de `"en"` a `"es"`. La línea corregida debe ser:
    ```html
    <html lang="es">
    ```

**Acción final:** Guarda el archivo `src/app/layout.tsx` con la modificación. Esto resolverá el error de hidratación y la página se cargará correctamente.