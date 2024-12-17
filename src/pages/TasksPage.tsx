import { IonPage, IonContent } from '@ionic/react';
import { TaskList } from './TaskList';

export function TasksPage() {
  return (
    <IonPage>
      <IonContent>
        <TaskList />
      </IonContent>
    </IonPage>
  );
}
