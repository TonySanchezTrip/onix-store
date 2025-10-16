import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: { 
  children: React.ReactNode 
}) {
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

  // Get current user session
  const { data: { session } } = await supabase.auth.getSession();

  // Redirect if no user
  if (!session) {
    redirect('/login');
  }

  // Check for admin role. 
  // This assumes you have a 'profiles' table with a 'role' column.
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  // Redirect if user is not an admin
  if (error || !profile || profile.role !== 'admin') {
    console.log('Redirecting non-admin user.');
    redirect('/');
  }

  // If we are here, user is an admin. Render the admin layout.
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white p-4 min-h-screen">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
        <nav>
          <ul>
            <li className="mb-4">
              <Link href="/admin/products" className="hover:text-gray-300">Gestionar Productos</Link>
            </li>
            <li>
              <Link href="/admin/souvenirs" className="hover:text-gray-300">Gestionar Souvenirs</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-grow p-8">
        {children}
      </main>
    </div>
  );
}
