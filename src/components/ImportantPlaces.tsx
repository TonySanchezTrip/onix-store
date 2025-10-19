'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import Image from 'next/image';

interface ImportantPlace {
  id: number;
  name: string;
  description: string;
  image_url: string;
  location: { x: number; y: number };
}

interface ImportantPlacesProps {
  places: ImportantPlace[];
}

const ImportantPlaces = ({ places }: ImportantPlacesProps) => {
  if (!places || places.length === 0) {
    return null;
  }

  const customIcon = new Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

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
          <MapContainer center={[places[0].location.y, places[0].location.x]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {places.map((place) => (
              <Marker key={place.id} position={[place.location.y, place.location.x]} icon={customIcon}>
                <Popup>{place.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default ImportantPlaces;
