'use client';

import { useCart } from '@/context/CartContext';
import React from 'react';

// Define the type for a product that can be added to the cart
interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string | null;
  description: string | null; // Adding description for completeness
}

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // We need to pass a simplified product object to addToCart if the context expects that
    const productToAdd = {
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
    };
    addToCart(productToAdd);
    // Optional: Show a confirmation message
    alert(`'${product.name}' has been added to the cart!`);
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto"
    >
      Add to Cart
    </button>
  );
}
