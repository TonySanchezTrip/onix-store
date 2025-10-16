'use client';

import { useState, useEffect } from 'react';

// Define a Souvenir type for type safety
interface Souvenir {
  id: number;
  name: string;
  description: string | null;
  public_url: string | null;
}

// The data that the form will work with
export type SouvenirFormData = Omit<Souvenir, 'id'>;

interface SouvenirFormProps {
  souvenir?: Souvenir | null;
  onSave: (data: SouvenirFormData) => Promise<void>;
}

export default function SouvenirForm({ souvenir, onSave }: SouvenirFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [publicUrl, setPublicUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (souvenir) {
      setName(souvenir.name);
      setDescription(souvenir.description || '');
      setPublicUrl(souvenir.public_url || '');
    }
  }, [souvenir]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSave({
      name,
      description,
      public_url: publicUrl,
    });
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
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
          {loading ? 'Guardando...' : 'Guardar Souvenir'}
        </button>
      </div>
    </form>
  );
}