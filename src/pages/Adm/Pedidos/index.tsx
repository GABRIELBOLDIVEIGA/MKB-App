import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import BarraPesquisa from "components/BarraPesquisa";
import Cabecalho from "components/Cabecalho";
import { useState } from "react";


export default function PedidosADM() {
  const [busca, setBusca] = useState("");

  return (
    <IonPage>
      <Cabecalho texto="Pedidos">
        <IonGrid>
          <IonRow>
            <IonCol sizeXs="12" sizeSm="12" sizeMd="8" sizeLg="8" sizeXl="8">
              <BarraPesquisa busca={busca} setBusca={setBusca} placeholder="Encontrar Pedidos..." />
            </IonCol>
          </IonRow>
        </IonGrid>
      </Cabecalho>

      <IonContent>
        
      </IonContent>

    </IonPage>
  )
}
