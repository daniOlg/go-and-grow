import { useFirestore } from 'reactfire';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useMemo } from 'react';
import { Task } from '@/schemas';
import { useAuth } from './useAuth';

type AddTaskProps = Omit<Task, 'id' | 'completed'>;

export function useTaskAdd() {
  const firestore = useFirestore();
  const user = useAuth();

  const tasksRef = useMemo(() => collection(firestore, `users/${user.uid}/tasks`), [firestore, user]);

  async function addTask(task: AddTaskProps) {
    await addDoc(tasksRef, {
      ...task,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  return { addTask };
}
