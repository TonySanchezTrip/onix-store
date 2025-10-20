'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { Icon, LatLng } from 'leaflet';

interface ImportantPlace {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  location: { x: number; y: number } | null;
  state: string | null;
}

export type ImportantPlaceFormData = Omit<ImportantPlace, 'id'>;

interface ImportantPlaceFormProps {
  importantPlace?: ImportantPlace | null;
  onSave?: (data: ImportantPlaceFormData) => Promise<void>;
}

interface LocationPickerProps {
  onLocationSelect: (latlng: LatLng) => void;
}

function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const [position, setPosition] = useState<LatLng | null>(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={new Icon({iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41]})} />
  );
}

export default function ImportantPlaceForm({ importantPlace, onSave }: ImportantPlaceFormProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [latitude, setLatitude] = useState<number | string>('');
  const [longitude, setLongitude] = useState<number | string>('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (importantPlace) {
      setName(importantPlace.name);
      setDescription(importantPlace.description || '');
      setImageUrl(importantPlace.image_url || '');
      if (importantPlace.location) {
        setLatitude(importantPlace.location.y);
        setLongitude(importantPlace.location.x);
      }
      setState(importantPlace.state || '');
    }
  }, [importantPlace]);

  const handleLocationSelect = (latlng: LatLng) => {
    setLatitude(latlng.lat);
    setLongitude(latlng.lng);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const importantPlaceData = {
      name,
      description,
      image_url: imageUrl,
      location: latitude && longitude ? { y: Number(latitude), x: Number(longitude) } : null,
      state,
    };

    if (onSave) {
      await onSave(importantPlaceData as ImportantPlaceFormData);
    } else {
      try {
        const { error } = await supabase.from('important_places').insert(importantPlaceData);
        if (error) {
          throw error;
        }
        alert('Lugar importante creado exitosamente!');
        router.push('/admin/important-places');
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
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">URL de la Imagen</label>
        <input
          type="url"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="h-96 md:h-full rounded-lg overflow-hidden shadow-lg">
        <MapContainer center={[19.319, -98.2385]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationPicker onLocationSelect={handleLocationSelect} />
        </MapContainer>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitud</label>
          <input
            type="number"
            id="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitud</label>
          <input
            type="number"
            id="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
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
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
          {loading ? 'Guardando...' : 'Guardar Lugar Importante'}
        </button>
      </div>
    </form>
  );
}
