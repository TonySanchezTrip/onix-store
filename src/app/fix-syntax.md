## Tarea: Corregir error de sintaxis en `page.tsx`

**Problema:** El despliegue falla con un error `Expected '</', got ':'` en `src/app/page.tsx`. Esto se debe a que la definición de `interface Product` está incorrectamente ubicada dentro del bloque de retorno JSX del componente.

**Solución:** Mover la definición de `interface Product` fuera de la función del componente `HomePage` y colocarla en el nivel superior del archivo, que es el lugar correcto para las definiciones de tipos de TypeScript.

**Pasos a seguir:**

1.  **Localiza el archivo:** Abre `src/app/page.tsx`.
2.  **Identifica el bloque de código:** Encuentra la definición de `interface Product { ... }` que está dentro de la función `HomePage`, muy probablemente dentro del `return()`.
3.  **Mueve el bloque:** Corta el bloque de código completo de `interface Product` (desde `interface Product {` hasta `}`) de su ubicación actual.
4.  **Pégalo en el lugar correcto:** Pega el bloque de código en la parte superior del archivo, después de las declaraciones `import`.

**Acción final:** Guarda el archivo. El error de sintaxis desaparecerá y la página podrá compilarse correctamente.