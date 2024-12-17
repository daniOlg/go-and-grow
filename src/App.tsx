import { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { IonReactRouter } from '@ionic/react-router';
import {
  AuthProvider, FirestoreProvider, useFirebaseApp, useInitFirestore,
} from 'reactfire';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, memoryLocalCache } from 'firebase/firestore';
import { LoginPage } from '@/pages';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */
/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

/* Tailwind CSS */
import './styles/tailwind.css';

import { Layout } from '@/components/Layout';
import { PrivateRoute } from '@/components/PrivateRoute';
import { TasksPage } from '@/pages/TasksPage/TasksPage';

setupIonicReact();

export function App() {
  const firebaseApp = useFirebaseApp();
  const auth = getAuth(firebaseApp);

  const { status, data: firestoreInstance } = useInitFirestore(
    async (_firebaseApp) => new Promise((resolve) => {
      const firestore = initializeFirestore(_firebaseApp, {
        localCache: memoryLocalCache(),
      });
      resolve(firestore);
    }),
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GoogleAuth.initialize({
      clientId: import.meta.env.VITE_GOOGLE_WEB_CLIENT_ID,
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    }).then(() => {
      setLoading(false);
    });
  }, []);

  if (loading || status === 'loading') {
    return <div className="animate-pulse">Loading...</div>;
  }

  return (
    <IonApp>
      <AuthProvider sdk={auth}>
        <FirestoreProvider sdk={firestoreInstance}>
          <IonReactRouter>
            <IonRouterOutlet>
              {/* Rutas públicas */}
              <Route exact path="/">
                <Redirect to="/tasks" />
              </Route>
              <Route exact path="/login">
                <LoginPage />
              </Route>

              {/* Rutas privadas */}
              <Layout>
                <PrivateRoute exact path="/tasks" component={TasksPage} />
              </Layout>
            </IonRouterOutlet>
          </IonReactRouter>
        </FirestoreProvider>
      </AuthProvider>
    </IonApp>
  );
}
