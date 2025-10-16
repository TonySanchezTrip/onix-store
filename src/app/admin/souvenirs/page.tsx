import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function ManageSouvenirsPage() {
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

  const { data: souvenirs, error } = await supabase
    .from('souvenirs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <p className="text-red-500">Error loading souvenirs: {error.message}</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestionar Souvenirs</h1>
        <Link href="/admin/souvenirs/new" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
          Crear Nuevo Souvenir
        </Link>
      </div>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Public URL</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {souvenirs.map((souvenir, index) => (
              <tr key={souvenir.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{souvenir.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-sm truncate">{souvenir.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <a href={souvenir.public_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {souvenir.public_url}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/admin/souvenirs/${souvenir.id}`} className="text-indigo-600 hover:text-indigo-900">Editar</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
