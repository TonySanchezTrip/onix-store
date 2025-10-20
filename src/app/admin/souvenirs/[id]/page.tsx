import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import EditSouvenirForm from '@/components/EditSouvenirForm';

export default async function EditSouvenirPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
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
    .select('*, souvenir_locations(location_id)')
    .eq('id', params.id)
    .single();

  if (error || !souvenir) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Editar Souvenir</h1>
      <EditSouvenirForm souvenir={souvenir} />
    </div>
  );
}
