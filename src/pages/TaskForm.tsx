import { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

import { Task, TaskSchema } from '@/schemas';

type Props = {
  addTask: (task: Task) => void;
};

export function TaskForm({ addTask }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const handleAddTask = () => {
    const result = TaskSchema.safeParse({
      id: Date.now().toString(),
      title,
      description,
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
          <IonButton expand="block" onClick={handleAddTask}>
            Guardar Tarea
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
}
