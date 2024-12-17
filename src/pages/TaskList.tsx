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

export function TaskList() {
  const { tasks, status } = useTaskList();
  const { toggleTaskCompleted } = useTaskUpdate();

  const [showForm, setShowForm] = useState(false);

  if (status === 'loading') {
    return <div>Cargando tareas...</div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Tareas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={() => setShowForm(true)}>
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
                onIonChange={() => toggleTaskCompleted(task.id, task.completed)}
                slot="start"
              />
              <IonLabel>
                <h2 className={task.completed ? 'line-through' : ''}>{task.title}</h2>
                <p>{task.description}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        {tasks.length === 0 && (
          <div className="text-center">No hay tareas disponibles.</div>
        )}
      </IonContent>

      <TaskForm show={showForm} onClose={() => setShowForm(false)} />
    </IonPage>
  );
}
