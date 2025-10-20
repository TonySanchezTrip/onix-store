import Image from 'next/image';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';

// Define the type for a product based on your Supabase table
interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  created_at: string;
}

export default async function HomePage() {
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

  // Fetch products from the 'products' table
  const { data: products, error } = await supabase.from('products').select('*');

  if (error) {
    return <p className="text-center text-red-500">Error loading products: {error.message}</p>;
  }

  if (!products || products.length === 0) {
    return <p className="text-center">No products found.</p>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-8 font-heading text-primary-wine">Welcome to ONIX Store</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 p-4">
        {products.map((product: Product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <div className="border rounded-lg p-4 flex flex-col h-full cursor-pointer hover:shadow-lg transition-shadow bg-white">
              <Image 
                src={product.image_url || 'https://via.placeholder.com/150'} 
                alt={`Image of ${product.name}`} 
                width={150}
                height={150}
                className="w-full h-48 object-cover mb-4 rounded" 
              />
              <div className="flex-grow">
                <h2 className="text-lg font-semibold font-heading text-primary-wine">{product.name}</h2>
                <p className="text-gray-500 text-sm mb-2">{product.description}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-secondary-gold">${product.price.toFixed(2)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}