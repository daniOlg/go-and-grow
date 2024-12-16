import {
  IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
} from '@ionic/react';
import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth';
import { Preferences } from '@capacitor/preferences';
import { useHistory } from 'react-router';

export function Login() {
  const history = useHistory();

  const handleGoogleSignIn = async () => {
    const res = await GoogleAuth.signIn();

    const user: User = {
      id: res.id,
      email: res.email,
      name: res.name,
      familyName: res.familyName,
      givenName: res.givenName,
      imageUrl: res.imageUrl,
      serverAuthCode: res.serverAuthCode,
      authentication: {
        accessToken: res.authentication.accessToken,
        idToken: res.authentication.idToken,
        refreshToken: res.authentication.refreshToken,
      },
    };

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
