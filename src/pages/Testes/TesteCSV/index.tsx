import { IonContent, IonPage } from "@ionic/react";
import { useGetPedidoById2Csv } from "graphQL/pedidos/hooks";
import { useEffect } from "react";
import { pedidos2csv } from "utils/gerarCSVpedidos";

export default function TesteCSV() {
  const { data, loading, error, refetch } = useGetPedidoById2Csv("6487cf1dd129cf0c607d3776");

  useEffect(() => {
    console.log(data);
    if (data) {
      console.log(pedidos2csv(data))
    }
  }, [loading])

  return (
    <IonPage>
      <IonContent>

      </IonContent>
    </IonPage>
  )
}
