'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Product } from '@/types/product'; // Import the Product interface

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (product.image_urls && product.image_urls.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % product.image_urls!.length
        );
      }, 3000); // Change image every 3 seconds
      return () => clearInterval(interval);
    }
  }, [product.image_urls]);

  const imageUrlToDisplay = 
    (product.image_urls && product.image_urls.length > 0)
      ? product.image_urls[currentImageIndex]
      : '/placeholder.svg';

  return (
    <Link href={`/product/${product.id}`} key={product.id}>
      <div className="border rounded-lg p-4 flex flex-col h-full cursor-pointer hover:shadow-lg transition-shadow bg-white">
        <div className="relative w-full h-48 overflow-hidden mb-4 rounded">
          <Image 
            src={imageUrlToDisplay} 
            alt={`Image of ${product.name}`} 
            fill
            style={{ objectFit: 'cover' }}
            className="transition-opacity duration-500 ease-in-out"
          />
        </div>
        <div className="flex-grow">
          <h2 className="text-lg font-semibold font-heading text-primary-wine">{product.name}</h2>
          <p className="text-gray-500 text-sm mb-2">{product.description}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-secondary-gold">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default function HomePage({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false); // No longer loading here, data is passed
  const [error, setError] = useState<string | null>(null); // Error handled in server component

  // No useEffect for data fetching here anymore

  if (loading) { // This block might not be strictly necessary if data is always passed
    return <p className="text-center">Cargando productos...</p>;
  }

  if (error) { // This block might not be strictly necessary if error is handled in server component
    return <p className="text-center text-red-500">Error cargando productos: {error}</p>;
  }

  if (!products || products.length === 0) {
    return <p className="text-center">No se encontraron productos.</p>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-center my-8 font-heading text-primary-wine">Welcome to ONIX Store</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 p-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}