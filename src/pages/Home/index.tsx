import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonFooter } from "@ionic/react";
import { useUserContext } from "context/UsuarioContext";
import { useGetPedidoByUserId } from "graphQL/pedidos/hooks";
import { useEffect } from "react";

export default function Home() {
  const { usuario } = useUserContext();
  const { data, loading, error, refetch } = useGetPedidoByUserId(usuario._id!)

  useEffect(() => { 
    console.log(data)
    refetch({id: usuario._id})
  },[data])

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
        
      </IonContent>

      <IonFooter>
        <IonToolbar>

        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}
