'use client';

import SouvenirForm, { SouvenirFormData } from '@/components/SouvenirForm';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface Souvenir {
  id: number;
  name: string;
  description: string | null;
  public_url: string | null;
  state: string | null;
  representative_image_urls: string[] | null;
}

interface EditSouvenirFormProps {
  souvenir: Souvenir;
}

export default function EditSouvenirForm({ souvenir }: EditSouvenirFormProps) {
  const router = useRouter();

  const handleSave = async (souvenirData: SouvenirFormData) => {
    try {
      const { error } = await supabase
        .from('souvenirs')
        .update(souvenirData)
        .eq('id', souvenir.id);

      if (error) {
        throw error;
      }
      alert('Souvenir actualizado exitosamente!');
      router.push('/admin/souvenirs');
      router.refresh();
    } catch (error) {
      const err = error as Error;
      alert(`Error actualizando el souvenir: ${err.message}`);
    }
  };

  return <SouvenirForm onSave={handleSave} souvenir={souvenir} />;
}
