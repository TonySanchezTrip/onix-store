import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function ImportantPlacesPage() {
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

  const { data: importantPlaces, error } = await supabase.from('important_places').select('*');

  if (error) {
    return <p>Error loading important places: {error.message}</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Lugares Importantes</h1>
        <Link href="/admin/important-places/new" className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
          Crear Nuevo
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {importantPlaces.map((place) => (
              <tr key={place.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{place.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{place.state}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/admin/important-places/edit/${place.id}`} className="text-indigo-600 hover:text-indigo-900">
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
