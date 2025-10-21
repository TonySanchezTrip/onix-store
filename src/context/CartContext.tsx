'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product } from '@/types/product';

// Define the shape of an item in the cart
interface CartItem extends Product {
  quantity: number;
  image_url: string | null; // Add image_url to CartItem
}

// Define the shape of the cart context
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  // We can add more functions later, like removeFromCart, clearCart, etc.
}

// Create the context with a default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // If item already exists, increase its quantity
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Otherwise, add the new product with quantity 1
        const cartItem: CartItem = {
          ...product,
          quantity: 1,
          image_url: product.image_urls ? product.image_urls[0] : null, // Use the first image URL
        };
        return [...prevItems, cartItem];
      }
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
