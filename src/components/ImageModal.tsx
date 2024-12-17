import {
  IonButton, IonContent, IonImg, IonModal,
} from '@ionic/react';

interface ImageModalProps {
  isOpen: boolean;
  image: string | null;
  onClose: () => void;
}

export function ImageModal({ isOpen, image, onClose }: ImageModalProps) {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonContent className="ion-padding">
        {image && <IonImg src={image} />}
        <IonButton expand="block" onClick={onClose}>
          Cerrar
        </IonButton>
      </IonContent>
    </IonModal>
  );
}
