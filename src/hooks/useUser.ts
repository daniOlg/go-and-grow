import { useEffect, useState } from 'react';
import { Preferences } from '@capacitor/preferences';
import { User } from 'firebase/auth';

type UseUser = {
  user: User | null;
  loading: boolean;
};

export function useUser(): UseUser {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    const storedUser = await Preferences.get({ key: 'user' });
    if (storedUser.value) {
      return JSON.parse(storedUser.value) as User;
    }
    return null;
  }

  useEffect(() => {
    fetchUser()
      .then((_user) => {
        if (_user) setUser(_user);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { user, loading };
}
