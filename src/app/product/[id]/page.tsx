import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react';
import AddToCartButton from '@/components/AddToCartButton';

// This is a dynamic page, so we need to define the props
interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params: paramsPromise }: ProductPageProps) {
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

  // Fetch the single product based on the ID from the URL
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single(); // .single() is important to get one record or null

  // If the product is not found, show a 404 page
  if (error || !product) {
    notFound();
  }

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img 
            src={product.image_url || 'https://via.placeholder.com/500'} 
            alt={`Image of ${product.name}`} 
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-3xl font-semibold text-gray-800 mb-6">${product.price.toFixed(2)}</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
