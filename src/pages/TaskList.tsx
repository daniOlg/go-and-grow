import { useEffect, useState } from 'react';
import {
  IonButton, IonContent, IonHeader, IonImg, IonItem, IonList, IonPage, IonTitle, IonToolbar,
} from '@ionic/react';
import { TaskForm } from '@/pages';
import { Task } from '@/schemas';

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setTasks(Array.from({ length: 10 }, (_, i) => ({
      id: (i + 1).toString(),
      title: `Tarea ${i + 1}`,
      description: `Descripción de la tarea ${i + 1}`,
    } as Task)));
  }, []);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
    setShowForm(false);
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return showForm ? (
    <TaskForm addTask={addTask} />
  ) : (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista de Tareas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton expand="block" onClick={() => setShowForm(true)}>
          Nueva Tarea
        </IonButton>
        <IonList inset>
          {tasks.map((task) => (
            <IonItem key={task.id}>
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                {task.location && (
                  <p>
                    Ubicación:
                    {' '}
                    {task.location.latitude}
                    ,
                    {' '}
                    {task.location.longitude}
                  </p>
                )}
                {task.image && <IonImg src={task.image} />}
              </div>
              <IonButton color="danger" slot="end" onClick={() => deleteTask(task.id)}>
                Eliminar
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
