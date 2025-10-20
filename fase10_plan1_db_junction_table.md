## Tarea: Crear una tabla de unión para la relación "muchos a muchos" entre souvenirs y lugares

**Objetivo:** Crear una nueva tabla en Supabase llamada `souvenir_locations` que servirá como tabla de unión (junction table). Esto permitirá que cada souvenir se asocie con múltiples lugares importantes, y que cada lugar pueda estar asociado con múltiples souvenirs.

**Pasos a seguir:**

1.  **Generar Script SQL:** Crea un script SQL para definir la nueva tabla `souvenir_locations`.
2.  **Definir Columnas y Relaciones:** La tabla debe tener las siguientes columnas:
    * `id`: `uuid`, llave primaria, con valor por defecto `gen_random_uuid()`.
    * `souvenir_id`: `uuid`, no nulo. Debe ser una **llave foránea** que haga referencia a la columna `id` de la tabla `souvenirs`. Incluir la regla `ON DELETE CASCADE` para que las relaciones se borren si se elimina un souvenir.
    * `location_id`: `uuid`, no nulo. Debe ser una **llave foránea** que haga referencia a la columna `id` de la tabla `important_locations`. Incluir la regla `ON DELETE CASCADE` para que las relaciones se borren si se elimina un lugar.
    * `created_at`: `timestampz`, con valor por defecto `now()`.

**Acción final:** Después de ejecutar este script SQL en la base de datos de Supabase, la estructura estará lista para soportar la relación "muchos a muchos" entre souvenirs y lugares importantes.