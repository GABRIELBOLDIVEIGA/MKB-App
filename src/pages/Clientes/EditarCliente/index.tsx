import { IonContent, IonPage } from "@ionic/react";
import Cabecalho from "components/Cabecalho";
import { useGetClienteById } from "graphQL/clientes/hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


export default function EditarCliente() {
  const params = useParams<{ id: string }>();
  const { data, error, loading, refetch } = useGetClienteById(params.id);
  
  useEffect(() => {
    console.log("[UseEffect] - EditarCliente: ", data)


    refetch()
  }, [data])


  return (
    <IonPage>
      <Cabecalho texto="Editar Cliente" />
      <IonContent>
        <h1>teste</h1>
      </IonContent>
    </IonPage>
  )
}
