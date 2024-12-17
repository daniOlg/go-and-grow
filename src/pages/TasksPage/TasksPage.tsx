import { IonPage, IonContent } from '@ionic/react';
import { TaskList } from '@/pages/TasksPage/components/TaskList';

export function TasksPage() {
  return (
    <IonPage>
      <IonContent>
        <TaskList />
      </IonContent>
    </IonPage>
  );
}
