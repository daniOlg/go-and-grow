import { useEffect, useState } from 'react';
import {
  IonContent, IonHeader, IonList, IonItem, IonButton, IonPage, IonTitle, IonToolbar,
} from '@ionic/react';

type Task = {
  id: string;
  title: string;
  description: string;
};

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(Array.from({ length: 10 }, (_, i) => ({
      id: (i + 1).toString(),
      title: `Tarea ${i + 1}`,
      description: `Descripción de la tarea ${i + 1}`,
    } as Task)));
  }, []);

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista de Tareas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset>
          {tasks.map((task) => (
            <IonItem key={task.id}>
              <div>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
              </div>
              <IonButton
                color="danger"
                slot="end"
                onClick={() => deleteTask(task.id)}
              >
                Eliminar
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
