'use client';

import ImportantPlaceForm, { ImportantPlaceFormData } from '@/components/ImportantPlaceForm';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface ImportantPlace {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  location: { x: number; y: number } | null;
  state: string | null;
}

interface EditImportantPlaceFormProps {
  importantPlace: ImportantPlace;
}

export default function EditImportantPlaceForm({ importantPlace }: EditImportantPlaceFormProps) {
  const router = useRouter();

  const handleSave = async (importantPlaceData: ImportantPlaceFormData) => {
    try {
      const { error } = await supabase
        .from('important_places')
        .update(importantPlaceData)
        .eq('id', importantPlace.id);

      if (error) {
        throw error;
      }
      alert('Lugar importante actualizado exitosamente!');
      router.push('/admin/important-places');
      router.refresh();
    } catch (error) {
      const err = error as Error;
      alert(`Error actualizando el lugar importante: ${err.message}`);
    }
  };

  return <ImportantPlaceForm onSave={handleSave} importantPlace={importantPlace} />;
}
