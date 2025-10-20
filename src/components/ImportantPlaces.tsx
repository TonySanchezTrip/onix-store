'use client';

import Image from 'next/image';

interface ImportantPlace {
  id: number;
  name: string;
  description: string;
  image_url: string;
  location: string;
}

interface ImportantPlacesProps {
  places: ImportantPlace[];
}

const ImportantPlaces = ({ places }: ImportantPlacesProps) => {
  if (!places || places.length === 0) {
    return null;
  }

  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('google.com') && urlObj.pathname.includes('/maps/')) {
        if (urlObj.pathname.includes('/place/')) {
          const place = urlObj.pathname.split('/place/')[1].split('/')[0];
          return `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${place}`;
        } else if (urlObj.searchParams.has('q')) {
          const query = urlObj.searchParams.get('q');
          return `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${query}`;
        }
      }
    } catch (error) {
      console.error("Invalid URL for Google Maps", error);
      return null;
    }
    return null;
  };

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-center mb-8 font-heading text-primary-wine">Lugares de Interés</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {places.map((place) => (
            <div key={place.id} className="mb-8 p-4 border rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-2 font-heading text-primary-wine">{place.name}</h3>
              <p className="text-text-dark mb-4">{place.description}</p>
              {place.image_url && (
                <div className="relative h-60 rounded-lg overflow-hidden">
                  <Image
                    src={place.image_url}
                    alt={place.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="h-96 md:h-full rounded-lg overflow-hidden shadow-lg">
          {places[0].location && (
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={getEmbedUrl(places[0].location)!}
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportantPlaces;