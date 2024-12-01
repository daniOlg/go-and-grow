import { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

import { Task, TaskSchema } from '@/schemas';

type Props = {
  addTask: (task: Task) => void;
};

export function TaskForm({ addTask }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const handleAddTask = async () => {
    const result = TaskSchema.safeParse({
      id: Date.now().toString(),
      title,
      description,
      image,
      location,
    });

    if (!result.success) {
      const validationErrors = result.error.flatten().fieldErrors;
      setErrors({
        title: validationErrors.title?.[0],
        description: validationErrors.description?.[0],
      });
      return;
    }

    setErrors({});
    addTask(result.data);
    setTitle('');
    setDescription('');
    setImage(null);
    setLocation(null);
  };

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

  const getLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (error) {
      console.error('Error al obtener la ubicación', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Agregar Nueva Tarea</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position="floating">Título</IonLabel>
            <IonInput
              value={title}
              onIonChange={(e) => setTitle(e.detail.value!)}
            />
          </IonItem>
          {errors.title && (
            <IonText color="danger">
              <p>{errors.title}</p>
            </IonText>
          )}
          <IonItem>
            <IonLabel position="floating">Descripción</IonLabel>
            <IonInput
              value={description}
              onIonChange={(e) => setDescription(e.detail.value!)}
            />
          </IonItem>
          {errors.description && (
            <IonText color="danger">
              <p>{errors.description}</p>
            </IonText>
          )}
          <IonItem>
            {image && <IonImg src={image} />}
            <IonButton expand="block" onClick={captureImage}>
              Capturar Imagen
            </IonButton>
          </IonItem>
          <IonItem>
            <IonButton expand="block" onClick={getLocation}>
              Registrar Ubicación
            </IonButton>
            {location && (
              <IonText>
                <p>
                  Ubicación:
                  {' '}
                  {location.latitude}
                  ,
                  {' '}
                  {location.longitude}
                </p>
              </IonText>
            )}
          </IonItem>
          <IonButton expand="block" onClick={handleAddTask}>
            Guardar Tarea
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
}
