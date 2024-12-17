import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useState } from 'react';
import { useTaskAdd } from '@/hooks/useTaskAdd';

interface TaskFormProps {
  show: boolean;
  onClose: () => void;
}

export function TaskForm({ show, onClose }: TaskFormProps) {
  const { addTask } = useTaskAdd();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async () => {
    await addTask({
      title,
      description,
    });

    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <IonModal isOpen={show} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Agregar Tarea</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Título</IonLabel>
            <IonInput
              value={title}
              placeholder="Escribe el título de la tarea"
              onIonChange={(e) => setTitle(e.detail.value!)}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Descripción</IonLabel>
            <IonInput
              value={description}
              placeholder="Escribe una descripción"
              onIonChange={(e) => setDescription(e.detail.value!)}
            />
          </IonItem>
        </IonList>

        <IonButton expand="block" color="primary" onClick={handleAddTask}>
          Agregar Tarea
        </IonButton>
        <IonButton expand="block" color="medium" onClick={onClose}>
          Cancelar
        </IonButton>
      </IonContent>
    </IonModal>
  );
}
