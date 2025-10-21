import Image from 'next/image';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react';
import ProductDetails from '@/components/ProductDetails';
import Carousel from '@/components/Carousel';

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
    .select('*, image_urls')
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
          {product.image_urls && product.image_urls.length > 0 ? (
            <Carousel images={product.image_urls} />
          ) : (
            <Image 
              src={'/placeholder.svg'} 
              alt={`Image of ${product.name}`} 
              width={500}
              height={500}
              className="w-full rounded-lg shadow-lg"
            />
          )}
        </div>
        <ProductDetails product={product} />
      </div>
    </div>
  );
}
