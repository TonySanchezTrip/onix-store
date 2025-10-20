import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react';
import MemoriesSection from '@/components/MemoriesSection';
import Carousel from '@/components/Carousel';

interface Location {
  id: string;
  name: string;
  description: string;
  address: string;
  maps_url: string;
}

interface SouvenirPageProps {
  params: Promise<{ id: string }>;
}

interface SouvenirLocation {
  important_locations: Location;
}

export default async function SouvenirPage({ params: paramsPromise }: SouvenirPageProps) {
  const params = await paramsPromise;
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: souvenir, error } = await supabase
    .from('souvenirs')
    .select('*, representative_image_urls, souvenir_locations!inner(important_locations(*))')
    .eq('id', params.id)
    .single();

  if (error || !souvenir) {
    notFound();
  }

  const locations = souvenir.souvenir_locations.map((sl: SouvenirLocation) => sl.important_locations);

  return (
    <div className="bg-bg-light min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading text-primary-wine">{souvenir.name}</h1>
          <p className="text-lg text-text-dark max-w-3xl mx-auto">{souvenir.description}</p>
        </div>

        {souvenir.representative_image_urls && Array.isArray(souvenir.representative_image_urls) && souvenir.representative_image_urls.length > 0 && (
          <div className="mb-12">
            <Carousel images={souvenir.representative_image_urls} />
          </div>
        )}

        {souvenir.public_url && (
          <div className="aspect-w-16 aspect-h-9 mb-12 rounded-lg overflow-hidden shadow-2xl">
            <iframe
              src={souvenir.public_url}
              title={`Experience for ${souvenir.name}`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {locations && locations.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-center mb-8 font-heading text-primary-wine">Lugares que debes visitar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {locations.map((location: Location) => (
                <div key={location.id} className="bg-white p-6 rounded-lg shadow-lg border-2 border-secondary-gold">
                  <h3 className="text-2xl font-bold mb-2 font-heading text-primary-wine">{location.name}</h3>
                  <p className="text-text-dark mb-4">{location.description}</p>
                  <p className="text-text-dark font-semibold mb-4">{location.address}</p>
                  <a
                    href={location.maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-primary-wine text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-80 transition-colors border-2 border-secondary-gold"
                  >
                    Ver en Google Maps
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t-2 border-primary-wine pt-8 mt-12">
          <MemoriesSection souvenir_id={souvenir.id} />
        </div>
      </div>
    </div>
  );
}
