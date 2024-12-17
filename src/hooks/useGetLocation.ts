import { useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';

export function useGetLocation() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [gettingLocation, setGettingLocation] = useState(false);

  const getLocation = async () => {
    try {
      setGettingLocation(true);
      const position = await Geolocation.getCurrentPosition();
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (error) {
      console.error('Error al obtener la ubicación', error);
    } finally {
      setGettingLocation(false);
    }
  };

  return {
    location,
    setLocation,
    gettingLocation,
    getLocation,
  };
}
