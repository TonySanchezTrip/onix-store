import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import EditSouvenirForm from '@/components/EditSouvenirForm';

interface EditSouvenirPageProps {
  params: { id: string };
}

export default async function EditSouvenirPage({ params }: EditSouvenirPageProps) {
  const cookieStore = cookies();
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
    .select('*')
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
