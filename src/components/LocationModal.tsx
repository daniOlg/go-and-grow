import {
  IonButton, IonContent, IonModal, IonText,
} from '@ionic/react';

interface LocationModalProps {
  isOpen: boolean;
  location: { latitude: number, longitude: number } | null;
  onClose: () => void;
}

export function LocationModal({ isOpen, location, onClose }: LocationModalProps) {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonContent className="ion-padding">
        {location ? (
          <IonText>
            <p>
              Ubicación:
              {location.latitude}
              ,
              {location.longitude}
            </p>
          </IonText>
        ) : (
          <IonText>Ubicación no disponible</IonText>
        )}
        <IonButton expand="block" onClick={onClose}>
          Cerrar
        </IonButton>
      </IonContent>
    </IonModal>
  );
}
