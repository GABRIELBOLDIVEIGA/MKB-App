import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonFooter } from "@ionic/react";

export default function Home() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent></IonContent>

      <IonFooter>
        <IonToolbar>

        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}
