'use client';

import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [souvenirs, setSouvenirs] = useState<{id: number, name: string}[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const checkUserAndRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
        setIsAdmin(profile?.role === 'admin');
      } else {
        setIsAdmin(false);
      }
    };

    const fetchSouvenirs = async () => {
      const { data } = await supabase.from('souvenirs').select('id, name');
      if (data) setSouvenirs(data);
    };

    checkUserAndRole();
    fetchSouvenirs();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      const newUser = session?.user ?? null;
      setUser(newUser);
      if (newUser) {
        checkUserAndRole();
      } else {
        setIsAdmin(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
  };

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300); // 300ms delay before closing
  };

  return (
    <header className="bg-gray-800 text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold">ONIX</Link>

          {/* NFC Dropdown */}
          <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button className="hover:text-gray-300">NFC</button>
            <div className={`absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg ${isDropdownOpen ? 'block' : 'hidden'} z-50`}>
              <ul className="py-1">
                {souvenirs.length > 0 ? (
                  souvenirs.map(souvenir => (
                    <li key={souvenir.id}>
                      <Link href={`/souvenir/${souvenir.id}`} className="block px-4 py-2 text-sm hover:bg-gray-100">
                        {souvenir.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-sm text-gray-500">No hay lugares aún.</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/cart" className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              {isAdmin && (
                <Link href="/admin/products" className="text-yellow-400 hover:text-yellow-200 font-bold">
                  Admin Panel
                </Link>
              )}
              <p className="hidden sm:block">{user.email}</p>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}