import { useFirestore } from 'reactfire';
import { doc, deleteDoc } from 'firebase/firestore';
import { useAuth } from './useAuth';

export function useTaskDelete() {
  const firestore = useFirestore();
  const user = useAuth();

  const deleteTask = async (taskId: string) => {
    const taskDoc = doc(firestore, `users/${user.uid}/tasks`, taskId);
    await deleteDoc(taskDoc);
  };

  return { deleteTask };
}
