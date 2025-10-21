'use client';

import ProductForm from '@/components/ProductForm';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types/product';
import { useRouter } from 'next/navigation';

interface EditProductFormProps {
  product: Product;
}

export default function EditProductForm({ product }: EditProductFormProps) {
  const router = useRouter();

  const handleSave = async (productData: Omit<Product, 'id' | 'created_at'> & { image_urls: string[] | null }) => {
    try {
      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', product.id);

      if (error) {
        throw error;
      }
      alert('Producto actualizado exitosamente!');
      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      const err = error as Error;
      alert(`Error actualizando el producto: ${err.message}`);
    }
  };

  return <ProductForm onSave={handleSave} product={product} />;
}
