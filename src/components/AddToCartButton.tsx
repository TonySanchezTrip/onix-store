'use client';

import { useCart } from '@/context/CartContext';
import React from 'react';
import { Product } from '@/types/product';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
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
