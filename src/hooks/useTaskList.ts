import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { collection, orderBy, query } from 'firebase/firestore';
import { useMemo } from 'react';
import { Task } from '@/schemas';
import { useAuth } from './useAuth';

export function useTaskList() {
  const firestore = useFirestore();
  const user = useAuth();

  const tasksRef = useMemo(() => collection(firestore, `users/${user.uid}/tasks`), [firestore, user.uid]);
  const tasksQuery = useMemo(() => query(tasksRef, orderBy('createdAt', 'desc')), [tasksRef]);
  const { status, data } = useFirestoreCollectionData(tasksQuery, { idField: 'id' });

  const tasks = data as Task[];

  return {
    tasks,
    status,
  };
}
