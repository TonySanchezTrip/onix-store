'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export default function SuccessPage() {
  // The cart context doesn't automatically clear, so we might need a function for it.
  // For now, we just show a success message.
  // In a real app, you'd likely clear the cart here.

  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
      <p className="text-lg text-gray-700 mb-8">Thank you for your purchase. Your order is being processed.</p>
      <Link href="/" className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600">
        Continue Shopping
      </Link>
    </div>
  );
}
