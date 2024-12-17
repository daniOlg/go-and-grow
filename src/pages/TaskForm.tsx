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
  const [saving, setSaving] = useState(false);

  const dismissModal = () => {
    setTitle('');
    setDescription('');

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
        <IonList>
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
