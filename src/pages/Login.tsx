import {
  IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
} from '@ionic/react';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Preferences } from '@capacitor/preferences';
import { useHistory } from 'react-router';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { useAuth } from 'reactfire';

export function Login() {
  const history = useHistory();
  const auth = useAuth();

  const handleGoogleSignIn = async () => {
    const res = await GoogleAuth.signIn();

    const googleUser = {
      authentication: {
        idToken: res.authentication.idToken,
      },
    };

    const credential = GoogleAuthProvider.credential(googleUser.authentication.idToken);
    const result = await signInWithCredential(auth, credential);
    const { user } = result;

    await Preferences.set({ key: 'user', value: JSON.stringify(user) });
    history.push('/tasks');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={handleGoogleSignIn}>
          Iniciar sesión con Google
        </IonButton>
      </IonContent>
    </IonPage>
  );
}
