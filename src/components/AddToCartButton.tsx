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
      className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-90 hover:shadow-lg w-full md:w-auto"
    >
      Add to Cart
    </button>
  );
}
