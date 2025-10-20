'use client';

import LocationForm, { LocationFormData } from '@/components/LocationForm';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface Location {
  id: number;
  name: string;
  description: string | null;
  address: string | null;
  maps_url: string;
}

interface EditLocationFormProps {
  location: Location;
}

export default function EditLocationForm({ location }: EditLocationFormProps) {
  const router = useRouter();

  const handleSave = async (locationData: LocationFormData) => {
    try {
      const { error } = await supabase
        .from('important_locations')
        .update(locationData)
        .eq('id', Number(location.id));

      if (error) {
        throw error;
      }
      alert('Lugar actualizado exitosamente!');
      router.push('/admin/locations');
      router.refresh();
    } catch (error) {
      const err = error as Error;
      alert(`Error actualizando el lugar: ${err.message}`);
    }
  };

  return <LocationForm onSave={handleSave} location={location} />;
}
