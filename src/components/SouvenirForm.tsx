'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';

// Define a Souvenir type for type safety
interface Souvenir {
  id: number;
  name: string;
  description: string | null;
  public_url: string | null;
  state: string | null;
  representative_image_urls: string[] | null;
  user_id: string; // Add user_id to Souvenir interface
}

// The data that the form will work with
export type SouvenirFormData = Omit<Souvenir, 'id' | 'user_id'>;

interface Location {
  id: string;
  name: string;
}

interface SouvenirFormProps {
  souvenir?: Souvenir & { souvenir_locations?: { location_id: string }[] };
  onSave?: (data: SouvenirFormData, selectedLocations: string[], newImageUrls: string[]) => Promise<void>;
}

export default function SouvenirForm({ souvenir, onSave }: SouvenirFormProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [publicUrl, setPublicUrl] = useState('');
  const [state, setState] = useState('');
  const [representativeImageUrls, setRepresentativeImageUrls] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchLocationsAndUser = async () => {
      // Fetch locations
      const { data: locationsData } = await supabase.from('important_locations').select('id, name');
      if (locationsData) {
        setLocations(locationsData);
      }

      // Fetch current user
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };

    fetchLocationsAndUser();

    if (souvenir) {
      setName(souvenir.name);
      setDescription(souvenir.description || '');
      setPublicUrl(souvenir.public_url || '');
      setState(souvenir.state || '');
      setRepresentativeImageUrls(souvenir.representative_image_urls || []);
      setSelectedLocations((souvenir.souvenir_locations || []).map(l => l.location_id));
    }
  }, [souvenir]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!currentUser) {
      alert('You must be logged in to create a souvenir.');
      setLoading(false);
      return;
    }

    const newImageUrls: string[] = [];
    for (const image of newImages) {
      const fileName = `${Date.now()}-${image.name}`;
      const { error } = await supabase.storage.from('representative-images').upload(fileName, image);
      if (error) {
        alert(`Error uploading image: ${error.message}`);
        setLoading(false);
        return;
      }
      const { data: { publicUrl } } = supabase.storage.from('representative-images').getPublicUrl(fileName);
      newImageUrls.push(publicUrl);
    }

    const souvenirData = {
      name,
      description,
      public_url: publicUrl,
      state,
      representative_image_urls: [...representativeImageUrls, ...newImageUrls],
      user_id: currentUser.id, // Include user_id
    };

    if (onSave) {
      await onSave(souvenirData, selectedLocations, newImageUrls);
    } else {
      try {
        const { data: newSouvenir, error } = await supabase.from('souvenirs').insert(souvenirData).select().single();
        if (error) throw error;

        if (newSouvenir) {
          const souvenirLocations = selectedLocations.map(location_id => ({ souvenir_id: newSouvenir.id, location_id }));
          const { error: slError } = await supabase.from('souvenir_locations').insert(souvenirLocations);
          if (slError) throw slError;
        }

        alert('Souvenir creado exitosamente!');
        router.push('/admin/souvenirs');
        router.refresh();
      } catch (error) {
        const err = error as Error;
        alert(`Error creando el souvenir: ${err.message}`);
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Souvenir</label>
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
        <label htmlFor="publicUrl" className="block text-sm font-medium text-gray-700">Public URL (iFrame)</label>
        <input
          type="url"
          id="publicUrl"
          value={publicUrl}
          onChange={(e) => setPublicUrl(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">Estado</label>
        <input
          type="text"
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="images" className="block text-sm font-medium text-gray-700">Imágenes Representativas</label>
        <input
          type="file"
          id="images"
          multiple
          onChange={handleImageChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Lugares Importantes</label>
        <div className="mt-2 space-y-2">
          {locations.map(location => (
            <div key={location.id} className="flex items-center">
              <input
                id={`location-${location.id}`}
                type="checkbox"
                value={location.id}
                checked={selectedLocations.includes(location.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedLocations([...selectedLocations, location.id]);
                  } else {
                    setSelectedLocations(selectedLocations.filter(id => id !== location.id));
                  }
                }}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor={`location-${location.id}`} className="ml-2 block text-sm text-gray-900">{location.name}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-wine transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
          {loading ? 'Guardando...' : 'Guardar Souvenir'}
        </button>
      </div>
    </form>
  );
}