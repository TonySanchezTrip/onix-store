'use client';

import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface MemoriesSectionProps {
  souvenir_id: number;
}

// A simple component to prompt users to log in.
const LoginPrompt = () => (
  <div className="text-center p-8 border rounded-lg">
    <h2 className="text-2xl font-bold mb-4">Access Your Memories</h2>
    <p className="mb-6">Please log in to view and add your digital memories for this souvenir.</p>
    <Link href="/login" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
      Login
    </Link>
  </div>
);

interface DigitalMemory {
  id: number;
  created_at: string;
  user_id: string;
  souvenir_id: number;
  file_url: string;
  file_type: 'image' | 'video' | 'audio' | 'note';
}

const PrivateMemories = ({ souvenir_id, user }: { souvenir_id: number, user: User }) => {
  const [memories, setMemories] = useState<DigitalMemory[]>([]);
  const [loadingMemories, setLoadingMemories] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Fetch existing memories
  useEffect(() => {
    const fetchMemories = async () => {
      setLoadingMemories(true);
      const { data, error } = await supabase
        .from('digital_memories')
        .select('*')
        .eq('user_id', user.id)
        .eq('souvenir_id', souvenir_id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching memories:', error);
        setError('Could not fetch memories.');
      } else {
        setMemories(data as DigitalMemory[]);
      }
      setLoadingMemories(false);
    };

    fetchMemories();
  }, [souvenir_id, user.id]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  };

  // Handle form submission for file upload
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      const fileName = `${Date.now()}-${selectedFile.name}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('memories-bucket')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('memories-bucket')
        .getPublicUrl(filePath);

      if (!publicUrl) throw new Error('Could not get public URL.');

      const file_type = selectedFile.type.startsWith('image') ? 'image' : selectedFile.type.startsWith('video') ? 'video' : 'note';
      const { data: newMemory, error: insertError } = await supabase
        .from('digital_memories')
        .insert({ user_id: user.id, souvenir_id, file_url: publicUrl, file_type })
        .select()
        .single();

      if (insertError) throw insertError;

      setMemories(prev => [newMemory as DigitalMemory, ...prev]);
      setSelectedFile(null); // Reset file input

    } catch (error) {
      const err = error as Error;
      console.error('Upload failed:', err);
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Your Private Memories</h2>
      
      {/* Upload Form */}
      <form onSubmit={handleFormSubmit} className="mb-8 p-6 border-2 border-dashed rounded-lg bg-gray-50">
        <h3 className="text-xl font-semibold mb-4">Add a New Memory</h3>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <label htmlFor="file-upload" className="cursor-pointer bg-white text-blue-600 font-semibold py-2 px-4 border border-blue-600 rounded-lg hover:bg-blue-50">
            Choose File
          </label>
          <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} disabled={uploading} />
          
          {selectedFile && <span className="text-gray-600 flex-grow">{selectedFile.name}</span>}

          <button type="submit" disabled={uploading || !selectedFile} className="w-full sm:w-auto bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>

      {/* Memories Grid */}
      {loadingMemories ? (
        <p>Loading your memories...</p>
      ) : memories.length === 0 ? (
        <p className="text-center text-gray-500 py-8">You haven&apos;t added any memories yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {memories.map(memory => (
            <div key={memory.id} className="border rounded-lg overflow-hidden shadow-lg group relative">
              {memory.file_type === 'image' ? (
                <Image src={memory.file_url} alt="Digital Memory" width={200} height={200} className="w-full h-48 object-cover" />
              ) : memory.file_type === 'video' ? (
                <video src={memory.file_url} controls className="w-full h-48 object-cover bg-black" />
              ) : (
                <div className="p-4 bg-gray-100 h-48 flex items-center justify-center">
                  <p className="text-gray-500">Note/Other</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function MemoriesSection({ souvenir_id }: MemoriesSectionProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <p>Loading memories section...</p>;
  }

  return user ? <PrivateMemories souvenir_id={souvenir_id} user={user} /> : <LoginPrompt />;
}
