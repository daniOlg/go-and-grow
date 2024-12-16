import { useEffect, useState } from 'react';
import { Preferences } from '@capacitor/preferences';
import { User } from '@codetrix-studio/capacitor-google-auth';

export function useUser(): { user: User | null; loading: boolean } {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const storedUser = await Preferences.get({ key: 'user' });
      if (storedUser.value) {
        setUser(JSON.parse(storedUser.value) as User);
      }
      setLoading(false);
    }

    fetchUser();
  }, []);

  return { user, loading };
}
