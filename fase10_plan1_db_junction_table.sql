CREATE TABLE public.souvenir_locations (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    souvenir_id bigint NOT NULL REFERENCES public.souvenirs(id) ON DELETE CASCADE,
    location_id bigint NOT NULL REFERENCES public.important_locations(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now() NOT NULL
);
