import {
  IonButton,
  IonContent,
  IonHeader, IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal, IonText,
  IonTitle, IonToast,
  IonToolbar,
} from '@ionic/react';
import { useState } from 'react';
import { useTaskAdd } from '@/hooks/useTaskAdd';
import { TaskSchema } from '@/schemas';
import { useCaptureImage } from '@/hooks/useCaptureImage';
import { useGetLocation } from '@/hooks/useGetLocation';

interface TaskFormProps {
  show: boolean;
  onClose: () => void;
}

export function TaskForm({ show, onClose }: TaskFormProps) {
  const { addTask } = useTaskAdd();

  const { image, setImage, captureImage } = useCaptureImage();
  const {
    location, setLocation, gettingLocation, getLocation,
  } = useGetLocation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const dismissModal = () => {
    setTitle('');
    setDescription('');
    setImage(null);
    setLocation(null);

    setError(null);
    onClose();
  };

  const handleAddTask = async () => {
    try {
      setSaving(true);
      const validationResult = TaskSchema.safeParse({ title, description });

      if (!validationResult.success) {
        setError(validationResult.error.errors[0].message);
        return;
      }

      await addTask({
        title,
        description,
        ...(image ? { image } : {}),
        ...(location ? { location } : {}),
      });

      dismissModal();
    } finally {
      setSaving(false);
    }
  };

  return (
    <IonModal isOpen={show} onDidDismiss={dismissModal}>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="text-center">Agregar Tarea</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList className="ion-margin-bottom">
          <IonItem>
            <IonLabel position="stacked">Título</IonLabel>
            <IonInput
              disabled={saving}
              value={title}
              placeholder="Escribe el título de la tarea"
              onIonChange={(e) => setTitle(e.detail.value!)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Descripción</IonLabel>
            <IonInput
              disabled={saving}
              value={description}
              placeholder="Escribe una descripción"
              onIonChange={(e) => setDescription(e.detail.value!)}
            />
          </IonItem>
        </IonList>

        <IonList className="ion-margin-bottom">
          <IonItem>
            <IonButton expand="block" onClick={captureImage}>
              Capturar Imagen
            </IonButton>
          </IonItem>

          {image && (
            <IonItem className="ion-margin-top">
              <IonImg src={image} />
            </IonItem>
          )}
        </IonList>

        <IonList className="ion-margin-bottom">
          <IonItem>
            <IonButton expand="block" onClick={getLocation}>
              Registrar Ubicación
            </IonButton>
          </IonItem>

          {gettingLocation && (
            <IonItem className="ion-margin-top">
              <IonText>Obteniendo ubicación...</IonText>
            </IonItem>
          )}

          {location && (
            <IonItem className="ion-margin-top">
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
            </IonItem>
          )}
        </IonList>

        {error && (
          <IonToast
            isOpen={!!error}
            message={error}
            duration={3000}
            color="danger"
            onDidDismiss={() => setError(null)}
          />
        )}

        <IonButton className="ion-margin-top" expand="block" color="primary" onClick={handleAddTask} disabled={saving}>
          Agregar Tarea
        </IonButton>
        <IonButton expand="block" color="medium" onClick={onClose} disabled={saving}>
          Cancelar
        </IonButton>

        { saving && <div className="font-bold ion-padding-top text-center animate-pulse">Guardando...</div> }
      </IonContent>
    </IonModal>
  );
}
