import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from "@ionic/react";
import ListaDePedidos from "./ListaDePedidos";
import { useClientesContext } from "context/ClientesContext";
import { useProdutosContext } from "context/ProdutosContext";

export default function Home() {
  useClientesContext();
  useProdutosContext();

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

      <IonContent>
        <ListaDePedidos />
      </IonContent>
    </IonPage>
  );
}
