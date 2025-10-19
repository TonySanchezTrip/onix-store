'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import React from 'react';

export default function CartPage() {
  const { cartItems } = useCart();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold my-8 font-heading text-primary-wine">Your Cart is Empty</h1>
        <Link href="/" className="bg-primary-wine text-white font-bold py-2 px-4 rounded hover:bg-opacity-80">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold my-8 text-center font-heading text-primary-wine">Your Cart</h1>
      <div className="grid grid-cols-1 gap-4 mb-8">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center">
              <img src={item.image_url || 'https://via.placeholder.com/100'} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
              <div>
                <h2 className="text-xl font-semibold font-heading text-primary-wine">{item.name}</h2>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
              </div>
            </div>
            <p className="text-lg font-bold text-secondary-gold">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="text-right">
        <h2 className="text-2xl font-bold font-heading text-primary-wine">Total: ${totalPrice.toFixed(2)}</h2>
        <Link href="/checkout" className="bg-secondary-gold text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 mt-4 inline-block">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
