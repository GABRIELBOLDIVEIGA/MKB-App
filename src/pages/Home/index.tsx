import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonFooter, IonList, IonIcon, IonItem, IonLabel, IonListHeader, IonThumbnail, IonSkeletonText } from "@ionic/react";
import { useUserContext } from "context/UsuarioContext";
import { useGetPedidoByUserId } from "graphQL/pedidos/hooks";
import { musicalNotes } from "ionicons/icons";
import { useEffect, useState } from "react";

export default function Home() {
  const { usuario } = useUserContext();
  const { data, loading, error, refetch } = useGetPedidoByUserId(usuario._id!)
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log(data)
    refetch({ id: usuario._id })
  }, [data])

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
        <IonList>
          {data?.map((pedido: any) => {
            return (
              <IonItem>
                <IonLabel>{pedido.total}</IonLabel>
              </IonItem>
            )
          })}
        </IonList>
      </IonContent>

      <IonFooter>
        <IonToolbar>

        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}
