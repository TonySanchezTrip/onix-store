'use client';

import SouvenirForm from '@/components/SouvenirForm';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

// Define a Souvenir type for the data being saved
interface SouvenirData {
  name: string;
  description: string | null;
  public_url: string | null;
}

export default function NewSouvenirPage() {
  const router = useRouter();

  const handleSave = async (souvenirData: SouvenirFormData) => {
    try {
      const { error } = await supabase.from('souvenirs').insert(souvenirData);
      if (error) {
        throw error;
      }
      alert('Souvenir creado exitosamente!');
      router.push('/admin/souvenirs');
      router.refresh(); // Ensures the list is up-to-date
    } catch (error) {
      const err = error as Error;
      alert(`Error creando el souvenir: ${err.message}`);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Crear Nuevo Souvenir</h1>
      <SouvenirForm onSave={handleSave} />
    </div>
  );
}
