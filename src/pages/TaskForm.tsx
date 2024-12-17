import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle, IonToast,
  IonToolbar,
} from '@ionic/react';
import { useState } from 'react';
import { useTaskAdd } from '@/hooks/useTaskAdd';
import { TaskSchema } from '@/schemas';

interface TaskFormProps {
  show: boolean;
  onClose: () => void;
}

export function TaskForm({ show, onClose }: TaskFormProps) {
  const { addTask } = useTaskAdd();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [error, setError] = useState<string | null>(null);

  const handleAddTask = async () => {
    const validationResult = TaskSchema.safeParse({ title, description });

    if (!validationResult.success) {
      setError(validationResult.error.errors[0].message);
      return;
    }

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

        {error && (
          <IonToast
            isOpen={!!error}
            message={error}
            duration={3000}
            color="danger"
            onDidDismiss={() => setError(null)}
          />
        )}

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
