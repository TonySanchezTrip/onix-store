## Tarea: Reparar el carrusel de imágenes en `ProductCard.tsx`

**Problema:** El carrusel de imágenes del producto no funciona. Comienza en la imagen incorrecta, las flechas no están conectadas y la rotación automática no funciona.

**Solución:** Reescribir la lógica del componente `ProductCard` para manejar correctamente el estado del carrusel, implementar las funciones de las flechas y asegurar que el `useEffect` para la rotación automática esté presente.

**Pasos a seguir:**

1.  **Localiza el archivo:** Abre el componente `src/components/ProductCard.tsx` (o donde esté la tarjeta del producto).

2.  **Corregir el Estado Inicial:**
    * Busca la línea `const [currentImageIndex, setCurrentImageIndex] = useState(...)`.
    * **Asegúrate de que el valor inicial sea `0`**, así:
      ```tsx
      const [currentImageIndex, setCurrentImageIndex] = useState(0);
      ```

3.  **Implementar Funciones para las Flechas:**
    * Dentro del componente `ProductCard`, crea dos nuevas funciones: `nextImage` y `prevImage`.

    ```tsx
    const nextImage = (e: React.MouseEvent) => {
      e.preventDefault(); // Evita que el Link se active al hacer clic en el botón
      e.stopPropagation(); // Detiene la propagación del evento
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % product.image_urls!.length
      );
    };

    const prevImage = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrentImageIndex((prevIndex) => 
        (prevIndex === 0 ? product.image_urls!.length - 1 : prevIndex - 1)
      );
    };
    ```

4.  **Conectar las Flechas al JSX:**
    * Busca los botones (o `<div>`) que actúan como flechas "siguiente" y "anterior" dentro del JSX del carrusel.
    * **Añade las funciones `onClick`** a esos botones:
      ```jsx
      // Botón de flecha anterior
      <button onClick={prevImage} className="...">{"<"}</button>
      
      // Botón de flecha siguiente
      <button onClick={nextImage} className="..."> {">"}</button>
      ```

5.  **Verificar el `useEffect` para Rotación Automática:**
    * Asegúrate de que el `useEffect` que implementa el `setInterval` (del plan anterior) todavía exista. Debe estar presente para que las imágenes roten solas.

**Acción final:** El carrusel de productos ahora debe iniciarse en la primera imagen, permitir el control manual con las flechas y seguir rotando automáticamente.