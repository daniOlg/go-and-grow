import { getAuth } from 'firebase/auth';

export function useAuth() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error('Usuario no autenticado');
  }

  return user;
}
