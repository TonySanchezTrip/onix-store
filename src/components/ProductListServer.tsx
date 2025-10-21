import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Product } from '@/types/product';
import HomePageClient from '@/components/HomePageClient'; // Assuming HomePage is the default export of page.tsx

export default async function ProductListServer() {
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

  const { data: products, error } = await supabase.from('products').select('*, image_urls');

  if (error) {
    console.error('Error fetching products:', error.message);
    return <p className="text-center text-red-500">Error cargando productos: {error.message}</p>;
  }

  if (!products || products.length === 0) {
    return <p className="text-center">No se encontraron productos.</p>;
  }

  return <HomePageClient initialProducts={products} />;
}