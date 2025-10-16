'use client';

import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ProductActionsProps {
  productId: number;
}

export default function ProductActions({ productId }: ProductActionsProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        const { error } = await supabase.from('products').delete().eq('id', productId);
        if (error) {
          throw error;
        }
        alert('Producto eliminado exitosamente.');
        router.refresh(); // This re-fetches the data on the server component
      } catch (error) {
        const err = error as Error;
        alert(`Error eliminando el producto: ${err.message}`);
      }
    }
  };

  return (
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <Link href={`/admin/products/edit/${productId}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
        Editar
      </Link>
      <button onClick={handleDelete} className="text-red-600 hover:text-red-900">
        Eliminar
      </button>
    </td>
  );
}
