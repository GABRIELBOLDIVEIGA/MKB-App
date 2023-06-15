import { IonContent, IonPage, IonTitle } from "@ionic/react";
import Cabecalho from "components/Cabecalho";
import ButtonRouter from "components/ButtonRouter";
import { addCircleOutline } from "ionicons/icons";
import TabelaProdutos from "./TabelaProdutos";

export default function ProdutosADM() {
  return (
    <IonPage>
      <Cabecalho>
        <IonTitle>Produtos</IonTitle>

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
      </Cabecalho>

      <IonContent>
        <TabelaProdutos />
      </IonContent>
    </IonPage>
  )
}


