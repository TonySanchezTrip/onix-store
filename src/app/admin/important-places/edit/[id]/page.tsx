import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import EditImportantPlaceForm from '@/components/EditImportantPlaceForm';

export default async function EditImportantPlacePage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
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

  const { data: importantPlace, error } = await supabase
    .from('important_places')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !importantPlace) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Editar Lugar Importante</h1>
      <EditImportantPlaceForm importantPlace={importantPlace} />
    </div>
  );
}
