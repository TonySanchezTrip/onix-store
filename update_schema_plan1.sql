DROP TABLE IF EXISTS public.important_places;

CREATE TABLE public.important_locations (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    description text,
    address text,
    maps_url text NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.souvenirs ADD COLUMN representative_image_urls text[];
