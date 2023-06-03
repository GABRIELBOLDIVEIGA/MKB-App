import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonPage, IonRow, IonSkeletonText, IonText } from "@ionic/react";
import BarraPesquisa from "components/BarraPesquisa";
import Cabecalho from "components/Cabecalho";
import { Produto } from "interface/Produto";
import { useEffect, useState } from "react";
import CardProduto from "./CardProduto";
import { useProduto } from "graphQL/produtos/hooks";
import ButtonRouter from "components/ButtonRouter";
import { addCircleOutline } from "ionicons/icons";
import CardSkeleton from "./CardSkeleton";

export default function ProdutosADM() {
  const [busca, setBusca] = useState("");
  const [produtos, setProdutos] = useState<Produto[]>();
  const { data, error, loading, refetch } = useProduto();
  const skeletonCard = Array.from({ length: 15 }).map(() => true);

  useEffect(() => {
    console.log(data)
    if (data) {
      setProdutos(data.slice(0, 50))
    }
  }, [loading])

  return (
    <IonPage>
      <Cabecalho texto="Produtos">
        <IonGrid>
          <IonRow>
            <IonCol sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="6" sizeXl="6">
              <BarraPesquisa busca={busca} setBusca={setBusca} placeholder="Funcionario" />
            </IonCol>
            <IonCol sizeXs="12" sizeSm="12" sizeMd="6" sizeLg="6" sizeXl="4" offsetXl="2">
              <IonItem lines="none">
                <ButtonRouter
                  icon={addCircleOutline}
                  routerLink="/AdicionarProduto"
                  routerDirection="none"
                  colorButton="primary"
                  text="Adicionar Produto"
                  size="default"
                  slotIcon="start"
                  slotButton="end"
                />
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </Cabecalho>

      <IonContent>
        <IonGrid>
          <IonRow>
            {loading ?
              (
                skeletonCard.map((_, index) => {
                  return (
                    <IonCol key={index} sizeSm="12" sizeMd="6" sizeLg="4" sizeXl="4">
                      <CardSkeleton />
                    </IonCol>
                  )
                })
              ) :
              (
                produtos?.map((produto) => {
                  return (
                    <IonCol key={produto._id} sizeSm="12" sizeMd="6" sizeLg="4" sizeXl="4">
                      <CardProduto {...produto} />
                    </IonCol>
                  )
                })
              )
            }
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}


