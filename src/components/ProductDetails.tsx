'use client';

import React from 'react';
import AddToCartButton from '@/components/AddToCartButton';
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import { Product } from '@/types/product';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const handleDirectBuy = async () => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    if (!stripe) return;

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{ ...product, quantity: 1 }]),
    });

    const session = await response.json();

    if (session.url) {
      window.location.href = session.url;
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-600 mb-6">{product.description}</p>
      <p className="text-3xl font-semibold text-gray-800 mb-6">${product.price.toFixed(2)}</p>
      <div className="flex items-center space-x-4 mb-6">
        <AddToCartButton product={product} />
                  <button
                    onClick={handleDirectBuy}
                    className="bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                  >          Comprar Ahora
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <a href="https://wa.me/TUNUMERODEWHATSAPP?text=Hola, me interesa el producto..." target="_blank" rel="noopener noreferrer">
          <FaWhatsapp className="text-2xl text-secondary-gold hover:text-primary-wine" />
        </a>
        <a href="https://www.instagram.com/onixdancestudio/" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-2xl text-secondary-gold hover:text-primary-wine" />
        </a>
        <a href="https://www.facebook.com/onixdancestudio" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-2xl text-secondary-gold hover:text-primary-wine" />
        </a>
      </div>
    </div>
  );
}
