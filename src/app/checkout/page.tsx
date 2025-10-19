'use client';

import { useCart } from '@/context/CartContext';
import React, { useState } from 'react';

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const [loading, setLoading] = useState(false);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // Call the new backend endpoint to create the checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItems),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();

      // Redirect to the Stripe checkout URL
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('Stripe checkout URL not found.');
      }

    } catch (error) {
      console.error('Checkout error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      alert(`Error: ${errorMessage}`);
      setLoading(false);
    }
    // No need to set loading to false here, as the page will redirect.
  };

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <h1 className="text-3xl font-bold my-8 text-center font-heading text-primary-wine">Checkout</h1>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty. Nothing to checkout.</p>
      ) : (
        <>
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 font-heading text-primary-wine">Order Summary</h2>
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center border-b py-2">
                <p>{item.name} (x{item.quantity})</p>
                <p className="text-secondary-gold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="flex justify-between items-center font-bold text-xl mt-4">
              <p className="font-heading text-primary-wine">Total</p>
              <p className="text-secondary-gold">${totalPrice.toFixed(2)}</p>
            </div>
          </div>
          <button 
            onClick={handleCheckout} 
            disabled={loading}
            className="w-full bg-secondary-gold text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Processing...' : `Pay $${totalPrice.toFixed(2)}`}
          </button>
        </>
      )}
    </div>
  );
}
