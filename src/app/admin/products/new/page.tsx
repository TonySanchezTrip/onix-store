'use client';

import ProductForm from '@/components/ProductForm';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types/product';
import { useRouter } from 'next/navigation';

export default function NewProductPage() {
  const router = useRouter();

  const handleSave = async (productData: Omit<Product, 'id' | 'created_at'> & { image_urls: string[] | null }) => {
    try {
      const { error } = await supabase.from('products').insert(productData);
      if (error) {
        throw error;
      }
      alert('Producto creado exitosamente!');
      router.push('/admin/products');
      router.refresh(); // To ensure the list on the previous page is updated
    } catch (error) {
      const err = error as Error;
      alert(`Error creando el producto: ${err.message}`);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Crear Nuevo Producto</h1>
      <ProductForm onSave={handleSave} />
    </div>
  );
}
