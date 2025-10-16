import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react';
import MemoriesSection from '@/components/MemoriesSection';

interface SouvenirPageProps {
  params: Promise<{ id: string }>;
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

  // Fetch the souvenir data
  const { data: souvenir, error } = await supabase
    .from('souvenirs')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !souvenir) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* Public Information Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{souvenir.name}</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">{souvenir.description}</p>
      </div>

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

      {/* Private Memories Section */}
      <div className="border-t pt-8">
        <MemoriesSection souvenir_id={souvenir.id} />
      </div>
    </div>
  );
}
