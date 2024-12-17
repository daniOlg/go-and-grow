import { useState } from 'react';
import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { TaskForm } from '@/pages/TaskForm';
import { useTaskList } from '@/hooks/useTaskList';
import { useTaskUpdate } from '@/hooks/useTaskUpdate';
import { ImageModal } from '@/components/ImageModal';
import { LocationModal } from '@/components/LocationModal';

export function TaskList() {
  const { tasks, status } = useTaskList();
  const { toggleTaskCompleted } = useTaskUpdate();

  const [showForm, setShowForm] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number,
    longitude: number
  } | null>(null);

  const handleViewImage = (image: string) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  const handleViewLocation = (location: { latitude: number, longitude: number }) => {
    setSelectedLocation(location);
    setShowLocationModal(true);
  };

  if (status === 'loading') {
    return <div>Cargando tareas...</div>;
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonButton expand="block" className="ion-margin-bottom" onClick={() => setShowForm(true)}>
          Nueva Tarea
        </IonButton>

        <IonList>
          {tasks.map((task) => (
            <IonItem
              key={task.id}
              className={task.completed ? 'task-completed' : ''}
            >
              <IonCheckbox
                checked={task.completed}
                onIonChange={() => toggleTaskCompleted(task.id!, task.completed)}
                slot="start"
              />
              <IonLabel>
                <h2 className={task.completed ? 'line-through' : ''}>{task.title}</h2>
                <p>{task.description}</p>
              </IonLabel>

              {task.image
                && (
                <IonButton onClick={() => handleViewImage(task.image!)} slot="end">
                  Ver Imagen
                </IonButton>
                )}
              {task.location
                && (
                <IonButton onClick={() => handleViewLocation(task.location!)} slot="end">
                  Ver Ubicación
                </IonButton>
                )}
            </IonItem>
          ))}
        </IonList>

        {tasks.length === 0 && (
          <div className="text-center">No hay tareas disponibles.</div>
        )}
      </IonContent>

      <TaskForm show={showForm} onClose={() => setShowForm(false)} />

      <ImageModal
        isOpen={showImageModal}
        image={selectedImage}
        onClose={() => setShowImageModal(false)}
      />
      <LocationModal
        isOpen={showLocationModal}
        location={selectedLocation}
        onClose={() => setShowLocationModal(false)}
      />
    </IonPage>
  );
}
