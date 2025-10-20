'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface Location {
  id: string;
  name: string;
  description: string | null;
  address: string | null;
  maps_url: string;
}

export type LocationFormData = Omit<Location, 'id'>;

interface LocationFormProps {
  location?: Location | null;
  onSave?: (data: LocationFormData) => Promise<void>;
}

export default function LocationForm({ location, onSave }: LocationFormProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [mapsUrl, setMapsUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location) {
      setName(location.name);
      setDescription(location.description || '');
      setAddress(location.address || '');
      setMapsUrl(location.maps_url || '');
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const locationData = {
      name,
      description,
      address,
      maps_url: mapsUrl,
    };

    if (onSave) {
      await onSave(locationData as LocationFormData);
    } else {
      try {
        const { error } = await supabase.from('important_locations').insert(locationData);
        if (error) {
          throw error;
        }
        alert('Lugar importante creado exitosamente!');
        router.push('/admin/locations');
        router.refresh();
      } catch (error) {
        const err = error as Error;
        alert(`Error creando el lugar importante: ${err.message}`);
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Lugar</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="mapsUrl" className="block text-sm font-medium text-gray-700">Google Maps URL</label>
        <input
          type="url"
          id="mapsUrl"
          value={mapsUrl}
          onChange={(e) => setMapsUrl(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
          {loading ? 'Guardando...' : 'Guardar Lugar'}
        </button>
      </div>
    </form>
  );
}
