import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import EditLocationForm from '@/components/EditLocationForm';

export default async function EditLocationPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
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

  const { data: location, error } = await supabase
    .from('important_locations')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !location) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Editar Lugar</h1>
      <EditLocationForm location={location} />
    </div>
  );
}