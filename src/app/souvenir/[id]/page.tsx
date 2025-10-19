import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react';
import MemoriesSection from '@/components/MemoriesSection';
import Image from 'next/image';
import ImportantPlaces from '@/components/ImportantPlaces';

interface SouvenirPageProps {
  params: Promise<{ id: string }>;
}

async function getWikipediaContent(state: string) {
  if (!state) return null;
  const url = `https://es.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&explaintext=true&redirects=true&titles=${encodeURIComponent(state)}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId === '-1') return null;
    return pages[pageId].extract;
  } catch (error) {
    console.error('Error fetching Wikipedia content:', error);
    return null;
  }
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
    .select('*, location_name, image_urls, wikipedia_url, state')
    .eq('id', params.id)
    .single();

  if (error || !souvenir) {
    notFound();
  }

  const [wikipediaContent, importantPlaces] = await Promise.all([
    getWikipediaContent(souvenir.state),
    supabase.from('important_places').select('*').eq('state', souvenir.state),
  ]);

  return (
    <div className="bg-bg-light min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading text-primary-wine">{souvenir.name}</h1>
          <p className="text-lg text-text-dark max-w-3xl mx-auto">{souvenir.description}</p>
          {souvenir.location_name && (
            <p className="text-2xl font-bold mt-4 font-heading text-secondary-gold">{souvenir.location_name}</p>
          )}
        </div>

        {souvenir.image_urls && souvenir.image_urls.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 font-heading text-primary-wine">Galería</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {souvenir.image_urls.map((url: string, index: number) => (
                <div key={index} className="relative aspect-w-1 aspect-h-1 rounded-lg overflow-hidden shadow-lg border-4 border-secondary-gold">
                  <Image
                    src={url}
                    alt={`Galería de ${souvenir.name} ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {wikipediaContent && (
          <div className="mb-12 p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-8 font-heading text-primary-wine">Conoce más sobre {souvenir.state}</h2>
            <p className="text-text-dark whitespace-pre-wrap">{wikipediaContent}</p>
          </div>
        )}

        {importantPlaces && importantPlaces.data && importantPlaces.data.length > 0 && (
          <ImportantPlaces places={importantPlaces.data} />
        )}

        <div className="border-t-2 border-primary-wine pt-8">
          <MemoriesSection souvenir_id={souvenir.id} />
        </div>
      </div>
    </div>
  );
}
