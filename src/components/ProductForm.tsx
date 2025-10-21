'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

interface ProductFormProps {
  product?: Product | null;
  onSave: (product: Omit<Product, 'id' | 'created_at'> & { image_urls: string[] | null }) => Promise<void>;
}

export default function ProductForm({ product, onSave }: ProductFormProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [newImages, setNewImages] = useState<File[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(String(product.price));
      setDescription(product.description || '');
      setExistingImageUrls(product.image_urls || []);
    }
  }, [product]);

  const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImages(Array.from(e.target.files));
    }
  };

  const handleRemoveExistingImage = (urlToRemove: string) => {
    setExistingImageUrls(existingImageUrls.filter(url => url !== urlToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const uploadedImageUrls: string[] = [];
    for (const image of newImages) {
      const fileName = `${Date.now()}-${image.name}`;
      const { error: uploadError } = await supabase.storage.from('products-bucket').upload(fileName, image);
      if (uploadError) {
        alert(`Error uploading image: ${uploadError.message}`);
        setLoading(false);
        return;
      }
      const { data: { publicUrl } } = supabase.storage.from('products-bucket').getPublicUrl(fileName);
      uploadedImageUrls.push(publicUrl);
    }

    const allImageUrls = [...existingImageUrls, ...uploadedImageUrls];

    await onSave({
      name,
      price: parseFloat(price),
      description,
      image_urls: allImageUrls.length > 0 ? allImageUrls : null,
    });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del Producto</label>
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
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          step="0.01"
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
        <label htmlFor="newImages" className="block text-sm font-medium text-gray-700">Imágenes del Producto</label>
        <input
          type="file"
          id="newImages"
          multiple
          onChange={handleNewImageChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {existingImageUrls.map((url, index) => (
            <div key={url} className="relative w-24 h-24">
              <Image src={url} alt={`Existing product image ${index + 1}`} fill style={{ objectFit: 'cover' }} className="rounded-md" />
              <button
                type="button"
                onClick={() => handleRemoveExistingImage(url)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
              >
                X
              </button>
            </div>
          ))}
          {newImages.map((image, index) => (
            <div key={image.name + index} className="relative w-24 h-24">
              <Image src={URL.createObjectURL(image)} alt={`New product image ${index + 1}`} fill style={{ objectFit: 'cover' }} className="rounded-md" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
          {loading ? 'Guardando...' : 'Guardar Producto'}
        </button>
      </div>
    </form>
  );
}
