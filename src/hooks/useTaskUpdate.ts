import { doc, updateDoc } from 'firebase/firestore';
import { useFirestore } from 'reactfire';
import { useAuth } from './useAuth';

export function useTaskUpdate() {
  const firestore = useFirestore();
  const user = useAuth();

  const toggleTaskCompleted = async (taskId: string, currentStatus: boolean) => {
    const taskDoc = doc(firestore, `users/${user.uid}/tasks`, taskId);
    await updateDoc(taskDoc, { completed: !currentStatus });
  };

  return {
    toggleTaskCompleted,
  };
}
