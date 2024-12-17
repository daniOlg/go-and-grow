import { ReactNode, useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonPopover,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useUser } from '@/hooks/useUser';
import { Preferences } from '@capacitor/preferences';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { signOut } from 'firebase/auth';
import { useAuth } from 'reactfire';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const auth = useAuth();
  const { user, loading } = useUser();
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await GoogleAuth.signOut();
      await signOut(auth);
      await Preferences.remove({ key: 'user' });
      setPopoverOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis tareas</IonTitle>
          <IonButtons slot="end">
            {user && (
              <IonButton onClick={() => setPopoverOpen(true)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {user.photoURL && (
                    <IonImg
                      src={user.photoURL}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                    />
                  )}
                  {user.displayName || 'Usuario'}
                </div>
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {children}
        <IonPopover
          isOpen={popoverOpen}
          onDidDismiss={() => setPopoverOpen(false)}
        >
          <div style={{ padding: '1rem', textAlign: 'center' }}>
            {user?.photoURL && (
              <IonImg
                src={user.photoURL}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '1rem',
                }}
              />
            )}
            <p style={{ marginBottom: '1rem' }}>
              <strong>Usuario:</strong>
              {' '}
              {user?.displayName || 'N/A'}
            </p>
            <IonButton expand="block" onClick={handleSignOut} color="danger">
              Cerrar Sesión
            </IonButton>
          </div>
        </IonPopover>
      </IonContent>
    </IonPage>
  );
}
