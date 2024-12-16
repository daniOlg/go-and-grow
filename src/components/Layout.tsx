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

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, loading } = useUser();
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await GoogleAuth.signOut();
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
          <IonTitle>Mi Aplicación</IonTitle>
          <IonButtons slot="end">
            {user && (
              <IonButton onClick={() => setPopoverOpen(true)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {user.imageUrl && (
                    <IonImg
                      src={user.imageUrl}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                    />
                  )}
                  {user.givenName || 'Usuario'}
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
            {user?.imageUrl && (
              <IonImg
                src={user.imageUrl}
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
              {user?.givenName || 'N/A'}
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
