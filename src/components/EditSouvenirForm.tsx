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
  user_id: string;
}

interface EditSouvenirFormProps {
  souvenir: Souvenir;
}

export default function EditSouvenirForm({ souvenir }: EditSouvenirFormProps) {
  const router = useRouter();

  const handleSave = async (souvenirData: SouvenirFormData, selectedLocations: string[], newImageUrls: string[]) => {
    try {
      // First, update the souvenir itself
      const { error: souvenirError } = await supabase
        .from('souvenirs')
        .update({ ...souvenirData, representative_image_urls: [...(souvenir.representative_image_urls || []), ...newImageUrls] })
        .eq('id', souvenir.id);

      if (souvenirError) throw souvenirError;

      // Then, update the souvenir_locations associations
      // 1. Delete existing associations
      const { error: deleteError } = await supabase
        .from('souvenir_locations')
        .delete()
        .eq('souvenir_id', souvenir.id);

      if (deleteError) throw deleteError;

      // 2. Insert new associations
      if (selectedLocations.length > 0) {
        const newAssociations = selectedLocations.map(location_id => ({
          souvenir_id: souvenir.id,
          location_id,
        }));
        const { error: insertError } = await supabase
          .from('souvenir_locations')
          .insert(newAssociations);

        if (insertError) throw insertError;
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
