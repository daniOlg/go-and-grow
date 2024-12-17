import { useState } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';

export function useCaptureImage() {
  const [image, setImage] = useState<string | null>(null);

  const captureImage = async () => {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        quality: 90,
      });
      setImage(photo.dataUrl!);
    } catch (error) {
      console.error('Error al capturar la imagen', error);
    }
  };

  return {
    image,
    setImage,
    captureImage,
  };
}
