import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonFooter } from "@ionic/react";
import React from "react";

export default function Historico() {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>Historico</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent></IonContent>

            <IonFooter>
                <IonToolbar></IonToolbar>
            </IonFooter>
        </IonPage>
    );
}
